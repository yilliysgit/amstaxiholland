"use client";

import { useState, useCallback } from "react";
import Logo from "@/app/assets/Logo/Logo";
import HelpButton from "@/app/components/ui/buttons/HelpButton";
import LoginButton from "@/app/components/ui/buttons/login/LoginButton";
import LoginPopOver from "@/app/components/ui/buttons/login/LoginPopOver";
import SignUpButton from "@/app/components/ui/buttons/signUp/SignUpButton";
import LanguageSwitcher from "@/app/components/layout/header/actions/LanguageSwitcher";
import MobileMenuButton from "@/app/components/layout/header/mobile/MobileMenuButton";
import MobileMenuOverlay from "@/app/components/layout/header/mobile/MobileMenuOverlay";
import Navigation from "@/app/components/layout/header/navigation/Navigation";
import { DEFAULT_HEADER_CONFIG } from "@/app/config/header/config";

export default function Header() {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_HEADER_CONFIG.currentLanguage);


  // ✅ nieuw: state voor de login-modal

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = useCallback(() => setIsLoginOpen(v => !v), []);
  const closeLogin  = useCallback(() => setIsLoginOpen(false), []);


const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(v => !v), []);
const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

const handleLanguageChange = useCallback((newLang: string) => {
  setCurrentLanguage(newLang);
   console.log("Language changed to:", newLang);
  }, []);

  const { logo, languages } = DEFAULT_HEADER_CONFIG;

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Logo
                src={logo.src}
                alt={logo.alt}
                href={logo.href}
                height={54}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex flex-1">
              <Navigation className="flex items-center space-x-10" />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="flex items-center space-x-6">
                  <HelpButton />
                  {/* ✅ open modal */}
                  
                  
<LoginButton
          onClick={toggleLogin}          // ← nu togglen
          expanded={isLoginOpen}
          controlsId="login-popup"
        />

<LoginPopOver
  isOpen={isLoginOpen}
  onClose={closeLogin}          // Alleen sluiten
  id="login-popup"
/>

                  {/* … sign up, language switcher, etc … */}
                           <SignUpButton />
                </div>

                <div className="border-l border-gray-300 pl-6">
                  <LanguageSwitcher
                    languages={languages}
                    current={currentLanguage}
                    onChange={handleLanguageChange}
                  />
                </div>
              </div>

              {/* Mobile: Language + Menu */}
              <div className="lg:hidden flex items-center space-x-3">
                <LanguageSwitcher
                  languages={languages}
                  current={currentLanguage}
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
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
}
