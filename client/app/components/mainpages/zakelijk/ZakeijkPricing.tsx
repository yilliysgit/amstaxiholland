

'use client';

import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { zakelijkGeneral } from '@/app/config/links/zakelijk/index';

type Locale = 'nl' | 'en';

export default function ZakelijkPricing() {
  const t = useTranslations('ZakelijkPage.pricing');
  const tCommon = useTranslations('Common');
  const locale = useLocale() as Locale;

  const packages = [
    { key: 'flex', highlighted: false },
    { key: 'business', highlighted: true },
    { key: 'corporate', highlighted: false },
  ] as const;

  return (
    <section
      id="tarieven"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="pricing-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            id="pricing-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.key}
              className={`
                relative rounded-2xl p-8 border-2 transition-all duration-300
                ${pkg.highlighted
                  ? 'border-gray-900 bg-white shadow-xl scale-105'
                  : 'border-gray-200 bg-white shadow-sm hover:shadow-lg'}
              `}
            >
              {/* Popular badge */}
              {pkg.key === 'flex' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" aria-hidden />
                    {t('packages.flex.popular')}
                  </div>
                </div>
              )}

              {/* Package header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t(`packages.${pkg.key}.name`)}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {t(`packages.${pkg.key}.tagline`)}
                </p>

                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900">
                    {t(`packages.${pkg.key}.price`)}
                  </div>
                  {pkg.key === 'business' && (
                    <div className="text-sm text-gray-500 mt-1">
                      {t('packages.business.priceNote')}
                    </div>
                  )}
                </div>

                <p className="text-gray-600">
                  {t(`packages.${pkg.key}.description`)}
                </p>
              </div>

              {/* CTA */}
              <a
                href={zakelijkGeneral.createAccount(locale)}
                className={`
                  w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-300 hover:scale-[1.02] mb-6
                  ${pkg.highlighted
                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                `}
              >
                {t(`packages.${pkg.key}.cta`)}
                <ArrowRight className="w-5 h-5" aria-hidden />
              </a>

              {/* Features */}
              <ul className="space-y-3">
                {(t.raw(`features.${pkg.key}`) as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        pkg.highlighted ? 'text-gray-900' : 'text-gray-600'
                      }`}
                      aria-hidden
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <p className="text-gray-600 mb-4">
            {t('footer.included')}
          </p>

          <p className="text-gray-700">
            {t('footer.questions')}{' '}
            <a
              href={`tel:${tCommon('contact.phone')}`}
              className="font-semibold text-gray-900 hover:underline"
            >
              {tCommon('contact.phone')}
            </a>
            {' '}
            {t('footer.or')}{' '}
            <a
              href={zakelijkGeneral.createAccount(locale)}
              className="font-semibold text-gray-900 hover:underline"
            >
              {t('footer.requestQuote')}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
