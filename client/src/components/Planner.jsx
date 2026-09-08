import React, { useState } from 'react';
import {
  Sparkles, MapPin, Clock, Wallet, Users,
  Compass, Footprints, Bike, Train, Car, Navigation,
  Check, ChevronRight, Coffee, Palette, Landmark, Trees,
  ShoppingBag, Music, Dices, LocateFixed, Radio
} from 'lucide-react';

const SectionCard = ({ children, className = '' }) => (
  <div
    className={`p-4 sm:p-5 rounded-2xl ${className}`}
    style={{ background: 'rgba(13,18,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    {children}
  </div>
);

const SectionHeader = ({ step, title, desc, badge }) => (
  <div className="flex items-start justify-between mb-3.5">
    <div>
      <div className="flex items-center gap-2 mb-0.5">
        <span className="font-mono text-[11px] font-bold text-slate-700">{step}</span>
        <h2 className="text-white font-semibold text-sm sm:text-base tracking-tight">{title}</h2>
      </div>
      <p className="text-slate-500 text-[11px] sm:text-xs">{desc}</p>
    </div>
    {badge && (
      <span className="font-mono text-[10px] sm:text-[11px] text-cyan-400 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 ml-2"
        style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
        {badge}
      </span>
    )}
  </div>
);

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
};

const parseClockTime = (timeStr) => {
  const match = (timeStr || '08:30 AM').match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return { hours: 8, minutes: 30, period: 'AM' };
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10) || 0;
  const p = (match[3] || (h >= 12 ? 'PM' : 'AM')).toUpperCase();
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return { hours: h, minutes: m, period: p };
};

const formatClockTime = (h, m, p) => {
  let normH = parseInt(h, 10) || 12;
  if (normH > 12) normH = ((normH - 1) % 12) + 1;
  if (normH <= 0) normH = 12;
  let normM = parseInt(m, 10) || 0;
  if (normM < 0) normM = 0;
  if (normM >= 60) normM = normM % 60;
  const hh = String(normH).padStart(2, '0');
  const mm = String(normM).padStart(2, '0');
  return `${hh}:${mm} ${p || 'AM'}`;
};

export default function Planner({ onGenerate, initialPreferences = {} }) {
  const [mood, setMood]           = useState(initialPreferences.mood || 'Relaxed');
  const initialInterests = (initialPreferences.interests && Array.isArray(initialPreferences.interests))
    ? initialPreferences.interests.slice(0, 2)
    : ['Cafes & Dining', 'Scenic Outdoors'];
  const [interests, setInterests] = useState(initialInterests);
  const [maxNotice, setMaxNotice] = useState(false);

  const parseInitialBudget = (val) => {
    if (!val) return 500;
    if (typeof val === 'number') return val;
    const lower = String(val).toLowerCase();
    if (lower.includes('free') || lower.includes('0')) return 0;
    const num = parseInt(lower.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num) && num > 0) return num;
    if (lower.includes('budget')) return 300;
    if (lower.includes('luxury')) return 1500;
    return 600;
  };

  const [budgetAmount, setBudgetAmount] = useState(() => parseInitialBudget(initialPreferences.budget));
  const [duration, setDuration]   = useState(initialPreferences.duration || 'Half Day (4-5h)');
  const [startTime, setStartTime] = useState(initialPreferences.start_time || '08:30 AM');
  const [tripType, setTripType]   = useState(initialPreferences.trip_type || 'Friends');
  const [peopleCount, setPeopleCount] = useState(initialPreferences.people_count || 3);
  const [transport, setTransport] = useState(initialPreferences.transport || 'Bike / Two-Wheeler');
  const [location, setLocation]   = useState(initialPreferences.location || 'Tumkur, Karnataka');
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [gpsCoords, setGpsCoords] = useState(null);

  const moods = [
    {
      id: 'Relaxed',
      icon: '🌿',
      label: 'Relaxed',
      activeBorder: 'border-emerald-400/80',
      activeGlow: 'rgba(52,211,153,0.3)',
      textAccent: 'text-emerald-300',
    },
    {
      id: 'Foodie',
      icon: '🍲',
      label: 'Foodie',
      activeBorder: 'border-amber-400/80',
      activeGlow: 'rgba(251,191,36,0.3)',
      textAccent: 'text-amber-300',
    },
    {
      id: 'Adventurous',
      icon: '⚡',
      label: 'Adventure',
      activeBorder: 'border-cyan-400/80',
      activeGlow: 'rgba(34,211,238,0.3)',
      textAccent: 'text-cyan-300',
    },
    {
      id: 'Cultural',
      icon: '🏛️',
      label: 'Cultural',
      activeBorder: 'border-violet-400/80',
      activeGlow: 'rgba(167,139,250,0.3)',
      textAccent: 'text-violet-300',
    },
    {
      id: 'Romantic',
      icon: '✨',
      label: 'Romantic',
      activeBorder: 'border-rose-400/80',
      activeGlow: 'rgba(251,113,133,0.3)',
      textAccent: 'text-rose-300',
    },
    {
      id: 'Energetic',
      icon: '🔥',
      label: 'Energetic',
      activeBorder: 'border-orange-400/80',
      activeGlow: 'rgba(251,146,60,0.3)',
      textAccent: 'text-orange-300',
    },
    {
      id: 'Chill',
      icon: '☕',
      label: 'Chill',
      activeBorder: 'border-sky-400/80',
      activeGlow: 'rgba(56,189,248,0.3)',
      textAccent: 'text-sky-300',
    },
    {
      id: 'Nature Explorer',
      icon: '🌲',
      label: 'Nature',
      activeBorder: 'border-emerald-400/80',
      activeGlow: 'rgba(74,222,128,0.3)',
      textAccent: 'text-emerald-300',
    },
  ];

  const availableInterests = [
    {
      name: 'Scenic Outdoors',
      icon: '⛰️',
      label: 'Peak Treks',
      activeBorder: 'border-emerald-400/80',
      activeGlow: 'rgba(52,211,153,0.3)',
      textAccent: 'text-emerald-300',
    },
    {
      name: 'Cafes & Dining',
      icon: '🧈',
      label: 'Food & Cafes',
      activeBorder: 'border-amber-400/80',
      activeGlow: 'rgba(251,191,36,0.3)',
      textAccent: 'text-amber-300',
    },
    {
      name: 'Heritage & Sightseeing',
      icon: '🛕',
      label: 'Heritage Forts',
      activeBorder: 'border-cyan-400/80',
      activeGlow: 'rgba(34,211,238,0.3)',
      textAccent: 'text-cyan-300',
    },
    {
      name: 'Hidden Gems',
      icon: '🦌',
      label: 'Forest Springs',
      activeBorder: 'border-pink-400/80',
      activeGlow: 'rgba(244,114,182,0.3)',
      textAccent: 'text-pink-300',
    },
    {
      name: 'Art & Culture',
      icon: '🎨',
      label: 'Art & Culture',
      activeBorder: 'border-violet-400/80',
      activeGlow: 'rgba(167,139,250,0.3)',
      textAccent: 'text-violet-300',
    },
    {
      name: 'Lake Walks',
      icon: '🌅',
      label: 'Lake Walks',
      activeBorder: 'border-sky-400/80',
      activeGlow: 'rgba(56,189,248,0.3)',
      textAccent: 'text-sky-300',
    },
    {
      name: 'Live Music & Nightlife',
      icon: '🛵',
      label: 'Scenic Drives',
      activeBorder: 'border-rose-400/80',
      activeGlow: 'rgba(251,113,133,0.3)',
      textAccent: 'text-rose-300',
    },
    {
      name: 'Shopping & Bazaars',
      icon: '🛍️',
      label: 'Local Bazaars',
      activeBorder: 'border-indigo-400/80',
      activeGlow: 'rgba(129,140,248,0.3)',
      textAccent: 'text-indigo-300',
    },
  ];

  const getBudgetTier = (amt) => {
    if (amt === 0) {
      return {
        label: 'Free Outing',
        badge: '100% Free',
        color: 'text-emerald-400',
        glow: '#34d399',
        icon: '🌿',
        desc: 'Zero spend · Public hills, springs & lake walks',
        str: 'Free ($0)',
      };
    }
    if (amt <= 400) {
      return {
        label: 'Pocket Budget',
        badge: 'Local Treats',
        color: 'text-cyan-400',
        glow: '#22d3ee',
        icon: '🪙',
        desc: 'Thatte idlis, dosas, filter coffee & temple passes',
        str: `Budget (₹${amt})`,
      };
    }
    if (amt <= 1000) {
      return {
        label: 'Balanced Moderate',
        badge: 'Full Dining',
        color: 'text-violet-400',
        glow: '#a78bfa',
        icon: '💎',
        desc: 'Full thali meals & heritage fortress entries',
        str: `Moderate (₹${amt})`,
      };
    }
    return {
      label: 'Premium Luxury',
      badge: 'VIP & Resorts',
      color: 'text-amber-400',
      glow: '#fbbf24',
      icon: '👑',
      desc: 'Resort dining & private vehicle fuel allowance',
      str: `Luxury (₹${amt}+)`,
    };
  };

  const durations = ['Quick (2 Hours)', 'Half Day (4-5h)', 'Full Day (8h+)'];

  const tripTypes = [
    { type: 'Solo',   count: 1 },
    { type: 'Couple', count: 2 },
    { type: 'Friends',count: 3 },
    { type: 'Family', count: 4 },
    { type: 'Group',  count: 6 },
  ];

  const transportModes = [
    { id: 'Bike / Two-Wheeler', label: 'Two-Wheeler',  icon: <Bike      className="w-4 h-4" /> },
    { id: 'Car / Cab',          label: 'Car / Cab',    icon: <Car       className="w-4 h-4" /> },
    { id: 'KSRTC / Town Bus',   label: 'Bus / Transit',icon: <Train     className="w-4 h-4" /> },
    { id: 'Scenic Walk',        label: 'Scenic Walk',  icon: <Footprints className="w-4 h-4" /> },
  ];

  const popularTumkurRegions = [
    'Tumkur City', 'Devarayanadurga (DD Hills)', 'Kyathsandra Thatte Idli',
    'Namada Chilume', 'Madhugiri Monolith', 'Kaidala Temple',
    'Kunigal & Markonahalli', 'Jayamangali Blackbucks', 'Goravanahalli Temple',
    'Yediyur Siddhalingeshwara', 'Seebi Murals', 'Pavagada Fort', 'Gubbi & Turuvekere'
  ];

  const toggleInterest = (name) => {
    if (interests.includes(name)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== name));
        setMaxNotice(false);
      }
    } else {
      if (interests.length < 2) {
        setInterests([...interests, name]);
        setMaxNotice(false);
      } else {
        setMaxNotice(true);
        setTimeout(() => setMaxNotice(false), 3000);
      }
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy || 15);
        setGpsCoords({ lat, lng, accuracy });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const locality = addr.suburb || addr.town || addr.village || addr.city_district || addr.city || 'Tumakuru';
            const state = addr.state || 'Karnataka';
            setLocation(`${locality}, ${state} (Live GPS)`);
          } else {
            setLocation(`Current Location (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`);
          }
        } catch {
          setLocation(`Current Location (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`);
        } finally {
          setDetectingLocation(false);
        }
      },
      (err) => {
        console.warn('GPS detection notice:', err);
        setDetectingLocation(false);
        setLocation('Current Location (Tumkur, Karnataka)');
        setGpsCoords({ lat: 13.3409, lng: 77.1010, accuracy: 25 });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleQuickShuffle = () => {
    const randomMood = moods[Math.floor(Math.random() * moods.length)].id;
    const quickBudgets = [0, 250, 500, 800, 1200, 2000];
    const randomBudgetAmount = quickBudgets[Math.floor(Math.random() * quickBudgets.length)];
    const randomDuration = durations[Math.floor(Math.random() * durations.length)];
    const randomRegion = popularTumkurRegions[Math.floor(Math.random() * popularTumkurRegions.length)];
    const randomTransport = transportModes[Math.floor(Math.random() * transportModes.length)].id;
    const randomTrip = tripTypes[Math.floor(Math.random() * tripTypes.length)];
    
    // Pick 2 random interests
    const shuffledInterests = [...availableInterests].sort(() => 0.5 - Math.random());
    const pickedInterests = shuffledInterests.slice(0, 2).map(i => i.name);

    setMood(randomMood);
    setBudgetAmount(randomBudgetAmount);
    setDuration(randomDuration);
    setLocation(randomRegion);
    setTransport(randomTransport);
    setTripType(randomTrip.type);
    setPeopleCount(randomTrip.count);
    setInterests(pickedInterests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTier = getBudgetTier(budgetAmount);
    onGenerate({
      mood,
      interests,
      budget: currentTier.str,
      duration,
      start_time: startTime,
      trip_type: tripType,
      people_count: Number(peopleCount),
      transport,
      location,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-28">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="label-overline mb-3">Personalize Your Experience</p>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Craft Your <span className="text-gradient-cyan">Ideal Day</span>
        </h1>
        <p className="text-slate-500 text-sm font-light max-w-md mx-auto mb-4">
          Tell us your vibe and we'll synthesize a route-optimized itinerary across Tumkur.
        </p>

        {/* Quick Shuffle Button */}
        <button
          type="button"
          onClick={handleQuickShuffle}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-300 bg-white/4 border border-white/8 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all cursor-pointer group shadow-sm"
        >
          <Dices className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
          <span>🎲 QUICK SHUFFLE ALL PREFERENCES</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 1. Mood - Compact Fitted Vibe Tiles */}
        <SectionCard>
          <SectionHeader step="01" title="What's Your Mood?" desc="Sets the emotional tone and energy of your outing." badge={mood} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {moods.map((m) => {
              const active = mood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  className={`group relative flex flex-col items-center justify-center py-2.5 px-2 sm:py-3 sm:px-2.5 rounded-xl border cursor-pointer transition-all duration-200 overflow-hidden select-none ${
                    active
                      ? `${m.activeBorder} shadow-md scale-[1.02] -translate-y-0.5`
                      : 'border-white/8 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-0.5'
                  }`}
                  style={{
                    background: active
                      ? 'linear-gradient(145deg, rgba(21, 29, 48, 0.95) 0%, rgba(13, 18, 36, 0.98) 100%)'
                      : undefined,
                    boxShadow: active
                      ? `0 8px 20px -4px ${m.activeGlow}, inset 0 0 16px rgba(255,255,255,0.03)`
                      : undefined,
                  }}
                >
                  {/* Subtle active radial ambient glow */}
                  {active && (
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none blur-md"
                      style={{
                        background: `radial-gradient(circle at center, ${m.activeGlow} 0%, transparent 70%)`
                      }}
                    />
                  )}

                  {/* Shimmer light sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

                  {/* Corner indicator dot when active */}
                  {active && (
                    <div className="absolute top-2 right-2 flex items-center justify-center">
                      <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    </div>
                  )}

                  {/* Expressive animated icon */}
                  <span className="text-2xl sm:text-3xl mb-1 transform transition-all duration-200 group-hover:scale-115 drop-shadow-sm">
                    {m.icon}
                  </span>

                  {/* Clean Mood Label */}
                  <span className={`font-semibold text-xs tracking-tight transition-colors duration-200 ${
                    active ? `${m.textAccent} font-bold` : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {m.label}
                  </span>

                  {/* Dynamic glowing underline */}
                  <span
                    className={`h-0.5 rounded-full mt-1 transition-all duration-200 ${
                      active
                        ? 'w-5 bg-current shadow-[0_0_6px_currentColor]'
                        : 'w-0 group-hover:w-2.5 bg-white/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 2. Interests & Activities - Compact Fitted Horizontal Checklist (Max 2) */}
        <SectionCard>
          <SectionHeader
            step="02"
            title="Select Interests & Activities"
            desc="Choose up to 2 activities for your outing (Max 2)."
            badge={interests.length === 2 ? '2/2 Selected (Max)' : `${interests.length}/2 Selected`}
          />

          {maxNotice && (
            <div className="mb-2.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-mono flex items-center justify-between animate-fadeIn shadow-sm">
              <span className="flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Maximum 2 activities allowed. Deselect one first to pick another.</span>
              </span>
              <button
                type="button"
                onClick={() => setMaxNotice(false)}
                className="text-amber-400/70 hover:text-amber-200 ml-2 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableInterests.map((item) => {
              const active = interests.includes(item.name);
              const atMax = !active && interests.length >= 2;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => toggleInterest(item.name)}
                  className={`group relative flex items-center justify-between py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl border cursor-pointer transition-all duration-200 select-none overflow-hidden text-left ${
                    active
                      ? `${item.activeBorder} scale-[1.01] shadow-md`
                      : atMax
                      ? 'border-white/5 bg-white/[0.015] opacity-60 hover:opacity-90 hover:border-amber-400/30'
                      : 'border-white/8 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05] hover:translate-x-0.5'
                  }`}
                  style={{
                    background: active
                      ? 'linear-gradient(135deg, rgba(21, 29, 48, 0.95) 0%, rgba(13, 18, 36, 0.98) 100%)'
                      : undefined,
                    boxShadow: active
                      ? `0 6px 18px -4px ${item.activeGlow}, inset 0 0 14px rgba(255,255,255,0.03)`
                      : undefined,
                  }}
                >
                  {/* Left luminous accent bar */}
                  <div
                    className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full transition-all duration-200 ${
                      active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                    }`}
                    style={{ backgroundColor: active ? item.activeGlow.replace('0.3', '1') : 'transparent' }}
                  />

                  {/* Left side: Icon medallion + Label */}
                  <div className="flex items-center gap-2.5 min-w-0 pl-1">
                    <div
                      className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg flex items-center justify-center text-lg sm:text-xl shrink-0 transition-all duration-200 ${
                        active
                          ? 'bg-white/10 shadow-inner scale-105'
                          : 'bg-white/[0.03] border border-white/8 group-hover:scale-105'
                      }`}
                    >
                      <span className="drop-shadow-sm">{item.icon}</span>
                    </div>

                    <div className="min-w-0">
                      <span
                        className={`block font-semibold text-xs sm:text-sm tracking-tight transition-colors duration-200 leading-tight ${
                          active ? `${item.textAccent} font-bold` : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="block text-[10px] font-mono text-slate-500 truncate leading-tight mt-0.5">
                        {item.name}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Modern Animated Checkbox Pill */}
                  <div className="shrink-0 ml-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                        active
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)] scale-105'
                          : 'border border-white/20 text-transparent group-hover:border-cyan-400/50'
                      }`}
                    >
                      <Check className={`w-3 h-3 stroke-[3] transition-transform duration-150 ${active ? 'scale-100' : 'scale-0'}`} />
                    </div>
                  </div>

                  {/* Hover shimmer shine */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 3. Budget Preference - Interactive Scroll Money Setter */}
        <SectionCard>
          {(() => {
            const tier = getBudgetTier(budgetAmount);
            const percent = (budgetAmount / 3000) * 100;
            return (
              <>
                <SectionHeader
                  step="03"
                  title="Budget Preference"
                  desc="Slide or scroll to set your maximum spend per person."
                  badge={budgetAmount === 0 ? 'Free (₹0)' : `₹${budgetAmount.toLocaleString('en-IN')} / person`}
                />

                <div className="py-2.5 px-3 sm:py-3 sm:px-3.5 rounded-xl bg-white/[0.025] border border-white/8 space-y-2">
                  {/* Live Money Readout */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0 drop-shadow-sm">{tier.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-1.5 leading-tight">
                          <span className={`font-mono text-lg sm:text-xl font-bold tracking-tight ${tier.color}`}>
                            {budgetAmount === 0 ? '₹0' : `₹${budgetAmount.toLocaleString('en-IN')}`}
                          </span>
                          <span className="text-slate-500 text-[11px] font-mono">
                            {budgetAmount === 0 ? '(Free Outing)' : '/ person'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5 leading-tight truncate">
                          <span className="font-semibold text-slate-200">{tier.label}</span>
                          <span>·</span>
                          <span className="text-slate-500 truncate">{tier.desc}</span>
                        </div>
                      </div>
                    </div>

                    {/* Multi-person live calculation */}
                    {peopleCount > 1 && (
                      <div className="shrink-0 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/8 font-mono text-[10px] text-slate-300">
                        <span>Total: </span>
                        <span className="font-bold text-cyan-300">
                          {budgetAmount === 0 ? '₹0' : `₹${(budgetAmount * peopleCount).toLocaleString('en-IN')}`}
                        </span>
                        <span className="text-slate-500"> ({peopleCount}p)</span>
                      </div>
                    )}
                  </div>

                  {/* Scroll / Range Slider */}
                  <div className="pt-1 px-0.5">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="50"
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(Number(e.target.value))}
                      className="budget-slider"
                      style={{
                        background: `linear-gradient(to right, ${tier.glow} 0%, #38bdf8 ${percent}%, rgba(255,255,255,0.08) ${percent}%, rgba(255,255,255,0.08) 100%)`,
                      }}
                    />

                    {/* Quick Snap Markers */}
                    <div className="flex justify-between items-center mt-1.5 px-0.5 text-[10px] font-mono text-slate-500">
                      {[
                        { val: 0, label: '₹0' },
                        { val: 300, label: '₹300' },
                        { val: 800, label: '₹800' },
                        { val: 1500, label: '₹1,500' },
                        { val: 3000, label: '₹3,000+' },
                      ].map((mark) => (
                        <button
                          key={mark.val}
                          type="button"
                          onClick={() => setBudgetAmount(mark.val)}
                          className={`cursor-pointer transition-colors hover:text-cyan-300 py-0.5 ${
                            budgetAmount === mark.val ? 'text-cyan-400 font-bold underline' : ''
                          }`}
                        >
                          {mark.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </SectionCard>

        {/* 4. Duration + Start Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SectionCard>
            <SectionHeader step="04" title="Duration" desc="How long do you want your outing to last?" />
            <div className="space-y-2">
              {durations.map((d) => {
                const active = duration === d;
                return (
                  <button key={d} type="button" onClick={() => setDuration(d)}
                    className="w-full p-3 rounded-xl border text-left text-sm font-medium flex items-center justify-between cursor-pointer transition-all"
                    style={{
                      background: active ? 'rgba(34,211,238,0.07)' : 'rgba(255,255,255,0.03)',
                      borderColor: active ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.06)',
                      color: active ? '#67E8F9' : '#64748B',
                    }}
                  >
                    <span>{d}</span>
                    {active && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader
              step="04b"
              title="Start Time"
              desc="Click numbers or dial to pick time"
              badge={startTime}
            />
            {(() => {
              const clockTime = parseClockTime(startTime);
              const hourAngle = ((clockTime.hours % 12) + clockTime.minutes / 60) * 30;
              const minAngle = clockTime.minutes * 6;

              const setHour = (h) => {
                if (clockTime.hours === h) {
                  setStartTime(formatClockTime(h, clockTime.minutes === 0 ? 30 : 0, clockTime.period));
                } else {
                  setStartTime(formatClockTime(h, clockTime.minutes, clockTime.period));
                }
              };

              const setMinute = (m) => setStartTime(formatClockTime(clockTime.hours, m, clockTime.period));
              const setPeriod = (p) => setStartTime(formatClockTime(clockTime.hours, clockTime.minutes, p));

              const minuteMarks = [
                { m: 0,  label: ':00', deg: 0 },
                { m: 15, label: ':15', deg: 90 },
                { m: 30, label: ':30', deg: 180 },
                { m: 45, label: ':45', deg: 270 },
              ];

              return (
                <div className="flex flex-col items-center justify-center py-1">
                  {/* Analog Clock SVG Dial */}
                  <div
                    className="relative flex items-center justify-center p-2 rounded-2xl select-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.08) 0%, rgba(8,12,24,0.95) 75%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 4px 20px -2px rgba(0,0,0,0.5), inset 0 0 16px rgba(34,211,238,0.05)'
                    }}
                  >
                    <svg width="156" height="156" viewBox="0 0 156 156" className="drop-shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                      {/* Outer ambient glow dashes */}
                      <circle cx="78" cy="78" r="74" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="3 4" />
                      {/* Dial Face */}
                      <circle cx="78" cy="78" r="70" fill="rgba(10,15,28,0.95)" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />

                      {/* Subtle radial ticks */}
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <line
                          key={deg}
                          x1="78" y1="12" x2="78" y2={deg % 90 === 0 ? "18" : "15"}
                          stroke={deg % 90 === 0 ? "rgba(34,211,238,0.7)" : "rgba(255,255,255,0.15)"}
                          strokeWidth={deg % 90 === 0 ? "1.5" : "1"}
                          transform={`rotate(${deg}, 78, 78)`}
                        />
                      ))}

                      {/* Minute marks at 4 cardinal points (:00, :15, :30, :45) */}
                      {minuteMarks.map(({ m, label, deg }) => {
                        const rad = ((deg - 90) * Math.PI) / 180;
                        const mx = 78 + 62 * Math.cos(rad);
                        const my = 78 + 62 * Math.sin(rad) + 2.5;
                        const isCurrent = clockTime.minutes === m;
                        return (
                          <g key={label} className="cursor-pointer group" onClick={() => setMinute(m)} title={`Set minutes to ${label}`}>
                            <circle
                              cx={mx}
                              cy={my - 2.5}
                              r="7"
                              fill={isCurrent ? 'rgba(34,211,238,0.2)' : 'transparent'}
                              className="group-hover:fill-cyan-500/20 transition-all"
                            />
                            <text
                              x={mx}
                              y={my}
                              textAnchor="middle"
                              className={`font-mono text-[8px] select-none transition-colors ${
                                isCurrent ? 'fill-cyan-300 font-bold' : 'fill-slate-500 group-hover:fill-slate-200'
                              }`}
                            >
                              {label}
                            </text>
                          </g>
                        );
                      })}

                      {/* Clickable Hour Numbers 1 to 12 */}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                        const rad = ((h * 30 - 90) * Math.PI) / 180;
                        const x = 78 + 48 * Math.cos(rad);
                        const y = 78 + 48 * Math.sin(rad) + 3.5;
                        const isCurrentHour = clockTime.hours === h;
                        return (
                          <g
                            key={h}
                            className="cursor-pointer group"
                            onClick={() => setHour(h)}
                            title={`Set ${h}:00 (tap again for :30)`}
                          >
                            <circle
                              cx={x}
                              cy={y - 3.5}
                              r="10"
                              fill={isCurrentHour ? 'rgba(34,211,238,0.25)' : 'transparent'}
                              stroke={isCurrentHour ? 'rgba(34,211,238,0.7)' : 'transparent'}
                              strokeWidth="1"
                              className="transition-all group-hover:fill-cyan-500/20"
                            />
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              className={`font-mono text-[11px] select-none transition-colors ${
                                isCurrentHour
                                  ? 'fill-cyan-300 font-bold'
                                  : 'fill-slate-400 group-hover:fill-white font-medium'
                              }`}
                            >
                              {h}
                            </text>
                          </g>
                        );
                      })}

                      {/* Hour Hand */}
                      <line
                        x1="78" y1="78" x2="78" y2="47"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        transform={`rotate(${hourAngle}, 78, 78)`}
                        style={{ transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      />

                      {/* Minute Hand */}
                      <line
                        x1="78" y1="78" x2="78" y2="28"
                        stroke="#22d3ee"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        transform={`rotate(${minAngle}, 78, 78)`}
                        style={{ transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      />

                      {/* Center Hub */}
                      <circle cx="78" cy="78" r="4.5" fill="#22d3ee" />
                      <circle cx="78" cy="78" r="1.8" fill="#0b0f19" />
                    </svg>
                  </div>

                  {/* AM / PM Segmented Toggle with Centered Time */}
                  <div className="flex items-center justify-center mt-3">
                    <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/40 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setPeriod('AM')}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all ${
                          clockTime.period === 'AM'
                            ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30 font-extrabold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        AM
                      </button>

                      <div
                        className="font-mono text-sm font-bold text-cyan-300 tracking-wider px-1 select-none cursor-pointer hover:text-cyan-200 transition-colors"
                        title="Click to toggle minutes (:00 ↔ :30)"
                        onClick={() => setMinute(clockTime.minutes === 0 ? 30 : 0)}
                      >
                        {String(clockTime.hours).padStart(2, '0')}:{String(clockTime.minutes).padStart(2, '0')}
                      </div>

                      <button
                        type="button"
                        onClick={() => setPeriod('PM')}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all ${
                          clockTime.period === 'PM'
                            ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30 font-extrabold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </SectionCard>
        </div>

        {/* 5. Trip Type + People */}
        <SectionCard>
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="font-mono text-xs font-bold text-slate-700">05</span>
                <h2 className="text-white font-semibold text-base">Trip Type & Group Size</h2>
              </div>
              <p className="text-slate-600 text-xs">Tailors place capacities and ambiance for your party.</p>
            </div>
            {/* People counter */}
            <div className="flex items-center gap-2 shrink-0 ml-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '6px 12px' }}>
              <span className="text-[11px] font-mono text-slate-600">PEOPLE</span>
              <button type="button" onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold text-white cursor-pointer transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>−</button>
              <span className="font-mono text-sm font-bold text-cyan-300 w-4 text-center">{peopleCount}</span>
              <button type="button" onClick={() => setPeopleCount(peopleCount + 1)}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold text-white cursor-pointer transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>+</button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {tripTypes.map((t) => {
              const active = tripType === t.type;
              return (
                <button key={t.type} type="button"
                  onClick={() => { setTripType(t.type); setPeopleCount(t.count); }}
                  className="p-3 rounded-xl border text-center cursor-pointer transition-all"
                  style={{
                    background: active ? 'rgba(236,72,153,0.07)' : 'rgba(255,255,255,0.03)',
                    borderColor: active ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div className={`text-xs font-bold ${active ? 'text-pink-300' : 'text-white'}`}>{t.type}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">~{t.count} {t.count === 1 ? 'person' : 'people'}</div>
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 6. Transport */}
        <SectionCard>
          <SectionHeader step="06" title="Transport Preference"
            desc="Determines transit speed and route connectivity between stops." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {transportModes.map((tm) => {
              const active = transport === tm.id;
              return (
                <button key={tm.id} type="button" onClick={() => setTransport(tm.id)}
                  className="p-3.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all"
                  style={{
                    background: active ? 'rgba(34,211,238,0.07)' : 'rgba(255,255,255,0.03)',
                    borderColor: active ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.06)',
                    color: active ? '#67E8F9' : '#64748B',
                  }}
                >
                  <div className="p-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {tm.icon}
                  </div>
                  <span className="text-xs font-medium">{tm.label}</span>
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 7. Location */}
        <SectionCard>
          {(() => {
            const isGpsActive = Boolean(gpsCoords || location.toLowerCase().includes('current location') || location.toLowerCase().includes('gps'));

            return (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-700">07</span>
                      <h2 className="text-white font-semibold text-base">Target Information</h2>
                    </div>
                    <p className="text-slate-500 text-xs">Set your starting departure point or explore zone in Tumkur.</p>
                  </div>
                  {isGpsActive ? (
                    <span
                      className="font-mono text-[10px] text-emerald-400 px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0 ml-2"
                      style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      GPS CONNECTED
                    </span>
                  ) : (
                    <span
                      className="font-mono text-[10px] text-cyan-400 px-2.5 py-1 rounded-full shrink-0 ml-2"
                      style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}
                    >
                      TUMKUR READY
                    </span>
                  )}
                </div>

                {/* Prominent Current Location Access Button */}
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={detectingLocation}
                  className="w-full p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all group mb-3 relative overflow-hidden text-left"
                  style={{
                    background: detectingLocation
                      ? 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(13,18,32,0.9) 100%)'
                      : isGpsActive
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(13,18,32,0.9) 100%)'
                        : 'linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(13,18,32,0.85) 100%)',
                    borderColor: isGpsActive
                      ? 'rgba(16,185,129,0.4)'
                      : 'rgba(34,211,238,0.3)',
                    boxShadow: isGpsActive
                      ? '0 0 20px -4px rgba(16,185,129,0.2)'
                      : '0 0 15px -4px rgba(34,211,238,0.08)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        detectingLocation
                          ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                          : isGpsActive
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-105'
                      }`}
                      style={{ border: '1px solid rgba(34,211,238,0.25)' }}
                    >
                      <LocateFixed className={`w-5 h-5 ${detectingLocation ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white tracking-tight">
                          {detectingLocation ? 'Acquiring Satellite GPS...' : 'Use Current Location'}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                          isGpsActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        }`}>
                          {isGpsActive ? 'CONNECTED' : '1-TAP GPS'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {detectingLocation
                          ? 'Pinpointing your real-time coordinates...'
                          : isGpsActive
                            ? 'Route will automatically calculate starting from your exact device location'
                            : 'Auto-detect your live coordinates for precision route planning'}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 ml-3">
                    {detectingLocation ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                        <Radio className="w-3.5 h-3.5 animate-pulse" />
                        <span className="hidden sm:inline">SCANNING</span>
                      </div>
                    ) : isGpsActive ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>ACTIVE</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-black text-xs font-bold transition-all flex items-center gap-1">
                        <span>Access</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Divider */}
                <div className="relative flex py-1.5 items-center mb-2.5">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-3 text-[10px] font-mono uppercase tracking-widest text-slate-600">
                    or enter location manually
                  </span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                {/* Input Field */}
                <div className="relative mb-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setGpsCoords(null);
                    }}
                    placeholder="e.g. Tumkur City, Kyathsandra, DD Hills, Madhugiri..."
                    className="w-full pl-10 pr-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all rounded-xl"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(34,211,238,0.45)'; }}
                    onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                  {location && (
                    <button
                      type="button"
                      onClick={() => {
                        setLocation('');
                        setGpsCoords(null);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1 cursor-pointer transition-colors text-xs font-mono"
                      title="Clear location"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Telemetry Status Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-xl border border-white/5 bg-black/30 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                    <span>Target Origin: <strong className="text-white">{location || 'Tumkur, Karnataka'}</strong></span>
                  </div>
                  {gpsCoords ? (
                    <div className="text-emerald-400 text-[10px] flex items-center gap-1.5 shrink-0">
                      <span>Lat {gpsCoords.lat.toFixed(4)}°, Lng {gpsCoords.lng.toFixed(4)}°</span>
                      <span className="text-slate-600">·</span>
                      <span>±{gpsCoords.accuracy}m accuracy</span>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-[10px] shrink-0">
                      Tumkur District Optimized Route
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </SectionCard>

        {/* Submit */}
        <div className="pt-2">
          <button type="submit" className="btn-primary w-full !rounded-2xl !py-4 !text-base !gap-3 justify-center">
            <Sparkles className="w-5 h-5" />
            Generate My Outing Plan
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-center text-[11px] text-slate-700 font-mono mt-3 tracking-wider">
            POWERED BY NAVORA AI · TUMKUR DISTRICT
          </p>
        </div>
      </form>
    </div>
  );
}
