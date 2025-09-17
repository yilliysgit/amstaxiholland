import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  User, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  Car, 
  Euro,
  Calendar,
  Phone,
  Shield,
  Zap,
  Users,
  Luggage,
  Calculator,
  Star,
  Play,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface StepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
  isActive: boolean;
  isCompleted: boolean;
  onActivate: () => void;
  color: string;
  gradient: string;
}

const InteractiveStep: React.FC<StepProps> = ({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  details, 
  isActive, 
  isCompleted, 
  onActivate, 
  color, 
  gradient 
}) => {
  return (
    <div 
      className={`group relative cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
      onClick={onActivate}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 transition-all duration-500 blur-xl ${
        isActive ? 'opacity-30' : 'group-hover:opacity-20'
      }`}></div>
      
      {/* Main Card */}
      <div className={`relative glass-effect rounded-3xl p-8 shadow-lg transition-all duration-500 overflow-hidden ${
        isActive ? 'shadow-2xl border-2 border-white/50' : 'hover:shadow-xl'
      }`}>
        
        {/* Background Pattern */}
        <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 transition-all duration-500 ${
          isActive ? 'opacity-10 scale-110' : ''
        }`}>
          <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full blur-3xl`}></div>
        </div>

        {/* Step Number & Status */}
        <div className="relative flex items-start justify-between mb-6">
          <div className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
            isCompleted 
              ? 'bg-gradient-to-br from-green-500 to-emerald-500 scale-110' 
              : isActive
                ? `bg-gradient-to-br ${gradient} scale-110`
                : 'bg-gradient-to-br from-gray-300 to-gray-400'
          }`}>
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-white animate-bounce" />
            ) : (
              <span className="text-white font-black text-lg">{step}</span>
            )}
          </div>
          
          <div className={`p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm transition-all duration-300 ${
            isActive ? 'shadow-md scale-110' : 'group-hover:shadow-md group-hover:scale-105'
          }`}>
            <Icon className={`w-6 h-6 ${color} transition-transform duration-300 ${
              isActive ? 'scale-110' : 'group-hover:scale-110'
            }`} />
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-4">
          <div>
            <h3 className={`text-xl font-bold mb-2 leading-tight transition-all duration-300 ${
              isActive ? 'text-gradient-primary' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Expandable Details */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-4 space-y-3 border-t border-gray-200/50">
              {details.map((detail, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      isCompleted ? 'bg-green-500' : `bg-gradient-to-r ${gradient.split(' ')[0]} ${gradient.split(' ')[2]}`
                    }`}></div>
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Indicator */}
          <div className={`transition-all duration-300 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 pt-2">
              <ChevronDown className="w-4 h-4 animate-bounce" />
              <span>Meer details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  color: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, icon: Icon, isOpen, onToggle, color }) => {
  return (
    <div className="glass-effect rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-gradient-primary transition-all duration-300">
            {question}
          </h4>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </button>
      
      <div className={`transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 pb-6' : 'max-h-0'
      }`}>
        <div className="px-6">
          <div className="pl-16 pr-12">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumHowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-progress through steps
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const nextStep = (prev + 1) % 4;
        if (nextStep === 0) {
          setCompletedSteps([0, 1, 2, 3]);
        }
        return nextStep;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Uw Ritgegevens",
      description: "Vul eenvoudig uw ophaal- en bestemmingsadres in, plus gewenste datum en tijd.",
      icon: MapPin,
      details: [
        "Ophaaladres met huisnummer",
        "Bestemmingsadres volledig",
        "Datum en gewenste tijd",
        "Aantal passagiers",
        "Eventuele speciale wensen"
      ],
      color: "text-blue-600",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      title: "Kies Uw Service",
      description: "Selecteer de gewenste service en bekijk direct de vaste prijs voor uw rit.",
      icon: Car,
      details: [
        "Comfort: vanaf €35 (Toyota, VW)",
        "Premium: vanaf €55 (Mercedes, BMW)",
        "Executive: vanaf €89 (S-klasse)",
        "Vaste prijzen, geen verrassingen",
        "Direct beschikbaarheid zien"
      ],
      color: "text-green-600", 
      gradient: "from-green-400 to-emerald-500"
    },
    {
      title: "Uw Contactgegevens",
      description: "Vul uw contactgegevens in voor bevestiging en communicatie over uw rit.",
      icon: User,
      details: [
        "Naam en telefoonnummer",
        "E-mailadres voor bevestiging",
        "WhatsApp voor live updates",
        "Voorkeur voor communicatie",
        "Account aanmaken optioneel"
      ],
      color: "text-purple-600",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "Betaling & Bevestiging",
      description: "Kies uw betaalwijze en ontvang direct bevestiging van uw boeking.",
      icon: CreditCard,
      details: [
        "Online betalen (iDEAL, kaart)",
        "Contant betalen in de taxi",
        "Bedrijfsrekening mogelijk",
        "Direct bevestiging per e-mail",
        "SMS met chauffeur details"
      ],
      color: "text-orange-600",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  const faqs = [
    {
      question: "Vaste taxirit prijzen",
      answer: "Wij werken met transparante, vaste prijzen. U weet vooraf exact wat uw rit kost, zonder verrassingen. Prijzen zijn gebaseerd op afstand en voertuigklasse.",
      icon: Euro,
      color: "text-green-600"
    },
    {
      question: "Een taxirit op de meter",
      answer: "Voor lokale ritten binnen de stad gebruiken wij de officiële taximeter. Dit is vaak voordeliger voor korte afstanden. U ziet de prijs tijdens de rit oplopen.",
      icon: Calculator,
      color: "text-blue-600"
    },
    {
      question: "Hoeveel bagage neemt een taxi mee",
      answer: "Onze standaard voertuigen hebben ruimte voor 3-4 koffers. Voor extra bagage of grote items kunt u een executive voertuig boeken. Vermeld dit bij uw boeking.",
      icon: Luggage,
      color: "text-purple-600"
    },
    {
      question: "Een taxi voor meer dan 4 personen",
      answer: "Voor groepen van 5-8 personen hebben wij speciale minivans en busjes beschikbaar. Deze kunt u vooraf reserveren tegen een vaste prijs.",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  return (
    <section className="section-spacing-lg relative overflow-hidden bg-gradient-mercedes-animated">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pattern-overlay opacity-10"></div>
      <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative">
        
        {/* Header */}
        <div className={`text-center mb-16 space-y-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-effect rounded-full">
            <Play className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-gradient-primary uppercase tracking-wide">
              Zo Werkt Het
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black leading-tight max-w-5xl mx-auto">
              <span className="text-gradient-hero">Heel makkelijk een</span>
              <br />
              <span className="text-gradient-primary">taxi bestellen in</span>
              <br />
              <span className="text-gradient-luxury">een paar stappen</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-600 font-medium max-w-4xl mx-auto leading-relaxed">
              Van boeking tot bestemming in <span className="text-gradient-primary font-bold">4 eenvoudige stappen</span>. 
              Geen gedoe, alleen premium service.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-4 pt-4">
            {steps.map((_, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                    i === activeStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-150 shadow-lg' 
                      : completedSteps.includes(i)
                        ? 'bg-green-500 scale-125'
                        : 'bg-gray-300'
                  }`}
                  onClick={() => handleStepClick(i)}
                />
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 transition-all duration-500 ${
                    completedSteps.includes(i) ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Steps */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {steps.map((step, i) => (
            <div key={i} style={{ animationDelay: `${i * 0.2}s` }}>
              <InteractiveStep
                step={i + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                details={step.details}
                isActive={activeStep === i}
                isCompleted={completedSteps.includes(i)}
                onActivate={() => handleStepClick(i)}
                color={step.color}
                gradient={step.gradient}
              />
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-black text-gradient-primary mb-4">
              Veelgestelde Vragen
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alles wat u moet weten over onze taxiservice en prijzen
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                icon={faq.icon}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                color={faq.color}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 space-y-8 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="glass-effect rounded-3xl p-10 shadow-luxury relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-green-600/5 animate-pulse"></div>
            
            <div className="relative space-y-6">
              <h4 className="text-3xl font-black text-gradient-hero">
                Klaar om te beginnen?
              </h4>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Boek nu uw taxi en ervaar zelf hoe eenvoudig het is. 
                <span className="text-gradient-primary font-semibold"> In minder dan 2 minuten geregeld.</span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="btn-gradient-primary px-8 py-4 text-lg font-bold flex items-center gap-3 group">
                  <Car className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Start Uw Boeking</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="btn-gradient-secondary px-8 py-4 text-lg font-bold flex items-center gap-3 group">
                  <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>+31 20 771 78 28</span>
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-gray-200/30">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">100% Veilig Boeken</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Direct Bevestiging</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">9.8/10 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default PremiumHowItWorks;