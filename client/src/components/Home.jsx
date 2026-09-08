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
  Dices
} from 'lucide-react';
import VibeRouletteModal from './VibeRouletteModal';

const EXPERIENCE_TAGS = [
  { label: 'Thatte Idli', emoji: '🍽️', color: 'cyan' },
  { label: 'Devarayanadurga', emoji: '⛰️', color: 'violet' },
  { label: 'Madhugiri Fort', emoji: '🏰', color: 'amber' },
  { label: 'Kyathsandra Hills', emoji: '🌄', color: 'emerald' },
  { label: 'Siddaganga Temple', emoji: '🛕', color: 'rose' },
  { label: 'Amanikere Lake', emoji: '🏞️', color: 'sky' },
  { label: 'Markonahalli Dam', emoji: '💧', color: 'teal' },
  { label: 'Goravanahalli Temple', emoji: '✨', color: 'orange' },
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
    const speed = isDeleting ? 40 : 80;
    tickRef.current = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentLabel.slice(0, typedText.length + 1));
        if (typedText.length + 1 === currentLabel.length) {
          setTimeout(() => setIsDeleting(true), 1200);
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

          {/* Interactive typewriter + clickable destination tags */}
          <div className="max-w-2xl mx-auto mb-10 animate-fade-up">
            {/* Typewriter row */}
            <div className="flex items-center justify-center gap-2 mb-5 text-base sm:text-lg font-light text-slate-400">
              <span>Discover</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-medium text-white min-w-[180px] justify-center"
                style={{
                  background: 'rgba(34,211,238,0.07)',
                  borderColor: 'rgba(34,211,238,0.25)',
                  boxShadow: '0 0 12px rgba(34,211,238,0.1)',
                }}>
                <span>{EXPERIENCE_TAGS[activeTag].emoji}</span>
                <span style={{ minWidth: '130px' }}>{typedText}<span className="animate-pulse text-cyan-400 font-mono">|</span></span>
              </span>
              <span>& more</span>
            </div>

            {/* Clickable destination pill grid */}
            <div className="flex flex-wrap justify-center gap-2">
              {EXPERIENCE_TAGS.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTag(i); setTypedText(''); setIsDeleting(false); }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-200 cursor-pointer ${
                    activeTag === i
                      ? 'border-cyan-400/50 text-cyan-300 scale-105'
                      : 'border-white/8 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                  style={activeTag === i ? { background: 'rgba(34,211,238,0.1)', boxShadow: '0 0 10px rgba(34,211,238,0.12)' } : { background: 'rgba(255,255,255,0.03)' }}
                >
                  <span>{tag.emoji}</span>
                  {tag.label}
                </button>
              ))}
            </div>
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
