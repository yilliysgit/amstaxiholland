// 📍 src/components/layout/header/actions/SignUpButton.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ButtonProps } from "@/types/header/header.types";

type Props = ButtonProps & {
  /** Optioneel: toon als subtiele pill zoals Login */
  pill?: boolean;
};

export default function SignUpButton({
  href = "/signup",
  className = "",
  pill = false,
}: Props) {
  const t = useTranslations("Header.actions");

  const linkClasses = [
    "font-medium transition-colors duration-200",
    "text-sm md:text-base",
    "text-gray-700 hover:text-navy-800 focus:text-navy-800",
    "focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2",
    "rounded-sm",
    className,
  ].join(" ");

  const pillClasses = [
    "inline-flex items-center gap-2 rounded-full border border-gray-200",
    "bg-gray-50 px-4 py-2 font-medium",
    "text-sm md:text-base",
    "text-gray-700 hover:text-navy-800 hover:bg-gray-100",
    "focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2",
    className,
  ].join(" ");

  return (
    <Link href={href} className={pill ? pillClasses : linkClasses}>
      {t("signup")}
    </Link>
  );
}