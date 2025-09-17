// AmsRateItem.tsx
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

const AmsRateItem: React.FC<Props> = ({ location, isVan }) => {
  return (
    <div className="flex items-center justify-between mb-2">
  {/* Titel */}
  <div>
    <span className="font-light">Vanaf </span>
    <span className="font-semibold">{location.name}</span>
    <span className="font-light">
      {' '}| Naar <span className="font-semibold">Schiphol</span>
    </span>
  </div>

  {/* Icon + prijs */}
  <div className="flex items-center gap-2">
    {isVan ? (
      <MiniVanIcon className="w-8 h-8 text-gray-800" />
    ) : (
      <BusinessClassCarIcon className="w-8 h-8 text-gray-800" />
    )}
    <span className="text-lg font-semibold">
      €{isVan ? location.price.van : location.price.sedan}
    </span>
  </div>
</div>

  );
};

export default AmsRateItem;
