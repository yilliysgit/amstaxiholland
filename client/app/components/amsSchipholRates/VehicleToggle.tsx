'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import BusinessClassCarIcon from '@/app/assets/icons/BusinessClassCarIcon';
import MiniVanIcon from '@/app/assets/icons/MinivanCarIcon';

interface VehicleToggleProps {
  isVan: boolean;
  onToggle: (val: boolean) => void;
}

// true  = van
// false = sedan
const VehicleToggle: React.FC<VehicleToggleProps> = ({ isVan, onToggle }) => {
  const t = useTranslations('HomePage.amsSchipholRates.vehicle');

  return (
    <div className="flex items-center gap-4 sm:gap-5">
      {/* LEFT ICON + LABEL (SEDAN) */}
      <button
        onClick={() => onToggle(false)}
        className={`
          flex flex-col items-center px-3 py-2 rounded-xl
          border transition-all duration-300
          ${!isVan 
            ? 'bg-white/90 border-gray-300 shadow-md scale-[1.02]' 
            : 'bg-white/60 border-gray-200 hover:bg-white/80'
          }
        `}
      >
        <BusinessClassCarIcon className="w-9 h-9 text-gray-900" />
        <span className="mt-1 text-[11px] font-medium text-gray-800 tracking-wide uppercase">
          {t('sedan')}
        </span>
      </button>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => onToggle(!isVan)}
        className={`
          relative w-16 h-8 rounded-full transition-all duration-300
          border border-gray-300/70
          ${isVan ? 'bg-gray-800/90' : 'bg-gray-200/80'}
        `}
      >
        <div
          className={`
            h-7 w-7 rounded-full bg-white shadow-md 
            transition-transform duration-300
            ${isVan ? 'translate-x-8' : 'translate-x-0'}
          `}
        />
      </button>

      {/* RIGHT ICON + LABEL (VAN) */}
      <button
        onClick={() => onToggle(true)}
        className={`
          flex flex-col items-center px-3 py-2 rounded-xl
          border transition-all duration-300
          ${isVan 
            ? 'bg-white/90 border-gray-300 shadow-md scale-[1.02]' 
            : 'bg-white/60 border-gray-200 hover:bg-white/80'
          }
        `}
      >
        <MiniVanIcon className="w-9 h-9 text-gray-900" />
        <span className="mt-1 text-[11px] font-medium text-gray-800 tracking-wide uppercase">
          {t('van')}
        </span>
      </button>
    </div>
  );
};

export default VehicleToggle;
