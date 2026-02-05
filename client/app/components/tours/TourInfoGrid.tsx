import React from "react";
import { MapPin, Car, Flag, TrendingUp, Clock, Home } from "lucide-react";

type Locale = "nl" | "en";

type LocalizedString = {
  [key in Locale]?: string;
};

type SectionItem = {
  title: LocalizedString;
  description: LocalizedString;
  icon?: string;
};

type Section = {
  title: LocalizedString;
  items?: SectionItem[];
};

type Tour = {
  rideTypesSection?: Section;
  howItWorksSection?: Section;  // ← NIEUW
  routeInfo?: {
    distance?: LocalizedString;
    duration?: LocalizedString;
  };
};

interface TourInfoGridProps {
  tour: Tour;
  locale: Locale;
}

// Icon mapping
const getIcon = (iconName?: string) => {
  switch (iconName) {
    case "distance":
      return <TrendingUp className="w-6 h-6" />;
    case "time":
      return <Clock className="w-6 h-6" />;
    case "home":
      return <Home className="w-6 h-6" />;
    case "pickup":
      return <MapPin className="w-6 h-6" />;
    case "driving":
      return <Car className="w-6 h-6" />;
    case "arrival":
      return <Flag className="w-6 h-6" />;
    default:
      return <MapPin className="w-6 h-6" />;
  }
};

const getIconColor = (index: number) => {
  const colors = ["green", "blue", "purple"];
  return colors[index % colors.length] as "green" | "blue" | "purple";
};

// Helper component for icon wrapper
const IconWrapper: React.FC<{
  color: "green" | "blue" | "purple";
  children: React.ReactNode;
}> = ({ color, children }) => {
  const colorClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div
      className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}
    >
      {children}
    </div>
  );
};

const TourInfoGrid: React.FC<TourInfoGridProps> = ({ tour, locale }) => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Ride Types */}
          {tour.rideTypesSection && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {tour.rideTypesSection.title?.[locale]}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.rideTypesSection.items?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all"
                  >
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {item.title?.[locale]}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description?.[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right: How it Works */}
          {tour.howItWorksSection && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {tour.howItWorksSection.title?.[locale]}
              </h2>

              <div className="space-y-4">
                {tour.howItWorksSection.items?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <IconWrapper color={getIconColor(i)}>
                        {getIcon(item.icon)}
                      </IconWrapper>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title?.[locale]}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.description?.[locale]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default TourInfoGrid;