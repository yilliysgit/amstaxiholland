import React from "react";

interface VervoerTypeProps {
  data: {
    title: string;
    heroSubtitle: string;
    intro: string;
    featuresTitle: string;
    features: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    seo: { title: string; description: string };
  };
  locale: string; // ← DIT MIS JIJ
}

export default function VervoerTypeTemplate({ data, locale }: VervoerTypeProps) {
  return (
    <div className="text-white">
      {/* HERO */}
      <section className="py-24">
        <h1 className="text-4xl font-bold mb-3">{data.title}</h1>
        <p className="text-gray-300">{data.heroSubtitle}</p>
      </section>

      {/* INTRO */}
      <section className="py-12 max-w-3xl text-gray-300">
        {data.intro}
      </section>

      {/* FEATURES */}
      <section className="py-16 grid md:grid-cols-2 gap-8 max-w-5xl">
        <h2 className="col-span-full text-2xl font-semibold mb-6">
          {data.featuresTitle}
        </h2>

        {data.features.map((feat, i) => (
          <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10">
            {feat}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <a
          href={`/${locale}/reserveren`}
          className="inline-block bg-white text-black py-3 px-8 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          {data.ctaPrimary}
        </a>
      </section>
    </div>
  );
}
