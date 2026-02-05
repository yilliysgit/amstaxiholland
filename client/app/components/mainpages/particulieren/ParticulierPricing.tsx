'use client';

import { Check, ArrowRight, Zap, Building2, Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ParticulierenPricing() {
  const t = useTranslations("ParticulierenPage.pricing");

  const packages = [
    {
      key: "flex",
      icon: Zap,
      gradient: "from-gray-50 to-gray-100",
      popular: false,
      dark: false
    },
    {
      key: "business",
      icon: Building2,
      gradient: "from-blue-50 to-indigo-50",
      popular: true,
      dark: false
    },
    {
      key: "corporate",
      icon: Crown,
      gradient: "from-gray-900 to-gray-800",
      popular: false,
      dark: true
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Packages */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isDark = pkg.dark;

            return (
              <div
                key={pkg.key}
                className={`relative rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  pkg.popular
                    ? "border-blue-500 shadow-xl"
                    : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                }`}
              >

                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {t("packages.business.popular")}
                    </span>
                  </div>
                )}

                <div className={`p-8 rounded-2xl bg-gradient-to-br ${pkg.gradient} ${isDark ? "text-white" : ""}`}>
                  
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark ? "bg-white/10" : "bg-gray-900"
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {t(`packages.${pkg.key}.name`)}
                      </h3>
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {t(`packages.${pkg.key}.tagline`)}
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className={`text-4xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t(`packages.${pkg.key}.price`)}
                    </div>

                    {t.has(`packages.${pkg.key}.priceNote`) && (
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          {t(`packages.${pkg.key}.priceNote`)}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {t(`packages.${pkg.key}.description`)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {t.raw(`features.${pkg.key}`).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            isDark ? "text-green-400" : "text-gray-700"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-200" : "text-gray-700"
                          } ${feature.includes("Alles van") || feature.includes("Everything from") ? "font-semibold" : ""}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                      isDark
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : pkg.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {t(`packages.${pkg.key}.cta`)}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 rounded-2xl p-8 text-center">
          <p className="text-gray-700 mb-4">
            <strong>{t("footer.included")}</strong>
          </p>

          <p className="text-sm text-gray-600">
            {t("footer.questions")}{" "}
            <a
              href={`tel:${t("footer.phone")}`}
              className="font-semibold text-gray-900 hover:underline"
            >
              {t("footer.phone")}
            </a>{" "}
            {t("footer.or")}{" "}
            <a href="#contact" className="font-semibold text-gray-900 hover:underline">
              {t("footer.requestQuote")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
