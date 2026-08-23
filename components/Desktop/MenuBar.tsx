'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun, Wifi, Battery } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

function Clock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="menubar-clock">
      {date} &nbsp; {time}
    </span>
  );
}

export default function MenuBar({ activeAppName }: { activeAppName?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="menubar" role="banner">
      <div className="menubar-left">
        <span className="menubar-apple" aria-label="Shivoham Labs">
          <Image src="/logo.png" alt="Shivoham Labs" width={18} height={18} style={{ objectFit: 'contain' }} priority />
        </span>
        <span className="menubar-appname">{activeAppName ?? 'Shouraya Sharma'}</span>
      </div>

      <div className="menubar-right">
        <Wifi size={14} strokeWidth={2} style={{ color: 'var(--text-menubar)', opacity: 0.8 }} />
        <Battery size={16} strokeWidth={2} style={{ color: 'var(--text-menubar)', opacity: 0.8 }} />
        <span style={{ fontSize: 11, color: 'var(--text-menubar)', opacity: 0.85 }}>21%</span>
        <button
          id="theme-toggle"
          className="menubar-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
        </button>
        <Clock />
      </div>
    </header>
  );
}
