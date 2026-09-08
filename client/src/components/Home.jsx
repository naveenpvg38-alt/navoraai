import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  Wallet,
  ArrowRight,
  Sliders,
  Route,
  BookmarkCheck,
  Coffee,
  Palette,
  Flame,
  TreePine,
  Zap,
  Shield,
  Eye,
  Dices,
  Compass
} from 'lucide-react';
import VibeRouletteModal from './VibeRouletteModal';

const EXPERIENCE_TAGS = [
  {
    id: 'madhugiri',
    label: 'Madhugiri Fort',
    category: 'Asia’s 2nd Largest Monolith',
    vibe: 'Trek & Adventure',
    emoji: '🏰',
    distance: '43 km',
    duration: '3–4 hrs',
    tagColor: 'amber',
    badge: 'Legendary Fort',
    highlight: 'Steep rock climb with multi-tier historic gateways & 360° panoramic hill vistas.',
    tip: 'Start your climb before 8:00 AM before the granite rock warms up.',
    preset: { location: 'Tumkur', duration: 'half', vibe: 'adventure', group: 'friends', pace: 'packed', budget: 'budget' }
  },
  {
    id: 'thatte-idli',
    label: 'Kyathsandra Thatte Idli',
    category: 'Iconic Food Trail',
    vibe: 'Breakfast Heritage',
    emoji: '🍽️',
    distance: '8 km',
    duration: '1–2 hrs',
    tagColor: 'cyan',
    badge: 'Culinary Must',
    highlight: 'Fluffy plate-sized steamed idlis served with dollops of fresh white butter & spiced sagu.',
    tip: 'Pair with piping filter coffee at legendary Sri Prasanna or Pavithra on Old NH4.',
    preset: { location: 'Tumkur', duration: 'half', vibe: 'foodie', group: 'friends', pace: 'relaxed', budget: 'budget' }
  },
  {
    id: 'dd-hills',
    label: 'Devarayanadurga Hills',
    category: '1,204m Altitude Peak',
    vibe: 'Sunrise & Forest',
    emoji: '⛰️',
    distance: '15 km',
    duration: '3–4 hrs',
    tagColor: 'violet',
    badge: 'Hilltop Vantage',
    highlight: 'Yoga Narasimha temple perched on green rocky peaks and Namada Chilume spring nearby.',
    tip: 'Catch the misty morning sunrise from the upper viewpoint for great photography.',
    preset: { location: 'Tumkur', duration: 'half', vibe: 'nature', group: 'family', pace: 'moderate', budget: 'budget' }
  },
  {
    id: 'amanikere',
    label: 'Amanikere Lakefront',
    category: 'Karnataka’s Largest Tank',
    vibe: 'Sunset Promenade',
    emoji: '🏞️',
    distance: '2 km',
    duration: '1–2 hrs',
    tagColor: 'sky',
    badge: 'City Waterfront',
    highlight: 'Expansive lakeside walking track, pedal boating jetty, musical fountains, and fresh breeze.',
    tip: 'Golden hour (5:30–6:30 PM) is the ideal time for breezy lakeside strolls.',
    preset: { location: 'Tumkur', duration: 'quick', vibe: 'chill', group: 'couple', pace: 'relaxed', budget: 'free' }
  },
  {
    id: 'siddaganga',
    label: 'Siddaganga Mutt',
    category: 'Sacred Spiritual Center',
    vibe: 'Peace & Philanthropy',
    emoji: '🛕',
    distance: '6 km',
    duration: '2 hrs',
    tagColor: 'rose',
    badge: 'Heritage Mutt',
    highlight: 'Centuries-old pilgrimage seat known for Trividha Dasoha (food, education, and shelter).',
    tip: 'Visit the divine shrine on the hilltop steps and experience the peaceful atmosphere.',
    preset: { location: 'Tumkur', duration: 'half', vibe: 'culture', group: 'family', pace: 'relaxed', budget: 'free' }
  },
  {
    id: 'markonahalli',
    label: 'Markonahalli Dam',
    category: 'Engineering Wonder',
    vibe: 'Scenic Waters',
    emoji: '💧',
    distance: '55 km',
    duration: '3–4 hrs',
    tagColor: 'teal',
    badge: 'Siphon Dam',
    highlight: 'Asia’s first dam built with automatic siphons, located peacefully across Shimsha river.',
    tip: 'Quiet picnic getaway; watch the roaring waters during post-monsoon seasons.',
    preset: { location: 'Tumkur', duration: 'full', vibe: 'nature', group: 'friends', pace: 'moderate', budget: 'budget' }
  },
  {
    id: 'kyathsandra-hills',
    label: 'Kyathsandra Boulders',
    category: 'Granite Trails & Cliffs',
    vibe: 'Adventure & Bouldering',
    emoji: '🌄',
    distance: '10 km',
    duration: '2–3 hrs',
    tagColor: 'emerald',
    badge: 'Hidden Trails',
    highlight: 'Natural boulder trails, rocky climbs, and uncrowded nature vistas close to town.',
    tip: 'Great for afternoon bouldering and quiet weekend photography with friends.',
    preset: { location: 'Tumkur', duration: 'half', vibe: 'adventure', group: 'solo', pace: 'moderate', budget: 'free' }
  },
  {
    id: 'goravanahalli',
    label: 'Goravanahalli Temple',
    category: 'Theetha Reservoir Shrine',
    vibe: 'Devotion & Calm',
    emoji: '✨',
    distance: '32 km',
    duration: '2–3 hrs',
    tagColor: 'orange',
    badge: 'Lakshmi Shrine',
    highlight: 'Famous Mahalakshmi shrine set amidst tranquil rural Karnataka countryside.',
    tip: 'Combine your visit with the scenic Theetha reservoir located just 3 km away.',
    preset: { location: 'Tumkur', duration: 'half', vibe: 'culture', group: 'family', pace: 'relaxed', budget: 'budget' }
  },
];

export default function Home({ onStartPlanning, onQuickTemplate }) {
  const [showRoulette, setShowRoulette] = useState(false);
  const [activeTag, setActiveTag] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const tickRef = useRef(null);

  // Typewriter effect cycling through EXPERIENCE_TAGS labels
  useEffect(() => {
    const currentLabel = EXPERIENCE_TAGS[activeTag].label;
    const speed = isDeleting ? 35 : 70;
    tickRef.current = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentLabel.slice(0, typedText.length + 1));
        if (typedText.length + 1 === currentLabel.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setTypedText(currentLabel.slice(0, typedText.length - 1));
        if (typedText.length - 1 === 0) {
          setIsDeleting(false);
          setActiveTag((prev) => (prev + 1) % EXPERIENCE_TAGS.length);
        }
      }
    }, speed);
    return () => clearTimeout(tickRef.current);
  }, [typedText, isDeleting, activeTag]);

  const benefits = [
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      title: 'Instant Planning',
      desc: 'AI evaluates open hours, geographic proximity, and personal interests to build a frictionless itinerary in seconds.',
      accent: 'cyan'
    },
    {
      icon: <Wallet className="w-5 h-5 text-emerald-400" />,
      title: 'Budget Precise',
      desc: 'From free scenic trails to luxury experiences, every plan is calculated down to per-person rupee estimates.',
      accent: 'emerald'
    },
    {
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      title: 'Vibe Matched',
      desc: 'Relaxed, adventurous, romantic, foodie — your outing reflects your exact mood and energy for the day.',
      accent: 'amber'
    },
    {
      icon: <Shield className="w-5 h-5 text-violet-400" />,
      title: 'Locally Curated',
      desc: 'Every location, route, and tip is handcrafted for Tumkur — no generic results from global databases.',
      accent: 'violet'
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Set Your Preferences',
      desc: 'Mood, interests, budget, group size, start time.',
      icon: <Sliders className="w-4 h-4 text-cyan-400" />,
    },
    {
      number: '02',
      title: 'Pick Your Location',
      desc: 'Choose a taluk or landmark anywhere in Tumkur.',
      icon: <MapPin className="w-4 h-4 text-violet-400" />,
    },
    {
      number: '03',
      title: 'AI Builds Your Plan',
      desc: 'Optimized routing, timings, food stops, and tips.',
      icon: <Route className="w-4 h-4 text-pink-400" />,
    },
    {
      number: '04',
      title: 'Go & Explore',
      desc: 'Save to profile, view on map, mark as complete.',
      icon: <BookmarkCheck className="w-4 h-4 text-emerald-400" />,
    }
  ];

  const inspirations = [
    {
      title: 'DD Hills & Namada Chilume Nature Trail',
      tag: 'Scenic & Spiritual',
      tagColor: 'emerald',
      icon: <TreePine className="w-3.5 h-3.5" />,
      budget: 'Budget (₹)',
      duration: '4–5 Hours',
      city: 'Devarayanadurga',
      stops: 'Yoga Narasimha Peak · Deer Sanctuary · Perennial Spring',
      preset: {
        mood: 'Relaxed',
        interests: ['Scenic Outdoors', 'Heritage & Sightseeing'],
        budget: 'Budget ($)',
        duration: 'Half Day (4-5h)',
        location: 'Devarayanadurga (DD Hills), Tumkur',
        trip_type: 'Friends',
        transport: 'Bike / Two-Wheeler'
      }
    },
    {
      title: 'Kyathsandra Thatte Idli & Heritage Walk',
      tag: 'Foodie & Cultural',
      tagColor: 'amber',
      icon: <Coffee className="w-3.5 h-3.5" />,
      budget: 'Budget (₹)',
      duration: '4 Hours',
      city: 'Kyathsandra',
      stops: 'Butter Thatte Idli · Siddaganga Mutt · Hill Pathway',
      preset: {
        mood: 'Foodie',
        interests: ['Cafes & Dining', 'Art & Culture'],
        budget: 'Budget ($)',
        duration: 'Half Day (4-5h)',
        location: 'Kyathsandra & Siddaganga, Tumkur',
        trip_type: 'Friends',
        transport: 'Bike / Two-Wheeler'
      }
    },
    {
      title: 'Madhugiri Monolith Adventure Trek',
      tag: 'Adventurous',
      tagColor: 'cyan',
      icon: <Eye className="w-3.5 h-3.5" />,
      budget: 'Free (₹0)',
      duration: 'Full Day (8h+)',
      city: 'Madhugiri',
      stops: "Asia's 2nd Largest Monolith · Fort Bastions · Sunset Vistas",
      preset: {
        mood: 'Adventurous',
        interests: ['Scenic Outdoors', 'Hidden Gems'],
        budget: 'Free ($0)',
        duration: 'Full Day (8h+)',
        location: 'Madhugiri, Tumkur',
        trip_type: 'Friends',
        transport: 'Car / Cab'
      }
    }
  ];

  const accentMap = {
    cyan:    'border-cyan-500/20 text-cyan-300 bg-cyan-500/8',
    emerald: 'border-emerald-500/20 text-emerald-300 bg-emerald-500/8',
    amber:   'border-amber-500/20 text-amber-300 bg-amber-500/8',
    violet:  'border-violet-500/20 text-violet-300 bg-violet-500/8',
  };

  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative pt-16 pb-24 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 grid-overlay pointer-events-none opacity-40" />
        {/* Aurora orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-aurora" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-aurora" style={{ animationDelay: '-6s' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Overline badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/4 border border-white/10 mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
            <span className="label-overline">Tumkur · AI-Powered Outing Planner</span>
          </div>

          {/* Hero headline — Outfit font */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.08] animate-fade-up">
            Plan Less.{' '}
            <span className="text-gradient-cyan">Experience</span>
            {' '}More.
          </h1>

          {/* Unique AI Outing Radar & Interactive Discovery HUD */}
          <div className="max-w-3xl mx-auto mb-10 animate-fade-up">
            {/* Top Radar Bar */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border mb-3 text-xs"
              style={{
                background: 'rgba(10, 14, 26, 0.75)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <span className="font-mono uppercase tracking-widest text-cyan-400 text-[11px] font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" style={{ animationDuration: '16s' }} />
                  TUMKUR RADAR
                </span>
              </div>

              {/* Typewriter target inside radar display */}
              <div className="flex items-center gap-2 font-medium text-slate-300">
                <span className="text-slate-500 font-normal hidden sm:inline">Exploring:</span>
                <span className="px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 text-white"
                  style={{
                    background: 'rgba(34,211,238,0.08)',
                    borderColor: 'rgba(34,211,238,0.25)',
                    boxShadow: '0 0 14px rgba(34,211,238,0.12)',
                  }}>
                  <span>{EXPERIENCE_TAGS[activeTag].emoji}</span>
                  <span className="text-cyan-300">{typedText}</span>
                  <span className="animate-pulse text-cyan-400 font-mono">|</span>
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                LIVE DESTINATIONS
              </div>
            </div>

            {/* Interactive Destination Capsule Dock */}
            <div
              className="flex flex-wrap justify-center gap-2 p-3 rounded-2xl border mb-3"
              style={{
                background: 'rgba(13, 18, 36, 0.55)',
                borderColor: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {EXPERIENCE_TAGS.map((tag, i) => {
                const isActive = activeTag === i;
                return (
                  <button
                    key={tag.id}
                    onClick={() => {
                      setActiveTag(i);
                      setTypedText(tag.label);
                      setIsDeleting(false);
                    }}
                    className={`relative group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-white scale-[1.03]'
                        : 'text-slate-400 hover:text-slate-200 hover:scale-[1.01]'
                    }`}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(34,211,238,0.16) 0%, rgba(124,58,237,0.16) 100%)'
                        : 'rgba(255, 255, 255, 0.03)',
                      borderColor: isActive
                        ? 'rgba(34,211,238,0.5)'
                        : 'rgba(255, 255, 255, 0.07)',
                      boxShadow: isActive ? '0 0 16px rgba(34,211,238,0.2)' : 'none',
                    }}
                  >
                    {/* Active micro top bar */}
                    {isActive && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-cyan-400 shadow-glow-sm" />
                    )}
                    <span className="text-sm transition-transform group-hover:scale-110">{tag.emoji}</span>
                    <span className={isActive ? 'text-white font-semibold' : ''}>{tag.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Live Spotlight HUD Card */}
            {EXPERIENCE_TAGS[activeTag] && (
              <div
                className="p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'rgba(10, 14, 26, 0.88)',
                  borderColor: 'rgba(34, 211, 238, 0.28)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 24px rgba(34, 211, 238, 0.09)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Background neon ambient highlight */}
                <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-cyan-500/10 via-violet-500/5 to-transparent pointer-events-none blur-2xl" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  {/* Left: Info */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 font-semibold">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        {EXPERIENCE_TAGS[activeTag].badge}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-slate-300 text-xs font-medium">
                        {EXPERIENCE_TAGS[activeTag].category}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">
                        <MapPin className="w-3 h-3 text-violet-400" />
                        {EXPERIENCE_TAGS[activeTag].distance}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        {EXPERIENCE_TAGS[activeTag].duration}
                      </span>
                    </div>

                    {/* Highlight & Local Tip */}
                    <p className="text-white text-sm font-normal leading-relaxed">
                      {EXPERIENCE_TAGS[activeTag].highlight}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed flex items-center gap-1.5">
                      <span className="text-amber-400 font-semibold shrink-0">💡 Local Tip:</span>
                      <span>{EXPERIENCE_TAGS[activeTag].tip}</span>
                    </p>
                  </div>

                  {/* Right: Quick Plan action */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 border-white/8 pt-3 sm:pt-0">
                    <button
                      onClick={() => onQuickTemplate(EXPERIENCE_TAGS[activeTag].preset)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-200 cursor-pointer group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(124,58,237,0.25) 100%)',
                        border: '1px solid rgba(34,211,238,0.4)',
                        boxShadow: '0 0 16px rgba(34,211,238,0.15)',
                      }}
                    >
                      <span>Plan Outing Here</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[10px] font-mono text-slate-500">1-click AI itinerary</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 animate-fade-up">
            <button onClick={onStartPlanning} className="btn-primary text-[15px] !py-3.5 !px-8 !rounded-2xl">
              <Sparkles className="w-4 h-4" />
              Plan My Outing
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowRoulette(true)}
              className="btn-secondary text-[15px] !py-3.5 !px-6 !rounded-2xl !gap-2 cursor-pointer hover:border-cyan-400/40 transition-all group"
            >
              <Dices className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              <span>🎲 Surprise Vibe Roulette</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16 pt-10 border-t border-white/6">
            {[
              { val: '99%',      label: 'Match Accuracy',    color: 'text-cyan-400' },
              { val: '4×',       label: 'Faster Planning',   color: 'text-violet-400' },
              { val: '₹0+',      label: 'Flexible Budget',   color: 'text-emerald-400' },
              { val: '100%',     label: 'Tumkur Exclusive',  color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="stat-card text-center group">
                <div className={`font-mono text-2xl sm:text-3xl font-bold ${s.color} mb-1 group-hover:scale-105 transition-transform`}>
                  {s.val}
                </div>
                <div className="text-slate-500 text-[11px] font-medium tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gradient mx-auto max-w-5xl" />

      {/* ── BENEFITS ──────────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="label-overline mb-3">Why Choose Navora</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Built for Tumkur Explorers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="glass-card p-6 group cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border ${accentMap[b.accent]} transition-transform group-hover:scale-110`}>
                {b.icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-2 tracking-tight">{b.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gradient mx-auto max-w-5xl" />

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="label-overline mb-3">The Process</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Four Steps. One Perfect Day.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="relative p-6 rounded-2xl bg-navora-card border border-white/5 hover:border-white/10 transition-all duration-300 group">
              {/* Step connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-9 -right-2.5 w-5 h-px bg-gradient-to-r from-white/15 to-transparent z-10" />
              )}
              <div className="flex items-center justify-between mb-5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:border-white/15 transition-colors">
                  {step.icon}
                </div>
                <span className="font-mono text-xs font-bold text-white/15 group-hover:text-white/30 transition-colors">{step.number}</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gradient mx-auto max-w-5xl" />

      {/* ── INSPIRATIONS ──────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-overline mb-3">Get Inspired</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Popular Outing Archetypes
            </h2>
          </div>
          <button
            onClick={onStartPlanning}
            className="hidden sm:flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors font-medium group cursor-pointer"
          >
            Custom Plan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {inspirations.map((item, i) => (
            <div
              key={i}
              className="glass-card p-6 flex flex-col justify-between min-h-[280px] group"
            >
              <div>
                {/* Tag + City */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${accentMap[item.tagColor]}`}>
                    {item.icon} {item.tag}
                  </span>
                  <span className="text-slate-600 text-[11px] font-mono">{item.city}</span>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs mb-5 leading-relaxed">{item.stops}</p>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-[11px] text-slate-600 font-mono">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span>
                  <span className="flex items-center gap-1"><Wallet className="w-3 h-3" />{item.budget}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => onQuickTemplate(item.preset)}
                className="mt-5 w-full py-2.5 rounded-xl btn-secondary text-xs font-semibold justify-center !gap-2 cursor-pointer"
              >
                Generate This Vibe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Vibe Roulette Modal */}
      <VibeRouletteModal
        isOpen={showRoulette}
        onClose={() => setShowRoulette(false)}
        onSelectVibe={onQuickTemplate}
      />
    </div>
  );
}
