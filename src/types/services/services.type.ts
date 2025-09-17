// /types/services/services.type.ts

export type TaxiService = {
  // BASIS EIGENSCHAPPEN
  id: string;           
  title: string;        
  description: string;  
  
  // AFBEELDINGEN
  image: string;       
  thumb: string;        
  
  // PRICING & CTA
  price: string;        
  ctaText: string;     
  ctaLink: string;      
  
  // FEATURES & DETAILS
  features: string[];   
  duration?: string;   
  
  // CATEGORISATIE & MARKETING
  category: "airport" | "business" | "luxury" | "medical" | "events" | "tours";
  badge?: string;       
  icon: string;         
  
  // POPULARITEIT & STATS
  popularity?: number;  
};