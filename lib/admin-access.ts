import { createServerClient } from '@/lib/supabase/server';

export async function requireAdminUser() {
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  const allowedEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
  if (error || !user || !allowedEmail || user.email?.toLowerCase() !== allowedEmail) throw new Error('Admin authentication required.');
  return user;
}
