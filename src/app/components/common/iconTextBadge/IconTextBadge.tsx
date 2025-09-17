// app/components/common/iconTextBadge/IconTextBadge.tsx
import { IconTextBadgeProps } from "@/types/ui/IconTextBadge/IconTextBadge.type";

interface EnhancedIconTextBadgeProps extends IconTextBadgeProps {
  animationDelay?: number;
}

export const IconTextBadge = ({ 
  icon: Icon, 
  text, 
  animationDelay = 0 
}: EnhancedIconTextBadgeProps) => {
  return (
    <div 
      className="group flex items-center space-x-4 px-6 py-4 glass-effect rounded-2xl hover:scale-105 transition-all duration-300 border border-gray-200/50 hover:border-gray-300/70 shadow-md hover:shadow-xl animate-fade-in"
      style={{ 
        animationDelay: `${animationDelay}s`,
        animationFillMode: 'both'
      }}
    >
      {/* Icon Container */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <Icon className="w-6 h-6 text-gray-700 group-hover:text-gray-800 transition-colors duration-300" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Text */}
      <span className="text-base lg:text-lg font-semibold text-gray-800 whitespace-nowrap group-hover:text-gray-900 transition-colors duration-300">
        {text}
      </span>
    </div>
  );
};

// Enhanced version with different variants
export const IconTextBadgeVariants = {
  // Compact version for smaller spaces
  Compact: ({ icon: Icon, text, animationDelay = 0 }: EnhancedIconTextBadgeProps) => (
    <div 
      className="group flex items-center space-x-3 px-4 py-3 glass-effect rounded-xl hover:scale-105 transition-all duration-300 border border-gray-200/50 hover:border-gray-300/70 shadow-sm hover:shadow-lg animate-fade-in"
      style={{ 
        animationDelay: `${animationDelay}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-gray-700 group-hover:text-gray-800 transition-colors duration-300" />
      </div>
      <span className="text-sm lg:text-base font-medium text-gray-800 whitespace-nowrap group-hover:text-gray-900 transition-colors duration-300">
        {text}
      </span>
    </div>
  ),

  // Premium version with accent colors
  Premium: ({ icon: Icon, text, animationDelay = 0 }: EnhancedIconTextBadgeProps) => (
    <div 
      className="group flex items-center space-x-4 px-8 py-5 glass-effect rounded-2xl hover:scale-105 transition-all duration-300 border border-gray-200/50 hover:border-gray-300/70 shadow-lg hover:shadow-2xl animate-fade-in relative overflow-hidden"
      style={{ 
        animationDelay: `${animationDelay}s`,
        animationFillMode: 'both'
      }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
        <Icon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
      </div>
      
      <span className="relative text-lg lg:text-xl font-bold text-gray-800 whitespace-nowrap group-hover:text-gray-900 transition-colors duration-300">
        {text}
      </span>
    </div>
  ),

  // Minimal version for clean layouts
  Minimal: ({ icon: Icon, text, animationDelay = 0 }: EnhancedIconTextBadgeProps) => (
    <div 
      className="group flex items-center space-x-3 px-4 py-2 hover:bg-gray-50/50 rounded-lg transition-all duration-300 animate-fade-in"
      style={{ 
        animationDelay: `${animationDelay}s`,
        animationFillMode: 'both'
      }}
    >
      <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
      <span className="text-base font-medium text-gray-700 whitespace-nowrap group-hover:text-gray-900 transition-colors duration-300">
        {text}
      </span>
    </div>
  )
};

