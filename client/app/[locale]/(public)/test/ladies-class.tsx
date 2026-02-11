export const metadata = {
  title: "Ladies Taxi – Veilig Vervoer voor Vrouwen door Vrouwelijke Chauffeurs",
  description:
    "Ladies Taxi service speciaal voor vrouwen. Vrouwelijke chauffeurs, extra veiligheidsmaatregelen en comfort. Reis veilig en comfortabel, 24/7 beschikbaar.",
  keywords: "ladies taxi, vrouwentaxi, vrouwelijke chauffeur, veilig vervoer vrouwen, female taxi driver, women only taxi, veilige taxi",
  openGraph: {
    title: "Ladies Taxi – Veilig Vervoer door Vrouwelijke Chauffeurs",
    description: "Speciaal voor vrouwen: veilig, comfortabel vervoer met vrouwelijke chauffeurs",
    type: "website",
  },
};

export default function LadiesTaxiPage() {
  return (
    <main className="space-y-32">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* LEFT */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-700 bg-rose-100 px-4 py-2 rounded-full">
              <span>🌸</span>
              Voor Vrouwen, Door Vrouwen
            </span>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-neutral-900">
              Ladies Taxi
              <span className="block text-rose-600 text-3xl md:text-4xl font-semibold mt-3">
                Veilig & Comfortabel Reizen
              </span>
            </h1>
            
            <p className="text-xl text-neutral-700 max-w-xl leading-relaxed">
              Speciaal voor vrouwen die veilig en comfortabel willen reizen. 
              Onze professionele vrouwelijke chauffeurs zorgen voor een 
              vertrouwde en prettige reiservaring, dag en nacht.
            </p>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                Waarom Ladies Taxi?
              </h3>
              <ul className="space-y-3">
                {[
                  "Uitsluitend vrouwelijke chauffeurs",
                  "Extra veiligheidsmaatregelen",
                  "Vertrouwde en comfortabele sfeer",
                  "24/7 beschikbaar, ook 's nachts",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">✓</span>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#boeken"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Boek Ladies Taxi
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#veiligheid"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-rose-500 text-rose-600 font-semibold hover:bg-rose-50 transition-all"
              >
                Veiligheidsgaranties
              </a>
            </div>
          </div>

          {/* RIGHT – Female empowerment image */}
          <div className="relative h-[560px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
              alt="Professionele vrouwelijke taxichauffeur - Ladies Taxi service"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
            
            {/* Safety badge */}
            <div className="absolute top-6 left-6 bg-rose-500 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
              <span>🔒</span>
              100% Veilig
            </div>

            {/* Floating stats card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-rose-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-rose-600">100%</div>
                  <div className="text-xs text-neutral-600">Vrouwelijke Team</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-600">24/7</div>
                  <div className="text-xs text-neutral-600">Beschikbaar</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-600">5.000+</div>
                  <div className="text-xs text-neutral-600">Tevreden Vrouwen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING CARD ================= */}
      <section id="boeken" className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="rounded-2xl border-2 border-rose-200 bg-white shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌸</span>
            <h2 className="text-2xl font-bold text-neutral-900">
              Boek Veilig Vervoer met Vrouwelijke Chauffeur
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Ophaallocatie
              </label>
              <input 
                type="text"
                placeholder="Bijv. Centraal Station"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-rose-500 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Bestemming
              </label>
              <input 
                type="text"
                placeholder="Bijv. Uw thuisadres"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-rose-500 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Datum & Tijd
              </label>
              <input 
                type="datetime-local"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-rose-500 focus:outline-none transition-colors" 
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl">
                Boek Nu
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-rose-50 rounded-xl">
            <p className="text-sm text-neutral-700 text-center">
              <strong>📞 Nachtservice:</strong> Voor ritten tussen 23:00 - 06:00, bel direct: 
              <a href="tel:+31201234567" className="text-rose-600 font-bold hover:underline ml-1">+31 (0)20 123 4567</a>
            </p>
          </div>
        </div>
      </section>

      {/* ================= TRUST INDICATORS ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "👩‍✈️", title: "Vrouwelijke Chauffeurs", desc: "100% vrouwelijk team" },
            { icon: "🔒", title: "Extra Veilig", desc: "GPS tracking & SOS" },
            { icon: "⭐", title: "Hoge Kwaliteit", desc: "Gescreende professionals" },
            { icon: "🌙", title: "24/7 Service", desc: "Ook 's nachts bereikbaar" },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition-colors border border-rose-100"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-neutral-900 mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VEILIGHEID SECTIE ================= */}
      <section id="veiligheid" className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-rose-700 bg-rose-100 px-3 py-1 rounded-full mb-4">
            Uw Veiligheid Voorop
          </span>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Extra Veiligheidsmaatregelen
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Wij nemen uw veiligheid en comfort uiterst serieus. Daarom 
            hebben we extra maatregelen getroffen speciaal voor vrouwelijke passagiers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
              alt="Veilige taxi rit met vrouwelijke chauffeur"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
          </div>

          <div className="space-y-5">
            {[
              {
                icon: "👩‍✈️",
                title: "Alleen Vrouwelijke Chauffeurs",
                desc: "Al onze chauffeurs zijn vrouwen, speciaal getraind in klantvriendelijkheid en veiligheid"
              },
              {
                icon: "🔍",
                title: "Grondige Screening",
                desc: "Elke chauffeur doorloopt een uitgebreide achtergrondcheck (VOG) en screening"
              },
              {
                icon: "📍",
                title: "Live GPS Tracking",
                desc: "Uw rit wordt real-time gevolgd. Deel uw locatie met vertrouwelingen via de app"
              },
              {
                icon: "🚨",
                title: "SOS Noodknop",
                desc: "Direct contact met onze centrale en indien nodig met hulpdiensten"
              },
              {
                icon: "📱",
                title: "Ritregistratie",
                desc: "Alle ritten worden geregistreerd voor uw veiligheid en kwaliteitscontrole"
              },
              {
                icon: "💬",
                title: "24/7 Support",
                desc: "Onze vrouwelijke support medewerkers zijn altijd bereikbaar voor vragen of zorgen"
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl hover:shadow-md transition-all border border-rose-100">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1 text-lg">{item.title}</h3>
                  <p className="text-neutral-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CHAUFFEURS SECTIE ================= */}
      <section className="bg-gradient-to-b from-rose-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Ontmoet Onze Professionele Chauffeurs
            </h2>
            <p className="text-neutral-600 text-lg">
              Ervaren, vriendelijke en betrouwbare vrouwen achter het stuur
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-neutral-900">
                Waarom Onze Chauffeurs Bijzonder Zijn
              </h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Onze chauffeurs zijn niet alleen ervaren bestuurders, maar ook 
                getrainde professionals die begrijpen wat vrouwelijke passagiers 
                nodig hebben om zich veilig en op hun gemak te voelen.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-rose-100">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">Professionele Training</h4>
                    <p className="text-sm text-neutral-600">
                      Speciale training in klantvriendelijkheid, veiligheid en EHBO
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-rose-100">
                  <span className="text-2xl">💝</span>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">Empathisch & Respectvol</h4>
                    <p className="text-sm text-neutral-600">
                      Begripvol, vriendelijk en altijd respectvol naar passagiers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-rose-100">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">Lokale Kennis</h4>
                    <p className="text-sm text-neutral-600">
                      Uitstekende kennis van veilige routes en de omgeving
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-rose-100">
                  <span className="text-2xl">🤐</span>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">Discretie Gegarandeerd</h4>
                    <p className="text-sm text-neutral-600">
                      Uw privacy en vertrouwen staan voorop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[560px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop"
                alt="Vriendelijke vrouwelijke taxichauffeur"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHEN TO USE ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Wanneer Kiest u Ladies Taxi?
          </h2>
          <p className="text-neutral-600 text-lg">
            Perfect voor situaties waar extra veiligheid en comfort gewenst is
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🌙",
              title: "Nachtelijk Vervoer",
              desc: "Veilig thuiskomen na een avondje uit, werk of studie",
              color: "from-purple-50 to-purple-100"
            },
            {
              icon: "💼",
              title: "Zakelijke Afspraken",
              desc: "Professioneel en comfortabel naar meetings en events",
              color: "from-rose-50 to-rose-100"
            },
            {
              icon: "🏥",
              title: "Medische Afspraken",
              desc: "Vervoer naar ziekenhuis, arts of therapie met extra zorg",
              color: "from-pink-50 to-pink-100"
            },
            {
              icon: "✈️",
              title: "Luchthaven Transfers",
              desc: "Veilig van en naar de luchthaven, ook vroeg of laat",
              color: "from-rose-50 to-rose-100"
            },
            {
              icon: "🛍️",
              title: "Shopping & Uitgaan",
              desc: "Comfortabel naar winkels, restaurants of vrienden",
              color: "from-purple-50 to-purple-100"
            },
            {
              icon: "🏃‍♀️",
              title: "Sport & Fitness",
              desc: "Voor en na sportschool, yoga of andere activiteiten",
              color: "from-pink-50 to-pink-100"
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 hover:shadow-xl transition-all border border-rose-100`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
              <p className="text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= EXTRA SERVICES ================= */}
      <section className="bg-gradient-to-br from-rose-600 to-pink-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Extra Service & Comfort</h2>
            <p className="text-rose-100 text-lg">
              Kleine details die het verschil maken
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💐", title: "Aangenaam Geparfumeerd", desc: "Frisse, neutrale geur in de auto" },
              { icon: "🎵", title: "Muziekvoorkeur", desc: "Kies uw eigen muziek of rust" },
              { icon: "🌡️", title: "Comforttemperatuur", desc: "Klimaatregeling naar wens" },
              { icon: "💧", title: "Water & Tissues", desc: "Altijd aanwezig in de auto" },
              { icon: "🤫", title: "Stille Rit Optie", desc: "Geen gesprek verplicht" },
              { icon: "🧳", title: "Bagage Hulp", desc: "Assistentie met tassen en koffers" },
              { icon: "📱", title: "Oplaadpunten", desc: "USB en draadloos opladen" },
              { icon: "🪟", title: "Privacy Scherm", desc: "Op verzoek beschikbaar" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 transition-colors"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-rose-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TARIEVEN ================= */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Transparante Tarieven
          </h2>
          <p className="text-neutral-600 text-lg">
            Veiligheid hoeft niet duur te zijn – dezelfde prijzen als reguliere taxi
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-rose-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-6 border-b">
              <div>
                <h3 className="font-bold text-neutral-900 text-xl">Regulier Tarief</h3>
                <p className="text-neutral-600 mt-1">Standaard ritten overdag en 's avonds</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-rose-600">€2,50</div>
                <div className="text-sm text-neutral-600">per kilometer</div>
              </div>
            </div>

            <div className="flex items-center justify-between py-6 border-b">
              <div>
                <h3 className="font-bold text-neutral-900 text-xl">Nachttarief</h3>
                <p className="text-neutral-600 mt-1">23:00 - 06:00 uur</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-rose-600">€3,00</div>
                <div className="text-sm text-neutral-600">per kilometer</div>
              </div>
            </div>

            <div className="flex items-center justify-between py-6 border-b">
              <div>
                <h3 className="font-bold text-neutral-900 text-xl">Luchthaven Schiphol</h3>
                <p className="text-neutral-600 mt-1">Van/naar Amsterdam Centrum</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-rose-600">€45</div>
                <div className="text-sm text-neutral-600">Vaste prijs</div>
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <div>
                <h3 className="font-bold text-neutral-900 text-xl">Abonnement</h3>
                <p className="text-neutral-600 mt-1">Voor vaste klanten | Maandelijks</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-rose-600">10%</div>
                <div className="text-sm text-neutral-600">Korting op alle ritten</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💝</span>
              <div>
                <h4 className="font-bold text-neutral-900 mb-2">Geen Extra Kosten Voor Veiligheid</h4>
                <p className="text-neutral-700 text-sm">
                  Alle veiligheidsfeatures (GPS tracking, SOS knop, screening chauffeurs) 
                  zijn standaard inbegrepen. U betaalt nooit extra voor uw veiligheid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl">⭐⭐⭐⭐⭐</span>
              <span className="text-xl font-bold text-neutral-900">4.9/5</span>
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Wat Vrouwen Over Ons Zeggen
            </h2>
            <p className="text-neutral-600 text-lg">
              Ervaringen van tevreden klanten
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                review: "Als alleenstaande moeder die vaak laat werkt, is Ladies Taxi een uitkomst. Ik voel me altijd veilig en de chauffeurs zijn zo vriendelijk. Aanrader!",
                name: "Sarah, 34",
                title: "Projectmanager",
                rating: 5
              },
              {
                review: "Na een vervelende ervaring met een reguliere taxi, ben ik overgestapt. Wat een verschil! Eindelijk kan ik ontspannen reizen, ook 's nachts.",
                name: "Leila, 28",
                title: "Student",
                rating: 5
              },
              {
                review: "Gebruik Ladies Taxi nu al 2 jaar voor mijn woon-werk verkeer. De chauffeurs zijn professioneel en de auto's altijd schoon. Top service!",
                name: "Maya, 42",
                title: "Consultant",
                rating: 5
              },
              {
                review: "Perfect voor mijn dochter die 's avonds laat van haar werk komt. Als ouder heb ik een veilig gevoel dat ze met Ladies Taxi reist.",
                name: "Patricia, 56",
                title: "Moeder",
                rating: 5
              },
              {
                review: "De GPS tracking mogelijkheid geeft zo'n rust. Ik deel altijd mijn rit met mijn vriend en voel me daardoor extra veilig. Fantastisch concept!",
                name: "Noor, 25",
                title: "Verpleegkundige",
                rating: 5
              },
              {
                review: "Fijn dat ik als zwangere vrouw extra aandacht krijg. De chauffeurs rijden rustig en helpen met mijn tassen. Echt attent!",
                name: "Emma, 31",
                title: "Aanstaande Moeder",
                rating: 5
              },
            ].map((review, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-rose-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-rose-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "{review.review}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-rose-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-400" />
                  <div>
                    <div className="font-bold text-neutral-900">{review.name}</div>
                    <div className="text-sm text-neutral-600">{review.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Veelgestelde Vragen
          </h2>
          <p className="text-neutral-600 text-lg">
            Alles wat u moet weten over Ladies Taxi
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Zijn alle chauffeurs echt vrouw?",
              a: "Ja, 100%! Alle chauffeurs in ons Ladies Taxi netwerk zijn vrouwen. Ze zijn zorgvuldig geselecteerd, gescreend en getraind specifiek voor deze service."
            },
            {
              q: "Kunnen mannen ook gebruik maken van Ladies Taxi?",
              a: "Ladies Taxi is speciaal ontworpen voor vrouwelijke passagiers. Mannen kunnen echter wel boeken voor vrouwelijke familieleden, vriendinnen of collega's."
            },
            {
              q: "Hoe werkt de GPS tracking precies?",
              a: "Via onze app kunt u uw rit live volgen. U kunt ook een 'veilig thuiskomen' link delen met vertrouwelingen, zodat zij uw route real-time kunnen volgen tot u veilig bent aangekomen."
            },
            {
              q: "Is Ladies Taxi duurder dan een gewone taxi?",
              a: "Nee! Onze tarieven zijn gelijk aan reguliere taxi's. Alle extra veiligheidsmaatregelen zijn standaard inbegrepen zonder meerprijs."
            },
            {
              q: "Wat gebeurt er als ik de SOS knop gebruik?",
              a: "Bij het indrukken van de SOS knop wordt direct onze 24/7 centrale gealarmeerd. Zij nemen onmiddellijk contact op en kunnen indien nodig ook hulpdiensten inschakelen."
            },
            {
              q: "Zijn jullie ook beschikbaar voor vaste ritten?",
              a: "Ja! We bieden abonnementen aan voor vaste klanten met 10% korting. Perfect voor dagelijks woon-werk verkeer of reguliere afspraken."
            },
            {
              q: "Hoe kan ik vertrouwen dat de chauffeur echt is wie ze zegt te zijn?",
              a: "Elke chauffeur heeft een geverifieerd profiel in de app met foto en naam. U ontvangt voor vertrek de details van uw chauffeur en kenteken van de auto."
            },
            {
              q: "Wat als ik me ongemakkelijk voel tijdens een rit?",
              a: "Uw comfort en veiligheid zijn prioriteit. U kunt altijd direct onze 24/7 support bellen, de SOS knop gebruiken, of vragen om te stoppen. We nemen elke melding serieus."
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border-2 border-rose-200 p-6 hover:shadow-lg hover:border-rose-400 transition-all"
            >
              <summary className="font-bold text-neutral-900 cursor-pointer flex items-center justify-between">
                {faq.q}
                <span className="text-rose-400 group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <p className="mt-4 text-neutral-600 leading-relaxed pl-2">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= EMPOWERMENT SECTION ================= */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meer Dan Een Taxi – Een Beweging
            </h2>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto leading-relaxed">
              Ladies Taxi staat voor vrouwelijke empowerment. Door vrouwelijke 
              chauffeurs te werk te stellen en vrouwen een veilige reiservaring 
              te bieden, dragen we bij aan een inclusievere en veiligere samenleving.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">👩‍✈️</div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-pink-100">Vrouwelijke Chauffeurs</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🚗</div>
              <div className="text-3xl font-bold mb-2">5.000+</div>
              <div className="text-pink-100">Veilige Ritten per Maand</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">⭐</div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-pink-100">Gemiddelde Beoordeling</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-pink-100 mb-6 text-lg">
              Word ook chauffeur bij Ladies Taxi? We zijn altijd op zoek naar 
              enthousiaste, betrouwbare vrouwen die ons team willen versterken.
            </p>
            <a
              href="/werken-bij"
              className="inline-flex items-center px-8 py-4 bg-white text-pink-600 rounded-lg font-bold hover:bg-pink-50 transition-all shadow-xl"
            >
              Werk Mee aan Veiligheid
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          
          <div className="relative z-10 text-center text-white px-6 py-20 space-y-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase bg-white/20 px-4 py-2 rounded-full border border-white/30">
              <span>🌸</span>
              Start Met Veilig Reizen
            </span>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Klaar Voor Een
              <span className="block mt-2">Veilige Rit?</span>
            </h2>
            
            <p className="text-xl text-rose-100 max-w-2xl mx-auto leading-relaxed">
              Boek nu uw eerste rit met Ladies Taxi en ervaar het verschil. 
              Veilig, comfortabel en met een glimlach – zoals reizen zou moeten zijn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="#boeken"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-rose-600 rounded-lg font-bold text-lg hover:bg-rose-50 transition-all shadow-2xl transform hover:-translate-y-0.5"
              >
                Boek Uw Rit Nu
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="tel:+31201234567"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-rose-600 transition-all"
              >
                <span className="mr-2">📞</span>
                Bel Direct
              </a>
            </div>

            <p className="text-sm text-rose-100 pt-6">
              Eerste rit? Gebruik code <strong className="bg-white/20 px-3 py-1 rounded-full">WELCOME10</strong> voor 10% korting
            </p>
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
            "name": "Ladies Taxi - Veilig Vervoer Voor Vrouwen",
            "description": "Speciaal taxi service voor vrouwen met alleen vrouwelijke chauffeurs en extra veiligheidsmaatregelen",
            "areaServed": {
              "@type": "Country",
              "name": "Nederland"
            },
            "priceRange": "€€",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "5000"
            },
            "audience": {
              "@type": "PeopleAudience",
              "suggestedGender": "female"
            },
            "additionalType": "WomenSafety",
            "serviceType": "Ladies Taxi Service"
          })
        }}
      />
    </main>
  );
}