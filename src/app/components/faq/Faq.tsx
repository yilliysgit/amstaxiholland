'use client';

const faqs = [
  {
    q: "Hoe snel kan ik evenementenvervoer boeken?",
    a: "In de meeste gevallen kunnen we binnen 1 uur een voertuig inzetten binnen de Randstad. Voor grotere groepen adviseren we 24 uur van tevoren te boeken."
  },
  {
    q: "Kunnen jullie ook VIP of artiestenvervoer verzorgen?",
    a: "Ja, wij bieden discrete VIP-vervoer en shuttle services voor artiesten en special guests."
  },
  {
    q: "Rijden jullie ook buiten Nederland?",
    a: "Ja, naast vervoer binnen Nederland rijden wij ook naar België, Duitsland, Frankrijk en overige EU-landen."
  },
  {
    q: "Is het vervoer volledig verzekerd?",
    a: "Zeker, alle voertuigen zijn all-risk verzekerd en jouw passagiers zijn volledig gedekt."
  },
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-gradient-mercedes-light">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-gray-900)] mb-12 text-center">
          Veelgestelde vragen
        </h2>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="bg-white/70 backdrop-blur-lg rounded-xl p-6 mercedes-shadow cursor-pointer"
            >
              <summary className="font-semibold text-[var(--color-gray-900)] hover:text-[var(--color-gray-700)] transition-colors">
                {item.q}
              </summary>
              <p className="text-[var(--color-gray-600)] mt-2">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
