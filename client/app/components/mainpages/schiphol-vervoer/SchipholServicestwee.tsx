"use client";
import React from "react";
import { motion } from "framer-motion";
import { Plane, UtensilsCrossed, Music2, Sun, Car, Check } from "lucide-react";

/**
 * Punt 4 – Populaire Particuliere Services
 * Doel: praktische context, zonder prijsfocus. Premium, rustig en elegant.
 * - TailwindCSS styling
 * - Subtiele framer-motion animaties
 */

type Service = {
  key: string;
  name: string;
  subtitle?: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  moodLabel: string; // voor subtiele fotografie placeholder
};

const SERVICES: Service[] = [
  {
    key: "airport",
    name: "Privé luchthavenvervoer",
    subtitle: "naar/van Schiphol",
    description:
      "Onbezorgd reizen met flight tracking, discrete pick-up en assistentie bij aankomst of vertrek.",
    features: [
      "Meet & Greet bij de terminal",
      "Monitoring van vluchttijden",
      "Ruimte voor koffers en handbagage",
    ],
    icon: <Plane className="w-5 h-5" aria-hidden="true" />,
    moodLabel: "Avondlicht – terminal",
  },
  {
    key: "evening",
    name: "Avond- of dinertransport",
    description:
      "Deur‑tot‑deur vervoer in stijl. Uw chauffeur wacht discreet en brengt u veilig terug.",
    features: [
      "Stand‑by tussen gangen",
      "Geen parkeerzorgen",
      "Rustige rit na afloop",
    ],
    icon: <UtensilsCrossed className="w-5 h-5" aria-hidden="true" />,
    moodLabel: "Hotelentree – warm licht",
  },
  {
    key: "events",
    name: "Evenementen en concertvervoer",
    description:
      "Aankomst dicht bij de entree, flexibele wachttijd en soepele terugreis – zonder drukte.",
    features: [
      "Coördinatie bij drukte",
      "Drop‑off en pick‑up op afspraak",
      "Discreet instappen/uitstappen",
    ],
    icon: <Music2 className="w-5 h-5" aria-hidden="true" />,
    moodLabel: "Theater – avond",
  },
  {
    key: "daytrip",
    name: "Luxe dagtrips of weekendvervoer",
    description:
      "Ontspannen ontdekken met persoonlijke route en comfortabele stops onderweg.",
    features: [
      "Route op maat",
      "Mineraalwater & wifi",
      "Ruimte voor bagage en aankopen",
    ],
    icon: <Sun className="w-5 h-5" aria-hidden="true" />,
    moodLabel: "Serene landschappen",
  },
  {
    key: "chauffeur",
    name: "Chauffeurservice voor eigen auto",
    description:
      "Ervaren chauffeurs rijden uw eigen wagen – representatief, verzekerd en discreet.",
    features: [
      "Professionele, geklede chauffeurs",
      "Valet‑achtige service",
      "Korte of langdurige inzet",
    ],
    icon: <Car className="w-5 h-5" aria-hidden="true" />,
    moodLabel: "Private driveway",
  },
];

export default function PopulaireParticuliereServices() {
  return (
    <section
      aria-labelledby="services-title"
      className="relative w-full mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-neutral-50"
      />

      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
          Populaire particuliere services
        </p>
        <h2
          id="services-title"
          className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900"
        >
          Praktische context — zonder prijsfocus
        </h2>
        <p className="mt-4 text-neutral-600 text-lg leading-relaxed">
          Van luchthaven tot diner, van concert tot dagtrip: kies de service die past bij uw moment.
          Altijd in alle rust, met discretie en aandacht.
        </p>
      </header>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, idx) => (
          <motion.article
            key={s.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 * idx, ease: "easeOut" }}
            className="flex flex-col rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded-lg border border-neutral-200/60 bg-neutral-50 p-2">
                {s.icon}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">{s.name}</h3>
                {s.subtitle && (
                  <p className="mt-1 text-sm text-neutral-500">{s.subtitle}</p>
                )}
              </div>
            </div>

            {/* Mood / subtiele fotografie placeholder */}
            <figure
              aria-hidden="true"
              className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_70%_30%,rgba(0,0,0,0.06),transparent_45%)]"
            >
              <div className="h-full w-full bg-[linear-gradient(135deg,rgba(0,0,0,0.06),transparent_40%)]" />
            </figure>
            <figcaption className="sr-only">{s.moodLabel}</figcaption>

            <p className="mt-4 text-neutral-700 leading-relaxed">{s.description}</p>

            <ul className="mt-5 space-y-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 rounded-md border border-neutral-200 bg-neutral-50 p-1">
                    <Check className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-neutral-700">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href="#reserveer"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-white shadow-sm hover:shadow-md transition"
              >
                Plan uw rit
              </a>
              <a
                href="#offerte"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-neutral-900 hover:bg-neutral-50 transition"
              >
                Meer informatie
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-14 md:mt-20 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </section>
  );
}
