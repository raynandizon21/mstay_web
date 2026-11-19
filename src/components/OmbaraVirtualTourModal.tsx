import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { STORY_SLIDES } from '../data/ombaraData.ts';
import { OmbaraLogo } from './OmbaraLogo.tsx';
import { useSwipe } from '../hooks/useSwipe.ts';

interface OmbaraVirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SLIDE_DURATION = 6000;

// Cinematic gallery: blurred backdrop · framed photo + story text · thumbnail filmstrip
export const OmbaraVirtualTourModal: React.FC<OmbaraVirtualTourModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = STORY_SLIDES.length;

  const goTo = useCallback((i: number) => setCurrentIndex(((i % total) + total) % total), [total]);
  const handleNext = useCallback(() => setCurrentIndex((p) => (p + 1) % total), [total]);
  const handlePrev = useCallback(() => setCurrentIndex((p) => (p - 1 + total) % total), [total]);

  const swipe = useSwipe(handleNext, handlePrev);

  // Auto-advance; restarts on every slide change so manual jumps get a full interval
  useEffect(() => {
    if (!isOpen || paused) return;
    const t = setTimeout(handleNext, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [isOpen, paused, currentIndex, handleNext]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen) return null;

  const slide = STORY_SLIDES[currentIndex];
  const words = slide.title.split(' ');
  const lastWord = words.pop();

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#0B0B0B] text-white select-none"
      role="dialog"
      aria-modal="true"
      aria-label="M Stay Virtual Tour"
    >
      {/* Full-screen photo background (crossfade + slow zoom) */}
      {STORY_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt=""
            className={`w-full h-full object-cover ${idx === currentIndex ? 'animate-kenburns' : ''}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 pt-5 sm:pt-7">
        <OmbaraLogo size="sm" inverted />
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
          aria-label="Close tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center" {...swipe}>
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Frameless photo: hairline edge so it melts into the background */}
          <div
            className="lg:col-span-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative rounded-[22px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
              <div className="relative aspect-[16/10] max-h-[58vh] w-full rounded-[22px] overflow-hidden bg-black/20 ring-1 ring-white/20">
                {STORY_SLIDES.map((s, idx) => (
                  <img
                    key={s.id}
                    src={s.image}
                    alt={s.caption}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-out ${
                      idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
                    }`}
                  />
                ))}

              </div>
            </div>
          </div>

          {/* Story text */}
          <div
            key={slide.id}
            className="lg:col-span-4 text-center lg:text-left lg:border-l lg:border-white/25 lg:pl-10 [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          >
            <span className="animate-rise inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
              <span className="w-7 h-px bg-white/60" />
              {slide.tag}
            </span>
            <h3
              className="animate-rise font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1] mt-5"
              style={{ animationDelay: '80ms' }}
            >
              {words.join(' ')} <span className="font-script font-normal text-[#D9D9D9]">{lastWord}</span>
            </h3>
            <p
              className="animate-rise text-sm sm:text-base text-white/75 leading-relaxed mt-5 max-w-md mx-auto lg:mx-0"
              style={{ animationDelay: '160ms' }}
            >
              {slide.caption}
            </p>

            {/* Prev / next — quiet line arrows beside the story */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 [text-shadow:none]">
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
                Prev
              </button>
              <span className="w-px h-4 bg-white/25" />
              <button
                onClick={handleNext}
                aria-label="Next"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                Next
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filmstrip */}
      <div className="relative z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8 pt-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar justify-start lg:justify-center">
            {STORY_SLIDES.map((s, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(idx)}
                  aria-label={`Show ${s.title}`}
                  aria-current={active}
                  className={`group relative shrink-0 w-24 sm:w-28 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    active ? 'ring-2 ring-white ring-offset-2 ring-offset-black/40' : 'opacity-45 hover:opacity-90'
                  }`}
                >
                  <div className="aspect-[16/10]">
                    <img src={s.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  {/* Time-left fill on the active thumb */}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
                      <span
                        key={`${currentIndex}-${paused}`}
                        className="block h-full bg-white animate-fill"
                        style={{
                          animationDuration: `${SLIDE_DURATION}ms`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
