'use client';

import React from 'react';
import type { PortfolioData } from '@/lib/types';
import MenuBar from '@/components/Desktop/MenuBar';
import Dock from '@/components/Desktop/Dock';
import Window from '@/components/Desktop/Window';
import SettingsApp from '@/components/apps/SettingsApp';
import FilesApp from '@/components/apps/FilesApp';
import CalendarApp from '@/components/apps/CalendarApp';
import NotesApp from '@/components/apps/NotesApp';
import ActivityMonitorApp from '@/components/apps/ActivityMonitorApp';
import Launchpad from '@/components/apps/Launchpad';
import { useWindowManager } from '@/contexts/WindowManagerContext';

export default function DesktopShell({ data }: { data: PortfolioData }) {
  const { windows } = useWindowManager();
  return (
    <div className="desktop-shell">
      <div className="desktop">
        <MenuBar />
        <div className="desktop-windows-layer">
          <Window id="settings"><SettingsApp profile={data.profile} /></Window>
          <Window id="files"><FilesApp projects={data.projects} /></Window>
          <Window id="calendar"><CalendarApp experience={data.experience} /></Window>
          <Window id="notes"><NotesApp notes={data.notes} /></Window>
          <Window id="activity-monitor"><ActivityMonitorApp skills={data.skills} sections={data.skillSections} /></Window>
        </div>
        {windows.launchpad.isOpen && <Launchpad />}
        <Dock />
      </div>
    </div>
  );
}
