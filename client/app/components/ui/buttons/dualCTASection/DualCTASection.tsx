'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, UserPlus } from 'lucide-react';

export default function DualCTASection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#F8F9FA] via-[#ECEFF1] to-[#E8EAED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* CTA 1 - Direct Bestellen */}
          <div className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-gray-200/50 hover:bg-white hover:border-[#2C3135]/30 hover:shadow-xl transition-all duration-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2C3135]/10 flex items-center justify-center mb-6 group-hover:bg-[#2C3135]/20 transition-colors duration-300">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-[#2C3135]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1D1F] mb-4">
                Direct taxi bestellen
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#4A5568] mb-8 max-w-md">
                Reserveer nu uw premium taxi voor zakelijk of privé vervoer
              </p>

              {/* CTA Button */}
              <a
                href="#"
                className="group/btn w-full sm:w-auto bg-[#2C3135] hover:bg-[#1A1D1F] text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Ga naar reservering
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* CTA 2 - Chauffeur Worden */}
          <div className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-gray-200/50 hover:bg-white hover:border-[#2C3135]/30 hover:shadow-xl transition-all duration-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '100ms' }}>
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2C3135]/10 flex items-center justify-center mb-6 group-hover:bg-[#2C3135]/20 transition-colors duration-300">
                <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-[#2C3135]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1D1F] mb-4">
                Chauffeur worden
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#4A5568] mb-8 max-w-md">
                Word onderdeel van ons professionele chauffeursteam
              </p>

              {/* CTA Button */}
              <a
                href="#"
                className="group/btn w-full sm:w-auto bg-[#2C3135] hover:bg-[#1A1D1F] text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Meld je aan als chauffeur
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}