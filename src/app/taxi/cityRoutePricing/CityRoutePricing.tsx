import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Euro, ArrowRight, Car, Shield, Star, Navigation, Route, Zap, Phone } from 'lucide-react';

interface RouteCardProps {
  from: string;
  to: string;
  price: string;
  duration: string;
  distance: string;
  isPopular?: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, price, duration, distance, isPopular }) => (
  <div className={`group relative p-6 glass-effect rounded-3xl hover:shadow-luxury transition-all duration-300 hover:scale-[1.02] ${isPopular ? 'ring-2 ring-yellow-400/50' : ''}`}>
    {isPopular && (
      <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
        POPULAIRSTE ROUTE
      </div>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-navy-600 to-gray-800 rounded-full">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-gray-900">{from}</div>
          <div className="text-sm text-gray-600">→ {to}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black text-gradient-primary">{price}</div>
        <div className="text-xs text-gray-500">vanaf</div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="w-4 h-4 text-blue-500" />
        <span>{duration}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Route className="w-4 h-4 text-green-500" />
        <span>{distance}</span>
      </div>
    </div>
    
    <button className="w-full mt-4 py-3 bg-gradient-button-primary text-white rounded-xl font-semibold hover:shadow-md transition-all duration-300 group-hover:bg-gradient-button-hover">
      Direct Boeken
    </button>
  </div>
);

const PremiumRouteSection: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const routes = [
    {
      from: "Rotterdam Centrum",
      to: "Amsterdam Centrum", 
      price: "€89",
      duration: "45 min",
      distance: "78 km",
      isPopular: true
    },
    {
      from: "Rotterdam",
      to: "Schiphol Airport",
      price: "€95", 
      duration: "40 min",
      distance: "65 km"
    },
    {
      from: "Rotterdam",
      to: "Amsterdam Zuid",
      price: "€85",
      duration: "42 min", 
      distance: "75 km"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Vast Tarief",
      description: "Geen verrassingen, altijd dezelfde prijs",
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "24/7 Beschikbaar", 
      description: "Dag en nacht, ook in weekenden",
      color: "text-blue-600"
    },
    {
      icon: Car,
      title: "Premium Voertuigen",
      description: "Mercedes, BMW en Audi vloot",
      color: "text-purple-600"
    },
    {
      icon: Star,
      title: "9.8 Rating",
      description: "Meer dan 15.000+ tevreden klanten",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="section-spacing-lg bg-gradient-mercedes-premium relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            
            {/* Section Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-navy-600/10 to-gray-800/10 rounded-full border border-navy-600/20">
                <Route className="w-5 h-5 text-navy-600" />
                <span className="text-sm font-semibold text-navy-600">Premium Routes</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                <span className="text-gradient-hero">Voordelige taxi vanaf</span>
                <br />
                <span className="text-gradient-primary">Rotterdam naar</span>
                <br />
                <span className="text-gradient-luxury">Amsterdam & Schiphol</span>
              </h2>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                <strong className="text-gradient-primary">Taxi Rotterdam:</strong> van en naar Amsterdam voor een 
                <span className="font-semibold text-navy-600"> vast en voordelig tarief</span>
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Bestel uw taxi Rotterdam van en naar Amsterdam via AmsTaxiHolland. Bij ons weet u 
                namelijk al voordat u in de taxi stapt wat u aan kosten kwijt bent. 
                <span className="text-gradient-primary font-semibold"> AmsTaxiHolland werkt met vaste, voordelige tarieven.</span>
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                Kiest u voor ons dan weet u zeker dat u niet hoeft te onderhandelen of opeens veel 
                duurder uit bent. U vindt de tarieven voor onze taxiritten op de website. Hier kunt u 
                ook gelijk reserveren. <strong>Wij zijn 24 uur per dag te bereiken.</strong>
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="group p-4 glass-effect rounded-2xl hover:shadow-md transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`p-3 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300 w-fit mb-3`}>
                    <feature.icon className={`w-6 h-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn-gradient-primary flex items-center gap-3 group">
                <Car className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Taxi Rotterdam Bestellen</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="btn-gradient-secondary flex items-center gap-3 group">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>+31 20 771 78 28</span>
              </button>
            </div>
          </div>

          {/* Right Column - Interactive Map & Routes */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            
            {/* Amsterdam Map Visualization */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-navy-600/20 to-gray-800/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative glass-effect rounded-3xl p-8 shadow-luxury">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gradient-primary flex items-center gap-3">
                    <Navigation className="w-6 h-6 text-navy-600" />
                    Live Route Tracker
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600">Live beschikbaar</span>
                  </div>
                </div>

                {/* Interactive Map Container */}
                <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 rounded-2xl h-80 overflow-hidden border-2 border-gray-200/30">
                  
                  {/* Map Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(29, 41, 57, 0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(29, 41, 57, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                      className="w-full h-full"
                    ></div>
                  </div>

                  {/* City Markers */}
                  <div className="absolute top-16 left-16 group/marker cursor-pointer">
                    <div className="relative">
                      <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg animate-pulse"></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md opacity-0 group-hover/marker:opacity-100 transition-all duration-300">
                        <div className="text-xs font-bold text-gray-800">Rotterdam</div>
                        <div className="text-xs text-gray-600">Vertrekpunt</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-24 right-20 group/marker cursor-pointer">
                    <div className="relative">
                      <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md opacity-0 group-hover/marker:opacity-100 transition-all duration-300">
                        <div className="text-xs font-bold text-gray-800">Amsterdam</div>
                        <div className="text-xs text-gray-600">Bestemming</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-20 right-32 group/marker cursor-pointer">
                    <div className="relative">
                      <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md opacity-0 group-hover/marker:opacity-100 transition-all duration-300">
                        <div className="text-xs font-bold text-gray-800">Schiphol</div>
                        <div className="text-xs text-gray-600">Luchthaven</div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Route Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1d2939" stopOpacity="0.8"/>
                        <stop offset="50%" stopColor="#475467" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#667085" stopOpacity="0.4"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Rotterdam to Amsterdam */}
                    <path
                      d="M 70 80 Q 200 60 280 120"
                      stroke="url(#routeGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="8,4"
                      className="animate-pulse"
                    />
                    
                    {/* Rotterdam to Schiphol */}
                    <path
                      d="M 70 80 Q 150 180 240 240"
                      stroke="url(#routeGradient)" 
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="8,4"
                      className="animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </svg>

                  {/* Floating Car Icon */}
                  <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg animate-bounce">
                      <Car className="w-6 h-6 text-navy-600" />
                    </div>
                  </div>

                  {/* Interactive Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5 pointer-events-none"></div>
                </div>

                {/* Route Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gradient-primary">78km</div>
                    <div className="text-xs text-gray-600">Gemiddelde afstand</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gradient-primary">45min</div>
                    <div className="text-xs text-gray-600">Gemiddelde reistijd</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gradient-primary">€89</div>
                    <div className="text-xs text-gray-600">Vast tarief</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <Euro className="w-6 h-6 text-green-600" />
                Populaire Routes & Tarieven
              </h3>
              
              <div className="space-y-4">
                {routes.map((route, i) => (
                  <RouteCard key={i} {...route} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Direct Beschikbaar
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50 hover:shadow-md transition-all duration-300 group">
                  <Clock className="w-6 h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-sm font-semibold text-green-700">Nu Bestellen</div>
                  <div className="text-xs text-green-600">2 min wachttijd</div>
                </button>
                
                <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 hover:shadow-md transition-all duration-300 group">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-sm font-semibold text-blue-700">Vooruit Boeken</div>
                  <div className="text-xs text-blue-600">Tot 30 dagen</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default PremiumRouteSection;