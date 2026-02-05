import React from "react";
import { Check, X } from "lucide-react";

type Locale = "nl" | "en";

type LocalizedString = {
  [key in Locale]?: string;
};

type ComparisonSide = {
  title?: LocalizedString;
  points?: LocalizedString;
};

type Comparison = {
  title?: LocalizedString;
  left?: ComparisonSide;
  right?: ComparisonSide;
};

interface TourComparisonProps {
  comparison: Comparison;
  locale: Locale;
}

const TourComparison: React.FC<TourComparisonProps> = ({ comparison, locale }) => {
  if (!comparison) return null;

  // Parse points from string array
  const leftPoints = comparison.left?.points?.[locale] 
    ? (Array.isArray(comparison.left.points[locale]) 
        ? comparison.left.points[locale] 
        : [])
    : [];
    
  const rightPoints = comparison.right?.points?.[locale]
    ? (Array.isArray(comparison.right.points[locale])
        ? comparison.right.points[locale]
        : [])
    : [];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Title */}
        {comparison.title?.[locale] && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {comparison.title[locale]}
          </h2>
        )}

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Met onze taxi */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-500 transition-all">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {comparison.left?.title?.[locale] || "Met onze taxi"}
            </h3>
            <ul className="space-y-4">
              {leftPoints.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: OV / eigen auto */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {comparison.right?.title?.[locale] || "OV / eigen auto"}
            </h3>
            <ul className="space-y-4">
              {rightPoints.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-600 text-xs">•</span>
                  </div>
                  <span className="text-gray-600 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourComparison;