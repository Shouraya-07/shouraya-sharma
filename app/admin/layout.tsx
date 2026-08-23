import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight:'100vh', background:'var(--bg-window)', color:'var(--text-primary)' }}>{children}</main>
  );
}
