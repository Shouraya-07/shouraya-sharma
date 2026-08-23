'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { type AppId, useWindowManager } from '@/contexts/WindowManagerContext';

interface WindowProps {
  id: AppId;
  children: React.ReactNode;
  onFocus?: () => void;
}

const MIN_WIDTH = 400;
const MIN_HEIGHT = 280;

export default function Window({ id, children, onFocus }: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPos,
    updateWindowSize,
  } = useWindowManager();

  const win = windows[id];
  const [isOpening, setIsOpening] = useState(false);
  const prevOpen = useRef(false);

  // Trigger open animation when window becomes open
  useEffect(() => {
    if (win.isOpen && !prevOpen.current) {
      setIsOpening(true);
      const t = setTimeout(() => setIsOpening(false), 260);
      prevOpen.current = true;
      return () => clearTimeout(t);
    }
    if (!win.isOpen) prevOpen.current = false;
  }, [win.isOpen]);

  // ── Drag ─────────────────────────────────────────────────────────
  const dragState = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);

  const onTitleBarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('.traffic-light')) return;
      if (win.isMaximized) return;
      bringToFront(id);
      onFocus?.();
      dragState.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y };
      e.preventDefault();
    },
    [win, bringToFront, id, onFocus]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      updateWindowPos(id, dragState.current.winX + dx, dragState.current.winY + dy);
    };
    const onMouseUp = () => { dragState.current = null; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [id, updateWindowPos]);

  // ── Resize ────────────────────────────────────────────────────────
  const resizeState = useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    dir: 'right' | 'bottom' | 'corner';
  } | null>(null);

  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent, dir: 'right' | 'bottom' | 'corner') => {
      e.preventDefault();
      e.stopPropagation();
      resizeState.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: win.width,
        startH: win.height,
        dir,
      };
    },
    [win]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!resizeState.current) return;
      const { startX, startY, startW, startH, dir } = resizeState.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const newW = dir !== 'bottom' ? Math.max(MIN_WIDTH, startW + dx) : startW;
      const newH = dir !== 'right' ? Math.max(MIN_HEIGHT, startH + dy) : startH;
      updateWindowSize(id, newW, newH);
    };
    const onMouseUp = () => { resizeState.current = null; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [id, updateWindowSize]);

  if (!win.isOpen) return null;

  const style: React.CSSProperties = win.isMaximized
    ? {}
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  const classes = [
    'window',
    isOpening ? 'window-opening' : '',
    win.isMaximized ? 'is-maximized' : '',
    win.isMinimized ? 'is-minimized' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={style}
      role="dialog"
      aria-label={win.title}
      onMouseDown={() => { bringToFront(id); onFocus?.(); }}
      id={`window-${id}`}
    >
      {/* Title Bar */}
      <div className="window-titlebar" onMouseDown={onTitleBarMouseDown}>
        <div className="traffic-lights">
          <button
            className="traffic-light red"
            aria-label="Close window"
            id={`btn-close-${id}`}
            onClick={e => { e.stopPropagation(); closeWindow(id); }}
          >
            <span className="traffic-light-icon">✕</span>
          </button>
          <button
            className="traffic-light yellow"
            aria-label="Minimize window"
            id={`btn-minimize-${id}`}
            onClick={e => { e.stopPropagation(); minimizeWindow(id); }}
          >
            <span className="traffic-light-icon">−</span>
          </button>
          <button
            className="traffic-light green"
            aria-label="Maximize window"
            id={`btn-maximize-${id}`}
            onClick={e => { e.stopPropagation(); maximizeWindow(id); }}
          >
            <span className="traffic-light-icon">+</span>
          </button>
        </div>
        <span className="window-title">{win.title}</span>
      </div>

      {/* Content */}
      <div className="window-content">{children}</div>

      {/* Resize handles */}
      {!win.isMaximized && (
        <>
          <div className="resize-handle right"  onMouseDown={e => onResizeMouseDown(e, 'right')} />
          <div className="resize-handle bottom" onMouseDown={e => onResizeMouseDown(e, 'bottom')} />
          <div className="resize-handle corner" onMouseDown={e => onResizeMouseDown(e, 'corner')} />
        </>
      )}
    </div>
  );
}
