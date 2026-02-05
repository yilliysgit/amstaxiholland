"use client";

import Image from "next/image";
import { HeroData } from "./types";

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-mercedes-premium
        section-spacing-lg
      "
    >
      {/* ===== OPTIONAL BACKGROUND IMAGE ===== */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-[0.25]">
          <Image
            src={data.backgroundImage}
            alt={data.imageAlt || "Business Class background"}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      {/* Pattern overlay voor premium look */}
      <div className="pattern-overlay absolute inset-0 z-[1]" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-[2] max-w-container mx-auto px-6 lg:px-0 flex flex-col lg:flex-row items-center gap-12">
        
        {/* ===== LEFT SIDE TEXT ===== */}
        <div className="flex-1 space-y-6 animate-fade-in">

          {/* BADGE */}
          {data.badge && (
            <span
              className="
                inline-block px-4 py-1.5 rounded-full text-sm font-medium
                bg-white/60 text-gray-700 shadow-sm
                backdrop-blur-md
              "
            >
              {data.badge}
            </span>
          )}

          {/* TITLE */}
          <h1
            className="
              text-4xl lg:text-5xl font-display font-semibold
              text-gradient-hero leading-tight
            "
          >
            {data.title}
          </h1>

          {/* SUBTITLE */}
          {data.subtitle && (
            <p className="text-lg text-gray-700 max-w-xl">
              {data.subtitle}
            </p>
          )}

          {/* DESCRIPTION */}
          {data.description && (
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
              {data.description}
            </p>
          )}

          {/* Extra informational sentence */}
          {data.extraText && (
            <p className="text-sm text-gray-500 italic">
              {data.extraText}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            {data.ctaPrimary && (
              <a
                href="#booking"
                className="btn-gradient-primary"
              >
                {data.ctaPrimary}
              </a>
            )}

            {data.ctaSecondary && (
              <a
                href="#info"
                className="btn-gradient-secondary"
              >
                {data.ctaSecondary}
              </a>
            )}
          </div>

          {/* STATS */}
          {data.stats && (
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-xl font-semibold text-gradient-primary">
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== RIGHT SIDE IMAGE ===== */}
        {data.image && (
          <div className="flex-1 w-full">
            <div
              className="
                relative rounded-xl overflow-hidden shadow-luxury
                bg-white/40 backdrop-blur-md border border-white/30
              "
            >
              <Image
                src={data.image}
                alt={data.imageAlt || "Business Class vehicle"}
                width={700}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
