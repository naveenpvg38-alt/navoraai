import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Compass, MapPin, CheckCircle2 } from 'lucide-react';

export default function GenerationLoader({ preferences }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    `Analyzing vibe: ${preferences.mood || 'Relaxed'} and selected interests...`,
    `Querying geographic points of interest in ${preferences.location || 'your area'}...`,
    `Optimizing transit routes via ${preferences.transport || 'transit'} to eliminate backtracking...`,
    `Balancing dwell durations and ${preferences.budget || 'moderate'} budget limits...`,
    `Assembling your personalized timeline and insider tips...`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center animate-fade-in">
      <div className="relative mb-8">
        {/* Outer glowing pulsing ring */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[3px] animate-spin" style={{ animationDuration: '6s' }}>
          <div className="w-full h-full bg-[#090D16] rounded-full flex items-center justify-center">
            <Brain className="w-12 h-12 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-cyan-500 rounded-full p-2 shadow-glow-cyan">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
        Crafting Your Itinerary
      </h2>
      <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
        ✦ NAVORA AI is synthesizing local knowledge, route distances, and personal preferences into a cohesive day plan.
      </p>

      {/* Steps checklist */}
      <div className="w-full max-w-md bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3.5 text-left">
        {steps.map((text, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 transition-opacity duration-300 ${
                isCurrent ? 'opacity-100' : isDone ? 'opacity-70' : 'opacity-30'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex-shrink-0 mt-0.5" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-xs ${isCurrent ? 'text-cyan-300 font-semibold' : 'text-slate-300'}`}>
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
