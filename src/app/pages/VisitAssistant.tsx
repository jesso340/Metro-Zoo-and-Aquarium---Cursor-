import { Clock, MapPin, Sun, Users, Calendar, Info, Car, Coffee, Plus, Star, Lock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { familyAdventureItinerary } from "../data/familyAdventureItinerary";

export function VisitAssistant() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<number | null>(null);
  const [addedActivities, setAddedActivities] = useState<number[]>([]);
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? "morning" : currentHour < 17 ? "afternoon" : "evening";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        navigate("/notification", { state: { showFirstNotificationOnly: true } });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  const additionalActivities = [
    { 
      time: "10:00 AM", 
      title: "Sea Otter Feeding", 
      location: "Marine Habitat", 
      membersOnly: false,
      detail: "Watch playful sea otters enjoy their morning meal while learning from our marine biologists."
    },
    { 
      time: "11:30 AM", 
      title: "Elephant Keeper Talk", 
      location: "African Savanna", 
      membersOnly: false,
      detail: "Join lead keepers for a deep dive into the daily care of our African elephant herd."
    },
    { 
      time: "1:00 PM", 
      title: "Penguin Plunge", 
      location: "Antarctic Zone", 
      membersOnly: false,
      detail: "A high-energy demonstration of penguin diving and swimming. Perfect for action photos!"
    },
    { 
      time: "2:30 PM", 
      title: "Red Panda Encounter", 
      location: "Asian Forest", 
      membersOnly: true,
      detail: "Exclusive member access to the red panda overlook during their active afternoon period."
    },
    { 
      time: "4:00 PM", 
      title: "Big Cat Feeding", 
      location: "Tiger Territory", 
      membersOnly: false,
      detail: "Witness the raw power of our Siberian tigers during their main feeding session."
    },
    { 
      time: "3:00 PM", 
      title: "Behind-the-Scenes: Vet Care", 
      location: "Animal Hospital", 
      membersOnly: true,
      detail: "A rare look at our state-of-the-art medical facility. Exclusive member-only tour."
    },
    { 
      time: "12:00 PM", 
      title: "Private Giraffe Feeding", 
      location: "Savanna Overlook", 
      membersOnly: true,
      detail: "Skip the lines and enjoy a private feeding session with our friendly giraffe family."
    },
  ];

  const suggestedItineraries = [
    {
      duration: "2 Hours",
      title: "Plan Your Day",
      stops: [
        { name: "Entrance Plaza", detail: "Pick up your map and check for schedule changes." },
        { name: "Penguin Habitat", detail: "Catch the 9:30 AM swim. Best viewing is from the lower level." },
        { name: "African Savanna", detail: "Use your member pass for priority feeding access." },
        { name: "Big Cats", detail: "Visit the lion overlook to see the cubs playing." },
        { name: "Exit via Gift Shop", detail: "Don't forget your 15% member discount on souvenirs." }
      ],
      icon: Clock,
      color: "blue"
    },
    {
      duration: familyAdventureItinerary.duration,
      title: familyAdventureItinerary.title,
      stops: familyAdventureItinerary.stops.map((s) => ({ name: s.name, time: s.time, detail: s.detail })),
      icon: Users,
      color: "green",
      hideIcon: true,
    },
    {
      duration: "Full Day",
      title: "Complete Experience",
      stops: [
        { name: "Early Bird Special", detail: "9:00 AM: Exclusive member access to the Bird House." },
        { name: "All Major Exhibits", detail: "Follow the main loop including the Arctic Tundra." },
        { name: "Behind-the-Scenes Tour", detail: "1:00 PM: Private tour of the Animal Hospital." },
        { name: "Conservation Workshop", detail: "3:00 PM: Hands-on activity at the Education Center." },
        { name: "Sunset Safari", detail: "5:00 PM: Final tram tour as the animals settle for the night." }
      ],
      icon: Sun,
      color: "orange"
    }
  ];

  const facilitiesInfo = [
    { icon: Car, label: "Parking", info: "Free for members", status: "Available" },
    { icon: Coffee, label: "Dining", info: "5 locations open", status: "Open" },
    { icon: MapPin, label: "Restrooms", info: "12 facilities", status: "Throughout park" },
    { icon: Info, label: "Guest Services", info: "Main entrance", status: "9 AM - 6 PM" },
  ];

  const handleAddActivity = (index: number) => {
    if (!addedActivities.includes(index)) {
      setAddedActivities([...addedActivities, index]);
    }
  };

  const handleRemoveActivity = (index: number) => {
    setAddedActivities(addedActivities.filter(i => i !== index));
  };

  const handleStartPlan = (index: number) => {
    setActivePlan(index);
    setAddedActivities([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If there's an active plan, show the detailed itinerary view
  if (activePlan !== null) {
    const currentItinerary = suggestedItineraries[activePlan];
    const Icon = currentItinerary.icon;
    const colorClasses = {
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      green: "bg-green-100 text-green-700 border-green-200",
      orange: "bg-orange-100 text-orange-700 border-orange-200"
    };

    return (
      <div className="space-y-6 pb-8">
        {/* Active Plan Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            {"hideIcon" in currentItinerary && currentItinerary.hideIcon ? null : (
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm`}>
                <Icon size={32} />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{currentItinerary.title}</h1>
              <p className="text-white/90 mt-1">{currentItinerary.duration} • {currentItinerary.stops.length + addedActivities.length} stops</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-4">
            <p className="text-sm text-white/90">
              🎯 Follow your personalized itinerary below. You can add more activities from the special events section!
            </p>
          </div>
          <button
            onClick={() => {
              setActivePlan(null);
              setSelectedPlan(null);
              setAddedActivities([]);
            }}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors backdrop-blur-sm"
          >
            Change Plan
          </button>
        </motion.div>

        {/* Itinerary Steps */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Your Itinerary</h2>
          <div className="space-y-4">
            {currentItinerary.stops.map((stop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg border-l-4 border-green-500"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900">{typeof stop === 'string' ? stop : stop.name}</h3>
                  {typeof stop !== 'string' && 'time' in stop && stop.time ? (
                    <p className="text-sm font-semibold text-green-800 mt-1.5">{stop.time}</p>
                  ) : null}
                  <p
                    className={`text-sm text-neutral-600 leading-snug ${
                      typeof stop !== 'string' && 'time' in stop && stop.time ? 'mt-2' : 'mt-1'
                    }`}
                  >
                    {typeof stop === 'string' ? 'Main itinerary stop' : stop.detail}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Included
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Added Activities */}
            {addedActivities.map((activityIndex) => {
              const activity = additionalActivities[activityIndex];
              return (
                <motion.div
                  key={`added-${activityIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Plus className="text-amber-700" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">
                      <h3 className="font-semibold text-neutral-900">{activity.title}</h3>
                      <p className="text-sm font-semibold text-neutral-900">
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-neutral-600 mt-1">
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveActivity(activityIndex)}
                    className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-[10px] font-medium transition-colors ml-2"
                  >
                    Remove
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Add More Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="text-green-700" size={24} />
            <h2 className="text-xl font-bold text-neutral-900">Add Members Only Activities</h2>
          </div>
          <p className="text-sm text-neutral-600 mb-4">
            Enhance your visit with these special events happening.
          </p>
          <div className="space-y-3">
            {additionalActivities.map((event, index) => {
              const isAdded = addedActivities.includes(index);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg transition-all ${
                    isAdded 
                      ? "bg-green-50 border-2 border-green-200" 
                      : "bg-neutral-50 border border-neutral-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-neutral-900 text-sm mb-0.5">{event.title}</h4>
                        <p className="text-sm font-bold text-neutral-900 mb-2">
                          {event.time}
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {event.detail}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => isAdded ? handleRemoveActivity(index) : handleAddActivity(index)}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                        isAdded
                          ? "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                          : "bg-green-700 text-white hover:bg-green-800"
                      }`}
                    >
                      {isAdded ? "Added ✓" : "Add to Plan"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips for Active Plan */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">💡 Tips for Your Visit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">⏰ Stay on Schedule</h3>
              <p className="text-sm text-neutral-700">
                Allow 15-20 minutes between stops for walking. Some exhibits may have wait times during peak hours.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">📱 Mobile App</h3>
              <p className="text-sm text-neutral-700">
                Download our app for real-time navigation, animal feeding alerts, and exclusive member content.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="relative h-48 rounded-2xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1711702321421-7e65e5333805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b28lMjBlbnRyYW5jZSUyMGdhdGUlMjB2aXNpdG9yc3xlbnwxfHx8fDE3NzQ0NjA0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Zoo entrance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Plan Your Visit</h1>
          <p className="text-white/90">Make the most of your zoo experience</p>
        </div>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="text-green-700" size={20} />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Today's Hours</p>
              <p className="font-semibold text-neutral-900">9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <p className="text-sm text-green-700 font-medium">Open Now</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Sun className="text-blue-700" size={20} />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Weather</p>
              <p className="font-semibold text-neutral-900">72°F, Sunny</p>
            </div>
          </div>
          <p className="text-sm text-blue-700 font-medium">Perfect for visiting</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="text-orange-700" size={20} />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Crowd Level</p>
              <p className="font-semibold text-neutral-900">Moderate</p>
            </div>
          </div>
          <p className="text-sm text-orange-700 font-medium">Typical for {timeOfDay}</p>
        </div>
      </div>

      {/* Suggested Itineraries */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Suggested Itineraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedItineraries.map((itinerary, index) => {
            const Icon = itinerary.icon;
            const isSelected = selectedPlan === index;
            const colorClasses = {
              blue: "bg-blue-100 text-blue-700 border-blue-200",
              green: "bg-green-100 text-green-700 border-green-200",
              orange: "bg-orange-100 text-orange-700 border-orange-200"
            };
            return (
              <motion.div
                key={index}
                layout
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${
                  isSelected 
                    ? "border-green-500 ring-2 ring-green-500 ring-opacity-50 shadow-lg" 
                    : "border-neutral-200 hover:shadow-md"
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-800">Plan Selected!</p>
                      <p className="text-xs text-green-700">Ready to start your adventure</p>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  {"hideIcon" in itinerary && itinerary.hideIcon ? null : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[itinerary.color as keyof typeof colorClasses]}`}>
                      <Icon size={24} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-neutral-600">{itinerary.duration}</p>
                    <h3 className="font-semibold text-neutral-900">{itinerary.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {itinerary.stops.map((stop, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 ${
                        isSelected ? "bg-green-100 text-green-700" : "bg-neutral-200"
                      }`}>
                        {i + 1}
                      </span>
                      {typeof stop === 'string' ? stop : stop.name}
                    </li>
                  ))}
                </ul>
                
                {isSelected ? (
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleStartPlan(index)}
                      className="w-full py-2.5 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Start This Plan
                    </button>
                    <button 
                      onClick={() => setSelectedPlan(null)}
                      className="w-full py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                      Choose Different Plan
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSelectedPlan(index)}
                    className="w-full py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
                  >
                    Use This Plan
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Facilities & Services */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Facilities & Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilitiesInfo.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div key={index} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="text-green-700" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">{facility.label}</p>
                  <p className="text-sm text-neutral-600">{facility.info}</p>
                  <p className="text-xs text-green-700 font-medium mt-1">{facility.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips & Recommendations */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Insider Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-neutral-900 mb-2">🌅 Best Time to Visit</h3>
            <p className="text-sm text-neutral-700">
              Animals are most active in the morning (9-11 AM) and late afternoon (3-5 PM). Arrive early to avoid crowds!
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-neutral-900 mb-2">📸 Photo Opportunities</h3>
            <p className="text-sm text-neutral-700">
              The best lighting for photos is during golden hour. Don't miss the underwater viewing at the sea otter habitat!
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-neutral-900 mb-2">🎒 What to Bring</h3>
            <p className="text-sm text-neutral-700">
              Comfortable shoes, sunscreen, refillable water bottle (free refill stations available), and binoculars for bird watching.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-neutral-900 mb-2">🍴 Member Dining Perks</h3>
            <p className="text-sm text-neutral-700">
              Show your Gold membership for 15% off at all dining locations. The Rainforest Cafe has the best views!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}