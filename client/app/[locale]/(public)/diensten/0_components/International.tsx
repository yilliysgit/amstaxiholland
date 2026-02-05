"use client";
import { JSX } from 'react';
import React, { useState } from 'react';

export default function InternationaleTaxiPage(): JSX.Element {
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'premium',
    flightNumber: '',
    luggage: '1'
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeDestination, setActiveDestination] = useState(0);
  const [selectedService, setSelectedService] = useState('airport');

  const trustAirlines = [
    { name: 'KLM', logo: '👑' },
    { name: 'Lufthansa', logo: '✈️' },
    { name: 'Air France', logo: '🇫🇷' },
    { name: 'British Airways', logo: '🇬🇧' },
    { name: 'Emirates', logo: '🌴' }
  ];

  const internationalServices = [
    {
      id: 'airport',
      icon: '✈️',
      title: 'Airport VIP Service',
      description: 'Premium luchthaven transfers wereldwijd',
      features: ['Flight tracking', 'Meet & greet', 'Bagage service', 'VIP lounges'],
      countries: ['Schiphol', 'Frankfurt', 'Charles de Gaulle', 'Heathrow']
    },
    {
      id: 'pilot',
      icon: '👨‍✈️',
      title: 'Bemanning Transport',
      description: 'Specialist in piloten en cabin crew',
      features: ['24/7 beschikbaar', 'Flexibele planning', 'Multi-stop', 'Overnight'],
      countries: ['Europa', 'Midden-Oosten', 'Azië', 'Noord-Amerika']
    },
    {
      id: 'corporate',
      icon: '🏢',
      title: 'Zakelijk Internationaal',
      description: 'Cross-border business travel',
      features: ['Dedicated chauffeurs', 'Documentatie', 'Multi-language', 'WiFi'],
      countries: ['EU', 'UK', 'Zwitserland', 'Scandinavië']
    },
    {
      id: 'tours',
      icon: '🏛️',
      title: 'Dagtours & Excursies',
      description: 'Begeleide tours en dagtrips',
      features: ['Gids opties', 'Flexibele routes', 'Foto stops', 'Lokale kennis'],
      countries: ['Parijs', 'Londen', 'Berlijn', 'Brussel']
    },
    {
      id: 'events',
      icon: '🎪',
      title: 'Evenementen & Congressen',
      description: 'Complete event logistiek',
      features: ['Groepsvervoer', 'Tijdsmanagement', 'Coördinatie', 'Backup'],
      countries: ['Beursgebouwen', 'Conferenties', 'Festivals', 'Sportevenementen']
    },
    {
      id: 'luxury',
      icon: '⭐',
      title: 'Luxe & VIP Service',
      description: 'High-end international travel',
      features: ['Premium voertuigen', 'Persoonlijke assistent', 'Privacy', 'Custom'],
      countries: ['Wereldwijd', 'Privé-terminals', 'Hotels', 'Resorts']
    }
  ];

  const popularDestinations = [
    {
      region: 'Europa',
      countries: [
        { name: 'Nederland', price: 'Vanaf €45', time: 'Schiphol', popular: 'Amsterdam, Rotterdam' },
        { name: 'Duitsland', price: 'Vanaf €85', time: 'Frankfurt', popular: 'Berlijn, München' },
        { name: 'Frankrijk', price: 'Vanaf €75', time: 'CDG', popular: 'Parijs, Lyon' },
        { name: 'Verenigd Koninkrijk', price: 'Vanaf €120', time: 'Heathrow', popular: 'Londen, Manchester' }
      ]
    },
    {
      region: 'Wereldwijd',
      countries: [
        { name: 'Verenigde Staten', price: 'Vanaf €150', time: 'JFK', popular: 'New York, Chicago' },
        { name: 'Verenigde Arabische Emiraten', price: 'Vanaf €180', time: 'DXB', popular: 'Dubai, Abu Dhabi' },
        { name: 'Singapore', price: 'Vanaf €200', time: 'Changi', popular: 'Singapore' },
        { name: 'Japan', price: 'Vanaf €220', time: 'Narita', popular: 'Tokyo, Osaka' }
      ]
    }
  ];

  const vehicleTypes = [
    {
      type: 'Business Sedan',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2340',
      capacity: '1-3 passengers',
      luggage: '2-3 suitcases',
      features: ['WiFi', 'Refreshments', 'Multimedia', 'Climate control'],
      price: '€2.75/km'
    },
    {
      type: 'Executive Van',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2340',
      capacity: '1-6 passengers',
      luggage: '6-8 suitcases',
      features: ['Extra space', 'VIP interior', 'Work tables', 'Entertainment'],
      price: '€3.50/km'
    },
    {
      type: 'Luxury Minibus',
      image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2340',
      capacity: '1-8 passengers',
      luggage: '10+ suitcases',
      features: ['Group comfort', 'Luxury seating', 'Onboard facilities', 'Professional driver'],
      price: '€4.25/km'
    }
  ];

  const pilotFeatures = [
    {
      icon: '🕒',
      title: '24/7 Flexibiliteit',
      description: 'Altijd beschikbaar, ook bij vertragingen en last-minute changes'
    },
    {
      icon: '🧳',
      title: 'Bagage Expertise',
      description: 'Speciale handling voor crew luggage en equipment'
    },
    {
      icon: '🌍',
      title: 'Wereldwijde Dekking',
      description: 'Actief op alle grote internationale luchthavens'
    },
    {
      icon: '📱',
      title: 'Real-time Updates',
      description: 'Live tracking en directe communicatie met crew'
    }
  ];

  const faqs = [
    {
      question: 'Hoe ver van tevoren moet ik een internationale transfer boeken?',
      answer: 'Voor internationale transfers adviseren we minimaal 48 uur van tevoren te boeken. Voor complexe routes of groepsvervoer is 1 week ideaal. Last-minute boekingen zijn mogelijk, maar beschikbaarheid kan beperkt zijn.'
    },
    {
      question: 'Kunnen jullie helpen met visum- en grensformaliteiten?',
      answer: 'Onze chauffeurs zijn getraind in internationale reisdocumentatie. We adviseren over benodigde documenten en zorgen voor soepele grensovergangen. Specifieke visumaanvragen blijven de verantwoordelijkheid van de reiziger.'
    },
    {
      question: 'Wat gebeurt er als mijn vlucht vertraagd is?',
      answer: 'We monitoren alle vluchten real-time. Bij vertraging past uw chauffeur automatisch de ophaaltijd aan. Geen extra kosten - dit is standaard inbegrepen in onze internationale service.'
    },
    {
      question: 'Zijn jullie beschikbaar voor multi-country tours?',
      answer: 'Absoluut! We specialiseren ons in meerdaagse tours door Europa. Onze chauffeurs regelen accommodatie, tolwegen en alle logistiek. Vraag een custom quote aan voor uw route.'
    },
    {
      question: 'Welke talen spreken jullie chauffeurs?',
      answer: 'Onze internationale chauffeurs spreken Engels, Duits, Frans en Nederlands. Op aanvraag kunnen we chauffeurs regelen met aanvullende talen zoals Spaans, Italiaans of Arabisch.'
    },
    {
      question: 'Hoe werkt betaling voor internationale ritten?',
      answer: 'We accepteren credit cards, banktransfer en corporate accounts. Alle prijzen zijn inclusief tol, parkeer- en wachttijden. U ontvangt een gedetailleerde internationale factuur met BTW-specificatie.'
    }
  ];

  const handleCalculatePrice = () => {
    // Price calculation logic
    console.log('Calculating price for:', bookingData);
  };

  return (
    <div className="bg-white font-sans antialiased">
      
      {/* ============================================
          1. HERO - INTERNATIONAL FOCUS
          ============================================ */}
      <section className="relative bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900 overflow-hidden min-h-screen flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-indigo-900/80"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20">✈️</div>
        <div className="absolute top-40 right-20 text-4xl opacity-30">🌍</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-25">🏛️</div>

        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl py-16">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="lg:col-span-3 space-y-6 text-white">
              <div className="inline-block px-4 py-2 bg-blue-600/30 backdrop-blur-sm rounded-full border border-blue-400/30">
                <span className="text-blue-100 text-sm font-medium">🌍 Wereldwijde Taxi Service</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                International
                <span className="block text-blue-300 font-light">Taxi Vervoer</span>
              </h1>

              <p className="text-xl text-blue-100 font-light leading-relaxed max-w-2xl">
                Premium internationaal vervoer voor piloten, zakelijke reizigers en toeristen. 
                Van luchthaven transfers tot complete Europese tours.
              </p>

              {/* Quick USPs */}
              <div className="flex flex-wrap gap-4 pt-4">
                {['Flight Tracking', 'Multi-language', '24/7 Support', 'Border Crossing'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-blue-100">
                    <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Trust stats */}
              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-blue-600/30">
                {[
                  {num: '50+', label: 'Landen'},
                  {num: '500+', label: 'Luchthavens'},
                  {num: '24/7', label: 'Service'}
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-blue-300">{stat.num}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Emergency CTA */}
              <div className="pt-6">
                <a href="tel:+31201234567" className="inline-flex items-center gap-3 text-2xl font-bold text-white hover:text-blue-300 transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +31 20 123 4567
                </a>
                <p className="text-sm text-blue-200 mt-1">Worldwide emergency line • Multi-language support</p>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">International Booking</h3>
                  <p className="text-sm text-slate-600">Get instant quote for worldwide transfers</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">From (Airport/City)</label>
                    <input
                      type="text"
                      placeholder="e.g., Schiphol Airport, Amsterdam"
                      value={bookingData.from}
                      onChange={(e) => setBookingData({...bookingData, from: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">To (Destination)</label>
                    <input
                      type="text"
                      placeholder="e.g., Central London, UK"
                      value={bookingData.to}
                      onChange={(e) => setBookingData({...bookingData, to: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Flight Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., KL1234"
                      value={bookingData.flightNumber}
                      onChange={(e) => setBookingData({...bookingData, flightNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Passengers</label>
                      <select
                        value={bookingData.passengers}
                        onChange={(e) => setBookingData({...bookingData, passengers: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                      <select
                        value={bookingData.vehicleType}
                        onChange={(e) => setBookingData({...bookingData, vehicleType: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="premium">Business Sedan</option>
                        <option value="executive">Executive Van</option>
                        <option value="luxury">Luxury Minibus</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleCalculatePrice}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Get Instant Quote
                  </button>

                  <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Book Now
                  </button>
                </div>

                <p className="text-xs text-center text-slate-500 pt-2">
                  ✓ Free cancellation • ✓ 24/7 support • ✓ Border crossing assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          2. AIRLINE PARTNERS TRUST BAR
          ============================================ */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-8">
            <p className="text-slate-600 font-medium">Trusted by major airlines worldwide</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {trustAirlines.map((airline, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700">
                <span className="text-3xl">{airline.logo}</span>
                <span className="font-semibold">{airline.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          3. INTERNATIONAL SERVICES
          ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              International Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Specialist in worldwide transportation for every need
            </p>
          </div>

          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {internationalServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedService === service.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Service Details */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="text-6xl mb-4">
                  {internationalServices.find(s => s.id === selectedService)?.icon}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  {internationalServices.find(s => s.id === selectedService)?.title}
                </h3>
                <p className="text-blue-600 font-semibold text-lg mb-6">
                  {internationalServices.find(s => s.id === selectedService)?.description}
                </p>
                
                <div className="space-y-4 mb-6">
                  <h4 className="font-bold text-slate-900">Key Features:</h4>
                  <ul className="space-y-2">
                    {internationalServices.find(s => s.id === selectedService)?.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900">Popular Destinations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {internationalServices.find(s => s.id === selectedService)?.countries.map((country, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm text-slate-600">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Book {internationalServices.find(s => s.id === selectedService)?.title}
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Our International Service?</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: '🌐',
                    title: 'Global Network',
                    desc: 'Local partners in 50+ countries ensuring consistent quality worldwide'
                  },
                  {
                    icon: '🛡️',
                    title: 'Full Insurance',
                    desc: 'Comprehensive international coverage for passengers and luggage'
                  },
                  {
                    icon: '💬',
                    title: 'Multi-language',
                    desc: 'Drivers speaking English, German, French, Dutch and more'
                  },
                  {
                    icon: '📞',
                    title: '24/7 Support',
                    desc: 'Round-the-clock assistance for international emergencies'
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                    <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          4. PILOT & CREW SPECIALIST SECTION
          ============================================ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-600/30 backdrop-blur-sm rounded-full border border-blue-400/30 mb-4">
              <span className="text-blue-100 text-sm font-medium">👨‍✈️ Specialist Service</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pilot & Crew Transport
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Dedicated transportation solutions for aviation professionals worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pilotFeatures.map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-center hover:border-blue-400 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Airline Crew Management</h3>
                <p className="text-blue-100 mb-6">
                  We understand the unique demands of crew transportation. Our services are tailored 
                  to accommodate changing schedules, overnight stays, and multi-leg journeys.
                </p>
                <ul className="space-y-3">
                  {[
                    'Real-time flight monitoring',
                    'Crew rest period compliance',
                    'Airport security coordination',
                    'Dedicated crew liaison'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-blue-100">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-400">99.7%</div>
                  <div className="text-blue-200">On-time performance for crew transfers</div>
                </div>
                <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                  Crew Transport Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          5. DESTINATIONS & PRICING
          ============================================ */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-slate-600">
              Competitive pricing for international routes
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {popularDestinations.map((region, i) => (
              <button
                key={i}
                onClick={() => setActiveDestination(i)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeDestination === i
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {region.region}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {popularDestinations[activeDestination].countries.map((country, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{country.name}</h3>
                    <p className="text-slate-600">{country.popular}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{country.price}</div>
                    <div className="text-sm text-slate-500">{country.time}</div>
                  </div>
                </div>
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                  Book This Route
                </button>
              </div>
            ))}
          </div>

          {/* Custom Route CTA */}
          <div className="bg-white rounded-2xl border-2 border-blue-500 p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Don't See Your Destination?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We service routes worldwide. Contact us for custom quotes to any destination, 
              including multi-country tours and complex itineraries.
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
              Get Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          6. VEHICLE FLEET - INTERNATIONAL STANDARD
          ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              International Fleet
            </h2>
            <p className="text-xl text-slate-600">
              Premium vehicles for worldwide travel comfort
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vehicleTypes.map((vehicle, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{vehicle.type}</h3>
                      <p className="text-slate-600 text-sm">International travel specialist</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{vehicle.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span>{vehicle.luggage}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {vehicle.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    Select This Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          7. HOW INTERNATIONAL BOOKING WORKS
          ============================================ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How International Booking Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple process for complex international journeys
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Quote & Plan',
                description: 'Get instant quote and discuss itinerary',
                icon: '💬'
              },
              {
                step: '2',
                title: 'Documentation',
                description: 'Provide travel details and documents',
                icon: '📋'
              },
              {
                step: '3',
                title: 'Confirmation',
                description: 'Receive booking confirmation and driver details',
                icon: '✅'
              },
              {
                step: '4',
                title: 'Travel',
                description: 'Enjoy seamless international journey',
                icon: '🚗'
              }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300">
              Start Your International Booking
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          8. FAQ - INTERNATIONAL FOCUS
          ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              International Travel Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about cross-border transportation
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-blue-500 transition-colors">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
                >
                  <span className="text-lg font-bold text-slate-900 pr-4">{faq.question}</span>
                  <svg 
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === i && (
                  <div className="px-6 py-5 bg-white border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          9. FINAL CTA - INTERNATIONAL
          ============================================ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready for International Travel?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Experience seamless worldwide transportation with our premium international service. 
            From airport transfers to cross-border tours, we handle every detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-10 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Book International Transfer
            </button>
            <a href="tel:+31201234567" className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center gap-2 border border-blue-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +31 20 123 4567
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100">
            {['50+ Countries', '24/7 Multilingual Support', 'Border Crossing Assistance', 'Flight Tracking'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          10. FOOTER - INTERNATIONAL
          ============================================ */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">International Services</h4>
              <ul className="space-y-2">
                {['Airport Transfers', 'Crew Transport', 'Cross-border', 'Tours & Excursions'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-blue-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Destinations</h4>
              <ul className="space-y-2">
                {['Europe', 'Middle East', 'North America', 'Asia Pacific'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-blue-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                {['Emergency Line', 'Travel Documents', 'Border Info', 'Contact'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-blue-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Global Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-white font-medium">+31 20 123 4567</div>
                    <div className="text-sm">International hotline</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-white font-medium">international@taxi.nl</div>
                    <div className="text-sm">Global inquiries</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 International Taxi Service. Worldwide transportation specialists.</p>
            <div className="flex gap-4">
              <span className="text-blue-400 font-semibold">IATA Certified</span>
              <span className="text-blue-400 font-semibold">Global Coverage</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}