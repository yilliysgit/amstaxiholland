// client/app/components/services/vervoerTypePages/VipPage.tsx
import React from "react";

interface ServicePageProps {
  slug: string;
  locale: string;
}

interface FeatureProps {
  title: string;
  text: string;
}

export default function VipPage({ slug, locale }: ServicePageProps) {
  return (
    <div className="text-white">
      {/* HERO */}
      <section className="py-24">
        <h1 className="text-4xl font-bold mb-4">VIP Chauffeursservice</h1>
        <p className="text-gray-300 max-w-2xl">
          Exclusief, discreet en volledig op maat voor executives, artiesten en speciale gasten.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <Feature
          title="Topklasse voertuigen"
          text="Luxe limousines zoals Mercedes S-klasse en vergelijkbaar segment."
        />
        <Feature
          title="Maximale privacy"
          text="Discreet vervoer, ideaal voor high-profile gasten."
        />
        <Feature
          title="Service op maat"
          text="Ritten, wachttijden en routes volledig afgestemd op uw wensen."
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
      <h2 className="text-2xl font-bold mb-4">Plan uw VIP vervoer</h2>
      <p className="text-gray-300 mb-6">
        Neem contact op voor maatwerk, events, artiestenvervoer of meerdaagse inzet.
      </p>
      <a
        href="/reserveren"
        className="inline-block bg-white text-black py-3 px-8 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Offerte aanvragen
      </a>
    </section>
  );
}
