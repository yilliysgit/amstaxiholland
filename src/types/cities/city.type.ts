import type { StaticImageData } from "next/image";

export type CityHeroImage = {
  src: string | StaticImageData;
  alt?: string;
};

export type CityHero = {
  title: string;
  intro?: string;
  image?: CityHeroImage;
};

export type City = {
  slug: string;
  name: string;
  phone?: string;
  hero: CityHero;
  image?: CityHeroImage;
};
