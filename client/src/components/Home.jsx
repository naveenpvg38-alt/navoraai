import React from 'react';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Clock, 
  Wallet, 
  HeartHandshake, 
  ArrowRight, 
  Sliders, 
  Route, 
  BookmarkCheck,
  Coffee,
  Palette,
  Flame,
  TreePine
} from 'lucide-react';

export default function Home({ onStartPlanning, onQuickTemplate }) {
  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: 'AI Planning',
      desc: 'Precision algorithms evaluate open hours, geographic proximity, and personal interests to craft frictionless itineraries.'
    },
    {
      icon: <Wallet className="w-6 h-6 text-emerald-400" />,
      title: 'Budget Friendly',
      desc: 'From 100% free scenic trails to luxury tasting menus, every plan is calculated down to per-person estimated spending.'
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: 'Mood Based',
      desc: 'Whether you feel relaxed, adventurous, romantic, energetic, or foodie-driven, your outing reflects your exact vibe.'
    },
    {
      icon: <Clock className="w-6 h-6 text-violet-400" />,
      title: 'Time Saving',
      desc: 'Stop switching between 20 tabs of reviews, maps, and blogs. Generate an end-to-end coordinated schedule in seconds.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Select Preferences',
      desc: 'Pick your mood, activities, budget, group size, and start time.',
      icon: <Sliders className="w-5 h-5 text-cyan-400" />
    },
    {
      number: '02',
      title: 'Set Location & Transit',
      desc: 'Use current GPS detection or type any destination city with preferred transit mode.',
      icon: <MapPin className="w-5 h-5 text-violet-400" />
    },
    {
      number: '03',
      title: 'AI Synthesizes Itinerary',
      desc: 'Our engine balances travel times, stop dwell duration, and geographic efficiency.',
      icon: <Route className="w-5 h-5 text-pink-400" />
    },
    {
      number: '04',
      title: 'Experience & Complete',
      desc: 'View your plan on an interactive map, save to your profile, and mark as completed.',
      icon: <BookmarkCheck className="w-5 h-5 text-emerald-400" />
    }
  ];

  const inspirations = [
    {
      title: 'Artistic Heritage & Coffee Trail',
      tag: 'Relaxed & Cultural',
      icon: <Palette className="w-4 h-4 text-cyan-400" />,
      budget: 'Moderate ($$)',
      duration: '4-5 Hours',
      city: 'Bengaluru',
      stops: 'Gallery • Specialty Roasters • Canopy Garden',
      preset: {
        mood: 'Relaxed',
        interests: ['Art & Culture', 'Cafes & Dining'],
        budget: 'Moderate ($$)',
        duration: 'Half Day (4-5h)',
        location: 'Bengaluru',
        trip_type: 'Friends',
        transport: 'Metro / Public Transit'
      }
    },
    {
      title: 'Sunset Quayside & Gourmet Bites',
      tag: 'Romantic & Scenic',
      icon: <Coffee className="w-4 h-4 text-pink-400" />,
      budget: 'Moderate ($$)',
      duration: '4 Hours',
      city: 'Mumbai',
      stops: 'Art Precinct • Specialty Bakehouse • Sunset Promenade',
      preset: {
        mood: 'Romantic',
        interests: ['Cafes & Dining', 'Scenic Outdoors'],
        budget: 'Moderate ($$)',
        duration: 'Half Day (4-5h)',
        location: 'Mumbai',
        trip_type: 'Couple',
        transport: 'Scenic Walk'
      }
    },
    {
      title: 'Urban Explorer & Street Murals',
      tag: 'Adventurous',
      icon: <TreePine className="w-4 h-4 text-emerald-400" />,
      budget: 'Budget ($)',
      duration: 'Full Day (8h+)',
      city: 'Delhi',
      stops: 'Lodhi Murals • Heritage Nursery • Lake Ruins',
      preset: {
        mood: 'Adventurous',
        interests: ['Art & Culture', 'Hidden Gems', 'Scenic Outdoors'],
        budget: 'Budget ($)',
        duration: 'Full Day (8h+)',
        location: 'Delhi',
        trip_type: 'Friends',
        transport: 'Metro / Public Transit'
      }
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow ambient background orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/20 via-violet-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-glow-cyan/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Next-Gen AI Outing & Itinerary Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white max-w-4xl mx-auto leading-tight mb-6">
          Plan Less.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
            Experience More.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          ✦ <strong className="font-semibold text-white">NAVORA AI</strong> turns your mood, budget, and time into a perfectly sequenced outing plan with real transit routes, interactive maps, and insider tips.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onStartPlanning}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-base shadow-glow-cyan/50 hover:shadow-glow-cyan flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer"
          >
            <span>Plan Your Outing</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Highlights Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-bold font-display text-cyan-400">98%</div>
            <div className="text-xs text-slate-400 mt-1">Vibe Match Accuracy</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-bold font-display text-violet-400">4x Faster</div>
            <div className="text-xs text-slate-400 mt-1">Than Manual Searching</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-400">0$ to Luxury</div>
            <div className="text-xs text-slate-400 mt-1">Flexible Budget Control</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-bold font-display text-pink-400">100% Free</div>
            <div className="text-xs text-slate-400 mt-1">Open-Source & Local</div>
          </div>
        </div>
      </section>

      {/* Benefits Section (Section 19) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
            Why Navora AI
          </h2>
          <p className="text-3xl sm:text-4xl font-bold font-display text-white">
            Designed for Effortless Exploration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold font-display text-white mb-2">{b.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section (Section 19) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              System Workflow
            </h2>
            <p className="text-3xl sm:text-4xl font-bold font-display text-white">
              How Navora AI Works
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{step.number}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Outing Inspirations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Get Inspired
            </h2>
            <p className="text-3xl font-bold font-display text-white">
              Popular Outing Archetypes
            </p>
          </div>
          <button
            onClick={onStartPlanning}
            className="mt-4 sm:mt-0 text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            Custom Outing Plan <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inspirations.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">
                    {item.icon} {item.tag}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{item.city}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4">{item.stops}</p>

                <div className="flex items-center gap-3 text-xs text-slate-400 py-3 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-slate-400" /> {item.budget}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onQuickTemplate(item.preset)}
                className="w-full mt-4 py-2.5 px-4 rounded-xl glass-button text-xs font-semibold text-cyan-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Generate This Vibe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
