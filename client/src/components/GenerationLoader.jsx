import React, { useState } from 'react';
import { CheckCircle2, Brain, Sparkles } from 'lucide-react';

export default function GenerationLoader({ preferences }) {
  const [currentStep] = useState(() => 0);
  const [step, setStep] = React.useState(0);

  const steps = [
    `Analyzing vibe: ${preferences.mood || 'Relaxed'} and selected interests...`,
    `Scanning Tumkur District landmarks in ${preferences.location || 'Tumkur'}...`,
    `Optimizing route via ${preferences.transport || 'Two-Wheeler'} to minimize travel time...`,
    `Balancing dwell durations and ${preferences.budget || 'moderate'} budget limits...`,
    `Assembling your personalized itinerary and insider tips...`,
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [steps.length]);

  const progressPct = steps.length > 1 ? (step / (steps.length - 1)) * 100 : 0;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
      {/* Animated logo */}
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center animate-float mb-8"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <svg width="40" height="40" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L12.5 9H19L13.5 13L15.5 20L10 16L4.5 20L6.5 13L1 9H7.5L10 2Z"
            fill="url(#gl-grad)" />
          <defs>
            <linearGradient id="gl-grad" x1="1" y1="2" x2="19" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22D3EE"/>
              <stop offset="1" stopColor="#7C3AED"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className="label-overline mb-3">AI Synthesis In Progress</p>
      <h1 className="font-display text-5xl sm:text-6xl text-white text-center leading-none mb-3">
        BUILDING YOUR PLAN
      </h1>
      <p className="text-slate-600 text-sm font-light text-center max-w-xs mb-10">
        Evaluating real distances, local food trails, and heritage sites across Tumkur District.
      </p>

      {/* Steps card */}
      <div className="w-full max-w-md p-6 rounded-2xl space-y-4 mb-6"
        style={{ background: 'rgba(13,18,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {steps.map((text, idx) => {
          const isDone    = idx < step;
          const isCurrent = idx === step;
          return (
            <div key={idx} className={`flex items-start gap-3 transition-all duration-300 ${
              isCurrent ? 'opacity-100' : isDone ? 'opacity-50' : 'opacity-20'
            }`}>
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex-shrink-0 mt-0.5" />
              ) : (
                <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
              )}
              <span className={`text-sm ${isCurrent ? 'text-white font-medium' : isDone ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                {text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-px rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progressPct}%`,
            background: 'linear-gradient(90deg, #22D3EE, #7C3AED)',
          }}
        />
      </div>
      <p className="font-mono text-[10px] text-slate-700 tracking-widest mt-3">
        {Math.round(progressPct)}% COMPLETE
      </p>
    </div>
  );
}
