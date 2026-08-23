'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

export type AppId =
  | 'settings'
  | 'files'
  | 'calendar'
  | 'notes'
  | 'activity-monitor'
  | 'launchpad';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WindowManagerContextValue {
  windows: Record<AppId, WindowState>;
  topZ: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  updateWindowPos: (id: AppId, x: number, y: number) => void;
  updateWindowSize: (id: AppId, w: number, h: number) => void;
}

const DEFAULT_WINDOWS: Record<AppId, Omit<WindowState, 'zIndex'>> = {
  settings: {
    id: 'settings',
    title: 'System Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    x: 80,
    y: 60,
    width: 720,
    height: 500,
  },
  files: {
    id: 'files',
    title: 'Finder : Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    x: 120,
    y: 80,
    width: 820,
    height: 560,
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar : Experience',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    x: 160,
    y: 100,
    width: 760,
    height: 540,
  },
  notes: {
    id: 'notes',
    title: 'Notes : Build Log',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    x: 200,
    y: 80,
    width: 680,
    height: 500,
  },
  'activity-monitor': {
    id: 'activity-monitor',
    title: 'Activity Monitor : Skills',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    x: 100,
    y: 70,
    width: 780,
    height: 540,
  },
  launchpad: {
    id: 'launchpad',
    title: 'Launchpad',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    x: 0,
    y: 0,
    width: 100, // fullscreen overlay, dimensions don't matter
    height: 100,
  },
};

function buildInitialWindows(): Record<AppId, WindowState> {
  const result = {} as Record<AppId, WindowState>;
  for (const [id, win] of Object.entries(DEFAULT_WINDOWS)) {
    result[id as AppId] = { ...win, zIndex: 10 };
  }
  return result;
}

const WindowManagerContext = createContext<WindowManagerContextValue>({
  windows: buildInitialWindows(),
  topZ: 10,
  openWindow: () => {},
  closeWindow: () => {},
  minimizeWindow: () => {},
  maximizeWindow: () => {},
  bringToFront: () => {},
  updateWindowPos: () => {},
  updateWindowSize: () => {},
});

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(buildInitialWindows);
  const zRef = useRef(10);

  const nextZ = useCallback(() => {
    zRef.current += 1;
    return zRef.current;
  }, []);

  const openWindow = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ(),
      },
    }));
  }, [nextZ]);

  const closeWindow = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
  }, []);

  const maximizeWindow = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized, zIndex: nextZ() },
    }));
  }, [nextZ]);

  const bringToFront = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ() },
    }));
  }, [nextZ]);

  const updateWindowPos = useCallback((id: AppId, x: number, y: number) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], x, y } }));
  }, []);

  const updateWindowSize = useCallback((id: AppId, w: number, h: number) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], width: w, height: h } }));
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        topZ: zRef.current,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        bringToFront,
        updateWindowPos,
        updateWindowSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  return useContext(WindowManagerContext);
}
