'use client';

import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface PromoSectionProps {
  title: string;
  intro: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function PromoSection({
  title,
  intro,
  description,
  benefits,
  ctaLabel,
  imageSrc,
  imageAlt,
  reverse = false,
}: PromoSectionProps) {
  return (
    <section className="py-16 px-6 bg-[#F1F4F9]">
      <div
        className={`
          max-w-7xl mx-auto grid items-center gap-10
          bg-white rounded-xl p-10 shadow-sm
          md:grid-cols-2
          ${reverse ? 'md:grid-flow-dense' : ''}
        `}
      >
        {/* Text */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-snug">
            {title}
          </h2>

          <p className="text-gray-700">{intro}</p>
          <p className="text-gray-700">{description}</p>

          <ul className="space-y-3">
            {benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-navy-700 mt-1 w-5 h-5" />
                <span className="text-gray-800">{b}</span>
              </li>
            ))}
          </ul>

          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-navy-700 to-gray-700 hover:opacity-90 transition">
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full h-[380px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
