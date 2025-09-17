"use client";

import Link from "next/link";
import type { JSX } from "react";
import type { CTAButtonProps } from "@/types/header/header.types";
import { DEFAULT_HEADER_CONFIG } from "@/app/config/header/config";

export default function CTAButton({
  text,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: CTAButtonProps): JSX.Element {
  // fallback naar config
  const buttonText = text ?? DEFAULT_HEADER_CONFIG.cta.text;
  const buttonHref = href ?? DEFAULT_HEADER_CONFIG.cta.href;

  const baseClasses =
    "font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center gap-2 shadow-md";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  } as const;

  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-5 text-base",
    lg: "py-3 px-6 text-lg",
  } as const;

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <Link href={buttonHref} className={buttonClasses} onClick={onClick}>
      {buttonText}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
