import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ArrowRight } from 'lucide-react';

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
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090D16] text-white px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Animated Glow Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[2px] shadow-glow-cyan animate-float">
            <div className="w-full h-full bg-[#0E1526] rounded-3xl flex items-center justify-center">
              <Compass className="w-12 h-12 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 bg-violet-500 rounded-full p-1.5 shadow-glow-violet">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 font-display bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          ✦ NAVORA AI
        </h1>

        {/* Subtitle & Academic Spec Tagline */}
        <p className="text-cyan-400 font-medium tracking-wide uppercase text-xs mb-3">
          AI-Powered Personalized Outing Planner
        </p>
        <p className="text-slate-400 text-lg font-light italic mb-8">
          “Plan Less. Experience More.”
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onComplete}
          className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors duration-200"
        >
          Skip Intro <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
