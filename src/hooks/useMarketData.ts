// src/hooks/useMarketData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../services/supabaseClient';

interface MarketCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const fallbackData: MarketCoin[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', current_price: 67234.12, price_change_percentage_24h: 1.42, market_cap: 1320000000000 },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', current_price: 3478.9, price_change_percentage_24h: -0.34, market_cap: 418000000000 },
  { id: 'sol', name: 'Solana', symbol: 'SOL', current_price: 168.24, price_change_percentage_24h: 2.11, market_cap: 76000000000 },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const ENABLE_REMOTE_API = import.meta.env.VITE_ENABLE_MARKET_API === 'true';
const MARKET_DATA_URL = ENABLE_REMOTE_API && API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, '')}/api/market/data` : '';

export const useMarketData = () => {
  const [data, setData] = useState<MarketCoin[]>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (session: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']) => {
      if (!isMounted) return;

      if (!session?.access_token || !MARKET_DATA_URL) {
        setData(fallbackData);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get(MARKET_DATA_URL, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          timeout: 8000,
        });

        const payload = response.data?.data ?? response.data;
        const nextData = Array.isArray(payload) ? payload : fallbackData;

        if (isMounted) {
          setData(nextData as MarketCoin[]);
        }
      } catch (err) {
        console.error('Failed to fetch market data', err);
        if (isMounted) {
          setData(fallbackData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await fetchData(session);
    };

    void initialize();

    const { data: authSubscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void fetchData(session);
    });

    return () => {
      isMounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, []);

  return { data, loading };
};