"use client";
import type { JSX } from "react";
import Link from "next/link";
import type { NavigationItem as NavItemType } from "@/types/header/header.types";

interface NavigationItemProps {
  item: NavItemType;
  isMobile?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NavigationItem({
  item,
  isMobile = false,
  onClick,
  className = "",
}: NavigationItemProps): JSX.Element {
  const base = "font-medium transition-colors duration-200";

  // Donkerder tint + grotere tekst + grotere klikzone
  const desktop = `
    ${base} relative px-1 py-3 text-base
    ${item.active ? "text-navy-900" : "text-gray-700 hover:text-navy-800"}
  `;

  const mobile = `
    ${base} block text-lg py-3 px-4
    ${item.active ? "text-navy-800" : "text-gray-700 hover:text-navy-800"}
  `;

  const linkClasses = `${isMobile ? mobile : desktop} ${className}`.trim();

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={linkClasses}
      aria-current={item.active ? "page" : undefined}
      title={`Ga naar ${item.name}`}
    >
      {item.name}
      {/* underline verwijderd */}
    </Link>
  );
}
