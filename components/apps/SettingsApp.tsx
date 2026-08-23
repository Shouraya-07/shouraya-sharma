'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Cpu, Info, MapPin, UserRound } from 'lucide-react';
import type { Profile } from '@/lib/types';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsApp({ profile }: { profile: Profile }) {
  const [section, setSection] = useState('Profile');
  const { theme, setTheme } = useTheme();
  const sections = [['Profile', <UserRound size={14} key="profile" />], ['Device Info', <Info size={14} key="device-info" />]] as const;
  const locations = profile.locations?.length ? profile.locations : [profile.location];
  return <div style={{ display: 'flex', height: '100%' }}>
    <aside className="sidebar" style={{ width: 190 }}><p className="sidebar-section-title">About Me</p>{sections.map(([name, icon]) => <div key={name} className={`sidebar-item ${section === name ? 'active' : ''}`} onClick={() => setSection(name)} role="button" tabIndex={0}>{icon}{name}</div>)}</aside>
    <main style={{ flex: 1, padding: '30px 38px', overflow: 'auto' }}>
      {section === 'Profile' && <div style={{ maxWidth: 650 }}><div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}><Image src="/Shouraya.jpeg" alt={profile.name} width={76} height={76} style={{ width: 76, height: 76, borderRadius: 22, objectFit: 'cover' }} priority /><div><h2 style={{ fontSize: 22 }}>{profile.name}</h2><p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{profile.title}</p></div></div><p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{profile.bio}</p><div style={{ marginTop: 24 }}><h3 style={{ fontSize: 13, marginBottom: 10, color: 'var(--text-secondary)' }}>Languages</h3><div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{profile.languages.map(language => <span className="tag" key={language}>{language}</span>)}</div></div><div style={{ marginTop: 24 }}><h3 style={{ display:'flex', alignItems:'center', gap:6, fontSize: 13, marginBottom: 10, color: 'var(--text-secondary)' }}><MapPin size={14}/> Locations</h3><div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>{locations.map(location => <span className="tag" key={location}>{location}</span>)}</div></div>{profile.links?.length > 0 && <div style={{ marginTop:24 }}><h3 style={{ fontSize:13, marginBottom:10, color:'var(--text-secondary)' }}>Links</h3><div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>{profile.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer" style={{ color:'var(--text-accent)' }}>{link.label}</a>)}</div></div>}</div>}
      {section === 'Device Info' && <><h2 style={{ fontSize: 20, marginBottom: 18 }}>Device Info</h2><div style={{ display: 'grid', gap: 14, color: 'var(--text-secondary)' }}><div><strong style={{ color: 'var(--text-primary)' }}>Operating System</strong><br />Shivoham OS 1.0</div><div><strong style={{ color: 'var(--text-primary)' }}>Tech Stack</strong><br /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6 }}><Cpu size={14} /> Next.js · React · TypeScript · Supabase</span></div><div><strong style={{ color: 'var(--text-primary)' }}>Institute</strong><br />{profile.institute}</div><div><strong style={{ color: 'var(--text-primary)' }}>Locations</strong><br />{locations.join(' · ')}</div><div><strong style={{ color: 'var(--text-primary)' }}>Appearance</strong><br /><select value={theme} onChange={e => setTheme(e.target.value as 'dark' | 'light')} style={{ marginTop: 6, background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-input)', padding: 7, borderRadius: 6 }}><option value="dark">Dark</option><option value="light">Light</option></select></div></div></>}
    </main>
  </div>;
}
