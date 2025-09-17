import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Star, ArrowRight, Car, Shield, Zap, Award, Phone, Users, Navigation } from 'lucide-react';

interface TaxiHeroProps {
  cityName: string;
  destinationCity?: string;
  tagline?: string;
  description?: string;
  rating?: number;
  serviceType?: string;
}

const TaxiHero: React.FC<TaxiHeroProps> = ({
  cityName = "Amsterdam",
  destinationCity = "Rotterdam", 
  tagline = "Zakelijk & privé altijd op tijd, altijd in stijl.",
  description = "Exclusief luchthavenvervoer, zakelijk vervoer en premium city tours met ervaren chauffeurs.",
  rating = 9.8,
  serviceType = "Premium Service"
}) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedService, setSelectedService] = useState('premium');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      id: 'economy',
      name: 'Comfort',
      price: '€45',
      time: '5 min',
      icon: Car,
      gradient: 'from-gray-100 to-gray-200',
      features: ['Betrouwbaar', 'Schoon', 'Op tijd']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '€89',
      time: '3 min', 
      icon: Shield,
      gradient: 'from-navy-600 to-gray-800',
      features: ['Mercedes/BMW', 'Luxe interieur', 'Water & WiFi'],
      popular: true
    },
    {
      id: 'luxury',
      name: 'Executive',
      price: '€149',
      time: '2 min',
      icon: Award,
      gradient: 'from-gray-900 to-navy-900',
      features: ['S-Klasse', 'Chauffeur service', 'VIP behandeling']
    }
  ];

  const handleBooking = () => {
    const selectedServiceData = services.find(s => s.id === selectedService);
    console.log('Booking:', { 
      pickupLocation, 
      destination, 
      date, 
      time, 
      service: selectedServiceData 
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-mercedes-animated">
      {/* Dynamic Background with Mouse Tracking */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(71, 85, 105, 0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(29, 41, 57, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(29, 41, 57, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 pt-20 pb-16 lg:pt-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[calc(100vh-6rem)]">
          
          {/* Left Column - Content */}
          <div className={`space-y-10 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            
            {/* Floating Rating Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/50 to-orange-400/50 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative inline-flex items-center gap-3 px-6 py-3 glass-effect rounded-full shadow-luxury group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gradient-primary">
                  {rating} • {serviceType}
                </span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Hero Text with Stagger Animation */}
            <div className="space-y-6 relative">
              <div className="absolute -left-4 top-0 w-1 h-32 bg-gradient-to-b from-navy-600 to-transparent opacity-30"></div>
              
              <h1 className="relative">
                <span className="block text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-gradient-hero mb-4">
                  Luxe taxi in
                </span>
                <span className="block text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-gradient-animated">
                  {cityName} –
                </span>
                
                {/* Decorative Elements */}
                <div className="absolute -right-8 top-8 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-60 animate-pulse"></div>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                <span className="text-gradient-luxury font-semibold">{tagline}</span>
              </p>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                {description}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Boek uw luxe taxi in <strong>{cityName}</strong>. 24/7 beschikbaar, ervaren chauffeurs, 
                premium service voor luchthaven, zakelijk vervoer en privéritten. 
                <span className="text-gradient-primary font-semibold"> Altijd betrouwbaar.</span>
              </p>
            </div>

            {/* Animated Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Clock, text: '24/7 Service', color: 'text-blue-600' },
                { icon: Shield, text: 'Verzekerd', color: 'text-green-600' },
                { icon: Users, text: '10K+ Ritten', color: 'text-purple-600' },
                { icon: Navigation, text: 'Live Tracking', color: 'text-orange-600' }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl glass-effect hover:shadow-md transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className={`p-3 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 text-center">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button className="btn-gradient-secondary flex items-center gap-3 group">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>+31 20 771 78 28</span>
              </button>
              
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Nu online • Directe booking</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Booking Form */}
          <div className={`lg:justify-self-end w-full max-w-lg transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            
            {/* Service Selection Cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {services.map((service, i) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`relative cursor-pointer group transition-all duration-300 ${
                    selectedService === service.id 
                      ? 'scale-105 shadow-xl' 
                      : 'hover:scale-102 hover:shadow-lg'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl transition-all duration-300 ${
                    selectedService === service.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-90'
                  }`}></div>
                  
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-white rounded-full shadow-lg animate-bounce">
                      POPULAIR
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="relative p-4 text-center">
                    <service.icon className={`w-8 h-8 mx-auto mb-2 transition-all duration-300 ${
                      service.id === 'premium' || service.id === 'luxury' ? 'text-white' : 'text-gray-600'
                    } group-hover:scale-110`} />
                    
                    <div className={`font-bold text-sm mb-1 ${
                      service.id === 'premium' || service.id === 'luxury' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {service.name}
                    </div>
                    
                    <div className={`text-lg font-black mb-1 ${
                      service.id === 'premium' || service.id === 'luxury' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {service.price}
                    </div>
                    
                    <div className={`text-xs opacity-80 ${
                      service.id === 'premium' || service.id === 'luxury' ? 'text-white' : 'text-gray-600'
                    }`}>
                      {service.time} wachttijd
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedService === service.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-4 border-navy-600 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Service Features */}
            <div className="mb-8 p-4 glass-effect rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                {services.find(s => s.id === selectedService)?.name} Inclusief:
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {services.find(s => s.id === selectedService)?.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Booking Form */}
            <div className="glass-effect rounded-3xl p-8 shadow-luxury relative overflow-hidden">
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-600 via-transparent to-gray-800 animate-pulse"></div>
              </div>

              {/* Form Header */}
              <div className="relative text-center mb-8">
                <h3 className="text-3xl font-black text-gradient-hero mb-3">
                  Reserveer Direct
                </h3>
                <p className="text-gray-600 font-medium">
                  Premium service • Bevestiging binnen 30 seconden
                </p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full animate-ping"></div>
              </div>

              {/* Interactive Form Fields */}
              <div className="space-y-6">
                
                {/* Pickup Location with Animation */}
                <div className="group space-y-3">
                  <div className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-navy-600" />
                    Ophaallocatie
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Vul uw adres in..."
                      className="w-full px-6 py-5 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-navy-500/20 focus:border-navy-500 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-sm hover:shadow-md group-hover:bg-white"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-navy-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div className="group space-y-3">
                  <div className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-navy-600" />
                    Bestemming
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Waar gaat u naartoe?"
                      className="w-full px-6 py-5 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-navy-500/20 focus:border-navy-500 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-sm hover:shadow-md group-hover:bg-white"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-navy-600 transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group space-y-3">
                    <div className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-navy-600" />
                      Datum
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-5 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-navy-500/20 focus:border-navy-500 transition-all duration-300 text-gray-800 font-medium shadow-sm hover:shadow-md group-hover:bg-white"
                    />
                  </div>
                  
                  <div className="group space-y-3">
                    <div className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-navy-600" />
                      Tijd
                    </div>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-5 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-navy-500/20 focus:border-navy-500 transition-all duration-300 text-gray-800 font-medium shadow-sm hover:shadow-md group-hover:bg-white"
                    />
                  </div>
                </div>

                {/* Dynamic Pricing Display */}
                <div className="p-6 bg-gradient-to-r from-navy-50 to-gray-50 rounded-2xl border border-gray-200/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Geschatte prijs:</div>
                      <div className="text-3xl font-black text-gradient-primary">
                        {services.find(s => s.id === selectedService)?.price}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Wachttijd:</div>
                      <div className="text-xl font-bold text-green-600">
                        {services.find(s => s.id === selectedService)?.time}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Booking Button */}
                <button
                  onClick={handleBooking}
                  className="w-full relative group bg-gradient-to-r from-navy-600 via-gray-800 to-navy-600 text-white py-6 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-500 via-gray-700 to-navy-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <span>Bevestig Premium Booking</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>
                </button>

                {/* Security Indicators */}
                <div className="flex justify-center gap-8 pt-6 border-t border-gray-200/30">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">SSL Beveiligd</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Direct Bevestigd</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Premium Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TaxiHero;