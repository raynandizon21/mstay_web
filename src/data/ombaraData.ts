export interface HeroSlide {
  id: string;
  number: string;
  cursiveTitle: string;
  headline: string;
  subtitle: string;
  tags: string[];
  image: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface USPItem {
  id: string;
  title: string;
  iconType: 'building' | 'umbrella' | 'wave' | 'lotus' | 'layers' | 'store' | 'sofa' | 'key' | 'leaf';
}

export interface FacilityTab {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  mainImage: string;
  insetCaption: string;
  insetImage: string;
}

export interface ResidenceItem {
  id: string;
  label: string; // e.g. "Room A"
  title: string; // e.g. "Deluxe 1 Queen Bed"
  description: string;
  image: string; // cover photo (first of images)
  images: { src: string; caption: string }[];
  bed: string;
  standardOccupancy: number;
  maxOccupancy: number;
  amenities: { label: string; items: string[] }[];
  pricePerNight: number; // PHP
  priceKrw: number; // per night, as listed on the Korean booking page
}

// Applies to every room type (from the official rate sheet)
export const ROOM_RATE_PERKS = ['Free breakfast for 1 person', 'Free late check-out until 11:00 PM for stays of 3+ nights'];

export interface StorySlide {
  id: string;
  index: string;
  tag: string;
  title: string;
  caption: string;
  image: string;
}

export interface GalleryNarrativeItem {
  id: string;
  stepNumber: string;
  category: string;
  title: string;
  description: string;
  image: string;
  focus?: string; // CSS object-position, e.g. 'center 60%' — which part of the photo stays visible when cropped
}

// Local photos (src/assets/images/...)
const ASSET_FILES = import.meta.glob<string>('../assets/images/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
});
export const asset = (path: string): string => {
  const url = ASSET_FILES[`../assets/images/${path}`];
  if (!url) console.warn(`[ombaraData] missing image: ${path}`);
  return url ?? '';
};

// 1. HERO SLIDES
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    number: '01 / 03',
    cursiveTitle: 'New in Clark · Since 2022',
    headline: 'Spacious Studio Living',
    subtitle:
      'M Stay Hotel opened in 2022 with 101 studio-type rooms — far roomier and more comfortable than a typical hotel room.',
    tags: ['OPENED 2022', '101 STUDIO ROOMS', 'CLARK FREEPORT ZONE'],
    image: asset('rooms/roomb_bed.jpg'),
  },
  {
    id: 'hero-2',
    number: '02 / 03',
    cursiveTitle: 'Made for Golf Travelers',
    headline: 'Five Minutes to the Fairway',
    subtitle:
      "Clark's three major golf courses — Mimosa, Korea CC and Dongkwang Sun Valley — are all about 5 minutes away, with laundry, pick-up & drop-off and breakfast for golfers.",
    tags: ['MIMOSA', 'KOREA CC', 'DONGKWANG SUN VALLEY'],
    image: asset('explore-clark/02-golf/1-golf.jpg'),
  },
  {
    id: 'hero-3',
    number: '03 / 03',
    cursiveTitle: 'Inside Clark CDC',
    headline: 'Safe, Central & Connected',
    subtitle:
      'Located within the secure Clark Development Corporation (CDC) zone — just 10 minutes from Clark International Airport.',
    tags: ['CLARK CDC', '10 MIN TO CLARK AIRPORT', 'SAFE & CONVENIENT'],
    image: asset('explore-clark/08-clark-airport/1-clark-airport-front.jpg'),
  },
];

// 2. THE EXPERIENCE
export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Serenity',
    description: 'Find your peace in our beautifully designed spaces.',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    tag: 'Living',
  },
  {
    id: 'exp-2',
    title: 'Wellness',
    description: 'Rejuvenate your body and soul at our spa facilities.',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    tag: 'Sanctuary',
  },
  {
    id: 'exp-3',
    title: 'Dining',
    description: 'Exquisite culinary experiences waiting for you.',
    image:
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=85',
    tag: 'Culinary',
  },
];

// 3. EXCLUSIVE FEATURES (USPs)
export const EXCLUSIVE_USPS: USPItem[] = [
  {
    id: 'usp-1',
    title: 'Exclusive Freehold Seafront Address',
    iconType: 'building',
  },
  {
    id: 'usp-2',
    title: 'Private Access to Pristine Beachfront',
    iconType: 'umbrella',
  },
  {
    id: 'usp-3',
    title: 'Panoramic Ocean View Experience',
    iconType: 'wave',
  },
  {
    id: 'usp-4',
    title: 'Resort-Style Wellness & Leisure Facilities',
    iconType: 'lotus',
  },
  {
    id: 'usp-5',
    title: 'Thoughtfully Designed Flexible Layouts',
    iconType: 'layers',
  },
  {
    id: 'usp-6',
    title: 'Retail Conveniences Within Reach',
    iconType: 'store',
  },
  {
    id: 'usp-7',
    title: 'Move-In Ready Fully Furnished Homes',
    iconType: 'sofa',
  },
  {
    id: 'usp-8',
    title: 'Smart Dual-Key Investment Concept',
    iconType: 'key',
  },
  {
    id: 'usp-9',
    title: 'Sustainable Living with GreenRE Certification',
    iconType: 'leaf',
  },
];

// 4. OUR FACILITIES
// NOTE: replace the images with real photos of each facility when available.
export const FACILITIES_DATA: FacilityTab[] = [
  {
    id: 'damso-restaurant',
    tabLabel: 'DAMSO RESTAURANT',
    title: 'Damso Korean Restaurant',
    description:
      'Our in-house Korean restaurant, "Damso", serves a quality breakfast and hearty Korean meals throughout your stay.',
    mainImage: asset('dining_signature_restaurant_1793344938068.jpg'),
    insetCaption: 'Breakfast & Korean dining at Damso',
    insetImage: asset('rooms/roomb_coffee.png'),
  },
  {
    id: 'golf-services',
    tabLabel: 'GOLF SERVICES',
    title: 'Golf Traveler Services',
    description:
      'Tailored for golfers: laundry service, pick-up & drop-off, and breakfast — with Mimosa, Korea CC and Dongkwang Sun Valley all about 5 minutes away.',
    mainImage: asset('explore-clark/02-golf/1-golf.jpg'),
    insetCaption: 'Laundry · Pick-up & drop-off · Breakfast',
    insetImage: asset('rooms/roomb_cloths.png'),
  },
  {
    id: 'korean-market',
    tabLabel: 'KOREAN MARKET',
    title: 'Korean Market (1F)',
    description:
      'A Korean market on the hotel ground floor stocks snacks and everyday essentials — as convenient as being back home in Korea.',
    mainImage: asset('hero_hotel_exterior_1793344934653.jpg'),
    insetCaption: 'Snacks & essentials on the ground floor',
    insetImage: asset('KMART.png'),
  },
  {
    id: 'reservation-office',
    tabLabel: 'RESERVATION OFFICE',
    title: 'Korea & Philippines Reservation Offices',
    description:
      'Separate local (Philippines) and Korean reservation offices make booking easy. Our Korean office helps arrange golf, activities, car rentals and everything else your Clark trip needs.',
    mainImage: asset('mstay_hotel_frontdesk.jpeg'),
    insetCaption: 'Front desk · Golf, activities & car rental bookings',
    insetImage: asset('rooms/roomb_hallway.png'),
  },
];

// 5. RESIDENCES / ROOMS — photos live in src/assets/images/rooms/
const roomImg = (file: string) => asset(`rooms/${file}`);

// Essentials are identical in both rooms, so both galleries share these photos
const ROOM_ESSENTIALS_IMAGES = [
  { src: roomImg('roomb_cloths.png'), caption: 'Wardrobe & Bathrobe' },
  { src: roomImg('roomb_coffee.png'), caption: 'Coffee & Tea' },
  { src: roomImg('roomb_shampoo.png'), caption: 'Toiletries' },
  { src: roomImg('roomb_airdryer.png'), caption: 'Hair Dryer' },
  { src: roomImg('roomb_power_holder_card.png'), caption: 'Key Card Power' },
];

const ROOM_A_IMAGES = [
  { src: roomImg('room_A_bed.png'), caption: 'Bedroom' },
  { src: roomImg('room_A_tv.png'), caption: 'TV & Lounge' },
  { src: roomImg('room_A_restroom.png'), caption: 'Restroom' },
  ...ROOM_ESSENTIALS_IMAGES,
];

const ROOM_B_IMAGES = [
  { src: roomImg('roomb_bed.jpg'), caption: 'Bedroom' },
  { src: roomImg('roomb_tv.png'), caption: 'TV' },
  { src: roomImg('roomb_hallway.png'), caption: 'Hallway' },
  { src: roomImg('roomb_restroom.png'), caption: 'Restroom' },
  ...ROOM_ESSENTIALS_IMAGES,
];

// Same for both rooms (translated from the official Korean room sheet)
const ROOM_AMENITIES: ResidenceItem['amenities'] = [
  {
    label: 'In-Room Amenities',
    items: [
      'Induction Cooktop',
      'Washing Machine',
      'Refrigerator',
      'Sink',
      'LED TV',
      'Wi-Fi',
      'Air Conditioning',
      'Table',
      'Chairs',
      'Wardrobe',
      'Safe',
      'Slippers',
    ],
  },
  { label: 'Food & Beverage', items: ['Electric Kettle', 'Bottled Water', 'Coffee', 'Tea'] },
  {
    label: 'Bathroom & Toiletries',
    items: ['Bidet', 'Hair Dryer', 'Bathrobe', 'Towels', 'Shampoo', 'Body Wash', 'Soap', 'Toothbrush', 'Toothpaste'],
  },
];

export const RESIDENCES_DATA: ResidenceItem[] = [
  {
    id: 'room-a',
    label: 'Room A',
    title: 'Deluxe 1 Queen Bed',
    description: 'A calm, comfortable room with one queen bed — ideal for couples or solo travellers.',
    image: ROOM_A_IMAGES[0].src,
    images: ROOM_A_IMAGES,
    bed: '1 Queen Bed',
    standardOccupancy: 2,
    maxOccupancy: 2,
    amenities: ROOM_AMENITIES,
    pricePerNight: 4300,
    priceKrw: 111800,
  },
  {
    id: 'room-b',
    label: 'Room B',
    title: 'Deluxe 2 Queen Bed',
    description: 'Two queen beds and room to spread out — perfect for families and groups of friends.',
    image: ROOM_B_IMAGES[0].src,
    images: ROOM_B_IMAGES,
    bed: '2 Queen Beds',
    standardOccupancy: 2,
    maxOccupancy: 4,
    amenities: ROOM_AMENITIES,
    pricePerNight: 4700,
    priceKrw: 122200,
  },
];

// 6. GALLERY NARRATIVE (OMBAK EXPERIENCE)
// Ordered as a guest's journey. Add arrival / lobby / Damso / market / evening shots here when available.
export const GALLERY_NARRATIVE_ITEMS: GalleryNarrativeItem[] = [
  {
    id: 'gal-welcome',
    stepNumber: '01',
    category: 'WELCOME',
    title: 'A WARM ARRIVAL',
    description: 'Check in at our marble front desk — our team is here to help with golf, pick-ups and anything your stay needs.',
    image: asset('mstay_hotel_frontdesk.jpeg'),
  },
  {
    id: 'gal-stay',
    stepNumber: '02',
    category: 'STAY',
    title: 'ROOM TO BREATHE',
    description: 'Bright studio rooms with two queen beds, marble floors and a private balcony — space to properly unwind.',
    image: asset('rooms/roomb_bed.jpg'),
  },
  {
    id: 'gal-comfort',
    stepNumber: '03',
    category: 'COMFORT',
    title: 'QUIET NIGHTS',
    description: 'Crisp white linens and a calm, clean palette made for a deep, restful sleep after a long day.',
    image: asset('rooms/room_A_bed.png'),
  },
  {
    id: 'gal-living',
    stepNumber: '04',
    category: 'HOME-STYLE LIVING',
    title: 'LIKE HOME',
    description: 'A kitchenette with induction cooktop, refrigerator and washing machine — ideal for longer stays.',
    image: asset('rooms/roomb_hallway.png'),
  },
  {
    id: 'gal-refresh',
    stepNumber: '05',
    category: 'REFRESH',
    title: 'MORNING RITUAL',
    description: 'Modern bathrooms with a walk-in shower, bidet and a backlit mirror to start the day fresh.',
    image: asset('rooms/room_A_restroom.png'),
  },
  {
    id: 'gal-details',
    stepNumber: '06',
    category: 'DETAILS',
    title: 'THOUGHTFUL TOUCHES',
    description: 'M Stay signature shampoo, body wash and amenities — the small things, taken care of.',
    image: asset('rooms/roomb_shampoo.png'),
  },
  {
    id: 'gal-golf',
    stepNumber: '07',
    category: 'GOLF DAY',
    title: 'FIVE MINUTES TO THE TEE',
    description: "Mimosa, Korea CC and Dongkwang Sun Valley are all about 5 minutes away — with pick-up & drop-off on request.",
    image: asset('explore-clark/02-golf/1-golf.jpg'),
  },
];

// 7. FULLSCREEN STORY / VIRTUAL TOUR SLIDES — same journey as the gallery
export const STORY_SLIDES: StorySlide[] = GALLERY_NARRATIVE_ITEMS.map((item, idx, all) => ({
  id: `story-${item.id}`,
  index: `${String(idx + 1).padStart(2, '0')} — ${String(all.length).padStart(2, '0')}`,
  tag: item.category,
  title: item.title.charAt(0) + item.title.slice(1).toLowerCase(),
  caption: item.description,
  image: item.image,
}));

// 8. HOTEL CONTACT & RESERVATION INFO (from the official M Stay website)
export const HOTEL_INFO = {
  name: 'M Stay Hotel',
  address: 'Clark Terrace Building, Lot 2 Block 1, The Villages, Prince Balagtas Avenue, Clark Freeport Zone, Pampanga',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=CLARK+M+STAY+HOTEL+Clark+Terrace+Building',
  phones: [
    { label: 'Front Desk (PH)', display: '045 499 7837', tel: '+63454997837' },
    { label: 'Mobile (PH)', display: '0945 146 7000', tel: '+639451467000' },
    {
      label: 'Korea Travel Consultation',
      display: '070-7732-1169',
      tel: '+827077321169',
      hours: 'Mon–Fri 10:00–18:00 (KST) · Lunch 12:00–13:00',
    },
  ],
  // TODO: paste the real links here — buttons only appear once a URL is set
  kakaoTalkUrl: '',
  naverBandUrl: '',
  deposit: { amountPerNight: 500, currency: '₱' },
  bank: { name: 'Kookmin Bank', account: '165801-04-308286', holder: 'Jung Min-seok (In & In)' },
  company: {
    ceo: 'Jung Min-seok',
    koreaAddress: '402, Seshin, 542 Jungang-ro, Deogyang-gu, Goyang-si, Gyeonggi-do',
    businessRegNo: '128-36-66269',
    mailOrderNo: '2011-Gyeonggi Goyang-2221',
  },
};

export const RESERVATION_STEPS = [
  {
    title: 'Check availability',
    description: 'Confirm your dates and room type with us via KakaoTalk or phone first.',
  },
  {
    title: 'Request & pay the deposit',
    description: 'Submit your reservation and pay the deposit of ₱500 per night.',
  },
  {
    title: 'Receive your voucher',
    description: 'Once the deposit is confirmed, your voucher is sent to your registered email.',
  },
  {
    title: 'Get ready for your stay',
    description: 'Your voucher covers airport pick-up, golf requests and the accommodation rules.',
  },
];
