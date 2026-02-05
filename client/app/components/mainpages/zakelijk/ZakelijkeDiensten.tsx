'use client';

import { Plane, Users, Car, Shield, Globe, CalendarCheck, ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { zakelijkDiensten } from '@/app/config/links/zakelijk/diensten';

export default function ZakelijkeDiensten() {
  const locale = useLocale();
  const t = useTranslations('ZakelijkPage.diensten');

  const services = [
    { icon: Plane, key: 'airport', link: zakelijkDiensten.airportTransfer },
    { icon: CalendarCheck, key: 'meeting', link: zakelijkDiensten.dailyTransport },
    { icon: Users, key: 'event', link: zakelijkDiensten.eventTransport },
    { icon: Shield, key: 'ladies', link: zakelijkDiensten.ladiesTaxi },
    { icon: Car, key: 'vip', link: zakelijkDiensten.vipTransport },
    { icon: Globe, key: 'contract', link: zakelijkDiensten.booking }
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="diensten-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 id="diensten-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon;

            const features = t.raw(`services.${service.key}.features`) as Record<string, string>;
            const featureList = Object.values(features).slice(0, 3);

            return (
              <div
                key={service.key}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" aria-hidden />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(`services.${service.key}.title`)}
                </h3>

                <p className="text-gray-600 mb-6">
                  {t(`services.${service.key}.description`)}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {featureList.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Link */}
                <Link
                  href={typeof service.link === 'function' ? service.link(locale) : service.link}
                  className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all duration-300"
                >
                  {t('cta.learnMore')}
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-lg mb-6">
            {t('cta.notFound')}
          </p>
          <Link
            href={typeof zakelijkDiensten.booking === 'function' ? zakelijkDiensten.booking(locale) : zakelijkDiensten.booking}
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            {t('cta.button')}
            <ArrowRight className="w-5 h-5" aria-hidden />
          </Link>
        </div>

      </div>
    </section>
  );
}
