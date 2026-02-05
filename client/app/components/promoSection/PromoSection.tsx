// app/components/promoSection/PromoSection.tsx
'use client';

import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function PromoSection() {
  const t = useTranslations('HomePage.PromoSection');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative section-spacing-md bg-gradient-mercedes-subtle overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div
            className={`
              space-y-6
              transition-all duration-700
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            {/* Overline */}
            <div className="inline-flex items-center glass-effect px-4 py-2 rounded-full border border-gray-200/80 shadow-sm">
              <span className="text-gray-800 font-semibold text-[11px] sm:text-xs tracking-[0.22em] uppercase">
                {t('overline')}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              {t('title')}
            </h2>

            {/* Description */}
            <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              <p className="font-normal">{t('intro')}</p>
              <p className="font-normal text-gray-700">{t('description')}</p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 pt-3">
              {t.raw('benefits').map((benefit: string, idx: number) => (
                <div
                  key={idx}
                  className="
                    flex items-start gap-3
                    glass-effect bg-white/85
                    rounded-xl px-4 py-3.5
                    border border-gray-200/80
                    shadow-sm
                    hover:shadow-md hover:border-gray-300
                    transition-all duration-300
                  "
                >
                  <span className="mt-0.5 flex-shrink-0 rounded-full bg-emerald-50 p-1.5 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </span>
                  <span className="text-gray-800 font-medium text-sm sm:text-base">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="btn-gradient-primary group inline-flex w-full sm:w-auto items-center justify-center gap-2">
                {t('ctaLabel')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className={`
              relative
              transition-all duration-700 delay-150
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            {/* Soft background halo */}
            <div className="absolute -inset-6 bg-gradient-to-br from-white/70 via-slate-100/60 to-slate-200/60 rounded-[2rem] shadow-luxury" />

            <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden border border-gray-200/80 glass-effect bg-gradient-premium-card shadow-luxury">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/25 via-transparent to-transparent z-10" />

              <Image
                src="/images/premium-business-class-chauffeursservice-in-Amsterdam.webp"
                alt={t('imageAlt')}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Decorative glow */}
            <div className="absolute -bottom-6 -right-4 w-32 h-32 bg-gradient-to-br from-gray-300/40 to-transparent blur-2xl rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}