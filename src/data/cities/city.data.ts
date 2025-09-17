import type { City } from "@/types/cities/city.type";

export const cities: readonly City[] = [
  {
    slug: "rotterdam",
    name: "Rotterdam",
    phone: "0101234567",
    hero: {
      title: "Taxi Rotterdam – snel, comfortabel en voordelig",
      intro: "Boek je taxi in Rotterdam met vaste tarieven en 24/7 service.",
      image: { src: "/cities/rotterdam/hero.jpg", alt: "Taxi Rotterdam" },
    },
  },
   {
    slug: "eindhoven",
    name: "Eindhoven",
    phone: "0101234567",
    hero: {
      title: "Taxi Einhoven – snel, comfortabel en voordelig",
      intro: "Boek je taxi in Eindhoven met vaste tarieven en 24/7 service.",
      image: { src: "/cities/eindhoven/hero.jpg", alt: "Taxi Eindhoven" },
    },
  },
] as const;

export const getSlugs = () => cities.map((c) => c.slug);
export const getCity = (slug: string) => cities.find((c) => c.slug === slug) ?? null;
