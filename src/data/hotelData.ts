export interface Room {
  id: string;
  name: string;
  category: 'suite' | 'room' | 'penthouse';
  tagline: string;
  description: string;
  sizeSqM: number;
  sizeSqFt: number;
  maxGuests: number;
  bedType: string;
  startingPriceUsd: number;
  image: string;
  secondaryImages: string[];
  features: string[];
  floor: string;
  view: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  subtitle: string;
  cuisine: string;
  chef: string;
  description: string;
  hours: string;
  dressCode: string;
  image: string;
  signatureDish: string;
  cellarHighlight: string;
}

export interface WellnessFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
  iconName: string;
  image: string;
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  inclusions: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'architecture' | 'suites' | 'dining' | 'wellness';
  image: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  guestName: string;
  residence: string;
  stayDate: string;
  suiteType: string;
  rating: number;
  source: string;
}

export interface ExclusiveOffer {
  id: string;
  title: string;
  label: string;
  description: string;
  startingFrom: number;
  validThrough: string;
  inclusions: string[];
  terms: string;
  image: string;
}

export const ROOMS: Room[] = [
  {
    id: 'atelier-studio',
    name: 'Atelier Urban Studio',
    category: 'room',
    tagline: 'Modern Precision & Acoustic Calm',
    description:
      'Engineered for contemporary luxury living. Features floor-to-ceiling panoramic glass, custom matte graphite joinery, and an Italian terrazzo & marble en-suite with Dornbracht rainfall cascade.',
    sizeSqM: 54,
    sizeSqFt: 580,
    maxGuests: 2,
    bedType: 'Custom King Bed with 600-Thread Percale Egyptian Cotton',
    startingPriceUsd: 590,
    image: '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
    secondaryImages: [
      '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
      '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
    ],
    features: [
      'Smart Climate & Circadian Lighting Control',
      'Bang & Olufsen Spatial Sound Integration',
      'Walk-In Glass Rain Shower & Soaking Tub',
      'Curated Artisanal Botanicals & Espresso Bar',
      'Complimentary High-Speed 1Gbps Fiber Wi-Fi',
    ],
    floor: 'Floors 16–26',
    view: 'Metropolitan Skyline & Boulevard Park',
  },
  {
    id: 'executive-corner-suite',
    name: 'Main Stay Executive Corner Suite',
    category: 'suite',
    tagline: 'Dual-Aspect Panoramic Architecture',
    description:
      'Expansive dual-aspect living with dedicated lounge area, custom executive workstation, walk-in dressing chamber, and an open bar counter with sub-zero wine refrigeration.',
    sizeSqM: 92,
    sizeSqFt: 990,
    maxGuests: 3,
    bedType: 'Handcrafted Master King Bed with Organic Goose Down Pillows',
    startingPriceUsd: 940,
    image: '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
    secondaryImages: [
      '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
      '/src/assets/images/wellness_spa_pool_1793344936990.jpg',
    ],
    features: [
      'Complimentary House Tesla / Airport Chauffeur',
      'Dedicated 24-Hour Resident Valet & Butler Service',
      'Dual-Vanity Statuario Marble Bathroom',
      'Sub-Zero Temperature-Regulated Cellar Unit',
      'Priority Seating at Cobalt & Oak',
    ],
    floor: 'Floors 28–39',
    view: 'Panoramic North & West Metropolitan Vistas',
  },
  {
    id: 'main-stay-presidential',
    name: 'The Main Stay Presidential Suite',
    category: 'suite',
    tagline: 'The Zenith of Modern Metropolitan Luxury',
    description:
      'Palatial 220m² residence featuring a grand sculptural fireplace, private dining salon for ten guests, chef prep galley, and private wellness retreat with infrared sauna.',
    sizeSqM: 220,
    sizeSqFt: 2368,
    maxGuests: 4,
    bedType: 'Two Master Bedroom Suites with Bespoke Italian Silk Bedding',
    startingPriceUsd: 2650,
    image: '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
    secondaryImages: [
      '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
      '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
    ],
    features: [
      'Private High-Speed Elevator with Biometric Key',
      'Private En-Suite Steam Room & Infrared Therapy',
      'Custom Curated Modern Architectural Art Collection',
      'Dedicated House Chauffeur Available 24 Hours',
      'Custom Wine Dispenser with Sommelier Pairings',
    ],
    floor: 'Floor 41 (Private Key Access)',
    view: 'Unobstructed 360-Degree Horizon & Cityscape',
  },
  {
    id: 'grand-sky-penthouse',
    name: 'The Grand Sky Penthouse & Terrace',
    category: 'penthouse',
    tagline: 'Private Sky Sanctuary with Heated Plunge Pool',
    description:
      'A multi-level sky penthouse boasting an 85m² landscaped open-air deck with heated cantilevered plunge pool, outdoor fire lounge, and double-height architectural glass gallery.',
    sizeSqM: 325,
    sizeSqFt: 3500,
    maxGuests: 6,
    bedType: 'Three Palatial Bedroom Suites with Custom California King Beds',
    startingPriceUsd: 4800,
    image: '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
    secondaryImages: [
      '/src/assets/images/wellness_spa_pool_1793344936990.jpg',
      '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
    ],
    features: [
      'Cantilevered Outdoor Plunge Pool & Sun Deck',
      'Helipad Arrival Protocol with VIP Escort',
      'Personal Chef Available for Private Rooftop Galas',
      'In-Residence Wine Cellar Curated to Taste',
      'All-Inclusive Access to Wellness & Chauffeur Fleet',
    ],
    floor: 'Floors 43–45',
    view: 'Endless Skyline & Harbor Horizon',
  },
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'cobalt-and-oak',
    name: 'Cobalt & Oak',
    subtitle: 'Modern Gastronomy · 2 Michelin Stars',
    cuisine: 'Contemporary Metropolitan Cuisine',
    chef: 'Executive Chef Marcus Vance',
    description:
      'Hovering on the 40th floor, Cobalt & Oak pairs innovative seasonal tasting menus with breathtaking floor-to-ceiling skyline views and a 2,000-bottle glass cellar.',
    hours: 'Tuesday – Sunday: 18:00 – 23:00',
    dressCode: 'Smart Elegant (Jackets recommended)',
    image: '/src/assets/images/dining_signature_restaurant_1793344938068.jpg',
    signatureDish: 'Aged Wagyu Tartare, Smoked Bone Glaze & Oscietra Caviar',
    cellarHighlight: 'Curated Grand Crus & Biodynamic European Vintages',
  },
  {
    id: 'the-m-lounge',
    name: 'The M Bar & Skyline Lounge',
    subtitle: 'Craft Mixology, Rare Spirits & Live Modern Jazz',
    cuisine: 'Oysters, Small Plates & Artisanal Charcuterie',
    chef: 'Master Mixologist Elena Rostov',
    description:
      'Deep cobalt velvet, sleek steel accents, and panoramic outdoor terrace fire pits. The premier evening destination for bespoke botanical cocktails and vintage champagne.',
    hours: 'Daily: 16:30 – 01:30',
    dressCode: 'Smart Casual',
    image: '/src/assets/images/dining_signature_restaurant_1793344938068.jpg',
    signatureDish: 'Glacier Bay Oysters with Champagne Yuzu Granita',
    cellarHighlight: 'Rare Single-Cask Japanese & Highland Whiskies',
  },
  {
    id: 'daylight-terrace',
    name: 'The Daylight Terrace & Botanicals',
    subtitle: 'Sunlit Breakfast, Healthy Kitchen & Afternoon Tea',
    cuisine: 'Modern Organic Brunch & Cold-Pressed Elixirs',
    chef: 'Chef de Cuisine Julian Mercer',
    description:
      'Filled with daylight and lush interior greenery, offering organic sourdoughs, sustainably farmed eggs, cold-pressed juices, and single-origin estate coffees.',
    hours: 'Daily: 07:00 – 16:30',
    dressCode: 'Casual Chic',
    image: '/src/assets/images/dining_signature_restaurant_1793344938068.jpg',
    signatureDish: 'Smoked Salmon Brioche with Poached Free-Range Eggs & Truffle Hollandaise',
    cellarHighlight: 'Organic Herbal Infusions & Rare Himalayan First Flushes',
  },
];

export const WELLNESS_FACILITIES: WellnessFeature[] = [
  {
    id: 'vitality-pool',
    title: 'Skyline Hydrotherapy Vitality Pool',
    subtitle: 'Mineralized Heated Thermal Waters',
    description:
      'Immerse in warm 36°C waters framed by floor-to-ceiling glass, featuring ergonomic air-jet loungers and contrasting ice-cold plunge pools.',
    hours: '06:00 – 22:00 Daily',
    iconName: 'Waves',
    image: '/src/assets/images/wellness_spa_pool_1793344936990.jpg',
  },
  {
    id: 'elemental-spa',
    title: 'Elemental Modern Spa Rituals',
    subtitle: 'Bespoke Facials & Muscular Recovery',
    description:
      'Five private acoustic treatment suites, custom soundscape therapies, and restorative hot basalt rituals designed for jet-lag recovery.',
    hours: '09:00 – 21:00 (Appointments recommended)',
    iconName: 'Sparkles',
    image: '/src/assets/images/wellness_spa_pool_1793344936990.jpg',
  },
  {
    id: 'kinetic-gym',
    title: 'Kinetic Performance Gym & Studio',
    subtitle: '24-Hour High-Performance Biomechanics',
    description:
      'Outfitted with cutting-edge Technogym Artis cardio and resistance machines, dedicated Reformer Pilates room, and on-demand personal kinetic coaching.',
    hours: '24 Hours for Hotel Residents',
    iconName: 'Activity',
    image: '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
  },
  {
    id: 'tesla-fleet',
    title: 'House Fleet & Chauffeur Mobility',
    subtitle: 'Seamless Zero-Emission Airport Transit',
    description:
      'Dedicated house fleet of all-electric sedans and luxury SUVs offering round-the-clock airport transfers, city excursions, and VIP tarmac escort.',
    hours: '24 Hours on Request',
    iconName: 'ShieldCheck',
    image: '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'art-architecture-walk',
    title: 'Modern Architecture & Art Walk',
    category: 'Cultural Immersion',
    description:
      'Private walking tour with our resident curator exploring the landmark modernist towers, private contemporary galleries, and public art installations in the district.',
    duration: '2.5 Hours',
    inclusions: 'Curator guide, gallery admissions, post-walk champagne reception',
    image: '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
  },
  {
    id: 'mixology-masterclass',
    title: 'Private Sky Lounge Mixology Session',
    category: 'Epicurean',
    description:
      'Step behind the bar with Master Mixologist Elena at The M Lounge to craft bespoke infusion cocktails using botanical spirits and artisanal ice.',
    duration: '90 Minutes',
    inclusions: 'Hands-on instruction, three craft cocktail creations, tasting appetizers',
    image: '/src/assets/images/dining_signature_restaurant_1793344938068.jpg',
  },
  {
    id: 'harbor-twilight-cruise',
    title: 'Metropolitan Sunset Yacht Excursion',
    category: 'Private Leisure',
    description:
      'Board the hotel’s private 55-foot modern yacht for an evening cruise along the harbor with vintage champagne, caviar canapés, and illuminated skyline views.',
    duration: '3 Hours',
    inclusions: 'Private skipper, sommelier service, gourmet canapés, hotel transfer',
    image: '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Architectural Facade at Twilight',
    category: 'architecture',
    image: '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
    caption: 'Towering contemporary lines and illuminated glass facade at Main Stay Hotel.',
  },
  {
    id: 'gal-2',
    title: 'Executive Corner Suite Bedroom',
    category: 'suites',
    image: '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
    caption: 'Soundproof floor-to-ceiling glass overlooking the metropolitan skyline.',
  },
  {
    id: 'gal-3',
    title: 'Cobalt & Oak Dining Room',
    category: 'dining',
    image: '/src/assets/images/dining_signature_restaurant_1793344938068.jpg',
    caption: 'Atmospheric evening dining with bespoke table settings and glass cellar.',
  },
  {
    id: 'gal-4',
    title: 'Hydrotherapy Vitality Pool',
    category: 'wellness',
    image: '/src/assets/images/wellness_spa_pool_1793344936990.jpg',
    caption: 'Heated thermal mineral pool with serene basalt stone surrounds.',
  },
  {
    id: 'gal-5',
    title: 'Grand Glass Portico & Atrium',
    category: 'architecture',
    image: '/src/assets/images/hero_hotel_exterior_1793344934653.jpg',
    caption: 'Geometric canopy and entrance water feature at 100 Grand Boulevard.',
  },
  {
    id: 'gal-6',
    title: 'Suite Living & Work Salon',
    category: 'suites',
    image: '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
    caption: 'Tailored furnishings designed for modern focus and peaceful living.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote:
      'Main Stay Hotel sets a new benchmark for modern luxury. The architectural acoustic isolation is unmatched, and the team anticipated our every need with effortless discretion.',
    guestName: 'Alexandre Renoir',
    residence: 'Geneva & Paris',
    stayDate: 'October 2026',
    suiteType: 'Executive Corner Suite',
    rating: 5,
    source: 'Forbes Travel Guide Verified Stay',
  },
  {
    id: 't-2',
    quote:
      'The modern design UI of their booking experience and the physical property reflect the same design rigor: sleek, uncluttered, and breathtaking.',
    guestName: 'Kaitlyn Chen',
    residence: 'Singapore',
    stayDate: 'September 2026',
    suiteType: 'Atelier Urban Studio',
    rating: 5,
    source: 'Condé Nast Traveler Gold List Review',
  },
  {
    id: 't-3',
    quote:
      'Dinner at Cobalt & Oak followed by late night cocktails at The M Lounge made this our most memorable metropolitan stay of the year.',
    guestName: 'David Sterling',
    residence: 'New York',
    stayDate: 'August 2026',
    suiteType: 'The Main Stay Presidential Suite',
    rating: 5,
    source: 'Architectural Digest Hotel Review',
  },
];

export const OFFERS: ExclusiveOffer[] = [
  {
    id: 'metropolitan-escape',
    title: 'The Urban Privilege Package',
    label: 'Exclusive Inclusions',
    description:
      'Reserve two nights or more in any Suite and enjoy complimentary private house chauffeur airport transfer, daily artisan breakfast, and $150 dining credit.',
    startingFrom: 940,
    validThrough: 'Valid through December 31, 2026',
    inclusions: [
      'Round-trip airport transfer via house luxury fleet',
      'Daily full breakfast for two at The Daylight Terrace',
      '$150 dining credit for Cobalt & Oak',
      'Guaranteed 16:00 late check-out privilege',
    ],
    terms: 'Minimum 2-night stay required. Subject to availability.',
    image: '/src/assets/images/room_deluxe_suite_1793344935471.jpg',
  },
  {
    id: 'epicurean-sojourn',
    title: 'Cobalt Gastronomic Journey',
    label: 'Michelin Dining Privilege',
    description:
      'An immersive dining package including a 7-course degustation menu with sommelier wine pairing at Cobalt & Oak, plus in-suite champagne upon arrival.',
    startingFrom: 1380,
    validThrough: 'Year-Round Privilege',
    inclusions: [
      'Atelier Urban Studio accommodation',
      '7-Course Tasting Menu with Grand Cru wine pairing for two',
      'Cellar tour with Head Sommelier',
      'Welcome champagne and artisanal canapés in suite',
    ],
    terms: 'Advance booking 48 hours prior required.',
    image: '/src/assets/images/dining_signature_restaurant_1793344938068.jpg',
  },
  {
    id: 'vitality-spa-retreat',
    title: 'Kinetic & Spa Equilibrium',
    label: 'Wellness Privilege',
    description:
      'Revitalize your body with two 90-minute bespoke body treatments, private vitality hydrotherapy access, and personalized nutritional guidance.',
    startingFrom: 1120,
    validThrough: 'Valid through November 30, 2026',
    inclusions: [
      'Executive Corner Suite accommodation',
      'Two 90-minute bespoke spa recovery treatments',
      'Private 1-hour evening hydrotherapy pool access',
      'Daily cold-pressed botanical elixirs and healthy breakfast',
    ],
    terms: 'Available for weekday and weekend stays.',
    image: '/src/assets/images/wellness_spa_pool_1793344936990.jpg',
  },
];

export const HOTEL_LOCATION = {
  address: '100 Grand Boulevard, Metropolitan Center',
  city: 'Metropolis, NY 10001',
  telephone: '+1 (800) 555-0188',
  email: 'stay@mainstayhotel.com',
  reservationsEmail: 'reservations@mainstayhotel.com',
  landmarks: [
    { name: 'Museum of Contemporary Architecture', distance: '3 min walk (250m)', category: 'Culture' },
    { name: 'Symphony & Performing Arts Hall', distance: '5 min walk (400m)', category: 'Culture' },
    { name: 'High-Fashion & Concept Avenue', distance: 'Adjacent (100m)', category: 'Shopping' },
    { name: 'Metropolitan Financial District', distance: '6 min drive (1.5km)', category: 'Business' },
    { name: 'International Airport', distance: '22 min by House Chauffeur', category: 'Transit' },
  ],
};
