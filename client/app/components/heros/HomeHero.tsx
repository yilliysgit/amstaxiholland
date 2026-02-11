"use client";

import { useState, useEffect } from "react";
import { Shield, Phone, ArrowRight, MapPin, Calendar, Timer, Award, CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { homeLinks } from "@/app/config/links";
// import Link from "next/link";
import { Link } from "@/i18n/routing";


interface BookingFormData {
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
}

interface HeroProps {
  onBooking?: (formData: BookingFormData) => void;
}

export default function HomeHero({ onBooking }: HeroProps) {
  const t = useTranslations('HomePage.hero');
  
const servicesHref = homeLinks.hero.cta.services.href;


  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: "",
    destination: "",
    date: "",
    time: ""
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (field: keyof BookingFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = () => {
    onBooking?.(formData);
  };

  return (
    <section className="relative min-h-screen bg-gradient-mercedes-premium overflow-hidden">
      
      {/* Subtle gradient accents - NO DOTS */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-white/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-gray-100/10 to-transparent blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            
            {/* Premium Badge */}
            <div className={`inline-flex items-center glass-effect px-5 py-2.5 rounded-full mb-8 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Award className="w-4 h-4 text-gray-700 mr-2" />
              <span className="text-gray-800 font-semibold text-sm tracking-[0.2em]">
                {t('badge.text')}
              </span>
            </div>

            {/* Main Title - SEO Optimized */}
            <div className="space-y-5 mb-8">
              <h1 className={`transition-all duration-1200 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <span className="block text-gray-600 text-base sm:text-lg font-medium tracking-[0.35em] uppercase mb-4">
                  {t('title.overline')}
                </span>
                
                <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light text-gray-900 leading-[0.95] mb-3 tracking-tight">
                  {t('title.main')}
                </span>
                
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 leading-[1] tracking-tight">
                  {t('title.sub')}
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className={`space-y-3 text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl transition-all duration-1200 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <p className="font-normal">
                {t('description.line1')}
              </p>
              <p className="font-medium text-gray-800">
                {t('description.line2')}
              </p>
            </div>

{/* CTA Buttons */}
<div
  className={`hidden lg:flex gap-4 mb-12 transition-all duration-1200 delay-600 ${
    isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
  }`}
>
  {/* WhatsApp CTA (extern → gewone <a>) */}
  <a
    href="https://wa.me/31645014704"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-gradient-primary flex items-center gap-2"
  >
    <Phone className="w-5 h-5" />
    {t("cta.callNow")}
  </a>

  {/* Diensten CTA (intern → next-intl Link met pathname) */}
  <Link
    href={{
      pathname: servicesHref,
    }}
    className="btn-gradient-secondary flex items-center gap-2"
  >
    {t("cta.ourServices")}
    <ArrowRight className="w-5 h-5" />
  </Link>
</div>

            {/* Trust Indicators */}
            <div className={`hidden lg:flex items-center gap-8 pt-8 border-t border-gray-200 transition-all duration-1200 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-800" />
                <span className="text-sm text-gray-600 font-medium">
                  {t('trustIndicators.certified')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-800" />
                <span className="text-sm text-gray-600 font-medium">
                  {t('trustIndicators.insured')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-800" />
                <span className="text-sm text-gray-600 font-medium">
                  {t('trustIndicators.premium')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className={`lg:col-span-5 transition-all duration-1200 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-luxury">
              
              {/* Form Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl border border-gray-200">
                    <MapPin className="w-6 h-6 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    {t('bookingForm.title')}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 font-light">
                  {t('bookingForm.subtitle')}
                </p>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
                    {t('bookingForm.labels.pickup')}
                  </label>
                  <input
                    type="text"
                    value={formData.pickupLocation}
                    onChange={handleInputChange('pickupLocation')}
                    placeholder={t('bookingForm.placeholders.pickup')}
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 placeholder-gray-400 font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
                    {t('bookingForm.labels.destination')}
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={handleInputChange('destination')}
                    placeholder={t('bookingForm.placeholders.destination')}
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 placeholder-gray-400 font-normal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {t('bookingForm.labels.date')}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange('date')}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
                      <Timer className="w-3 h-3 inline mr-1" />
                      {t('bookingForm.labels.time')}
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange('time')}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 font-normal"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn-gradient-primary w-full mt-6 flex items-center justify-center gap-2"
                >
                  {t('bookingForm.submit')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-gray-800" />
                    <span className="font-medium">{t('trustIndicators.safe')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-gray-800" />
                    <span className="font-medium">{t('trustIndicators.instant')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-gray-800" />
                    <span className="font-medium">{t('trustIndicators.premiumShort')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden mt-6">
              <button className="btn-gradient-secondary w-full flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                {t('cta.callNow')}
              </button>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}