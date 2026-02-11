// client/app/config/vechicleType/vehicleClasses.ts

export const vehicleClasses = {
  "ladies-taxi": {
    slug: "ladies-taxi",
    label: "Ladies Taxi",
    theme: {
      primary: "#EC4899",
      background: "#FFF1F7",
    },
    hero: {
      title: "Ladies Taxi",
      subtitle: "Veilig en comfortabel vervoer voor vrouwen",
      bullets: ["Vrouwelijke chauffeurs", "24/7 beschikbaar", "Discreet en betrouwbaar"],
      image: "/img/ladies/hero.jpg",
    },
    facilities: {
      included: ["Water", "Airco", "Comfortstoelen"],
      exclusive: ["Vrouwelijke chauffeur"],
    },
    useCases: ["Alleen reizen", "Avondritten", "Luchthavenvervoer"],
    pricing: {
      base: 45,
      airport: 65,
      note: "Alle prijzen zijn inclusief btw en bagage.",
    },
    faq: [
      {
        question: "Zijn de chauffeurs altijd vrouw?",
        answer: "Ja, bij Ladies Taxi rijden uitsluitend vrouwelijke chauffeurs.",
      },
      {
        question: "Kan ik vooraf een rit plannen?",
        answer: "Ja, je kunt eenvoudig vooraf boeken via het boekingsformulier of contact opnemen.",
      },
      {
        question: "Is deze service ook ’s nachts beschikbaar?",
        answer: "Ja, Ladies Taxi is 24/7 beschikbaar, afhankelijk van beschikbaarheid in jouw regio.",
      },
    ],
  },

  "minivan-luxury": {
    slug: "minivan-luxury",
    label: "Business Class Taxi",
    theme: {
      primary: "#111827",
      background: "#F3F4F6",
    },
    hero: {
      title: "Business Class Taxi",
      subtitle: "Zakelijk vervoer met focus op efficiëntie",
      bullets: ["Stipt op tijd", "Rust & privacy", "Representatief vervoer"],
      image: "/img/business/hero.jpg",
    },
    facilities: {
      included: ["Water", "Airco", "Comfortstoelen", "Telefoonoplader"],
      exclusive: ["Extra beenruimte", "Stille rit (op verzoek)"],
    },
    useCases: ["Zakelijke afspraken", "Luchthavenvervoer", "Directie- en klantvervoer", "Hotel naar meeting"],
    pricing: {
      base: 55,
      airport: 75,
      note: "Prijzen zijn inclusief btw. Zakelijke factuur mogelijk op aanvraag.",
    },
    faq: [
      {
        question: "Kan ik een factuur krijgen voor zakelijke ritten?",
        answer: "Ja, facturatie is mogelijk. Geef dit aan tijdens of na het boeken.",
      },
      {
        question: "Is er wifi beschikbaar in de auto?",
        answer: "Wifi is niet standaard inbegrepen; afhankelijk van voertuig en beschikbaarheid kan dit mogelijk zijn.",
      },
      {
        question: "Kunnen jullie meerdere stops plannen?",
        answer: "Ja, je kunt extra stops doorgeven bij je boeking. Dit kan invloed hebben op de prijs.",
      },
    ],
  },

  "vip-class": {
    slug: "vip-class",
    label: "VIP Class",
    theme: {
      primary: "#B45309",
      background: "#FFFBEB",
    },
    hero: {
      title: "VIP Class",
      subtitle: "Exclusief vervoer met maximale discretie en comfort",
      bullets: ["Premium voertuigen", "Discreet & professioneel", "Extra service aan boord"],
      image: "/img/vip/hero.jpg",
    },
    facilities: {
      included: ["Water", "Airco", "Luxe stoelen", "Telefoonoplader"],
      exclusive: ["Wifi aan boord", "Meet & Greet (optioneel)", "Privacy glass (waar beschikbaar)"],
    },
    useCases: ["Speciale gelegenheden", "VIP transfers", "Events & gala’s", "Luchthaven meet & greet"],
    pricing: {
      base: 75,
      airport: 110,
      note: "VIP opties kunnen per voertuig verschillen. Vraag naar beschikbaarheid bij het boeken.",
    },
    faq: [
      {
        question: "Wat maakt VIP Class anders dan Business Class?",
        answer: "VIP Class focust op maximale luxe, extra services en een hogere mate van discretie.",
      },
      {
        question: "Kan ik Meet & Greet toevoegen?",
        answer: "Ja, Meet & Greet is optioneel (waar beschikbaar). Geef dit door bij je boeking.",
      },
      {
        question: "Is VIP Class geschikt voor events?",
        answer: "Ja, VIP Class wordt vaak geboekt voor gala’s, bruiloften en zakelijke events.",
      },
    ],
  },

  "business-class": {
    slug: "business-class",
    label: "Business class",
    theme: {
      primary: "#2563EB",
      background: "#EFF6FF",
    },
    hero: {
      title: "Business Class naar uw bestemming",
      subtitle: "Betaalbaar, snel en betrouwbaar vervoer",
      bullets: ["Scherpe tarieven", "Snelle beschikbaarheid", "Betrouwbare service"],
      image: "/img/economy/hero.jpg",
    },
    facilities: {
      included: ["Water", "Airco"],
      exclusive: [],
    },
    useCases: ["Dagelijkse ritten", "Korte afstanden", "Station- en stadsritten", "Budget luchthavenvervoer"],
    pricing: {
      base: 35,
      airport: 55,
      note: "Alle prijzen zijn inclusief btw. Afhankelijk van afstand en tijdstip kan een toeslag gelden.",
    },
    faq: [
      {
        question: "Is Economy altijd het goedkoopst?",
        answer: "Economy is bedoeld als budgetvriendelijke optie. De uiteindelijke prijs hangt af van afstand en tijdstip.",
      },
      {
        question: "Kan ik ook luchthavenvervoer boeken met Economy?",
        answer: "Ja, Economy is ook beschikbaar voor luchthavenritten (waar beschikbaar).",
      },
      {
        question: "Hoe snel kan ik een rit krijgen?",
        answer: "Dat hangt af van beschikbaarheid. Bij drukte adviseren we vooraf te reserveren.",
      },
    ],
  },
} as const;

export type VehicleClassesSlug = keyof typeof vehicleClasses;
export type VehicleClassesData = (typeof vehicleClasses)[VehicleClassesSlug];
