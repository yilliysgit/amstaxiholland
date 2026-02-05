// client/types/dualCTA/dualCTA.type.ts

export interface CTACard {
  id: number;
  slug: string;
  icon: 'calendar' | 'userPlus';
  linkKey: string;
}