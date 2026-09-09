import React from 'react';

/**
 * NAVORA AI — Official Brand Mark
 * Style: Hexagonal Tech Shield & Monogram
 * A faceted geometric 'N' monogram embedded inside an obsidian cyber shield.
 */
export default function NavoraLogo({ size = 'md', className = '', withGlow = true }) {
  // Map size tokens to pixel dimensions
  const pixelSizes = {
    xs: 22,
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64,
    '2xl': 80
  };

  const dim = typeof size === 'number' ? size : (pixelSizes[size] || 36);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: dim, height: dim }}
    >
      {/* Outer ambient glow */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-2xl opacity-40 blur-md pointer-events-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(129,140,248,0.3) 50%, transparent 70%)'
          }}
        />
      )}

      <svg
        width={dim}
        height={dim}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Hexagon shield rim gradient */}
          <linearGradient id="shield-rim" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>

          {/* Hexagon dark obsidian body */}
          <linearGradient id="shield-bg" x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#131D36" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0B1120" stopOpacity="0.98" />
          </linearGradient>

          {/* Left pillar gradient */}
          <linearGradient id="n-left" x1="20" y1="18" x2="25" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Diagonal blade gradient */}
          <linearGradient id="n-diag" x1="22" y1="18" x2="44" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="45%" stopColor="#38BDF8" />
            <stop offset="85%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          {/* Right pillar gradient */}
          <linearGradient id="n-right" x1="39" y1="18" x2="44" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          {/* Specular edge sheen */}
          <linearGradient id="n-sheen" x1="24" y1="18" x2="40" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Soft neon core glow filter */}
          <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Hexagonal Shield Base */}
        <polygon
          points="32,6 54,18.5 54,45.5 32,58 10,45.5 10,18.5"
          fill="url(#shield-bg)"
          stroke="url(#shield-rim)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 2. Inner Shield Circuit Inset */}
        <polygon
          points="32,10.5 49.5,20.5 49.5,43.5 32,53.5 14.5,43.5 14.5,20.5"
          fill="none"
          stroke="rgba(56, 189, 248, 0.18)"
          strokeWidth="1"
          strokeDasharray="3 2"
          strokeLinejoin="round"
        />

        {/* 3. Tech Monogram 'N' — Left Pillar */}
        <path
          d="M 20 21 L 25 18 L 25 43 L 20 46 Z"
          fill="url(#n-left)"
          stroke="rgba(56, 189, 248, 0.4)"
          strokeWidth="0.5"
        />

        {/* 4. Tech Monogram 'N' — Right Pillar */}
        <path
          d="M 39 18 L 44 21 L 44 46 L 39 43 Z"
          fill="url(#n-right)"
          stroke="rgba(192, 132, 252, 0.4)"
          strokeWidth="0.5"
        />

        {/* 5. Tech Monogram 'N' — Dynamic Diagonal Blade */}
        <path
          d="M 20.5 20.5 L 26 18 L 43.5 43.5 L 38 46 Z"
          fill="url(#n-diag)"
          filter="url(#core-glow)"
        />

        {/* 6. Specular Highlight Blade Crest */}
        <path
          d="M 21.5 20.8 L 26 18.2 L 35 30 L 32 31 Z"
          fill="url(#n-sheen)"
          opacity="0.75"
        />

        {/* 7. Apex North/AI Star Compass Spark (top-left vertex) */}
        <circle cx="20.5" cy="20.5" r="1.8" fill="#FFFFFF" />
        <circle cx="20.5" cy="20.5" r="3.2" fill="#38BDF8" opacity="0.4" />

        {/* 8. Destination Route Node (bottom-right vertex) */}
        <circle cx="43.5" cy="43.5" r="1.8" fill="#FFFFFF" />
        <circle cx="43.5" cy="43.5" r="3.2" fill="#C084FC" opacity="0.4" />

        {/* 9. Central Navigation Crossroads Node */}
        <polygon
          points="32,29.5 34.5,32 32,34.5 29.5,32"
          fill="#FFFFFF"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}
