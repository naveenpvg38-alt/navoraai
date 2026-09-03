import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Wallet, 
  Users, 
  Compass, 
  Footprints, 
  Bike, 
  Train, 
  Car, 
  Navigation, 
  Check, 
  ChevronRight,
  Coffee,
  Palette,
  Landmark,
  Trees,
  ShoppingBag,
  Music,
  Smile,
  Heart,
  Zap,
  Utensils
} from 'lucide-react';

export default function Planner({ onGenerate, initialPreferences = {} }) {
  const [mood, setMood] = useState(initialPreferences.mood || 'Relaxed');
  const [interests, setInterests] = useState(
    initialPreferences.interests || ['Cafes & Dining', 'Scenic Outdoors']
  );
  const [budget, setBudget] = useState(initialPreferences.budget || 'Moderate ($$)');
  const [duration, setDuration] = useState(initialPreferences.duration || 'Half Day (4-5h)');
  const [startTime, setStartTime] = useState(initialPreferences.start_time || '10:30 AM');
  const [tripType, setTripType] = useState(initialPreferences.trip_type || 'Friends');
  const [peopleCount, setPeopleCount] = useState(initialPreferences.people_count || 2);
  const [transport, setTransport] = useState(initialPreferences.transport || 'Metro / Public Transit');
  const [location, setLocation] = useState(initialPreferences.location || 'Bengaluru');
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Available Moods
  const moods = [
    { id: 'Relaxed', label: 'Relaxed', icon: '🌿', desc: 'Unhurried, peaceful, serene spots' },
    { id: 'Adventurous', label: 'Adventurous', icon: '⚡', desc: 'Thrill, discovering hidden gems' },
    { id: 'Romantic', label: 'Romantic', icon: '✨', desc: 'Intimate ambiance, scenic views' },
    { id: 'Energetic', label: 'Energetic', icon: '🔥', desc: 'Vibrant, high energy activities' },
    { id: 'Foodie', label: 'Foodie', icon: '🍜', desc: 'Culinary adventures & tastings' },
    { id: 'Chill', label: 'Chill', icon: '☕', desc: 'Laid-back conversation & coffee' },
    { id: 'Cultural', label: 'Cultural', icon: '🏛️', desc: 'Art galleries, history & heritage' },
    { id: 'Nature Explorer', label: 'Nature', icon: '🌲', desc: 'Green parks, botanic walks, lakes' }
  ];

  // Available Interests
  const availableInterests = [
    { name: 'Cafes & Dining', icon: <Coffee className="w-4 h-4 text-amber-400" /> },
    { name: 'Art & Culture', icon: <Palette className="w-4 h-4 text-violet-400" /> },
    { name: 'Scenic Outdoors', icon: <Trees className="w-4 h-4 text-emerald-400" /> },
    { name: 'Heritage & Sightseeing', icon: <Landmark className="w-4 h-4 text-cyan-400" /> },
    { name: 'Hidden Gems', icon: <Compass className="w-4 h-4 text-pink-400" /> },
    { name: 'Live Music & Nightlife', icon: <Music className="w-4 h-4 text-rose-400" /> },
    { name: 'Shopping & Bazaars', icon: <ShoppingBag className="w-4 h-4 text-indigo-400" /> },
  ];

  // Available Budgets
  const budgets = [
    { id: 'Free ($0)', label: 'Free ($0)', desc: 'Zero spending; public parks, viewpoints & murals' },
    { id: 'Budget ($)', label: 'Budget ($)', desc: 'Affordable eats, street food & low entry fees' },
    { id: 'Moderate ($$)', label: 'Moderate ($$)', desc: 'Artisanal cafes, boutique dining, ticketed spots' },
    { id: 'Luxury ($$$)', label: 'Luxury ($$$)', desc: 'Premium lounges, fine dining & VIP experiences' }
  ];

  // Durations
  const durations = [
    'Quick (2 Hours)',
    'Half Day (4-5h)',
    'Full Day (8h+)'
  ];

  // Trip Types
  const tripTypes = [
    { type: 'Solo', count: 1 },
    { type: 'Couple', count: 2 },
    { type: 'Friends', count: 3 },
    { type: 'Family', count: 4 },
    { type: 'Group', count: 6 }
  ];

  // Transport modes
  const transportModes = [
    { id: 'Scenic Walk', label: 'Scenic Walk', icon: <Footprints className="w-4 h-4" /> },
    { id: 'Bicycle / Scooter', label: 'Bicycle', icon: <Bike className="w-4 h-4" /> },
    { id: 'Metro / Public Transit', label: 'Metro / Transit', icon: <Train className="w-4 h-4" /> },
    { id: 'Car / Cab', label: 'Car / Cab', icon: <Car className="w-4 h-4" /> }
  ];

  const popularCities = ['Bengaluru', 'Mumbai', 'Delhi', 'Paris', 'New York', 'Tokyo', 'London'];

  const toggleInterest = (name) => {
    if (interests.includes(name)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== name));
      }
    } else {
      setInterests([...interests, name]);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDetectingLocation(false);
        setLocation('Current Location (Detected)');
      },
      (error) => {
        setDetectingLocation(false);
        console.warn('Geolocation error:', error);
        setLocation('Bengaluru'); // fallback
      },
      { timeout: 5000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      mood,
      interests,
      budget,
      duration,
      start_time: startTime,
      trip_type: tripType,
      people_count: Number(peopleCount),
      transport,
      location
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Outing Preferences</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          Craft Your Ideal Day
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Customize your vibe, pace, and destination. Our AI synthesizes a timed, route-optimized itinerary in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Mood Selection */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                <span>1. What’s Your Mood?</span>
              </h2>
              <p className="text-xs text-slate-400">Sets the emotional tone and energy level of the outing.</p>
            </div>
            <span className="text-xs font-semibold text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              {mood}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {moods.map((m) => {
              const active = mood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-br from-cyan-950/80 to-indigo-950/80 border-cyan-500 text-white shadow-glow-cyan/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="font-semibold text-xs sm:text-sm text-white">{m.label}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{m.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interests Multi-Select */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                2. Select Interests & Activities
              </h2>
              <p className="text-xs text-slate-400">Choose all categories you want included (multi-select).</p>
            </div>
            <span className="text-xs text-slate-400">{interests.length} selected</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {availableInterests.map((interest) => {
              const active = interests.includes(interest.name);
              return (
                <button
                  key={interest.name}
                  type="button"
                  onClick={() => toggleInterest(interest.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {interest.icon}
                  <span>{interest.name}</span>
                  {active && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Budget */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <span>3. Budget Preference</span>
              </h2>
              <p className="text-xs text-slate-400">Expected spending per person across meals, tickets, and activities.</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {budget}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {budgets.map((b) => {
              const active = budget === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm text-white mb-1">{b.label}</div>
                  <div className="text-[11px] text-slate-400">{b.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Duration & Start Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <h2 className="text-base font-bold font-display text-white mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>4. Total Available Duration</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">How long do you want the outing to last?</p>

            <div className="space-y-2">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    duration === d
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{d}</span>
                  {duration === d && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <h2 className="text-base font-bold font-display text-white mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>Start Time</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">When do you want your first stop to begin?</p>

            <div className="space-y-3">
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="e.g. 10:30 AM or 03:00 PM"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <div className="flex flex-wrap gap-2">
                {['09:00 AM', '11:00 AM', '02:30 PM', '05:00 PM'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setStartTime(preset)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-[11px] text-slate-300 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Trip Type & People Count */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-400" />
                <span>5. Trip Type & Group Size</span>
              </h2>
              <p className="text-xs text-slate-400">Tailors place capacities and ambiance for your party.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400">People:</span>
              <button
                type="button"
                onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-white hover:bg-slate-700"
              >
                -
              </button>
              <span className="text-sm font-bold text-cyan-300 w-4 text-center">{peopleCount}</span>
              <button
                type="button"
                onClick={() => setPeopleCount(peopleCount + 1)}
                className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-white hover:bg-slate-700"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {tripTypes.map((t) => {
              const active = tripType === t.type;
              return (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => {
                    setTripType(t.type);
                    setPeopleCount(t.count);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    active
                      ? 'bg-pink-950/30 border-pink-500 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{t.type}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">~{t.count} {t.count === 1 ? 'person' : 'people'}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Transport Mode */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                6. Transport Preference
              </h2>
              <p className="text-xs text-slate-400">Determines transit speed and route connectivity between stops.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {transportModes.map((tm) => {
              const active = transport === tm.id;
              return (
                <button
                  key={tm.id}
                  type="button"
                  onClick={() => setTransport(tm.id)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-slate-800">{tm.icon}</div>
                  <span className="text-xs">{tm.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. Location Selection */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>7. Target Location / Destination</span>
              </h2>
              <p className="text-xs text-slate-400">Enter a city or use instant GPS geolocation.</p>
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detectingLocation}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${detectingLocation ? 'animate-spin' : ''}`} />
              <span>{detectingLocation ? 'Detecting...' : 'Detect GPS'}</span>
            </button>
          </div>

          <div className="relative mb-3">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bengaluru, Mumbai, Delhi, Paris, New York..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span className="text-[11px] text-slate-400 mr-1">Popular:</span>
            {popularCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setLocation(city)}
                className={`px-2.5 py-0.5 rounded-lg border text-[11px] transition-colors ${
                  location.toLowerCase().includes(city.toLowerCase())
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-base sm:text-lg shadow-glow-cyan/50 hover:shadow-glow-cyan flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-cyan-200" />
            <span>Generate Personalized Outing Plan</span>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </button>
        </div>
      </form>
    </div>
  );
}
