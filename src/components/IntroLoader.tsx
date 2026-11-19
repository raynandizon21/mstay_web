import React, { useEffect, useRef, useState } from 'react';
import { OmbaraLogo } from './OmbaraLogo.tsx';

interface IntroLoaderProps {
  onDone: () => void;
}

const SEEN_KEY = 'mstay-intro-seen';
const MIN_SHOW = 1700; // logo + line animation length
const MAX_WAIT = 3500; // never hold the page longer than this, even on slow connections
const EXIT_MS = 900; // curtain lift

// Plays once per browser session; skipped entirely for reduced-motion users
const shouldSkip = () => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

// Opening animation: dark screen → logo resolves from blur → progress line → curtain lifts
export const IntroLoader: React.FC<IntroLoaderProps> = ({ onDone }) => {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>(() => (shouldSkip() ? 'done' : 'in'));
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (phase === 'done') {
      document.documentElement.classList.remove('intro-pending');
      doneRef.current();
      return;
    }
    if (phase !== 'in') return;

    document.body.style.overflow = 'hidden';
    const start = performance.now();
    let exitTimer: number | undefined;

    const finish = () => {
      if (exitTimer !== undefined) return;
      const wait = Math.max(0, MIN_SHOW - (performance.now() - start));
      exitTimer = window.setTimeout(() => setPhase('out'), wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const cap = window.setTimeout(finish, MAX_WAIT);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('load', finish);
      window.clearTimeout(cap);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'out') return;
    // Let the page start revealing as the curtain lifts
    doneRef.current();
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* storage unavailable — intro will just play again next visit */
      }
      setPhase('done');
    }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[#0B0B0B] text-white grain flex flex-col items-center justify-center transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'out' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_60%)]" />

      <div
        className={`relative flex flex-col items-center transition-all duration-500 ${
          phase === 'out' ? 'opacity-0 -translate-y-6' : 'opacity-100'
        }`}
      >
        <div className="intro-logo">
          <OmbaraLogo size="lg" inverted />
        </div>

        <div className="intro-line mt-8 h-px w-32 bg-white/15 overflow-hidden">
          <span className="block h-full bg-white" />
        </div>

        <span className="intro-tagline mt-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">
          Clark · Pampanga
        </span>
      </div>
    </div>
  );
};
