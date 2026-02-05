"use client";
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const AboutHero: React.FC = () => {
  const t = useTranslations('AboutPage.hero');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 pattern-overlay opacity-10"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-300/40 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-gray-400/30 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gray-300/50 rounded-full animate-ping animation-delay-3000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">

          {/* Headline */}
          <div className="space-y-8">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient-hero leading-tight tracking-tight transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {t('title')}
              <br />
              <span className={`text-gradient-luxury transition-all duration-1200 animation-delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {t('titleHighlight')}
              </span>
            </h1>

            <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-1000 animation-delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {t('description.line1')}
              <br />
              {t('description.line2')}
            </p>
          </div>

          {/* Key message */}
          <div className={`max-w-4xl mx-auto transition-all duration-1200 animation-delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-luxury border border-gray-200/30 hover:shadow-xl transition-shadow duration-500">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t('keyMessage.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {t('keyMessage.description')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 lg:gap-16 max-w-2xl mx-auto pt-8">
            <div className={`text-center transition-all duration-800 animation-delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 hover:scale-110 transition-transform duration-300">
                {t('usp.years')}
              </div>
              <div className="text-gray-600 font-medium">{t('uspLabel.years')}</div>
            </div>

            <div className={`text-center transition-all duration-800 animation-delay-1400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 hover:scale-110 transition-transform duration-300">
                {t('usp.drivers')}
              </div>
              <div className="text-gray-600 font-medium">{t('uspLabel.drivers')}</div>
            </div>

            <div className={`text-center transition-all duration-800 animation-delay-1600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 hover:scale-110 transition-transform duration-300">
                {t('usp.rides')}
              </div>
              <div className="text-gray-600 font-medium">{t('uspLabel.rides')}</div>
            </div>
          </div>

          {/* CTA */}
          <div className={`pt-8 transition-all duration-1000 animation-delay-1800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-luxury hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {t('cta.primary')}
            </button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent"></div>
        <div className="w-2 h-2 bg-gray-400/70 rounded-full mx-auto mt-2 animate-pulse"></div>
      </div>

      <style jsx>{`
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-900 { animation-delay: 900ms; }
        .animation-delay-1200 { animation-delay: 1200ms; }
        .animation-delay-1400 { animation-delay: 1400ms; }
        .animation-delay-1600 { animation-delay: 1600ms; }
        .animation-delay-1800 { animation-delay: 1800ms; }
      `}</style>
    </section>
  );
};

export default AboutHero;
