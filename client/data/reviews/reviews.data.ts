// client/data/reviews/reviews.data.ts
import type { Review } from "@/types/reviews/reviews.type";

export const reviews: Review[] = [
  {
    id: 1,
    slug: "jan-van-der-berg",
    name: "Jan van der Berg",
    company: "TechStart BV",
    rating: 5,
  },
  {
    id: 2,
    slug: "maria-jansen",
    name: "Maria Jansen",
    company: "E-Shop NL",
    rating: 5,
  },
  {
    id: 3,
    slug: "peter-de-wit",
    name: "Peter de Wit",
    company: "MedSupply",
    rating: 5,
  },
  {
    id: 4,
    slug: "laura-vermeer",
    name: "Laura Vermeer",
    company: "Events & Co.",
    rating: 5,
  },
];