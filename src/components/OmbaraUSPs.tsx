import React, { useEffect, useRef, useState } from 'react';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Dices,
  Flag,
  Landmark,
  MapPin,
  LucideIcon,
  Mountain,
  PartyPopper,
  PawPrint,
  Plane,
  ShoppingBag,
  Trees,
  Trophy,
  Waves,
} from 'lucide-react';
import { Reveal } from './Reveal.tsx';

// Images live in src/assets/images/explore-clark/<NN-place>/ (see README.txt there).
// Every image in a folder becomes its own slide (sorted A–Z); empty folders are skipped.
const FOLDER_IMAGES = import.meta.glob<string>(
  '../assets/images/explore-clark/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
);

const imagesIn = (folder: string): string[] =>
  Object.keys(FOLDER_IMAGES)
    .filter((path) => path.includes(`/explore-clark/${folder}/`))
    .sort()
    .map((path) => FOLDER_IMAGES[path]);

const SLIDE_DURATION = 2000; // 2 seconds per slide

interface ClarkPlace {
  id: string;
  title: string;
  description: string;
  folder: string; // folder name inside src/assets/images/explore-clark/
  category: string; // short label shown on the floating info card
  icon: LucideIcon;
  location?: string; // defaults to Clark Freeport Zone · Pampanga
}

// Slide order follows this list (keep it in the same order as the folder numbers)
const CLARK_PLACES: ClarkPlace[] = [
  {
    id: 'gaming',
    title: 'Gaming & Entertainment',
    description: 'Integrated resorts like Hann Casino Resort make Clark a round-the-clock gaming and entertainment destination.',
    folder: '01-casino-resorts',
    category: 'Casino & Resorts',
    icon: Dices,
  },
  {
    id: 'golf',
    title: 'Mimosa Plus Golf Course',
    description: "Tee off at one of Clark's premier golf courses, set near the foothills of Mount Pinatubo.",
    folder: '02-golf',
    category: 'Golf',
    icon: Flag,
  },
  {
    id: 'waterpark',
    title: 'Aqua Planet',
    description: 'Slides, wave pools and splash zones — a full day of fun for the whole family.',
    folder: '03-aqua-planet',
    category: 'Water Park',
    icon: Waves,
  },
  {
    id: 'festivals',
    title: 'Festivals & Events',
    description: 'The Hot Air Balloon Fiesta, the Aurora Music Festival and more bring crowds to Clark all year round.',
    folder: '04-hot-air-balloon',
    category: 'Festivals',
    icon: PartyPopper,
  },
  {
    id: 'family',
    title: 'Clark Parade Grounds',
    description: 'Wide open lawns for family picnics, morning jogs, kite flying and weekend gatherings.',
    folder: '05-parade-grounds',
    category: 'Family & Parks',
    icon: Trees,
  },
  {
    id: 'adventure',
    title: 'Mount Pinatubo',
    description: 'A classic day trip from Clark: 4x4 rides and a trek to the turquoise crater lake.',
    folder: '06-mount-pinatubo',
    category: 'Adventure',
    icon: Mountain,
    location: 'Capas, Tarlac · day trip from Clark',
  },
  {
    id: 'sports',
    title: 'New Clark City',
    description: 'A world-class athletics stadium and sports complex — host venue of the 2019 SEA Games.',
    folder: '07-new-clark-city',
    category: 'Sports',
    icon: Trophy,
    location: 'Capas, Tarlac',
  },
  {
    id: 'aviation',
    title: 'Clark International Airport',
    description: "Central Luzon's gateway — a modern passenger terminal with growing domestic and international routes.",
    folder: '08-clark-airport',
    category: 'Aviation',
    icon: Plane,
  },
  {
    id: 'business',
    title: 'Clark Global City',
    description: 'A fast-growing hub for BPO, logistics and MICE — meetings, conferences and exhibitions.',
    folder: '09-clark-global-city',
    category: 'Business & BPO',
    icon: Building2,
  },
  {
    id: 'shopping',
    title: 'SM City Clark',
    description: 'Malls, restaurants and the famous Kapampangan food scene — the culinary capital is right here.',
    folder: '10-sm-city-clark',
    category: 'Shopping & Dining',
    icon: ShoppingBag,
  },
  {
    id: 'safari',
    title: 'Clark Safari & Adventure Park',
    description: 'Get up close with wildlife and enjoy adventure activities the whole family will love.',
    folder: '11-clark-safari',
    category: 'Wildlife & Adventure',
    icon: PawPrint,
  },
  {
    id: 'museum',
    title: 'Clark Museum',
    description: "Discover Clark's story — from its days as an American air base to the thriving freeport it is today.",
    folder: '12-clark-museum',
    category: 'History & Culture',
    icon: Landmark,
  },
];

// One slide per image; places whose folder is still empty don't appear
const CLARK_HIGHLIGHTS = CLARK_PLACES.flatMap((place) =>
  imagesIn(place.folder).map((image, idx) => ({ ...place, slideId: `${place.id}-${idx}`, image }))
);

export const OmbaraUSPs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CLARK_HIGHLIGHTS.length;
  const railRef = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) => setActiveIndex((prev) => (prev + dir + total) % total);

  // Slideshow: advance every SLIDE_DURATION; paused only while the big image is hovered
  useEffect(() => {
    if (paused || total === 0) return;
    const timer = setTimeout(() => setActiveIndex((prev) => (prev + 1) % total), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [activeIndex, paused, total]);

  // Keep the active thumbnail centred in the rail (horizontal scroll only — never moves the page)
  useEffect(() => {
    const rail = railRef.current;
    const thumb = rail?.children[activeIndex] as HTMLElement | undefined;
    if (!rail || !thumb) return;
    rail.scrollTo({ left: thumb.offsetLeft - rail.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' });
  }, [activeIndex]);

  if (total === 0) return null;
  const active = CLARK_HIGHLIGHTS[activeIndex];

  return (
    <section
      id="usps"
      className="py-24 sm:py-32 bg-[#F5F5F5] text-[#111111] relative"
      aria-label="Explore Clark"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ---------- Section header ---------- */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-12 sm:mb-14">
          <div className="lg:col-span-7">
            <span className="eyebrow">02 · Explore Clark</span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-medium leading-[1] mt-5">
              Discover <span className="font-script font-normal text-[#6B6B6B]">Clark</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-base sm:text-lg text-[#6B6B6B] leading-relaxed lg:pb-2">
            Golf, gaming, family parks and a booming business hub — stay at Main Stay and discover the best of Clark,
            Pampanga.
          </p>
        </Reveal>

        {/* ---------- Feature card: image + its details together ---------- */}
        <Reveal className="relative isolate">
          {/* Soft colour glow from the active photo, so the glass card has something to frost */}
          <div aria-hidden="true" className="absolute -inset-6 sm:-inset-10 -z-10 pointer-events-none">
            {CLARK_HIGHLIGHTS.map((item, idx) => (
              <img
                key={`glow-${item.slideId}`}
                src={item.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover blur-3xl saturate-150 transition-opacity duration-[1400ms] ease-out ${
                  idx === activeIndex ? 'opacity-40' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <div
            className="rounded-[28px] bg-white/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] p-3 grid grid-cols-1 lg:grid-cols-12 gap-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Image with a tilted left cut whose edge fades out into the glass card (desktop) */}
            <div className="lg:col-span-8 lg:order-2 lg:-ml-8 lg:-my-3 lg:-mr-3 relative aspect-[16/10] lg:aspect-auto lg:min-h-[500px] rounded-2xl lg:rounded-l-none lg:rounded-r-[27px] overflow-hidden bg-[#EDEDED] lg:bg-transparent">
              <div className="absolute inset-0 overflow-hidden bg-[#EDEDED] lg:bg-transparent lg:[clip-path:polygon(9%_0,100%_0,100%_100%,0_100%)] lg:[mask-image:linear-gradient(98deg,transparent_8%,rgba(0,0,0,0.45)_17%,black_32%)]">
                {CLARK_HIGHLIGHTS.map((item, idx) => (
                  <img
                    key={item.slideId}
                    src={item.image}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${
                      idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:order-1 flex flex-col p-5 sm:p-8 lg:py-10">
              <div key={active.slideId} className="animate-rise flex flex-col h-full">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/70 border border-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  <active.icon className="w-3.5 h-3.5" />
                  {active.category}
                </span>
                <div className="mt-6 lg:mt-auto">
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-medium leading-[1.05]">{active.title}</h3>
                  <p className="text-base text-[#6B6B6B] leading-relaxed mt-4">{active.description}</p>
                  <p className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] mt-6 pt-6 border-t border-black/10 w-full">
                    <MapPin className="w-4 h-4" />
                    {active.location ?? 'Clark Freeport Zone · Pampanga'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---------- Thumbnail rail with plain prev / next arrows ---------- */}
        <div className="mt-8 flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous place"
            className="shrink-0 p-1 text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <div ref={railRef} className="relative flex-1 min-w-0 flex gap-3 overflow-x-auto no-scrollbar py-2">
            {CLARK_HIGHLIGHTS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.slideId}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive}
                  className="group shrink-0 w-28 sm:w-32 text-left cursor-pointer"
                >
                  <div
                    className={`rounded-2xl bg-white p-1.5 transition-shadow duration-300 ${
                      isActive ? 'shadow-luxury-card' : ''
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-[10px] overflow-hidden bg-[#EDEDED]">
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </div>
                  <div
                    className={`mt-2 px-1 text-xs font-medium truncate transition-colors ${
                      isActive ? 'text-[#111111]' : 'text-[#6B6B6B] group-hover:text-[#111111]'
                    }`}
                  >
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next place"
            className="shrink-0 p-1 text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};
