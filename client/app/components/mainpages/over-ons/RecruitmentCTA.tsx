"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Car, ArrowRight, Handshake } from 'lucide-react';

const RecruitmentCTA: React.FC = () => {
  const t = useTranslations("AboutPage.recruitment");

  const driverBenefits = t.raw("driver.benefits");
  const partnerBenefits = t.raw("partner.benefits");

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gradient-hero mb-4">
            {t("sectionHeader.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("sectionHeader.description")}
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chauffeur Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-luxury border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start gap-6">
              
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors">
                <Car className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("driver.title")}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t("driver.description")}
                </p>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {driverBenefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <button className="group/btn w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  {t("driver.button")}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Partner Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-luxury border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start gap-6">
              
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors">
                <Handshake className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("partner.title")}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t("partner.description")}
                </p>

                <div className="space-y-2 mb-6">
                  {partnerBenefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <button className="group/btn w-full bg-gray-700 hover:bg-gray-800 text-white px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  {t("partner.button")}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-12">
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("bottom.text")}{" "}
            <strong className="text-gray-900">{t("bottom.highlight")}</strong>
          </p>
        </div>

      </div>
    </section>
  );
};

export default RecruitmentCTA;
