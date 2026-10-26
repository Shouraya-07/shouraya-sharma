'use client';

import { useEffect, useRef, useState } from 'react';

export default function BootScreen({ name }: { name: string }) {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animation: Animation | undefined;
    const finish = () => setDone(true);
    const timer = window.setTimeout(() => {
      const target = Array.from(document.querySelectorAll<HTMLElement>('[data-name-anchor]')).find(el => el.getBoundingClientRect().width > 0);
      if (!target || !title.current || reduced) { finish(); return; }
      const from = title.current.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      root.current?.classList.add('boot-departing');
      animation = title.current.animate([
        { transform: 'translate(0, 0) scale(1)', textShadow: '0 6px 0 #53658f, 0 20px 50px #111a40' },
        { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`, textShadow: '0 0 0 transparent' },
      ], { duration: 1100, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
      animation.onfinish = finish;
    }, reduced ? 50 : 2300);
    const fallback = window.setTimeout(finish, 4200);
    return () => { clearTimeout(timer); clearTimeout(fallback); animation?.cancel(); };
  }, []);

  if (done) return null;
  return <div className="boot-screen" ref={root}>
    <div className="boot-atmosphere" />
    <div className="boot-orbit orbit-one" /><div className="boot-orbit orbit-two" />
    <div className="boot-wordmark" ref={title}><span>{name}</span></div>
    <div className="boot-caption" role="status"><span>WELCOME TO MY WORLD</span><div className="boot-track"><i /></div><p>Preparing your desktop</p></div>
    <button className="boot-skip" onClick={() => setDone(true)}>Skip intro ↗</button>
  </div>;
}
