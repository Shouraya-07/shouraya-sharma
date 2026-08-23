'use client';

import React from 'react';
import { Activity, CalendarDays, Folder, Grid3X3, Settings, StickyNote } from 'lucide-react';
import { useWindowManager, type AppId } from '@/contexts/WindowManagerContext';

const APPS: { id: AppId; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'settings', label: 'About Me', icon: <Settings size={25} />, color: 'app-icon-settings' },
  { id: 'files', label: 'Projects', icon: <Folder size={25} />, color: 'app-icon-files' },
  { id: 'calendar', label: 'Experience', icon: <CalendarDays size={25} />, color: 'app-icon-calendar' },
  { id: 'notes', label: 'Build Log', icon: <StickyNote size={25} />, color: 'app-icon-notes' },
  { id: 'activity-monitor', label: 'Skills', icon: <Activity size={25} />, color: 'app-icon-activity' },
  { id: 'launchpad', label: 'All Apps', icon: <Grid3X3 size={25} />, color: 'app-icon-launchpad' },
];

export default function Dock() {
  const { windows, openWindow } = useWindowManager();
  return <nav className="dock-wrapper" aria-label="Application dock"><div className="dock">
    {APPS.map(app => <React.Fragment key={app.id}>{app.id === 'launchpad' && <div className="dock-separator" aria-hidden="true" />}<div className="dock-icon-wrapper" role="button" tabIndex={0} onClick={() => openWindow(app.id)} onKeyDown={e => e.key === 'Enter' && openWindow(app.id)}>
      <span className="dock-tooltip">{app.label}</span>
      <div className="dock-icon"><div className={`dock-icon-inner ${app.color}`}>{app.icon}</div></div>
      {windows[app.id]?.isOpen && <span className="dock-dot" />}
    </div></React.Fragment>)}
  </div></nav>;
}
