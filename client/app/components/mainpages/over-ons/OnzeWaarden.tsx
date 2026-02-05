"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Heart, Clock, Award, Users, MapPin } from 'lucide-react';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const OnzeWaarden: React.FC = () => {
  const t = useTranslations("AboutPage.values");

  const values: Value[] = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("items.safety.title"),
      description: t("items.safety.description"),
      highlight: t("items.safety.highlight")
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("items.reliability.title"),
      description: t("items.reliability.description"),
      highlight: t("items.reliability.highlight")
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t("items.service.title"),
      description: t("items.service.description"),
      highlight: t("items.service.highlight")
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t("items.expertise.title"),
      description: t("items.expertise.description"),
      highlight: t("items.expertise.highlight")
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t("items.quality.title"),
      description: t("items.quality.description"),
      highlight: t("items.quality.highlight")
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("items.team.title"),
      description: t("items.team.description"),
      highlight: t("items.team.highlight")
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gradient-hero mb-4">
            {t("sectionHeader.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("sectionHeader.description")}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-luxury border border-gray-200/30 max-w-4xl mx-auto">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
              {t("bottomStatement.title")}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t("bottomStatement.description")}
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              {t.raw("bottomStatement.details").map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

interface ValueCardProps {
  value: Value;
}

const ValueCard: React.FC<ValueCardProps> = ({ value }) => (
  <div className="group">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/50 h-full group-hover:scale-[1.02]">
      
      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 mb-6 group-hover:bg-gray-200 transition-colors">
        {value.icon}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-3">
        {value.title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {value.description}
      </p>

      <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
        {value.highlight}
      </div>

    </div>
  </div>
);

export default OnzeWaarden;
