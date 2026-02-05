// client/app/components/services/vervoerTypePages/LadiesTaxiPage.tsx
import React from "react";

interface ServicePageProps {
  slug: string;
  locale: string;
}

interface FeatureProps {
  title: string;
  text: string;
}

export default function LadiesTaxiPage({ slug, locale }: ServicePageProps) {
  return (
    <div className="text-white">
      {/* HERO */}
      <section className="py-24">
        <h1 className="text-4xl font-bold mb-4">Ladies Taxi</h1>
        <p className="text-gray-300 max-w-2xl">
          Veilig en comfortabel vervoer, speciaal gericht op vrouwen en hun wensen.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <Feature
          title="Veiligheidsgevoel"
          text="Extra aandacht voor een vertrouwde en ontspannen reis."
        />
        <Feature
          title="Discreet vervoer"
          text="Rustige, respectvolle benadering — zonder haast of druk."
        />
        <Feature
          title="Flexibel inzetbaar"
          text="Uitgaansavonden, nachtwerk, vroege vluchten of privé-afspraken."
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
      <h2 className="text-2xl font-bold mb-4">Boek uw Ladies Taxi</h2>
      <p className="text-gray-300 mb-6">
        Plan uw rit vooruit en ga met een gerust gevoel op pad.
      </p>
      <a
        href="/reserveren"
        className="inline-block bg-white text-black py-3 px-8 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Reserveer nu
      </a>
    </section>
  );
}
