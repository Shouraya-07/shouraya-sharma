'use server';

import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/admin-access';
import { revalidatePath } from 'next/cache';
import type { Profile, Project, Experience, Note, Skill } from '@/lib/types';

async function getAdminClient() {
  await requireAdminUser();
  return createServiceRoleClient();
}

// =======================
// PROFILE
// =======================

export async function updateProfile(formData: FormData) {
  const supabase = await getAdminClient();
  
  const id = formData.get('id') as string;
  const updates = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    bio: formData.get('bio') as string,
    institute: formData.get('institute') as string,
    location: formData.get('location') as string,
    locations: (formData.get('locations') as string || formData.get('location') as string || '').split(/\n|,/).map(s => s.trim()).filter(Boolean),
    links: (formData.get('links') as string || '').split('\n').map(s => { const [label, ...url] = s.split('|'); return { label: label.trim(), url: url.join('|').trim() }; }).filter(x => x.label && x.url),
    languages: (formData.get('languages') as string).split(',').map(s => s.trim()).filter(Boolean),
  };

  const { error } = await supabase.from('profile').update(updates).eq('id', id);
  if (error) throw new Error(error.message);
  
  revalidatePath('/');
  return { success: true };
}

// =======================
// PROJECTS
// =======================

export async function upsertProject(formData: FormData) {
  const supabase = await getAdminClient();
  
  const id = formData.get('id') as string | null;
  const data = {
    title: formData.get('title') as string,
    emoji: '',
    problem: formData.get('problem') as string,
    outcome: formData.get('outcome') as string,
    status: formData.get('status') as string,
    link: ((formData.get('links') as string || '').split('\n').map(s => s.trim()).filter(Boolean)[0]) || null,
    links: (formData.get('links') as string || '').split('\n').map(s => s.trim()).filter(Boolean),
    category: formData.get('category') as string || 'personal',
    display_order: parseInt(formData.get('display_order') as string, 10),
    tech_stack: (formData.get('tech_stack') as string).split(',').map(s => s.trim()).filter(Boolean),
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('projects').update(data).eq('id', id));
  } else {
    ({ error } = await supabase.from('projects').insert(data));
  }

  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await getAdminClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

// =======================
// EXPERIENCE
// =======================

export async function upsertExperience(formData: FormData) {
  const supabase = await getAdminClient();
  
  const id = formData.get('id') as string | null;
  const data = {
    org: formData.get('org') as string,
    role: formData.get('role') as string,
    emoji: '',
    logo_url: formData.get('logo_url') as string || null,
    color: formData.get('color') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || null,
    description: formData.get('description') as string || null,
    display_order: parseInt(formData.get('display_order') as string, 10),
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('experience').update(data).eq('id', id));
  } else {
    ({ error } = await supabase.from('experience').insert(data));
  }

  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await getAdminClient();
  const { error } = await supabase.from('experience').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

// =======================
// NOTES
// =======================

export async function upsertNote(formData: FormData) {
  const supabase = await getAdminClient();
  
  const id = formData.get('id') as string | null;
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    image_urls: (formData.get('image_urls') as string || '').split('\n').map(s => s.trim()).filter(Boolean),
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('notes').update(data).eq('id', id));
  } else {
    ({ error } = await supabase.from('notes').insert(data));
  }

  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

export async function deleteNote(id: string) {
  const supabase = await getAdminClient();
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

// =======================
// SKILLS
// =======================

export async function upsertSkill(formData: FormData) {
  const supabase = await getAdminClient();
  
  const id = formData.get('id') as string | null;
  const data = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    proficiency: 0,
    is_cybersec: false,
    display_order: parseInt(formData.get('display_order') as string, 10),
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('skills').update(data).eq('id', id));
  } else {
    ({ error } = await supabase.from('skills').insert(data));
  }

  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

export async function deleteSkill(id: string) {
  const supabase = await getAdminClient();
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { success: true };
}

export async function upsertSkillSection(formData: FormData) {
  const supabase = await getAdminClient();
  const id = formData.get('id') as string | null;
  const data = { name: formData.get('name') as string, display_order: parseInt(formData.get('display_order') as string, 10) || 0 };
  const result = id ? await supabase.from('skill_sections').update(data).eq('id', id) : await supabase.from('skill_sections').insert(data);
  if (result.error) throw new Error(result.error.message);
  revalidatePath('/');
}

export async function deleteSkillSection(id: string) {
  const supabase = await getAdminClient();
  const { error } = await supabase.from('skill_sections').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
}
