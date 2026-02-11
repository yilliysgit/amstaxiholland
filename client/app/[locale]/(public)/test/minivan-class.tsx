export const metadata = {
  title: "Luxe Minivan Vervoer – Groepsvervoer met Chauffeur | 6-8 Personen",
  description:
    "Luxe minivan vervoer voor groepen tot 8 personen. Mercedes V-Klasse met chauffeur, perfect voor zakelijk groepsvervoer, familie-uitjes en events. Boek nu.",
  keywords: "luxe minivan, groepsvervoer, Mercedes V-Klasse, minibus chauffeur, 8 personen taxi, groepstransport, familie vervoer, event shuttle",
  openGraph: {
    title: "Luxe Minivan Vervoer – Groepsvervoer met Chauffeur",
    description: "Comfortabel groepsvervoer in Mercedes V-Klasse voor 6-8 personen",
    type: "website",
  },
};

export default function MinivanLuxuryPage() {
  return (
    <main className="space-y-32">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* LEFT */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-100 px-4 py-2 rounded-full">
              <span>👥</span>
              Groepsvervoer Premium
            </span>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-neutral-900">
              Luxe Minivan Vervoer
              <span className="block text-blue-600 text-3xl md:text-4xl font-semibold mt-3">
                Samen Reizen in Comfort & Stijl
              </span>
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-xl leading-relaxed">
              Professioneel groepsvervoer in luxe Mercedes V-Klasse voor 
              6-8 personen. Perfect voor zakelijke teams, familie-uitjes, 
              luchthavenshuttles en events. Ruim, comfortabel en stijlvol.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
                <span className="text-3xl">🚐</span>
                <div>
                  <div className="font-bold text-neutral-900">6-8 Personen</div>
                  <div className="text-neutral-600 text-sm">Ruimte voor iedereen</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
                <span className="text-3xl">🧳</span>
                <div>
                  <div className="font-bold text-neutral-900">Ruime Bagageruimte</div>
                  <div className="text-neutral-600 text-sm">Volop opbergruimte</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
                <span className="text-3xl">💺</span>
                <div>
                  <div className="font-bold text-neutral-900">Lounge Zetels</div>
                  <div className="text-neutral-600 text-sm">Luxe comfort</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
                <span className="text-3xl">📱</span>
                <div>
                  <div className="font-bold text-neutral-900">WiFi & Entertainment</div>
                  <div className="text-neutral-600 text-sm">Altijd verbonden</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="#boeken"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Boek Groepsvervoer
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#informatie"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all"
              >
                Meer Informatie
              </a>
            </div>
          </div>

          {/* RIGHT – Mercedes V-Class image */}
          <div className="relative h-[520px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop"
              alt="Luxe Mercedes V-Klasse minivan - comfortabel groepsvervoer voor 6-8 personen"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
            
            {/* Capacity badge */}
            <div className="absolute top-6 left-6 bg-blue-600 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
              <span>👥</span>
              6-8 Personen
            </div>

            {/* Floating stats card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-xs text-neutral-600">Zitplaatsen</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">6-8</div>
                  <div className="text-xs text-neutral-600">Koffers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">4.8★</div>
                  <div className="text-xs text-neutral-600">Beoordeling</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING CARD ================= */}
      <section id="boeken" className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="rounded-2xl border bg-white shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🚐</span>
            <h2 className="text-2xl font-bold text-neutral-900">
              Boek Luxe Minivan Vervoer
            </h2>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Ophaallocatie
              </label>
              <input 
                type="text"
                placeholder="Startpunt groep"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Bestemming
              </label>
              <input 
                type="text"
                placeholder="Eindbestemming"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Datum & Tijd
              </label>
              <input 
                type="datetime-local"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Aantal Personen
              </label>
              <select className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors">
                <option>1-3 personen</option>
                <option>4-5 personen</option>
                <option>6-7 personen</option>
                <option>8 personen</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                Boek Nu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST INDICATORS ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚐", title: "Mercedes V-Klasse", desc: "Premium minivans" },
            { icon: "👔", title: "Professionele Chauffeur", desc: "Ervaren & vriendelijk" },
            { icon: "🧳", title: "Ruime Bagageruimte", desc: "Voor alle koffers" },
            { icon: "💺", title: "Lounge Comfort", desc: "Luxe zetels & beenruimte" },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 transition-colors border border-blue-100"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-neutral-900 mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WAT IS MINIVAN LUXURY ================= */}
      <section id="informatie" className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Groepsvervoer
            </span>
            <h2 className="text-4xl font-bold text-neutral-900">
              Waarom Kiezen voor Luxe Minivan Vervoer?
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Onze luxe minivan service combineert ruimte met comfort. 
              Perfect voor groepen die samen willen reizen zonder in te 
              leveren op luxe en stijl. Of het nu gaat om zakelijk teamvervoer, 
              familie-uitjes of evenementen – iedereen reist comfortabel mee.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl">
                <span className="text-3xl">👥</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">6-8 Comfortabele Zitplaatsen</h4>
                  <p className="text-sm text-neutral-600">
                    Ruime lounge zetels met volop been- en elleboogruimte voor elke passagier
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl">
                <span className="text-3xl">🧳</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Extra Bagageruimte</h4>
                  <p className="text-sm text-neutral-600">
                    Plek voor 6-8 grote koffers plus handbagage – ideaal voor luchthaventrips
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl">
                <span className="text-3xl">💼</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Zakelijk & Privé</h4>
                  <p className="text-sm text-neutral-600">
                    Geschikt voor corporate events, familie-uitjes, bruiloften en meer
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-xl">
                <span className="text-3xl">💰</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Kostenefficient</h4>
                  <p className="text-sm text-neutral-600">
                    Voordeliger dan meerdere taxi's, samen delen = samen besparen
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[560px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?q=80&w=1200&auto=format&fit=crop"
              alt="Mercedes V-Klasse interieur - luxe lounge zetels voor groepsvervoer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Premium Voorzieningen</h2>
            <p className="text-blue-100 text-lg">
              Alles voor een comfortabele groepsreis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Lounge Configuratie",
                desc: "Face-to-face zetels voor sociaal reizen",
                icon: "💺"
              },
              {
                title: "Climate Control",
                desc: "Aparte klimaatregeling voor passagiers",
                icon: "🌡️"
              },
              {
                title: "Premium Audio",
                desc: "Hoogwaardig geluidssysteem",
                icon: "🎵"
              },
              {
                title: "Panoramadak",
                desc: "Licht en ruimtelijk gevoel",
                icon: "🌤️"
              },
              {
                title: "WiFi & USB",
                desc: "Iedereen kan werken of entertainment",
                icon: "📱"
              },
              {
                title: "Privacy Gordijnen",
                desc: "Voor extra privacy onderweg",
                icon: "🔒"
              },
              {
                title: "Verlichting",
                desc: "Sfeerverlichting voor relaxte sfeer",
                icon: "💡"
              },
              {
                title: "Drankhouders",
                desc: "Voor elke passagier",
                icon: "☕"
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/20 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-4">
            Perfect Voor
          </span>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Wanneer Kiest u Luxe Minivan Vervoer?
          </h2>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Van zakelijke teams tot familiefeesten – onze minivans zijn 
            de ideale oplossing voor groepsvervoer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "✈️",
              title: "Luchthaven Groepsvervoer",
              desc: "Perfect voor groepen naar Schiphol, Eindhoven of Rotterdam Airport",
              image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop"
            },
            {
              icon: "💼",
              title: "Corporate Events",
              desc: "Teams naar conferenties, beurzen, bedrijfsuitjes en zakelijke diners",
              image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
            },
            {
              icon: "🎉",
              title: "Evenementen & Feesten",
              desc: "Bruiloften, verjaardagen, gala's en andere speciale gelegenheden",
              image: "https://images.unsplash.com/photo-1519167758481-83f29da8c776?q=80&w=600&auto=format&fit=crop"
            },
            {
              icon: "👨‍👩‍👧‍👦",
              title: "Familie-uitjes",
              desc: "Dagjes uit, pretparken, citytrips met het hele gezin",
              image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop"
            },
            {
              icon: "🏨",
              title: "Hotel Shuttles",
              desc: "Groepsvervoer voor hotels, resorts en accommodaties",
              image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
            },
            {
              icon: "🏟️",
              title: "Sportevenementen",
              desc: "Teams, supporters en groepen naar wedstrijden en evenementen",
              image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop"
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all border border-neutral-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-5xl">{item.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FLEET DETAILS ================= */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Mercedes V-Klasse Luxury
            </h2>
            <p className="text-neutral-600 text-lg">
              De meest luxueuze minivan voor groepsvervoer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1622991433331-37dd1c5e14ce?q=80&w=1200&auto=format&fit=crop"
                alt="Mercedes V-Klasse exterior - luxe minivan voor groepsvervoer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-neutral-900">Specificaties</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">6-8</div>
                  <div className="text-sm text-neutral-600">Passagiers</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">6-8</div>
                  <div className="text-sm text-neutral-600">Grote koffers</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">Lounge</div>
                  <div className="text-sm text-neutral-600">Configuratie</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">Extra</div>
                  <div className="text-sm text-neutral-600">Beenruimte</div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                {[
                  "Executive lounge zetels met leer",
                  "Elektrisch verstelbare stoelen",
                  "Tafels voor laptops of tablets",
                  "Premium Burmester audio systeem",
                  "LED sfeerverlichting aanpasbaar",
                  "Dual-zone climate control",
                  "Panorama schuifdak",
                  "Privacy gordijnen voor ramen",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                    <span className="text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TARIEVEN ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Transparante Tarieven
          </h2>
          <p className="text-neutral-600 text-lg">
            Voordeliger samen reizen – één voertuig, één prijs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Luchthaven */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-neutral-200 hover:border-blue-500 transition-colors">
            <div className="text-center mb-6">
              <div className="inline-block bg-neutral-100 text-neutral-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                Luchthaven Transfer
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                €120
              </h3>
              <p className="text-neutral-600">Amsterdam – Schiphol</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                Tot 8 personen
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                6-8 koffers
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                Flight tracking
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                Meet & greet mogelijk
              </li>
            </ul>

            <div className="text-center text-sm text-neutral-500">
              Slechts €15 per persoon!
            </div>
          </div>

          {/* Per uur */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-8 border-2 border-blue-500 relative transform scale-105">
            <div className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
              POPULAIR
            </div>
            
            <div className="text-center mb-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm mb-4">
                Beschikbaarheid
              </div>
              <h3 className="text-3xl font-bold mb-2">
                €95/uur
              </h3>
              <p className="text-blue-100">Minimaal 3 uur</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <span>✓</span>
                Flexibele routing
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span>✓</span>
                Chauffeur wacht
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span>✓</span>
                Meerdere stops mogelijk
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span>✓</span>
                Perfect voor events
              </li>
            </ul>

            <div className="text-center text-sm text-blue-100">
              Ideaal voor dagprogramma's
            </div>
          </div>

          {/* Dagprijs */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-neutral-200 hover:border-blue-500 transition-colors">
            <div className="text-center mb-6">
              <div className="inline-block bg-neutral-100 text-neutral-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                Volledige Dag
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                €650
              </h3>
              <p className="text-neutral-600">8-10 uur beschikbaar</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                Hele dag beschikbaar
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                Onbeperkt aantal stops
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                Corporate events
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-blue-600">✓</span>
                Beste prijs/uur
              </li>
            </ul>

            <div className="text-center text-sm text-neutral-500">
              Bespaar tot €110 vs uurtarief
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-blue-50 rounded-xl p-6">
          <p className="text-neutral-700 mb-2">
            <strong>💡 Groepskorting:</strong> Vanaf 6 personen voordeliger dan reguliere taxi's
          </p>
          <p className="text-sm text-neutral-600">
            Alle prijzen inclusief BTW, brandstof, parkeren en chauffeur
          </p>
        </div>
      </section>

      {/* ================= VERGELIJKING ================= */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Waarom Minivan Voordeliger Is
            </h2>
            <p className="text-neutral-600 text-lg">
              Vergelijk de kosten voor een groep van 7 personen naar Schiphol
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 2x Reguliere Taxi */}
            <div className="bg-white rounded-2xl p-8 border-2 border-red-200">
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">🚕 🚕</span>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">2x Reguliere Taxi</h3>
                <p className="text-neutral-600">Groep splitsen</p>
              </div>
              
              <div className="space-y-3 mb-6 text-neutral-700">
                <div className="flex justify-between">
                  <span>Taxi 1 (4 personen)</span>
                  <span className="font-bold">€ 65</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxi 2 (3 personen)</span>
                  <span className="font-bold">€ 65</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Totaal</span>
                  <span className="text-red-600">€ 130</span>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4 text-sm text-red-800">
                ❌ Groep wordt gesplitst<br/>
                ❌ Geen garantie gelijke aankomst<br/>
                ❌ Minder bagageruimte per persoon
              </div>
            </div>

            {/* 1x Luxe Minivan */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                BESTE KEUZE
              </div>
              
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">🚐</span>
                <h3 className="text-2xl font-bold mb-2">1x Luxe Minivan</h3>
                <p className="text-blue-100">Samen reizen</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Minivan (tot 8 personen)</span>
                  <span className="font-bold">€ 120</span>
                </div>
                <div className="flex justify-between text-sm text-blue-100">
                  <span>Per persoon</span>
                  <span>€ 17,14</span>
                </div>
                <div className="border-t border-white/20 pt-3 flex justify-between text-lg font-bold">
                  <span>Totaal</span>
                  <span className="text-green-300">€ 120</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-sm">
                ✓ Iedereen samen<br/>
                ✓ Ruime bagageruimte<br/>
                ✓ Luxe comfort voor allen<br/>
                <strong className="block mt-2 text-green-300">Bespaar € 10!</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">⭐⭐⭐⭐⭐</span>
            <span className="text-xl font-bold text-neutral-900">4.8/5</span>
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Wat Groepen Over Ons Zeggen
          </h2>
          <p className="text-neutral-600 text-lg">
            Ervaring van families, teams en reisgroepen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              review: "Perfect voor ons team van 7 personen naar de conferentie. Ruim, comfortabel en we konden onderweg nog even overleggen. Top service!",
              name: "Linda van Berg",
              title: "Team Lead, Marketing Agency",
              group: "7 personen",
              rating: 5
            },
            {
              review: "Gebruikt voor onze familie-uitje met 8 personen. Iedereen had ruimte, alle koffers pasten en de kinderen vonden het geweldig. Zeker voor herhaling vatbaar!",
              name: "Mark & Sandra",
              title: "Familie Weekend",
              group: "8 personen (2 families)",
              rating: 5
            },
            {
              review: "Ideaal voor luchthavenshuttle met vrienden. Goedkoper dan 2 taxi's en veel gezelliger. De chauffeur was vriendelijk en hielp met alle bagage.",
              name: "Ahmed K.",
              title: "Vriendengroep Citytrip",
              group: "6 personen",
              rating: 5
            },
          ].map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                "{review.review}"
              </p>
              <div className="pt-4 border-t">
                <div className="font-bold text-neutral-900">{review.name}</div>
                <div className="text-sm text-neutral-600">{review.title}</div>
                <div className="text-xs text-blue-600 mt-1 font-semibold">
                  👥 {review.group}
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
              Alles over groepsvervoer met luxe minivans
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Hoeveel personen passen er in de minivan?",
                a: "Onze Mercedes V-Klasse biedt comfortabel plaats aan 6-8 personen, afhankelijk van de hoeveelheid bagage. Voor maximaal comfort adviseren we 6-7 personen bij veel bagage."
              },
              {
                q: "Hoeveel bagage kunnen we meenemen?",
                a: "Er is ruimte voor 6-8 grote koffers plus handbagage. Bij 8 passagiers met veel bagage adviseren we vooraf contact op te nemen om de beste configuratie te bespreken."
              },
              {
                q: "Is de minivan geschikt voor kinderen?",
                a: "Ja absoluut! We hebben kinderzitjes beschikbaar (baby, peuter en kleuter). Geef bij boeking even door hoeveel en welke leeftijd, dan regelen wij dit kosteloos."
              },
              {
                q: "Kunnen we onderweg stops maken?",
                a: "Bij beschikbaarheid boekingen (per uur of dag) zijn stops geen probleem. Voor vaste ritten zoals luchthaven transfers rekenen we € 15 per extra stop."
              },
              {
                q: "Is dit goedkoper dan meerdere taxi's?",
                a: "Ja, voor groepen vanaf 5 personen is een minivan voordeliger. Voor 7 personen naar Schiphol betaal je €120 (€17 p.p.) vs €130 voor 2 taxi's, en blijft de groep bij elkaar."
              },
              {
                q: "Hoe ver van tevoren moet ik boeken?",
                a: "Voor optimale beschikbaarheid adviseren we 24-48 uur van tevoren. Last-minute boekingen zijn vaak mogelijk – bel ons voor directe beschikbaarheid."
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border-2 border-neutral-200 p-6 hover:shadow-lg hover:border-blue-500 transition-all"
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
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-28">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase bg-white/20 text-white px-4 py-2 rounded-full border border-white/30">
            <span>🚐</span>
            Groepsvervoer Premium
          </span>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Reis Samen in Luxe
            <span className="block text-blue-200 text-3xl md:text-4xl font-semibold mt-3">
              Comfortabel, Voordeliger & Gezelliger
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Boek nu onze luxe Mercedes V-Klasse voor uw groep. Perfect voor 
            families, teams en vrienden die samen willen reizen zonder in te 
            leveren op comfort en stijl.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="#boeken"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl transform hover:-translate-y-0.5"
            >
              Boek Groepsvervoer
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Offerte Op Maat
            </a>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">6-8</div>
              <div className="text-sm text-blue-100">Comfortabele zitplaatsen</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">€15</div>
              <div className="text-sm text-blue-100">Per persoon naar Schiphol</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-sm text-blue-100">Klantbeoordeling</div>
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
            "@type": "TaxiService",
            "name": "Luxe Minivan Vervoer - Groepsvervoer",
            "description": "Professioneel groepsvervoer in Mercedes V-Klasse voor 6-8 personen met chauffeur",
            "areaServed": {
              "@type": "Country",
              "name": "Nederland"
            },
            "priceRange": "€€",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "850"
            },
            "vehicleType": "Luxury Minivan",
            "passengerCapacity": {
              "@type": "QuantitativeValue",
              "minValue": 6,
              "maxValue": 8
            },
            "offers": [
              {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": "120",
                "description": "Luchthaven transfer Amsterdam - Schiphol"
              },
              {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": "95",
                "description": "Uurtarief beschikbaarheid"
              }
            ]
          })
        }}
      />
    </main>
  );
}