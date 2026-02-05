// app/components/mainpages/zakelijk/ZakelijkAccountIntroSection.tsx
'use client';

import { CheckCircle2, Clock, Shield, Users, ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';  // 🆕 ADD useLocale
// import { Link } from '@/i18n/routing';
import { zakelijkGeneral } from '@/app/config/links/zakelijk/index';

export default function ZakelijkAccountIntroSection() {
  const locale = useLocale();  // 🆕 ADD
  const t = useTranslations('ZakelijkPage.accountIntro');
  
  return (
    <section
      id="zakelijk-account"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="account-intro-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            id="account-intro-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            {t('description')}
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto">
            {t('details')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('features.setup.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.setup.description')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('features.sla.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.sla.description')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('features.invoicing.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.invoicing.description')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('features.team.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.team.description')}
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('process.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('process.steps.apply.title')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('process.steps.apply.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('process.steps.activate.title')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('process.steps.activate.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('process.steps.book.title')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('process.steps.book.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">{t('stats.rating')}</div>
              <div className="text-gray-300">{t('stats.ratingLabel')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{t('stats.rides')}</div>
              <div className="text-gray-300">{t('stats.ridesLabel')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{t('stats.clients')}</div>
              <div className="text-gray-300">{t('stats.clientsLabel')}</div>
            </div>
          </div>
        </div>

        {/* Included */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {t('included.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('included.accountManager')}</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('included.reports')}</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('included.priority')}</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('included.drivers')}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('cta.title')}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <a
  href={zakelijkGeneral.createAccount(locale as 'nl' | 'en')}
  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg"
>
  {t('cta.button')}
  <ArrowRight className="w-5 h-5" aria-hidden />
</a>

          <p className="text-xs text-gray-500 mt-4">
            {t('cta.terms')}
          </p>
        </div>
      </div>
    </section>
  );
}