"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation'; // ⬅️ TOEVOEGEN
import Logo from "@/app/assets/Logo/Logo";
import HelpButton from "@/app/components/ui/buttons/HelpButton";
import LoginButton from "@/app/components/ui/buttons/login/LoginButton";
import LoginPopOver from "@/app/components/ui/buttons/login/LoginPopOver";
import SignUpButton from "@/app/components/ui/buttons/signUp/SignUpButton";
import LanguageSwitcher from "@/app/components/layout/header/actions/LanguageSwitcher";
import MobileMenuButton from "@/app/components/layout/header/mobile/MobileMenuButton";
import MobileMenuOverlay from "@/app/components/layout/header/mobile/MobileMenuOverlay";
import Navigation from "@/app/components/layout/header/navigation/Navigation";

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams(); // ⬅️ TOEVOEGEN: Haal route params op
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = useCallback(() => setIsLoginOpen(v => !v), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(v => !v), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  
  // ⬅️ FIX: Voeg params toe
  const handleLanguageChange = useCallback((newLang: string) => {
    const newLocale = newLang.toLowerCase();
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known locales
      { pathname, params }, // ⬅️ Geef params mee!
      { locale: newLocale }
    );
  }, [router, pathname, params]); // ⬅️ Voeg params toe aan dependencies

  const languages = [
    { code: 'nl', name: t('languages.nl'), flag: '🇳🇱' },
    { code: 'en', name: t('languages.en'), flag: '🇬🇧' }
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <div className="flex-shrink-0">
              <Logo
                src="/images/logo.png"
                alt="AmstaxiHolland"
                href="/"
                height={54}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </div>

            <div className="hidden lg:flex flex-1">
              <Navigation className="flex items-center space-x-10" />
            </div>

            <div className="flex items-center">
              <div className="hidden lg:flex items-center space-x-6">
                <HelpButton />
                <LoginButton onClick={toggleLogin} expanded={isLoginOpen} controlsId="login-popup" />
                <LoginPopOver isOpen={isLoginOpen} onClose={closeLogin} id="login-popup" />
                <SignUpButton />
                
                <div className="border-l border-gray-300 pl-6">
                  <LanguageSwitcher
                    languages={languages}
                    current={locale.toUpperCase()}
                    onChange={handleLanguageChange}
                  />
                </div>
              </div>

              <div className="lg:hidden flex items-center space-x-3">
                <LanguageSwitcher
                  languages={languages}
                  current={locale.toUpperCase()}
                  onChange={handleLanguageChange}
                />
                <MobileMenuButton
                  isOpen={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                  controlsId="mobile-menu"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        currentLanguage={locale}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
}