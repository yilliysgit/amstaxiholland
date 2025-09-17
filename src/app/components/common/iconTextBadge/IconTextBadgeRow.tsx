// app/components/common/iconTextBadge/IconTextBadgeRow.tsx
import { IconTextBadge } from "./IconTextBadge";
import { IconTextBadgeProps } from "@/types/ui/IconTextBadge/IconTextBadge.type";

interface IconTextBadgeRowProps {
  badges: IconTextBadgeProps[];
  className?: string;
  variant?: 'default' | 'centered' | 'spaced';
}

export const IconTextBadgeRow = ({ 
  badges, 
  className = "",
  variant = 'default'
}: IconTextBadgeRowProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'centered':
        return 'justify-center';
      case 'spaced':
        return 'justify-between';
      default:
        return 'justify-start flex-wrap';
    }
  };

  return (
    <section className={`py-12 lg:py-16 relative ${className}`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-100/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className={`flex gap-4 lg:gap-6 ${getVariantClasses()}`}>
          {badges.map((badge, index) => (
            <IconTextBadge 
              key={index}
              icon={badge.icon} 
              text={badge.text}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};