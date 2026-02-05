"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Car, Plane, Users, Briefcase, Clock, MapPin, Shield, Star } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  highlight: string;
  isPopular?: boolean;
}

const OnzeDiensten: React.FC = () => {
  const t = useTranslations("AboutPage.services");

  const services: Service[] = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: t("items.business.title"),
      description: t("items.business.description"),
      features: t.raw("items.business.features"),
      highlight: t("items.business.highlight"),
      isPopular: true
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: t("items.airport.title"),
      description: t("items.airport.description"),
      features: t.raw("items.airport.features"),
      highlight: t("items.airport.highlight")
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("items.group.title"),
      description: t("items.group.description"),
      features: t.raw("items.group.features"),
      highlight: t("items.group.highlight")
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: t("items.private.title"),
      description: t("items.private.description"),
      features: t.raw("items.private.features"),
      highlight: t("items.private.highlight")
    }
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gradient-hero mb-4">
            {t("sectionHeader.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("sectionHeader.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Why Choose Our Services */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-luxury border border-gray-200/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left side */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                {t("whyChooseUs.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t("whyChooseUs.description")}
              </p>

              <div className="space-y-4">
                <DifferentiatorItem
                  icon={<Clock className="w-5 h-5" />}
                  text={t("whyChooseUs.differentiators.0")}
                />
                <DifferentiatorItem
                  icon={<Shield className="w-5 h-5" />}
                  text={t("whyChooseUs.differentiators.1")}
                />
                <DifferentiatorItem
                  icon={<Star className="w-5 h-5" />}
                  text={t("whyChooseUs.differentiators.2")}
                />
                <DifferentiatorItem
                  icon={<MapPin className="w-5 h-5" />}
                  text={t("whyChooseUs.differentiators.3")}
                />
              </div>
            </div>

            {/* Right side */}
            <div className="text-center lg:text-left">
              <div className="bg-gray-900 text-white rounded-2xl p-8">
                <h4 className="text-lg font-bold mb-3">
                  {t("cta.title")}
                </h4>
                <p className="text-gray-300 mb-6 text-sm">
                  {t("cta.description")}
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    {t("cta.buttons.0")}
                  </button>
                  <button className="w-full border border-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                    {t("cta.buttons.1")}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <div className="group relative">
    {service.isPopular && (
      <div className="absolute -top-3 -right-3 z-10 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
        {service.highlight}
      </div>
    )}

    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 border h-full group-hover:scale-[1.02] ${
        service.isPopular ? "border-gray-300 ring-2 ring-gray-900/10" : "border-gray-200/50"
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors flex-shrink-0">
          {service.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{service.title}</h3>
          {!service.isPopular && (
            <div className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              {service.highlight}
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>

      <div className="space-y-2">
        {service.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></div>
            {feature}
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface DifferentiatorItemProps {
  icon: React.ReactNode;
  text: string;
}

const DifferentiatorItem: React.FC<DifferentiatorItemProps> = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 flex-shrink-0">
      {icon}
    </div>
    <span className="text-gray-700 font-medium text-sm">{text}</span>
  </div>
);

export default OnzeDiensten;
