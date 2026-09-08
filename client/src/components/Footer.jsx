import React from 'react';

export default function Footer({ setActiveView }) {
  const handleNav = (view) => {
    if (setActiveView) {
      setActiveView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/8 bg-[#06080F]/90 backdrop-blur-xl text-slate-400 text-xs py-10 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Row: Brand, Tagline & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/6">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">✦</span>
              <span className="font-display font-bold text-base text-white tracking-wide">
                NAVORA AI
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-medium">Tumkur Outing Planner</span>
            </div>
            <p className="text-slate-500 text-xs max-w-md">
              AI-driven day excursions optimized for Tumkur District, Karnataka with zero backtracking.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center flex-wrap justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => handleNav('planner')}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Plan Outing
            </button>
            <button
              onClick={() => handleNav('saved')}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Saved Trips
            </button>
            <button
              onClick={() => handleNav('profile')}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Profile
            </button>
            <button
              onClick={() => handleNav('home')}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Home
            </button>
          </div>
        </div>

        {/* Informative Highlights Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400 py-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
            <span className="text-slate-300">
              Coverage: <span className="text-slate-400">DD Hills · Madhugiri · Kyathsandra · Namada Chilume · Amanikere</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 shrink-0">
            <span>⚡ Timed Circuits</span>
            <span>✓ 0km Backtracking</span>
            <span>📍 Karnataka, India</span>
          </div>
        </div>

        {/* Bottom Copyright & Slogan */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-[11px] text-slate-600 border-t border-white/5">
          <div>
            © {new Date().getFullYear()} NAVORA AI · <span className="text-slate-500 font-medium">“Plan Less. Experience More.”</span>
          </div>
          <div className="font-mono text-[10px]">
            Academic Project Edition
          </div>
        </div>
      </div>
    </footer>
  );
}
