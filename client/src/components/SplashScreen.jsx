import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 160);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06080F] overflow-hidden select-none">
      {/* Ambient light blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/10 animate-aurora blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/10 animate-aurora blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} />

      {/* Fine grid texture */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-60" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg">

        {/* Logo mark */}
        <div className="relative mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-600/20 border border-white/10 flex items-center justify-center mb-0 shadow-glow-cyan backdrop-blur-xl">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 3" className="animate-spin-slow" style={{ animationDuration: '20s' }} />
              <path d="M20 8L24 18H30L25.5 24L27.5 34L20 29L12.5 34L14.5 24L10 18H16L20 8Z" fill="url(#star-grad)" />
              <defs>
                <linearGradient id="star-grad" x1="10" y1="8" x2="30" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22D3EE" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Orbiting dot */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '8s' }}>
            <div style={{ transform: 'translateY(-44px)' }} className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-sm" />
          </div>
        </div>

        {/* Word mark */}
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-2">
          NAVORA <span className="text-gradient-cyan">AI</span>
        </h1>

        {/* Tagline chips */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 label-overline text-cyan-300">
            <MapPin className="w-3 h-3 text-cyan-400" />
            Tumkur District
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="label-overline text-slate-400 tracking-widest">Karnataka</span>
        </div>

        <p className="text-slate-400 text-sm sm:text-base font-normal mb-10">
          Plan Less. Experience Tumkur.
        </p>

        {/* Progress */}
        <div className="w-48 h-px bg-white/8 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer group"
        >
          SKIP INTRO
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
