import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Navigation, Search, X, Info, Utensils, Coffee, Home, Users, Camera, Clock, Sparkles } from "lucide-react";

type ExhibitType = "mammals" | "birds" | "reptiles" | "aquatic" | "amenity";

interface Exhibit {
  id: string;
  name: string;
  type: ExhibitType;
  position: { x: number; y: number };
  description: string;
  hours?: string;
  featured?: boolean;
}

export function InteractiveMap() {
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [filterType, setFilterType] = useState<ExhibitType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const exhibits: Exhibit[] = [
    // Mammals
    { id: "1", name: "African Savanna", type: "mammals", position: { x: 25, y: 30 }, description: "Giraffes, zebras, and elephants roam in our largest habitat", hours: "9:00 AM - 5:30 PM", featured: true },
    { id: "2", name: "Big Cat Territory", type: "mammals", position: { x: 65, y: 25 }, description: "Lions, tigers, and leopards", hours: "9:00 AM - 5:30 PM", featured: true },
    { id: "3", name: "Red Panda Forest", type: "mammals", position: { x: 45, y: 55 }, description: "Watch playful red pandas climb and explore", hours: "9:00 AM - 5:30 PM" },
    { id: "4", name: "Primate Paradise", type: "mammals", position: { x: 75, y: 60 }, description: "Gorillas, chimpanzees, and orangutans", hours: "9:00 AM - 5:30 PM" },
    
    // Birds
    { id: "5", name: "Tropical Aviary", type: "birds", position: { x: 35, y: 70 }, description: "Walk among colorful tropical birds", hours: "9:00 AM - 5:30 PM" },
    { id: "6", name: "Penguin Habitat", type: "birds", position: { x: 55, y: 35 }, description: "Antarctic penguins in climate-controlled habitat", hours: "9:00 AM - 5:30 PM", featured: true },
    
    // Aquatic
    { id: "7", name: "Sea Otter Cove", type: "aquatic", position: { x: 20, y: 60 }, description: "Playful sea otters with underwater viewing", hours: "9:00 AM - 5:30 PM", featured: true },
    { id: "8", name: "Aquarium", type: "aquatic", position: { x: 80, y: 40 }, description: "Sharks, rays, and tropical fish", hours: "9:00 AM - 5:30 PM" },
    
    // Reptiles
    { id: "9", name: "Reptile House", type: "reptiles", position: { x: 50, y: 20 }, description: "Snakes, lizards, and crocodiles", hours: "9:00 AM - 5:30 PM" },
    
    // Amenities
    { id: "10", name: "Main Entrance", type: "amenity", position: { x: 50, y: 85 }, description: "Guest services, membership desk, and gift shop" },
    { id: "11", name: "Rainforest Cafe", type: "amenity", position: { x: 30, y: 45 }, description: "Full-service dining with jungle views" },
    { id: "12", name: "Safari Snacks", type: "amenity", position: { x: 70, y: 50 }, description: "Quick bites and refreshments" },
    { id: "13", name: "Restrooms", type: "amenity", position: { x: 40, y: 40 }, description: "Public facilities" },
    { id: "14", name: "Restrooms", type: "amenity", position: { x: 60, y: 65 }, description: "Public facilities" },
  ];

  const filteredExhibits = exhibits.filter(exhibit => {
    const matchesFilter = filterType === "all" || exhibit.type === filterType;
    const matchesSearch = exhibit.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getExhibitColor = (type: ExhibitType) => {
    switch (type) {
      case "mammals": return "bg-amber-500 border-amber-600";
      case "birds": return "bg-blue-500 border-blue-600";
      case "reptiles": return "bg-green-500 border-green-600";
      case "aquatic": return "bg-cyan-500 border-cyan-600";
      case "amenity": return "bg-neutral-500 border-neutral-600";
      default: return "bg-neutral-500 border-neutral-600";
    }
  };

  const getTypeIcon = (type: ExhibitType) => {
    switch (type) {
      case "mammals": return "🦁";
      case "birds": return "🦜";
      case "reptiles": return "🦎";
      case "aquatic": return "🐠";
      case "amenity": return "📍";
      default: return "📍";
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <MapPin size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Interactive Zoo Map</h1>
            <p className="text-white/90 mt-1">Explore exhibits and find your way around</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search exhibits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === "all" 
                  ? "bg-green-700 text-white" 
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("mammals")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === "mammals" 
                  ? "bg-amber-500 text-white" 
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              🦁 Mammals
            </button>
            <button
              onClick={() => setFilterType("birds")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === "birds" 
                  ? "bg-blue-500 text-white" 
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              🦜 Birds
            </button>
            <button
              onClick={() => setFilterType("reptiles")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === "reptiles" 
                  ? "bg-green-500 text-white" 
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              🦎 Reptiles
            </button>
            <button
              onClick={() => setFilterType("aquatic")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === "aquatic" 
                  ? "bg-cyan-500 text-white" 
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              🐠 Aquatic
            </button>
            <button
              onClick={() => setFilterType("amenity")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === "amenity" 
                  ? "bg-neutral-600 text-white" 
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              📍 Amenities
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="relative w-full" style={{ paddingTop: "75%" }}>
          {/* Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1514351760-d23106652726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b28lMjBtYXAlMjBhZXJpYWwlMjB2aWV3JTIwbGF5b3V0fGVufDF8fHx8MTc3NTAxMjQyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
            }}
          >
            {/* Overlay for better marker visibility */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
            
            {/* Decorative paths */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
              {/* Walking paths */}
              <path d="M 50% 85% Q 30% 60%, 20% 30%" stroke="#16a34a" strokeWidth="10" fill="none" strokeDasharray="5,5" />
              <path d="M 50% 85% Q 70% 60%, 80% 40%" stroke="#16a34a" strokeWidth="10" fill="none" strokeDasharray="5,5" />
              <path d="M 30% 45% Q 50% 40%, 70% 50%" stroke="#16a34a" strokeWidth="10" fill="none" strokeDasharray="5,5" />
            </svg>

            {/* Exhibit Markers */}
            {filteredExhibits.map((exhibit) => (
              <motion.button
                key={exhibit.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedExhibit(exhibit)}
                className={`absolute w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg cursor-pointer transition-all ${getExhibitColor(exhibit.type)} ${
                  selectedExhibit?.id === exhibit.id ? "ring-4 ring-green-500 ring-opacity-50 scale-110" : ""
                } ${exhibit.featured ? "ring-2 ring-yellow-400" : ""}`}
                style={{
                  left: `${exhibit.position.x}%`,
                  top: `${exhibit.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className="text-xl">{getTypeIcon(exhibit.type)}</span>
                {exhibit.featured && (
                  <Sparkles className="absolute -top-1 -right-1 text-yellow-400" size={16} fill="currentColor" />
                )}
              </motion.button>
            ))}

            {/* Current Location Indicator */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"
              style={{
                left: "50%",
                top: "85%",
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
            </motion.div>
          </div>
        </div>

        {/* Legend */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow" />
              <span className="text-neutral-700">You are here</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={16} fill="currentColor" />
              <span className="text-neutral-700">Featured exhibits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-neutral-600">Tap any marker for details</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exhibit Details Panel */}
      <AnimatePresence>
        {selectedExhibit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl shadow-lg border-2 border-green-500 overflow-hidden"
          >
            <div className={`p-4 text-white ${getExhibitColor(selectedExhibit.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{getTypeIcon(selectedExhibit.type)}</div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedExhibit.name}</h3>
                    <p className="text-white/90 text-sm capitalize">{selectedExhibit.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExhibit(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <Info className="text-neutral-500 flex-shrink-0 mt-1" size={18} />
                  <p className="text-neutral-700">{selectedExhibit.description}</p>
                </div>
              </div>

              {selectedExhibit.hours && (
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock size={16} />
                  <span>Open: {selectedExhibit.hours}</span>
                </div>
              )}

              {selectedExhibit.featured && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                  <Sparkles className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">Featured Exhibit</p>
                    <p className="text-xs text-yellow-800">Don't miss this popular attraction!</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800 transition-colors flex items-center justify-center gap-2">
                  <Navigation size={18} />
                  Get Directions
                </button>
                <button className="flex-1 border-2 border-green-700 text-green-700 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                  <Camera size={18} />
                  View Photos
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setFilterType("amenity")}
            className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 hover:shadow-md transition-all text-left"
          >
            <Utensils className="text-orange-600 mb-2" size={24} />
            <p className="font-semibold text-neutral-900">Dining</p>
            <p className="text-xs text-neutral-600">Find food & drinks</p>
          </button>
          
          <button
            onClick={() => {
              const entrance = exhibits.find(e => e.name === "Main Entrance");
              if (entrance) setSelectedExhibit(entrance);
            }}
            className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 hover:shadow-md transition-all text-left"
          >
            <Home className="text-green-600 mb-2" size={24} />
            <p className="font-semibold text-neutral-900">Entrance</p>
            <p className="text-xs text-neutral-600">Guest services</p>
          </button>
          
          <button
            onClick={() => {
              const featured = exhibits.filter(e => e.featured);
              if (featured.length > 0) setSelectedExhibit(featured[0]);
            }}
            className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 hover:shadow-md transition-all text-left"
          >
            <Sparkles className="text-yellow-600 mb-2" size={24} />
            <p className="font-semibold text-neutral-900">Featured</p>
            <p className="text-xs text-neutral-600">Top attractions</p>
          </button>
          
          <button
            onClick={() => setFilterType("all")}
            className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 hover:shadow-md transition-all text-left"
          >
            <MapPin className="text-blue-600 mb-2" size={24} />
            <p className="font-semibold text-neutral-900">View All</p>
            <p className="text-xs text-neutral-600">Show everything</p>
          </button>
        </div>
      </div>

      {/* Member Tips */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Info size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">Member Tip</h3>
            <p className="text-sm text-neutral-700">
              Use the map to plan your route efficiently! Featured exhibits tend to get busier in the afternoon. Visit them early for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}