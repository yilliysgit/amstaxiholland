"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QuickQuoteStepsForm from "@/components/forms/quick-quote/QuickQuoteStepsForm";

type Feature = { text: string };

type HeroSectionProps = {
  eyebrow?: React.ReactNode;
  /** Gebruik 'h1' alléén op één pagina per view */
  headingLevel?: "h1" | "h2" | "h3";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  backgroundImage: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaLink?: string;
  showForm?: boolean;
  features?: Feature[];
  /** Uniek id om aria-koppelingen te maken */
  id?: string;
};

export default function CatHero({
  eyebrow,
  headingLevel = "h1",
  title,
  subtitle,
  description,
  backgroundImage,
  imageAlt = "Highland Logistics – transport & koeriersdiensten",
  ctaLabel = "Direct boeken",
  ctaLink = "/offerte",
  showForm = true,
  features = [],
  id = "hero",
}: HeroSectionProps) {
  const Heading = headingLevel; // dynamic heading tag
  const asideTitleId = `${id}-quote-title`;

  return (
    <main id={id} aria-labelledby={`${id}-heading`}>
      <section className="relative h-[calc(100vh-80px)] flex items-center">
        {/* LCP-geschikte hero-afbeelding ipv CSS-background */}
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Contrast overlay */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60" />

        <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Tekstkolom */}
          <header className="text-white max-w-2xl" aria-label="Introductie">
            {eyebrow && (
              <p className="text-sm uppercase tracking-wider text-blue-200 mb-4">
                {eyebrow}
              </p>
            )}

            <Heading id={`${id}-heading`} className="text-4xl lg:text-6xl font-black leading-tight mb-4">
              {title}
            </Heading>

            {subtitle && (
              <p className="text-lg lg:text-xl text-blue-100 mb-3">{subtitle}</p>
            )}

            {description && (
              <p className="text-base lg:text-lg text-blue-100/90 mb-8">{description}</p>
            )}

            {ctaLabel && (
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-white gradient-highland-primary hover:brightness-110 transition"
                aria-label={`${ctaLabel} – ${typeof title === "string" ? title : "offerte"}`}
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="w-5 h-5" aria-hidden />
              </Link>
            )}

            {features.length > 0 && (
              <ul className="mt-8 space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-blue-100">
                    <span
                      aria-hidden
                      className="w-6 h-6 rounded-md gradient-highland-primary inline-flex items-center justify-center text-white font-bold"
                    >
                      ✓
                    </span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </header>

          {/* Form in aside-landmark */}
          {showForm && (
            <aside
              className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-highland-xl"
              aria-labelledby={asideTitleId}
            >
              <h2 id={asideTitleId} className="sr-only">
                Snel offerte aanvragen
              </h2>
              <QuickQuoteStepsForm />
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}
