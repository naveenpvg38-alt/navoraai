import React, { useState } from 'react';
import { Sparkles, Dices, ArrowRight, X, Compass, Clock, Wallet, MapPin, CheckCircle2 } from 'lucide-react';

const SURPRISE_VIBES = [
  {
    id: 'monolith-trek',
    title: 'Madhugiri Monolith & Hill Fort Expedition',
    tagline: 'Conquer Asia’s 2nd largest monolithic rock fortress',
    vibe: 'Adventurous',
    badgeColor: 'cyan',
    location: 'Madhugiri, Tumkur',
    duration: 'Full Day (8h+)',
    budget: 'Free ($0)',
    transport: 'Car / Cab',
    trip_type: 'Friends',
    people_count: 3,
    highlights: ['Ancient Vijayanagara Bastions', 'Steep Rock Incline Steps', 'Panoramic 360° Valley Views'],
    preset: {
      mood: 'Adventurous',
      interests: ['Scenic Outdoors', 'Hidden Gems'],
      budget: 'Free ($0)',
      duration: 'Full Day (8h+)',
      location: 'Madhugiri, Tumkur',
      trip_type: 'Friends',
      people_count: 3,
      transport: 'Car / Cab',
      start_time: '06:30 AM'
    }
  },
  {
    id: 'idli-spiritual',
    title: 'Kyathsandra Thatte Idli & Siddaganga Pilgrim Trail',
    tagline: 'Legendary butter-soaked breakfast meets hillside peace',
    vibe: 'Foodie & Cultural',
    badgeColor: 'amber',
    location: 'Kyathsandra & Siddaganga, Tumkur',
    duration: 'Half Day (4-5h)',
    budget: 'Budget ($)',
    transport: 'Bike / Two-Wheeler',
    trip_type: 'Friends',
    people_count: 2,
    highlights: ['Piping Hot Thatte Idli with Benne', 'Siddaganga Mutt Serenity', 'Filter Coffee Stops'],
    preset: {
      mood: 'Foodie',
      interests: ['Cafes & Dining', 'Art & Culture'],
      budget: 'Budget ($)',
      duration: 'Half Day (4-5h)',
      location: 'Kyathsandra & Siddaganga, Tumkur',
      trip_type: 'Friends',
      people_count: 2,
      transport: 'Bike / Two-Wheeler',
      start_time: '07:30 AM'
    }
  },
  {
    id: 'dd-hills-nature',
    title: 'Devarayanadurga Misty Peak & Forest Spring Trail',
    tagline: 'High altitude temple breeze and sacred perennial rock springs',
    vibe: 'Relaxed & Scenic',
    badgeColor: 'emerald',
    location: 'Devarayanadurga (DD Hills), Tumkur',
    duration: 'Half Day (4-5h)',
    budget: 'Budget ($)',
    transport: 'Bike / Two-Wheeler',
    trip_type: 'Couple',
    people_count: 2,
    highlights: ['Yoga Narasimha Temple Peak', 'Namada Chilume Spring', 'Medicinal Forest Arboretum'],
    preset: {
      mood: 'Relaxed',
      interests: ['Scenic Outdoors', 'Heritage & Sightseeing'],
      budget: 'Budget ($)',
      duration: 'Half Day (4-5h)',
      location: 'Devarayanadurga (DD Hills), Tumkur',
      trip_type: 'Couple',
      people_count: 2,
      transport: 'Bike / Two-Wheeler',
      start_time: '08:00 AM'
    }
  },
  {
    id: 'hoysala-art',
    title: 'Kaidala Master Sculptures & Amanikere Sunset',
    tagline: 'Centuries-old Jakanachari black stone craft & tranquil lakeside',
    vibe: 'Art & Heritage',
    badgeColor: 'violet',
    location: 'Kaidala & Tumkur City',
    duration: 'Half Day (4-5h)',
    budget: 'Budget ($)',
    transport: 'Car / Cab',
    trip_type: 'Family',
    people_count: 4,
    highlights: ['Amarashilpi Jakanachari Masterpiece', 'Amanikere Lake Promenade', 'Evening Light Fountain'],
    preset: {
      mood: 'Cultural',
      interests: ['Art & Culture', 'Heritage & Sightseeing'],
      budget: 'Budget ($)',
      duration: 'Half Day (4-5h)',
      location: 'Kaidala & Tumkur City',
      trip_type: 'Family',
      people_count: 4,
      transport: 'Car / Cab',
      start_time: '02:30 PM'
    }
  },
  {
    id: 'kunigal-siphon',
    title: 'Markonahalli Siphon Dam & Rural Kunigal Ride',
    tagline: 'Engineering marvel by Sir M.V. surrounded by peaceful waters',
    vibe: 'Nature Explorer',
    badgeColor: 'pink',
    location: 'Kunigal, Tumkur',
    duration: 'Full Day (8h+)',
    budget: 'Moderate ($$)',
    transport: 'Bike / Two-Wheeler',
    trip_type: 'Friends',
    people_count: 3,
    highlights: ['Automatic Siphon Spillway', 'Shimsha River Waters', 'Rustic Coconut Grove Routes'],
    preset: {
      mood: 'Nature Explorer',
      interests: ['Scenic Outdoors', 'Hidden Gems'],
      budget: 'Moderate ($$)',
      duration: 'Full Day (8h+)',
      location: 'Kunigal, Tumkur',
      trip_type: 'Friends',
      people_count: 3,
      transport: 'Bike / Two-Wheeler',
      start_time: '09:00 AM'
    }
  }
];

export default function VibeRouletteModal({ isOpen, onClose, onSelectVibe }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  if (!isOpen) return null;

  const current = SURPRISE_VIBES[currentIndex];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SURPRISE_VIBES.length);
      counter++;
      if (counter >= 12) {
        clearInterval(interval);
        // Random final stop
        const finalIdx = Math.floor(Math.random() * SURPRISE_VIBES.length);
        setCurrentIndex(finalIdx);
        setIsSpinning(false);
      }
    }, 90);
  };

  const handleConfirm = () => {
    onSelectVibe(current.preset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(10, 14, 26, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 40px rgba(34,211,238,0.1)'
        }}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            </span>
            <span className="label-overline text-cyan-400">Tumkur Vibe Roulette</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mb-2">
            Don’t Know What To Do?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6 font-light">
            Spin the roulette to let NAVORA AI pick an unexpected, handcrafted Tumkur adventure for you.
          </p>

          {/* Vibe Card Box */}
          <div 
            className={`p-6 rounded-2xl mb-6 transition-all duration-300 ${isSpinning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}
            style={{
              background: 'rgba(18, 25, 44, 0.7)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              boxShadow: '0 10px 30px -10px rgba(34, 211, 238, 0.2)'
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full font-mono text-[11px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30">
                ✦ {current.vibe}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {current.location}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-tight">
              {current.title}
            </h3>
            <p className="text-xs text-slate-300 mb-4 font-light italic">
              "{current.tagline}"
            </p>

            {/* Highlights */}
            <div className="space-y-1.5 mb-5 pt-3 border-t border-white/5">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Metadata Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-slate-300">
              <div className="p-2 rounded-xl bg-white/4 border border-white/6 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span className="truncate">{current.duration}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/4 border border-white/6 flex items-center gap-1.5">
                <Wallet className="w-3 h-3 text-emerald-400" />
                <span className="truncate">{current.budget}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-white/4 border border-white/6 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-violet-400" />
                <span className="truncate">{current.transport}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="flex-1 py-3 px-4 rounded-xl btn-secondary text-xs font-semibold justify-center gap-2 cursor-pointer"
            >
              <Dices className={`w-4 h-4 text-cyan-400 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Spinning Wheels...' : 'Roll Another Vibe'}</span>
            </button>

            <button
              onClick={handleConfirm}
              disabled={isSpinning}
              className="flex-1 py-3 px-4 rounded-xl btn-primary text-xs font-semibold justify-center gap-2 cursor-pointer shadow-glow-cyan"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Plan This Outing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
