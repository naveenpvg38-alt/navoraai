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

        {/* Logo mark — Compass + Route */}
        <div className="relative mb-10">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-glow-cyan backdrop-blur-xl"
            style={{ background: 'rgba(13,18,36,0.85)', border: '1px solid rgba(34,211,238,0.3)', boxShadow: '0 0 40px rgba(34,211,238,0.2)' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              {/* Outer ring — dashed spinning */}
              <circle cx="24" cy="24" r="21" stroke="#22D3EE" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.35" className="animate-spin-slow" style={{ animationDuration: '20s' }}/>
              {/* Compass ring */}
              <circle cx="24" cy="24" r="16" stroke="url(#sp-ring)" strokeWidth="1.2" opacity="0.6"/>
              {/* Cardinal ticks */}
              <line x1="24" y1="8"  x2="24" y2="12" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="24" y1="36" x2="24" y2="40" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="8"  y1="24" x2="12" y2="24" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="36" y1="24" x2="40" y2="24" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round"/>
              {/* North needle (cyan) */}
              <path d="M24 12L26 22H22L24 12Z" fill="#22D3EE"/>
              {/* South needle (violet) */}
              <path d="M24 36L22 26H26L24 36Z" fill="#7C3AED" opacity="0.7"/>
              {/* Center glow dot */}
              <circle cx="24" cy="24" r="3" fill="url(#sp-center)"/>
              {/* Route trail dots (SW corner — Tumkur roads) */}
              <circle cx="10.5" cy="34.5" r="2" fill="#22D3EE" opacity="0.4"/>
              <circle cx="14.5" cy="31"   r="1.3" fill="#22D3EE" opacity="0.28"/>
              <circle cx="18"   cy="28.5" r="0.8" fill="#22D3EE" opacity="0.18"/>
              <defs>
                <linearGradient id="sp-ring" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22D3EE"/>
                  <stop offset="1" stopColor="#7C3AED"/>
                </linearGradient>
                <radialGradient id="sp-center" cx="50%" cy="50%" r="50%">
                  <stop stopColor="#22D3EE"/>
                  <stop offset="1" stopColor="#7C3AED"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
          {/* Orbiting dot */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '8s' }}>
            <div style={{ transform: 'translateY(-50px)' }} className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-sm" />
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
            Tumkur
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="label-overline text-slate-400 tracking-widest">Karnataka</span>
        </div>

        <p className="text-slate-400 text-sm sm:text-base font-normal mb-10">
          Plan Less. Experience More.
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
