import React from 'react';
import { BedDouble, Flag, Headset, LucideIcon, ShieldCheck, ShoppingBasket } from 'lucide-react';
import { ExperienceItem, asset } from '../data/ombaraData.ts';
import { Reveal } from './Reveal.tsx';

interface OmbaraExperienceProps {
  // kept for compatibility with App.tsx
  onSelectExperience?: (item: ExperienceItem) => void;
}

const STATS = [
  { value: '2022', label: 'Newly opened' },
  { value: '101', label: 'Studio-type rooms' },
  { value: '10 min', label: 'To Clark International Airport' },
  { value: '5 min', label: "To Clark's 3 major golf courses" },
];

interface Highlight {
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  image?: string; // revealed on hover (small cards) / background (feature card)
}

// Translated from the hotel's official Korean introduction
const HIGHLIGHTS: Highlight[] = [
  {
    title: 'A new hotel, opened in 2022',
    tag: 'Since 2022',
    image: asset('mstaybuilding.jpg'),
    description:
      '101 rooms, all spacious studio types — so your stay feels far roomier and more comfortable than a typical hotel.',
    icon: BedDouble,
  },
  {
    title: 'Safe, central location',
    tag: 'Location',
    image: asset('explore-clark/08-clark-airport/1-clark-airport-front.jpg'),
    description:
      'Inside the secure Clark CDC (Clark Development Corporation) zone — 10 minutes to Clark Airport and about 5 minutes to Mimosa, Korea CC and Dongkwang Sun Valley.',
    icon: ShieldCheck,
  },
  {
    title: 'Services tailored for golfers',
    tag: 'Golf',
    image: asset('explore-clark/02-golf/1-golf.jpg'),
    description:
      'Laundry, pick-up & drop-off and breakfast service — plus quality breakfast and meals at "Damso", our in-house Korean restaurant.',
    icon: Flag,
  },
  {
    title: 'Korean market on the ground floor',
    tag: 'Convenience',
    image: asset('KMART.png'),
    description: 'Pick up snacks and everyday essentials downstairs — as convenient as being back home in Korea.',
    icon: ShoppingBasket,
  },
  {
    title: 'Korea & Philippines reservation offices',
    tag: 'Booking support',
    image: asset('mstay_hotel_frontdesk.jpeg'),
    description:
      'Separate local and Korean reservation offices. Our Korean office helps arrange golf, activities, car rentals and more for your Clark trip.',
    icon: Headset,
  },
];

export const OmbaraExperience: React.FC<OmbaraExperienceProps> = () => {
  return (
    <section id="experience" className="py-20 sm:py-32 bg-white text-[#111111] relative" aria-label="About M Stay Hotel">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">01 · About</span>
            <h2 className="font-serif-luxury text-[44px] sm:text-6xl font-medium leading-[0.95] mt-5">
              Why stay at <span className="font-script font-normal text-[#6B6B6B]">M Stay</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-[#6B6B6B] leading-relaxed lg:pb-2">
            A new studio hotel inside Clark Freeport Zone — built around comfort, convenience and the needs of golf
            travelers.
          </p>
        </Reveal>

        {/* Highlights: feature photo card + editorial numbered list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {(() => {
            const [feature, ...rest] = HIGHLIGHTS;
            const FeatureIcon = feature.icon;
            return (
              <>
                <Reveal className="lg:col-span-5">
                  <article className="group relative h-full min-h-[420px] sm:min-h-[460px] rounded-3xl overflow-hidden bg-[#111111] text-white flex flex-col p-7 sm:p-8">
                    {feature.image && (
                      <img
                        src={feature.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-left-top origin-top-left transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    <span className="relative self-start inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em]">
                      <FeatureIcon className="w-3.5 h-3.5" strokeWidth={1.75} />
                      {feature.tag}
                    </span>
                    <div className="relative mt-auto">
                      <div className="flex items-end gap-3">
                        <span className="font-serif-luxury font-medium leading-none text-7xl sm:text-8xl">101</span>
                        <span className="pb-2 text-sm text-white/70 leading-tight">
                          studio-type
                          <br />
                          rooms
                        </span>
                      </div>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium mt-6">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-white/75 leading-relaxed mt-3">{feature.description}</p>
                    </div>
                  </article>
                </Reveal>

                <ol className="lg:col-span-7 flex flex-col border-t border-[#E6E6E6]">
                  {rest.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Reveal as="li" key={item.title} delay={i * 100} className="border-b border-[#E6E6E6]">
                        <div className="group grid grid-cols-[1fr_88px] sm:grid-cols-[1fr_auto] gap-x-4 sm:gap-x-6 py-5 sm:py-6 items-start sm:items-center">
                          <div className="min-w-0">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6B6B]">
                              <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                              {item.tag}
                            </span>
                            <h3 className="font-serif-luxury text-lg sm:text-xl font-medium mt-1.5 transition-transform duration-300 group-hover:translate-x-1">
                              {item.title}
                            </h3>
                            <p className="text-[13px] text-[#6B6B6B] leading-relaxed mt-1.5 max-w-sm">{item.description}</p>
                          </div>
                          <div className="w-[88px] sm:w-56 lg:w-60 aspect-square sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F5F5F5] flex items-center justify-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              />
                            ) : (
                              <Icon className="w-8 h-8 text-[#A3A3A3]" strokeWidth={1.25} />
                            )}
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </ol>
              </>
            );
          })()}
        </div>

        {/* Stats strip */}
        <Reveal className="mt-14 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 border-y border-[#E6E6E6]">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`py-7 sm:py-10 px-2 sm:px-8 ${idx % 2 === 1 ? 'pl-5 sm:pl-8 border-l border-[#E6E6E6]' : ''} ${
                idx === 2 ? 'lg:border-l border-t lg:border-t-0 border-[#E6E6E6]' : ''
              } ${idx === 3 ? 'border-t lg:border-t-0' : ''}`}
            >
              <div className="font-serif-luxury text-[34px] sm:text-5xl font-medium leading-none">{stat.value}</div>
              <div className="text-sm text-[#6B6B6B] mt-2">{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
