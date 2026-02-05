// app/data/iconBadges/iconBadges.data.ts
import { Star, Clock, Users, Award, Shield, Heart, ThumbsUp, CheckCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface HomeBadge {
  icon: LucideIcon;
  key: string;
}

export const homeBadges: HomeBadge[] = [
  { icon: Star, key: "rating" },
  { icon: Clock, key: "available" },
  { icon: Users, key: "customers" },
  { icon: Award, key: "certified" },
  { icon: Shield, key: "insured" },
  { icon: Heart, key: "trusted" },
  { icon: ThumbsUp, key: "premium" },
  { icon: CheckCircle, key: "recommended" },
];