import { ShieldCheck, TrendingUp } from 'lucide-react';

const summaryCards = [
  { label: 'Net Worth', value: '$842,310', change: '+4.8%', tone: 'text-emerald-700' },
  { label: 'Cash Balance', value: '$91,240', change: '+1.2%', tone: 'text-[#171717]' },
  { label: 'Risk Exposure', value: 'Moderate', change: 'Balanced', tone: 'text-[#7a746a]' },
];

const holdings = [
  { asset: 'BTC', size: '2.18', value: '$128,400', pnl: '+12.4%' },
  { asset: 'ETH', size: '14.6', value: '$44,200', pnl: '+3.1%' },
  { asset: 'NVDA', size: '118', value: '$66,700', pnl: '+8.9%' },
  { asset: 'SPY', size: '310', value: '$81,500', pnl: '-1.2%' },
];

export const PortfolioPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7a746a]">Portfolio</p>
          <h1 className="text-3xl font-semibold text-[#171717]">Private wealth overview</h1>
        </div>
        <div className="rounded-full border border-[#d8d0c2] bg-[#f8f4eb] px-4 py-2 text-sm text-[#605a53]">
          Updated 2m ago
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
            <p className="text-sm text-[#7a746a]">{card.label}</p>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-2xl font-semibold text-[#171717]">{card.value}</p>
              <p className={`text-sm font-medium ${card.tone}`}>{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#171717]">Holdings</h2>
              <p className="text-sm text-[#7a746a]">Current positions and performance</p>
            </div>
            <div className="rounded-full border border-[#d8d0c2] bg-white px-3 py-1 text-sm text-[#171717]">
              Diversified
            </div>
          </div>

          <div className="overflow-hidden rounded-[1rem] border border-[#e4dccf] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f5f1e8] text-[#7a746a]">
                <tr>
                  <th className="px-4 py-3 font-medium">Asset</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">P/L</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.asset} className="border-t border-[#efe8db]">
                    <td className="px-4 py-3 font-medium text-[#171717]">{holding.asset}</td>
                    <td className="px-4 py-3 text-[#605a53]">{holding.size}</td>
                    <td className="px-4 py-3 text-[#171717]">{holding.value}</td>
                    <td className={`px-4 py-3 font-medium ${holding.pnl.startsWith('-') ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {holding.pnl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
            <div className="mb-4 flex items-center gap-3">
              <TrendingUp className="text-[#171717]" size={20} />
              <h2 className="text-lg font-semibold text-[#171717]">Rebalance signal</h2>
            </div>
            <p className="text-sm leading-7 text-[#605a53]">
              Your cash allocation has drifted slightly above target. A trim into defensive names is now favorable.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="text-[#171717]" size={20} />
              <h2 className="text-lg font-semibold text-[#171717]">Protection</h2>
            </div>
            <p className="text-sm leading-7 text-[#605a53]">
              Your account remains secured with multi-factor authentication and protected market-data access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
