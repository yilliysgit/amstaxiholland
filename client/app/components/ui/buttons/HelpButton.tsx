// 📍 src/components/layout/header/actions/HelpButton.tsx
"use client";

import Link from "next/link";
import type { ButtonProps } from "@/types/header/header.types";

export default function HelpButton({
  href = "/help",
  className = "",
  children = "Help",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        // typografie
        "font-medium transition-colors duration-200",
        "text-sm md:text-base",              // ⬅︎ groter op desktop
        // kleuren: match met nav-items
        "text-gray-700 hover:text-navy-800 focus:text-navy-800",
        // focus
        "focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2",
        "rounded-sm",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
