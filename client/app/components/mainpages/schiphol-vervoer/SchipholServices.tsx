// /app/components/mainpages/schiphol-vervoer/SchipholServices.tsx

"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const SchipholServicesSection: React.FC = () => {
  const t = useTranslations('SchipholPage.services');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services = t.raw('items');
  const infoCards = t.raw('infoCards');
  const trustIndicators = t.raw('cta.trustIndicators');

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100/50 shadow-sm mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-sm text-blue-900 font-semibold tracking-wide">{t('badge')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight">
            {t('title.line1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
              {t('title.line2')}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
            {t('description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service: any) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50">
                {/* Gradient Header with enhanced visuals */}
                <div className={`relative h-48 bg-gradient-to-br ${getGradientForService(service.id)} overflow-hidden`}>
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-50"></div>
                  
                  {/* Floating orbs */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-8 left-8">
                    <div className="text-7xl opacity-95 filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>

                {/* Content with enhanced spacing */}
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights with refined styling */}
                  <div className="space-y-3 pt-4">
                    {service.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button with premium styling */}
                  <button className="w-full mt-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-xl group-hover:scale-[1.02] transform">
                    Service bekijken
                  </button>
                </div>

                {/* Animated border on hover */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-300 pointer-events-none ${
                  hoveredService === service.id 
                    ? 'ring-2 ring-offset-2 ring-blue-500' 
                    : ''
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Luxurious Bottom CTA Section */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Premium gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950"></div>
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-12 py-20 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                {t('cta.title')}
              </h3>
              
              <p className="text-xl text-blue-100 leading-relaxed font-light">
                {t('cta.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                <button className="group px-10 py-5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transform">
                  <span className="flex items-center gap-2 justify-center">
                    {t('cta.buttons.primary')}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                
                <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border-2 border-white/20 hover:border-white/40">
                  {t('cta.buttons.secondary')}
                </button>
              </div>

              {/* Premium trust indicators */}
              <div className="flex flex-wrap justify-center gap-10 pt-12 mt-12 border-t border-white/10">
                {trustIndicators.map((indicator: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 text-white/90">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Refined Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {infoCards.map((card: any, index: number) => (
            <div key={index} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {getIconForInfoCard(index)}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Helper function for service gradients
function getGradientForService(id: string): string {
  const gradients: Record<string, string> = {
    'departure': 'from-sky-400 via-blue-500 to-indigo-600',
    'arrival': 'from-emerald-400 via-teal-500 to-cyan-600',
    'business': 'from-slate-700 via-gray-800 to-zinc-900',
    'first-class': 'from-amber-400 via-yellow-500 to-orange-600',
    'group': 'from-violet-500 via-purple-600 to-fuchsia-600',
    'hourly': 'from-rose-500 via-pink-600 to-red-600'
  };
  return gradients[id] || 'from-gray-400 to-gray-600';
}

// Helper function for info card icons
function getIconForInfoCard(index: number): React.ReactNode {
  const icons = [
    <svg key={0} className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    <svg key={1} className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key={2} className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ];
  return icons[index] || icons[0];
}

export default SchipholServicesSection;