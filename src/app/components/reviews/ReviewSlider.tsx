'use client';

import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Jan van der Berg",
    company: "TechStart BV",
    text: "Fantastische service en altijd op tijd. Onze medewerkers worden professioneel vervoerd.",
    rating: 5,
  },
  {
    name: "Maria Jansen",
    company: "E-Shop NL",
    text: "Perfecte VIP transfers voor onze internationale gasten. Zeer hoge kwaliteit.",
    rating: 5,
  },
  {
    name: "Peter de Wit",
    company: "MedSupply",
    text: "Altijd bereikbaar en zeer flexibel. Onze vaste partner voor evenementenvervoer.",
    rating: 5,
  },
  {
    name: "Laura Vermeer",
    company: "Events & Co.",
    text: "Onze artiesten worden altijd professioneel vervoerd. Punctueel en betrouwbaar.",
    rating: 5,
  }
];

export default function ReviewSlider() {
  return (
    <section className="py-24 bg-gradient-mercedes-light">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-gray-900)] mb-12 text-center">
          Wat klanten over ons zeggen
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 mercedes-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[var(--color-gray-700)] mb-4 leading-relaxed">
                “{review.text}”
              </p>
              <div className="font-semibold text-[var(--color-gray-900)]">{review.name}</div>
              <div className="text-sm text-[var(--color-gray-600)]">{review.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
