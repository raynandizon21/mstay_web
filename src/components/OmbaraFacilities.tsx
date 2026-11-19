import React, { useEffect, useRef, useState } from 'react';
import { FACILITIES_DATA } from '../data/ombaraData.ts';
import { Reveal } from './Reveal.tsx';

const SLIDE_DURATION = 2000; // 2 seconds per facility

export const OmbaraFacilities: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(FACILITIES_DATA[0].id);

  // Slideshow: auto-advance to the next facility every 2 seconds, looping back to the first
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTabId((prevId) => {
        const index = FACILITIES_DATA.findIndex((f) => f.id === prevId);
        return FACILITIES_DATA[(index + 1) % FACILITIES_DATA.length].id;
      });
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [activeTabId]);

  // On phones the tabs are a horizontal scroller: keep the active one in view (never scrolls the page)
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = tabsRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const idx = FACILITIES_DATA.findIndex((f) => f.id === activeTabId);
    const tab = rail.children[idx] as HTMLElement | undefined;
    if (tab) rail.scrollTo({ left: tab.offsetLeft - rail.clientWidth / 2 + tab.clientWidth / 2, behavior: 'smooth' });
  }, [activeTabId]);

  const currentTab = FACILITIES_DATA.find((f) => f.id === activeTabId) || FACILITIES_DATA[0];

  return (
    <section
      id="facilities"
      className="py-20 sm:py-32 bg-[#F5F5F5] text-[#111111] relative"
      aria-label="Main Stay Facilities"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: stacked images crossfade (all rendered so switching is instant) */}
          <Reveal className="lg:col-span-7 relative pb-12 sm:pb-20">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#E6E6E6]">
              {FACILITIES_DATA.map((tab) => (
                <img
                  key={tab.id}
                  src={tab.mainImage}
                  alt={tab.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                    tab.id === activeTabId ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  referrerPolicy="no-referrer"
                />
              ))}
              <span className="absolute top-5 left-5 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold">
                {currentTab.title}
              </span>
            </div>

            {/* Overlapping inset card */}
            <div className="absolute bottom-0 right-4 sm:right-8 w-1/2 sm:w-[45%] rounded-2xl overflow-hidden bg-white p-2 shadow-luxury-card">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#E6E6E6]">
                {FACILITIES_DATA.map((tab) => (
                  <img
                    key={tab.id}
                    src={tab.insetImage}
                    alt={tab.insetCaption}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      tab.id === activeTabId ? 'opacity-100' : 'opacity-0'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="px-2 pt-2.5 pb-1 text-[11px] text-[#6B6B6B] truncate">{currentTab.insetCaption}</p>
            </div>
          </Reveal>

          {/* Right: narrative + tabs */}
          <Reveal delay={120} className="lg:col-span-5 flex flex-col order-first lg:order-none min-w-0">
            <span className="eyebrow">03 · Facilities</span>
            <h2 className="font-serif-luxury text-[44px] sm:text-6xl font-medium leading-[0.95] mt-5">
              Everything <span className="font-script font-normal text-[#6B6B6B]">on-site</span>
            </h2>

            {/* Pill tabs with 1s progress fill */}
            <div
              ref={tabsRef}
              className="relative mt-8 sm:mt-10 -mx-6 px-6 sm:mx-0 sm:px-0 flex sm:flex-wrap gap-2 overflow-x-auto no-scrollbar"
            >
              {FACILITIES_DATA.map((tab) => {
                const active = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`relative shrink-0 whitespace-nowrap overflow-hidden rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#111111] text-white'
                        : 'bg-white text-[#6B6B6B] hover:text-[#111111] border border-[#E6E6E6]'
                    }`}
                  >
                    <span className="relative z-10">{tab.title}</span>
                    {active && (
                      <span
                        key={`fill-${activeTabId}`}
                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/60 animate-fill"
                        style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-8 min-h-[150px]">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium">{currentTab.title}</h3>
              <p className="text-base text-[#6B6B6B] leading-relaxed mt-3">{currentTab.description}</p>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#A3A3A3] font-mono">
              <span className="text-[#111111]">
                {String(FACILITIES_DATA.findIndex((f) => f.id === activeTabId) + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-10 bg-[#D9D9D9]" />
              <span>{String(FACILITIES_DATA.length).padStart(2, '0')}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
