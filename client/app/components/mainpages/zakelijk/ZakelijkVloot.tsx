'use client';

import { Check, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { zakelijkVloot } from '@/app/config/links/zakelijk/vloot';

export default function ZakelijkVloot() {
  const t = useTranslations('ZakelijkPage.vloot');
  const locale = useLocale();
  
  const [activeTab, setActiveTab] = useState<'business' | 'vip' | 'van' | 'ladies'>('business');
  
  const categories = [
    { key: 'business' as const, link: zakelijkVloot.businessClass },
    { key: 'vip' as const, link: zakelijkVloot.vipClass },
    { key: 'van' as const, link: zakelijkVloot.minivanLuxury },
    { key: 'ladies' as const, link: zakelijkVloot.ladiesTaxi }
  ];

  const activeCategory = categories.find(c => c.key === activeTab)!;

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="vloot-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            id="vloot-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}{' '}
            <span className="font-semibold text-gray-900">{t('subtitleHighlight')}</span>
            {', '}
            {t('subtitleEnd')}
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label={t('ariaLabel')}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={activeTab === cat.key}
              aria-controls={`panel-${cat.key}`}
              onClick={() => setActiveTab(cat.key)}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-300
                ${activeTab === cat.key
                  ? 'bg-gray-900 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              {t(`categories.${cat.key}.name`)}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Image Placeholder */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 lg:p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/30 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border-2 border-white/50">
                  <span className="text-4xl font-bold text-gray-400">
                    {t(`categories.${activeTab}.name`).charAt(0)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Vehicle image placeholder</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {t(`categories.${activeTab}.name`)}
              </h3>

              <p className="text-lg text-gray-600 mb-8">
                {t(`categories.${activeTab}.subtitle`)}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {t(`categories.${activeTab}.featuresTitle`)}
                </h4>

                <ul className="space-y-2">
                  {Object.entries(t.raw(`categories.${activeTab}.features`) as Record<string,string>)
                    .map(([key, value]) => (
                      <li key={key} className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-gray-900 flex-shrink-0" aria-hidden />
                        <span>{value}</span>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Bullets */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <ul className="space-y-2">
                  {(t.raw(`categories.${activeTab}.bullets`) as string[]).map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href={typeof activeCategory.link === 'function' ? activeCategory.link(locale) : activeCategory.link}
                className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                {t(`categories.${activeTab}.cta`)}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>

            </div>
          </div>
        </div>

        {/* Bottom link */}
        <div className="text-center mt-12">
          <Link
            href={typeof zakelijkVloot.fleetOverview === 'function' ? zakelijkVloot.fleetOverview(locale) : zakelijkVloot.fleetOverview}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Bekijk alle voertuigen
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>

      </div>
    </section>
  );
}
