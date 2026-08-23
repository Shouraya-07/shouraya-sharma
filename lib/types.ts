export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo_url: string | null;
  languages: string[];
  institute: string;
  location: string;
  locations: string[];
  links: { label: string; url: string }[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'personal' | 'professional' | 'team';
  emoji: string;
  problem: string;
  tech_stack: string[];
  status: 'Live' | 'In Dev' | 'Concept';
  outcome: string;
  link: string | null;
  links: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  org: string;
  role: string;
  emoji: string;
  logo_url: string | null;
  color: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SkillSection {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  notes: Note[];
  skills: Skill[];
  skillSections: SkillSection[];
}
