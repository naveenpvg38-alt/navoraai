import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Compass, MapPin, CheckCircle2 } from 'lucide-react';

export default function GenerationLoader({ preferences }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    `Analyzing vibe: ${preferences.mood || 'Relaxed'} and selected interests...`,
    `Scanning Tumkur District scenic spots & heritage corridors in ${preferences.location || 'Tumkur'}...`,
    `Optimizing route via ${preferences.transport || 'Two-Wheeler'} to minimize travel time...`,
    `Balancing dwell durations, Thatte Idli stops & ${preferences.budget || 'moderate'} budget limits...`,
    `Synthesizing your personalized Tumkur itinerary and insider tips...`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center animate-fade-up">
      <div className="relative mb-10">
        {/* Outer rotating halo */}
        <div className="absolute -inset-4 rounded-full border border-cyan-500/25 animate-spin-slow" />
        <div className="absolute -inset-8 rounded-full border border-violet-500/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '24s' }} />

        {/* Outer glowing pulsing ring */}
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-cyan-400 via-indigo-600 to-violet-600 p-[3px] shadow-glow-cyan animate-float">
          <div className="w-full h-full bg-[#090D16] rounded-3xl flex items-center justify-center">
            <Brain className="w-14 h-14 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full p-2 shadow-glow-cyan animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
        <span>NEURAL ITINERARY SYNTHESIS</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-2">
        Crafting Your Tumkur Itinerary
      </h2>
      <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 font-light">
        ✦ NAVORA AI is evaluating real travel distances, historical importance, and food trails across Tumkur District.
      </p>

      {/* Steps checklist */}
      <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left shadow-2xl">
        {steps.map((text, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 transition-all duration-300 ${
                isCurrent ? 'opacity-100 scale-[1.01]' : isDone ? 'opacity-75' : 'opacity-25'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex-shrink-0 mt-0.5" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-xs sm:text-sm ${isCurrent ? 'text-cyan-300 font-semibold' : 'text-slate-300'}`}>
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
