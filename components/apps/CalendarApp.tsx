'use client';

import React, { useState } from 'react';
import { CalendarDays, Columns3, List, MapPin } from 'lucide-react';
import type { Experience } from '@/lib/types';

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function CalendarApp({ experience }: { experience: Experience[] }) {
  const [view, setView] = useState<'vertical' | 'horizontal'>('vertical');
  const [selected, setSelected] = useState<Experience | null>(null);
  const sorted = [...experience].sort((a, b) => a.start_date.localeCompare(b.start_date));
  return <div style={{ display: 'flex', height: '100%' }}>
    <aside className="sidebar" style={{ width: 205, flexShrink: 0 }}><p className="sidebar-section-title">Experience</p>{sorted.map(entry => <div key={entry.id} className={`sidebar-item ${selected?.id === entry.id ? 'active' : ''}`} onClick={() => setSelected(selected?.id === entry.id ? null : entry)} role="button" tabIndex={0}><span>{entry.org}</span></div>)}</aside>
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid var(--border-sidebar)', background: 'var(--bg-window-titlebar)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CalendarDays size={16} color="var(--accent)" /><strong style={{ fontSize: 14 }}>Experience Timeline</strong></div><div style={{ display: 'flex', gap: 4 }}><button aria-label="Vertical timeline" onClick={() => setView('vertical')} style={viewButton(view === 'vertical')}><List size={14} /> Vertical</button><button aria-label="Horizontal timeline" onClick={() => setView('horizontal')} style={viewButton(view === 'horizontal')}><Columns3 size={14} /> Horizontal</button></div></header>
      <div style={{ flex: 1, overflow: 'auto', padding: view === 'vertical' ? '24px 34px' : '34px 24px' }}>
        {view === 'vertical' ? <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: '16px 0' }}><div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--divider)', transform: 'translateX(-50%)' }} />{sorted.map((entry, index) => <TimelineEntry key={entry.id} entry={entry} index={index} selected={selected?.id === entry.id} onSelect={() => setSelected(selected?.id === entry.id ? null : entry)} />)}</div> : <div style={{ minWidth: Math.max(sorted.length * 245, 600), position: 'relative', paddingTop: 32 }}><div style={{ position: 'absolute', top: 47, left: 25, right: 25, height: 2, background: 'var(--divider)' }} /><div style={{ display: 'flex', gap: 24 }}>{sorted.map(entry => <div key={entry.id} style={{ width: 220, flexShrink: 0, position: 'relative' }}><div style={{ width: 14, height: 14, borderRadius: '50%', background: entry.color, border: '3px solid var(--bg-window)', boxShadow: `0 0 0 2px ${entry.color}`, margin: '0 auto 18px', position: 'relative', zIndex: 1 }} /><TimelineCard entry={entry} selected={selected?.id === entry.id} onSelect={() => setSelected(selected?.id === entry.id ? null : entry)} /></div>)}</div></div>}
      </div>
    </main>
  </div>;
}

function TimelineEntry({ entry, index, selected, onSelect }: { entry: Experience; index: number; selected: boolean; onSelect: () => void }) {
  const card = <TimelineCard entry={entry} selected={selected} onSelect={onSelect} />;
  const marker = <div style={{ width: 18, height: 18, borderRadius: '50%', background: entry.color, border: '4px solid var(--bg-window)', boxShadow: `0 0 0 2px ${entry.color}`, justifySelf: 'center', position: 'relative', zIndex: 1 }} />;
  return <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 54px minmax(0, 1fr)', alignItems: 'center', gap: 0, paddingBottom: 24 }}><div style={{ paddingRight: 12, textAlign: 'right' }}>{index % 2 === 0 ? card : <TimelineDate entry={entry} align="right" />}</div>{marker}<div style={{ paddingLeft: 12 }}>{index % 2 === 0 ? <TimelineDate entry={entry} align="left" /> : card}</div></div>;
}

function TimelineDate({ entry, align }: { entry: Experience; align: 'left' | 'right' }) {
  return <div style={{ textAlign: align, padding: '10px 4px' }}><div style={{ color: entry.color, fontSize: 23, lineHeight: 1, fontWeight: 800 }}>{new Date(`${entry.start_date}T00:00:00`).getFullYear()}</div><div style={{ color: 'var(--text-primary)', fontSize: 12, fontWeight: 700, marginTop: 5 }}>{entry.org}</div><div style={{ color: 'var(--text-secondary)', fontSize: 11, lineHeight: 1.4, marginTop: 3 }}>{entry.role}</div></div>;
}

function TimelineCard({ entry, selected, onSelect }: { entry: Experience; selected: boolean; onSelect: () => void }) {
  return <article onClick={onSelect} role="button" tabIndex={0} style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${selected ? entry.color : 'var(--border-card)'}`, background: selected ? `${entry.color}18` : 'var(--bg-card)', cursor: 'pointer', transition: 'border var(--transition-fast), background var(--transition-fast)' }}><div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}><div style={{ minWidth: 0, flex: 1 }}><div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13 }}>{entry.org}</div><div style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 3 }}>{entry.role}</div><div style={{ color: entry.color, fontSize: 11, marginTop: 8 }}>{formatDate(entry.start_date)} to {entry.end_date ? formatDate(entry.end_date) : 'Present'}</div>{entry.description && <div style={{ color: 'var(--text-tertiary)', fontSize: 11.5, lineHeight: 1.5, marginTop: 8 }}>{entry.description}</div>}{selected && <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-tertiary)', fontSize: 10.5, marginTop: 10 }}><MapPin size={11} /> Affiliation timeline</div>}</div></div></article>;
}

function viewButton(active: boolean): React.CSSProperties { return { display: 'inline-flex', alignItems: 'center', gap: 5, border: `1px solid ${active ? 'var(--accent)' : 'var(--border-input)'}`, background: active ? 'var(--accent-subtle)' : 'transparent', color: active ? 'var(--accent)' : 'var(--text-secondary)', borderRadius: 6, padding: '5px 8px', fontSize: 11, cursor: 'pointer' }; }
