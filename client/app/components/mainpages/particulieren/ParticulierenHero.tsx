"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Check, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ParticulierenHero() {
  const t = useTranslations("ParticulierenPage.hero");
  const tCommon = useTranslations("Common.contact");

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  // Title split helper
  const title = t("title");
  const highlight = t("titleHighlight");
  const [before, after] = title.split(highlight);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-sky-100 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-100 to-transparent blur-3xl" />
      </div>

      {/* Content grid */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        
        {/* Left Side */}
        <div className="flex flex-col justify-center">
          {/* Badge */}
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("badge")}
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {before}
            <span className="relative mx-1">
              <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                {highlight}
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M1 5.5C50 2.5 100 2 199 5.5"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            {after}
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-lg leading-relaxed text-slate-600 lg:text-xl">
            {t("subtitle")}
          </p>

          {/* USPs */}
          <div className="mb-10 space-y-3">
            {["available", "safeDrivers", "luxuryFleet"].map((key) => (
              <div key={key} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {t(`usp.${key}`)}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
            >
              {t("cta.primary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={`tel:${tCommon("phone")}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-md ring-1 ring-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              {t("cta.secondary")}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-8">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-white"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">
                {t("stats.rides")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">
                {t("stats.rating")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative lg:block hidden">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[90%]">
            <Image
              src="/images/premium-taxi-amsterdam.jpg"
              alt="Premium private transport Amsterdam"
              fill
              className="object-cover object-center rounded-l-3xl"
              priority
            />

            {/* Floating badge */}
            <div className="absolute bottom-6 right-6 rounded-2xl bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-sm ring-1 ring-slate-900/5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Gecertificeerd
                  </div>
                  <div className="text-xs text-slate-500">ISO 9001</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
