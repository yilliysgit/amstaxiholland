import React, { useState } from 'react';
import { ArrowRight, Car, Plane, Map, Building2, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
  schema: {
    "@type": string;
    name: string;
    description: string;
    provider: {
      "@type": string;
      name: string;
    };
    areaServed: string;
    serviceType: string;
  };
}

const ServiceCard: React.FC<{ service: ServiceItem; isVisible: boolean }> = ({ service, isVisible }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', hover: 'group-hover:bg-blue-100', text: 'text-blue-600', hoverText: 'group-hover:text-blue-600' },
    purple: { bg: 'bg-purple-50', hover: 'group-hover:bg-purple-100', text: 'text-purple-600', hoverText: 'group-hover:text-purple-600' },
    green: { bg: 'bg-green-50', hover: 'group-hover:bg-green-100', text: 'text-green-600', hoverText: 'group-hover:text-green-600' },
    amber: { bg: 'bg-amber-50', hover: 'group-hover:bg-amber-100', text: 'text-amber-600', hoverText: 'group-hover:text-amber-600' },
    pink: { bg: 'bg-pink-50', hover: 'group-hover:bg-pink-100', text: 'text-pink-600', hoverText: 'group-hover:text-pink-600' },
    indigo: { bg: 'bg-indigo-50', hover: 'group-hover:bg-indigo-100', text: 'text-indigo-600', hoverText: 'group-hover:text-indigo-600' }
  };
  
  const colors = colorClasses[service.color as keyof typeof colorClasses];
  
  return (
    <article 
      className={`flex-shrink-0 w-28 text-center group transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}
      itemScope 
      itemType="https://schema.org/Service"
    >
      <div className={`w-14 h-14 mx-auto mb-2 rounded-xl ${colors.bg} ${colors.hover} flex items-center justify-center transition-colors relative`}>
        {service.popular && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
        )}
        <div className={colors.text}>
          {service.icon}
        </div>
      </div>
      <h3 
        className={`text-xs font-medium text-gray-900 mb-1 ${colors.hoverText} transition-colors`}
        itemProp="name"
      >
        {service.shortTitle}
      </h3>
      <p 
        className="text-xs text-gray-500 leading-tight"
        itemProp="description"
      >
        {service.description}
      </p>
      
      {/* Hidden SEO content */}
      <div className="sr-only">
        <span itemProp="keywords">{service.keywords.join(', ')}</span>
        <span itemProp="provider" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">Taxi Amsterdam</span>
        </span>
      </div>
      
      {/* Structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(service.schema)
        }}
      />
    </article>
  );
};

const ServicesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const services: ServiceItem[] = [
    {
      id: "zakelijk-vervoer",
      title: "Zakelijk vervoer Amsterdam",
      shortTitle: "Zakelijk",
      description: "Professional business transport",
      keywords: ["zakelijk vervoer", "business taxi", "professioneel vervoer Amsterdam"],
      icon: <Car className="w-5 h-5" />,
      color: "blue",
      popular: true,
      schema: {
        "@type": "Service",
        name: "Zakelijk Vervoer Amsterdam",
        description: "Professioneel taxivervoer voor zakelijke doeleinden in Amsterdam",
        provider: {
          "@type": "Organization",
          name: "Taxi Amsterdam"
        },
        areaServed: "Amsterdam",
        serviceType: "Business Transportation"
      }
    },
    {
      id: "schiphol-taxi",
      title: "Schiphol Airport Taxi",
      shortTitle: "Schiphol",
      description: "Airport transfers",
      keywords: ["Schiphol taxi", "luchthavenvervoer", "airport transfer Amsterdam"],
      icon: <Plane className="w-5 h-5" />,
      color: "purple",
      popular: true,
      schema: {
        "@type": "Service",
        name: "Schiphol Airport Taxi",
        description: "Taxi vervoer van en naar Schiphol Airport Amsterdam",
        provider: {
          "@type": "Organization",
          name: "Taxi Amsterdam"
        },
        areaServed: "Amsterdam-Schiphol",
        serviceType: "Airport Transportation"
      }
    },
    {
      id: "amsterdam-tours",
      title: "Amsterdam Taxi Tours",
      shortTitle: "Tours",
      description: "City sightseeing tours",
      keywords: ["Amsterdam tours", "stadstour", "sightseeing taxi"],
      icon: <Map className="w-5 h-5" />,
      color: "green",
      schema: {
        "@type": "Service",
        name: "Amsterdam Taxi Tours",
        description: "Gepersonaliseerde taxi tours door Amsterdam",
        provider: {
          "@type": "Organization",
          name: "Taxi Amsterdam"
        },
        areaServed: "Amsterdam",
        serviceType: "Tour Service"
      }
    },
    {
      id: "hotel-vervoer",
      title: "Hotel Vervoer Amsterdam",
      shortTitle: "Hotels",
      description: "Hotel transportation",
      keywords: ["hotel taxi", "hotel vervoer Amsterdam", "accommodation transport"],
      icon: <Building2 className="w-5 h-5" />,
      color: "amber",
      schema: {
        "@type": "Service",
        name: "Hotel Vervoer Amsterdam",
        description: "Taxi vervoer voor hotelgasten in Amsterdam",
        provider: {
          "@type": "Organization",
          name: "Taxi Amsterdam"
        },
        areaServed: "Amsterdam",
        serviceType: "Hotel Transportation"
      }
    },
    {
      id: "evenementen-vervoer",
      title: "Evenementen Vervoer Amsterdam",
      shortTitle: "Events",
      description: "Event transportation",
      keywords: ["evenementen taxi", "event transport Amsterdam", "festival taxi"],
      icon: <Calendar className="w-5 h-5" />,
      color: "pink",
      schema: {
        "@type": "Service",
        name: "Evenementen Vervoer Amsterdam",
        description: "Taxi service voor evenementen en festivals in Amsterdam",
        provider: {
          "@type": "Organization",
          name: "Taxi Amsterdam"
        },
        areaServed: "Amsterdam",
        serviceType: "Event Transportation"
      }
    },
    {
      id: "bedrijfs-vervoer",
      title: "Bedrijfsvervoer Amsterdam",
      shortTitle: "Corporate",
      description: "Corporate contracts",
      keywords: ["bedrijfsvervoer", "corporate taxi", "zakelijke contracten Amsterdam"],
      icon: <Users className="w-5 h-5" />,
      color: "indigo",
      schema: {
        "@type": "Service",
        name: "Bedrijfsvervoer Amsterdam",
        description: "Corporate taxi services voor bedrijven in Amsterdam",
        provider: {
          "@type": "Organization",
          name: "Taxi Amsterdam"
        },
        areaServed: "Amsterdam",
        serviceType: "Corporate Transportation"
      }
    }
  ];

  const totalSlides = Math.ceil(services.length / 3);

  const slideNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const slidePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Taxi Amsterdam",
    description: "Premium taxi services in Amsterdam met 24/7 beschikbaarheid",
    url: "https://taxi-amsterdam.nl",
    areaServed: "Amsterdam, Nederland",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Taxi Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: service.schema,
        position: index + 1
      }))
    }
  };

  return (
    <section 
      className="py-6 px-4"
      aria-labelledby="services-heading"
    >
      {/* Compact Header */}
      <header className="text-center mb-6">
        <h1 
          id="services-heading"
          className="text-xl font-bold text-gray-900 mb-2"
        >
          Taxi Amsterdam Diensten
        </h1>
        <p className="text-sm text-gray-600">
          Premium taxi services in Amsterdam - 24/7 beschikbaar
        </p>
      </header>

      {/* Services Slider with Navigation */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={slidePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label="Previous services"
          disabled={totalSlides <= 1}
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        
        <button
          onClick={slideNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label="Next services"
          disabled={totalSlides <= 1}
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* Services Container */}
        <div className="mx-8 overflow-hidden">
          <div className="relative h-24">
            {/* All services rendered for SEO, visibility controlled by CSS */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`absolute inset-0 flex justify-center gap-4 transition-transform duration-300 ${
                  slideIndex === currentSlide ? 'translate-x-0' : 
                  slideIndex < currentSlide ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                {services.slice(slideIndex * 3, slideIndex * 3 + 3).map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    isVisible={slideIndex === currentSlide}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick CTA */}
      <div className="text-center mt-6">
        <button 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          aria-label="Direct taxi boeken"
        >
          Direct boeken
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Compact Trust Signals */}
      <div className="flex justify-center gap-8 mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">9.3★</div>
          <div className="text-xs text-gray-500">Hoogste waardering</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">24/7</div>
          <div className="text-xs text-gray-500">Beschikbaar</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">&lt;2min</div>
          <div className="text-xs text-gray-500">Responstijd</div>
        </div>
      </div>

      {/* Hidden structured data for organization */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
    </section>
  );
};

export default ServicesSection;