"use client";

import type { MobileMenuButtonProps } from "@/types/header/header.types";

export default function MobileMenuButton({
  isOpen,
  onClick,
  className = "",
  label = "Toggle mobile menu",
  controlsId,
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      className={`lg:hidden inline-flex flex-col justify-center items-center w-8 h-8 text-gray-600 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded transition-colors duration-200 ${className}`}
    >
      <span
        aria-hidden
        className={`block w-6 h-0.5 bg-current transition-transform duration-300 origin-center motion-reduce:transition-none mb-1
          ${isOpen ? "translate-y-1.5 rotate-45" : ""}`}
      />
      <span
        aria-hidden
        className={`block w-6 h-0.5 bg-current transition-opacity duration-300 motion-reduce:transition-none mb-1
          ${isOpen ? "opacity-0" : "opacity-100"}`}
      />
      <span
        aria-hidden
        className={`block w-6 h-0.5 bg-current transition-transform duration-300 origin-center motion-reduce:transition-none
          ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
      />
    </button>
  );
}