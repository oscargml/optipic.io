import { useState } from 'react';
import { ActiveTab } from './types';
import ImageConverter from './components/ImageConverter';
import ImageResizer from './components/ImageResizer';
import ImageCompressor from './components/ImageCompressor';
import BlogSection from './components/BlogSection';
import SeoInsights from './components/SeoInsights';
import { Sparkles, Image as ImageIcon, Crop, Sliders, ShieldCheck, HelpCircle, BookOpen, Calculator, DollarSign, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('converter');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col justify-between antialiased">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20">
              <ImageIcon className="w-5.5 h-5.5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter font-display uppercase block text-white">
                OPTIPIC<span className="text-blue-500">.IO</span>
              </span>
              <p className="text-[9px] text-white/40 font-mono tracking-widest uppercase">OFFLINE IMAGING TOOLKIT</p>
            </div>
          </div>

          {/* Secure Client Sandbox Notice tag */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[9px] font-bold tracking-widest text-[#B2B2B2] font-mono uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            [✓] 100% SECURE SANDBOXED ENGINE
          </div>
        </div>
      </header>

      {/* Main workspace section */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-8">
        
        {/* Intro Bento Dashboard Grid */}
        <div className="bg-[#111111] rounded-3xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden border border-white/5">
          {/* Visual accent glows */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />

          <div className="space-y-4 max-w-2xl z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-amber-400 bg-amber-950/40 border border-amber-900/30 px-2.5 py-0.5 rounded">
                NO CLOUD UPLOADS
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-0.5 rounded">
                ADSENSE MONETIZED HUB
              </span>
            </div>

            {/* Premium giant display typography with stroke */}
            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white uppercase leading-[0.9]">
              CONVERT<br />ANYTHING<br />
              <span className="text-outline-white">TO WEBP OFFLINE</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans max-w-xl">
              Our batch image processor executes resizing, converter workflows, and weight optimization inside your local browser. Rapid, stateless interaction guaranteeing zero remote tracking vectors.
            </p>
          </div>

          <div className="bg-[#151515] border border-white/10 p-5 rounded-2xl flex flex-col gap-3 lg:w-96 shadow-inner z-10">
            <div className="text-[10px] font-bold text-white/80 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              PRIVACY COMPLIANCE LOGS
            </div>
            <div className="space-y-2 text-[11px] font-mono text-white/40">
              <p className="flex items-start gap-2">
                <span className="text-blue-500">[✓]</span>
                <span>Zero bandwidth leaks (mathematically isolated files).</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-500">[✓]</span>
                <span>Requires no cloud signup or payment plans.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-500">[✓]</span>
                <span>Unrestricted batch operations (process infinite images).</span>
              </p>
            </div>
          </div>
        </div>

        {/* Global Tab Switcher */}
        <div className="flex flex-wrap items-center bg-[#111111] border border-white/5 rounded-2xl p-2 gap-1.5" id="global-tabs-switcher">
          {(
            [
              { id: 'converter', label: 'Image Converter', icon: ImageIcon },
              { id: 'resizer', label: 'Proportional Resizer', icon: Crop },
              { id: 'compressor', label: 'Compressor Tool', icon: Sliders },
              { id: 'blog', label: 'SEO Resource Hub', icon: BookOpen },
              { id: 'insights', label: 'AdSense Profit Matrix', icon: Calculator },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-[#8C8C8C] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : 'text-[#5A5A5A]'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Viewport Route Container */}
        <div className="transition-all duration-300">
          {activeTab === 'converter' && <ImageConverter />}
          {activeTab === 'resizer' && <ImageResizer />}
          {activeTab === 'compressor' && <ImageCompressor />}
          {activeTab === 'blog' && <BlogSection />}
          {activeTab === 'insights' && <SeoInsights />}
        </div>

      </main>

      {/* Structured compliant Adsense footer overview layout */}
      <footer className="bg-[#111111] border-t border-white/5 py-10 px-6 text-white/40 space-y-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">OP</div>
            <span className="font-bold font-sans text-xs uppercase tracking-widest text-[#D3D3D3]">OptiPic.io Engine</span>
          </div>

          {/* Compliance privacy guidelines links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[9px] uppercase tracking-wider text-white/50">
            <span className="hover:text-blue-400 transition-colors cursor-pointer select-none">Terms of Service</span>
            <span>/</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer select-none">Privacy (Sandbox Protection)</span>
            <span>/</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer select-none">AdSense Publisher Center</span>
            <span>/</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer select-none">Sitemap SEO Index</span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse mx-0.5" />
            <span className="text-white/60 font-semibold">AdSense Monetizers</span>
          </div>
        </div>

        <p className="max-w-4xl mx-auto leading-relaxed text-[10px] font-mono text-center text-white/30">
          Copyright © 2026 OPTIPIC.io. Under standard MIT license permissions. Google, Google AdSense, and PageSpeed Insights are trademarks of Google LLC. This stateless client-side webapp complies with Google Publisher Policies requiring high-value local tools paired with dedicated indexable text guides.
        </p>

        {/* Dynamic bottom status bar mirroring Design HTML */}
        <div className="w-full bg-blue-600 rounded-xl px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white flex flex-col sm:flex-row justify-between items-center gap-2 shadow-lg">
          <div>STATUS: ALL CODES FUNCTIONING OFFLINE</div>
          <div>SPEED RATE: 0.035s INTER-CANVAS SPEED</div>
          <div>PRIVACY ARCHITECTURE: GDPR / CCPA APPROVED</div>
        </div>
      </footer>

    </div>
  );
}
