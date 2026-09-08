import React, { useState, useEffect } from 'react';
import { MapPin, Sparkles } from 'lucide-react';

const STEPS = [
  { icon: '🗺️', text: 'Loading Tumkur map data…' },
  { icon: '🤖', text: 'Warming up AI planner…' },
  { icon: '📍', text: 'Pinning local destinations…' },
  { icon: '✨', text: 'Ready to explore!' },
];

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 500);
    const t3 = setTimeout(() => setPhase(3), 800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase < 3) return;
    const interval = setInterval(() => {
      setStepIdx(prev => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 250);
          return 100;
        }
        return prev + 2.25;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06080F] overflow-hidden select-none">

      <style>{`
        @keyframes orbitA {
          from { transform: rotate(0deg) translateY(-58px) rotate(0deg); }
          to   { transform: rotate(360deg) translateY(-58px) rotate(-360deg); }
        }
        @keyframes orbitB {
          from { transform: rotate(0deg) translateY(-58px) rotate(0deg); }
          to   { transform: rotate(-360deg) translateY(-58px) rotate(360deg); }
        }
        .orbit-a { animation: orbitA 7s linear infinite; }
        .orbit-b { animation: orbitB 13s linear infinite; }
        @keyframes spinCW  { to { transform: rotate(360deg); } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }
        .spin-cw  { animation: spinCW  20s linear infinite; transform-origin: 24px 24px; }
        .spin-ccw { animation: spinCCW 12s linear infinite; transform-origin: 24px 24px; }

        /* Smooth diagonal scan beam */
        @keyframes scanBeam {
          0%   { transform: translateX(-110%) skewX(-18deg); opacity: 0; }
          15%  { opacity: 0.6; }
          85%  { opacity: 0.6; }
          100% { transform: translateX(210%) skewX(-18deg); opacity: 0; }
        }
        .scan-beam {
          animation: scanBeam 3.5s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        .scan-beam-2 {
          animation: scanBeam 3.5s cubic-bezier(0.4,0,0.2,1) infinite 1.75s;
        }

        /* Floating ambient dots */
        @keyframes floatDot {
          0%,100% { transform: translateY(0px);   opacity: 0.4; }
          50%      { transform: translateY(-14px); opacity: 0.9; }
        }
        .dot-float-1 { animation: floatDot 3.2s ease-in-out infinite; }
        .dot-float-2 { animation: floatDot 4.1s ease-in-out infinite 0.8s; }
        .dot-float-3 { animation: floatDot 2.8s ease-in-out infinite 1.5s; }
        .dot-float-4 { animation: floatDot 3.7s ease-in-out infinite 0.4s; }
        .dot-float-5 { animation: floatDot 5.0s ease-in-out infinite 2.1s; }
        .dot-float-6 { animation: floatDot 3.5s ease-in-out infinite 1.2s; }
      `}</style>

      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-cyan-500/10 animate-aurora blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/12 animate-aurora blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} />
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-30" />

      {/* Smooth diagonal scan beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scan-beam absolute top-0 left-0 w-[2px] h-full"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(34,211,238,0.5) 40%, rgba(124,58,237,0.5) 60%, transparent 100%)' }} />
        <div className="scan-beam-2 absolute top-0 left-0 w-[1px] h-full"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(34,211,238,0.3) 50%, transparent 100%)' }} />
      </div>

      {/* Floating glowing dots — scattered across screen */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dot-float-1 absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60"   style={{ top: '20%', left: '12%',  boxShadow: '0 0 8px #22D3EE' }} />
        <div className="dot-float-2 absolute w-1   h-1   rounded-full bg-violet-400/50" style={{ top: '35%', right: '10%', boxShadow: '0 0 6px #7C3AED' }} />
        <div className="dot-float-3 absolute w-2   h-2   rounded-full bg-cyan-300/30"   style={{ bottom: '28%', left: '8%' }} />
        <div className="dot-float-4 absolute w-1.5 h-1.5 rounded-full bg-violet-300/40" style={{ bottom: '22%', right: '12%', boxShadow: '0 0 6px #7C3AED' }} />
        <div className="dot-float-5 absolute w-1   h-1   rounded-full bg-cyan-400/50"   style={{ top: '60%', left: '18%',  boxShadow: '0 0 5px #22D3EE' }} />
        <div className="dot-float-6 absolute w-1.5 h-1.5 rounded-full bg-violet-400/35" style={{ top: '15%', right: '22%' }} />
      </div>


      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg">

        {/* Logo mark */}
        <div className="relative mb-8" style={{ opacity: 1 }}>
          {/* Glow halo */}
          <div className="absolute inset-0 rounded-2xl opacity-50 blur-2xl" style={{ background: 'rgba(34,211,238,0.3)', transform: 'scale(1.6)' }} />

          <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(13,18,36,0.9)', border: '1px solid rgba(34,211,238,0.38)', boxShadow: '0 0 50px rgba(34,211,238,0.3)' }}>
            <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="21" stroke="#22D3EE" strokeWidth="1" strokeDasharray="5 4" opacity="0.3" className="spin-cw"/>
              <circle cx="24" cy="24" r="16" stroke="url(#sp-ring)" strokeWidth="1.2" opacity="0.55" className="spin-ccw"/>
              <line x1="24" y1="8"  x2="24" y2="13" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="24" y1="35" x2="24" y2="40" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="8"  y1="24" x2="13" y2="24" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="35" y1="24" x2="40" y2="24" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M24 11L26.5 22H21.5L24 11Z" fill="#22D3EE"/>
              <path d="M24 37L21.5 26H26.5L24 37Z" fill="#7C3AED" opacity="0.75"/>
              <circle cx="24" cy="24" r="3.5" fill="url(#sp-center)"/>
              <circle cx="24" cy="24" r="1.5" fill="white" opacity="0.9"/>
              <circle cx="10.5" cy="34.5" r="2"   fill="#22D3EE" opacity="0.45"/>
              <circle cx="14.5" cy="31"   r="1.4"  fill="#22D3EE" opacity="0.28"/>
              <circle cx="18"   cy="28.5" r="0.8"  fill="#22D3EE" opacity="0.16"/>
              <defs>
                <linearGradient id="sp-ring" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22D3EE"/>
                  <stop offset="1" stopColor="#7C3AED"/>
                </linearGradient>
                <radialGradient id="sp-center">
                  <stop stopColor="#22D3EE"/>
                  <stop offset="1" stopColor="#7C3AED"/>
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Dual orbiting dots */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="orbit-a w-3 h-3 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px #22D3EE' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="orbit-b w-2 h-2 rounded-full bg-violet-400" style={{ boxShadow: '0 0 6px #7C3AED' }} />
          </div>
        </div>

        {/* Word mark */}
        <h1
          className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-2 transition-all duration-700"
          style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(18px)' }}
        >
          NAVORA <span className="text-gradient-cyan">AI</span>
        </h1>

        {/* Chips + tagline */}
        <div
          className="flex flex-col items-center gap-2.5 mb-6 transition-all duration-700"
          style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 label-overline text-cyan-300">
              <MapPin className="w-3 h-3 text-cyan-400" />
              Tumkur
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="label-overline text-slate-400 tracking-widest">Karnataka</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 label-overline text-violet-300">
              <Sparkles className="w-3 h-3" />
              AI Planner
            </span>
          </div>
          <p className="text-slate-500 text-sm font-light tracking-wide">
            Plan Less.{' '}<span className="text-cyan-300 font-medium">Experience More.</span>
          </p>
        </div>

        {/* Animated loading steps */}
        <div
          className="w-full max-w-[280px] mb-6 transition-all duration-700"
          style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)' }}
        >
          <div className="space-y-1.5">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-500"
                style={{
                  background: i === stepIdx ? 'rgba(34,211,238,0.07)' : 'transparent',
                  border: i === stepIdx ? '1px solid rgba(34,211,238,0.2)' : '1px solid transparent',
                  opacity: i <= stepIdx ? 1 : 0.2,
                  transform: i === stepIdx ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <span className="text-sm">{step.icon}</span>
                <span className={`text-[11px] font-mono tracking-wide flex-1 text-left ${
                  i === stepIdx ? 'text-cyan-300' : i < stepIdx ? 'text-slate-500' : 'text-slate-700'
                }`}>
                  {step.text}
                </span>
                {i < stepIdx && <span className="text-emerald-400 text-xs">✓</span>}
                {i === stepIdx && (
                  <span className="flex gap-0.5">
                    {[0,1,2].map(d => (
                      <span key={d} className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar + counter */}
        <div
          className="w-56 transition-all duration-700"
          style={{ opacity: phase >= 2 ? 1 : 0 }}
        >
          <div className="w-full h-[3px] bg-white/6 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150 ease-linear"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #22D3EE 0%, #7C3AED 100%)',
                boxShadow: '0 0 8px rgba(34,211,238,0.5)',
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] font-mono text-slate-700 tracking-widest uppercase">Initializing</span>
            <span className="text-[10px] font-mono text-cyan-500">{Math.min(100, Math.round(progress))}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
