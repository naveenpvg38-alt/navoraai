import React from 'react';

export default function Footer({ setActiveView }) {
  const handleNav = (view) => {
    if (setActiveView) {
      setActiveView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-800/60 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 glass-card">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Slogan */}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-white">✦ NAVORA AI</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">“Plan Less. Experience More.”</span>
        </div>

        {/* Essential Navigation */}
        <div className="flex items-center gap-5 text-xs text-slate-400">
          <button
            onClick={() => handleNav('home')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('planner')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Plan
          </button>
          <button
            onClick={() => handleNav('saved')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Saved
          </button>
          <button
            onClick={() => handleNav('profile')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Profile
          </button>
        </div>

        {/* Project Attribution */}
        <div className="text-slate-500 text-[11px]">
          Website Version • Prepared for Academic Project Submission
        </div>
      </div>
    </footer>
  );
}
