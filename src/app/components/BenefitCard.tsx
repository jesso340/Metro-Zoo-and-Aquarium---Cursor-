import { motion } from "motion/react";
import { Clock, CheckCircle } from "lucide-react";
import { Benefit } from "../data/mockData";

interface BenefitCardProps {
  benefit: Benefit;
  onClick: () => void;
}

export function BenefitCard({ benefit, onClick }: BenefitCardProps) {
  const categoryColors = {
    events: "bg-purple-100 text-purple-700",
    discounts: "bg-green-100 text-green-700",
    experiences: "bg-blue-100 text-blue-700",
    wellness: "bg-pink-100 text-pink-700",
    learning: "bg-orange-100 text-orange-700",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="h-48 bg-neutral-200 relative overflow-hidden">
        <img 
          src={benefit.image} 
          alt={benefit.title}
          className="w-full h-full object-cover"
        />
        {benefit.used && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium">
            <CheckCircle size={14} />
            Used
          </div>
        )}
        {benefit.expiresAt && !benefit.used && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium">
            <Clock size={14} />
            Expires Soon
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              categoryColors[benefit.category]
            }`}
          >
            {benefit.category.charAt(0).toUpperCase() + benefit.category.slice(1)}
          </span>
          <span className="text-sm font-semibold text-indigo-600">{benefit.value}</span>
        </div>
        <h3 className="font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{benefit.description}</p>
        <button
          className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
            benefit.used
              ? "bg-neutral-100 text-neutral-600 cursor-default"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!benefit.used) {
              onClick();
            }
          }}
        >
          {benefit.ctaText}
        </button>
      </div>
    </motion.div>
  );
}