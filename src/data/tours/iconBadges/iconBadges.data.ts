// app/data/tours/iconBadges/iconBadges.data.ts
import { Star, Clock, Users, Award } from "lucide-react";
import { IconTextBadgeProps } from "@/types/ui/IconTextBadge/IconTextBadge.type";

export const homeBadges: IconTextBadgeProps[] = [
  { icon: Star, text: "9.3/10 klantbeoordeling" },
  { icon: Clock, text: "24/7 beschikbaar" },
  { icon: Users, text: "1000+ tevreden klanten" },
  { icon: Award, text: "Erkend door gemeente" },
];