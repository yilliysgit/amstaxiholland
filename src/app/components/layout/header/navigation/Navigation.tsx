"use client";

import { useState, useCallback } from "react";
import { DEFAULT_HEADER_CONFIG } from "@/app/config/header/config";
import NavigationItem from "./NavLinkItem";
import type { NavigationItem as NavItemType } from "@/types/header/header.types";

interface NavigationProps {
  items?: NavItemType[];
  className?: string;
  onItemClick?: (itemId: string) => void;
}

export default function Navigation({
  items = DEFAULT_HEADER_CONFIG.navigation,
  className = "",
  onItemClick,
}: NavigationProps) {
  const [activeItem, setActiveItem] = useState<string>(
    items.find((item) => item.active)?.id || items[0]?.id || "particulier"
  );

  const handleItemClick = useCallback(
    (itemId: string): void => {
      setActiveItem(itemId);
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
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={{
            ...item,
            active: activeItem === item.id,
          }}
          isMobile={false}
          onClick={() => handleItemClick(item.id)}
        />
      ))}
    </nav>
  );
}