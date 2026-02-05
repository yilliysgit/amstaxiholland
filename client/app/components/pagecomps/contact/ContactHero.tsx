'use client';

import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { Phone, CheckCircle2, Mail, Award } from "lucide-react";
import ContactForm from './ContactForm';

export default function ContactHero() {
  const t = useTranslations('ContactPage.hero');
  const tCommon = useTranslations('Common');

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-mercedes-premium overflow-hidden">

      {/* Subtle gradient accents - Mercedes style */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-white/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-gray-100/10 to-transparent blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">

          {/* LEFT SIDE */}
          <div className="lg:col-span-7 mb-12 lg:mb-0">

            {/* Premium Badge */}
            <div
              className={`inline-flex items-center glass-effect px-5 py-2.5 rounded-full mb-8 
                transition-all duration-1000
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <Award className="w-4 h-4 text-gray-700 mr-2" />
              <span className="text-gray-800 font-semibold text-sm tracking-[0.2em]">
                {t('badge.text')}
              </span>
            </div>

            {/* TITLE - Premium Typography */}
            <div className="space-y-5 mb-8">
              <h1
                className={`
                  transition-all duration-1200 delay-200
                  ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
              >
                <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light text-gray-900 leading-[0.95] mb-3 tracking-tight">
                  {t('title').split(t('titleHighlight'))[0]}
                </span>
                
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 leading-[1] tracking-tight">
                  {t('titleHighlight')}
                </span>
                
                <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light text-gray-900 leading-[0.95] tracking-tight">
                  {t('title').split(t('titleHighlight'))[1]}
                </span>
              </h1>
            </div>

            {/* DESCRIPTION */}
            <div
              className={`
                space-y-3 text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl
                transition-all duration-1200 delay-400
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              <p className="font-normal">
                {t('description')}
              </p>
            </div>

            {/* USP's - Premium Style */}
            <div
              className={`
                flex flex-wrap gap-3 mb-10
                transition-all duration-1200 delay-600
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              {['responseTime', 'luxury', 'professional'].map((key, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 glass-effect border border-gray-200 shadow-sm px-4 py-2 rounded-full text-sm text-gray-700 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-gray-800" />
                  {t(`usp.${key}`)}
                </span>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div
              className={`
                hidden lg:flex gap-4 mb-12
                transition-all duration-1200 delay-600
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              {/* Primary CTA */}
              <button 
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className="btn-gradient-primary flex items-center gap-2"
              >
                {t('cta.primary')}
              </button>

              {/* Call CTA */}
              <a 
                href={`tel:${tCommon('contact.phone')}`}
                className="btn-gradient-secondary flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {t('cta.secondary')}
              </a>
            </div>

            {/* CONTACT INFO BOX - Premium Style */}
            <div
              className={`
                hidden lg:block transition-all duration-1200 delay-800
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              <div className="glass-effect rounded-2xl p-6 shadow-luxury border border-gray-200">
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-[0.15em]">Direct bellen</span>
                  <a 
                    href={`tel:${tCommon('contact.phone')}`} 
                    className="font-semibold text-gray-900 hover:text-gray-700 transition"
                  >
                    {tCommon('contact.phone')}
                  </a>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-[0.15em]">E-mail</span>
                  <a 
                    href={`mailto:${tCommon('contact.email')}`} 
                    className="font-semibold text-gray-900 hover:text-gray-700 transition"
                  >
                    {tCommon('contact.email')}
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE — FORM */}
          <div
            className={`
              lg:col-span-5 transition-all duration-1200 delay-400
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
          >
            <div id="contact-form" className="glass-effect rounded-2xl p-6 sm:p-8 shadow-luxury">
              <ContactForm />
            </div>

            {/* MOBILE CTA */}
            <div className="lg:hidden mt-6">
              
               <a href={`tel:${tCommon('contact.phone')}`}
                className="btn-gradient-secondary w-full flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {t('cta.secondary')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}