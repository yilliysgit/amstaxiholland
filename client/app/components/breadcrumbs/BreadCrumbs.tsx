"use client";
import { Link } from "@/i18n/routing"; 
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; 
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  customLabel?: string;
}

export default function Breadcrumbs({ customLabel }: BreadcrumbsProps) {
  const pathname = usePathname();
  const locale = useLocale(); 
  const t = useTranslations('Breadcrumbs');
  
  const pathWithoutLocale = pathname.startsWith(`/${locale}`) 
    ? pathname.replace(`/${locale}`, '')
    : pathname;
    
  const segments = pathWithoutLocale.split('/').filter(Boolean);
  
  if (segments.length === 0) return null;
  
  // Helper functie om label te krijgen

const getLabel = (segment: string): string => {
  // 🔍 DEBUG
  console.log('🌍 Current locale:', locale);
  console.log('📍 Segment:', segment);
  console.log('✅ Has translation?', t.has(segment as any));
  
  if (t.has(segment as any)) {
    const translation = t(segment as any);
    console.log('📝 Translation:', translation);
    return translation;
  }
  
  console.log('❌ No translation found - using fallback');
  
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


  return (
    <nav 
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-gray-600 mb-8"
    >
      <Link 
        href="/"
        className="hover:text-gray-900 transition-colors flex items-center p-1.5 hover:bg-gray-100 rounded-lg"
        aria-label={t('home')}
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        
        // Custom label voor laatste segment
        if (isLast && customLabel) {
          return (
            <div key={href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
              <span className="text-gray-900 font-semibold">{customLabel}</span>
            </div>
          );
        }
        
        const label = getLabel(segment);
        
        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            {isLast ? (
              <span 
                className="text-gray-900 font-semibold" 
                aria-current="page"
              >
                {label}
              </span>
            ) : (
              <Link 
                href={href as any}
                className="hover:text-gray-900 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 font-medium"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}