import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, Gift, CheckCircle, XCircle, Clock } from "lucide-react";
import { benefits, Benefit } from "../data/mockData";
import { BenefitCard } from "../components/BenefitCard";
import { BenefitModal } from "../components/BenefitModal";

export function Benefits() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Experiences" },
    { id: "events", label: "Events" },
    { id: "discounts", label: "Discounts" },
    { id: "experiences", label: "Animal Encounters" },
    { id: "conservation", label: "Conservation" },
    { id: "education", label: "Education" },
  ];

  const filteredBenefits = benefits.filter((benefit) => {
    const matchesSearch = benefit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      benefit.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || benefit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBenefitClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleRedeem = (benefitId: string) => {
    console.log("Redeemed:", benefitId);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">Members Benefits and Perks</h1>
        <p className="text-neutral-600">
          Discover and redeem exclusive benefits designed just for you
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Gift size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">{benefits.length}</div>
          </div>
          <div className="text-sm text-neutral-600">Total Benefits</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">
              {benefits.filter((b) => !b.used).length}
            </div>
          </div>
          <div className="text-sm text-neutral-600">Available</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <XCircle size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">
              {benefits.filter((b) => b.used).length}
            </div>
          </div>
          <div className="text-sm text-neutral-600">Used</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">
              {benefits.filter((b) => b.expiresAt).length}
            </div>
          </div>
          <div className="text-sm text-neutral-600">Expiring Soon</div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Search benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? "bg-indigo-600 text-white"
                : "bg-white text-neutral-700 border border-neutral-300 hover:border-neutral-400"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Personalized Recommendations */}
      {selectedCategory === "all" && searchQuery === "" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
        >
          <h3 className="font-semibold text-neutral-900 mb-2">✨ Personalized for you</h3>
          <p className="text-sm text-neutral-700">
            Based on your activity, we recommend checking out wellness benefits and upcoming events.
          </p>
        </motion.div>
      )}

      {/* Benefits Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900">
            {filteredBenefits.length} {selectedCategory === "all" ? "Benefits" : categories.find(c => c.id === selectedCategory)?.label}
          </h2>
        </div>

        {filteredBenefits.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-neutral-400 mb-2">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-1">No benefits found</h3>
            <p className="text-neutral-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                onClick={() => handleBenefitClick(benefit)}
              />
            ))}
          </div>
        )}
      </div>

      <BenefitModal
        benefit={selectedBenefit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRedeem={handleRedeem}
      />
    </div>
  );
}