"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

export default function ParticulierenVlootSection() {
  const t = useTranslations("ParticulierenPage.vloot");

  // --- Load all vehicle categories from JSON ---
  const categories = t.raw("categories") as Record<
    string,
    {
      name: string;
      subtitle: string;
      featuresTitle: string;
      features: Record<string, string>;
      bullets: string[];
      cta: string;
    }
  >;

  const keys = Object.keys(categories);

  // Active tab
  const [active, setActive] = useState(keys[0]);

  const activeVehicle = categories[active];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-700 font-medium">
              {t("ariaLabel")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {t("title")}
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            {t("subtitle")}{" "}
            <span className="text-gray-900 font-medium">
              {t("subtitleHighlight")}
            </span>{" "}
            {t("subtitleEnd")}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {keys.map((id) => {
            const vehicle = categories[id];

            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`px-8 py-4 rounded-lg font-medium transition-all ${
                  active === id
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold">{vehicle.name}</div>
                  <div
                    className={`text-sm ${
                      active === id ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {vehicle.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Vehicle Display */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* Left Side - Vehicle Graphic */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-12 flex items-center justify-center">

              {/* Badge */}
              <div className="absolute top-6 left-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                  <span className="text-xs text-white font-medium">
                    {activeVehicle.name}
                  </span>
                </div>
              </div>

              {/* LARGE VEHICLE ICON (placeholder emoji) */}
              <div className="text-9xl">🚘</div>

              {/* Bottom Stats */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <div className="text-xs text-gray-300 mb-1">
                    Passengers
                  </div>
                  <div className="text-white font-semibold">
                    {t(`categories.${active}.bullets.0`)}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <div className="text-xs text-gray-300 mb-1">
                    Luggage
                  </div>
                  <div className="text-white font-semibold">
                    {t(`categories.${active}.bullets.1`)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side – Details */}
            <div className="p-12">
              <div className="space-y-8">

                {/* Title & Description */}
                <div>
                  <h3 className="text-3xl font-light text-gray-900 mb-3">
                    {activeVehicle.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activeVehicle.subtitle}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                    {activeVehicle.featuresTitle}
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    {Object.values(activeVehicle.features).map(
                      (feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    {activeVehicle.cta}
                  </button>
                  <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200">
                    {t("categories.business.cta")}
                  </button>
                </div>

                {/* Extra Info */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Let op:</span>{" "}
                    Alle voertuigen worden vóór iedere rit gereinigd en gecontroleerd.  
                    Uw chauffeur staat altijd minimaal 15 minuten vooraf klaar.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {["available", "confirmation", "custom"].map((key) => (
            <div key={key} className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>

              <h4 className="font-medium text-gray-900 mb-2">
                {t(`trust.${key}`)}
              </h4>
              <p className="text-sm text-gray-600">
                {/* Optional: You may add a subtitle for each trust item later */}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
