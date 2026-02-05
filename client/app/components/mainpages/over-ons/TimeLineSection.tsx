"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Users, Car, Trophy, MapPin, Zap } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  milestone: string;
  isHighlight?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  car: <Car className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  mapPin: <MapPin className="w-5 h-5" />
};

const OnsVerhaal: React.FC = () => {
  const t = useTranslations("AboutPage.story");
  const timelineItems: TimelineItem[] = t.raw("timeline");

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gradient-hero mb-4">
            {t("sectionHeader.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("sectionHeader.description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <TimelineCard 
                key={item.year}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-luxury border border-gray-200/30 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t("bottomCTA.title")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("bottomCTA.description")}
            </p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg">
              {t("bottomCTA.buttonText")}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, isLeft }) => {
  return (
    <div className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
      
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <div className={`w-12 h-12 rounded-full border-4 border-white shadow-luxury flex items-center justify-center ${
          item.isHighlight ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
        }`}>
          {/** @ts-ignore */}
          {iconMap[item.icon]}
        </div>
      </div>

      {/* Content */}
      <div className={`w-5/12 ${isLeft ? 'pr-12' : 'pl-12'}`}>
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/50 ${
          item.isHighlight ? 'ring-2 ring-gray-900/10' : ''
        }`}>

          {/* Year badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
            item.isHighlight ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
          }`}>
            <Calendar className="w-4 h-4" />
            {item.year}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {item.title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            {item.milestone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnsVerhaal;
