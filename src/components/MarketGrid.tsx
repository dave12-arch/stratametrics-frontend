import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface MarketGridProps {
  data: Coin[];
  loading: boolean;
}

export const MarketGrid: React.FC<MarketGridProps> = ({ data, loading }) => {
  if (loading) {
    return <div className="py-20 text-center text-[#7a746a]">Initializing Data Engine...</div>;
  }

  return (
    <div className="w-full overflow-hidden rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] shadow-[0_24px_80px_-30px_rgba(17,17,17,0.25)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e4dccf] text-xs uppercase tracking-[0.3em] text-[#7a746a]">
            <th className="px-6 py-4 font-medium">Asset</th>
            <th className="px-6 py-4 text-right font-medium">Price</th>
            <th className="px-6 py-4 text-right font-medium">24h Change</th>
            <th className="px-6 py-4 text-right font-medium">Market Cap</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((coin) => (
            <tr key={coin.id} className="border-b border-[#efe8db] transition-colors last:border-b-0 hover:bg-[#f2ebdf]">
              <td className="px-6 py-4 font-medium text-[#171717]">
                {coin.name} <span className="ml-1 uppercase text-[#7a746a]">{coin.symbol}</span>
              </td>
              <td className="px-6 py-4 text-right font-mono text-[#3f3a34]">
                ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
              <td className={`flex items-center justify-end gap-1 px-6 py-4 text-right ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {coin.price_change_percentage_24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </td>
              <td className="px-6 py-4 text-right font-mono text-[#7a746a]">
                ${(coin.market_cap / 1e9).toFixed(2)}B
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};