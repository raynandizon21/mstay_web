import React from 'react';
import { ArrowUpRight, Flag, MapPin, Phone, Plane, ShieldCheck, LucideIcon } from 'lucide-react';
import { HOTEL_INFO } from '../data/ombaraData.ts';
import { Reveal } from './Reveal.tsx';

// Only distances the hotel itself states (see the About section / official intro)
const NEARBY: { place: string; detail: string; time: string; icon: LucideIcon }[] = [
  { place: 'Clark International Airport', detail: 'Pick-up & drop-off on request', time: '10 min', icon: Plane },
  { place: 'Mimosa · Korea CC · Sun Valley', detail: "Clark's three major golf courses", time: '5 min', icon: Flag },
  { place: 'Clark CDC secure zone', detail: 'The hotel is inside the Freeport', time: 'On-site', icon: ShieldCheck },
];

// Same place as HOTEL_INFO.mapsUrl, as a key-less embeddable map
const MAP_QUERY = 'CLARK M STAY HOTEL Clark Terrace Building';
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;

export const OmbaraLocation: React.FC = () => {
  const frontDesk = HOTEL_INFO.phones[0];

  return (
    <section id="location" className="py-20 sm:py-32 bg-white text-[#111111] relative" aria-label="Location">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">06 · Location</span>
            <h2 className="font-serif-luxury text-[44px] sm:text-6xl font-medium leading-[0.95] mt-5">
              Getting <span className="font-script font-normal text-[#6B6B6B]">here</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-[#6B6B6B] leading-relaxed lg:pb-2">
            Inside the secure Clark Freeport Zone — minutes from the airport and right next to Clark&apos;s best golf
            courses.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Map */}
          <Reveal className="lg:col-span-7 lg:order-2">
            <div className="h-full rounded-3xl border border-[#E6E6E6] bg-white p-2.5">
              <div className="relative h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[540px] rounded-[18px] overflow-hidden bg-[#EDEDED]">
                <iframe
                  title="M Stay Hotel on Google Maps"
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group absolute bottom-4 right-4 inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white text-[13px] font-semibold shadow-gold-button hover:bg-[#2B2B2B] transition-colors"
                >
                  Open in Google Maps
                  <span className="w-7 h-7 rounded-full bg-white text-[#111111] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Address + travel times */}
          <Reveal delay={120} className="lg:col-span-5 lg:order-1 flex flex-col gap-4">
            <div className="rounded-3xl bg-[#111111] text-white p-6 sm:p-8 grain relative overflow-hidden">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                <MapPin className="w-3.5 h-3.5" /> Address
              </span>
              <p className="font-serif-luxury text-[22px] sm:text-2xl font-medium leading-snug mt-4">{HOTEL_INFO.address}</p>
              <div className="mt-7 grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5">
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 rounded-full bg-white text-[#111111] text-sm font-semibold hover:bg-[#EDEDED] transition-colors"
                >
                  <MapPin className="w-4 h-4" /> Directions
                </a>
                <a
                  href={`tel:${frontDesk.tel}`}
                  className="inline-flex items-center justify-center gap-2 h-12 rounded-full border border-white/25 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4" /> {frontDesk.display}
                </a>
              </div>
            </div>

            <ul className="flex-1 rounded-3xl border border-[#E6E6E6] divide-y divide-[#EDEDED]">
              {NEARBY.map(({ place, detail, time, icon: Icon }) => (
                <li key={place} className="flex items-center gap-4 px-5 sm:px-6 py-5">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[15px] font-semibold leading-snug">{place}</span>
                    <span className="block text-[13px] text-[#6B6B6B] mt-0.5">{detail}</span>
                  </span>
                  <span className="shrink-0 font-serif-luxury text-2xl font-medium tabular-nums whitespace-nowrap">
                    {time}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
