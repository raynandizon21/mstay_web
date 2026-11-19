import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, HeroSlide } from '../data/ombaraData.ts';
import { useSwipe } from '../hooks/useSwipe.ts';

interface OmbaraHeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
  // false while the intro loader covers the page; the headline animates in once it turns true
  ready?: boolean;
}

const SLIDE_DURATION = 6500; // 6.5s per slide

export const OmbaraHero: React.FC<OmbaraHeroProps> = ({ onRegisterClick, onExploreClick, ready = true }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Restart the timer whenever the slide changes (manual or automatic)
  useEffect(() => {
    const timer = setTimeout(handleNext, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [handleNext, currentSlideIndex]);

  const swipe = useSwipe(handleNext, handlePrev);

  const currentSlide: HeroSlide = HERO_SLIDES[currentSlideIndex];

  // Last word of the headline gets the italic serif accent
  const words = currentSlide.headline.split(' ');
  const lastWord = words.pop();

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1100px] overflow-hidden select-none bg-[#111111] grain"
      aria-label="Main Stay Hotel"
      {...swipe}
    >
      {/* Background slides */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            key={idx === currentSlideIndex ? `active-${currentSlideIndex}` : slide.id}
            src={slide.image}
            alt={slide.headline}
            className={`w-full h-full object-cover object-center grayscale-[25%] ${
              idx === currentSlideIndex ? 'animate-kenburns' : ''
            }`}
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-end pb-24 sm:pb-32">
        <div
          key={`${currentSlide.id}-${ready}`}
          className={`max-w-3xl text-white ${ready ? '' : 'invisible'}`}
        >
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {currentSlide.cursiveTitle}
          </div>

          <h1
            className="animate-rise font-serif-luxury text-[46px] sm:text-7xl lg:text-[88px] font-medium leading-[0.95] mt-5 sm:mt-6 break-words"
            style={{ animationDelay: '80ms' }}
          >
            {words.join(' ')}{' '}
            <span className="font-script font-normal text-[#D9D9D9]">{lastWord}</span>
          </h1>

          <p
            className="animate-rise text-[15px] sm:text-lg text-white/75 font-light max-w-xl leading-relaxed mt-5 sm:mt-6"
            style={{ animationDelay: '160ms' }}
          >
            {currentSlide.subtitle}
          </p>

          <div
            className="animate-rise flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mt-8 sm:mt-9"
            style={{ animationDelay: '240ms' }}
          >
            <button
              onClick={onRegisterClick}
              className="group inline-flex items-center justify-between sm:justify-start gap-3 pl-6 pr-2 py-2 rounded-full bg-white text-[#111111] text-sm font-semibold hover:bg-[#F2F2F2] transition-colors cursor-pointer"
            >
              Book Your Stay
              <span className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center justify-center gap-2 px-6 py-[15px] rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
            >
              Explore the Hotel
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar: tags + slide controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex items-center justify-between gap-6 text-white">
          <div className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase text-white/60">
            {currentSlide.tags.map((tag, idx) => (
              <span key={tag} className="flex items-center gap-6">
                {tag}
                {idx < currentSlide.tags.length - 1 && <span className="w-1 h-1 rounded-full bg-white/40" />}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5 w-full md:w-auto">
            {/* Segmented progress indicators */}
            <div className="flex items-center gap-2 flex-1 md:flex-none">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className="relative h-[3px] flex-1 md:w-14 md:flex-none rounded-full bg-white/20 overflow-hidden cursor-pointer"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx < currentSlideIndex && <span className="absolute inset-0 bg-white/70" />}
                  {idx === currentSlideIndex && (
                    <span
                      key={`fill-${currentSlideIndex}`}
                      className="absolute inset-0 bg-white animate-fill"
                      style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="font-mono text-xs text-white/70 tabular-nums">{currentSlide.number}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
