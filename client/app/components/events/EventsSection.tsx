// app/components/events/EventsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { eventTiles } from "@/data/events/events.data";
import { homeLinks } from "@/app/config/links/home/homeLinks";

export default function EventsSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations("EventsSection");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const benefits = t.raw("benefits") as string[];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-mercedes-subtle relative overflow-hidden">
      <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* IMAGES */}
          <div
            className={`lg:order-1 order-1 transition-all duration-700 delay-200 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {eventTiles.map((item, idx) => (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-2xl shadow-luxury group bg-gray-900/5 ${
                    idx === 0
                      ? "col-span-2 h-48 sm:h-56 lg:h-64"
                      : "h-40 sm:h-48 lg:h-56"
                  }`}
                >
                  <Image
                    src={item.imageSrc}
                    alt={t(`tiles.${item.slug}.imageAlt`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg sm:text-xl drop-shadow-sm">
                      {t(`tiles.${item.slug}.title`)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div
            className={`lg:order-2 order-2 space-y-6 transition-all duration-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-gray-600 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
              {t("overline")}
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              {t("title.line1")}{" "}
              <span className="text-gray-800">{t("title.line2")}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              {t("description")}
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-900 font-medium text-base sm:text-lg">
                    {item}
                  </span>
                </div>
              ))}
            </div>

           {/* CTA's */}
<div className="pt-6 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
    <Link
  href={{
    pathname: "/diensten/[slug]",
    params: { slug: "evenementen-vervoer" },
  }}
  className="btn-gradient-primary"
>
  {t("primaryCta")}
</Link>

 <Link
  href="/contact"
  className="btn-gradient-secondary"
>
  {t("secondaryCta")}
</Link>
</div>

            <p className="text-sm text-gray-500 pt-1">{t("ctaNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}