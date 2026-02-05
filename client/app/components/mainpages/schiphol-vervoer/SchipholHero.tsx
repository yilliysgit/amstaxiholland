// /app/components/mainpages/schiphol-vervoer/SchipholHero.tsx

'use client';

import { Plane, Clock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function SchipholHero() {
  const t = useTranslations('SchipholPage.hero');
  
  // Get routes and features arrays
  const routes = t.raw('priceCard.routes');
  const features = t.raw('features');
  const ctaBarFeatures = t.raw('ctaBar.features');

  return (
    <>
      <section
        aria-labelledby="schiphol-hero-title"
        className="
          relative overflow-visible text-white
          bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900
          [--cta-h:88px]
          h-[calc(50vh+180px)] md:h-[calc(50svh+180px)]
        "
      >
        {/* Inhoud */}
        <div
          className="
            relative mx-auto max-w-7xl box-border
            h-full
            px-4 sm:px-6 lg:px-12
            pt-6 md:pt-8 lg:pt-10
            pb-[calc(var(--cta-h)/2+28px)]
            flex items-center
          "
        >
          <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 mb-5">
                <Plane className="w-4 h-4" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wider">{t('badge')}</span>
              </div>

              {/* Headline */}
              <h1
                id="schiphol-hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              >
                {t('title')}
                <span className="block text-blue-200 mt-2">{t('subtitle')}</span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 mb-7 max-w-2xl leading-relaxed">
                {t('description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <a
                  href="#boek-schiphol"
                  className="group inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  {t('cta.primary')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>

                <a
                  href="#tarieven"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t('cta.secondary')}
                </a>
              </div>

              {/* Features list */}
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">
                <li className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-300" aria-hidden />
                  <span>{features[0]}</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-300" aria-hidden />
                  <span>{features[1]}</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-300" aria-hidden />
                  <span>{features[2]}</span>
                </li>
              </ul>
            </div>

            {/* Right: Price Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
                <p className="text-sm text-blue-200 mb-6">{t('priceCard.title')}</p>
                <div className="space-y-4 mb-6">
                  {routes.map((route: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                      <span className="text-white font-medium">{route.from} → {route.to}</span>
                      <span className="font-bold text-white">{route.price}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-200">{t('priceCard.stats.avgTime.label')}</span>
                    <span className="font-bold text-white">{t('priceCard.stats.avgTime.value')}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-blue-200">{t('priceCard.stats.onTimeGuarantee.label')}</span>
                    <span className="font-bold text-white">{t('priceCard.stats.onTimeGuarantee.value')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA-balk (zwevend) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pointer-events-auto">
            <div className="h-[var(--cta-h)] bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex h-full flex-wrap items-center justify-between gap-6">
                <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700 font-medium">
                  {ctaBarFeatures.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#boek-nu"
                  className="group inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  {t('ctaBar.cta')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}