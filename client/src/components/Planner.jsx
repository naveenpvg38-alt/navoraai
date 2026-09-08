import React, { useState } from 'react';
import {
  Sparkles, MapPin, Clock, Wallet, Users,
  Compass, Footprints, Bike, Train, Car, Navigation,
  Check, ChevronRight, Coffee, Palette, Landmark, Trees,
  ShoppingBag, Music, Dices
} from 'lucide-react';

const SectionCard = ({ children, className = '' }) => (
  <div
    className={`p-6 sm:p-7 rounded-2xl ${className}`}
    style={{ background: 'rgba(13,18,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    {children}
  </div>
);

const SectionHeader = ({ step, title, desc, badge }) => (
  <div className="flex items-start justify-between mb-5">
    <div>
      <div className="flex items-center gap-2.5 mb-1">
        <span className="font-mono text-xs font-bold text-slate-700">{step}</span>
        <h2 className="text-white font-semibold text-base tracking-tight">{title}</h2>
      </div>
      <p className="text-slate-600 text-xs">{desc}</p>
    </div>
    {badge && (
      <span className="font-mono text-[11px] text-cyan-400 px-2.5 py-1 rounded-full shrink-0 ml-3"
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

export default function Planner({ onGenerate, initialPreferences = {} }) {
  const [mood, setMood]           = useState(initialPreferences.mood || 'Relaxed');
  const [interests, setInterests] = useState(initialPreferences.interests || ['Cafes & Dining', 'Scenic Outdoors']);
  const [budget, setBudget]       = useState(initialPreferences.budget || 'Budget ($)');
  const [duration, setDuration]   = useState(initialPreferences.duration || 'Half Day (4-5h)');
  const [startTime, setStartTime] = useState(initialPreferences.start_time || '08:30 AM');
  const [tripType, setTripType]   = useState(initialPreferences.trip_type || 'Friends');
  const [peopleCount, setPeopleCount] = useState(initialPreferences.people_count || 3);
  const [transport, setTransport] = useState(initialPreferences.transport || 'Bike / Two-Wheeler');
  const [location, setLocation]   = useState(initialPreferences.location || 'Tumkur, Karnataka');
  const [detectingLocation, setDetectingLocation] = useState(false);

  const moods = [
    { id: 'Relaxed',        icon: '🌿', label: 'Relaxed',    desc: 'Quiet hills & scenic springs' },
    { id: 'Foodie',         icon: '🍲', label: 'Foodie',     desc: 'Butter Thatte Idli trails' },
    { id: 'Adventurous',    icon: '⚡', label: 'Adventure',  desc: 'Madhugiri monolith trek' },
    { id: 'Cultural',       icon: '🏛️', label: 'Cultural',   desc: 'Hoysala stone temples' },
    { id: 'Romantic',       icon: '✨', label: 'Romantic',   desc: 'Amanikere sunset lakeside' },
    { id: 'Energetic',      icon: '🔥', label: 'Energetic',  desc: 'High energy hill exploration' },
    { id: 'Chill',          icon: '☕', label: 'Chill',      desc: 'Town kaapi & lake walks' },
    { id: 'Nature Explorer',icon: '🌲', label: 'Nature',     desc: 'Forest canopy & wildlife' },
  ];

  const availableInterests = [
    { name: 'Cafes & Dining',           icon: <Coffee     className="w-3.5 h-3.5 text-amber-400"  /> },
    { name: 'Scenic Outdoors',          icon: <Trees      className="w-3.5 h-3.5 text-emerald-400"/> },
    { name: 'Heritage & Sightseeing',   icon: <Landmark   className="w-3.5 h-3.5 text-cyan-400"   /> },
    { name: 'Art & Culture',            icon: <Palette    className="w-3.5 h-3.5 text-violet-400" /> },
    { name: 'Hidden Gems',              icon: <Compass    className="w-3.5 h-3.5 text-pink-400"   /> },
    { name: 'Live Music & Nightlife',   icon: <Music      className="w-3.5 h-3.5 text-rose-400"   /> },
    { name: 'Shopping & Bazaars',       icon: <ShoppingBag className="w-3.5 h-3.5 text-indigo-400"/> },
  ];

  const budgets = [
    { id: 'Free ($0)',     label: 'Free (₹0)',    desc: 'Public hills, viewpoints & lake walks' },
    { id: 'Budget ($)',    label: 'Budget (₹)',   desc: 'Thatte idli & minimal entry fees' },
    { id: 'Moderate ($$)', label: 'Moderate (₹₹)', desc: 'Comfortable dining & heritage sites' },
    { id: 'Luxury ($$$)', label: 'Luxury (₹₹₹)', desc: 'Resort dining & private roadtrip' },
  ];

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
      if (interests.length > 1) setInterests(interests.filter(i => i !== name));
    } else {
      setInterests([...interests, name]);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      () => { setDetectingLocation(false); setLocation('Current Location (Detected)'); },
      () => { setDetectingLocation(false); setLocation('Tumkur, Karnataka'); },
      { timeout: 5000 }
    );
  };

  const handleQuickShuffle = () => {
    const randomMood = moods[Math.floor(Math.random() * moods.length)].id;
    const randomBudget = budgets[Math.floor(Math.random() * budgets.length)].id;
    const randomDuration = durations[Math.floor(Math.random() * durations.length)];
    const randomRegion = popularTumkurRegions[Math.floor(Math.random() * popularTumkurRegions.length)];
    const randomTransport = transportModes[Math.floor(Math.random() * transportModes.length)].id;
    const randomTrip = tripTypes[Math.floor(Math.random() * tripTypes.length)];
    
    // Pick 2 random interests
    const shuffledInterests = [...availableInterests].sort(() => 0.5 - Math.random());
    const pickedInterests = shuffledInterests.slice(0, 2).map(i => i.name);

    setMood(randomMood);
    setBudget(randomBudget);
    setDuration(randomDuration);
    setLocation(randomRegion);
    setTransport(randomTransport);
    setTripType(randomTrip.type);
    setPeopleCount(randomTrip.count);
    setInterests(pickedInterests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ mood, interests, budget, duration, start_time: startTime,
      trip_type: tripType, people_count: Number(peopleCount), transport, location });
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

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* 1. Mood */}
        <SectionCard>
          <SectionHeader step="01" title="What's Your Mood?" desc="Sets the emotional tone and energy of your outing." badge={mood} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {moods.map((m) => {
              const active = mood === m.id;
              return (
                <button key={m.id} type="button" onClick={() => setMood(m.id)}
                  className="p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200"
                  style={{
                    background: active ? 'rgba(34,211,238,0.07)' : 'rgba(255,255,255,0.03)',
                    borderColor: active ? 'rgba(34,211,238,0.45)' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="text-2xl mb-2">{m.icon}</div>
                  <div className="font-semibold text-xs text-white">{m.label}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5 truncate">{m.desc}</div>
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 2. Interests */}
        <SectionCard>
          <SectionHeader step="02" title="Select Interests & Activities"
            desc="Choose all categories you want included." badge={`${interests.length} selected`} />
          <div className="flex flex-wrap gap-2">
            {availableInterests.map((interest) => {
              const active = interests.includes(interest.name);
              return (
                <button key={interest.name} type="button" onClick={() => toggleInterest(interest.name)}
                  className="px-3.5 py-2 rounded-xl border text-sm flex items-center gap-2 cursor-pointer transition-all"
                  style={{
                    background: active ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.03)',
                    borderColor: active ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.06)',
                    color: active ? '#67E8F9' : '#64748B',
                  }}
                >
                  {interest.icon}
                  <span>{interest.name}</span>
                  {active && <Check className="w-3 h-3 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 3. Budget */}
        <SectionCard>
          <SectionHeader step="03" title="Budget Preference"
            desc="Expected spend per person across meals, tickets, and activities." badge={budget.split(' ')[0]} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {budgets.map((b) => {
              const active = budget === b.id;
              return (
                <button key={b.id} type="button" onClick={() => setBudget(b.id)}
                  className="p-4 rounded-xl border text-left cursor-pointer transition-all"
                  style={{
                    background: active ? 'rgba(16,185,129,0.07)' : 'rgba(255,255,255,0.03)',
                    borderColor: active ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div className={`font-semibold text-sm mb-1 ${active ? 'text-emerald-300' : 'text-white'}`}>{b.label}</div>
                  <div className="text-[10px] text-slate-600 leading-relaxed">{b.desc}</div>
                </button>
              );
            })}
          </div>
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
            <SectionHeader step="04b" title="Start Time" desc="When should your first stop begin?" />
            <input
              type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)}
              placeholder="e.g. 10:30 AM or 03:00 PM"
              className="w-full px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all mb-3"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(34,211,238,0.45)'; }}
              onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
            <div className="flex flex-wrap gap-2">
              {['08:30 AM', '10:00 AM', '02:00 PM', '05:30 PM'].map((t) => (
                <button key={t} type="button" onClick={() => setStartTime(t)}
                  className="px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white cursor-pointer transition-colors rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {t}
                </button>
              ))}
            </div>
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
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="font-mono text-xs font-bold text-slate-700">07</span>
                <h2 className="text-white font-semibold text-base">Target Destination</h2>
              </div>
              <p className="text-slate-600 text-xs">Type any Tumkur region or use GPS detection.</p>
            </div>
            <button type="button" onClick={handleDetectLocation} disabled={detectingLocation}
              className="flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-all rounded-xl px-3 py-1.5 shrink-0 ml-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor='rgba(34,211,238,0.3)'; e.currentTarget.style.color='#67E8F9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color='#94A3B8'; }}
            >
              <Navigation className={`w-3.5 h-3.5 ${detectingLocation ? 'animate-spin' : ''}`} />
              {detectingLocation ? 'Detecting...' : 'Detect GPS'}
            </button>
          </div>

          <div className="relative mb-3">
            <MapPin className="w-4 h-4 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Tumkur, DD Hills, Kyathsandra, Madhugiri..."
              className="w-full pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(34,211,238,0.45)'; }}
              onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="label-overline text-slate-700 mr-1">Regions:</span>
            {popularTumkurRegions.map((region) => {
              const active = location.toLowerCase().includes(region.toLowerCase());
              return (
                <button key={region} type="button" onClick={() => setLocation(region)}
                  className="px-2.5 py-0.5 rounded-lg border text-[11px] cursor-pointer transition-all"
                  style={{
                    background: active ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.03)',
                    borderColor: active ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.06)',
                    color: active ? '#67E8F9' : '#475569',
                  }}
                >
                  {region}
                </button>
              );
            })}
          </div>
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
