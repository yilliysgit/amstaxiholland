"use client";

import { IconTextBadgeProps } from "@/types/ui/iconTextBadge/iconTextBadge.type";

export const IconTextBadge = ({ 
  icon: Icon, 
  text 
}: IconTextBadgeProps) => {
  return (
    <div
      className="
        flex sm:inline-flex 
        flex-col sm:flex-row 
        items-center 
        gap-2 sm:gap-3
        glass-effect
        bg-gradient-premium-card
        rounded-xl sm:rounded-2xl
        px-4 py-4 sm:px-6 sm:py-4
        border border-gray-200/70
        mercedes-shadow
        transition-all duration-300
        hover:shadow-luxury
        hover:border-gray-300
        hover:-translate-y-0.5
        text-center sm:text-left
      "
    >
      <div
        className="
          flex items-center justify-center
          w-10 h-10 sm:w-11 sm:h-11
          rounded-lg sm:rounded-xl
          bg-gradient-button-primary
          flex-shrink-0
          shadow-md
        "
      >
        <Icon 
          size={20}
          strokeWidth={2.4}
          className="text-white"
        />
      </div>
      
      <span className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};
