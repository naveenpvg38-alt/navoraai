import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Wallet, 
  MapPin, 
  Heart, 
  Bookmark, 
  CheckCircle, 
  Share2, 
  Printer, 
  ArrowLeft, 
  Route, 
  Compass, 
  Info,
  Footprints,
  Train,
  Car,
  Lightbulb,
  Check
} from 'lucide-react';
import LeafletMap from './LeafletMap';

export default function ItineraryView({ 
  plan, 
  user, 
  onSave, 
  onToggleFavourite, 
  onToggleComplete, 
  onBack,
  onOpenAuth 
}) {
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!plan) return null;

  const handleShare = () => {
    const text = `✦ NAVORA AI Outing: ${plan.title}\nDuration: ${plan.duration}\nCost: ${plan.estimated_cost}\nStops: ${plan.items.map((it, idx) => `${idx + 1}. ${it.place_name} (${it.start_time})`).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveClick = async () => {
    if (!user) {
      onOpenAuth('login');
      return;
    }
    await onSave(plan);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 animate-fade-in">
      {/* Top navigation & back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Planner</span>
        </button>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Share Itinerary"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print / PDF Export"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {plan.plan_id && (
            <>
              <button
                onClick={() => onToggleFavourite(plan.plan_id)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  plan.is_favourite
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                    : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white'
                }`}
                title="Favourite"
              >
                <Heart className={`w-4 h-4 ${plan.is_favourite ? 'fill-rose-500' : ''}`} />
                <span className="hidden sm:inline">{plan.is_favourite ? 'Favourited' : 'Favourite'}</span>
              </button>

              <button
                onClick={() => onToggleComplete(plan.plan_id)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  plan.is_completed
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white'
                }`}
                title="Mark Completed"
              >
                <CheckCircle className={`w-4 h-4 ${plan.is_completed ? 'fill-emerald-500 text-slate-950' : ''}`} />
                <span className="hidden sm:inline">{plan.is_completed ? 'Completed' : 'Complete'}</span>
              </button>
            </>
          )}

          {!plan.plan_id && (
            <button
              onClick={handleSaveClick}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white shadow-glow-cyan/30'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{saveSuccess ? 'Saved to Profile!' : 'Save Plan'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Plan Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-aurora" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold shadow-glow-cyan">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                {plan.match_score || 98}% Match Score
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                {plan.location || 'Tumkur, Karnataka'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-medium">
                {plan.mood || 'Curated'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {plan.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed font-light">
              {plan.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 lg:gap-4 self-start lg:self-center">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[120px] shadow-lg">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1 mb-1 font-mono">
                <Clock className="w-3 h-3 text-cyan-400" /> Duration
              </div>
              <div className="text-sm font-bold font-mono text-white">{plan.duration}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[140px] shadow-lg">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1 mb-1 font-mono">
                <Wallet className="w-3 h-3 text-emerald-400" /> Est. Cost
              </div>
              <div className="text-sm font-bold font-mono text-emerald-400">{plan.estimated_cost}</div>
            </div>
          </div>
        </div>

        {/* Why this matches your vibe with neon border */}
        {plan.why_matched && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-start gap-3 p-4 rounded-2xl bg-slate-950/40 border border-cyan-500/20 shadow-inner">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex-shrink-0 mt-0.5 shadow-glow-cyan/50">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 mb-1">
                ✦ AI Insight: Why This Plan Matches Your Vibe
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {plan.why_matched}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Layout: Timeline + Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sequential Itinerary Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Route className="w-5 h-5 text-cyan-400" />
              <span>Step-by-Step Itinerary</span>
            </h2>
            <span className="text-xs text-slate-400">{plan.items?.length || 0} stops</span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8">
            {plan.items?.map((item, index) => (
              <div key={item.item_id || index} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-xs font-bold text-cyan-300 shadow-glow-cyan/50 group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>

                {/* Transit badge before this stop if not first stop */}
                {index > 0 && item.travel_time && (
                  <div className="mb-3 -mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-cyan-300">
                    <Train className="w-3 h-3 text-cyan-400" />
                    <span>{item.travel_time}</span>
                  </div>
                )}

                {/* Stop Card */}
                <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 hover:border-slate-700 transition-all duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">
                      {item.category || 'Curated Stop'}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.start_time} – {item.end_time}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-2">
                    {item.place_name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {item.activity}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Wallet className="w-3.5 h-3.5" />
                      <span>{item.estimated_cost}</span>
                    </div>

                    {item.insider_tip && (
                      <div className="flex items-center gap-1.5 text-slate-400 italic">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="text-[11px]">{item.insider_tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Leaflet Map */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Interactive Route Map</span>
            </h2>
            <span className="text-xs text-slate-400">OpenStreetMap + Live Pins</span>
          </div>

          <div className="sticky top-24 h-[480px]">
            <LeafletMap items={plan.items || []} />
            <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Click on any numbered pin to preview stop activity, timings, and estimated costs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
