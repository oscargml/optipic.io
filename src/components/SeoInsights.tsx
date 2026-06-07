import { useState } from 'react';
import { SeoKeyword } from '../types';
import { Sparkles, DollarSign, ArrowUpRight, TrendingUp, Info, HelpCircle, Laptop, Calculator } from 'lucide-react';

const SE_KEYWORDS: SeoKeyword[] = [
  { keyword: 'convert webp to png offline', volume: '18,500/mo', difficulty: 'Low', cpc: '$2.10', intent: 'Transactional' },
  { keyword: 'bulk compress images offline', volume: '45,000/mo', difficulty: 'Medium', cpc: '$1.80', intent: 'Transactional' },
  { keyword: 'image resizer client side', volume: '12,200/mo', difficulty: 'Low', cpc: '$3.40', intent: 'Commercial' },
  { keyword: 'private batch photo editor', volume: '9,400/mo', difficulty: 'Low', cpc: '$4.15', intent: 'Commercial' },
  { keyword: 'convert jpeg to webp online', volume: '220,000/mo', difficulty: 'High', cpc: '$0.85', intent: 'Informational' },
  { keyword: 'secure passport size photo reducer', volume: '15,000/mo', difficulty: 'Low', cpc: '$1.50', intent: 'Transactional' },
];

export default function SeoInsights() {
  // Revenue Estimator inputs
  const [traffic, setTraffic] = useState(25000); // Monthly page views
  const [cpc, setCpc] = useState(1.85); // CPC dollars
  const [ctr, setCtr] = useState(2.2); // CTR percent

  // Math calculated values
  const monthlyClicks = Math.round((traffic * (ctr / 100)));
  const monthlyRevenue = Math.round(monthlyClicks * cpc);
  const dailyEarnings = parseFloat((monthlyRevenue / 30.5).toFixed(2));
  const annualRevenue = monthlyRevenue * 12;

  return (
    <div className="space-y-6" id="seo-insights-container">
      {/* Title section */}
      <div className="bg-[#111111] p-6 rounded-3xl border border-white/5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight font-display">
            <TrendingUp className="w-5.5 h-5.5 text-blue-500" />
            ADSENSE MONETIZATION &amp; KEYWORD INDEX
          </h2>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-mono">
            Analyze profitable search parameters and estimate programmatic yield margins dynamically.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-950/40 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-amber-900/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          HIGH VOLUME BLUEPRINT
        </div>
      </div>

      {/* Grid: Keyword Data & Revenue Estimator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Keyword list container */}
        <div className="bg-[#111111] rounded-3xl border border-white/5 p-6 shadow-md flex flex-col">
          <div className="mb-5 pb-3.5 border-b border-white/5">
            <h3 className="text-xs font-black text-white flex items-center gap-1.5 uppercase tracking-widest font-display">
              <Laptop className="w-5 h-5 text-blue-400" />
              Profitable Keyword Targets
            </h3>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-mono">
              In-market indicators with low competitive densities and high CPC advertising valuations.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            {SE_KEYWORDS.map((item, idx) => (
              <div key={idx} className="p-4 bg-[#151515] hover:bg-[#1a1a1a] border border-white/5 rounded-2xl transition-all">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="font-mono text-[10px] font-bold text-white break-all bg-white/5 px-2.5 py-1 rounded border border-white/5 uppercase tracking-wide">
                    {item.keyword}
                  </span>
                  <span className={`px-2 py-1 text-[8px] font-bold rounded uppercase tracking-wider ${
                    item.difficulty === 'Low' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' :
                    item.difficulty === 'Medium' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/30' :
                    'bg-rose-950/40 text-rose-400 border border-rose-900/30'
                  }`}>
                    {item.difficulty} KD
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-white/5 text-center font-mono uppercase tracking-wide">
                  <div>
                    <span className="text-[8px] text-white/30 block font-bold">Search Volume</span>
                    <span className="text-[11px] font-bold text-white mt-1 block font-mono">{item.volume}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-white/30 block font-bold">EST CPC</span>
                    <span className="text-[11px] font-bold text-blue-400 mt-1 block flex items-center justify-center font-mono">
                      <DollarSign className="w-3 h-3 text-blue-400" />
                      {item.cpc.replace('$', '')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-white/30 block font-bold">Intent Target</span>
                    <span className="text-[11px] font-bold text-[#C1C1C1] mt-1 block font-sans">{item.intent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 bg-blue-950/30 border border-blue-900/20 rounded-xl text-[10px] font-mono uppercase tracking-wider text-blue-400 flex gap-2.5 items-start leading-relaxed">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong>AdSense Strategy:</strong> Transactional topics trigger maximum bidding algorithms due to high sponsor competition. Pairing guides directly with utilities doubles yield values!
            </div>
          </div>
        </div>

        {/* Dynamic AdSense Calculator Wrapper */}
        <div className="bg-[#111111] text-white rounded-3xl border border-white/5 p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="mb-5 pb-3.5 border-b border-white/5">
              <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-amber-400 bg-amber-950/40 border border-amber-900/30 px-2.5 py-0.5 rounded">
                DYNAMIC ROI ESTIMATOR
              </span>
              <h3 className="text-xs font-black text-white mt-3.5 flex items-center gap-1.5 uppercase tracking-widest font-display">
                <Calculator className="w-5 h-5 text-amber-500 animate-pulse" />
                Earnings Simulation matrix
              </h3>
              <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-mono">
                Slide the parameters below to verify estimated programmatic returns based on performance thresholds.
              </p>
            </div>

            {/* Sliders space */}
            <div className="space-y-6 my-6 font-mono uppercase tracking-widest">
              {/* Slider 1: Monthly Traffic */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/50 flex items-center gap-1.5 font-bold">
                    [1] Monthly Pageviews
                    <HelpCircle className="w-3.5 h-3.5 text-white/20 cursor-help" title="Number of page visits" />
                  </span>
                  <span className="font-mono text-emerald-400 font-bold text-xs">{traffic.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={traffic}
                  id="traffic-slider"
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[8px] text-white/20 font-mono tracking-widest">
                  <span>5K</span>
                  <span>100K</span>
                  <span>250K</span>
                  <span>500K</span>
                </div>
              </div>

              {/* Slider 2: Click Through Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/50 flex items-center gap-1.5 font-bold">
                    [2] Average CTR (%)
                    <HelpCircle className="w-3.5 h-3.5 text-white/20 cursor-help" title="Percentage of visitors clicking ads" />
                  </span>
                  <span className="font-mono text-blue-400 font-bold text-xs">{ctr}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.1"
                  value={ctr}
                  id="ctr-slider"
                  onChange={(e) => setCtr(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[8px] text-white/20 font-mono tracking-widest">
                  <span>0.5%</span>
                  <span>2.0%</span>
                  <span>4.0%</span>
                  <span>8.0%</span>
                </div>
              </div>

              {/* Slider 3: Cost Per Click */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/50 flex items-center gap-1.5 font-bold">
                    [3] Target CPC Bids
                    <HelpCircle className="w-3.5 h-3.5 text-white/20 cursor-help" title="Advertiser valuation paid per click" />
                  </span>
                  <span className="font-mono text-amber-400 font-bold text-xs">${cpc.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="5.00"
                  step="0.05"
                  value={cpc}
                  id="cpc-slider"
                  onChange={(e) => setCpc(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[8px] text-white/20 font-mono tracking-widest">
                  <span>$0.10</span>
                  <span>$1.50</span>
                  <span>$3.00</span>
                  <span>$5.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time earnings panel results */}
          <div className="bg-[#0f0f0f] border border-white/5 p-4.5 rounded-2xl grid grid-cols-3 gap-2 text-center relative overflow-hidden">
            {/* Ambient background designs */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/5 rounded-full blur-xl" />
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />

            <div className="border-r border-white/5 pr-1 select-all font-mono uppercase tracking-wider">
              <span className="text-[8px] text-white/30 block font-bold">Daily earnings</span>
              <span className="text-xs md:text-sm font-black text-white mt-1.5 block font-mono">${dailyEarnings}</span>
            </div>
            <div className="border-r border-white/5 px-1 select-all font-mono uppercase tracking-wider">
              <span className="text-[8px] text-white/30 block font-bold">Monthly sum</span>
              <span className="text-xs md:text-sm font-black text-emerald-400 mt-1.5 block font-mono">${monthlyRevenue.toLocaleString()}</span>
            </div>
            <div className="pl-1 select-all font-mono uppercase tracking-wider">
              <span className="text-[8px] text-white/30 block font-bold">Annual ROAS</span>
              <span className="text-xs md:text-sm font-black text-amber-400 mt-1.5 block font-mono flex items-center justify-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
                ${annualRevenue.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-[9px] font-mono uppercase text-white/20 text-center mt-4">
            [Simulation coordinates represent programmatic averages. Actual results vary on niche search volumes.]
          </div>
        </div>

      </div>
    </div>
  );
}
