import React, { useId } from 'react';

interface LogoProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/** Shared squircle, soft lighting, and consistent optical bounds across every app. */
function AppIcon({ size = 32, className, style, label, colors, children }: LogoProps & {
  label: string;
  colors: [string, string];
  children: React.ReactNode;
}) {
  const id = useId();
  return <svg width={size} height={size} viewBox="0 0 64 64" className={className} style={{ display: 'block', ...style }} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id={id} x1="0" y1="0" x2="0.3" y2="1"><stop stopColor={colors[0]}/><stop offset="1" stopColor={colors[1]}/></linearGradient></defs>
    <rect x="2" y="3" width="60" height="60" rx="14" fill="#101828" opacity=".16"/>
    <rect x="2" y="1" width="60" height="60" rx="14" fill={`url(#${id})`}/>
    {children}
    <rect x="2.5" y="1.5" width="59" height="59" rx="13.5" fill="none" stroke="#fff" strokeOpacity=".3"/>
  </svg>;
}

export function AboutMeLogo(props: LogoProps) {
  return <AppIcon {...props} label="About Me · Settings" colors={['#e1e6ed', '#9aa6b8']}>
    <g fill="#546174" transform="translate(32 31)">
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x="-4" y="-22" width="8" height="12" rx="2" transform={`rotate(${i * 45})`}/>)}
      <circle r="17"/><circle r="11.5" fill="#dbe2eb"/><circle r="7" fill="#6a788b"/>
      <circle r="18.5" fill="none" stroke="#f5f7fa" strokeWidth="1" strokeOpacity=".6"/>
    </g>
  </AppIcon>;
}

export function ProjectsLogo(props: LogoProps) {
  return <AppIcon {...props} label="Projects · Finder" colors={['#6ac9ff', '#3189e9']}>
    <path d="M33 1h15a14 14 0 0 1 14 14v32a14 14 0 0 1-14 14H32c-2-10-2-19 2-28h-9c1-11 4-22 8-32Z" fill="#e1f2ff"/>
    <path d="M33 7c-4 8-6 16-7 25h9c-4 8-4 17-2 23" fill="none" stroke="#235e9a" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M18 23v5m28-5v5" stroke="#183957" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M17 39c8 8 22 8 30-1" fill="none" stroke="#183957" strokeWidth="2" strokeLinecap="round"/>
  </AppIcon>;
}

export function ExperienceLogo(props: LogoProps) {
  return <AppIcon {...props} label="Experience · Calendar" colors={['#fff', '#e9edf3']}>
    <path d="M2 15A14 14 0 0 1 16 1h32a14 14 0 0 1 14 14v7H2Z" fill="#f16464"/>
    <path d="M19 8v7m26-7v7" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9"/>
    <g fill="#8793a3"><rect x="15" y="29" width="7" height="6" rx="1.5"/><rect x="28" y="29" width="7" height="6" rx="1.5"/><rect x="41" y="29" width="7" height="6" rx="1.5"/><rect x="15" y="42" width="7" height="6" rx="1.5"/><rect x="28" y="42" width="7" height="6" rx="1.5"/></g>
    <circle cx="45" cy="45" r="7" fill="#f16464"/><path d="m42 45 2 2 4-4" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </AppIcon>;
}

export function BuildLogLogo(props: LogoProps) {
  return <AppIcon {...props} label="Build Log · Notes" colors={['#fffefa', '#f1eee5']}>
    <path d="M2 15A14 14 0 0 1 16 1h32a14 14 0 0 1 14 14v7H2Z" fill="#f3ca52"/>
    <path d="M3 22h58" stroke="#c4a44d" strokeOpacity=".4"/>
    <path d="M14 32h36M14 41h36M14 50h25" fill="none" stroke="#c5c2b9" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 24v31" stroke="#e2a1a1" strokeWidth="1" strokeOpacity=".45"/>
  </AppIcon>;
}

export function SkillsLogo(props: LogoProps) {
  return <AppIcon {...props} label="Skills · System Information" colors={['#8bcac3', '#408c91']}>
    <g stroke="#e3f8f3" strokeWidth="2.2" strokeLinecap="round">
      {[22,32,42].map(n => <React.Fragment key={n}><path d={`M${n} 11v7m0 26v7M11 ${n}h7m26 0h7`}/></React.Fragment>)}
      <rect x="18" y="17" width="28" height="28" rx="6" fill="#326c76"/>
      <rect x="25" y="24" width="14" height="14" rx="2" fill="#ceeae5" stroke="none"/>
    </g>
  </AppIcon>;
}

export function LaunchpadLogo(props: LogoProps) {
  const colors = ['#f18d88', '#edc766', '#80bd9a', '#79b7e5', '#9d9ade', '#d49abe', '#78bfba', '#a5b6d1', '#a89bc6'];
  return <AppIcon {...props} label="Launchpad · Social Links" colors={['#f0f2f7', '#c3cad8']}>
    {colors.map((color,i) => <rect key={color} x={13 + i % 3 * 14} y={12 + Math.floor(i / 3) * 14} width="10" height="10" rx="3" fill={color}/>)}
  </AppIcon>;
}
