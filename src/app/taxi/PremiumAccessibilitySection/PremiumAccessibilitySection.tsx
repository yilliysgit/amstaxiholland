import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  Phone, 
  MessageSquare, 
  CheckCircle,
  ArrowRight,
  Star,
  Accessibility,
  Dog,
  UserCheck,
  Clock,
  Award,
  Eye,
  Ear,
  Car,
  Navigation
} from 'lucide-react';

interface SpecialServiceProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
}

const SpecialServiceCard: React.FC<SpecialServiceProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  color, 
  gradient 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative transition-all duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
      
      {/* Main Card */}
      <div className="relative h-full glass-effect rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
          <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full blur-2xl`}></div>
        </div>

        {/* Icon */}
        <div className="relative mb-4">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110`}>
            <Icon className={`w-6 h-6 ${color} group-hover:scale-110 transition-transform duration-300`} />
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
              {title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumAccessibilitySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const specialServices = [
    {
      icon: Accessibility,
      title: "Rolstoel Toegankelijk",
      description: "Gespecialiseerde voertuigen met liften en bevestigingssystemen voor maximale veiligheid.",
      features: [
        "Gecertificeerde rolstoel liften",
        "Veiligheidsbevestiging",
        "Ruime voertuigen",
        "Ervaren chauffeurs"
      ],
      color: "text-blue-600",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Dog,
      title: "Geleidehonden & Assistentie",
      description: "Welkom voor geleidehonden en service dieren met speciale accommodaties.",
      features: [
        "Geen extra kosten",
        "Speciale ruimte voorzieningen", 
        "Water beschikbaar",
        "Stressvrije omgeving"
      ],
      color: "text-green-600",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Eye,
      title: "Visuele Ondersteuning",
      description: "Begeleiding voor slechtzienden met audio aanwijzingen en persoonlijke assistentie.",
      features: [
        "Deur-tot-deur service",
        "Audio navigatie updates",
        "Persoonlijke begeleiding",
        "Veilige instap assistentie"
      ],
      color: "text-purple-600", 
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Ear,
      title: "Gehoor Ondersteuning",
      description: "Aangepaste communicatie voor doven en slechthorenden via visuele signalen.",
      features: [
        "Visuele communicatie",
        "SMS updates",
        "Geschreven instructies",
        "Geduldig personeel"
      ],
      color: "text-orange-600",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: UserCheck,
      title: "Discrete Service",
      description: "Vertrouwelijke transporten voor gevoelige situaties met maximale privacy.",
      features: [
        "Getinte ramen",
        "Discrete chauffeurs",
        "Flexibele routes",
        "Volledige confidentialiteit"
      ],
      color: "text-gray-600",
      gradient: "from-gray-400 to-slate-500"
    },
    {
      icon: Heart,
      title: "Medische Transporten",
      description: "Veilige transporten naar ziekenhuizen, klinieken en medische afspraken.",
      features: [
        "Comfortabele voertuigen",
        "Snelle beschikbaarheid",
        "Medische kennis",
        "Flexibele planning"
      ],
      color: "text-red-600",
      gradient: "from-red-400 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Maria van der Berg",
      text: "Fantastische service voor mijn rolstoel transport. Chauffeur was zeer behulpzaam en professioneel.",
      rating: 5,
      service: "Rolstoel Service"
    },
    {
      name: "Hans Jansen", 
      text: "Mijn geleidehond werd hartelijk welkom geheten. Geen extra kosten, geweldige ervaring.",
      rating: 5,
      service: "Geleidehond Transport"
    },
    {
      name: "Sophie Bakker",
      text: "Discrete en betrouwbare service voor mijn medische afspraken. Altijd op tijd en comfortabel.",
      rating: 5,
      service: "Medisch Transport"
    }
  ];

  return (
    <section className="section-spacing-lg relative overflow-hidden bg-gradient-mercedes-premium">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pattern-overlay opacity-5"></div>
      <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column - Hero Image Area */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            
            {/* Customer Image Placeholder with Overlay */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-96 lg:h-[500px] overflow-hidden shadow-luxury">
                
                {/* Professional Customer Service Representative */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent z-10"></div>
                
                {/* Simulated Professional Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-800">Persoonlijke Service</h3>
                      <p className="text-gray-600 max-w-xs">Ons team staat klaar om uw specifieke vervoersbehoeften te bespreken</p>
                    </div>
                  </div>
                </div>

                {/* Floating Contact Elements */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="glass-effect rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-white">Nu beschikbaar</span>
                      </div>
                      <div className="flex gap-2">
                        <Phone className="w-5 h-5 text-white" />
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -right-8 glass-effect rounded-2xl p-6 shadow-luxury">
              <div className="text-center">
                <div className="text-3xl font-black text-gradient-primary">98%</div>
                <div className="text-sm text-gray-600 font-semibold">Tevredenheid</div>
                <div className="text-xs text-gray-500">Speciale vervoer</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-gradient-primary uppercase tracking-wide">
                  Inclusief Vervoer
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-gradient-hero">Speciale wensen</span>
                <br />
                <span className="text-gradient-primary">vervoer</span>
              </h2>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                Er kunnen verschillende redenen zijn, dat de uw vervoerswensen afwijken van hetgeen 
                gebruikelijk is. <span className="text-gradient-primary font-semibold">Zo moet u denken aan geleidehonden, 
                rolstoel vervoer of wilt u discreet vervoerd worden.</span>
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Neemt u gerust contact op met ons voor al uw vragen en wensen, 
                <strong> wij zullen een gepaste oplossing aanreiken.</strong>
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {specialServices.map((service, i) => (
                <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <SpecialServiceCard {...service} />
                </div>
              ))}
            </div>

            {/* Testimonial Carousel */}
            <div className="glass-effect rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-bold text-gray-700">Klantbeoordelingen</span>
              </div>
              
              <div className="space-y-4 min-h-[120px]">
                <div className="transition-all duration-500">
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-3 leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonials[activeTestimonial].service}
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTestimonial(i)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === activeTestimonial ? 'bg-blue-500 w-6' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Persoonlijke Hulp</h4>
                    <p className="text-sm text-gray-600">Bespreek uw specifieke behoeften</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn-gradient-primary py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 group">
                    <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Direct Bellen</span>
                  </button>
                  
                  <button className="btn-gradient-secondary py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 group">
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Chat Starten</span>
                  </button>
                </div>
              </div>

              {/* Main CTA */}
              <button className="w-full btn-gradient-primary py-4 px-6 text-lg font-bold flex items-center justify-center gap-3 group">
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Contact Opnemen met AmsTaxiHolland</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">100% Toegankelijk</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">24/7 Beschikbaar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Gecertificeerd</span>
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

export default PremiumAccessibilitySection;