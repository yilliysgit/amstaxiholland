"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

type ServiceItem = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon?: string;
  gradient?: string;
};

export default function ParticulierenServicesSection() {
  const t = useTranslations("ParticulierenPage.services");
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Services uit JSON (nu incl. icon & gradient)
  const items = t.raw("items") as Record<string, ServiceItem>;
  const itemKeys = Object.keys(items);

  // Trust-indicators
  const trust = t.raw("trust") as Record<string, string>;

  // CTA-teksten
  const cta = {
    missingTitle: t("cta.missingTitle"),
    missingDescription: t("cta.missingDescription"),
    button: t("cta.button"),
    cta1: t("cta.cta1"),
    cta2: t("cta.cta2"),
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-sm text-gray-700 font-medium">
              {t("section.badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {t("section.title")}
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            {t("section.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {itemKeys.map((key) => {
            const service = items[key];
            const gradient = service.gradient ?? "from-gray-700 to-gray-900";

            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredService(key)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Gradient Header + icon uit JSON */}
                <div
                  className={`h-32 bg-gradient-to-br ${gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10" />

                  {service.icon && (
                    <div className="absolute top-6 left-6">
                      <div className="text-5xl opacity-90">
                        {service.icon}
                      </div>
                    </div>
                  )}

                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2">
                    {service.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-gray-600">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button className="w-full mt-4 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors group-hover:shadow-lg">
                    {cta.button}
                  </button>
                </div>

                {/* Hover Border */}
                <div
                  className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-colors pointer-events-none ${
                    hoveredService === key ? "border-gray-900" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-3xl font-light text-white mb-4">
              {cta.missingTitle}
            </h3>

            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {cta.missingDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg">
                {cta.cta1}
              </button>
              <button className="px-8 py-4 bg-transparent text-white rounded-lg font-medium hover:bg-white/10 transition-colors border-2 border-white/20">
                {cta.cta2}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10">
              {Object.entries(trust).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2 text-white/80">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">
              Last-minute bookings
            </h4>
            <p className="text-sm text-gray-600">
              Available within 2 hours. Call us for urgent requests.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Dedicated drivers</h4>
            <p className="text-sm text-gray-600">
              Ask for recurring driver assignment.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">
              Transparent pricing
            </h4>
            <p className="text-sm text-gray-600">
              Fixed price upfront — no surprises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
