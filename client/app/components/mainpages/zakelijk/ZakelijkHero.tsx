'use client';

import { ShieldCheck, Clock, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { zakelijkHero } from '@/app/config/links/zakelijk/hero';

export default function ZakelijkHero() {
  const locale = useLocale();
  const t = useTranslations('ZakelijkPage.hero');
  

if (typeof window !== 'undefined') {
    console.log('🎨 CLIENT - ZakelijkHero locale:', locale);
    console.log('🎨 CLIENT - Hero badge:', t('badge'));
  }

  console.log('🎨 CLIENT locale:', locale);
  console.log('🎨 CLIENT badge:', t('badge'));
  console.log('🎨 CLIENT title:', t('title'));

  return (
    <>
      <section
        aria-labelledby="zakelijk-hero-title"
        className="
          relative overflow-visible text-white
          bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
          [--cta-h:88px]
          h-[calc(50vh+180px)] md:h-[calc(50svh+180px)]
        "
      >
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
                <Briefcase className="w-4 h-4" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {t('badge')}
                </span>
              </div>

              {/* Headline */}
              <h1
                id="zakelijk-hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              >
                {t('title')}
                <span className="block text-gray-300 mt-2">
                  {t('titleHighlight')}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-7 max-w-2xl leading-relaxed">
                {t('description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">

                {/* PRIMARY CTA — FIXED (string only) */}
                <a
                  href={locale === 'nl' ? '#zakelijk-account' : '#business-account'}
  className="group inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] shadow-lg"
>
  {t('cta.primary')}
  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden />
</a>

{/* SECONDARY CTA - externe link */}
<a
  href={zakelijkHero.contact}
  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
>
  {t('cta.secondary')}
</a>
              </div>

              {/* Features */}
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300">
                <li className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" aria-hidden />
                  <span>{t('features.response')}</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gray-400" aria-hidden />
                  <span>{t('features.sla')}</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" aria-hidden />
                  <span>{t('features.ontime')}</span>
                </li>
              </ul>
            </div>

            {/* Right: Trust Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
                <p className="text-sm text-gray-300 mb-6">{t('trustCard.trustedBy')}</p>

                <div className="grid grid-cols-3 gap-4 mb-6" aria-hidden>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10" />
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{t('trustCard.rating')}</span>
                    <span className="font-bold text-white">4.9/5</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-300">{t('trustCard.ridesPerMonth')}</span>
                    <span className="font-bold text-white">10.000+</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA-BAR */}
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pointer-events-auto">
            <div className="h-[var(--cta-h)] bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex h-full flex-wrap items-center justify-between gap-6">

                <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700 font-medium">
                  <li><span className="dot" />{t('ctaBar.available')}</li>
                  <li><span className="dot" />{t('ctaBar.invoicing')}</li>
                  <li><span className="dot" />{t('ctaBar.realtime')}</li>
                  <li><span className="dot" />{t('ctaBar.fixedRates')}</li>
                </ul>

                {/* Bottom CTA — FIXED */}
                <a
                  href={locale === 'nl' ? '#offerte' : '#quote'}
  className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
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
