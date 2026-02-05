"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { mainNav } from "@/app/config/links/mainNav";
import { isActiveRoute } from "@/app/config/links/helpers";
import { routing } from "@/i18n/routing";
import NavigationItem from "../navigation/NavLinkItem";
import HelpButton from "@/app/components/ui/buttons/HelpButton";
import LoginButton from "@/app/components/ui/buttons/login/LoginButton";
import SignUpButton from "@/app/components/ui/buttons/signUp/SignUpButton";
import LanguageSwitcher from "../actions/LanguageSwitcher";
import type { NavItemKey } from "@/app/config/links/mainNav";


interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export default function MobileMenuOverlay({ 
  isOpen, 
  onClose,
  currentLanguage,
  onLanguageChange
}: MobileMenuOverlayProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header.navigation");
  
  const [activeItem, setActiveItem] = useState(
    mainNav.find((item) => isActiveRoute(pathname, item.href[locale as 'nl' | 'en']))?.key ?? "particulier"
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const handleItemClick = (itemId: NavItemKey) => {
  setActiveItem(itemId);
  onClose();
};

  if (!isOpen) return null;

  // Language config voor switcher
  const languages = routing.locales.map(loc => ({
    code: loc.toUpperCase(),
    name: loc === 'nl' ? 'Nederlands' : 'English',
    flag: loc === 'nl' ? '🇳🇱' : '🇬🇧'
  }));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
        id="mobile-menu"
        className="
          fixed left-0 right-0 z-50 lg:hidden
          top-16  
          bottom-0 bg-white border-t border-gray-200
          animate-in slide-in-from-top duration-300 ease-out
          shadow-lg
        "
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 id="mobile-nav-title" className="text-lg font-semibold text-gray-900">
              Menu
            </h2>
            <LanguageSwitcher
              languages={languages}
              current={currentLanguage}
              onChange={onLanguageChange}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1 px-4">
            {mainNav.map((navItem) => {
              const currentHref = navItem.href[locale as 'nl' | 'en'];
              const isActive = activeItem === navItem.key;
              
              return (
                <li key={navItem.key}>
                  <NavigationItem
                    item={{
                      id: navItem.key,
                      name: t(navItem.key),
                      href: currentHref,
                      active: isActive
                    }}
                    isMobile={true}
                    onClick={() => handleItemClick(navItem.key)}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
          <div className="space-y-3">
            {/* Primary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <LoginButton onClick={onClose} />
               <SignUpButton 
                href="/signup" 
                className="flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              />
            </div>
            
            {/* Help Link */}
            <div className="text-center pt-2">
              <HelpButton className="text-gray-500 hover:text-slate-700" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}