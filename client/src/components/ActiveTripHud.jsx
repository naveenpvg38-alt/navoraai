import React, { useState, useEffect, useRef } from 'react';
import {
  Navigation,
  Compass,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  Radio,
  Zap,
  Fuel,
  Trophy,
  ExternalLink,
  Volume2,
  VolumeX,
  LocateFixed,
  Route,
  Sparkles
} from 'lucide-react';

/**
 * High-tech Web Audio Synthesizer Chime
 * Zero dependencies, plays an uplifting futuristic reward tone on stop check-in.
 */
function playCheckinChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc1.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.25); // C6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc2.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.3); // E6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
  } catch (err) {
    // AudioContext blocked or not allowed by browser policy
  }
}

/**
 * Lightweight Zero-dependency Particle Confetti Burst on HTML5 Canvas
 */
function launchConfetti(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  const colors = ['#22D3EE', '#818CF8', '#34D399', '#F472B6', '#FBBF24', '#FFFFFF'];
  const particles = Array.from({ length: 90 }).map(() => ({
    x: width / 2 + (Math.random() - 0.5) * 80,
    y: height * 0.45,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.8) * 16,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 10,
    alpha: 1
  }));

  let animFrame;
  let start = Date.now();

  function render() {
    const elapsed = Date.now() - start;
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.rot += p.vrot;
      p.alpha = Math.max(0, 1 - elapsed / 2200);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    if (elapsed < 2200) {
      animFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  animFrame = requestAnimationFrame(render);
  return () => cancelAnimationFrame(animFrame);
}

export default function ActiveTripHud({ plan, onClose, onCompleteTrip }) {
  const items = plan?.items || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedStops, setCompletedStops] = useState(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(38); // Simulated speed for HUD aesthetic
  const [liveCoords, setLiveCoords] = useState(null);
  const canvasRef = useRef(null);

  const currentStop = items[currentIdx] || items[0];
  const nextStop = items[currentIdx + 1] || null;
  const progressPercent = items.length ? Math.round((completedStops.size / items.length) * 100) : 0;

  // Real device GPS stream when active
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLiveCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          speed: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : null
        });
        if (pos.coords.speed) {
          setCurrentSpeed(Math.round(pos.coords.speed * 3.6));
        }
      },
      () => {},
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Check in at the current stop
  const handleCheckIn = () => {
    if (soundEnabled) playCheckinChime();
    if ('vibrate' in navigator) navigator.vibrate([80, 40, 120]);
    if (canvasRef.current) launchConfetti(canvasRef.current);

    const updated = new Set(completedStops);
    updated.add(currentIdx);
    setCompletedStops(updated);

    if (updated.size === items.length) {
      setIsFinished(true);
      if (onCompleteTrip && plan?.plan_id) {
        onCompleteTrip(plan.plan_id);
      }
    } else if (currentIdx < items.length - 1) {
      setTimeout(() => {
        setCurrentIdx(prev => prev + 1);
      }, 700);
    }
  };

  // Google Maps turn-by-turn navigation URL for current stop
  const getMapsNavUrl = (stop) => {
    if (!stop) return '#';
    if (stop.latitude && stop.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}&travelmode=driving`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.place_name + ', Tumkur')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070B14]/95 backdrop-blur-2xl text-white flex flex-col overflow-hidden animate-fade-in">
      {/* Canvas for reward confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* ── Top HUD Telemetry Bar ────────────────────────────── */}
      <header
        className="px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between shrink-0"
        style={{
          background: 'rgba(11, 17, 32, 0.85)',
          paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="leading-none">
            <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
              ACTIVE COCKPIT HUD
            </span>
            <h3 className="font-display text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
              {plan?.title || 'Tumkur Circuit'}
            </h3>
          </div>
        </div>

        {/* HUD Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
            title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 cursor-pointer transition-colors"
            title="Exit HUD"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Main Cockpit Area ────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 max-w-4xl mx-auto w-full flex flex-col justify-between">
        {isFinished ? (
          /* ── Trip Victory Finish Card ───────────────────────── */
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 animate-scale-up">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)] mb-6">
              <Trophy className="w-12 h-12 animate-bounce" />
            </div>
            <span className="label-overline text-emerald-400 mb-2">TUMKUR TRAIL CONQUERED</span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3">
              Outing Completed! 🎉
            </h2>
            <p className="text-slate-400 text-sm max-w-md mb-8">
              You checked in to all {items.length} waypoints across Tumkur. All memories and route metrics have been saved!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-xs">
              <button
                onClick={onClose}
                className="btn-primary w-full !rounded-xl !py-3.5 !text-sm cursor-pointer justify-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>Return to Itinerary</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Telemetry */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Route className="w-3.5 h-3.5 text-cyan-400" />
                  WAYPOINT {currentIdx + 1} OF {items.length}
                </span>
                <span className="text-cyan-300 font-bold">{progressPercent}% COMPLETED</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(8, progressPercent)}%` }}
                />
              </div>
            </div>

            {/* Main Active Waypoint Card */}
            {currentStop && (
              <div
                className="p-5 sm:p-7 rounded-3xl border border-cyan-500/30 mb-4 relative overflow-hidden transition-all shadow-[0_0_40px_rgba(34,211,238,0.12)] bg-white/95 dark:bg-gradient-to-br dark:from-[#0D162C]/92 dark:to-[#090E1C]/95 text-slate-900 dark:text-white"
              >
                {/* Neon radar scanline animation */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-sweep" />

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 font-mono text-[10px] text-cyan-300 uppercase tracking-wider mb-2">
                      <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                      TARGET DESTINATION
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {currentStop.place_name}
                    </h2>
                  </div>

                  {/* ETA Badge */}
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-cyan-300 block">
                      {currentStop.start_time}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Target Time</span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed">
                  {currentStop.activity}
                </p>

                {/* Local Pro-Tip Box */}
                {currentStop.tips && (
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/4 border border-white/8 mb-5 flex items-start gap-2.5 text-xs text-amber-200/90">
                    <span className="text-base shrink-0">💡</span>
                    <div>
                      <strong className="text-amber-300 font-semibold block mb-0.5">Local Insider Tip</strong>
                      <span>{currentStop.tips}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons: 1-Tap Google GPS + Check-In */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={getMapsNavUrl(currentStop)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'rgba(34, 211, 238, 0.15)',
                      border: '1px solid rgba(34, 211, 238, 0.4)',
                      color: '#38BDF8',
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.15)'
                    }}
                  >
                    <Navigation className="w-4 h-4 text-cyan-300" />
                    <span>Launch Google GPS</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <button
                    onClick={handleCheckIn}
                    className="btn-primary !rounded-2xl !py-3.5 !text-sm cursor-pointer justify-center shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>✓ Check In (Arrived!)</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── Next Up Preview Strip ────────────────────────── */}
            {nextStop ? (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-between gap-3 text-xs mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0 font-bold font-mono">
                    {currentIdx + 2}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Next Up</span>
                    <span className="font-semibold text-white text-xs sm:text-sm truncate max-w-[200px] sm:max-w-md block">
                      {nextStop.place_name}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs text-cyan-400 font-semibold">{nextStop.start_time}</span>
                  <span className="text-[10px] text-slate-500 block">Scheduled</span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-300 font-mono mb-4">
                🏁 You are on the final stop of this Tumkur circuit!
              </div>
            )}

            {/* ── Bottom HUD Vehicle & Waypoint Switcher ─────────── */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              {/* Est Transit Speed */}
              <div className="p-2.5 rounded-2xl bg-black/40 border border-white/6">
                <span className="font-mono text-lg sm:text-xl font-bold text-cyan-400 block leading-none">
                  {currentSpeed} <span className="text-[10px] text-slate-500">km/h</span>
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase mt-1 block">Speed Telemetry</span>
              </div>

              {/* Transit Mode */}
              <div className="p-2.5 rounded-2xl bg-black/40 border border-white/6">
                <span className="font-mono text-xs sm:text-sm font-semibold text-white block truncate leading-none pt-1">
                  {plan?.transport || 'Two-Wheeler'}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase mt-2 block">Transit Mode</span>
              </div>

              {/* Waypoint Skip/Switch */}
              <button
                onClick={() => {
                  if (currentIdx < items.length - 1) setCurrentIdx(prev => prev + 1);
                }}
                disabled={currentIdx >= items.length - 1}
                className={`p-2.5 rounded-2xl border transition-all ${
                  currentIdx < items.length - 1
                    ? 'bg-white/5 border-white/10 hover:border-cyan-400/30 text-slate-300 cursor-pointer'
                    : 'bg-white/2 border-white/5 text-slate-700 cursor-not-allowed'
                }`}
              >
                <span className="font-mono text-xs font-semibold flex items-center justify-center gap-1 leading-none pt-1">
                  Skip <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase mt-2 block">Next Stop</span>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
