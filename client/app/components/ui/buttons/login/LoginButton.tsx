// @/app/components/ui/buttons/login/LoginButton.tsx

"use client";

import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginButton({
  onClick,
  expanded,
  controlsId,
}: {
  onClick: () => void;
  expanded?: boolean;
  controlsId?: string;
}) {
  const t = useTranslations("Header.actions");

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-haspopup="dialog"
      aria-expanded={expanded}
      aria-controls={controlsId}
      className="inline-flex items-center gap-2 rounded-full 
                 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 
                 hover:bg-gray-100 hover:text-navy-800 
                 focus:outline-none focus:ring-2 focus:ring-navy-600 
                 focus:ring-offset-2 transition-colors"
    >
      <UserRound className="h-4 w-4 md:h-[18px] md:w-[18px]" aria-hidden />
      {t("login")}
    </button>
  );
}