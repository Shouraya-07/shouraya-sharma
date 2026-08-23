'use client';

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function sendMagicLink(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setError('');
    if (email.trim().toLowerCase() !== (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase()) {
      setError('That email is not authorized for this admin panel.'); setBusy(false); return;
    }
    const { error: authError } = await createClient().auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth/callback` } });
    if (authError) setError(authError.message); else setSent(true);
    setBusy(false);
  }

  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 28, background: 'var(--bg-window)' }}>
    <div style={{ width: 72, height: 72, borderRadius: 18, display: 'grid', placeItems: 'center', background: 'linear-gradient(145deg, #4d8dff, #3158c8)', marginBottom: 22 }}><Mail size={32} color="white" /></div>
    <h2 style={{ fontSize: 20, marginBottom: 8 }}>Admin Control Panel</h2>
    {sent ? <p style={{ maxWidth: 340, textAlign: 'center', lineHeight: 1.6, color: 'var(--text-secondary)' }}>Check your email for a secure sign-in link. It can only be used once.</p> : <><p style={{ maxWidth: 340, textAlign: 'center', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 24 }}>Sign in without a password using a Supabase magic link.</p><form onSubmit={sendMagicLink} style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 14 }}><label style={labelStyle}>Admin email<input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" required style={inputStyle} /></label>{error && <p style={{ color: '#ff5f57', fontSize: 13, textAlign: 'center' }}>{error}</p>}<button type="submit" disabled={busy} style={buttonStyle}><Send size={15} />{busy ? 'Sending…' : 'Send magic link'}</button></form></>}
  </div>;
}

const labelStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 };
const inputStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-input)', borderRadius: 6, padding: '10px 14px', fontSize: 14, color: 'var(--text-primary)', outline: 'none' };
const buttonStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7, background: 'var(--accent)', border: 0, borderRadius: 6, padding: 12, color: 'white', fontWeight: 600, cursor: 'pointer' };
