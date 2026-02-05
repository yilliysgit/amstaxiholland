"use client";
import React, { useState } from 'react';

export default function EvenementenTaxiPage() {
  const [bookingData, setBookingData] = useState({
    eventType: '',
    eventName: '',
    date: '',
    time: '',
    pickupAddress: '',
    eventAddress: '',
    guests: '1',
    vehicleType: 'business',
    specialRequests: ''
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeEvent, setActiveEvent] = useState(0);
  const [isOrganizer, setIsOrganizer] = useState(false);

  const eventTypes = [
    {
      id: 'concert',
      icon: '🎵',
      title: 'Concerten',
      description: 'Veilig naar en van concerten en festivals',
      features: ['Late night service', 'Groepsvervoer', 'Vaste prijzen', 'Ervaren chauffeurs'],
      popular: ['AFAS Live', 'Ziggo Dome', 'Festivals', 'Club events']
    },
    {
      id: 'wedding',
      icon: '💍',
      title: 'Bruiloften',
      description: 'Elegant vervoer voor uw speciale dag',
      features: ['Luxe voertuigen', 'Tijdscoördinatie', 'Decoratie mogelijk', 'Discrete service'],
      popular: ['Trouwlocaties', 'Feestlocaties', 'Hotels', 'Landgoederen']
    },
    {
      id: 'corporate',
      icon: '🏢',
      title: 'Bedrijfsfeesten',
      description: 'Professioneel vervoer voor zakelijke evenementen',
      features: ['Facturatie', 'Professionele chauffeurs', 'WiFi aan boord', 'Flexibele uren'],
      popular: ['Kerstfeesten', 'Jubilea', 'Teamuitjes', 'Conferenties']
    },
    {
      id: 'festival',
      icon: '🎪',
      title: 'Dansfestivals',
      description: 'Energieke service voor festivalgangers',
      features: ['24/7 beschikbaar', 'Groepsdiscount', 'Bagage ruimte', 'Festival kennis'],
      popular: ['Mysteryland', 'Defqon.1', 'Awakenings', 'Amsterdam Dance Event']
    },
    {
      id: 'sports',
      icon: '⚽',
      title: 'Sportevenementen',
      description: 'Vervoer naar wedstrijden en sportevenementen',
      features: ['Drukke evenementen expertise', 'Snelle routes', 'Groepsvervoer', 'Parkeer kennis'],
      popular: ['Johan Cruijff ArenA', 'Rotterdam Ahoy', 'Goffertstadion', 'Sportparken']
    },
    {
      id: 'gathering',
      icon: '👥',
      title: 'Bijeenkomsten',
      description: 'Betrouwbaar vervoer voor familie en vrienden',
      features: ['Flexibele planning', 'Multiple stops', 'Vaste prijzen', 'Vriendelijke service'],
      popular: ['Verjaardagen', 'Familiefeesten', 'Reünies', 'Community events']
    }
  ];

  const vehicleOptions = [
    {
      type: 'Business Cab',
      icon: '🚗',
      capacity: 'max. 4 pers',
      description: 'Uitermate geschikt voor gala\'s, trouwerijen en exclusieve feesten',
      features: ['Elegant design', 'Comfortabele seating', 'Professionele chauffeur', 'Air conditioning'],
      price: 'Vanaf €45'
    },
    {
      type: 'VIP Vervoer',
      icon: '⭐',
      capacity: 'max. 4 pers',
      description: 'Voor al uw speciale gasten, hebben wij een onderscheidende VIP vervoer service',
      features: ['Premium voertuigen', 'Persoonlijke service', 'Luxe interieur', 'VIP behandeling'],
      price: 'Vanaf €65'
    },
    {
      type: 'Minivan',
      icon: '🚐',
      capacity: 'max. 8 pers',
      description: 'Beste keuze voor groepen tot 8 personen',
      features: ['Ruime interieur', 'Extra bagageruimte', 'Comfort voor groepen', 'Ideaal voor feesten'],
      price: 'Vanaf €85'
    }
  ];

  const eventPackages = [
    {
      name: 'Retour Service',
      description: 'Heen en terug op vaste tijden',
      price: 'Vaste prijs',
      features: ['Vast tijdstip heen', 'Vast tijdstip terug', 'Geen verrassingen', 'Ideaal voor geplande evenementen']
    },
    {
      name: 'Flex Service',
      description: 'Flexibele ophaaltijden na het evenement',
      price: 'Basis + wachttijd',
      features: ['Vaste heen rit', 'Flexibele terug rit', 'Perfect voor feesten', 'Geen haast']
    },
    {
      name: 'Groepsarrangement',
      description: 'Compleet arrangement voor groepen',
      price: 'Groepskorting',
      features: ['Meerdere voertuigen', 'Gecoördineerde planning', 'Specialistische begeleiding', 'Korting vanaf 10 personen']
    }
  ];

  const popularEvents = [
    {
      category: 'Concerten & Festivals',
      events: [
        { name: 'Concert Ziggo Dome', price: '€35-50', time: 'Afhankelijk van show', features: ['Late night', 'Groepsvervoer'] },
        { name: 'Festival terrein', price: '€40-60', time: 'Hele dag service', features: ['Multi-stop', 'Bagage'] },
        { name: 'Club nacht', price: '€25-40', time: 'Na 02:00 uur', features: ['24/7', 'Veilig'] },
        { name: 'Theater voorstelling', price: '€30-45', time: 'Avond service', features: ['Elegant', 'Stipt'] }
      ]
    },
    {
      category: 'Speciale Gelegenheden',
      events: [
        { name: 'Trouwerij ceremonie', price: '€50-75', time: 'Hele dag', features: ['Luxe service', 'Decoratie'] },
        { name: 'Bedrijfsfeest', price: '€45-65', time: 'Avond/nacht', features: ['Professioneel', 'Facturatie'] },
        { name: 'Verjaardagsfeest', price: '€35-55', time: 'Flexibel', features: ['Gezellig', 'Multiple stops'] },
        { name: 'Familie reünie', price: '€40-60', time: 'Dag/avond', features: ['Groepsvervoer', 'Flexibel'] }
      ]
    }
  ];

  const faqs = [
    {
      question: 'Hoe ver van tevoren moet ik een evenementen taxi reserveren?',
      answer: 'Voor grote evenementen en weekenden adviseren we minimaal 2 weken van tevoren te reserveren. Voor last-minute boekingen zijn we 24/7 beschikbaar, maar beschikbaarheid kan beperkt zijn tijdens drukke periodes.'
    },
    {
      question: 'Kunnen jullie grote groepen naar evenementen vervoeren?',
      answer: 'Absoluut! We hebben minivans voor groepen tot 8 personen en kunnen meerdere voertuigen coördineren voor grotere groepen. Voor groepen vanaf 10 personen bieden we speciale groepskorting.'
    },
    {
      question: 'Wat als het evenement uitloopt of eerder eindigt?',
      answer: 'Geen probleem! Bij onze Flex Service kunt u bellen wanneer u klaar bent om opgehaald te worden. We houden rekening met eventuele vertragingen bij evenementen.'
    },
    {
      question: 'Zijn jullie beschikbaar tijdens late uren na feesten?',
      answer: 'Ja, we zijn 24/7 beschikbaar, speciaal voor evenementen en feesten. Onze nachtelijke service zorgt ervoor dat u veilig thuis komt, wanneer het feest ook eindigt.'
    },
    {
      question: 'Kunnen jullie helpen met pendeldiensten voor evenement organisatoren?',
      answer: 'Zeker! We werken regelmatig samen met evenement organisatoren voor pendeldiensten. Neem contact op voor een offerte op maat voor uw evenement.'
    },
    {
      question: 'Wat zijn de voordelen van vaste prijzen voor evenementen?',
      answer: 'Vaste prijzen betekenen geen verrassingen. U weet vooraf exact wat u betaalt, ongeacht het verkeer of de drukte. Geen woekerprijzen, altijd eerlijke tarieven.'
    }
  ];

  const handleCalculatePrice = () => {
    // Price calculation logic
    console.log('Calculating price for:', bookingData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking data:', bookingData);
  };

  return (
    <div className="bg-white font-sans antialiased">
      
      {/* ============================================
          1. HERO - EVENTS FOCUS
          ============================================ */}
      <section className="relative bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 overflow-hidden min-h-screen flex items-center">
        {/* Background with event imagery */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2670')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-red-900/80"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20">🎉</div>
        <div className="absolute top-40 right-20 text-4xl opacity-30">🎵</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-25">⭐</div>

        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl py-16">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="lg:col-span-3 space-y-6 text-white">
              <div className="inline-block px-4 py-2 bg-pink-600/30 backdrop-blur-sm rounded-full border border-pink-400/30">
                <span className="text-pink-100 text-sm font-medium">🎪 Evenementen Taxi Specialist</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Veilig Thuis
                <span className="block text-pink-300 font-light">Na Het Feest</span>
              </h1>

              <p className="text-xl text-pink-100 font-light leading-relaxed max-w-2xl">
                Helemaal jezelf zijn op het feest of evenement, in de wetenschap dat je veilig thuis komt. 
                Dat is al een voorspoedig begin van uw avond.
              </p>

              {/* Quick USPs */}
              <div className="flex flex-wrap gap-4 pt-4">
                {['Vaste Prijzen', '24/7 Service', 'Groepsvervoer', 'Hele Benelux'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-pink-100">
                    <svg className="w-5 h-5 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Trust stats */}
              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-pink-600/30">
                {[
                  {num: '50K+', label: 'Feestgangers'},
                  {num: '100%', label: 'Veilig thuis'},
                  {num: '24/7', label: 'Feest service'}
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-pink-300">{stat.num}</div>
                    <div className="text-sm text-pink-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Emergency CTA */}
              <div className="pt-6">
                <a href="tel:+31201234567" className="inline-flex items-center gap-3 text-2xl font-bold text-white hover:text-pink-300 transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  020 - 123 4567
                </a>
                <p className="text-sm text-pink-200 mt-1">24/7 Evenementen lijn • Directe hulp</p>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">Evenementen Taxi Boeken</h3>
                  <p className="text-sm text-slate-600">Veilig naar uw feest en weer terug</p>
                </div>

                {/* Toggle between Guest and Organizer */}
                <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
                  <button
                    onClick={() => setIsOrganizer(false)}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      !isOrganizer ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Als Gast
                  </button>
                  <button
                    onClick={() => setIsOrganizer(true)}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      isOrganizer ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Als Organisator
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {isOrganizer ? 'Type Evenement *' : 'Waar gaat u heen? *'}
                    </label>
                    <select
                      required
                      value={bookingData.eventType}
                      onChange={(e) => setBookingData({...bookingData, eventType: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Kies type evenement...</option>
                      <option value="concert">Concert</option>
                      <option value="wedding">Bruiloft</option>
                      <option value="corporate">Bedrijfsfeest</option>
                      <option value="festival">Dansfestival</option>
                      <option value="sports">Sportevenement</option>
                      <option value="gathering">Bijeenkomst</option>
                      <option value="other">Ander feest</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {isOrganizer ? 'Evenement Naam *' : 'Naam Evenement/Locatie *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isOrganizer ? "Bijv. Company Christmas Party" : "Bijv. Concert Ziggo Dome"}
                      value={bookingData.eventName}
                      onChange={(e) => setBookingData({...bookingData, eventName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Datum *</label>
                      <input
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Tijd *</label>
                      <input
                        type="time"
                        required
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ophaaladres *</label>
                    <input
                      type="text"
                      required
                      placeholder="Uw thuisadres of verzamelpunt"
                      value={bookingData.pickupAddress}
                      onChange={(e) => setBookingData({...bookingData, pickupAddress: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Aantal Personen</label>
                      <select
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'persoon' : 'personen'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Type Voertuig</label>
                      <select
                        value={bookingData.vehicleType}
                        onChange={(e) => setBookingData({...bookingData, vehicleType: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="business">Business Cab</option>
                        <option value="vip">VIP Vervoer</option>
                        <option value="minivan">Minivan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Speciale Verzoeken</label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                      rows={2}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Decoratie, meerdere stops, etc."
                    />
                  </div>
                </form>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleCalculatePrice}
                    className="w-full py-4 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Prijs Berekenen
                  </button>

                  <button className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Direct Reserveren
                  </button>
                </div>

                <p className="text-xs text-center text-slate-500 pt-2">
                  ✓ Vaste prijzen • ✓ 24/7 support • ✓ Hele Benelux
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          2. EVENT TYPES
          ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Naar Welk Soort Evenement Gaat U?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Onze evenementen taxi service strekt zich uit over alle soorten feesten en evenementen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-8 hover:border-pink-500 hover:shadow-lg transition-all group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{event.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{event.title}</h3>
                <p className="text-pink-600 font-semibold mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-bold text-slate-900 text-sm">INCLUSIEF:</h4>
                  {event.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">POPULAIR:</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.popular.map((item, j) => (
                      <span key={j} className="px-2 py-1 bg-white border border-pink-200 rounded-full text-xs text-pink-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 py-3 border-2 border-pink-600 text-pink-600 font-bold rounded-lg hover:bg-pink-600 hover:text-white transition-colors">
                  Boek voor {event.title}
                </button>
              </div>
            ))}
          </div>

          {/* Other Event CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Een ander feest of evenement?</p>
            <button className="text-pink-600 font-bold hover:text-pink-700 underline">
              Neem even contact op →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          3. VEHICLE OPTIONS
          ============================================ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Met Hoeveel Personen En Met Welke Auto Gaat U?
            </h2>
            <p className="text-xl text-slate-600">
              Kies het voertuig dat perfect past bij uw evenement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vehicleOptions.map((vehicle, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-pink-500 hover:shadow-2xl transition-all duration-300 group">
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{vehicle.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{vehicle.type}</h3>
                  <div className="text-pink-600 font-bold text-lg mb-3">{vehicle.capacity}</div>
                  <p className="text-slate-600 mb-6">{vehicle.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {vehicle.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-3xl font-bold text-pink-600 mb-4">{vehicle.price}</div>
                  
                  <button className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors">
                    Kies Deze Auto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          4. SERVICE PACKAGES
          ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Hoe Wilt U Vervoerd Worden?
            </h2>
            <p className="text-xl text-slate-600">
              Flexibele servicepakketten voor elk type evenement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eventPackages.map((pkg, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-8 hover:border-pink-500 hover:shadow-lg transition-all text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                <p className="text-pink-600 font-semibold mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-slate-900 mb-6">{pkg.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-700">
                      <svg className="w-5 h-5 text-pink-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors">
                  Kies Dit Pakket
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          5. POPULAR EVENTS & PRICING
          ============================================ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-purple-900 to-pink-800 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Populaire Evenementen
            </h2>
            <p className="text-xl text-pink-100">
              Vaste tarieven voor de meest geboekte evenementen
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {popularEvents.map((category, i) => (
              <button
                key={i}
                onClick={() => setActiveEvent(i)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeEvent === i
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {popularEvents[activeEvent].events.map((event, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:border-pink-400 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                    <p className="text-pink-200">{event.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-300">{event.price}</div>
                    <div className="text-sm text-pink-200">per rit</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {event.features.map((feature, j) => (
                    <span key={j} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-pink-100 transition-colors">
                  Boek Dit Evenement
                </button>
              </div>
            ))}
          </div>

          {/* Custom Event CTA */}
          <div className="text-center mt-12">
            <p className="text-pink-200 mb-4">Staat uw evenement er niet tussen?</p>
            <button className="text-white font-bold hover:text-pink-300 underline">
              Vraag een offerte aan voor uw evenement →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          6. HOW IT WORKS - EVENT FOCUS
          ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Hoe Onze Taxi U Naar Uw Evenement Brengt
            </h2>
            <p className="text-xl text-slate-600">
              Of je nu alleen bent of in groepsverband, het feest begint al onderweg
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Reserveer',
                description: 'Boek online, via app of telefoon voor uw evenement',
                icon: '📅'
              },
              {
                step: '2',
                title: 'Geniet',
                description: 'U wordt opgehaald en veilig naar het evenement gebracht',
                icon: '🎉'
              },
              {
                step: '3',
                title: 'Feest',
                description: 'Helemaal uzelf zijn, wetende dat u veilig thuis komt',
                icon: '⭐'
              },
              {
                step: '4',
                title: 'Word Opgehaald',
                description: 'Wij halen u op wanneer u klaar bent, dag en nacht',
                icon: '🚗'
              },
              {
                step: '5',
                title: 'Veilig Thuis',
                description: 'Ontspannen thuiskomen na een geweldige avond',
                icon: '🏠'
              },
              {
                step: '6',
                title: 'Betaal',
                description: 'Vaste prijs, geen verrassingen. Eenvoudig betalen',
                icon: '💳'
              }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          7. ORGANIZER SERVICES
          ============================================ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 to-purple-900 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-600/30 backdrop-blur-sm rounded-full border border-purple-400/30 mb-4">
              <span className="text-purple-100 text-sm font-medium">🏢 Voor Evenement Organisatoren</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pendeldiensten Voor Uw Evenement
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Bent u organisator van een feest en zoekt u een betrouwbare partner als pendeldienst?
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Complete Transportoplossingen</h3>
              <p className="text-purple-100 mb-6 leading-relaxed">
                AmstaxiHolland biedt de mogelijkheid om organisatoren van feesten en evenementen 
                het transport van de gasten te verzorgen. Van kleine bijeenkomsten tot grote festivals.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Gecoördineerde pendeldiensten',
                  'Dedicated evenementen manager',
                  'Real-time tracking voor organisatoren',
                  'Flexibele capaciteit planning',
                  'Professionele chauffeurs met evenementen training',
                  '24/7 support tijdens uw evenement'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-purple-100">
                    <svg className="w-6 h-6 text-pink-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="px-8 py-4 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors">
                Offerte voor Organisatoren
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
              <h4 className="text-2xl font-bold mb-6 text-center">Evenementen Partners</h4>
              <div className="space-y-4">
                {[
                  { event: 'Muziek Festivals', clients: 'Mysteryland, Defqon.1, ADE' },
                  { event: 'Sport Evenementen', clients: 'Johan Cruijff ArenA, Ahoy' },
                  { event: 'Bedrijfsfeesten', clients: 'Fortune 500 bedrijven' },
                  { event: 'Trouwerijen', clients: 'Luxe trouwlocaties in heel Nederland' }
                ].map((partner, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="font-bold text-white">{partner.event}</div>
                      <div className="text-purple-200 text-sm">{partner.clients}</div>
                    </div>
                    <div className="text-pink-400 font-bold">✓</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          8. COVERAGE AREA
          ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Waar Vervoeren Wij U?
            </h2>
            <p className="text-xl text-slate-600">
              Ongeacht de locatie van het evenement of feest
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-300 rounded-2xl aspect-video flex items-center justify-center border-2 border-slate-400">
              <div className="text-center text-slate-600">
                <svg className="w-24 h-24 mx-auto mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="font-medium">Dekkingskaart Evenementen</p>
                <p className="text-sm">(Nederland, Benelux, Duitsland)</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Hele Benelux & Duitsland</h3>
                <p className="text-slate-600 mb-4">
                  Wij vervoeren u naar elke plaats in Nederland of in de Benelux en Duitsland 
                  waar de activiteiten plaatsvinden.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { country: 'Nederland', cities: 'Amsterdam, Rotterdam, Utrecht' },
                    { country: 'België', cities: 'Brussel, Antwerpen, Gent' },
                    { country: 'Luxemburg', cities: 'Luxemburg-stad' },
                    { country: 'Duitsland', cities: 'Düsseldorf, Köln, Berlin' }
                  ].map((location, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="font-bold text-slate-900">{location.country}</div>
                      <div className="text-sm text-slate-600">{location.cities}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 mb-2">🌍 Internationale Evenementen</h4>
                <p className="text-slate-700 mb-4">
                  Ook voor evenementen over de grens staan we voor u klaar. 
                  Onze chauffeurs zijn bekend met internationale routes en formaliteiten.
                </p>
                <button className="text-pink-600 font-bold hover:text-pink-700">
                  Internationale Evenementen →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          9. FAQ - EVENTS FOCUS
          ============================================ */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-xl text-slate-600">
              Alles wat u wilt weten over onze evenementen service
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-pink-500 transition-colors">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-pink-50/50 transition-colors"
                >
                  <span className="text-lg font-bold text-slate-900 pr-4">{faq.question}</span>
                  <svg 
                    className={`w-6 h-6 text-pink-600 flex-shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === i && (
                  <div className="px-6 py-5 bg-pink-50 border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          10. FINAL CTA - EVENTS FOCUS
          ============================================ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Klaar Om Te Feesten?
          </h2>
          <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
            Reserveer nu uw evenementen taxi en geniet met een gerust hart. 
            Wij zorgen dat u veilig thuiskomt na een geweldige avond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-10 py-4 bg-white text-purple-700 font-bold rounded-lg hover:bg-pink-50 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Direct Reserveren
            </button>
            <a href="tel:+31201234567" className="px-10 py-4 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-all hover:scale-105 flex items-center justify-center gap-2 border border-pink-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              020 - 123 4567
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-pink-100">
            {['Vaste Prijzen', '24/7 Service', 'Hele Benelux', 'Veilig Thuis'].map((item, i) => (
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
          11. FOOTER - EVENTS FOCUS
          ============================================ */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Evenementen Services</h4>
              <ul className="space-y-2">
                {['Concerten', 'Bruiloften', 'Bedrijfsfeesten', 'Festivals'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-pink-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Voor Organisatoren</h4>
              <ul className="space-y-2">
                {['Pendeldiensten', 'Evenementen Planning', 'Groepsvervoer', 'Partnership'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-pink-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                {['Evenementen Helpdesk', 'Noodnummer', 'Contact', 'FAQ'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-pink-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Evenementen Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-pink-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-white font-medium">020 - 123 4567</div>
                    <div className="text-sm">Evenementen lijn</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-pink-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-white font-medium">evenementen@taxi.nl</div>
                    <div className="text-sm">Organisatoren</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 Evenementen Taxi Service. Veilig thuis na elk feest.</p>
            <div className="flex gap-4">
              <span className="text-pink-400 font-semibold">Hele Benelux</span>
              <span className="text-pink-400 font-semibold">24/7 Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}