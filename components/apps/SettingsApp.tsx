'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserRound, Monitor, Palette, ChevronRight, Globe, GraduationCap, MapPin } from 'lucide-react';
import type { Profile } from '@/lib/types';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsApp({ profile }: { profile: Profile }) {
  const [section, setSection] = useState('Profile');
  const { theme, setTheme } = useTheme();
  const locations = profile.locations?.length ? profile.locations : [profile.location];
  return <div className="native-app settings-app">
    <aside className="native-sidebar settings-sidebar">
      <div className="settings-account"><Image src="/Shouraya.jpeg" alt="" width={42} height={42} /><div><strong>{profile.name}</strong><small>Personal profile</small></div></div>
      <p className="eyebrow">System Settings</p>
      {([["Profile", UserRound], ["Appearance", Palette], ["Device Info", Monitor]] as const).map(([label, Icon]) => <button key={label} className={`native-nav ${section === label ? 'selected' : ''}`} onClick={() => setSection(label)}><span className={`setting-icon icon-${label.split(' ')[0].toLowerCase()}`}><Icon size={15}/></span>{label}<ChevronRight size={12}/></button>)}
      <div className="sidebar-foot">Shivoham OS <span>1.0</span></div>
    </aside>
    <main className="settings-main">
      <h2>{section === 'Profile' ? 'About Me' : section}</h2>
      {section === 'Profile' && <>
        <div className="profile-hero"><Image src="/Shouraya.jpeg" alt={profile.name} width={84} height={84} priority/><h3>{profile.name}</h3><p>{profile.title}</p></div>
        <p className="eyebrow">A little introduction</p><div className="settings-group bio-panel">{profile.bio}</div>
        <p className="eyebrow">Personal information</p><div className="settings-group">
          <div className="setting-row"><Globe size={17}/><span>Languages</span><strong>{profile.languages.join(', ')}</strong></div>
          <div className="setting-row"><MapPin size={17}/><span>Based in</span><strong>{locations.join(' · ')}</strong></div>
        </div>
        <p className="eyebrow">Education</p><div className="settings-group education-list">{profile.education.map(item => <article className="education-item" key={item.institution}><span className="education-icon"><GraduationCap size={18}/></span><div className="education-copy"><h3 className="education-school">{item.institution}</h3><p className="education-degree">{item.qualification}</p><div className="education-meta"><span>{item.period}</span>{item.result && <span className="education-result">{item.result}</span>}</div></div></article>)}</div>
      </>}
      {section === 'Appearance' && <><p className="muted">Make this desktop feel like yours.</p><div className="appearance-options">{(['light', 'dark'] as const).map(mode => <button key={mode} aria-pressed={theme === mode} className={`appearance-option ${theme === mode ? 'chosen' : ''}`} onClick={() => setTheme(mode)}><div className={`appearance-preview ${mode}`}><i/><span/><b/></div>{mode === 'light' ? 'Light' : 'Dark'}<span className="radio-dot"/></button>)}</div><div className="settings-group"><div className="setting-row"><Palette size={17}/><span>Accent color</span><strong className="accent-swatch">Blue</strong></div></div></>}
      {section === 'Device Info' && <><div className="system-device"><Monitor size={70} strokeWidth={1}/><h3>Shivoham OS</h3><p>Personal portfolio · Version 1.0</p></div><div className="settings-group">{[['Built with', 'Next.js · React'], ['Language', 'TypeScript'], ['Data', 'Supabase'], ['Designed for', 'Curious minds']].map(([label, value]) => <div className="setting-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></>}
    </main>
  </div>;
}
