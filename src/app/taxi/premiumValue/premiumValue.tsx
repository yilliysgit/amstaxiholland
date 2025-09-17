import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Clock, 
  Euro, 
  Star, 
  Car, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Award,
  Heart,
  TrendingUp,
  Calculator,
  Settings,
  UserCheck
} from 'lucide-react';

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  gradient: string;
  iconColor: string;
  isPopular?: boolean;
}

const ValueCard: React.FC<ValueCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  ctaText, 
  gradient, 
  iconColor, 
  isPopular 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative h-full transition-all duration-500 ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
      
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 -right-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            MEEST GEKOZEN
          </div>
        </div>
      )}
      
      {/* Main Card */}
      <div className="relative h-full glass-effect rounded-3xl p-8 shadow-luxury hover:shadow-2xl transition-all duration-500 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full blur-3xl`}></div>
        </div>

        {/* Icon Header */}
        <div className="relative mb-6">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
            <Icon className={`w-8 h-8 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-6">
          <div>
            <h3 className="text-2xl font-black text-gradient-primary mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {description}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 group/feature"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500 group-hover/feature:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="w-full mt-6 py-4 px-6 bg-gradient-button-primary text-white rounded-2xl font-bold hover:bg-gradient-button-hover transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 group/btn">
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PremiumValueSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const valueCards = [
    {
      icon: Calculator,
      title: "Transparante Tarieven",
      description: "Weet vooraf exact wat uw rit kost. Geen verrassingen, alleen eerlijke en competitieve prijzen.",
      features: [
        "Vaste tarieven zonder toeslag",
        "Online prijscalculator",
        "Geen verborgen kosten",
        "Betaal vooraf of achteraf"
      ],
      ctaText: "Bereken Uw Ritprijs",
      gradient: "from-green-400 to-blue-500",
      iconColor: "text-green-600"
    },
    {
      icon: Settings,
      title: "Kies Uw Luxeniveau",
      description: "Van comfort tot executive class - bepaal zelf het comfortniveau en de voertuigklasse voor uw rit.",
      features: [
        "Comfort: Toyota, Volkswagen",
        "Premium: Mercedes, BMW, Audi", 
        "Executive: S-Klasse, 7-Serie",
        "Eco-vriendelijke opties"
      ],
      ctaText: "Bekijk Alle Voertuigen",
      gradient: "from-purple-400 to-pink-500",
      iconColor: "text-purple-600",
      isPopular: true
    },
    {
      icon: UserCheck,
      title: "Excellente Chauffeurs",
      description: "Professionele, ervaren chauffeurs met ruime ervaring en onberispelijke staat van dienst.",
      features: [
        "VOG-gescreende chauffeurs",
        "Lokale kennis & ervaring",
        "Discrete & betrouwbare service",
        "Meertalige chauffeurs"
      ],
      ctaText: "Ontmoet Ons Team",
      gradient: "from-yellow-400 to-orange-500",
      iconColor: "text-yellow-600"
    }
  ];

  const stats = [
    { icon: Users, value: "25.000+", label: "Tevreden Klanten", color: "text-blue-600" },
    { icon: Star, value: "9.8", label: "Gemiddelde Rating", color: "text-yellow-600" },
    { icon: Clock, value: "24/7", label: "Beschikbaar", color: "text-green-600" },
    { icon: Award, value: "15+", label: "Jaar Ervaring", color: "text-purple-600" }
  ];

  const rotatingFeatures = [
    { icon: Shield, text: "100% Verzekerd & Veilig", color: "text-green-500" },
    { icon: Zap, text: "Gemiddeld 3 min wachttijd", color: "text-blue-500" },
    { icon: Heart, text: "Persoonlijke aandacht", color: "text-red-500" },
    { icon: TrendingUp, text: "Beste prijs-kwaliteit", color: "text-purple-500" }
  ];

  return (
    <section className="section-spacing-lg relative overflow-hidden bg-gradient-mercedes-animated">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pattern-overlay opacity-10"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative">
        
        {/* Header Section */}
        <div className={`text-center mb-16 space-y-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-effect rounded-full">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-sm font-bold text-gradient-primary uppercase tracking-wide">
              Het taxibedrijf waar alles draait om de klant
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black leading-[0.9] max-w-6xl mx-auto">
              <span className="text-gradient-hero">Ongehaast, comfortabel</span>
              <br />
              <span className="text-gradient-primary">en ruim op tijd</span>
              <br />
              <span className="text-gradient-luxury">op uw bestemming</span>
            </h2>
            
            <p className="text-2xl lg:text-3xl text-gray-600 font-medium max-w-4xl mx-auto leading-relaxed">
              Kies voor <span className="text-gradient-primary font-bold">taxi Zutphen</span> - 
              waar premium service en persoonlijke aandacht samenkomen
            </p>
          </div>

          {/* Rotating Feature */}
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-500">
              {React.createElement(rotatingFeatures[activeFeature].icon, {
                className: `w-6 h-6 ${rotatingFeatures[activeFeature].color} animate-pulse`
              })}
              <span className="font-semibold text-gray-800">
                {rotatingFeatures[activeFeature].text}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="glass-effect rounded-3xl p-8 shadow-luxury">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-3xl lg:text-4xl font-black text-gradient-primary">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Value Cards Grid */}
        <div className={`grid lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {valueCards.map((card, i) => (
            <div key={i} style={{ animationDelay: `${i * 0.2}s` }}>
              <ValueCard {...card} />
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center space-y-8 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="glass-effect rounded-3xl p-10 shadow-luxury relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-600/5 via-purple-600/5 to-blue-600/5 animate-pulse"></div>
            
            <div className="relative space-y-6">
              <h3 className="text-3xl lg:text-4xl font-black text-gradient-hero">
                Klaar om uw volgende rit te boeken?
              </h3>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ervaar zelf waarom meer dan 25.000 klanten voor ons kiezen. 
                <span className="text-gradient-primary font-semibold"> Boek nu en ontdek het verschil.</span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="btn-gradient-primary px-8 py-4 text-lg font-bold flex items-center gap-3 group">
                  <Car className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Direct Boeken</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="btn-gradient-secondary px-8 py-4 text-lg font-bold flex items-center gap-3 group">
                  <Calculator className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Prijs Berekenen</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-gray-200/30">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">100% Veilig</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Direct Beschikbaar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Euro className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">Beste Prijzen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default PremiumValueSection;