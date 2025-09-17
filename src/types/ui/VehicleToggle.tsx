'use client';
import React from 'react';
import BusinessClassCarIcon from '@/app/assets/icons/BusinessClassCarIcon';
import MiniVanIcon from '@/app/assets/icons/MinivanCarIcon';

interface VehicleToggleProps {
  isVan: boolean;
  onToggle: (val: boolean) => void;
}

// true  = van
// false = sedan
const VehicleToggle: React.FC<VehicleToggleProps> = ({ isVan, onToggle }) => {
  return (
    <div className="flex items-center gap-4">
      {/* LEFT ICON + LABEL (SEDAN) */}
      <button
        onClick={() => onToggle(false)}
        className={`
          flex flex-col items-center p-2 rounded-lg
          ${!isVan ? 'bg-gray-200' : ''}
        `}
      >
        <BusinessClassCarIcon className="w-10 h-10 text-black" />
        <span className="text-xs text-black">MAX 4 PERS</span>
      </button>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => onToggle(!isVan)}
        className={`w-14 h-7 rounded-full transition-all duration-300 ${
          isVan ? 'bg-gray-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`h-7 w-7 rounded-full bg-blue-800 transition-transform duration-300 ${
            isVan ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>

      {/* RIGHT ICON + LABEL (VAN) */}
      <button
        onClick={() => onToggle(true)}
        className={`
          flex flex-col items-center p-2 rounded-lg
          ${isVan ? 'bg-gray-200' : ''}
        `}
      >
        <MiniVanIcon className="w-10 h-10 text-black" />
        <span className="text-xs text-black">MAX 8 PERS</span>
      </button>
    </div>
  );
};

export default VehicleToggle;
