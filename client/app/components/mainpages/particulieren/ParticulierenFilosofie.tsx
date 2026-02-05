"use client";
import React from "react";
import { ShieldCheck, Crown, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function OnzeFilosofie() {
  const t = useTranslations("ParticulierenPage.filosofie");

  const usps = [
    {
      icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
      title: t("usps.discreet.title"),
      description: t("usps.discreet.description"),
    },
    {
      icon: <Crown className="w-6 h-6" aria-hidden="true" />,
      title: t("usps.vehicles.title"),
      description: t("usps.vehicles.description"),
    },
    {
      icon: <Clock className="w-6 h-6" aria-hidden="true" />,
      title: t("usps.ontime.title"),
      description: t("usps.ontime.description"),
    },
    {
      icon: <Sparkles className="w-6 h-6" aria-hidden="true" />,
      title: t("usps.service.title"),
      description: t("usps.service.description"),
    },
  ];

  return (
    <section
      aria-labelledby="filosofie-title"
      className="relative w-full mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50 to-white"
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
          {t("badge")}
        </p>

        <h2
          id="filosofie-title"
          className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900"
        >
          {t("title")}
        </h2>

        <p className="mt-4 text-neutral-600 text-lg leading-relaxed">
          {t("description")}
        </p>
      </motion.header>

      {/* USP GRID */}
      <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {usps.map((item, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 * idx, ease: "easeOut" }}
            className="group rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-14 md:mt-20 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </section>
  );
}
