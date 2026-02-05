// /app/components/mainpages/schiphol-vervoer/SchipholPricing.tsx

'use client';

import { Check, ArrowRight, Zap, Building2, Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SchipholPricing() {
  const t = useTranslations('SchipholPage.pricing');
  const packages = t.raw('packages');

  // Icon mapping
  const iconMap: Record<string, any> = {
    'flex': Zap,
    'business': Building2,
    'corporate': Crown
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('sectionHeader.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('sectionHeader.description')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg: any, index: number) => {
            const IconComponent = iconMap[pkg.id] || Zap;
            const isDark = pkg.id === 'corporate';
            
            return (
              <div
                key={index}
                className={`relative rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  pkg.popular 
                    ? 'border-blue-500 shadow-xl' 
                    : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {pkg.popularBadge}
                    </span>
                  </div>
                )}

                {/* Card content */}
                <div className={`p-8 rounded-2xl bg-gradient-to-br ${pkg.id === 'flex' ? 'from-gray-50 to-gray-100' : pkg.popular ? 'from-blue-50 to-indigo-50' : 'from-gray-900 to-gray-800'} ${isDark ? 'text-white' : ''}`}>
                  
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark ? 'bg-white/10' : 'bg-gray-900'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${isDark ? 'text-white' : 'text-white'}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {pkg.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className={`text-4xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.price}
                    </div>
                    {pkg.priceNote && (
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {pkg.priceNote}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          isDark ? 'text-green-400' : 'text-gray-700'
                        }`} />
                        <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'} ${
                          feature.includes('Alles van') ? 'font-semibold' : ''
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : pkg.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    {pkg.cta}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom info */}
        <div className="bg-gray-100 rounded-2xl p-8 text-center">
          <p className="text-gray-700 mb-4">
            <strong>{t('disclaimer.title')}</strong> {t('disclaimer.text')}
          </p>
          <p className="text-sm text-gray-600">
            {t('disclaimer.contact.text')}{' '}
            <a href={`tel:${t('disclaimer.contact.phone')}`} className="font-semibold text-gray-900 hover:underline">
              {t('disclaimer.contact.phone')}
            </a>
            {' '}{t('disclaimer.contact.or')}{' '}
            <a href="#contact" className="font-semibold text-gray-900 hover:underline">
              {t('disclaimer.contact.linkText')}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}