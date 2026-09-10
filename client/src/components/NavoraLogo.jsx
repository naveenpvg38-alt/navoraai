import { useRef, useState, useEffect } from 'react';

/**
 * NavoraLogo — Liquid Wave 'N'
 * A smooth fluid SVG wave that morphs through the letter N silhouette,
 * with a ripple / swell animation on hover and an ambient shimmer at rest.
 */
export default function NavoraLogo({
  size = 40,
  className = '',
  withGlow = false,
  interactive = true,
  onClick,
}) {
  const dim = typeof size === 'number' ? size : 40;
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(false);
  const animRef = useRef(null);

  // Trigger ripple burst on click
  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 700);
    onClick?.();
  };

  // Ambient "breathe" wave shift
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      setPhase(p => (p + 0.8) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const uid = 'navora-wave';
  const waveAmp = hovered ? 7 : 3;
  const waveSpeed = hovered ? 'waveFast' : 'waveSlow';

  return (
    <span
      ref={animRef}
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dim, height: dim, cursor: interactive ? 'pointer' : 'default' }}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      onClick={interactive ? handleClick : undefined}
      aria-label="Navora AI"
      role="img"
    >
      <style>{`
        @keyframes waveSlow {
          0%   { d: path("M0,16 C10,10 20,22 30,16 C40,10 50,22 60,16 L60,40 L0,40 Z"); }
          50%  { d: path("M0,20 C10,14 20,26 30,20 C40,14 50,26 60,20 L60,40 L0,40 Z"); }
          100% { d: path("M0,16 C10,10 20,22 30,16 C40,10 50,22 60,16 L60,40 L0,40 Z"); }
        }
        @keyframes waveFast {
          0%   { d: path("M0,14 C10,6  20,22 30,14 C40,6  50,22 60,14 L60,40 L0,40 Z"); }
          50%  { d: path("M0,22 C10,14 20,30 30,22 C40,14 50,30 60,22 L60,40 L0,40 Z"); }
          100% { d: path("M0,14 C10,6  20,22 30,14 C40,6  50,22 60,14 L60,40 L0,40 Z"); }
        }
        @keyframes rippleOut {
          0%   { r: 0;  opacity: 0.6; }
          100% { r: 28; opacity: 0; }
        }
        @keyframes shimmer {
          0%,100% { stop-color: #38bdf8; }
          50%      { stop-color: #818cf8; }
        }
        @keyframes shimmer2 {
          0%,100% { stop-color: #6366f1; }
          50%      { stop-color: #06b6d4; }
        }
      `}</style>

      <svg
        viewBox="0 0 60 60"
        width={dim}
        height={dim}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          {/* Gradient for the N letterform */}
          <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#38bdf8">
              <animate attributeName="stop-color" values="#38bdf8;#818cf8;#38bdf8" dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="#6366f1">
              <animate attributeName="stop-color" values="#6366f1;#06b6d4;#6366f1" dur="4s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>

          {/* Wave gradient — lighter shade */}
          <linearGradient id={`${uid}-wave`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.85"/>
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4"/>
          </linearGradient>

          {/* Clip to the N silhouette */}
          <clipPath id={`${uid}-clip`}>
            {/* N letterform path (fills the 60×60 viewBox) */}
            <path d="
              M6,4 L6,56 L16,56 L16,22 L44,56 L54,56 L54,4
              L44,4 L44,38 L16,4 Z
            "/>
          </clipPath>

          {/* Drop shadow / glow filter */}
          <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={hovered ? '3.5' : '1.8'} result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* ── Outer glow ring (optional) ── */}
        {withGlow && (
          <circle cx="30" cy="30" r="29" fill="none"
            stroke="url(#navora-wave-grad)" strokeWidth="0.5" opacity="0.3"/>
        )}

        {/* ── N letterform filled with gradient ── */}
        <path
          d="M6,4 L6,56 L16,56 L16,22 L44,56 L54,56 L54,4 L44,4 L44,38 L16,4 Z"
          fill={`url(#${uid}-grad)`}
          filter={`url(#${uid}-glow)`}
        />

        {/* ── Animated wave clipped to N shape ── */}
        <g clipPath={`url(#${uid}-clip)`}>
          {/* Wave fill */}
          <path
            d="M0,30 C15,22 30,38 45,30 C52,26 57,30 60,30 L60,60 L0,60 Z"
            fill="url(#navora-wave-wave)"
            opacity={hovered ? '0.7' : '0.45'}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-60,0" to="0,0"
              dur={hovered ? '1.4s' : '2.8s'}
              repeatCount="indefinite"
            />
            <animate
              attributeName="d"
              values="
                M-60,30 C-45,22 -30,38 -15,30 C0,22 15,38 30,30 C45,22 60,38 75,30 L75,60 L-60,60 Z;
                M-60,34 C-45,26 -30,42 -15,34 C0,26 15,42 30,34 C45,26 60,42 75,34 L75,60 L-60,60 Z;
                M-60,30 C-45,22 -30,38 -15,30 C0,22 15,38 30,30 C45,22 60,38 75,30 L75,60 L-60,60 Z
              "
              dur={hovered ? '1.4s' : '2.8s'}
              repeatCount="indefinite"
            />
          </path>

          {/* Second wave layer — offset phase */}
          <path
            d="M0,36 C15,28 30,44 45,36 C52,32 57,36 60,36 L60,60 L0,60 Z"
            fill="#a5f3fc"
            opacity={hovered ? '0.35' : '0.18'}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0,0" to="-60,0"
              dur={hovered ? '1.8s' : '3.6s'}
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* ── Ripple burst on click ── */}
        {ripple && (
          <circle cx="30" cy="30" r="0" fill="none"
            stroke="#38bdf8" strokeWidth="2" opacity="0.7">
            <animate attributeName="r" from="0" to="34" dur="0.65s" fill="freeze"/>
            <animate attributeName="opacity" from="0.7" to="0" dur="0.65s" fill="freeze"/>
          </circle>
        )}

        {/* ── Subtle highlight shine at top of N ── */}
        <path
          d="M8,4 L8,12 L18,4 Z"
          fill="white"
          opacity={hovered ? '0.35' : '0.18'}
        />
      </svg>
    </span>
  );
}
