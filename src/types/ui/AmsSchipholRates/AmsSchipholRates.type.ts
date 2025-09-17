export type AmsSchipholRatesItem = {
  name: string;
  price: {
    sedan: number;
    van: number;
  };
  color: string;
  badge: string | null;
  travelTime: string;
  availability: string;
};
