"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ctaCards } from "@/data/dualCTA/dualCTA.data";

export default function DualCTASection() {
  const t = useTranslations("DualCTA");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Literal routes zodat Link tevreden is
  const getHref = (linkKey: string): "/booking" | "/become-driver" => {
    return linkKey === "bookTaxi" ? "/booking" : "/become-driver";
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {ctaCards.map((card) => (
            <div key={card.id} className="flex flex-col items-center text-center">
              {/* Titel */}
              <h3 className="text-2xl sm:text-[1.7rem] font-semibold text-gray-900 tracking-tight mb-3">
                {t(`cards.${card.slug}.title`)}
              </h3>

              {/* Sub / link */}
              <Link
                href={getHref(card.linkKey) as any}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
              >
                {t(`cards.${card.slug}.description`)}
                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Lijn onder de CTA */}
              <div className="mt-8 w-full border-b border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
