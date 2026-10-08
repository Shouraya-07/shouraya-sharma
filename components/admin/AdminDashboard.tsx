'use client';

import React, { useState, useTransition } from 'react';
import type { PortfolioData, Project, Experience, Note, Skill } from '@/lib/types';
import { User, Folder, Calendar, StickyNote, Activity, Trash2, Edit2, Plus } from 'lucide-react';
import { 
  updateProfile, upsertProject, deleteProject, 
  upsertExperience, deleteExperience, upsertNote, 
  deleteNote, upsertSkill, deleteSkill 
  , upsertSkillSection, deleteSkillSection
} from '@/app/admin/crud';

type Tab = 'profile' | 'projects' | 'experience' | 'notes' | 'skills';

export default function AdminDashboard({ initialData }: { initialData: PortfolioData }) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: 220, flexShrink: 0, borderRight: '1px solid var(--border-sidebar)', overflowY: 'auto' }}>
        <p className="sidebar-section-title" style={{ marginTop: 16 }}>Content</p>
        {[
          { id: 'profile' as Tab,    label: 'Profile',    icon: <User size={14} /> },
          { id: 'projects' as Tab,   label: 'Projects',   icon: <Folder size={14} /> },
          { id: 'experience' as Tab, label: 'Experience', icon: <Calendar size={14} /> },
          { id: 'notes' as Tab,      label: 'Notes',      icon: <StickyNote size={14} /> },
          { id: 'skills' as Tab,     label: 'Skills',     icon: <Activity size={14} /> },
        ].map(item => (
          <div
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            role="button"
            tabIndex={0}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, minWidth: 0, minHeight: 0, overflowY: 'auto', padding: '24px 32px' }}>
        {activeTab === 'profile' && <ProfileForm profile={initialData.profile} />}
        {activeTab === 'projects' && <ProjectsManager projects={initialData.projects} />}
        {activeTab === 'experience' && <ExperienceManager experience={initialData.experience} />}
        {activeTab === 'notes' && <NotesManager notes={initialData.notes} />}
        {activeTab === 'skills' && <SkillsManager skills={initialData.skills} sections={initialData.skillSections} />}
      </main>
    </div>
  );
}

// ==========================================
// PROFILE FORM
// ==========================================
function ProfileForm({ profile }: { profile: PortfolioData['profile'] }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateProfile(formData);
      alert('Profile updated');
    });
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 20, marginBottom: 20, fontWeight: 600 }}>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input type="hidden" name="id" value={profile?.id || ''} />
        
        <label style={labelStyle}>
          Name
          <input type="text" name="name" defaultValue={profile?.name} style={inputStyle} required />
        </label>
        
        <label style={labelStyle}>
          Title
          <input type="text" name="title" defaultValue={profile?.title} style={inputStyle} required />
        </label>
        
        <label style={labelStyle}>
          Bio
          <textarea name="bio" defaultValue={profile?.bio} style={{ ...inputStyle, minHeight: 100 }} required />
        </label>
        
        <label style={labelStyle}>
          Institute
          <input type="text" name="institute" defaultValue={profile?.institute} style={inputStyle} required />
        </label>
        
        <label style={labelStyle}>
          Location
          <input type="text" name="location" defaultValue={profile?.location} style={inputStyle} required />
        </label>
        
        <label style={labelStyle}>
          Languages (comma separated)
          <input type="text" name="languages" defaultValue={profile?.languages.join(', ')} style={inputStyle} required />
        </label>
        <label style={labelStyle}>Locations (one per line)<textarea name="locations" defaultValue={(profile?.locations || [profile?.location]).join('\n')} style={{ ...inputStyle, minHeight:70 }} /></label>
        <label style={labelStyle}>Links (one per line, Label|URL)<textarea name="links" defaultValue={(profile?.links || []).map(link => `${link.label}|${link.url}`).join('\n')} style={{ ...inputStyle, minHeight:70 }} /></label>

        <button type="submit" disabled={isPending} style={btnStyle}>
          {isPending ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

// ==========================================
// PROJECTS MANAGER
// ==========================================
const PROJECT_SECTIONS: { key: string; label: string }[] = [
  { key: 'personal',     label: 'Personal Projects' },
  { key: 'professional', label: 'Professional Projects' },
  { key: 'team',         label: 'Team Projects' },
];

function ProjectsManager({ projects }: { projects: Project[] }) {
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [isPending, startTransition] = useTransition();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await upsertProject(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure?')) return;
    startTransition(async () => {
      await deleteProject(id);
    });
  };

  const editingItem = editingId === 'new' ? null : projects.find(p => p.id === editingId);

  const toggleSection = (key: string) =>
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Projects</h2>
        <button onClick={() => setEditingId('new')} style={btnStyle}><Plus size={14} /> Add New</button>
      </div>

      {editingId && (
        <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 8, marginBottom: 20, border: '1px solid var(--border-card)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: 'var(--text-secondary)' }}>
            {editingItem ? `Editing: ${editingItem.title}` : 'New Project'}
          </h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="hidden" name="id" value={editingItem?.id || ''} />

            <label style={{ ...labelStyle, flex: 1 }}>Title <input name="title" defaultValue={editingItem?.title} style={inputStyle} required /></label>

            <label style={labelStyle}>
              Problem
              <span style={{ fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: 6 }}>(optional)</span>
              <input name="problem" defaultValue={editingItem?.problem} style={inputStyle} />
            </label>

            <label style={labelStyle}>
              Outcome
              <span style={{ fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: 6 }}>(optional)</span>
              <input name="outcome" defaultValue={editingItem?.outcome} style={inputStyle} />
            </label>

            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ ...labelStyle, flex: 1 }}>Section
                <select name="category" defaultValue={editingItem?.category || 'personal'} style={inputStyle}>
                  {PROJECT_SECTIONS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </label>
              <label style={{ ...labelStyle, flex: 1 }}>Status
                <select name="status" defaultValue={editingItem?.status || 'In Dev'} style={inputStyle}>
                  <option value="Live">Live</option>
                  <option value="In Dev">In Dev</option>
                  <option value="Concept">Concept</option>
                </select>
              </label>
              <label style={{ ...labelStyle, flex: 1 }}>Display Order
                <input type="number" name="display_order" defaultValue={editingItem?.display_order ?? 0} style={inputStyle} required />
              </label>
            </div>

            <label style={labelStyle}>
              Tech Stack (comma separated)
              <span style={{ fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: 6 }}>(optional)</span>
              <input name="tech_stack" defaultValue={editingItem?.tech_stack?.join(', ')} style={inputStyle} />
            </label>

            <label style={labelStyle}>Links (one URL per line)
              <textarea name="links" defaultValue={(editingItem?.links || (editingItem?.link ? [editingItem.link] : [])).join('\n')} style={{ ...inputStyle, minHeight: 70 }} />
            </label>

            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" disabled={isPending} style={btnStyle}>Save</button>
              <button type="button" onClick={() => setEditingId(null)} style={{ ...btnStyle, background: 'var(--bg-input)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Grouped by section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PROJECT_SECTIONS.map(section => {
          const sectionProjects = projects
            .filter(p => (p.category || 'personal') === section.key)
            .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
          const isCollapsed = collapsed[section.key];

          return (
            <div key={section.key}>
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.key)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: 'var(--bg-titlebar, var(--bg-card))',
                  borderRadius: 6,
                  border: '1px solid var(--border-card)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  marginBottom: isCollapsed ? 0 : 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {section.label}
                  </span>
                  <span style={{
                    fontSize: 11, padding: '1px 7px', borderRadius: 99,
                    background: 'var(--accent)', color: '#fff', fontWeight: 600
                  }}>
                    {sectionProjects.length}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{isCollapsed ? '▶ expand' : '▼ collapse'}</span>
              </div>

              {!isCollapsed && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sectionProjects.length === 0 ? (
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', padding: '10px 14px' }}>No projects in this section.</div>
                  ) : (
                    sectionProjects.map(p => (
                      <div key={p.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 16px', background: 'var(--bg-card)', borderRadius: 7,
                        border: '1px solid var(--border-card)'
                      }}>
                        <div>
                          <strong style={{ fontSize: 13 }}>{p.title}</strong>
                          <span style={{ fontSize: 11, marginLeft: 10, color: 'var(--text-tertiary)' }}>
                            Order: {p.display_order} · {p.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setEditingId(p.id)} style={iconBtnStyle}><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete(p.id)} style={{ ...iconBtnStyle, color: '#ff5f57' }}><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// EXPERIENCE MANAGER
// ==========================================
function ExperienceManager({ experience }: { experience: Experience[] }) {
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await upsertExperience(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure?')) return;
    startTransition(async () => {
      await deleteExperience(id);
    });
  };

  const editingItem = editingId === 'new' ? null : experience.find(ex => ex.id === editingId);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Experience</h2>
        <button onClick={() => setEditingId('new')} style={btnStyle}><Plus size={14} /> Add New</button>
      </div>

      {editingId && (
        <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 8, marginBottom: 20, border: '1px solid var(--border-card)' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="hidden" name="id" value={editingItem?.id || ''} />
            
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ ...labelStyle, flex: 1 }}>Org <input name="org" defaultValue={editingItem?.org} style={inputStyle} required/></label>
              <label style={{ ...labelStyle, flex: 1 }}>Role <input name="role" defaultValue={editingItem?.role} style={inputStyle} required/></label>
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ ...labelStyle, flex: 1 }}>Start Date <input type="date" name="start_date" defaultValue={editingItem?.start_date} style={inputStyle} required/></label>
              <label style={{ ...labelStyle, flex: 1 }}>End Date (leave empty if present) <input type="date" name="end_date" defaultValue={editingItem?.end_date || ''} style={inputStyle}/></label>
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ ...labelStyle, flex: 1 }}>Logo URL <input name="logo_url" type="url" defaultValue={editingItem?.logo_url || ''} style={inputStyle} placeholder="Cloudinary URL" /><input type="file" accept="image/*" style={{ ...inputStyle, marginTop:6 }} title="Drag an image here; upload it to Cloudinary and paste the URL above" /></label>
              <label style={{ ...labelStyle, width: 100 }}>Color (Hex) <input name="color" type="color" defaultValue={editingItem?.color || '#5b9bff'} style={{...inputStyle, padding: 0, height: 38}} required/></label>
              <label style={{ ...labelStyle, flex: 1 }}>Display Order <input type="number" name="display_order" defaultValue={editingItem?.display_order || 0} style={inputStyle} required/></label>
            </div>
            
            <label style={labelStyle}>Description (optional) <textarea name="description" defaultValue={editingItem?.description || ''} style={{ ...inputStyle, minHeight: 60 }}/></label>
            
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" disabled={isPending} style={btnStyle}>Save</button>
              <button type="button" onClick={() => setEditingId(null)} style={{ ...btnStyle, background: 'var(--bg-input)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {experience.map(ex => (
          <div key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-card)' }}>
            <div>
              {ex.logo_url && <img src={ex.logo_url} alt="" style={{ width:28, height:28, objectFit:'contain', borderRadius:6, marginRight:10 }} />}<strong>{ex.org}</strong> : <span style={{ color: 'var(--text-secondary)' }}>{ex.role}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditingId(ex.id)} style={iconBtnStyle}><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(ex.id)} style={{ ...iconBtnStyle, color: '#ff5f57' }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// NOTES MANAGER
// ==========================================
function NotesManager({ notes }: { notes: Note[] }) {
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await upsertNote(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure?')) return;
    startTransition(async () => {
      await deleteNote(id);
    });
  };

  const editingItem = editingId === 'new' ? null : notes.find(n => n.id === editingId);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Notes</h2>
        <button onClick={() => setEditingId('new')} style={btnStyle}><Plus size={14} /> Add New</button>
      </div>

      {editingId && (
        <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 8, marginBottom: 20, border: '1px solid var(--border-card)' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="hidden" name="id" value={editingItem?.id || ''} />
            
            <label style={labelStyle}>Title <input name="title" defaultValue={editingItem?.title} style={inputStyle} required/></label>
            <label style={labelStyle}>Content (Markdown supported) <textarea name="content" defaultValue={editingItem?.content} style={{ ...inputStyle, minHeight: 200 }} required/></label>
            <label style={labelStyle}>Image URLs (one per line)<textarea name="image_urls" defaultValue={(editingItem?.image_urls || []).join('\n')} style={{ ...inputStyle, minHeight:70 }} placeholder="Paste Cloudinary or public image URLs" /></label>
            
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" disabled={isPending} style={btnStyle}>Save</button>
              <button type="button" onClick={() => setEditingId(null)} style={{ ...btnStyle, background: 'var(--bg-input)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notes.map(n => (
          <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-card)' }}>
            <div>
              <strong>{n.title}</strong>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{new Date(n.created_at).toLocaleDateString()}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditingId(n.id)} style={iconBtnStyle}><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(n.id)} style={{ ...iconBtnStyle, color: '#ff5f57' }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// SKILLS MANAGER
// ==========================================
function SkillsManager({ skills, sections }: { skills: Skill[]; sections: PortfolioData['skillSections'] }) {
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await upsertSkill(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure?')) return;
    startTransition(async () => {
      await deleteSkill(id);
    });
  };

  const editingItem = editingId === 'new' ? null : skills.find(s => s.id === editingId);
  const [sectionName, setSectionName] = useState('');
  const [sectionOrder, setSectionOrder] = useState(1);
  const saveSection = () => { if (!sectionName.trim()) return; startTransition(async () => { const form = new FormData(); if (editingSectionId) form.set('id', editingSectionId); form.set('name', sectionName); form.set('display_order', String(sectionOrder)); await upsertSkillSection(form); setSectionName(''); setSectionOrder(1); setEditingSectionId(null); }); };
  const editSection = (id: string) => { const section = sections.find(item => item.id === id); if (!section) return; setEditingSectionId(id); setSectionName(section.name); setSectionOrder(section.display_order); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Skills</h2>
        <button onClick={() => setEditingId('new')} style={btnStyle}><Plus size={14} /> Add Skill</button>
      </div>

      {editingId && (
        <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 8, marginBottom: 20, border: '1px solid var(--border-card)' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="hidden" name="id" value={editingItem?.id || ''} />
            
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ ...labelStyle, flex: 1 }}>Skill name <input name="name" defaultValue={editingItem?.name} style={inputStyle} placeholder="e.g. TypeScript" required/></label>
              <label style={{ ...labelStyle, flex: 1 }}>Section <select name="category" defaultValue={editingItem?.category || sections[0]?.name} style={inputStyle} required>{sections.map(section => <option key={section.id} value={section.name}>{section.name}</option>)}</select></label>
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ ...labelStyle, flex: 1 }}>Display Order <input type="number" name="display_order" defaultValue={editingItem?.display_order || 0} style={inputStyle} required/></label>
            </div>
            
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" disabled={isPending} style={btnStyle}>Save</button>
              <button type="button" onClick={() => setEditingId(null)} style={{ ...btnStyle, background: 'var(--bg-input)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {skills.map(s => (
          <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <strong style={{ width: 140 }}>{s.name}</strong>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 100 }}>{s.category}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditingId(s.id)} style={iconBtnStyle}><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(s.id)} style={{ ...iconBtnStyle, color: '#ff5f57' }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:32, paddingTop:22, borderTop:'1px solid var(--divider)' }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}><div><h3 style={{ fontSize:15, marginBottom:3 }}>Skill Sections</h3><p style={{ fontSize:12, color:'var(--text-tertiary)' }}>Create, rename, or remove the categories used by each skill.</p></div>{editingSectionId && <button type="button" onClick={()=>{ setEditingSectionId(null); setSectionName(''); setSectionOrder(1); }} style={{ ...btnStyle, background:'var(--bg-input)', color:'var(--text-primary)' }}>Cancel edit</button>}</div><div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}><input value={sectionName} onChange={e=>setSectionName(e.target.value)} placeholder={editingSectionId ? 'Rename section' : 'New section name'} style={{ ...inputStyle, flex:1, minWidth:180 }} /><input aria-label="Section order" type="number" value={sectionOrder} onChange={e=>setSectionOrder(Number(e.target.value))} style={{ ...inputStyle, width:90 }} /><button onClick={saveSection} disabled={isPending || !sectionName.trim()} style={btnStyle}>{editingSectionId ? 'Save Section' : 'Add Section'}</button></div>{sections.map(section=><div key={section.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', borderBottom:'1px solid var(--divider)' }}><span>{section.display_order}. {section.name}</span><div style={{ display:'flex', gap:4 }}><button aria-label={`Edit ${section.name}`} onClick={()=>editSection(section.id)} style={iconBtnStyle}><Edit2 size={14}/></button><button aria-label={`Delete ${section.name}`} onClick={()=>startTransition(async()=>await deleteSkillSection(section.id))} style={{ ...iconBtnStyle, color:'#ff5f57' }}><Trash2 size={14}/></button></div></div>)}</div>
    </div>
  );
}

// ==========================================
// SHARED STYLES
// ==========================================
const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-secondary)'
};

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-input)',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 12px',
  fontSize: 13,
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'inherit'
};

const btnStyle: React.CSSProperties = {
  background: 'var(--accent)',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 600,
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6
};

const iconBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4
};
