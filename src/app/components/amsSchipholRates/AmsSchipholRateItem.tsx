'use client';
import React from 'react';
import BusinessClassCarIcon from '@/app/assets/icons/BusinessClassCarIcon';
import MiniVanIcon from '@/app/assets/icons/MinivanCarIcon';

interface Props {
  location: {
    name: string;
    price: { sedan: number; van: number };
    color: string;
    badge: string | null;
    travelTime: string;
  };
  isVan: boolean;
}

const AmsSchipholRateItem: React.FC<Props> = ({ location, isVan }) => {
  return (
    <div className="bg-[#F1F4F9] rounded-xl p-5">
      {/* Row 1 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: location.color }}
          />
          <span className="text-gray-800">
            <span className="font-light">Vanaf </span>
            <span className="font-semibold">{location.name}</span>
            <span className="font-light">
              {' '}| Naar <span className="font-semibold">Schiphol</span>
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-800">
          {isVan ? (
            <MiniVanIcon className="w-8 h-8" />
          ) : (
            <BusinessClassCarIcon className="w-8 h-8" />
          )}
          <span className="text-lg font-semibold">
            €{isVan ? location.price.van : location.price.sedan}
          </span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-between bg-[#E8EDF3] rounded-lg px-4 py-2">
        <div className="flex items-center gap-4">
          {location.badge && (
            <span className="text-xs font-medium text-gray-800">
              {location.badge}
            </span>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="inline-block w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <span>Reistijd: {location.travelTime}</span>
          </div>
        </div>

        <button className="text-xs font-medium text-gray-800 inline-flex items-center gap-1 hover:underline">
          Boek Nu <span className="inline-block">&#8594;</span>
        </button>
      </div>
    </div>
  );
};

export default AmsSchipholRateItem;
