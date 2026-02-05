'use client';

import { useTranslations } from 'next-intl';
import { AmsSchipholRatesItem } from '@/types/amsSchipholRates/amsSchipholRates.type';
import { Plane, Clock, Shield } from 'lucide-react';

interface Props {
  location: AmsSchipholRatesItem;
  isVan: boolean;
}

export default function HighlightCard({ location, isVan }: Props) {
  const t = useTranslations('HomePage.amsSchipholRates');
  const price = isVan ? location.price.van : location.price.sedan;

  return (
    <div className="glass-effect bg-gradient-premium-card rounded-2xl shadow-luxury border border-gray-200/80 p-8 lg:p-9">
      {/* Bolletje + Naam */}
      <div className="flex items-center gap-2 mb-6">
        <div 
          className="w-3 h-3 rounded-full ring-2 ring-emerald-400/40 ring-offset-2 ring-offset-white bg-emerald-400"
        />
        <span className="text-sm font-medium text-gray-700 tracking-tight">
          {location.name}
        </span>
      </div>

      {/* Grote Prijs */}
      <div className="text-center mb-8">
        <div className="text-5xl font-semibold text-gray-900 mb-2 tracking-tight">
          €{price}
        </div>
        <p className="text-sm text-gray-600">
          {t('fixedPriceTo')}
        </p>
      </div>

      {/* Info */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3.5 border border-gray-200/70">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <div className="font-semibold text-gray-900">
              ~{location.travelTimeMinutes} {t('minutesShort')}
            </div>
            <div className="text-sm text-gray-500">
              {t('averageTime')}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3.5 border border-gray-200/70">
          <Shield className="w-5 h-5 text-gray-500" />
          <div>
            <div className="font-semibold text-gray-900">
              {t(`availability.${location.availability}`)}
            </div>
            <div className="text-sm text-gray-500">
              {t('available')}
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="btn-gradient-primary w-full flex items-center justify-center gap-2">
        <Plane className="w-5 h-5" />
        {t('bookNowDirect')}
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        {t('pricesIncludeVAT')} • {t(`availability.${location.availability}`)} {t('available').toLowerCase()}
      </p>
    </div>
  );
}
