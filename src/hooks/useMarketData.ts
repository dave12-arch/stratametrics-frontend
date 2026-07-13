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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://stratometrics-backend-bmkt.vercel.app';
const MARKET_DATA_URL = `${API_BASE_URL.replace(/\/$/, '')}/api/market/data`;

export const useMarketData = () => {
  const [data, setData] = useState<MarketCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (session: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']) => {
      if (!isMounted) return;

      if (!session?.access_token) {
        setData([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get(MARKET_DATA_URL, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        const payload = response.data?.data ?? response.data;
        const nextData = Array.isArray(payload) ? payload : [];

        if (isMounted) {
          setData(nextData as MarketCoin[]);
        }
      } catch (err) {
        console.error('Failed to fetch market data', err);
        if (isMounted) {
          setData([]);
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