'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BuildLogLogo } from '@/components/icons/AppLogos';
import type { Note } from '@/lib/types';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**'))
      return <h2 key={i} style={{ fontSize:17, fontWeight:700, color:'var(--text-primary)', marginBottom:12 }}>{line.slice(2,-2)}</h2>;
    if (line.startsWith('- '))
      return <li key={i} style={{ fontSize:13.5, color:'var(--text-secondary)', lineHeight:1.7, marginLeft:16 }}>{line.slice(2)}</li>;
    if (!line.trim())
      return <br key={i}/>;
    const parts = line.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return (
      <p key={i} style={{ fontSize:13.5, color:'var(--text-secondary)', lineHeight:1.7 }}>
        {parts.map((part, j) => {
          if (part.startsWith('`') && part.endsWith('`'))
            return <code key={j} style={{ background:'rgba(128,128,128,0.2)', padding:'1px 5px', borderRadius:4, fontSize:12.5, fontFamily:'monospace', color:'var(--text-accent)' }}>{part.slice(1,-1)}</code>;
          if (part.startsWith('**') && part.endsWith('**'))
            return <strong key={j} style={{ color:'var(--text-primary)', fontWeight:600 }}>{part.slice(2,-2)}</strong>;
          return part;
        })}
      </p>
    );
  });
}

export default function NotesApp({ notes }: { notes: Note[] }) {
  const [selected, setSelected] = useState<Note | null>(notes[0] ?? null);
  const [search, setSearch]     = useState('');

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:'flex', height:'100%' }}>
      {/* Sidebar */}
      <aside style={{ width:220, flexShrink:0, background:'var(--bg-sidebar)', borderRight:'1px solid var(--border-sidebar)', display:'flex', flexDirection:'column' }}>
        <p className="sidebar-section-title" style={{ display:'flex', alignItems:'center', gap:6, padding:'14px 14px 6px' }}>
          <BuildLogLogo size={14} /> Build Log
        </p>
        <div style={{ padding:'4px 10px 8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'var(--bg-input)', border:'1px solid var(--border-input)', borderRadius:'var(--radius-sm)', padding:'5px 10px' }}>
            <Search size={12} style={{ color:'var(--text-tertiary)', flexShrink:0 }}/>
            <input id="notes-search" placeholder="Search notes..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ background:'transparent', border:'none', outline:'none', fontSize:12.5, color:'var(--text-primary)', width:'100%' }}/>
          </div>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'4px 8px' }}>
          {filtered.map(note=>(
            <div key={note.id} id={`note-item-${note.id}`} role="button" tabIndex={0} onClick={()=>setSelected(note)}
              style={{ padding:'10px', borderRadius:'var(--radius-sm)', cursor:'pointer', background: selected?.id===note.id ? 'var(--accent-subtle)' : 'transparent', border:`1px solid ${selected?.id===note.id ? 'rgba(91,155,255,0.2)' : 'transparent'}`, marginBottom:2, transition:'background var(--transition-fast)' }}>
              <div style={{ fontSize:12.5, fontWeight:600, color:'var(--text-primary)', marginBottom:3, lineHeight:1.3 }}>{note.title}</div>
              <div style={{ fontSize:11, color:'var(--text-tertiary)', marginBottom:4 }}>{formatDate(note.created_at)}</div>
              <div style={{ fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.4, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                {note.content.replace(/\*\*/g,'').split('\n').filter(Boolean)[1] ?? ''}
              </div>
            </div>
          ))}
        </div>

      </aside>

      {/* Content */}
      <div style={{ flex:1, padding:'28px 36px', overflowY:'auto', background:'var(--bg-window)' }}>
        {selected ? (
          <div style={{ maxWidth:680 }}>
            <div style={{ fontSize:11.5, color:'var(--text-tertiary)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:'var(--status-indev)', width:8, height:8, borderRadius:'50%', display:'inline-block' }}/>
              Visitor Notes · {formatDate(selected.created_at)}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
              {renderContent(selected.content)}
              {selected.image_urls?.length > 0 && <div style={{ display:'grid', gap:12, marginTop:20 }}>{selected.image_urls.map(url => <img key={url} src={url} alt="" style={{ maxWidth:'100%', borderRadius:10, border:'1px solid var(--divider)' }} />)}</div>}
            </div>
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'var(--text-tertiary)', fontSize:14 }}>
            No notes found
          </div>
        )}
      </div>
    </div>
  );
}
