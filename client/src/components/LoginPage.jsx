import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  ArrowLeft,
  Compass,
  MapPin,
  Sparkles,
  Shield,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../api';

const TUMKUR_WAYPOINTS = [
  {
    id: 'ddhills',
    emoji: '⛰️',
    tag: '1,204m Sunrise Peak',
    title: 'Devarayanadurga Hills',
    desc: 'Yoga & Bhoga Narasimha shrines nestled in misty hill contours with 360° horizon views.',
    coord: '13.3729° N, 77.2114° E',
    accent: 'from-cyan-500/20 to-blue-600/10',
    border: 'border-cyan-400/30',
  },
  {
    id: 'kyathsandra',
    emoji: '🍽️',
    tag: 'Iconic Gastronomy',
    title: 'Kyathsandra Thatte Idli',
    desc: 'Golden melt butter Thatte Idlis, spiced coconut red chutney, and aromatic filter kaapi.',
    coord: '13.3289° N, 77.1472° E',
    accent: 'from-amber-500/20 to-orange-600/10',
    border: 'border-amber-400/30',
  },
  {
    id: 'madhugiri',
    emoji: '🏰',
    tag: 'Asia’s 2nd Monolith',
    title: 'Madhugiri Rock Fortress',
    desc: 'Colossal single rock citadel with stone arched gateways and historic hill bastions.',
    coord: '13.6631° N, 77.2131° E',
    accent: 'from-violet-500/20 to-purple-600/10',
    border: 'border-violet-400/30',
  },
  {
    id: 'namada',
    emoji: '🦌',
    tag: 'Sacred Forest Spring',
    title: 'Namada Chilume Spring',
    desc: 'Perennial natural rock cleft spring enveloped by medicinal forest trails and deer reserve.',
    coord: '13.3644° N, 77.1648° E',
    accent: 'from-emerald-500/20 to-teal-600/10',
    border: 'border-emerald-400/30',
  },
];

export default function LoginPage({
  initialMode = 'login',
  onSuccess,
  onBack,
  onExploreAsGuest,
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeWaypoint, setActiveWaypoint] = useState(0);

  // Auto-cycle waypoint highlight in the left panel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWaypoint((prev) => (prev + 1) % TUMKUR_WAYPOINTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = mode === 'signup'
        ? await api.signup({ name, email, password })
        : await api.login({ email, password });

      localStorage.setItem('navora_token', data.token);
      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await api.demoLogin();
      localStorage.setItem('navora_token', data.token);
      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Ambient background glow orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/12 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] rounded-full bg-violet-600/12 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-600/10 blur-[130px] pointer-events-none" />

      {/* Top navigation row */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 py-5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/4 border border-white/8 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-all text-xs font-medium cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Brand identity badge */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(13,18,36,0.9)',
              border: '1px solid rgba(34,211,238,0.3)',
              boxShadow: '0 0 14px rgba(34,211,238,0.15)',
            }}
          >
            <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          </div>
          <span className="font-display font-extrabold text-lg text-white tracking-tight">
            NAVORA <span className="text-cyan-400">AI</span>
          </span>
          <span className="label-overline text-slate-500 hidden sm:inline">Tumkur</span>
        </div>

        {/* Guest shortcut */}
        <button
          onClick={onExploreAsGuest || onBack}
          className="text-xs text-slate-400 hover:text-cyan-300 transition-colors font-medium cursor-pointer"
        >
          Explore as Guest →
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-8 py-6 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── LEFT PANEL: The Tumkur Explorer Matrix (Hidden on small, prominent on desktop) ── */}
          <div className="lg:col-span-6 hidden lg:flex flex-col justify-center space-y-6 animate-fade-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-mono mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>TUMKUR EXPLORER ACCESS MATRIX</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-3">
                Plan Less. <br />
                <span className="text-gradient-cyan">Experience Tumkur</span> More.
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Unlock personalized, zero-backtracking outing itineraries powered by AI, calibrated exclusively for Tumkur’s historic monolithic forts, forest springs, and food trails.
              </p>
            </div>

            {/* Interactive Waypoint Showcase Rail */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 block">
                Featured District Waypoints
              </span>
              <div className="grid grid-cols-2 gap-3">
                {TUMKUR_WAYPOINTS.map((wp, idx) => {
                  const isActive = idx === activeWaypoint;
                  return (
                    <div
                      key={wp.id}
                      onClick={() => setActiveWaypoint(idx)}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                        isActive
                          ? `${wp.border} bg-white/[0.05] shadow-lg shadow-cyan-500/10 scale-[1.02]`
                          : 'border-white/6 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">{wp.emoji}</span>
                        <span className="text-[9px] font-mono text-cyan-400/80 px-1.5 py-0.5 rounded-full bg-cyan-400/10">
                          {wp.tag}
                        </span>
                      </div>
                      <h4 className="text-white text-xs font-semibold tracking-tight truncate">{wp.title}</h4>
                      <p className="text-slate-400 text-[11px] line-clamp-2 mt-1 leading-snug">{wp.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Telemetry Pill */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/6 flex items-center justify-between text-xs font-mono text-slate-400 max-w-md">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{TUMKUR_WAYPOINTS[activeWaypoint].coord}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-sans text-[11px] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% District Verified</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Cyber Access Gateway (The Unique Login Form) ── */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div
              className="w-full max-w-md rounded-3xl p-6 sm:p-8 relative overflow-hidden animate-fade-up"
              style={{
                background: 'linear-gradient(145deg, rgba(21, 29, 48, 0.88) 0%, rgba(13, 18, 36, 0.95) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 30px 70px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.08) inset',
              }}
            >
              {/* Form header */}
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
                  {mode === 'signup' ? 'Create Explorer Account' : 'Welcome Back'}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  {mode === 'signup'
                    ? 'Join to generate, customize, and save your Tumkur outings.'
                    : 'Sign in to access your saved itineraries and personalized routes.'}
                </p>
              </div>

              {/* Fluid Mode Switcher Pill */}
              <div className="flex rounded-xl p-1 bg-white/4 border border-white/8 mb-6">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* ⚡ 1-Click Instant Demo Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl cursor-pointer transition-all duration-300 mb-2 group relative overflow-hidden"
                style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)';
                  e.currentTarget.style.background = 'rgba(56, 189, 248, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                  e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)';
                }}
              >
                <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300">
                  ⚡ 1-CLICK DEMO ACCESS
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">(Instant Login)</span>
              </button>
              <p className="text-center text-[10px] text-slate-500 font-mono mb-5">
                NO REGISTRATION REQUIRED FOR EVALUATION
              </p>

              {/* Gradient Divider */}
              <div className="divider-gradient mb-5" />

              {/* Error Alert */}
              {error && (
                <div
                  className="mb-4 p-3 rounded-xl flex items-center gap-2.5 text-xs text-rose-300 animate-fade-in"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Naveen Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-200 rounded-xl bg-white/4 border border-white/8 focus:border-cyan-400/50"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-200 rounded-xl bg-white/4 border border-white/8 focus:border-cyan-400/50"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5 ml-1">
                    <label className="text-xs font-medium text-slate-400">Password</label>
                    {mode === 'login' && (
                      <span className="text-[11px] text-cyan-400/80 hover:text-cyan-300 transition-colors cursor-pointer">
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-200 rounded-xl bg-white/4 border border-white/8 focus:border-cyan-400/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer p-1"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full !py-3.5 !rounded-xl justify-center cursor-pointer mt-2 group shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom toggle / disclaimer */}
              <div className="mt-6 pt-5 border-t border-white/6 text-center space-y-2">
                <p className="text-xs text-slate-400">
                  {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === 'signup' ? 'login' : 'signup');
                      setError('');
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 cursor-pointer ml-1"
                  >
                    {mode === 'signup' ? 'Sign In' : 'Create Account'}
                  </button>
                </p>

                <p className="text-[11px] text-slate-500">
                  By continuing, you agree to NAVORA AI’s Terms of Use and Tumkur District Privacy Protocol.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
