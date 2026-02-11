export const metadata = {
  title: "Business Class Taxi – Luxe Zakelijk Vervoer met Chauffeur | Premium VIP Service",
  description:
    "Business Class taxi service voor zakelijk en VIP-vervoer. Luxe Mercedes voertuigen, professionele chauffeurs en altijd op tijd. Boek nu je premium taxirit.",
  keywords: "business class taxi, zakelijk vervoer, VIP taxi, chauffeur service, luxe taxi, premium vervoer, Schiphol taxi business class",
  openGraph: {
    title: "Business Class Taxi – Luxe Zakelijk Vervoer",
    description: "Professioneel zakelijk vervoer met luxe voertuigen en chauffeur",
    type: "website",
  },
};

export default function BusinessClassPage() {
  return (
    <main className="space-y-32">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT */}
          <div className="space-y-8">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
              Premium Vervoer
            </span>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-neutral-900">
              Business Class Taxi
              <span className="block text-neutral-600 text-3xl md:text-4xl font-semibold mt-2">
                Luxe Zakelijk Vervoer met Chauffeur
              </span>
            </h1>
            
            <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
              Professioneel, discreet en comfortabel vervoer voor zakelijke
              afspraken, luchthavens en VIP-gasten. Altijd representatief,
              altijd op tijd.
            </p>
            
            <ul className="grid grid-cols-2 gap-4 text-sm text-neutral-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Professionele chauffeurs
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Luxe Mercedes voertuigen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Discreet & representatief
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                24/7 beschikbaar
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#boeken"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Boek Business Class
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#informatie"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-neutral-300 font-semibold hover:border-neutral-900 hover:bg-neutral-50 transition-all"
              >
                Meer informatie
              </a>
            </div>
          </div>

          {/* RIGHT – Premium luxury car image */}
          <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop"
              alt="Luxe Mercedes Business Class taxi met professionele chauffeur"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
            
            {/* Floating stats card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-neutral-900">24/7</div>
                  <div className="text-xs text-neutral-600">Beschikbaar</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">4.9★</div>
                  <div className="text-xs text-neutral-600">Beoordeling</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">15min</div>
                  <div className="text-xs text-neutral-600">Responstijd</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING CARD ================= */}
      <section id="boeken" className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="rounded-2xl border bg-white shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">
            Boek uw Business Class rit
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Ophaallocatie
              </label>
              <input 
                type="text"
                placeholder="Bijv. Amsterdam Centraal"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-neutral-900 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Bestemming
              </label>
              <input 
                type="text"
                placeholder="Bijv. Schiphol"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-neutral-900 focus:outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                Datum & Tijd
              </label>
              <input 
                type="datetime-local"
                className="w-full border-2 border-neutral-200 rounded-lg px-4 py-3 focus:border-neutral-900 focus:outline-none transition-colors" 
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-neutral-900 text-white py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl">
                Boek Nu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST BADGES ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🏆", title: "Premium Kwaliteit", desc: "Luxe Mercedes vloot" },
            { icon: "⚡", title: "Altijd Op Tijd", desc: "98% punctualiteit" },
            { icon: "🔒", title: "Veilig & Discreet", desc: "Gecertificeerde chauffeurs" },
            { icon: "💼", title: "Zakelijk", desc: "Factuur per e-mail" },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-neutral-900 mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WAT IS BUSINESS CLASS ================= */}
      <section id="informatie" className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-neutral-900">
              Wat is Business Class vervoer?
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Business Class vervoer is luxe zakelijk taxi vervoer met een
              professionele chauffeur in representatieve kleding. Deze premium 
              service is speciaal ontworpen voor zakelijke reizigers, directie 
              en VIP-gasten die waarde hechten aan comfort, privacy en 
              punctualiteit.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Of het nu gaat om belangrijke zakelijke afspraken, 
              luchthavenvervoer of het vervoeren van belangrijke gasten – 
              met Business Class bent u verzekerd van een professionele, 
              comfortabele en discrete service.
            </p>
            
            <div className="pt-4">
              <h3 className="font-bold text-neutral-900 mb-4">Inclusief:</h3>
              <ul className="space-y-3">
                {[
                  "Professionele chauffeur in pak",
                  "Gratis wifi en oplaadpunten",
                  "Flessenwater en tissues",
                  "Kranten en tijdschriften",
                  "Flight tracking bij luchthavenritten",
                  "Hulp met bagage",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">✓</span>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative h-[560px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=1200&auto=format&fit=crop"
              alt="Professionele chauffeur opent deur van luxe Business Class taxi"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Premium Voorzieningen</h2>
            <p className="text-neutral-400 text-lg">
              Alles wat u nodig heeft voor een comfortabele zakelijke reis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Mercedes-Benz E-Klasse",
                desc: "Luxe voertuigen met leren bekleding",
                icon: "🚗"
              },
              {
                title: "Ervaren Chauffeurs",
                desc: "Professioneel in pak, discreet en behulpzaam",
                icon: "👔"
              },
              {
                title: "WiFi & Stroom",
                desc: "Blijf verbonden en productief onderweg",
                icon: "📱"
              },
              {
                title: "Extra Comfort",
                desc: "Ruime beenruimte en klimaatregeling",
                icon: "⭐"
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-800 bg-neutral-800/50 p-8 hover:bg-neutral-800 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LUCHTHAVEN SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop"
              alt="Business Class taxi service naar Schiphol en andere luchthavens"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
              Luchthavenvervoer
            </span>
            <h2 className="text-4xl font-bold text-neutral-900">
              Business Class naar de Luchthaven
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Onze Business Class service is de perfecte keuze voor 
              luchthavenvervoer. Of u nu naar Schiphol, Eindhoven of 
              Rotterdam The Hague Airport moet – u reist ontspannen en 
              komt altijd ruim op tijd aan voor uw vlucht.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                <span className="text-2xl">✈️</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Flight Tracking</h4>
                  <p className="text-sm text-neutral-600">
                    We volgen uw vlucht zodat de chauffeur er is, ook bij vertraging
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                <span className="text-2xl">🧳</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Bagage Assistentie</h4>
                  <p className="text-sm text-neutral-600">
                    Hulp met in- en uitladen van uw bagage
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Meet & Greet</h4>
                  <p className="text-sm text-neutral-600">
                    Persoonlijke ontvangst in de aankomsthal (optioneel)
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#boeken"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-all"
            >
              Boek Luchthaven Rit
            </a>
          </div>
        </div>
      </section>

      {/* ================= TARIEVEN ================= */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Transparante Tarieven
            </h2>
            <p className="text-neutral-600 text-lg">
              Geen verrassingen – u weet vooraf precies wat uw rit kost
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="font-bold text-neutral-900">Amsterdam – Schiphol</h3>
                  <p className="text-sm text-neutral-600">Business Class | Enkele reis</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900">€ 75</div>
                  <div className="text-sm text-neutral-600">Vaste prijs</div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="font-bold text-neutral-900">Rotterdam – Schiphol</h3>
                  <p className="text-sm text-neutral-600">Business Class | Enkele reis</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900">€ 95</div>
                  <div className="text-sm text-neutral-600">Vaste prijs</div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-bold text-neutral-900">Uurtarief</h3>
                  <p className="text-sm text-neutral-600">Beschikbaarheid per uur | Min. 3 uur</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900">€ 85</div>
                  <div className="text-sm text-neutral-600">Per uur</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-neutral-50 rounded-xl">
              <p className="text-sm text-neutral-600 text-center">
                <strong>Inclusief:</strong> Alle kosten, tolwegen, parkeren, BTW en wachttijd tot 15 minuten
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">⭐⭐⭐⭐⭐</span>
            <span className="text-xl font-bold text-neutral-900">4.9/5</span>
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Wat Onze Klanten Zeggen
          </h2>
          <p className="text-neutral-600 text-lg">
            Meer dan 2.000+ tevreden zakelijke klanten
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              review: "Altijd stipt en representatief. Perfect voor onze directie en internationale gasten. De chauffeurs zijn vriendelijk en professioneel.",
              name: "Marcel de Jong",
              company: "CEO, TechCorp",
              rating: 5
            },
            {
              review: "Zeer comfortabele ritten en professionele chauffeurs. Ideaal voor zakelijke afspraken. De Mercedes voertuigen zijn in topconditie.",
              name: "Sophie van Dam",
              company: "HR Manager",
              rating: 5
            },
            {
              review: "Onze vaste partner voor zakelijk vervoer. Betrouwbaar, discreet en altijd beschikbaar. Absolute aanrader voor business travel.",
              name: "Robert Vermeulen",
              company: "CFO, Finance Group",
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
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="w-12 h-12 rounded-full bg-neutral-200" />
                <div>
                  <div className="font-bold text-neutral-900">{review.name}</div>
                  <div className="text-sm text-neutral-600">{review.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Wanneer Kiest u Business Class?</h2>
            <p className="text-neutral-400 text-lg">
              Onze service is perfect voor verschillende zakelijke situaties
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💼",
                title: "Zakelijke Afspraken",
                desc: "Arriveert ontspannen en op tijd voor belangrijke meetings"
              },
              {
                icon: "✈️",
                title: "Luchthavenvervoer",
                desc: "Comfortabel van deur tot deur naar uw vlucht"
              },
              {
                icon: "🌟",
                title: "VIP Gasten",
                desc: "Representatief vervoer voor belangrijke relaties"
              },
              {
                icon: "🎯",
                title: "Directievervoer",
                desc: "Discrete service voor executives en bestuurders"
              },
              {
                icon: "🎪",
                title: "Events & Beurzen",
                desc: "Vervoer naar conferenties en zakelijke evenementen"
              },
              {
                icon: "📅",
                title: "Vaste Contracten",
                desc: "Regelmatig vervoer voor vaste klanten"
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-colors"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Veelgestelde Vragen
          </h2>
          <p className="text-neutral-600 text-lg">
            Alles wat u moet weten over Business Class vervoer
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Wat is het verschil met een reguliere taxi?",
              a: "Business Class biedt luxe Mercedes voertuigen, professionele chauffeurs in pak, extra comfort, wifi, oplaadpunten en een hogere service standaard."
            },
            {
              q: "Hoe ver van tevoren moet ik boeken?",
              a: "Voor optimale beschikbaarheid adviseren we minimaal 24 uur van tevoren. Last-minute boekingen zijn ook mogelijk, afhankelijk van beschikbaarheid."
            },
            {
              q: "Kan ik een factuur ontvangen?",
              a: "Ja, na elke rit ontvangt u automatisch een factuur per e-mail, geschikt voor declaratie."
            },
            {
              q: "Wat gebeurt er bij vertraging van mijn vlucht?",
              a: "Bij luchthavenritten volgen we uw vlucht. De chauffeur past zijn aankomsttijd automatisch aan bij vertraging."
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow"
            >
              <summary className="font-bold text-neutral-900 cursor-pointer flex items-center justify-between">
                {faq.q}
                <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-5xl font-bold">
            Klaar voor Premium Vervoer?
          </h2>
          <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Professioneel, comfortabel en altijd op tijd. Ervaar het verschil
            van Business Class vervoer en reis zoals het hoort – in stijl.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="#boeken"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-900 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Boek Nu
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-neutral-900 transition-all"
            >
              Neem Contact Op
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              24/7 bereikbaar
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Binnen 15 min reactie
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Vaste prijzen
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
            "name": "Business Class Taxi Service",
            "description": "Premium Business Class taxi service met luxe Mercedes voertuigen en professionele chauffeurs",
            "areaServed": {
              "@type": "Country",
              "name": "Nederland"
            },
            "priceRange": "€€€",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2000"
            },
            "availableService": [
              {
                "@type": "Service",
                "name": "Business Class Vervoer",
                "description": "Luxe zakelijk vervoer met chauffeur"
              },
              {
                "@type": "Service",
                "name": "Luchthavenvervoer",
                "description": "Premium taxi service naar luchthavens"
              }
            ]
          })
        }}
      />
    </main>
  );
}