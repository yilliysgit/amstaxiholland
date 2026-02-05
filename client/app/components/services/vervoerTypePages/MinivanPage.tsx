// client/app/components/services/vervoerTypePages/MinivanPage.tsx
import React from "react";

interface ServicePageProps {
  slug: string;
  locale: string;
}

interface FeatureProps {
  title: string;
  text: string;
}

export default function MinivanPage({ slug, locale }: ServicePageProps) {
  return (
    <div className="text-white">
      {/* HERO */}
      <section className="py-24">
        <h1 className="text-4xl font-bold mb-4">Luxury Minivan Service</h1>
        <p className="text-gray-300 max-w-2xl">
          Ideaal voor groepen, families, crew en zakenteams met veel bagage.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <Feature
          title="Ruimte voor 6–7 personen"
          text="Comfortabele zitplaatsen met extra beenruimte."
        />
        <Feature
          title="Veel bagageruimte"
          text="Perfect voor luchthavenvervoer, wintersport of vakanties."
        />
        <Feature
          title="Comfort & luxe"
          text="Privacy glass, airco, soepele vering en stille rit."
        />
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}

function Feature({ title, text }: FeatureProps) {
  return (
    <div className="p-6 bg-white/10 rounded-xl border border-white/10">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

function CTASection() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Reserveer uw minivan</h2>
      <p className="text-gray-300 mb-6">
        Ideaal voor groepsvervoer naar Schiphol, events of zakelijke bestemmingen.
      </p>
      <a
        href="/reserveren"
        className="inline-block bg-white text-black py-3 px-8 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Plan groepsvervoer
      </a>
    </section>
  );
}
