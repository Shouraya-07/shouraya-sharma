'use client';

import React, { useState } from 'react';
import { Settings, Folder, Calendar, StickyNote, Activity, Grid3x3, ChevronLeft } from 'lucide-react';
import SettingsApp from '@/components/apps/SettingsApp';
import FilesApp from '@/components/apps/FilesApp';
import CalendarApp from '@/components/apps/CalendarApp';
import NotesApp from '@/components/apps/NotesApp';
import ActivityMonitorApp from '@/components/apps/ActivityMonitorApp';
import Launchpad from '@/components/apps/Launchpad';
import type { PortfolioData } from '@/lib/types';

type AppId = 'settings'|'files'|'calendar'|'notes'|'activity-monitor'|'launchpad';

const MOBILE_APPS = [
  { id: 'settings'          as AppId, label:'About Me',   icon:<Settings size={30} strokeWidth={1.8} color="white"/>,    colorClass:'app-icon-settings' },
  { id: 'files'             as AppId, label:'Projects',   icon:<Folder size={30} strokeWidth={1.8} color="white"/>,      colorClass:'app-icon-files' },
  { id: 'calendar'          as AppId, label:'Experience', icon:<Calendar size={30} strokeWidth={1.8} color="white"/>,    colorClass:'app-icon-calendar' },
  { id: 'notes'             as AppId, label:'Build Log',  icon:<StickyNote size={30} strokeWidth={1.8} color="white"/>, colorClass:'app-icon-notes' },
  { id: 'activity-monitor'  as AppId, label:'Skills',     icon:<Activity size={30} strokeWidth={1.8} color="white"/>,   colorClass:'app-icon-activity' },
  { id: 'launchpad'         as AppId, label:'Social',     icon:<Grid3x3 size={30} strokeWidth={1.8} color="white"/>,    colorClass:'app-icon-launchpad' },
];

const APP_TITLES: Record<AppId, string> = {
  settings:          'System Settings',
  files:             'Finder : Projects',
  calendar:          'Experience Timeline',
  notes:             'Notes : Build Log',
  'activity-monitor':'Activity Monitor',
  launchpad:         'Launchpad',
};

export default function MobileLayout({ data }: { data: PortfolioData }) {
  const [openApp, setOpenApp] = useState<AppId|null>(null);

  function renderApp(id: AppId) {
    switch (id) {
      case 'settings':          return <SettingsApp profile={data.profile}/>;
      case 'files':             return <FilesApp projects={data.projects}/>;
      case 'calendar':          return <CalendarApp experience={data.experience}/>;
      case 'notes':             return <NotesApp notes={data.notes}/>;
      case 'activity-monitor':  return <ActivityMonitorApp skills={data.skills} sections={data.skillSections}/>;
      case 'launchpad':         return <Launchpad/>;
    }
  }

  return (
    <div className="mobile-layout">
      <div className="mobile-topbar">
        <span>Shouraya Sharma</span>
        <span style={{ fontSize:13, fontWeight:400, color:'var(--text-secondary)' }}>
          {new Date().toLocaleTimeString('en-US',{ hour:'numeric', minute:'2-digit' })}
        </span>
      </div>

      <div className="mobile-grid">
        {MOBILE_APPS.map(app=>(
          <div key={app.id} id={`mobile-app-${app.id}`} className="mobile-app-item" role="button" tabIndex={0}
            onClick={()=>setOpenApp(app.id)} onKeyDown={e=>e.key==='Enter'&&setOpenApp(app.id)}>
            <div className={`mobile-app-icon ${app.colorClass}`}>{app.icon}</div>
            <span className="mobile-app-label">{app.label}</span>
          </div>
        ))}
      </div>

      {openApp && (
        <div className="mobile-app-view">
          <div className="mobile-app-header">
            <button id={`mobile-back-${openApp}`} className="mobile-back-btn" onClick={()=>setOpenApp(null)}>
              <ChevronLeft size={16}/> Back
            </button>
            <span className="mobile-app-title">{APP_TITLES[openApp]}</span>
          </div>
          <div className="mobile-app-content">{renderApp(openApp)}</div>
        </div>
      )}
    </div>
  );
}
