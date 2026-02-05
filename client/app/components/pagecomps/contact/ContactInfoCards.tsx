'use client';

import React from "react";
import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageSquare, AlertCircle, MapPin, Clock, CheckCircle2 } from "lucide-react";
import ContactCard from "./ContactCard";

export default function ContactInfoCards() {
  const t = useTranslations('ContactPage.infoCards');
  const tCommon = useTranslations('Common');

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-radial from-gray-100/30 to-transparent blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-base text-gray-600 font-normal max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">

          {/* 24/7 bereikbaar */}
          <ContactCard
            icon={<Phone className="w-5 h-5" />}
            title={t('cards.available.title')}
            description={t('cards.available.description')}
          >
            <div className="space-y-3 mt-6">

              {/* PHONE - Primary CTA */}
              
                <a href={`tel:${tCommon('contact.phone')}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100">
                    <Phone className="w-4 h-4 text-gray-800" />
                  </div>
                  <span className="font-semibold text-sm">
                    {tCommon('contact.phone')}
                  </span>
                </span>
                <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                  {t('cards.available.badge')}
                </span>
              </a>

              {/* EMAIL */}
              
                <a href={`mailto:${tCommon('contact.email')}`}
                className="flex items-center gap-2.5 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">{tCommon('contact.email')}</span>
              </a>

              {/* WhatsApp Button */}
              
                <a href={`https://wa.me/${tCommon('contact.whatsapp').replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-primary w-full flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                {t('cards.available.whatsapp')}
              </a>
            </div>
          </ContactCard>

          {/* Gevonden voorwerpen */}
          <ContactCard
            icon={<AlertCircle className="w-5 h-5" />}
            title={t('cards.lostItems.title')}
            description={t('cards.lostItems.description')}
          >
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('cards.lostItems.note')}
              </p>
            </div>
            
              <a href={`tel:${tCommon('contact.phone')}`}
              className="btn-gradient-secondary mt-5 w-full flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {t('cards.lostItems.cta')}
            </a>
          </ContactCard>

          {/* Klachten & feedback */}
          <ContactCard
            icon={<MessageSquare className="w-5 h-5" />}
            title={t('cards.feedback.title')}
            description={t('cards.feedback.description')}
          >
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('cards.feedback.note')}
              </p>
            </div>
            
              <a href={`mailto:${tCommon('contact.email')}`}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-900 px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              {t('cards.feedback.cta')}
            </a>
          </ContactCard>

          {/* Servicegebied */}
          <ContactCard
            icon={<MapPin className="w-5 h-5" />}
            title={t('cards.serviceArea.title')}
            description={t('cards.serviceArea.description')}
          >
            <ul className="mt-6 space-y-2.5">
              {['amsterdam', 'schiphol', 'business'].map((area, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-gray-800 flex-shrink-0" />
                  <span className="font-medium">{t(`cards.serviceArea.areas.${area}`)}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm">
              <span className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100">
                  <Clock className="w-4 h-4 text-gray-800" />
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {t('cards.serviceArea.availability')}
                </span>
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                {t('cards.serviceArea.badge')}
              </span>
            </div>
          </ContactCard>
        </div>
      </div>
    </section>
  );
}