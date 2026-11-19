import { useRef } from 'react';
import type React from 'react';

// Horizontal swipe detection for touch sliders. Swipe left → onNext, swipe right → onPrev.
// Mostly-vertical gestures are ignored so page scrolling still works.
export function useSwipe(onNext: () => void, onPrev: () => void, threshold = 40) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) onNext();
      else onPrev();
    },
  };
}
