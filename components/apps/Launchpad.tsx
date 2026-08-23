'use client';

import React from 'react';
import { X } from 'lucide-react';
import { SiGithub, SiGmail, SiInstagram } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { useWindowManager } from '@/contexts/WindowManagerContext';

const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    icon: <SiGithub size={42} color="white" />,
    href: 'https://github.com/Shouraya-07',
    bg: 'linear-gradient(145deg, #24292e, #1a1e24)',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedinIn size={42} color="white" />,
    href: 'https://www.linkedin.com/in/shouraya-sharma/',
    bg: 'linear-gradient(145deg, #0a66c2, #0052a3)',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <SiInstagram size={42} color="white" />,
    href: 'https://www.instagram.com/shouraya_sharma_07/',
    bg: 'linear-gradient(145deg, #e1306c, #833ab4)',
  },
  {
    id: 'mail',
    label: 'Gmail',
    icon: <SiGmail size={42} color="white" />,
    href: 'mailto:shourayasharma27@gmail.com',
    bg: 'linear-gradient(145deg, #4db8ff, #007aff)',
  },
  {
    id: 'shivoham-labs',
    label: 'Shivoham Labs',
    icon: <img src="/logo.png" alt="" width={52} height={52} style={{ objectFit: 'contain' }} />,
    href: 'https://shivoham-lab.vercel.app/',
    bg: 'white',
  },
];

export default function Launchpad() {
  const { closeWindow } = useWindowManager();

  return (
    <div
      className="launchpad-overlay"
      onClick={() => closeWindow('launchpad')}
      id="launchpad-overlay"
      role="dialog"
      aria-label="Launchpad · Social Links"
    >
      {/* Close button */}
      <button
        id="launchpad-close"
        onClick={() => closeWindow('launchpad')}
        style={{
          position: 'absolute',
          top: 48,
          right: 48,
          background: 'rgba(255,255,255,0.12)',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          transition: 'background var(--transition-fast)',
        }}
        aria-label="Close Launchpad"
      >
        <X size={16} />
      </button>

      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: 'white',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          letterSpacing: '-0.02em',
        }}
      >
        Find me online
      </h1>

      <div
        className="launchpad-grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '36px 52px' }}
        onClick={e => e.stopPropagation()}
      >
        {SOCIAL_LINKS.map(link => (
          <a
            key={link.id}
            id={`launchpad-link-${link.id}`}
            href={link.href}
            target={link.href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="launchpad-item"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="launchpad-icon"
              style={{ background: link.bg, fontSize: 40, width: 90, height: 90, borderRadius: 20 }}
            >
              {link.icon}
            </div>
            <span className="launchpad-label">{link.label}</span>
          </a>
        ))}
      </div>

      <p className="launchpad-close-hint">Click anywhere outside to close</p>
    </div>
  );
}
