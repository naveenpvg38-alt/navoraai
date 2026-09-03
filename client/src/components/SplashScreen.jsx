import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ArrowRight, MapPin } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070A12] text-white px-6 overflow-hidden">
      {/* Background ambient lighting with aurora motion */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl pointer-events-none animate-aurora" style={{ animationDelay: '-7s' }} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md animate-fade-up">
        {/* Animated Glow Logo with Dual Ring */}
        <div className="relative mb-8">
          {/* Orbiting halo ring */}
          <div className="absolute -inset-3 rounded-full border border-cyan-500/30 animate-spin-slow" />
          <div className="absolute -inset-6 rounded-full border border-violet-500/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '24s' }} />

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-600 p-[2px] shadow-glow-cyan animate-float">
            <div className="w-full h-full bg-[#0B111F] rounded-3xl flex items-center justify-center">
              <Compass className="w-12 h-12 text-cyan-400 animate-spin" style={{ animationDuration: '16s' }} />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full p-2 shadow-glow-violet animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2 font-display bg-gradient-to-r from-white via-cyan-100 to-slate-300 bg-clip-text text-transparent">
          ✦ NAVORA AI
        </h1>

        {/* Subtitle & Tumkur Localization */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-3">
          <MapPin className="w-3 h-3 text-cyan-400" />
          Tumkur District Edition
        </div>

        <p className="text-slate-300 text-lg sm:text-xl font-light italic mb-8">
          “Plan Less. Experience Tumkur More.”
        </p>

        {/* Progress Bar */}
        <div className="w-72 h-2 bg-slate-900 rounded-full overflow-hidden mb-6 border border-slate-800 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 transition-all duration-300 rounded-full shadow-glow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onComplete}
          className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 cursor-pointer font-medium"
        >
          Explore Now <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
