import React from 'react';
import { fetchPortfolioData } from '@/lib/data';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { logoutAction } from './actions';

export default async function AdminPage() {
  const data = await fetchPortfolioData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-window)' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '12px 20px', 
        borderBottom: '1px solid var(--border-sidebar)',
        background: 'var(--bg-window-titlebar)'
      }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>Admin Control Panel</div>
        <form action={logoutAction}>
          <button type="submit" style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-input)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 10px',
            fontSize: 12,
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}>
            Logout
          </button>
        </form>
      </div>
      
      <div style={{ height: 'calc(100vh - 58px)', minHeight: 0, overflow: 'hidden' }}>
        <AdminDashboard initialData={data} />
      </div>
    </div>
  );
}
