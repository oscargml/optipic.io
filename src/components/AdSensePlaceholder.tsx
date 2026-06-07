import React, { useState } from 'react';
import { Sparkles, HelpCircle, Code, Eye, AlertCircle } from 'lucide-react';

interface AdSensePlaceholderProps {
  type: 'banner' | 'sidebar' | 'inline' | 'native';
  className?: string;
}

export default function AdSensePlaceholder({ type, className = '' }: AdSensePlaceholderProps) {
  const [showCode, setShowCode] = useState(false);

  // Layout-specific styling for the dark/stark typography theme
  const typeStyles = {
    banner: 'w-full min-h-[100px] md:min-h-[130px] bg-[#111111] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden',
    sidebar: 'w-full min-h-[300px] bg-[#111111] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden',
    inline: 'w-full min-h-[220px] md:min-h-[260px] bg-[#111111] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-5 relative overflow-hidden',
    native: 'w-full min-h-[150px] bg-[#111111] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden',
  };

  const adCodeSnippet = `<!-- Google AdSense Responsive Ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9812739218237192"
     data-ad-slot="9102830291"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  return (
    <div className={`${typeStyles[type]} ${className}`} id={`adsense-${type}`}>
      {/* Monetization overlay tag */}
      <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono tracking-widest text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30">
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        SPONSOR ADSENSE UNIT
      </div>

      {!showCode ? (
        <div className="flex flex-col items-center text-center max-w-lg space-y-2">
          {type === 'banner' && (
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Premium Ad Banner Slot (Leaderboard 728x90)</span>
              <p className="text-[10px] text-white/40 max-w-md font-mono uppercase tracking-tight">
                Positioned strategically near the footer and tab panels to secure ultimate viewability.
              </p>
            </div>
          )}

          {type === 'sidebar' && (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center border border-blue-900/30">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">Vertical Skyscraper Slot (300x600)</span>
                <p className="text-[10px] text-white/40 max-w-xs uppercase font-mono leading-relaxed">
                  Interactive sidebars generate standard CPC spikes from long user canvas interactions.
                </p>
              </div>
              <div className="bg-[#151515] p-3 rounded-xl border border-white/5 text-[10px] text-white/50 text-left space-y-1 w-full font-mono">
                <div className="font-bold text-amber-400 flex items-center gap-1 uppercase">
                  <AlertCircle className="w-3.5 h-3.5" />
                  AD REVENUE TIP
                </div>
                A high CPC layout maximizes programmatic earnings on local utility hubs with prolonged view times.
              </div>
            </div>
          )}

          {type === 'inline' && (
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider">In-Article Native Ad (Responsive Content)</span>
              <p className="text-[10px] text-white/40 max-w-sm font-mono uppercase leading-relaxed">
                Appears organically between content blocks inside the blog articles for maximum natural conversions.
              </p>
            </div>
          )}

          {type === 'native' && (
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Inline Utility Anchor Block (336x280 Rectangle)</span>
              <p className="text-[10px] text-white/40 font-mono uppercase">
                Rendered right below processing results, converting active attention into high CTR events.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowCode(true)}
            id={`btn-showcode-${type}`}
            type="button"
            className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" />
            Check AdSense Code
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col h-full text-left space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <Code className="w-4 h-4 text-blue-400" />
              INTEGRATION ARCHITECTURE
            </span>
            <button
              onClick={() => setShowCode(false)}
              id={`btn-hidecode-${type}`}
              className="text-[10px] text-white/40 hover:text-white uppercase font-bold tracking-wider flex items-center gap-1 bg-transparent border-0 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              Show Ad Frame
            </button>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed font-mono uppercase">
            Replace this placeholder with your official Google AdSense code. The script dynamically handles matching responsive layouts.
          </p>
          <pre className="bg-black p-3.5 rounded-xl text-[10px] text-emerald-400 font-mono overflow-x-auto border border-white/5 max-h-[140px] shadow-inner select-all">
            {adCodeSnippet}
          </pre>
          <div className="flex items-center gap-1.5 text-[9px] text-[#A6A6A6] font-mono uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400 font-bold" />
            Tip: Keep search-volume density around 2% to ensure perfect index matches!
          </div>
        </div>
      )}
    </div>
  );
}
