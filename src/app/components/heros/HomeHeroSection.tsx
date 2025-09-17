"use client";

import { useState, useEffect } from "react";
import { Clock, Shield, Star, Phone, ArrowRight, MapPin, Calendar, Timer, Sparkles, Zap, Award } from "lucide-react";

// Types
interface HeroData {
  rating: {
    stars: number;
    score: string;
    text: string;
  };
  title: {
    main: string;
    subtitle: string;
  };
  description: string;
  features: {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
}

interface BookingFormData {
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
}

interface HeroProps {
  data?: HeroData;
  onBooking?: (formData: BookingFormData) => void;
}

// Default data
const defaultHeroData: HeroData = {
  rating: {
    stars: 5,
    score: "9.8",
    text: "Premium Service"
  },
  title: {
    main: "Luxe taxi in Amsterdam –",
    subtitle: "Zakelijk & privé altijd op tijd, altijd in stijl."
  },
  description: "Exclusief luchthavenvervoer, zakelijk vervoer en premium city tours met ervaren chauffeurs.",
  features: [
    {
      id: "instant",
      icon: <Zap className="h-6 w-6" />,
      title: "Direct Boeken",
      description: "Binnen 30 seconden gereserveerd"
    },
    {
      id: "luxury",
      icon: <Award className="h-6 w-6" />,
      title: "Premium Vloot", 
      description: "Mercedes S-Klasse & Tesla"
    },
    {
      id: "service",
      icon: <Sparkles className="h-6 w-6" />,
      title: "Luxe Service",
      description: "Professioneel en betrouwbaar"
    }
  ],
  stats: [
    { label: "TEVREDENHEID", value: "99.8%" },
    { label: "RESPONSTIJD", value: "< 90s" },
    { label: "ERVARING", value: "9+ Jaar" }
  ]
};

export default function HeroSection({ 
  data = defaultHeroData, 
  onBooking 
}: HeroProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: "",
    destination: "",
    date: "",
    time: ""
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <section className="relative min-h-screen bg-gradient-mercedes-premium overflow-hidden flex items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}
        />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-40 right-16 w-24 h-24 bg-gray-300/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '10s' }} />
        
        {/* Geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-gray-400/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gray-500/30 animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            
            {/* Premium Badge */}
            <div className={`inline-flex items-center glass-effect px-6 py-3 rounded-full transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center space-x-2 mr-4">
                {[...Array(data.rating.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-gray-800 font-semibold text-sm tracking-wide">
                {data.rating.score} • {data.rating.text}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className={`text-5xl lg:text-7xl font-bold leading-tight tracking-tight transform transition-all duration-1200 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <span className="block bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent animate-gradient-x">
                  {data.title.main}
                </span>
              </h1>
              <h2 className={`text-2xl lg:text-4xl font-medium text-gray-700 tracking-wide leading-relaxed transform transition-all duration-1200 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                {data.title.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className={`text-lg lg:text-xl leading-relaxed text-gray-600 max-w-2xl font-normal transform transition-all duration-1200 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {data.description}
            </p>

            {/* Additional Meta Description */}
            <p className={`text-base lg:text-lg leading-relaxed text-gray-500 max-w-2xl font-normal transform transition-all duration-1200 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              Boek uw luxe taxi in Amsterdam. 24/7 beschikbaar, ervaren chauffeurs, premium service voor luchthaven, zakelijk vervoer en privéritten. Altijd betrouwbaar.
            </p>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 transform transition-all duration-1200 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-2xl font-semibold text-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Boek Premium Taxi</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group glass-effect px-8 py-4 rounded-2xl font-semibold text-lg text-gray-800 hover:scale-105 transition-all duration-300 border border-gray-200/50">
                <span className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Bel Direct</span>
                </span>
              </button>
            </div>

            {/* Features Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 transform transition-all duration-1200 delay-1100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {data.features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className="group glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300 border border-gray-200/30"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-gray-700 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-8 pt-12 border-t border-gray-200/50 transform transition-all duration-1200 delay-1300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {data.stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className={`lg:col-span-5 transform transition-all duration-1200 delay-600 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="glass-effect rounded-3xl p-6 lg:p-8 border border-gray-200/30 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 max-h-[90vh] overflow-y-auto lg:mt-0">
              
              {/* Form Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 glass-effect rounded-full mb-3 border border-gray-200/50">
                  <MapPin className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Reserveer Uw Rit</h3>
                <p className="text-gray-600 text-sm">Premium service wacht op u</p>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Ophaallocatie
                    </label>
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={handleInputChange('pickupLocation')}
                      placeholder="Vul uw adres in"
                      className="w-full px-3 py-3 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300/70 text-gray-800 placeholder-gray-400 text-sm"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Bestemming
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={handleInputChange('destination')}
                      placeholder="Waar wilt u heen?"
                      className="w-full px-3 py-3 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300/70 text-gray-800 placeholder-gray-400 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative group">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        Datum
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange('date')}
                        className="w-full px-3 py-3 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300/70 text-gray-800 text-sm"
                      />
                    </div>
                    <div className="relative group">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                        <Timer className="w-3 h-3 inline mr-1" />
                        Tijd
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange('time')}
                        className="w-full px-3 py-3 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300/70 text-gray-800 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="group relative w-full py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-xl font-bold text-base overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl mt-6"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Bevestig Premium Booking</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-4 border-t border-gray-200/30">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Veilig</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Direct</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .text-5xl {
            font-size: 3rem;
            line-height: 1.1;
          }
          
          .lg\\:text-7xl {
            font-size: 3.5rem;
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
          
          .lg\\:text-4xl {
            font-size: 2rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
          }
          
          .lg\\:text-xl {
            font-size: 1.25rem;
          }
        }

        /* Enhanced glassmorphism */
        .glass-effect {
          backdrop-filter: blur(20px) saturate(180%);
          background-color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}