export const metadata = {
  title: "VIP Class Taxi – Exclusief Luxe Vervoer met Privéchauffeur | Premium Service",
  description:
    "VIP Class taxi service voor het meest exclusieve vervoer. Mercedes S-Klasse, persoonlijke chauffeur en maximale privacy. Boek nu je VIP taxirit.",
  keywords: "VIP taxi, luxe vervoer, privéchauffeur, exclusief vervoer, Mercedes S-Klasse, VIP service, premium chauffeur, discrete taxi",
  openGraph: {
    title: "VIP Class Taxi – Exclusief Luxe Vervoer",
    description: "Het summum van luxe vervoer met Mercedes S-Klasse en persoonlijke chauffeur",
    type: "website",
  },
};

export default function VIPClassPage() {
  return (
    <main className="space-y-32">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* LEFT */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-500/30">
              <span className="text-amber-400">★</span>
              VIP Exclusief
            </span>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              VIP Class Taxi
              <span className="block text-amber-400 text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Het Summum van Luxe Vervoer
              </span>
            </h1>
            
            <p className="text-xl text-neutral-300 max-w-xl leading-relaxed">
              Exclusief vervoer in Mercedes S-Klasse of vergelijkbare luxe 
              voertuigen. Met persoonlijke chauffeur, complete privacy en 
              aandacht voor elk detail. Voor wie alleen het beste goed genoeg is.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm pt-4">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <span className="text-2xl">👑</span>
                <div>
                  <div className="font-bold">Mercedes S-Klasse</div>
                  <div className="text-neutral-400 text-xs">Premium vloot</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <span className="text-2xl">🎩</span>
                <div>
                  <div className="font-bold">Persoonlijke Chauffeur</div>
                  <div className="text-neutral-400 text-xs">Exclusief voor u</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <span className="text-2xl">🔒</span>
                <div>
                  <div className="font-bold">Absolute Privacy</div>
                  <div className="text-neutral-400 text-xs">100% discreet</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="font-bold">24/7 Beschikbaar</div>
                  <div className="text-neutral-400 text-xs">Altijd voor u klaar</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="#reserveren"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                Reserveer VIP Class
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#meer-info"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/30 font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                Meer Informatie
              </a>
            </div>
          </div>

          {/* RIGHT – Premium luxury S-Class */}
          <div className="relative h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=1200&auto=format&fit=crop"
              alt="Mercedes S-Klasse VIP taxi - exclusief luxe vervoer"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-neutral-900/20" />
            
            {/* Premium badge */}
            <div className="absolute top-6 left-6 bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
              <span>★</span>
              VIP Premium
            </div>

            {/* Floating premium stats */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md rounded-xl p-5 border border-white/10">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-400">5.0★</div>
                  <div className="text-xs text-neutral-300">Perfect Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">500+</div>
                  <div className="text-xs text-neutral-300">VIP Klanten</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">100%</div>
                  <div className="text-xs text-neutral-300">Discretie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING CARD ================= */}
      <section id="reserveren" className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="rounded-2xl border-2 border-amber-500/20 bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">👑</span>
            <h2 className="text-2xl font-bold text-white">
              Reserveer VIP Class Vervoer
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-semibold text-neutral-300 mb-2 block">
                Ophaallocatie
              </label>
              <input 
                type="text"
                placeholder="Bijv. Hotel Okura Amsterdam"
                className="w-full border-2 border-neutral-700 bg-neutral-800 text-white rounded-lg px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-300 mb-2 block">
                Bestemming
              </label>
              <input 
                type="text"
                placeholder="Bijv. Schiphol Private Wing"
                className="w-full border-2 border-neutral-700 bg-neutral-800 text-white rounded-lg px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-300 mb-2 block">
                Datum & Tijd
              </label>
              <input 
                type="datetime-local"
                className="w-full border-2 border-neutral-700 bg-neutral-800 text-white rounded-lg px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors" 
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl">
                Reserveer Nu
              </button>
            </div>
          </div>

          <p className="text-neutral-400 text-sm mt-4 text-center">
            Voor spoedritten binnen 2 uur, bel: <a href="tel:+31201234567" className="text-amber-400 font-semibold hover:underline">+31 (0)20 123 4567</a>
          </p>
        </div>
      </section>

      {/* ================= WAT MAAKT VIP ANDERS ================= */}
      <section id="meer-info" className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-4">
            Exclusieve Service
          </span>
          <h2 className="text-5xl font-bold text-neutral-900 mb-4">
            Wat Maakt VIP Class Uniek?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            VIP Class is meer dan vervoer – het is een complete premium ervaring 
            waarbij elk detail is afgestemd op uw wensen en verwachtingen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555652108-d8a3c8c25c2b?q=80&w=1200&auto=format&fit=crop"
              alt="Luxe Mercedes S-Klasse interieur met leren bekleding"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
          </div>

          <div className="space-y-6">
            <div className="space-y-5">
              {[
                {
                  icon: "🚗",
                  title: "Mercedes S-Klasse & Luxury Fleet",
                  desc: "Uitsluitend topmodellen met volledige opties en nieuwste technologie"
                },
                {
                  icon: "🎩",
                  title: "Persoonlijke Chauffeur",
                  desc: "Hoogopgeleide, discrete chauffeurs met VIP-training en jarenlange ervaring"
                },
                {
                  icon: "🍾",
                  title: "Premium Voorzieningen",
                  desc: "Champagne, premium water, kranten, wifi, oplaadpunten en klimaatregeling"
                },
                {
                  icon: "🔒",
                  title: "Absolute Discretie",
                  desc: "Volledige privacy gegarandeerd, inclusief getinte ramen en stille bediening"
                },
                {
                  icon: "⏰",
                  title: "Flexibiliteit & Beschikbaarheid",
                  desc: "24/7 bereikbaar, last-minute mogelijk, aanpassing onderweg altijd bespreekbaar"
                },
                {
                  icon: "🎯",
                  title: "Persoonlijke Service",
                  description: "Uw vaste contactpersoon en voorkeuren worden onthouden"
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1 text-lg">{item.title}</h3>
                    <p className="text-neutral-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLEET SHOWCASE ================= */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Onze VIP Vloot
            </h2>
            <p className="text-lg text-neutral-600">
              Alleen de meest luxueuze voertuigen voor uw comfort
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mercedes S-Klasse",
                desc: "De ultieme luxe sedan met alle comfort",
                image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
                features: ["Leren interieur", "Massagestoelen", "Panoramadak"]
              },
              {
                name: "Mercedes V-Klasse VIP",
                desc: "Ruimte en luxe voor groepen tot 6 personen",
                image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?q=80&w=800&auto=format&fit=crop",
                features: ["Lounge zitplaatsen", "Extra beenruimte", "Privacy scherm"]
              },
              {
                name: "BMW 7-Serie",
                desc: "Sportief luxe alternatief met cutting-edge tech",
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
                features: ["Executive Lounge", "Bowers & Wilkins", "Gesture Control"]
              },
            ].map((vehicle) => (
              <div key={vehicle.name} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative h-56">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    VIP
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{vehicle.name}</h3>
                  <p className="text-neutral-600 mb-4">{vehicle.desc}</p>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                        <span className="text-amber-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PREMIUM VOORZIENINGEN ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Inclusief Premium Voorzieningen
          </h2>
          <p className="text-lg text-neutral-600">
            Alles voor een onvergetelijke reiservaring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🍾", title: "Champagne & Drankjes", desc: "Premium selectie op aanvraag" },
            { icon: "📰", title: "Kranten & Magazines", desc: "Dagelijkse pers en business media" },
            { icon: "📱", title: "High-Speed WiFi", desc: "Onbeperkt internet onderweg" },
            { icon: "🔌", title: "USB & Wireless Charging", desc: "Voor al uw apparaten" },
            { icon: "🎵", title: "Premium Audio", desc: "Bose of Burmester geluidssysteem" },
            { icon: "🌡️", title: "Klimaatregeling", desc: "4-zone climate control" },
            { icon: "💺", title: "Massage Stoelen", desc: "Verwarmde en ventilerende zetels" },
            { icon: "🎬", title: "Entertainment", desc: "Schermen met streaming mogelijkheden" },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 hover:border-amber-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full mb-4 border border-amber-500/30">
              Perfect Voor
            </span>
            <h2 className="text-4xl font-bold mb-4">Wanneer Kiest u VIP Class?</h2>
            <p className="text-neutral-400 text-lg">
              Voor momenten waar alleen het beste goed genoeg is
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎭",
                title: "Celebrity & Artiesten",
                desc: "Discrete vervoer voor bekende personen en entertainment professionals"
              },
              {
                icon: "💼",
                title: "C-Level Executives",
                desc: "CEO's, bestuurders en top executives die absolute privacy vereisen"
              },
              {
                icon: "💎",
                title: "Luxury Shopping",
                desc: "P.C. Hooftstraat, boutiques en exclusive shopping experiences"
              },
              {
                icon: "🏛️",
                title: "Diplomatic Service",
                desc: "Vervoer voor ambassades, delegaties en hoogwaardigheidsbekleders"
              },
              {
                icon: "💒",
                title: "Special Occasions",
                desc: "Huwelijken, galas, premieres en bijzondere evenementen"
              },
              {
                icon: "✈️",
                title: "Private Aviation",
                desc: "Transfer naar private terminals en business aviation centers"
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-colors border border-neutral-700 hover:border-amber-500/30"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CHAUFFEUR SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[560px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
              alt="Professionele VIP chauffeur - discreet en ervaren"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
          </div>

          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Onze Chauffeurs
            </span>
            <h2 className="text-4xl font-bold text-neutral-900">
              VIP Gecertificeerde Chauffeurs
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Onze VIP chauffeurs zijn meer dan bestuurders – het zijn 
              gediplomeerde professionals met jarenlange ervaring in het 
              vervoeren van hooggeplaatste gasten, celebrities en 
              diplomatiek personeel.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl">
                <span className="text-3xl">🎓</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">VIP Security Training</h4>
                  <p className="text-sm text-neutral-600">
                    Gecertificeerd in discrete security en privacy protocollen
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl">
                <span className="text-3xl">🤵</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Professionele Presentatie</h4>
                  <p className="text-sm text-neutral-600">
                    Altijd in stijlvol uniform, verzorgd en representatief
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl">
                <span className="text-3xl">🌍</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Meertalig</h4>
                  <p className="text-sm text-neutral-600">
                    Vloeiend in Nederlands, Engels, en vaak Duits of Frans
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl">
                <span className="text-3xl">🔒</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">NDA & Background Check</h4>
                  <p className="text-sm text-neutral-600">
                    Alle chauffeurs zijn gescreend en hebben NDA getekend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TARIEVEN ================= */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              VIP Class Tarieven
            </h2>
            <p className="text-neutral-600 text-lg">
              Exclusieve service met transparante prijzen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Per rit */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-neutral-200">
              <div className="text-center mb-6">
                <div className="inline-block bg-neutral-100 text-neutral-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                  Per Rit
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                  Vanaf €150
                </h3>
                <p className="text-neutral-600">Voor enkele ritten</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span className="text-neutral-700">Mercedes S-Klasse of gelijkwaardig</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span className="text-neutral-700">Persoonlijke VIP chauffeur</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span className="text-neutral-700">Premium voorzieningen inclusief</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span className="text-neutral-700">30 min. gratis wachttijd</span>
                </li>
              </ul>

              <a
                href="#reserveren"
                className="block text-center py-3 rounded-lg border-2 border-neutral-900 font-bold hover:bg-neutral-900 hover:text-white transition-all"
              >
                Rit Boeken
              </a>
            </div>

            {/* Per uur */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl shadow-xl p-8 border-2 border-amber-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white text-amber-600 px-3 py-1 rounded-full text-xs font-bold">
                POPULAIR
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm mb-4">
                  Beschikbaarheid
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  €175/uur
                </h3>
                <p className="text-amber-100">Minimaal 3 uur</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span>Volledige beschikbaarheid van voertuig</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span>Flexibel route wijzigen mogelijk</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span>Ideaal voor meetings & evenementen</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                  <span>Chauffeur blijft beschikbaar</span>
                </li>
              </ul>

              <a
                href="#reserveren"
                className="block text-center py-3 rounded-lg bg-white text-amber-600 font-bold hover:bg-neutral-50 transition-all shadow-lg"
              >
                Reserveer Per Uur
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-600 mb-4">
              <strong>Vraag naar onze dagprijzen</strong> voor extended availability (8+ uur)
            </p>
            <p className="text-sm text-neutral-500">
              Alle prijzen zijn inclusief BTW, brandstof, parkeren en tolwegen
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">⭐⭐⭐⭐⭐</span>
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Wat Onze VIP Klanten Zeggen
          </h2>
          <p className="text-neutral-600 text-lg">
            Vertrouwd door executives, celebrities en diplomaten
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              review: "Absolute discretie en professionaliteit. De chauffeur was onzichtbaar aanwezig maar altijd attent. Precies wat we nodig hadden voor onze CEO.",
              name: "Confidential",
              title: "Fortune 500 Company",
              rating: 5
            },
            {
              review: "Van begin tot eind een perfecte ervaring. De Mercedes was makeloos en de chauffeur sprak vloeiend Engels en Duits. Echte VIP service.",
              name: "Alexandra M.",
              title: "Event Organizer",
              rating: 5
            },
            {
              review: "We gebruiken deze service al jaren voor onze internationale gasten. Altijd betrouwbaar, luxe en discreet. Onze vaste partner.",
              name: "Confidential",
              title: "Luxury Hotel Amsterdam",
              rating: 5
            },
          ].map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-neutral-200 bg-white p-8 shadow-lg hover:shadow-xl hover:border-amber-300 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-2xl">★</span>
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed italic">
                "{review.review}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
                <div>
                  <div className="font-bold text-neutral-900">{review.name}</div>
                  <div className="text-sm text-neutral-600">{review.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-neutral-600 text-lg">
              Alles wat u moet weten over VIP Class vervoer
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Wat is het verschil tussen Business Class en VIP Class?",
                a: "VIP Class biedt het absolute summum: Mercedes S-Klasse (vs E-Klasse), persoonlijke chauffeur met VIP-training, champagne en premium drankjes, absolute discretie garantie, en extra voorzieningen zoals massage stoelen en entertainment systemen."
              },
              {
                q: "Kan ik specifieke verzoeken doen?",
                a: "Absoluut. Of het nu gaat om specifieke drankjes, bepaalde muziek, temperatuur voorkeur of route wensen – wij stemmen alles af op uw wensen. Neem voor speciale verzoeken contact op bij de reservering."
              },
              {
                q: "Hoe wordt mijn privacy gewaarborgd?",
                a: "Alle chauffeurs hebben een NDA getekend en zijn getraind in discrete service. Voertuigen hebben getinte ramen, privacy schermen zijn op verzoek beschikbaar, en geen enkele informatie wordt gedeeld met derden."
              },
              {
                q: "Is last-minute boeken mogelijk?",
                a: "Voor VIP Class adviseren we minimaal 48 uur van tevoren te boeken voor optimale beschikbaarheid. Spoedritten zijn vaak mogelijk – neem telefonisch contact op voor availability."
              },
              {
                q: "Wat gebeurt er als mijn plannen wijzigen?",
                a: "Bij beschikbaarheid boekingen kunt u flexibel van route wisselen. Voor vaste ritten geldt: annulering tot 24 uur van tevoren is kosteloos, binnen 24 uur rekenen wij 50% van het bedrag."
              },
              {
                q: "Bieden jullie ook multi-day service?",
                a: "Ja, voor extended availability (meerdere dagen) bieden we aantrekkelijke dagprijzen. Perfect voor conferenties, zakelijke bezoeken of special events. Neem contact op voor een offerte op maat."
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border-2 border-neutral-200 p-6 hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <summary className="font-bold text-neutral-900 cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform text-xl">▼</span>
                </summary>
                <p className="mt-4 text-neutral-600 leading-relaxed pl-2">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-32 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-500/30">
            <span>★</span>
            Exclusieve VIP Service
          </span>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Ervaar Het Verschil van
            <span className="block text-amber-400 mt-2">VIP Class Vervoer</span>
          </h2>
          
          <p className="text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            Voor wie alleen het beste goed genoeg is. Mercedes S-Klasse, 
            persoonlijke chauffeur en complete discretie. Boek nu uw 
            exclusieve VIP ervaring.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="#reserveren"
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-2xl hover:shadow-amber-500/50 transform hover:-translate-y-0.5"
            >
              Reserveer VIP Class
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="tel:+31201234567"
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-neutral-900 transition-all"
            >
              <span className="mr-2">📞</span>
              Direct Contact
            </a>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-amber-400 mb-2">24/7</div>
              <div className="text-sm text-neutral-400">Persoonlijke service bereikbaar</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-sm text-neutral-400">Discretie gegarandeerd</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-amber-400 mb-2">5.0★</div>
              <div className="text-sm text-neutral-400">VIP klant tevredenheid</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCHEMA.ORG JSON-LD FOR SEO ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LuxuryService",
            "name": "VIP Class Taxi Service",
            "description": "Exclusief VIP vervoer met Mercedes S-Klasse en persoonlijke chauffeur voor maximale luxe en privacy",
            "provider": {
              "@type": "TaxiService",
              "name": "VIP Taxi Service"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Nederland"
            },
            "priceRange": "€€€€",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "500"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "EUR",
              "price": "150",
              "description": "VIP Class vervoer per rit"
            }
          })
        }}
      />
    </main>
  );
}