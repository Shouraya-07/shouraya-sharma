'use client';

import React, { useState } from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import type { Project } from '@/lib/types';

export default function FilesApp({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(projects[0] ?? null);
  const groups = [['personal', 'Personal Projects'], ['professional', 'Professional Projects'], ['team', 'Team Projects']] as const;
  return <div style={{ display: 'flex', height: '100%' }}><aside className="sidebar" style={{ width: 230, overflowY: 'auto' }}><p className="sidebar-section-title">Projects</p>{groups.map(([category, label]) => <React.Fragment key={category}><p style={{ padding: '12px 14px 5px', color: 'var(--text-tertiary)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>{projects.filter(project => project.category === category).map(project => <div key={project.id} className={`sidebar-item ${selected?.id === project.id ? 'active' : ''}`} onClick={() => setSelected(project)} role="button" tabIndex={0}><Folder size={14} />{project.title}</div>)}</React.Fragment>)}</aside><main style={{ flex: 1, padding: 26, overflow: 'auto' }}>{selected ? <><h2 style={{ fontSize: 24 }}>{selected.title}</h2><span className={`status-badge status-${selected.status.toLowerCase().replace(' ', '-')}`}>{selected.status}</span><p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: '20px 0 12px' }}>{selected.problem}</p><p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{selected.outcome}</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>{selected.tech_stack.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>{selected.links?.length > 0 && <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:22 }}>{selected.links.map(link => <a key={link} href={link} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--text-accent)' }}>Open link <ExternalLink size={14}/></a>)}</div>}</> : <div style={{ color: 'var(--text-tertiary)' }}>No projects found.</div>}</main></div>;
}
