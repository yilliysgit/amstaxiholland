// 📍 src/components/layout/header/LanguageSwitcher.tsx
"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import type { Language } from "@/types/header/header.types";

type Props = {
  languages: Language[];
  current: string;                  // bv. "NL"
  onChange?: (code: string) => void;
  className?: string;
  /** Wat tonen op de knop: 'code' (NL/EN) of 'name' (Nederlands/English) */
  buttonLabel?: "code" | "name";
};

export default function LanguageSwitcher({
  languages,
  current,
  onChange,
  className = "",
  buttonLabel = "code", // ⬅️ standaard: NL/EN
}: Props) {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const active =
    languages.find(l => l.code.toLowerCase() === (current || "NL").toLowerCase()) ??
    languages[0];

  // click-outside
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (btnRef.current?.contains(e.target as Node)) return;
      if (listRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Esc sluiten
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const buttonText =
    buttonLabel === "code"
      ? active.code.toUpperCase()
      : active.name;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Taal: ${buttonText}`}
        onClick={() => setOpen(v => !v)}
        className={[
          "inline-flex items-center gap-1.5 rounded-md px-2 py-2",
          "text-sm md:text-base font-medium",
          "text-gray-700 hover:text-navy-800",
          "transition-colors duration-200",
          // geen borders/rings
          "border-0 outline-none ring-0",
          "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
          "active:outline-none active:ring-0",
        ].join(" ")}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span>{buttonText}</span>
        <ChevronDown
          className={`h-4 w-4 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl bg-white p-1 shadow-lg"
        >
          {languages.map((lang) => {
            const selected = lang.code.toLowerCase() === active.code.toLowerCase();
            return (
              <li role="none" key={lang.code}>
                <button
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    onChange?.(lang.code);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  className={[
                    "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm",
                    "transition-colors duration-200",
                    selected
                      ? "bg-gray-100 font-semibold text-navy-700"
                      : "text-gray-700 hover:text-navy-800 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {/* In de lijst tonen we ALLEEN de naam */}
                  <span className="flex-1">{lang.name}</span>
                  {selected && <Check className="h-4 w-4 text-navy-700" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
