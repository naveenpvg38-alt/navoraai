import React, { useState } from 'react';
import {
  Sparkles, Clock, Wallet, MapPin, Heart,
  Bookmark, CheckCircle, Share2, Printer,
  ArrowLeft, Route, Compass, Lightbulb, Check, Train,
  Navigation, ExternalLink, ChevronRight
} from 'lucide-react';
import LeafletMap from './LeafletMap';
import OutingToolkit from './OutingToolkit';
import ActiveTripHud from './ActiveTripHud';

const actionBtn = {
  base:     { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' },
  fav:      { background: 'rgba(239,68,68,0.1)',    border: '1px solid rgba(239,68,68,0.3)',   borderRadius: '10px' },
  complete: { background: 'rgba(16,185,129,0.1)',   border: '1px solid rgba(16,185,129,0.3)',  borderRadius: '10px' },
};

const buildGoogleMapsUrl = (items = []) => {
  const valid = items.filter(it => it.latitude && it.longitude);
  if (valid.length === 0) return null;
  if (valid.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${valid[0].latitude},${valid[0].longitude}`;
  }
  const origin = `${valid[0].latitude},${valid[0].longitude}`;
  const destination = `${valid[valid.length - 1].latitude},${valid[valid.length - 1].longitude}`;
  const waypoints = valid.slice(1, -1).map(it => `${it.latitude},${it.longitude}`).join('|');
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}&travelmode=driving`;
};

export default function ItineraryView({ plan, user, onSave, onToggleFavourite, onToggleComplete, onBack, onOpenAuth }) {
  const [copied, setCopied]         = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showHud, setShowHud]       = useState(false);

  if (!plan) return null;

  const googleMapsUrl = buildGoogleMapsUrl(plan.items || []);

  const handleShare = () => {
    const text = `✦ NAVORA AI Outing: ${plan.title}\nDuration: ${plan.duration}\nCost: ${plan.estimated_cost}\nStops: ${plan.items.map((it, idx) => `${idx + 1}. ${it.place_name} (${it.start_time})`).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveClick = async () => {
    if (!user) { onOpenAuth('login'); return; }
    await onSave(plan);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-28 animate-fade-in">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors cursor-pointer group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Planner
        </button>

        <div className="flex items-center gap-2">
          {/* Active Trip HUD Trigger */}
          <button
            onClick={() => setShowHud(true)}
            className="p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            style={{
              background: 'linear-gradient(135deg, #0284C7 0%, #4F46E5 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)'
            }}
            title="Launch In-Car / Bike Active Trip Cockpit HUD"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <Navigation className="w-3.5 h-3.5 text-cyan-200" />
            <span>Active HUD</span>
          </button>
          {/* Google Maps Multi-Stop Navigation */}
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-all hover:brightness-110"
              style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.35)', boxShadow: '0 0 15px rgba(34,211,238,0.2)' }}
              title="Open Route in Google Maps for Turn-by-Turn GPS Navigation"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Navigate Route</span>
              <ExternalLink className="w-3 h-3 text-cyan-400 opacity-75" />
            </a>
          )}

          {/* Share */}
          <button onClick={handleShare} title="Share" className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all"
            style={actionBtn.base}>
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Print */}
          <button onClick={() => window.print()} title="Print" className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all"
            style={actionBtn.base}>
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {plan.plan_id && (
            <>
              <button onClick={() => onToggleFavourite(plan.plan_id)} title="Favourite"
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all"
                style={plan.is_favourite ? actionBtn.fav : actionBtn.base}>
                <Heart className={`w-4 h-4 ${plan.is_favourite ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
                <span className="hidden sm:inline text-slate-400">{plan.is_favourite ? 'Saved' : 'Favourite'}</span>
              </button>

              <button onClick={() => onToggleComplete(plan.plan_id)} title="Mark Completed"
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all"
                style={plan.is_completed ? actionBtn.complete : actionBtn.base}>
                <CheckCircle className={`w-4 h-4 ${plan.is_completed ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="hidden sm:inline text-slate-400">{plan.is_completed ? 'Done!' : 'Complete'}</span>
              </button>
            </>
          )}

          {!plan.plan_id && (
            <button onClick={handleSaveClick} className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${saveSuccess ? 'text-emerald-900' : 'text-white'}`}
              style={saveSuccess
                ? { background: '#10B981', border: '1px solid #10B981' }
                : { background: 'linear-gradient(135deg,#0ea5e9,#7c3aed)', border: 'none', boxShadow: '0 4px 20px -6px rgba(14,165,233,0.5)' }
              }>
              <Bookmark className="w-4 h-4" />
              {saveSuccess ? 'Saved!' : 'Save Plan'}
            </button>
          )}
        </div>
      </div>

      {/* Plan header card */}
      <div className="p-7 sm:p-10 rounded-3xl mb-8 relative overflow-hidden"
        style={{ background: 'rgba(10,14,26,0.8)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8)' }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none animate-aurora"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08), transparent)' }} />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold text-cyan-300"
                style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)' }}>
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                {plan.match_score || 98}% MATCH
              </span>
              <span className="px-3 py-1 rounded-full text-xs text-slate-400"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {plan.location || 'Tumkur, Karnataka'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs text-violet-300"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}>
                {plan.mood || 'Curated'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">{plan.title}</h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl">{plan.description}</p>

            {/* Start Live Journey CTA */}
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => setShowHud(true)}
                className="btn-primary !py-3 !px-6 !rounded-2xl !text-sm cursor-pointer shadow-[0_0_30px_rgba(14,165,233,0.35)] group"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                <Navigation className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
                <span>Start Live Journey (Cockpit HUD)</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <div className="px-5 py-4 rounded-2xl text-center min-w-[120px]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="label-overline text-slate-600 flex items-center justify-center gap-1 mb-1.5">
                <Clock className="w-2.5 h-2.5" /> Duration
              </div>
              <div className="font-mono text-sm font-bold text-white">{plan.duration}</div>
            </div>
            <div className="px-5 py-4 rounded-2xl text-center min-w-[120px]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="label-overline text-slate-600 flex items-center justify-center gap-1 mb-1.5">
                <Wallet className="w-2.5 h-2.5" /> Est. Cost
              </div>
              <div className="font-mono text-sm font-bold text-emerald-400">{plan.estimated_cost}</div>
            </div>
          </div>
        </div>

        {/* AI insight strip */}
        {plan.why_matched && (
          <div className="mt-7 pt-6 border-t flex items-start gap-4 p-4 rounded-2xl"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <div className="p-2 rounded-xl shrink-0"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
              <Lightbulb className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h4 className="label-overline text-cyan-500 mb-1.5">AI Insight — Why This Matches Your Vibe</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{plan.why_matched}</p>
            </div>
          </div>
        )}
      </div>

      {/* Unique Feature: Tumkur Outing Intelligence Suite (Weather Radar, Group Splitter, Smart Packing, Kannada Phrases) */}
      <OutingToolkit plan={plan} />

      {/* Timeline + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Route className="w-4 h-4 text-cyan-400" />
              <h2 className="font-semibold text-white text-base">Step-by-Step Itinerary</h2>
            </div>
            <span className="font-mono text-xs text-slate-600">{plan.items?.length || 0} STOPS</span>
          </div>

          <div className="relative pl-7 space-y-6"
            style={{ borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            {plan.items?.map((item, index) => (
              <div key={item.item_id || index} className="relative group">
                {/* Node */}
                <div className="absolute -left-[28px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold text-cyan-400 transition-transform group-hover:scale-110"
                  style={{ background: '#0D1220', border: '2px solid rgba(34,211,238,0.5)' }}>
                  {index + 1}
                </div>

                {/* Transit badge */}
                {index > 0 && item.travel_time && (
                  <div className="mb-3 -mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] text-cyan-400"
                    style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)' }}>
                    <Train className="w-3 h-3" /> {item.travel_time}
                  </div>
                )}

                {/* Stop card */}
                <div className="p-5 rounded-2xl transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{ background: 'rgba(13,18,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="label-overline text-cyan-600">{item.category || 'Curated Stop'}</span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 px-2.5 py-1 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Clock className="w-3 h-3" />
                      {item.start_time} – {item.end_time}
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{item.place_name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 font-light">{item.activity}</p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="font-mono text-xs font-semibold text-emerald-400">{item.estimated_cost}</span>
                    {item.insider_tip && (
                      <div className="flex items-center gap-1.5 text-slate-500 italic">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-[11px]">{item.insider_tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <h2 className="font-semibold text-white text-base">Interactive Route Map</h2>
            </div>
            {googleMapsUrl ? (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                title="Launch in Google Maps App"
              >
                <span>Google Maps GPS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="font-mono text-xs text-slate-600">OPENSTREETMAP</span>
            )}
          </div>

          <div className="sticky top-24 h-[500px]">
            <LeafletMap items={plan.items || []} />
            <div className="mt-3 p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-600 font-light"
              style={{ background: 'rgba(13,18,32,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Compass className="w-4 h-4 text-cyan-600 shrink-0" />
              Click any numbered pin to preview stop details, timings, and costs.
            </div>
          </div>
        </div>
      </div>

      {/* Active Trip Cockpit HUD Overlay */}
      {showHud && (
        <ActiveTripHud
          plan={plan}
          onClose={() => setShowHud(false)}
          onCompleteTrip={onToggleComplete}
        />
      )}
    </div>
  );
}
