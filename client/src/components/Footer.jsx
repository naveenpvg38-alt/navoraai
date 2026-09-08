import React from 'react';
import {
  Sparkles,
  MapPin,
  Route,
  Clock,
  Shield,
  Phone,
  ExternalLink,
  ChevronRight,
  Compass,
  Zap,
  Heart
} from 'lucide-react';

export default function Footer({ setActiveView, onOpenAuth, user }) {
  const handleNav = (view) => {
    if (setActiveView) {
      setActiveView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#06080F]/95 backdrop-blur-2xl text-slate-400 text-xs z-10">
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          
          {/* Col 1: Brand & District Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-glow-sm">
                ✦
              </span>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                NAVORA <span className="text-gradient-cyan">AI</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              An intelligent excursion planner tailored exclusively for{' '}
              <span className="text-slate-200 font-medium">Tumkur District, Karnataka</span>.
              Synthesizing graph route optimization, zero backtracking, and hyper-local cultural intelligence.
            </p>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[11px] text-slate-300 font-semibold">
                  Tumkur Route Engine · Active
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-white/5">
                <span>Coverage: 10 Taluks</span>
                <span className="text-cyan-400">50+ Curated Spots</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Tumkur HQ · 13.3409° N, 77.1010° E</span>
            </div>
          </div>

          {/* Col 2: Iconic Tumkur Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Curated Destinations
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs">
              <li className="flex items-start gap-2 hover:text-cyan-300 transition-colors">
                <span className="text-slate-600 shrink-0 mt-0.5">⛰️</span>
                <div>
                  <span className="text-slate-300 font-medium">Devarayanadurga (DD Hills)</span>
                  <p className="text-[11px] text-slate-500">1,204m Peak Sunrise & Narasimha Shrine</p>
                </div>
              </li>
              <li className="flex items-start gap-2 hover:text-cyan-300 transition-colors">
                <span className="text-slate-600 shrink-0 mt-0.5">🍽️</span>
                <div>
                  <span className="text-slate-300 font-medium">Kyathsandra Food Trail</span>
                  <p className="text-[11px] text-slate-500">Authentic Thatte Idli & Filter Kaapi</p>
                </div>
              </li>
              <li className="flex items-start gap-2 hover:text-cyan-300 transition-colors">
                <span className="text-slate-600 shrink-0 mt-0.5">🏰</span>
                <div>
                  <span className="text-slate-300 font-medium">Madhugiri Monolith Fort</span>
                  <p className="text-[11px] text-slate-500">Asia's 2nd Largest Monolith Citadel</p>
                </div>
              </li>
              <li className="flex items-start gap-2 hover:text-cyan-300 transition-colors">
                <span className="text-slate-600 shrink-0 mt-0.5">🦌</span>
                <div>
                  <span className="text-slate-300 font-medium">Namada Chilume Spring</span>
                  <p className="text-[11px] text-slate-500">Sacred Perennial Spring & Deer Reserve</p>
                </div>
              </li>
              <li className="flex items-start gap-2 hover:text-cyan-300 transition-colors">
                <span className="text-slate-600 shrink-0 mt-0.5">🏞️</span>
                <div>
                  <span className="text-slate-300 font-medium">Amanikere Lake & Park</span>
                  <p className="text-[11px] text-slate-500">Lakeside Promenade & Sunset Boating</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Engine Features & AI Model */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-400" />
              Engine Features
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                <Route className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Zero-Backtracking TSP Route Graph</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Timed Arrival & Dwell Schedules</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Rupee Budget Accuracy (₹/person)</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Multi-Vibe Persona Customization</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Interactive Leaflet GIS Map Sync</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                <Heart className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Surprise Vibe Roulette Generator</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Helplines */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              Navigation & Helplines
            </h4>
            
            <div className="space-y-2 mb-5">
              <button
                onClick={() => handleNav('planner')}
                className="w-full text-left flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-cyan-500/10 hover:text-cyan-300 border border-white/6 hover:border-cyan-500/30 transition-all cursor-pointer group"
              >
                <span className="font-medium text-slate-300 group-hover:text-cyan-300">Plan New Outing</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleNav('saved')}
                className="w-full text-left flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/6 hover:text-white border border-white/6 transition-all cursor-pointer group"
              >
                <span className="font-medium text-slate-300 group-hover:text-white">Saved Itineraries</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleNav('profile')}
                className="w-full text-left flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/6 hover:text-white border border-white/6 transition-all cursor-pointer group"
              >
                <span className="font-medium text-slate-300 group-hover:text-white">Profile & Settings</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Emergency & Tourism Contacts */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[11px] font-mono">
              <div className="text-slate-300 font-semibold mb-1">Local Helplines:</div>
              <div className="flex justify-between text-slate-400">
                <span>District Police:</span>
                <span className="text-cyan-400 font-bold">112</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Ambulance / Health:</span>
                <span className="text-emerald-400 font-bold">108</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>KSTDC Tourism:</span>
                <span className="text-slate-300">1800-425-4666</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} NAVORA AI</span>
            <span>•</span>
            <span className="text-slate-400">Tumkur District, Karnataka</span>
            <span>•</span>
            <span className="text-cyan-400 font-medium">“Plan Less. Experience More.”</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-600">
            <span className="px-2 py-0.5 rounded bg-white/4 border border-white/8 text-slate-400">
              Academic Project Edition
            </span>
            <span>React · Vite · Tailwind · Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
