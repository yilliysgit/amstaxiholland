"use client";

import { IconTextBadge } from "./IconTextBadge";
import { homeBadges } from "@/data/iconTextBadge/iconTextBadge.data";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IconTextBadgeRowProps {
  count?: number;
  className?: string;
}

export const IconTextBadgeRow = ({
  count = 4,
  className = "",
}: IconTextBadgeRowProps) => {
  const t = useTranslations("Common.badges");

  // 1. Stable initial order for SSR + first client render
  const [badges, setBadges] = useState(() => homeBadges.slice(0, count));

  // 2. Shuffle only on the client, after hydration
  useEffect(() => {
    const shuffled = [...homeBadges].sort(() => Math.random() - 0.5);
    setBadges(shuffled.slice(0, count));
  }, [count]);

  return (
    <section
      className={`
        relative overflow-hidden
        py-12 sm:py-16 lg:py-20
        bg-gradient-mercedes-subtle
        ${className}
      `}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 pattern-overlay"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          className="
            grid grid-cols-2 gap-4
            sm:flex sm:items-center sm:justify-center sm:gap-6 lg:gap-8
            sm:overflow-x-auto sm:pb-2
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
        >
          {badges.map((badge, index) => (
            <div
              key={badge.key}
              className="flex-shrink-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <IconTextBadge icon={badge.icon} text={t(badge.key)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
