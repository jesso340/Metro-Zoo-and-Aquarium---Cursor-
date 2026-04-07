import { motion } from "motion/react";
import { Calendar, MapPin, Users, Clock, AlertCircle, Video, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { babyPenguinChickUrl } from "../constants/media";

const eventData: Record<string, any> = {
  "family-conservation-day": {
    id: "family-conservation-day",
    title: "Family Conservation Day",
    description: "Join us for a day of hands-on conservation activities! Plant trees, learn about wildlife protection, and help make a difference. Perfect for families with children of all ages.",
    date: "Saturday, April 5, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Conservation Garden, Metro Zoo",
    attendees: 245,
    image: "https://images.unsplash.com/photo-1758599667717-27c61bcdd14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zZXJ2YXRpb24lMjBlYXJ0aCUyMGRheSUyMHZvbHVudGVlcnMlMjBuYXR1cmV8ZW58MXx8fHwxNzc1MDYwNDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["In-Person", "Family Friendly", "Hands-On"],
    hasConflict: true,
    benefits: [
      "Learn conservation practices from experts",
      "Hands-on tree planting experience",
      "Kids receive a junior conservationist certificate",
      "Free lunch and refreshments included",
      "Meet other conservation-minded families"
    ],
    schedule: [
      { time: "10:00 AM", activity: "Welcome & Introduction to Conservation" },
      { time: "10:30 AM", activity: "Tree Planting Workshop" },
      { time: "12:00 PM", activity: "Lunch Break (Provided)" },
      { time: "1:00 PM", activity: "Wildlife Habitat Tour" },
      { time: "2:30 PM", activity: "Kids Conservation Activities" },
      { time: "3:30 PM", activity: "Certificate Ceremony & Closing" }
    ],
    livestreamAlternatives: [
      {
        id: "baby-penguin-hatching",
        title: "🐧 Baby Penguin Hatching LIVE",
        description: "Watch adorable penguin chicks hatch in real-time",
        time: "Today, 2:00 PM",
        points: 50,
        viewers: "1.2k",
        status: "live-soon",
        image: babyPenguinChickUrl
      },
      {
        id: "zookeeper-qna",
        title: "🦁 Zookeeper Q&A Live",
        description: "Ask questions and learn about animal care",
        time: "Tomorrow, 11:00 AM",
        points: 30,
        viewers: "850",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1773270775823-d300fbe0b216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b29rZWVwZXIlMjBmZWVkaW5nJTIwZGVtb25zdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzc1MDYwNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
  "baby-penguin-hatching": {
    id: "baby-penguin-hatching",
    title: "Baby Penguin Hatching",
    description: "Experience the magic of life as adorable penguin chicks break free from their eggs! Our live camera feed brings you up close to this incredible moment. Perfect for families and children.",
    date: "Today",
    time: "2:00 PM",
    location: "Antarctic Zone (Livestream)",
    attendees: 1200,
    image: babyPenguinChickUrl,
    tags: ["Livestream", "Family Friendly", "Interactive"],
    hasConflict: false,
    benefits: [
      "Witness a rare and magical moment",
      "Learn penguin facts from our experts",
      "Interactive Q&A with zookeepers",
      "Earn 50 points toward rewards",
      "Help support penguin conservation"
    ],
    isLivestream: true,
    points: 50
  }
};

export function EventDetail() {
  const { eventId } = useParams();
  const event = eventData[eventId || ""];

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Event Not Found</h1>
        <Link to="/" className="text-green-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-96 rounded-2xl overflow-hidden"
      >
        <img 
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-3">
            {event.tags.map((tag: string) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 bg-white/90 text-neutral-900 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
        </div>
      </motion.div>

      {/* CTA Button (for livestream events) */}
      {event.isLivestream && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            to={`/livestream/${event.id}`}
            className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            Join Livestream
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      )}

      {/* Event Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-sm text-neutral-500">Date & Time</div>
              <div className="font-medium text-neutral-900">{event.date}</div>
              <div className="text-sm text-neutral-600">{event.time}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="text-blue-600" size={20} />
            </div>
            <div>
              <div className="text-sm text-neutral-500">Location</div>
              <div className="font-medium text-neutral-900">{event.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="text-purple-600" size={20} />
            </div>
            <div>
              <div className="text-sm text-neutral-500">Attendance</div>
              <div className="font-medium text-neutral-900">{event.attendees.toLocaleString()} members {event.isLivestream ? 'watching' : 'registered'}</div>
            </div>
          </div>
          {event.points && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Sparkles className="text-amber-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-neutral-500">Reward</div>
                <div className="font-medium text-neutral-900">+{event.points} Points</div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h3 className="font-semibold text-neutral-900 mb-3">About This {event.isLivestream ? 'Livestream' : 'Event'}</h3>
          <p className="text-neutral-600 leading-relaxed">{event.description}</p>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"
      >
        <h3 className="font-semibold text-neutral-900 mb-4">Why Attend?</h3>
        <div className="space-y-3">
          {event.benefits.map((benefit: string, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
              </div>
              <p className="text-neutral-700">{benefit}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Schedule (for in-person events) */}
      {event.schedule && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"
        >
          <h3 className="font-semibold text-neutral-900 mb-4">Event Schedule</h3>
          <div className="space-y-4">
            {event.schedule.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="text-sm font-medium text-green-600 min-w-[100px]">{item.time}</div>
                <div className="text-neutral-700">{item.activity}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA Button (for in-person events) */}
      {!event.isLivestream && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors">
            Attend In Person
          </button>
          <button className="flex-1 bg-white border-2 border-neutral-300 text-neutral-700 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-colors">
            Save for Later
          </button>
        </motion.div>
      )}

      {/* Smart Pivot to Livestream */}
      {event.hasConflict && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200"
        >
          <div className="text-center mb-6">
            <Video className="text-blue-600 mx-auto mb-3" size={32} />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2 text-left">Can't make it? Join an event from home</h3>
            <p className="text-neutral-600 text-left">Watch engaging livestreams and still earn points toward your rewards!</p>
          </div>
            
          <div className="grid md:grid-cols-2 gap-4">
            {event.livestreamAlternatives.map((stream: any) => (
              <Link key={stream.id} to={`/livestream/${stream.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl overflow-hidden border border-neutral-200 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="relative h-40">
                    <img 
                      src={stream.image}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                    />
                    {stream.status === "live-soon" && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        LIVE SOON
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      +{stream.points} Points
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">{stream.title}</h4>
                    <p className="text-sm text-neutral-600 mb-3">{stream.description}</p>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{stream.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{stream.viewers} watching</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}