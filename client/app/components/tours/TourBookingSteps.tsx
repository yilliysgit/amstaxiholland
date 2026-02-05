// components/booking/BookingSteps.tsx
import React from "react";

type Locale = "nl" | "en";

interface BookingStepsProps {
  locale: Locale;
}

const TourBookingSteps: React.FC<BookingStepsProps> = ({ locale }) => {
  const content = {
    nl: {
      title: "Zo werkt boeken",
      steps: [
        {
          label: "Stap 1",
          title: "1) Vul uw rit in",
          description: "Ophaaladres, datum en tijd.",
        },
        {
          label: "Stap 2",
          title: "2) Ontvang een vaste prijs",
          description: "U weet vooraf waar u aan toe bent.",
        },
        {
          label: "Stap 3",
          title: "3) Zorgeloos reizen",
          description: "Chauffeur staat op tijd klaar en zet u voor de deur af.",
        },
      ],
    },
    en: {
      title: "How booking works",
      steps: [
        {
          label: "Step 1",
          title: "1) Fill in your ride",
          description: "Pickup address, date and time.",
        },
        {
          label: "Step 2",
          title: "2) Receive a fixed price",
          description: "You know in advance what to expect.",
        },
        {
          label: "Step 3",
          title: "3) Travel worry-free",
          description: "Driver is ready on time and drops you at the door.",
        },
      ],
    },
  };

  const t = content[locale];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {t.steps.map((step, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-500 hover:shadow-lg transition-all"
            >
              <div className="text-sm text-gray-500 font-medium mb-3">
                {step.label}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourBookingSteps;