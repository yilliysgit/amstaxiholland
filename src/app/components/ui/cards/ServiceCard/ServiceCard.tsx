// @/components/ui/cards/ServiceCard.tsx
"use client";

import { TaxiService } from "@/types/services/services.type";
import { 
  Plane, 
  Briefcase, 
  Crown, 
  Camera, 
  Heart, 
  Users, 
  Moon, 
  Ship,
  Check,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Plane, Briefcase, Crown, Camera, Heart, Users, Moon, Ship
};

interface ServiceCardProps {
  service: TaxiService;
  className?: string;
}

export default function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const { title, description, price, features, ctaText, icon, badge } = service;
  const IconComponent = iconMap[icon as keyof typeof iconMap];

  return (
    <div className={`group bg-white rounded-2xl shadow-luxury border border-gray-200/60 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${className}`}>
      {/* Hero Section with Icon */}
      <div className="relative h-52 bg-gradient-mercedes-premium flex items-center justify-center pattern-overlay">
        {IconComponent && (
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="h-10 w-10 text-navy-700" />
            </div>
          </div>
        )}
        {badge && (
          <div className="absolute top-4 left-4 bg-navy-800 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md">
            {badge}
          </div>
        )}
        <div className="absolute top-4 right-4 text-right">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
            <span className="text-lg font-bold text-navy-800">{price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-navy-800 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        
        {/* Features */}
        <div className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 bg-gradient-to-r from-navy-600 to-navy-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full bg-gradient-to-r from-navy-700 to-navy-800 hover:from-navy-800 hover:to-navy-900 text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
          <span>{ctaText}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}