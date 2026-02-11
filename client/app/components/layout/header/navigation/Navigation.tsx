"use client";

import { useCallback } from "react";
import { usePathname } from "@/i18n/routing"; // ← Verander dit!
import { useTranslations, useLocale } from "next-intl";
import { mainNav } from "@/app/config/links/mainNav";
import { isActiveRoute } from "@/app/config/links/helpers";

import NavigationItem from "./NavLinkItem";

interface NavigationProps {
  className?: string;
  onItemClick?: (itemId: string) => void;
}

export default function Navigation({
  className = "",
  onItemClick,
}: NavigationProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header.navigation");

  const handleItemClick = useCallback(
    (itemId: string): void => {
      onItemClick?.(itemId);
    },
    [onItemClick]
  );

  return (
    <nav 
      className={`hidden lg:flex items-left space-x-8 ml-6 ${className}`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      {mainNav.map((navItem) => {
        const currentHref = navItem.href[locale as 'nl' | 'en'];
        const isActive = isActiveRoute(pathname, currentHref);
        
        return (
          <NavigationItem
            key={navItem.key}
            item={{
              id: navItem.key,
              name: t(navItem.key),
              href: currentHref,
              active: isActive,
            }}
            isMobile={false}
            onClick={() => handleItemClick(navItem.key)}
          />
        );
      })}
    </nav>
  );
}