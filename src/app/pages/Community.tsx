import { motion } from "motion/react";
import { Users, Calendar, MessageCircle, Heart, MapPin, Leaf, TrendingUp, Award, UserPlus, CheckCircle, Star, Clock, Play } from "lucide-react";
import { memberStories, virtualEvents, userPoints } from "../data/mockData";
import { useEffect } from "react";

export function Community() {
  const myRSVPs = [
    {
      id: "1",
      title: "Meet the Keepers: Big Cats",
      date: "June 24, 2026",
      time: "2:00 PM",
      location: "Lion & Tiger Habitat",
      attendees: 24,
      image: "https://images.unsplash.com/photo-1762783646219-82dde992af03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b28lMjBrZWVwZXIlMjBmZWVkaW5nJTIwYW5pbWFsc3xlbnwxfHx8fDE3NzQzNzk4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: "confirmed"
    },
    {
      id: "2",
      title: "Family Safari Night",
      date: "June 27, 2026",
      time: "6:30 PM",
      location: "African Savanna",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1766243062772-1baa72fdbe72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaGlsZHJlbiUyMHpvbyUyMHZpc2l0fGVufDF8fHx8MTc3NDM3OTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: "confirmed"
    },
  ];

  const moreEvents = [
    {
      id: "3",
      title: "Conservation Talk: Rainforest Protection",
      date: "July 2, 2026",
      time: "11:00 AM",
      location: "Education Center",
      attendees: 32,
      image: "https://images.unsplash.com/photo-1655981649164-d3c894cbc8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMGNvbnNlcnZhdGlvbiUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NzQzNzk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "4",
      title: "Behind the Scenes: Veterinary Care",
      date: "July 5, 2026",
      time: "3:00 PM",
      location: "Animal Hospital",
      attendees: 18,
      image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwYW5pbWFsJTIwY2FyZXxlbnwxfHx8fDE3NzQzNzk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const allUpcomingEvents = [...myRSVPs, ...moreEvents];

  const myEngagementStats = [
    { label: "Events Attended", value: "2", icon: Calendar, color: "green" },
    { label: "Forum Posts", value: "0", icon: MessageCircle, color: "emerald" },
    { label: "Members Following", value: "0", icon: Users, color: "teal" },
    { label: "Impact Points", value: "15", icon: Award, color: "amber" },
  ];

  const recentActivity = [
    {
      id: "1",
      user: "Sarah Johnson",
      action: "shared photos from",
      event: "Penguin Feeding Experience",
      time: "2 hours ago",
      avatar: "SJ"
    },
    {
      id: "2",
      user: "Michael Torres",
      action: "posted in",
      event: "Conservation Discussion Forum",
      time: "5 hours ago",
      avatar: "MT"
    },
    {
      id: "3",
      user: "Emily Watson",
      action: "RSVP'd to",
      event: "Meet the Keepers: Big Cats",
      time: "1 day ago",
      avatar: "EW"
    },
  ];

  useEffect(() => {
    // Smooth scroll to hash anchor if present
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section - Personal Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-700 via-green-600 to-green-600 rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Your Community Impact</h2>
          <p className="text-green-100">Making a difference together since June 10th, 2026</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {myEngagementStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <Icon size={24} className="mb-2 text-white/80" />
                <div className="text-2xl font-semibold mb-1">{stat.value}</div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Your Upcoming RSVPs */}
      <section id="upcoming-events" style={{ scrollMarginTop: '100px' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Upcoming Events</h2>
          <span className="text-sm text-neutral-600">{allUpcomingEvents.length} events</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allUpcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-green-200 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-neutral-200 relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {event.status === "confirmed" && (
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium">
                    <CheckCircle size={14} />
                    You're Going
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                  <Users size={14} />
                  {event.attendees} going
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-neutral-900 mb-3">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Calendar size={16} />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
                {event.status === "confirmed" ? (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-neutral-100 text-neutral-700 py-2.5 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 border border-neutral-300 text-neutral-700 py-2.5 rounded-lg font-medium text-sm hover:bg-neutral-50 transition-colors">
                      Cancel RSVP
                    </button>
                  </div>
                ) : (
                  <button className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors">
                    RSVP Now
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Virtual Events & Livestreams */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Join from Anywhere</h2>
        </div>
        
        <p className="text-neutral-600 mb-6 text-sm">
          Can't make it in person? Watch livestreams, join virtual events, and earn points from home!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {virtualEvents.map((event, index) => {
            const timeUntilStart = event.startTime.getTime() - Date.now();
            const hoursUntil = Math.floor(timeUntilStart / (1000 * 60 * 60));
            const minutesUntil = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
            
            const timeDisplay = hoursUntil > 24 
              ? `${Math.floor(hoursUntil / 24)}d ${hoursUntil % 24}h`
              : hoursUntil > 0
              ? `${hoursUntil}h ${minutesUntil}m`
              : `${minutesUntil}m`;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="relative h-40">
                  <img 
                    src={event.thumbnail} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-full uppercase">
                      {event.category}
                    </span>
                  </div>

                  {/* Points Badge */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star size={12} fill="white" />
                      +{event.points}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white font-semibold text-sm line-clamp-2">{event.title}</h4>
                  </div>
                </div>
                
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{timeDisplay}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{event.attendees.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium text-xs transition-colors">
                    Set Reminder
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Recent Community Activity */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 divide-y divide-neutral-100"
        >
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-900">
                    <span className="font-semibold">{activity.user}</span>
                    <span className="text-neutral-600"> {activity.action} </span>
                    <span className="font-medium">{activity.event}</span>
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Member Stories */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Member Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{story.name}</div>
                  <div className="text-sm text-neutral-500">{story.role}</div>
                </div>
              </div>
              <div className="relative">
                <MessageCircle size={20} className="absolute -top-1 -left-1 text-indigo-200" />
                <p className="text-neutral-700 italic pl-6">"{story.story}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Features */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Connect & Engage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Member Forum</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Join discussions, share experiences, and get advice from fellow members in our exclusive
              community forum.
            </p>
            <button className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center gap-1">
              Browse Discussions →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Local Chapters</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Connect with members in your city through local chapters and regular meetups tailored to
              your interests.
            </p>
            <button className="text-purple-600 font-medium text-sm hover:text-purple-700 flex items-center gap-1">
              Find Your Chapter →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 shadow-sm border border-amber-200 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="text-red-500 fill-red-500" size={24} />
          <Heart className="text-red-500 fill-red-500" size={24} />
          <Heart className="text-red-500 fill-red-500" size={24} />
        </div>
        <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
          You're part of 12,458 active members
        </h3>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-4">
          Our community spans across 45 cities worldwide, bringing together passionate wildlife lovers making a real difference for animals and conservation.
        </p>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors inline-flex items-center gap-2">
          <UserPlus size={18} />
          Invite a Friend to Join
        </button>
      </motion.div>
    </div>
  );
}