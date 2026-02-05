// client/data/tours/tours.data.ts

import type { Tour } from "@/types/tours/tours.type";

export const tours: Tour[] = [
  {
    id: 1,
    slug: 'aviodrome-lelystad',
    durationHours: 4,
    category: 'museum',
    basePrice: { sedan: 75, van: 95 },
    isSeasonal: false,
    imageSrc: '/images/tours/toursHero/aviadrome-lelystad.jpg',
    cardData: {
      country: 'NL',
      province: 'FL',
      rating: { score: 4.7, reviewCount: 89 },
      distanceFromAmsterdam: 45,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 55,
      estimatedTravelTimeMin: 55,
      mainRoute: 'A6',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 2,
    slug: 'kaasmarkt',
    durationHours: 3,
    category: 'cultuur',
    basePrice: { sedan: 65, van: 85 },
    isSeasonal: false,
    imageSrc: '/images/tours/alkmaar-cheese-market-kaasdragers-gouda-traditional.webp',
    cardData: {
      country: 'NL',
      province: 'NH',
      rating: { score: 4.8, reviewCount: 156 },
      distanceFromAmsterdam: 25,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 25,
      estimatedTravelTimeMin: 30,
      mainRoute: 'A9',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 3,
    slug: 'fashion-outlets',
    durationHours: 5,
    category: 'shopping',
    basePrice: { sedan: 55, van: 75 },
    isSeasonal: false,
    imageSrc: '/images/tours/batavia-stad-outlet-shopping-entrance.webp',
    cardData: {
      country: 'NL',
      province: 'FL',
      rating: { score: 4.5, reviewCount: 203 },
      distanceFromAmsterdam: 35,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 35,
      estimatedTravelTimeMin: 40,
      mainRoute: 'A6',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 4,
    slug: 'zaanse-schans',
    durationHours: 4,
    category: 'natuur',
    basePrice: { sedan: 85, van: 105 },
    isSeasonal: false,
    imageSrc: '/images/tours/zaanse-schans-windmills-tour-crowd-sunny-day.webp',
    cardData: {
      country: 'NL',
      province: 'NH',
      rating: { score: 4.9, reviewCount: 234 },
      distanceFromAmsterdam: 20,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 20,
      estimatedTravelTimeMin: 25,
      mainRoute: 'A8',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 5,
    slug: 'zuid-holland-tour',
    durationHours: 6,
    category: 'cultuur',
    basePrice: { sedan: 125, van: 145 },
    isSeasonal: false,
    imageSrc: '/images/tours/madurodam-miniature-park-the-hague-family-visit.webp',
    cardData: {
      country: 'NL',
      province: 'ZH',
      rating: { score: 4.6, reviewCount: 98 },
      distanceFromAmsterdam: 60,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 60,
      estimatedTravelTimeMin: 70,
      mainRoute: 'A4',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 6,
    slug: 'volendam-edam-marken',
    durationHours: 5,
    category: 'cultuur',
    basePrice: { sedan: 95, van: 115 },
    isSeasonal: false,
    imageSrc: '/images/tours/volendam-marken-ferry-boat-tour-harbor.webp',
    cardData: {
      country: 'NL',
      province: 'NH',
      rating: { score: 4.8, reviewCount: 178 },
      distanceFromAmsterdam: 30,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 30,
      estimatedTravelTimeMin: 35,
      mainRoute: 'N247',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 7,
    slug: 'giethoorn',
    durationHours: 6,
    category: 'natuur',
    basePrice: { sedan: 115, van: 135 },
    isSeasonal: false,
    imageSrc: '/images/tours/giethoorn-canal-boat-tour-village-waterways.webp',
    cardData: {
      country: 'NL',
      province: 'OV',
      rating: { score: 4.9, reviewCount: 267 },
      distanceFromAmsterdam: 120,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 120,
      estimatedTravelTimeMin: 120,
      mainRoute: 'A6',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 8,
    slug: 'belgium-tour',
    durationHours: 8,
    category: 'internationaal',
    basePrice: { sedan: 165, van: 189 },
    isSeasonal: false,
    imageSrc: '/images/tours/brussels-grand-place-tourists-manneken-pis-square.webp',
    cardData: {
      country: 'BE',
      province: 'LI',
      rating: { score: 4.7, reviewCount: 134 },
      distanceFromAmsterdam: 180,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 180,
      estimatedTravelTimeMin: 180,
      mainRoute: 'A2',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 9,
    slug: 'amsterdam-city-tour',
    durationHours: 4,
    category: ['stad', 'museum'],
    basePrice: { sedan: 75, van: 95 },
    isSeasonal: false,
    imageSrc: '/images/tours/amsterdam-canal-bridge-city-tour-basilica-view.webp',
    cardData: {
      country: 'NL',
      province: 'NH',
      rating: { score: 4.6, reviewCount: 312 },
      distanceFromAmsterdam: 0,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 0,
      estimatedTravelTimeMin: 0,
      mainRoute: 'Amsterdam',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 10,
    slug: 'keukenhof',
    durationHours: 4,
    category: 'natuur',
    basePrice: { sedan: 89, van: 109 },
    isSeasonal: true,
    season: { start: '2025-03-20', end: '2025-05-11' },
    imageSrc: '/images/tours/keukenhof-tulip-garden-spring-flowers-park-walk.webp',
    cardData: {
      country: 'NL',
      province: 'ZH',
      rating: { score: 4.9, reviewCount: 445 },
      distanceFromAmsterdam: 40,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 40,
      estimatedTravelTimeMin: 45,
      mainRoute: 'A4',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 11,
    slug: 'efteling',
    durationHours: 7,
    category: 'familie',
    basePrice: { sedan: 95, van: 115 },
    isSeasonal: false,
    imageSrc: '/images/tours/efteling-rollercoaster-loop-thrill-ride-theme-park.webp',
    cardData: {
      country: 'NL',
      province: 'NB',
      rating: { score: 4.8, reviewCount: 289 },
      distanceFromAmsterdam: 85,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 85,
      estimatedTravelTimeMin: 90,
      mainRoute: 'A2',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },

  {
    id: 12,
    slug: 'walibi',
    durationHours: 6,
    category: 'familie',
    basePrice: { sedan: 85, van: 105 },
    isSeasonal: false,
    imageSrc: '/images/tours/walibi-holland-theme-park-entrance-crowds.webp',
    cardData: {
      country: 'NL',
      province: 'GE',
      rating: { score: 4.7, reviewCount: 198 },
      distanceFromAmsterdam: 50,
      maxPersons: { sedan: 4, van: 8 },
      pickupAvailable: true,
    },
    routeInfo: {
      distanceKm: 50,
      estimatedTravelTimeMin: 55,
      mainRoute: 'A6',
    },
    services: {
      items: ['oneWay', 'roundTrip', 'groups', 'business'],
    },
  },
];
