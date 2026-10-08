import React from 'react';

interface LogoProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================================
// 1. ABOUT ME APP — THE "ME" LUXURY-TECH MONOGRAM
// Bold, modern, fluid typography with Apple-grade curves & vibrant gradients
// ============================================================================
export function AboutMeLogo({ size = 32, className, style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        overflow: 'visible',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
        ...style,
      }}
      aria-label="About Me (ME Monogram)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Vibrant Fuchsia to Violet Gradient */}
        <linearGradient id="me-m-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2a85" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        {/* Ultraviolet to Cyan Gradient for E */}
        <linearGradient id="me-e-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="60%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Gloss highlight */}
        <linearGradient id="me-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="me-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Subtle Ambient Disc Backdrop */}
      <circle cx="50" cy="50" r="45" fill="rgba(255, 255, 255, 0.04)" />

      {/* ================= LETTER "M" (x: 16 to 52) ================= */}
      {/* Left Pillar */}
      <rect x="16" y="24" width="9" height="52" rx="4.5" fill="url(#me-m-grad)" />

      {/* Center Chevron Left Slope */}
      <path
        d="M 23,26 L 35,52 C 35.8,53.8 38.2,53.8 39,52 L 51,26 C 51.8,24.3 50.5,22 48.5,22 H 46 C 44.8,22 43.8,22.7 43.2,23.8 L 37,37.5 L 30.8,23.8 C 30.2,22.7 29.2,22 28,22 H 25.5 C 23.5,22 22.2,24.3 23,26 Z"
        fill="url(#me-m-grad)"
      />

      {/* Right Pillar of M */}
      <rect x="47" y="24" width="9" height="52" rx="4.5" fill="url(#me-m-grad)" />

      {/* ================= LETTER "E" (x: 58 to 84) ================= */}
      {/* E Vertical Spine */}
      <rect x="58" y="24" width="9" height="52" rx="4.5" fill="url(#me-e-grad)" />

      {/* E Top Horizontal Bar */}
      <rect x="63" y="24" width="21" height="8.5" rx="4.25" fill="url(#me-e-grad)" />

      {/* E Middle Horizontal Bar */}
      <rect x="63" y="45.75" width="16" height="8.5" rx="4.25" fill="url(#me-e-grad)" />

      {/* E Bottom Horizontal Bar */}
      <rect x="63" y="67.5" width="21" height="8.5" rx="4.25" fill="url(#me-e-grad)" />

      {/* ================= GLASS HIGHLIGHT OVERLAY ================= */}
      <path
        d="M 16,24 H 84 V 44 Q 50 48 16 44 Z"
        fill="url(#me-gloss)"
        opacity="0.4"
      />

      {/* ================= DELICATE DIAMOND SPARKLE ================= */}
      <g transform="translate(85, 18)" filter="url(#me-soft-glow)">
        <path
          d="M 0,-6 Q 0,0 6,0 Q 0,0 0,6 Q 0,0 -6,0 Q 0,0 0,-6 Z"
          fill="#ffffff"
        />
        <circle cx="0" cy="0" r="1.2" fill="#38bdf8" />
      </g>
    </svg>
  );
}

// ============================================================================
// 2. PROJECTS APP — 3D LAYERED CYBER FOLDER & CODE MATRIX
// macOS Big Sur style folder with code preview card & IDE traffic lights
// ============================================================================
export function ProjectsLogo({ size = 32, className, style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        overflow: 'visible',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
        ...style,
      }}
      aria-label="Projects (Code Folder)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Back Folder Flap: Deep Navy to Cobalt */}
        <linearGradient id="proj-back-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Front Folder Flap: Vivid Cyan/Blue Glass */}
        <linearGradient id="proj-front-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        {/* Code Card Background */}
        <linearGradient id="proj-card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>

      {/* 1. Back Folder Flap with Tab */}
      <path
        d="M 18,34 C 18,28.5 22.5,24 28,24 H 42 C 45,24 47.5,25.5 49.5,28 L 53,32 H 78 C 83.5,32 88,36.5 88,42 V 74 C 88,79.5 83.5,84 78,84 H 28 C 22.5,84 18,79.5 18,74 Z"
        fill="url(#proj-back-grad)"
      />

      {/* 2. Emerging Code Card (Inside the Folder) */}
      <rect
        x="26"
        y="18"
        width="48"
        height="38"
        rx="6"
        fill="url(#proj-card-grad)"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
      />
      {/* Code Card Window Header */}
      <rect x="26" y="18" width="48" height="10" rx="6" fill="#cbd5e1" />
      {/* Mini Traffic Lights on Code Card */}
      <circle cx="32" cy="23" r="1.8" fill="#ef4444" />
      <circle cx="37" cy="23" r="1.8" fill="#f59e0b" />
      <circle cx="42" cy="23" r="1.8" fill="#10b981" />

      {/* Code Brackets `< / >` on Card */}
      <path
        d="M 42,35 L 36,40 L 42,45"
        fill="none"
        stroke="#0284c7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="52"
        y1="34"
        x2="48"
        y2="46"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 58,35 L 64,40 L 58,45"
        fill="none"
        stroke="#0284c7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Front Folder Flap (Layered 3D Perspective) */}
      <path
        d="M 14,44 C 14,39 18,35 23,35 H 77 C 82,35 86,39 86,44 L 84,76 C 84,81 80,85 75,85 H 25 C 20,85 16,81 16,76 Z"
        fill="url(#proj-front-grad)"
      />

      {/* Front Flap Highlight Rim */}
      <path
        d="M 16,44 C 16,40 19,37 23,37 H 77 C 81,37 84,40 84,44"
        fill="none"
        stroke="rgba(255, 255, 255, 0.65)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Center Launch Rocket Glyph on Front Cover */}
      <g transform="translate(50, 62)">
        {/* Thrust Flame */}
        <path d="M -3,6 Q 0,14 0,14 Q 0,14 3,6 Z" fill="#fbbf24" />
        <path d="M -1.5,6 Q 0,10 0,10 Q 0,10 1.5,6 Z" fill="#ffffff" />
        {/* Left Fin */}
        <polygon points="-7,5 -3,-1 -3,6" fill="#93c5fd" />
        {/* Right Fin */}
        <polygon points="7,5 3,-1 3,6" fill="#60a5fa" />
        {/* Rocket Body */}
        <path d="M -4,5 C -4,-2 0,-10 0,-10 C 0,-10 4,-2 4,5 Z" fill="#ffffff" />
        {/* Porthole */}
        <circle cx="0" cy="-1" r="1.8" fill="#0284c7" />
      </g>
    </svg>
  );
}

// ============================================================================
// 3. SKILLS APP — CYBER TELEMETRY & ACTIVITY PULSE CORE
// Apple Activity telemetry rings with high-voltage central lightning pulse
// ============================================================================
export function SkillsLogo({ size = 32, className, style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        overflow: 'visible',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
        ...style,
      }}
      aria-label="Skills (Activity Core)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer Ring: Emerald to Mint */}
        <linearGradient id="skill-ring-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        {/* Middle Ring: Cyan to Blue */}
        <linearGradient id="skill-ring-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Inner Ring: Amber to Yellow */}
        <linearGradient id="skill-ring-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        {/* Center Lightning Glow */}
        <linearGradient id="skill-bolt-glow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Dark Outer Lens Base */}
      <circle cx="50" cy="50" r="44" fill="#02140d" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.2" />

      {/* Ring 1 (Outer - Emerald, 80% sweep) */}
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="none"
        stroke="rgba(16, 185, 129, 0.18)"
        strokeWidth="4.5"
      />
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="none"
        stroke="url(#skill-ring-1)"
        strokeWidth="4.5"
        strokeDasharray="185 240"
        strokeDashoffset="35"
        strokeLinecap="round"
      />

      {/* Ring 2 (Middle - Cyan, 65% sweep) */}
      <circle
        cx="50"
        cy="50"
        r="28.5"
        fill="none"
        stroke="rgba(6, 182, 212, 0.18)"
        strokeWidth="4"
      />
      <circle
        cx="50"
        cy="50"
        r="28.5"
        fill="none"
        stroke="url(#skill-ring-2)"
        strokeWidth="4"
        strokeDasharray="125 180"
        strokeDashoffset="15"
        strokeLinecap="round"
      />

      {/* Ring 3 (Inner - Amber, 50% sweep) */}
      <circle
        cx="50"
        cy="50"
        r="20.5"
        fill="none"
        stroke="rgba(245, 158, 11, 0.18)"
        strokeWidth="3.5"
      />
      <circle
        cx="50"
        cy="50"
        r="20.5"
        fill="none"
        stroke="url(#skill-ring-3)"
        strokeWidth="3.5"
        strokeDasharray="75 130"
        strokeDashoffset="-10"
        strokeLinecap="round"
      />

      {/* Central High-Voltage Lightning Glyph */}
      <polygon
        points="52,35 41,50 48,50 45,65 59,48 51,48 55,35"
        fill="url(#skill-bolt-glow)"
        style={{ filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.8))' }}
      />
      <polygon
        points="52,38 43,49 48,49 46,60 56,49 51,49 54,38"
        fill="#ffffff"
      />
    </svg>
  );
}

// ============================================================================
// 4. EXPERIENCE APP — macOS CALENDAR & JOURNEY TIMELINE
// Apple deskpad calendar with crimson binder, date numeral & milestone dots
// ============================================================================
export function ExperienceLogo({ size = 32, className, style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        overflow: 'visible',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
        ...style,
      }}
      aria-label="Experience (Calendar & Timeline)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Crimson Header */}
        <linearGradient id="cal-header-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>

        {/* Paper Pad Background */}
        <linearGradient id="cal-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
      </defs>

      {/* Calendar Base Pad */}
      <rect
        x="15"
        y="18"
        width="70"
        height="66"
        rx="14"
        fill="url(#cal-body-grad)"
      />

      {/* Top Crimson Banner */}
      <path
        d="M 15,32 C 15,24.3 21.3,18 29,18 H 71 C 78.7,18 85,24.3 85,32 V 38 H 15 Z"
        fill="url(#cal-header-grad)"
      />

      {/* Header Month / Label "EXP" */}
      <text
        x="50"
        y="32"
        fill="#ffffff"
        fontSize="11"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        textAnchor="middle"
        letterSpacing="0.08em"
      >
        CAREER
      </text>

      {/* Dual Silver Binder Rings */}
      <rect x="29" y="14" width="7" height="9" rx="3.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
      <rect x="64" y="14" width="7" height="9" rx="3.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />

      {/* Bold Experience "XP" / Milestone Mark in Body */}
      <text
        x="50"
        y="62"
        fill="#0f172a"
        fontSize="22"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        textAnchor="middle"
        letterSpacing="-0.02em"
      >
        EXP
      </text>

      {/* Journey Timeline Line with 3 Milestone Nodes */}
      <line
        x1="28"
        y1="72"
        x2="72"
        y2="72"
        stroke="#cbd5e1"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Node 1 */}
      <circle cx="32" cy="72" r="3.5" fill="#94a3b8" />
      {/* Node 2 */}
      <circle cx="50" cy="72" r="3.5" fill="#3b82f6" />
      {/* Node 3 (Active milestone) */}
      <circle cx="68" cy="72" r="4.5" fill="#10b981" />
      <circle cx="68" cy="72" r="2" fill="#ffffff" />
    </svg>
  );
}

// ============================================================================
// 5. BUILD LOG APP — DEVELOPER JOURNAL & STYLUS
// Golden amber notes ledger with checklist tick & 3D stylus pen
// ============================================================================
export function BuildLogLogo({ size = 32, className, style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        overflow: 'visible',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
        ...style,
      }}
      aria-label="Build Log (Notes Journal)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Warm Golden Leather Gradient */}
        <linearGradient id="log-pad-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Paper Sheet Gradient */}
        <linearGradient id="log-paper-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>

      {/* 1. Leather Note Pad Base */}
      <rect
        x="16"
        y="16"
        width="68"
        height="70"
        rx="12"
        fill="url(#log-pad-grad)"
      />

      {/* 2. Paper Sheet with Folded Corner */}
      <rect
        x="22"
        y="22"
        width="56"
        height="58"
        rx="6"
        fill="url(#log-paper-grad)"
      />

      {/* Perforated Top Header on Paper */}
      <rect x="22" y="22" width="56" height="8" rx="4" fill="#fbbf24" opacity="0.6" />

      {/* Checklist Checkmark */}
      <path
        d="M 30,40 L 33,43 L 39,36"
        fill="none"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Code / Note Text Line 1 */}
      <line x1="44" y1="40" x2="68" y2="40" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />

      {/* Checklist Checkmark 2 */}
      <path
        d="M 30,52 L 33,55 L 39,48"
        fill="none"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Code / Note Text Line 2 */}
      <line x1="44" y1="52" x2="64" y2="52" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />

      {/* Code / Note Text Line 3 */}
      <line x1="30" y1="64" x2="56" y2="64" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />

      {/* 3. Sleek Diagonal Stylus Pen */}
      <g transform="translate(68, 62) rotate(-45)">
        {/* Pen Body */}
        <rect x="-4" y="-22" width="8" height="22" rx="2" fill="#334155" />
        {/* Silver Band */}
        <rect x="-4" y="-2" width="8" height="4" fill="#cbd5e1" />
        {/* Pen Tip Cone */}
        <polygon points="-4,2 4,2 0,9" fill="#f8fafc" />
        {/* Graphite Nib */}
        <polygon points="-1,6 1,6 0,9" fill="#0f172a" />
      </g>
    </svg>
  );
}

// ============================================================================
// 6. LAUNCHPAD / ALL APPS — THE COSMIC WARP SPACECRAFT
// Iconic Apple Big Sur rocket ascending into deep space nebula
// ============================================================================
export function LaunchpadLogo({ size = 32, className, style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        overflow: 'visible',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
        ...style,
      }}
      aria-label="Launchpad (Cosmic Spacecraft)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Galaxy Cosmic Gradient */}
        <linearGradient id="lp-bg-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>

        {/* Rocket Thruster Flame */}
        <linearGradient id="lp-fire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#fde047" />
          <stop offset="70%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* Cosmic Nebula Circle */}
      <circle cx="50" cy="50" r="44" fill="url(#lp-bg-grad)" />

      {/* Distant Cross Stars */}
      <g fill="#ffffff" opacity="0.75">
        {/* Star 1 */}
        <path d="M 28,24 Q 28,27 31,27 Q 28,27 28,30 Q 28,27 25,27 Q 28,27 28,24 Z" />
        {/* Star 2 */}
        <path d="M 74,70 Q 74,73 77,73 Q 74,73 74,76 Q 74,73 71,73 Q 74,73 74,70 Z" />
        {/* Micro Dots */}
        <circle cx="76" cy="28" r="1.5" />
        <circle cx="22" cy="68" r="1.2" />
        <circle cx="48" cy="80" r="1" />
      </g>

      {/* ================= 45-DEGREE ASCENDING ROCKET ================= */}
      <g transform="translate(50, 48) rotate(45)">
        {/* Blazing Thruster Plume Exhaust */}
        <path
          d="M -5,14 Q 0,32 0,32 Q 0,32 5,14 Z"
          fill="url(#lp-fire-grad)"
        />
        <path
          d="M -2.5,14 Q 0,22 0,22 Q 0,22 2.5,14 Z"
          fill="#ffffff"
        />

        {/* Engine Nozzle */}
        <rect x="-4" y="11" width="8" height="4" rx="1.5" fill="#475569" />

        {/* Left Delta Fin */}
        <path
          d="M -7,8 L -16,15 L -6,15 Z"
          fill="#ef4444"
        />
        {/* Right Delta Fin */}
        <path
          d="M 7,8 L 16,15 L 6,15 Z"
          fill="#dc2626"
        />

        {/* Main Aerodynamic Fuselage */}
        {/* Left half (lighter highlight) */}
        <path
          d="M 0,-24 C -8,-10 -7,12 0,12 Z"
          fill="#ffffff"
        />
        {/* Right half (subtle shadow) */}
        <path
          d="M 0,-24 C 8,-10 7,12 0,12 Z"
          fill="#e2e8f0"
        />

        {/* Fuselage Tip Nosecone */}
        <path
          d="M 0,-24 C -4,-18 0,-16 0,-16 C 0,-16 4,-18 0,-24 Z"
          fill="#ef4444"
        />

        {/* Cyan Porthole Window */}
        <circle cx="0" cy="-4" r="4.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.2" />
        <circle cx="-1.2" cy="-5.2" r="1.4" fill="#ffffff" />
      </g>
    </svg>
  );
}
