'use client';

import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  const professionalServices = [
    { name: t('services.zakelijk'), href: '/diensten/zakelijk' },
    { name: t('services.schiphol'), href: '/diensten/schiphol' },
    { name: t('services.hotel'), href: '/diensten/hotel' },
    { name: t('services.excursie'), href: '/diensten/excursie' },
    { name: t('services.vip'), href: '/diensten/vip' },
    { name: t('services.bedrijf'), href: '/diensten/bedrijf' },
    { name: t('services.evenementen'), href: '/diensten/evenementen' },
    { name: t('services.crew'), href: '/diensten/crew' },
  ];

  const europaLocations = [
    { name: 'Taxi Antwerpen', href: '/taxi/antwerpen' },
    { name: 'Taxi Bonn', href: '/taxi/bonn' },
    { name: 'Taxi Bremen', href: '/taxi/bremen' },
    { name: 'Taxi Brugge', href: '/taxi/brugge' },
    { name: 'Taxi Brussel', href: '/taxi/brussel' },
    { name: 'Taxi Duisburg', href: '/taxi/duisburg' },
    { name: 'Taxi Düsseldorf', href: '/taxi/dusseldorf' },
    { name: 'Taxi Essen', href: '/taxi/essen' },
    { name: 'Taxi Frankfurt', href: '/taxi/frankfurt' },
    { name: 'Taxi Gent', href: '/taxi/gent' },
    { name: 'Taxi Hamburg', href: '/taxi/hamburg' },
    { name: 'Taxi Keulen', href: '/taxi/keulen' },
  ];

  const airportLocations = [
    { name: 'Taxi Schiphol', href: '/airport/schiphol' },
    { name: 'Taxi Weeze airport', href: '/airport/weeze' },
    { name: 'Taxi Brussel airport', href: '/airport/brussel' },
    { name: 'Taxi Düsseldorf airport', href: '/airport/dusseldorf' },
    { name: 'Taxi Dortmund airport', href: '/airport/dortmund' },
    { name: 'Taxi Frankfurt airport', href: '/airport/frankfurt' },
    { name: 'Taxi Eindhoven airport', href: '/airport/eindhoven' },
    { name: 'Taxi Rotterdam airport', href: '/airport/rotterdam' },
    { name: 'Taxi Den helder airport', href: '/airport/denhelder' },
  ];

  const quickLinks = [
    { name: t('quickLinks.about'), href: '/over-ons' },
    { name: t('quickLinks.jobs'), href: '/werken-bij' },
    { name: t('quickLinks.rates'), href: '/tarieven' },
    { name: t('quickLinks.faq'), href: '/faq' },
    { name: t('quickLinks.contact'), href: '/contact' },
    { name: t('quickLinks.privacy'), href: '/privacy' },
    { name: t('quickLinks.terms'), href: '/voorwaarden' },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#1A1D1F] via-[#2C3135] to-[#1A1D1F] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Logo & Company Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#2C3135] font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">amstaxiholland</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('company.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-300">Spinakerhof 74</p>
                  <p className="text-gray-400">1034 MN Amsterdam</p>
                  <p className="text-gray-400">Noord-Holland, Nederland</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+31207717628" className="text-sm text-gray-300 hover:text-white transition-colors">
                  +31 20 771 76 28
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@amstaxiholland.nl" className="text-sm text-gray-300 hover:text-white transition-colors">
                  info@amstaxiholland.nl
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Professional Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">{t('sections.professionalServices')}</h3>
            <ul className="space-y-3">
              {professionalServices.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Taxi Transfer Europa */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">{t('sections.taxiEuropa')}</h3>
            <ul className="space-y-3">
              {europaLocations.map((location) => (
                <li key={location.name}>
                  <a 
                    href={location.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                    <span>{location.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Taxi Transfer Airport */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">{t('sections.taxiAirport')}</h3>
            <ul className="space-y-3">
              {airportLocations.map((location) => (
                <li key={location.name}>
                  <a 
                    href={location.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                    <span>{location.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Quick Links & CTA */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-6">{t('sections.quickLinks')}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mt-8">
              <h4 className="text-white font-bold mb-2">{t('cta.title')}</h4>
              <p className="text-gray-400 text-sm mb-4">{t('cta.description')}</p>
              <a 
                href="/boeken"
                className="block w-full bg-white text-[#2C3135] py-3 px-4 rounded-xl font-semibold text-center hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                {t('cta.button')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Betalen in de taxi */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-5 uppercase tracking-wider">
                {t('payment.inCar')}
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                {/* Payment icons blijven hetzelfde */}
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-2 hover:scale-105 transition-transform shadow-sm">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2C3135">€</text>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <rect width="48" height="48" fill="#006FCF"/>
                    <text x="24" y="28" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">AMEX</text>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <circle cx="18" cy="24" r="12" fill="#0066B2"/>
                    <circle cx="30" cy="24" r="12" fill="#EB001B"/>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <circle cx="18" cy="24" r="12" fill="#EB001B"/>
                    <circle cx="30" cy="24" r="12" fill="#FF5F00" opacity="0.8"/>
                    <circle cx="30" cy="24" r="12" fill="#F79E1B"/>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-2 hover:scale-105 transition-transform shadow-sm">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="8" width="16" height="10" rx="2" stroke="#2C3135" strokeWidth="1.5"/>
                    <path d="M4 11h16M8 14.5h2M12 14.5h4" stroke="#2C3135" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Online betalen */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-5 uppercase tracking-wider">
                {t('payment.online')}
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <rect width="48" height="48" fill="#006FCF"/>
                    <text x="24" y="28" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">AMEX</text>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <circle cx="18" cy="24" r="12" fill="#0066B2"/>
                    <circle cx="30" cy="24" r="12" fill="#EB001B"/>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <circle cx="18" cy="24" r="12" fill="#EB001B"/>
                    <circle cx="30" cy="24" r="12" fill="#FF5F00" opacity="0.8"/>
                    <circle cx="30" cy="24" r="12" fill="#F79E1B"/>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <rect width="48" height="48" fill="#CC0066"/>
                    <text x="24" y="28" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">iDEAL</text>
                  </svg>
                </div>
                <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 hover:scale-105 transition-transform shadow-sm">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <path d="M18 10h8c4 0 7 3 7 7s-3 7-7 7h-4l-2 10h-4l4-24z" fill="#003087"/>
                    <path d="M20 18h8c4 0 7 3 7 7s-3 7-7 7h-4l-2 10h-4l4-24z" fill="#009CDE"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} Amstaxiholland. {t('bottom.rights')}.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">{t('bottom.privacy')}</a>
              <a href="/cookies" className="hover:text-white transition-colors">{t('bottom.cookies')}</a>
              <a href="/voorwaarden" className="hover:text-white transition-colors">{t('bottom.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}