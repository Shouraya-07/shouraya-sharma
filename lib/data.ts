import type { Experience, Note, PortfolioData, Profile, Project, Skill, SkillSection } from '@/lib/types';
import { createServerClient } from '@/lib/supabase/server';

const now = new Date().toISOString();
const fallback: PortfolioData = {
  profile: { id: 'profile', name: 'Shouraya Sharma', title: 'Developer · Builder · Tech Enthusiast', bio: "I build useful things, explore how systems work, and document the process.", photo_url: null, languages: ['English', 'Hindi', 'Punjabi'], institute: 'MITB', location: 'India', locations: ['India'], links: [], created_at: now, updated_at: now },
  projects: [
    { id: 'memex', title: 'Memex', category: 'personal', emoji: '', problem: 'A personal knowledge system for connecting ideas.', tech_stack: ['Next.js', 'TypeScript', 'Supabase'], status: 'In Dev', outcome: 'A calmer way to learn and retrieve context.', link: null, links: [], display_order: 1, created_at: now, updated_at: now },
    { id: 'dsa-helper', title: 'DSA Helper', category: 'personal', emoji: '', problem: 'Practice data structures with focused feedback.', tech_stack: ['React', 'TypeScript'], status: 'Concept', outcome: 'Turns revision into a repeatable workflow.', link: null, links: [], display_order: 2, created_at: now, updated_at: now },
  ],
  experience: [
    { id: 'acm', org: 'MITB ACM SIG-AI', role: 'Webmaster', emoji: '', logo_url: null, color: '#5b9bff', start_date: '2025-10-01', end_date: null, description: 'Building and maintaining the chapter web presence.', display_order: 1, created_at: now, updated_at: now },
    { id: 'ftb', org: 'FTB · Fire in the Belly', role: 'Technical Product Management Intern', emoji: '', logo_url: null, color: '#ff9f0a', start_date: '2026-05-01', end_date: null, description: 'Working across product, technology, and execution.', display_order: 2, created_at: now, updated_at: now },
  ],
  notes: [{ id: 'welcome', title: 'Welcome to the build log', content: '**Building in public**\n\nThis is where I keep small notes about projects, experiments, and lessons learned.', image_urls: [], created_at: now, updated_at: now }],
  skills: [
    { id: 'typescript', name: 'TypeScript', category: 'Language', display_order: 1, created_at: now, updated_at: now },
    { id: 'nextjs', name: 'Next.js', category: 'Frontend', display_order: 2, created_at: now, updated_at: now },
    { id: 'security', name: 'Web Security', category: 'Architecture & Practices', display_order: 3, created_at: now, updated_at: now },
  ],
  skillSections: ['Language','Frontend','Backend','Databases','DevOps & Tools','ML & Data Science','Libraries & concepts','Architecture & Practices'].map((name, i) => ({ id: name, name, display_order: i + 1, created_at: now, updated_at: now })),
};

export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const supabase = await createServerClient();
    const [profile, projects, experience, notes, skills, skillSections] = await Promise.all([
      supabase.from('profile').select('*').order('created_at').limit(1).maybeSingle(),
      supabase.from('projects').select('*').order('display_order'),
      supabase.from('experience').select('*').order('display_order'),
      supabase.from('notes').select('*').order('created_at', { ascending: false }),
      supabase.from('skills').select('*').order('display_order'),
      supabase.from('skill_sections').select('*').order('display_order'),
    ]);
    if (profile.error || projects.error || experience.error || notes.error || skills.error) throw new Error('Supabase read failed');
    const projectRows = ((projects.data as Project[]) ?? []).map(project => ({ ...project, category: project.category || 'personal' as const, links: project.links ?? (project.link ? [project.link] : []) }));
    const profileRow = profile.data as Profile | null;
    const normalizedProfile = profileRow ? { ...profileRow, locations: profileRow.locations ?? (profileRow.location ? [profileRow.location] : []), links: profileRow.links ?? [] } : fallback.profile;
    return { profile: normalizedProfile, projects: projectRows, experience: ((experience.data as Experience[]) ?? []).map(e => ({ ...e, logo_url: e.logo_url ?? null })), notes: ((notes.data as Note[]) ?? []).map(n => ({ ...n, image_urls: n.image_urls ?? [] })), skills: (skills.data as Skill[]) ?? [], skillSections: (skillSections.data as SkillSection[]) ?? fallback.skillSections };
  } catch {
    return fallback;
  }
}
