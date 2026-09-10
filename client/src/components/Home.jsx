import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Compass,
  MapPin,
  Clock,
  Wallet,
  ArrowRight,
  Sliders,
  Route,
  BookmarkCheck,
  Flame,
  Zap,
  Shield,
  Dices,
  Navigation,
  CheckCircle2,
  ChevronRight,
  Heart,
  Trees,
  UtensilsCrossed,
  Castle
} from 'lucide-react';
import VibeRouletteModal from './VibeRouletteModal';

const DISCOVER_ITEMS = [
  { emoji: '⛰️', text: 'Devarayanadurga Peak Sunrise (1,204m)' },
  { emoji: '🍽️', text: 'Kyathsandra Iconic Thatte Idli Trail' },
  { emoji: '🏰', text: 'Madhugiri Asia’s 2nd Monolith Fort Trek' },
  { emoji: '🦌', text: 'Namada Chilume Forest Spring & Deer Park' },
  { emoji: '🏞️', text: 'Amanikere Lakefront Sunset & Boating' },
  { emoji: '🛕', text: 'Historic Siddaganga Kshetra & Dasoha' },
  { emoji: '🏛️', text: 'Kaidala Masterpiece Hoysala Temple' },
  { emoji: '💧', text: 'Markonahalli Automatic Siphon Dam' },
  { emoji: '🦌', text: 'Jayamangali Blackbuck Wildlife Sanctuary' },
  { emoji: '✨', text: 'Goravanahalli Mahalakshmi Shrine' },
];

const TUMKUR_LANDMARKS = [
  { emoji: '⛰️', name: 'Devarayanadurga' },
  { emoji: '🍽️', name: 'Kyathsandra Thatte Idli' },
  { emoji: '🏰', name: 'Madhugiri Fort' },
  { emoji: '🦌', name: 'Namada Chilume' },
  { emoji: '🏞️', name: 'Amanikere Lake' },
  { emoji: '🛕', name: 'Siddaganga Mutt' },
  { emoji: '🏛️', name: 'Kaidala Temple' },
  { emoji: '💧', name: 'Markonahalli Dam' },
  { emoji: '🦌', name: 'Jayamangali Blackbucks' },
  { emoji: '✨', name: 'Goravanahalli Shrine' },
];

// Interactive Moods linked with authentic Tumkur Destinations
const MOOD_MOVES = [
  {
    id: 'adventure',
    name: 'Wild Adventure',
    emoji: '⚡',
    badgeText: 'ADRENALINE & SUMMITS',
    themeColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    textGradient: 'linear-gradient(135deg, #38BDF8 0%, #60A5FA 50%, #818CF8 100%)',
    orb1: '#0284C7',
    orb2: '#6366F1',
    orb3: '#38BDF8',
    moveTitle: 'Scale Asia’s 2nd Monolith Fort',
    landmark: 'Madhugiri Monolith & Hill Fort',
    location: 'Madhugiri, Tumkur',
    description: 'Conquer the steep monolithic granite face, navigate historic Vijayanagara gateway fortifications, and absorb 360° breathtaking valley horizons.',
    duration: 'Full Day · 8h+',
    budget: 'Free ($0)',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
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
    id: 'chill',
    name: 'Serene Nature',
    emoji: '🍃',
    badgeText: 'FOREST PEACE & SPRINGS',
    themeColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    textGradient: 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #06B6D4 100%)',
    orb1: '#059669',
    orb2: '#0D9488',
    orb3: '#34D399',
    moveTitle: 'Sacred Forest Springs & Deer Watching',
    landmark: 'Namada Chilume Forest & Spring',
    location: 'Devarayanadurga Forest, Tumkur',
    description: 'Relax beneath cool canopy foliage, watch spotted deer graze in serenity, and taste sacred mountain spring water trickling from ancient rock clefts.',
    duration: 'Half Day · 4-5h',
    budget: 'Budget ($)',
    badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    preset: {
      mood: 'Relaxed',
      interests: ['Nature & Parks', 'Scenic Outdoors'],
      budget: 'Budget ($)',
      duration: 'Half Day (4-5h)',
      location: 'Namada Chilume, Tumkur',
      trip_type: 'Couple',
      people_count: 2,
      transport: 'Bike / Two-Wheeler',
      start_time: '08:00 AM'
    }
  },
  {
    id: 'heritage',
    name: 'Ancient Heritage',
    emoji: '🛕',
    badgeText: 'HOYSALA STONE POETRY',
    themeColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    textGradient: 'linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #6366F1 100%)',
    orb1: '#7C3AED',
    orb2: '#4F46E5',
    orb3: '#C084FC',
    moveTitle: 'Marvel at Monolithic Hoysala Sculptures',
    landmark: 'Kaidala Channakeshava Temple',
    location: 'Kaidala, Tumkur',
    description: 'Stand in awe before master sculptor Jakanachari’s renowned 6-foot dark stone monolith, adorned with delicate 12th-century Hoysala filigree.',
    duration: 'Half Day · 3-4h',
    budget: 'Free ($0)',
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    preset: {
      mood: 'Cultural',
      interests: ['Historical Sites', 'Art & Culture'],
      budget: 'Free ($0)',
      duration: 'Half Day (4-5h)',
      location: 'Kaidala Temple, Tumkur',
      trip_type: 'Solo',
      people_count: 1,
      transport: 'Bike / Two-Wheeler',
      start_time: '09:00 AM'
    }
  },
  {
    id: 'foodie',
    name: 'Foodie Craving',
    emoji: '🍲',
    badgeText: 'ICONIC BUTTER THATTE IDLIS',
    themeColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    textGradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #EF4444 100%)',
    orb1: '#D97706',
    orb2: '#EA580C',
    orb3: '#FBBF24',
    moveTitle: 'Feast on Melting Butter Thatte Idli',
    landmark: 'Kyathsandra Highway Idli Trail',
    location: 'NH 48, Kyathsandra, Tumkur',
    description: 'Devour steaming hot plate-sized Thatte Idlis generously lathered with fresh local white butter (benne), crispy medu vadas, and fiery coconut chutney.',
    duration: 'Quick Trip · 2-3h',
    budget: '₹100-250',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    preset: {
      mood: 'Foodie',
      interests: ['Cafes & Dining', 'Local Food Trails'],
      budget: 'Budget ($)',
      duration: 'Quick Trip (2-3h)',
      location: 'Kyathsandra, Tumkur',
      trip_type: 'Friends',
      people_count: 2,
      transport: 'Bike / Two-Wheeler',
      start_time: '07:30 AM'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset & Romance',
    emoji: '🌅',
    badgeText: 'GOLDEN HOUR LAKE WALK',
    themeColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    textGradient: 'linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #818CF8 100%)',
    orb1: '#DB2777',
    orb2: '#E11D48',
    orb3: '#F472B6',
    moveTitle: 'Lakefront Waterfront Promenade & Boating',
    landmark: 'Amanikere Lakefront Promenade',
    location: 'Amanikere, Tumkur City',
    description: 'Stroll along Karnataka’s largest urban water reservoir boardwalk, catch glowing pink sunset reflections, take a leisure pedal boat, and view the lit glasshouse.',
    duration: 'Evening · 3h',
    budget: '₹40-100',
    badgeColor: 'border-pink-500/30 text-pink-300 bg-pink-500/10',
    preset: {
      mood: 'Romantic',
      interests: ['Scenic Outdoors', 'Sunset Points'],
      budget: 'Budget ($)',
      duration: 'Half Day (4-5h)',
      location: 'Amanikere Lake, Tumkur',
      trip_type: 'Couple',
      people_count: 2,
      transport: 'Car / Cab',
      start_time: '04:30 PM'
    }
  }
];

export default function Home({ user, onGetStarted, onStartPlanning, onQuickTemplate }) {
  const [showRoulette, setShowRoulette] = useState(false);
  const [discIdx, setDiscIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive Mood & Move Selection State
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  const [isHoveringMood, setIsHoveringMood] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const activeMood = MOOD_MOVES[activeMoodIndex];

  // Cursor tracking for interactive spotlight on hero
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Web Audio subtle sound feedback
  const playAudioTick = (freq = 520) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {
      // Audio autoplay restrictions gracefully ignored
    }
  };

  const handleSelectMood = (idx) => {
    if (idx !== activeMoodIndex) {
      setActiveMoodIndex(idx);
      playAudioTick(460 + idx * 60);
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };

  const handleShuffleMood = () => {
    setIsShuffling(true);
    playAudioTick(620);
    const nextIdx = (activeMoodIndex + 1) % MOOD_MOVES.length;
    setTimeout(() => {
      setActiveMoodIndex(nextIdx);
      setIsShuffling(false);
    }, 180);
  };

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Smooth medium-speed typewriter loop
  useEffect(() => {
    const current = DISCOVER_ITEMS[discIdx].text;
    const speed = isDeleting ? 25 : 50;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.slice(0, typedText.length + 1));
        if (typedText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedText(current.slice(0, typedText.length - 1));
        if (typedText.length - 1 === 0) {
          setIsDeleting(false);
          setDiscIdx((prev) => (prev + 1) % DISCOVER_ITEMS.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, discIdx]);

  // Scroll-triggered load reveal (activates when scrolling down or up)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-loaded');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.scroll-load-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  const accentMap = {
    cyan:    'border-cyan-500/20 text-cyan-300 bg-cyan-500/8',
    emerald: 'border-emerald-500/20 text-emerald-300 bg-emerald-500/8',
    amber:   'border-amber-500/20 text-amber-300 bg-amber-500/8',
    violet:  'border-violet-500/20 text-violet-300 bg-violet-500/8',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ── EMBEDDED STYLES FOR ENTRANCE & INTERACTIVE LETTER PHYSICS ── */}
      <style>{`
        @keyframes heroDropIn {
          0% {
            opacity: 0;
            transform: translateY(32px) scale(0.96);
            filter: blur(12px);
          }
          60% {
            transform: translateY(-2px) scale(1.01);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes liquidSheen {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(35px, -25px) scale(1.1); }
        }

        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-30px, 30px) scale(0.92); }
        }

        @keyframes lightSweep {
          0%   { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }

        .anim-sheen-text {
          background-size: 240% auto;
          animation: liquidSheen 6s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-letter {
          display: inline-block;
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.22s ease, color 0.2s ease;
          will-change: transform;
        }

        .hero-letter:hover {
          transform: translateY(-6px) scale(1.12);
          filter: drop-shadow(0 4px 16px currentColor);
        }

        .entrance-1 { animation: heroDropIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
        .entrance-2 { animation: heroDropIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both; }
        .entrance-3 { animation: heroDropIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both; }
        .entrance-4 { animation: heroDropIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.46s both; }
      `}</style>

      {/* ── HERO SECTION WITH DYNAMIC REACTIVE BACKGROUND ── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto"
      >
        {/* 1. Dynamic Reactive Aurora Orbs (Smoothly shifts colors with selected mood) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Top Left Orb */}
          <div
            className="absolute -top-16 -left-20 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full blur-[130px] sm:blur-[160px] opacity-35 transition-all duration-1000 ease-out"
            style={{
              backgroundColor: activeMood.orb1,
              animation: 'orbDrift1 14s ease-in-out infinite alternate',
            }}
          />

          {/* Bottom Right Orb */}
          <div
            className="absolute top-[28%] -right-24 w-[460px] sm:w-[620px] h-[460px] sm:h-[620px] rounded-full blur-[140px] sm:blur-[170px] opacity-30 transition-all duration-1000 ease-out"
            style={{
              backgroundColor: activeMood.orb2,
              animation: 'orbDrift2 16s ease-in-out infinite alternate',
            }}
          />

          {/* Ambient Center Glow */}
          <div
            className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] h-[300px] rounded-full blur-[120px] opacity-25 transition-all duration-1000 ease-out"
            style={{
              backgroundColor: activeMood.orb3,
            }}
          />

          {/* Interactive Mouse Spotlight Glow */}
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-300 opacity-30 hidden md:block"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              width: '450px',
              height: '450px',
              background: `radial-gradient(circle, ${activeMood.themeColor} 0%, transparent 70%)`,
            }}
          />

          {/* Perspective Mesh Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 80%)',
            }}
          />
        </div>

        {/* Floating Telemetry Badge Left (Desktop) */}
        <div className="hidden xl:flex items-center gap-2.5 absolute left-2 top-28 px-3.5 py-2 rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur-md shadow-card pointer-events-none animate-float select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-left">
            <div className="text-[11px] font-mono uppercase text-slate-400">TUMKUR ENGINE</div>
            <div className="text-xs font-semibold text-white">10 Taluks · 100% Curated</div>
          </div>
        </div>

        {/* Floating Telemetry Badge Right (Desktop) */}
        <div className="hidden xl:flex items-center gap-2.5 absolute right-2 top-28 px-3.5 py-2 rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur-md shadow-card pointer-events-none animate-float-slow select-none">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <div className="text-left">
            <div className="text-[11px] font-mono uppercase text-slate-400">AI MATCH ROUTING</div>
            <div className="text-xs font-semibold text-white">Zero Backtracking Logic</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">

          {/* ── 1. Overline Live Sync Badge ── */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/70 border border-white/10 mb-6 sm:mb-8 backdrop-blur-xl shadow-glow-sm entrance-1 cursor-default">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: activeMood.themeColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2 transition-colors duration-500"
                style={{ backgroundColor: activeMood.themeColor }}
              />
            </span>
            <span className="label-overline !text-slate-300">
              TUMKUR AI · <span style={{ color: activeMood.themeColor }} className="font-bold transition-colors duration-500">{activeMood.badgeText}</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1 font-mono">
              <span>{activeMood.emoji}</span> Active Vibe Sync
            </span>
          </div>

          {/* ── 2. THE HERO TAGLINE: "Your Mood. Your Move." ── */}
          <div className="relative mb-5 sm:mb-7 select-none">
            {/* Dynamic Backlight Halo behind the tagline */}
            <div
              className="absolute inset-0 blur-3xl opacity-40 transition-all duration-700 pointer-events-none -z-10"
              style={{
                background: `linear-gradient(90deg, rgba(255,255,255,0.08), ${activeMood.glowColor}, rgba(129, 140, 248, 0.25))`
              }}
            />

            <h1
              className="font-syne font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight leading-[1.08] text-white"
              style={{ letterSpacing: '-0.025em' }}
            >
              {/* Part 1: "Your Mood." */}
              <span className="inline-block entrance-2 mr-3 sm:mr-6 group">
                <span className="text-slate-100 font-extrabold drop-shadow-[0_2px_15px_rgba(255,255,255,0.18)]">
                  {'Your'.split('').map((char, i) => (
                    <span key={i} className="hero-letter">{char}</span>
                  ))}
                </span>
                <span className="inline-block w-2 sm:w-3" />
                <span
                  className="font-black transition-all duration-700 relative inline-block"
                  style={{
                    color: activeMood.themeColor,
                    textShadow: `0 0 35px ${activeMood.glowColor}`,
                  }}
                >
                  {'Mood.'.split('').map((char, i) => (
                    <span key={i} className="hero-letter">{char}</span>
                  ))}
                </span>
              </span>

              {/* Part 2: "Your Move." */}
              <span className="inline-block entrance-3 group">
                <span className="text-slate-100 font-extrabold drop-shadow-[0_2px_15px_rgba(255,255,255,0.18)]">
                  {'Your'.split('').map((char, i) => (
                    <span key={i} className="hero-letter">{char}</span>
                  ))}
                </span>
                <span className="inline-block w-2 sm:w-3" />
                <span
                  className="anim-sheen-text font-black inline-block relative"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 35%, #C084FC 70%, #38BDF8 100%)',
                    textShadow: '0 0 30px rgba(56, 189, 248, 0.45)',
                  }}
                >
                  {'Move.'.split('').map((char, i) => (
                    <span key={i} className="hero-letter">{char}</span>
                  ))}
                </span>
              </span>
            </h1>
          </div>

          {/* ── 3. Dynamic Sub-headline with Live Mood Sync ── */}
          <p className="text-slate-300 text-sm sm:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-7 sm:mb-9 leading-relaxed entrance-4">
            Tell NAVORA how you feel. We curate the{' '}
            <span
              className="font-medium underline decoration-2 underline-offset-4 transition-colors duration-500"
              style={{
                color: activeMood.themeColor,
                textDecorationColor: activeMood.themeColor,
              }}
            >
              exact Tumkur trails, monolithic peaks, and culinary stops
            </span>{' '}
            to match your energy.
          </p>

          {/* ── 4. INTERACTIVE VIBE SELECTOR PILLS ("More Interactive") ── */}
          <div className="mb-7 entrance-4">
            <div className="text-[11px] font-mono tracking-widest uppercase text-slate-400 mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeMood.themeColor }} />
              <span>Tap a mood to ignite your move:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
              {MOOD_MOVES.map((item, idx) => {
                const isActive = idx === activeMoodIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMood(idx)}
                    className={`group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border shadow-lg scale-105'
                        : 'border border-white/8 bg-white/3 text-slate-300 hover:bg-white/8 hover:border-white/18'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'rgba(21, 29, 48, 0.85)' : undefined,
                      borderColor: isActive ? item.themeColor : undefined,
                      color: isActive ? item.themeColor : undefined,
                      boxShadow: isActive ? `0 0 20px -3px ${item.glowColor}` : undefined,
                    }}
                  >
                    <span className="text-base group-hover:scale-125 transition-transform duration-200">
                      {item.emoji}
                    </span>
                    <span>{item.name}</span>
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: item.themeColor }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Shuffle Mood Button */}
              <button
                onClick={handleShuffleMood}
                title="Shuffle Mood"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-400 bg-white/4 border border-white/8 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              >
                <Dices className={`w-3.5 h-3.5 text-cyan-400 ${isShuffling ? 'rotate-180' : ''} transition-transform duration-300`} />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          {/* ── 5. INTERACTIVE LIVE "MOVE" SHOWCASE CARD ── */}
          <div className="max-w-2xl mx-auto mb-9 entrance-4">
            <div
              className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-left transition-all duration-500 relative overflow-hidden"
              style={{
                background: 'rgba(15, 23, 42, 0.78)',
                border: `1px solid ${activeMood.themeColor}33`,
                boxShadow: `0 15px 40px -10px rgba(0,0,0,0.6), 0 0 30px -10px ${activeMood.glowColor}`,
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Subtle top light sheen on card */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-70"
                style={{
                  background: `linear-gradient(90deg, transparent, ${activeMood.themeColor}, transparent)`,
                }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      background: `${activeMood.themeColor}18`,
                      color: activeMood.themeColor,
                      border: `1px solid ${activeMood.themeColor}33`,
                    }}
                  >
                    <span>✦</span> YOUR MATCHED MOVE
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{activeMood.location}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/4 border border-white/8 text-[11px] font-mono text-slate-300">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{activeMood.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/4 border border-white/8 text-[11px] font-mono text-emerald-300">
                    <Wallet className="w-3 h-3 text-emerald-400" />
                    <span>{activeMood.budget}</span>
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                <span>{activeMood.emoji}</span>
                <span>{activeMood.moveTitle}</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                {activeMood.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/6">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Spot: <strong className="text-slate-200">{activeMood.landmark}</strong></span>
                </div>

                <button
                  onClick={() => onQuickTemplate ? onQuickTemplate(activeMood.preset) : (onGetStarted || onStartPlanning)()}
                  className="btn-primary !py-2.5 !px-5 !rounded-xl !text-xs sm:!text-sm font-semibold !gap-2 cursor-pointer group shadow-glow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${activeMood.themeColor} 0%, #4F46E5 100%)`,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
                  <span>Plan This Move With AI</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* ── 6. Live Typewriter Discovery Pill + Continuous Marquee ── */}
          <div className="flex flex-col items-center mb-8 sm:mb-10 entrance-4">
            <style>{`
              @keyframes marqueeTrack {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marqueeTrack 20s linear infinite;
              }
            `}</style>

            {/* Glowing Live Typewriter Pill */}
            <div
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border mb-4 transition-all shadow-glow-sm"
              style={{
                background: 'rgba(13, 18, 36, 0.75)',
                borderColor: 'rgba(34, 211, 238, 0.25)',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.12)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Discovering:
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 min-w-[200px] sm:min-w-[260px] text-left">
                <span>{DISCOVER_ITEMS[discIdx].emoji}</span>
                <span className="text-cyan-300">{typedText}</span>
                <span className="text-cyan-400 font-mono animate-pulse">|</span>
              </span>
            </div>

            {/* Smooth Continuous Marquee of Tumkur Landmarks */}
            <div className="relative w-full max-w-2xl overflow-hidden pointer-events-none select-none">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#0B1120] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#0B1120] to-transparent z-10" />

              <div className="flex gap-2.5 animate-marquee whitespace-nowrap py-1">
                {[...TUMKUR_LANDMARKS, ...TUMKUR_LANDMARKS].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border text-slate-300 shrink-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── 7. Primary Action Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 entrance-4">
            <button
              onClick={onGetStarted || onStartPlanning}
              className="btn-primary w-full sm:w-auto text-[14px] sm:text-[15px] !py-3.5 !px-8 !rounded-2xl cursor-pointer group shadow-glow-sm hover:shadow-glow-cyan"
            >
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Start Planning Your Move</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setShowRoulette(true)}
              className="btn-secondary w-full sm:w-auto text-[14px] sm:text-[15px] !py-3.5 !px-6 !rounded-2xl !gap-2 cursor-pointer hover:border-cyan-400/40 transition-all group"
            >
              <Dices className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              <span>🎲 Surprise Vibe Roulette</span>
            </button>
          </div>

          {/* ── 8. Stats Row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/6">
            {[
              { val: '99%',  label: 'Match Accuracy',   color: 'text-cyan-400' },
              { val: '4×',   label: 'Faster Planning',  color: 'text-violet-400' },
              { val: '₹0+',  label: 'Flexible Budget',  color: 'text-emerald-400' },
              { val: '100%', label: 'Tumkur Exclusive', color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="stat-card text-center !p-3 sm:!p-5">
                <div className={`font-mono text-xl sm:text-3xl font-bold ${s.color} mb-1`}>
                  {s.val}
                </div>
                <div className="text-slate-500 text-[10px] sm:text-[11px] font-medium tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gradient mx-auto max-w-5xl" />

      {/* ── BENEFITS ──────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 scroll-load-reveal">
          <p className="label-overline mb-3">Why Choose Navora</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Built for Tumkur Explorers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`glass-card p-6 group cursor-default scroll-load-reveal scroll-delay-${(i % 4) + 1}`}
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
        <div className="text-center mb-12 scroll-load-reveal">
          <p className="label-overline mb-3">The Process</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Four Steps. One Perfect Day.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative p-6 rounded-2xl bg-navora-card border border-white/5 hover:border-white/10 transition-all duration-300 group scroll-load-reveal scroll-delay-${(i % 4) + 1}`}
            >
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

      {/* ── READY TO EXPLORE CTA ──────────────────────── */}
      <section className="py-20 px-5 sm:px-8 max-w-5xl mx-auto">
        <div
          className="relative rounded-3xl p-8 sm:p-14 text-center overflow-hidden scroll-load-reveal"
          style={{
            background: 'linear-gradient(135deg, rgba(13, 18, 36, 0.95) 0%, rgba(21, 29, 48, 0.9) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 35px rgba(34, 211, 238, 0.08) inset',
          }}
        >
          {/* Ambient decorative glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="label-overline text-cyan-400 mb-2 block">Tumkur Outing Intelligence</span>
            <h3 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to Discover Tumkur with AI?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {user
                ? 'Your personalized outing workspace is ready. Hop directly into the planner to discover fresh scenic trails and iconic eats.'
                : 'Craft your perfect day in seconds — generate intelligent, zero-backtracking routes tailored exclusively for Tumkur.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={onGetStarted || onStartPlanning}
                className="btn-primary text-[15px] !py-3.5 !px-8 !rounded-2xl cursor-pointer group shadow-glow-sm hover:shadow-glow-md transition-all"
              >
                {user ? (
                  <>
                    <Compass className="w-4.5 h-4.5 text-cyan-300 group-hover:rotate-45 transition-transform duration-300" />
                    <span>Explore Tumkur Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    <Compass className="w-4.5 h-4.5 text-cyan-300 group-hover:rotate-45 transition-transform duration-300" />
                    <span>Start Exploring</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
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
