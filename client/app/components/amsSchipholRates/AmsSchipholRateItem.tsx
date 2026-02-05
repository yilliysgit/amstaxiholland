'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import BusinessClassCarIcon from '@/app/assets/icons/BusinessClassCarIcon';
import MiniVanIcon from '@/app/assets/icons/MinivanCarIcon';
import { AmsSchipholRatesItem } from '@/types/amsSchipholRates/amsSchipholRates.type';

interface Props {
  location: AmsSchipholRatesItem;
  isVan: boolean;
  isSelected?: boolean;
}

const AmsSchipholRateItem: React.FC<Props> = ({ location, isVan, isSelected = false }) => {
  const t = useTranslations('HomePage.amsSchipholRates');
  const price = isVan ? location.price.van : location.price.sedan;

  return (
    <div className="bg-white/85 rounded-xl p-5 border border-gray-200/70 shadow-sm">
      {/* Row 1 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className={[
              'inline-flex items-center justify-center shrink-0 transition-all duration-200',
              'w-5 h-5 rounded-full ring-2 ring-emerald-400/30 bg-white',
              isSelected ? '' : 'opacity-70'
            ].join(' ')}
            aria-hidden="true"
          >
            <span
              className={[
                'w-3 h-3 rounded-full',
                isSelected ? 'bg-emerald-400' : 'bg-gray-300'
              ].join(' ')}
            />
          </span>

          <span className="text-gray-800 text-sm sm:text-base">
            <span className="font-light">{t('from')} </span>
            <span className="font-semibold">{location.name}</span>
            <span className="font-light">
              {' '}| {t('to')} <span className="font-semibold">Schiphol</span>
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-900">
          {isVan ? (
            <MiniVanIcon className="w-8 h-8" />
          ) : (
            <BusinessClassCarIcon className="w-8 h-8" />
          )}
          <span className="text-lg font-semibold tracking-tight">€{price}</span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 border border-gray-200/70">
        <div className="flex items-center gap-4">
          {location.badgeKey && (
            <span className="text-xs font-medium text-gray-800 whitespace-nowrap">
              {t(`badges.${location.badgeKey}`)}
            </span>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="inline-block w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <span>
              {t('travelTime')}: {location.travelTimeMinutes} {t('minutesShort')}
            </span>
          </div>
        </div>

        <button className="text-xs font-semibold text-gray-900 inline-flex items-center gap-1 hover:underline hover:text-gray-800">
          {t('bookNow')} <span className="inline-block">&#8594;</span>
        </button>
      </div>
    </div>
  );
};

export default AmsSchipholRateItem;
