'use client';

import { useState } from 'react';
import { Search, Folder, FolderOpen, LayoutGrid, List, ChevronRight, ExternalLink, HardDrive, Star, Users, Briefcase, X } from 'lucide-react';
import type { Project } from '@/lib/types';

export default function FilesApp({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = projects.filter(p => (category === 'all' || p.category === category) && `${p.title} ${p.tech_stack.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="native-app finder-app">
    <aside className="native-sidebar finder-sidebar"><p className="eyebrow">Favorites</p>{[{id:'all',label:'All Projects',icon:FolderOpen},{id:'personal',label:'Personal',icon:Star},{id:'professional',label:'Professional',icon:Briefcase},{id:'team',label:'Team',icon:Users}].map(({id,label,icon:Icon}) => <button className={`native-nav ${category === id ? 'selected' : ''}`} key={id} onClick={() => {setCategory(id);setSelected(null);}}><Icon size={16}/>{label}<small>{projects.filter(p => id === 'all' || p.category === id).length}</small></button>)}<p className="eyebrow">Locations</p><div className="native-nav muted"><HardDrive size={16}/> Shouraya&apos;s Mac</div><div className="sidebar-foot">Ideas, shipped & in progress.</div></aside>
    <main className="finder-main"><div className="app-toolbar"><strong>Projects</strong><div className="segmented"><button aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><LayoutGrid size={15}/></button><button aria-label="List view" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={15}/></button></div><label className="app-search"><Search size={14}/><input aria-label="Search projects" placeholder="Search" value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }}/></label></div>
      <div className="finder-breadcrumb"><HardDrive size={13}/> Portfolio <ChevronRight size={12}/> {category === 'all' ? 'All Projects' : category}</div>
      <div className="finder-scroll"><div className={`project-${view}`}>{filtered.map(project => <button key={project.id} className={`project-file ${selected?.id === project.id ? 'selected' : ''}`} onClick={() => setSelected(project)}><Folder className="folder-art" strokeWidth={1} size={64}/><strong>{project.title}</strong><span>{project.tech_stack.slice(0,2).join(' · ')}</span><i className={`file-status status-${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</i></button>)}</div>{!filtered.length && <div className="empty-state"><FolderOpen size={38}/><h3>No projects found</h3><p>Try another search or folder.</p></div>}
      {selected && <section className="project-preview"><button className="preview-close" aria-label="Close project preview" onClick={() => setSelected(null)}><X size={16}/></button><p className="eyebrow">Quick Look · {selected.category}</p><h2>{selected.title}</h2><p>{selected.problem}</p><h4>The outcome</h4><p>{selected.outcome}</p><div className="tag-list">{selected.tech_stack.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-links">{(selected.links?.length ? selected.links : selected.link ? [selected.link] : []).map((link,i) => <a key={link} href={link} target="_blank" rel="noreferrer">{i === 0 ? 'View project' : `Related link ${i + 1}`}<ExternalLink size={13}/></a>)}</div></section>}</div>
      <footer className="finder-status">{filtered.length} {filtered.length === 1 ? 'item' : 'items'}<span>{selected ? `${selected.title} selected` : 'Select a folder to explore'}</span></footer>
    </main>
  </div>;
}

