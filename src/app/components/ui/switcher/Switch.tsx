import React, { useState } from 'react';

interface SwitchOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SwitchProps {
  options: SwitchOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'premium' | 'minimal';
  color?: 'blue' | 'gray' | 'emerald' | 'custom';
  customColors?: {
    active: string;
    inactive: string;
    background: string;
  };
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  options = [],
  defaultValue,
  onChange,
  size = 'md',
  variant = 'default',
  color = 'blue',
  customColors,
  className = ''
}) => {
  const [selected, setSelected] = useState(defaultValue || options[0]?.id || '');

  // Early return if no options
  if (!options || options.length === 0) {
    return null;
  }

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-2xl'
  };

  // Color classes
  const colorClasses = {
    blue: {
      active: 'bg-blue-600 text-white shadow-md',
      inactive: 'text-gray-600 hover:text-gray-800',
      background: 'bg-gray-100'
    },
    gray: {
      active: 'bg-gray-900 text-white shadow-md',
      inactive: 'text-gray-600 hover:text-gray-800', 
      background: 'bg-gray-100'
    },
    emerald: {
      active: 'bg-emerald-600 text-white shadow-md',
      inactive: 'text-gray-600 hover:text-gray-800',
      background: 'bg-gray-100'
    },
    custom: customColors ? {
      active: `text-white shadow-md`,
      inactive: 'text-gray-600 hover:text-gray-800',
      background: customColors.background
    } : {
      active: 'bg-blue-600 text-white shadow-md',
      inactive: 'text-gray-600 hover:text-gray-800',
      background: 'bg-gray-100'
    }
  };

  // Variant classes
  const variantClasses = {
    default: 'border border-gray-200',
    premium: 'glass-effect mercedes-shadow',
    minimal: 'border-0'
  };

  const colors = colorClasses[color];
  const sizes = sizeClasses[size];

  return (
<div className="flex items-center gap-4">
  {/* LEFT OPTION */}
  <div className="flex flex-col items-center">
    <SedanIcon className="w-10 h-10 text-white" />
    <span className="text-xs font-medium text-white">VAN MAX 4 PERS</span>
  </div>

  {/* TOGGLE */}
  <button
    onClick={toggle}
    className={`w-14 h-7 rounded-full transition-colors duration-300 ${
      isVan ? 'bg-gray-500' : 'bg-gray-300'
    }`}
  >
    <div
      className={`h-7 w-7 rounded-full bg-white transition-transform duration-300 ${
        isVan ? 'translate-x-7' : 'translate-x-0'
      }`}
    />
  </button>

  {/* RIGHT OPTION */}
  <div className="flex flex-col items-center">
    <VanIcon className="w-10 h-10 text-white" />
    <span className="text-xs font-medium text-white">VAN MAX 8 PERS</span>
  </div>
</div>
  );
};

export default Switch;