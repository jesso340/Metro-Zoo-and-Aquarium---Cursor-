import { useState } from "react";
import { motion } from "motion/react";
import { DollarSign, Gift, Calendar, TrendingUp, ChevronRight, Sparkles, Leaf, Award, MapPin, Heart, GraduationCap, Tag, Users, Clock, Star } from "lucide-react";
import { userStats, benefits, recentActivities, virtualEvents, userPoints } from "../data/mockData";
import { BenefitCard } from "../components/BenefitCard";
import { StatCard } from "../components/StatCard";
import { BenefitModal } from "../components/BenefitModal";
import { Link } from "react-router";
import { babyPenguinChickUrl } from "../constants/media";

export function Home() {
  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  const recommendedBenefits = benefits.filter((b) => !b.used).slice(0, 3);
  const unusedPerks = benefits.filter((b) => !b.used);

  const handleBenefitClick = (benefit: typeof benefits[0]) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleRedeem = (benefitId: string) => {
    console.log("Redeemed:", benefitId);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-300"
      >
        <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-1 text-neutral-900">
              Welcome Grace! 👋
            </h2>
            <p className="text-sm text-neutral-600 mb-3">
              We appreciate your membership. Here's your stats for the year so far.
            </p>
          <div className="bg-amber-50 py-1.5 rounded-lg border border-amber-300 px-4 py-[6px] text-center">
            <div className="text-xs text-neutral-600 whitespace-nowrap">Member Tier</div>
            <div className="text-lg font-semibold text-neutral-900">Family</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-amber-300">
            <MapPin className="text-green-600 mb-2" size={24} strokeWidth={1.5} />
            <div className="text-3xl font-bold text-neutral-900 mb-1">1</div>
            <div className="text-xs text-neutral-500">Visits</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-300">
            <Heart className="text-red-400 mb-2" size={24} strokeWidth={1.5} />
            <div className="text-3xl font-bold text-neutral-900 mb-1">0</div>
            <div className="text-xs text-neutral-500">Volunteer Hours</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-300">
            <GraduationCap className="text-amber-500 mb-2" size={24} strokeWidth={1.5} />
            <div className="text-3xl font-bold text-neutral-900 mb-1">0</div>
            <div className="text-xs text-neutral-500">Programs</div>
            <div className="text-xs text-neutral-500">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-300">
            <Tag className="text-green-600 mb-2" size={24} strokeWidth={1.5} />
            <div className="text-3xl font-bold text-neutral-900 mb-1">$50</div>
            <div className="text-xs text-neutral-500">Saved</div>
            <div className="text-[10px] text-neutral-400 mt-0.5">vs. daily admission</div>
          </div>
        </div>
      </motion.div>

      {/* What to Do Today */}
      <section>
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Plan Your Visit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative overflow-hidden rounded-xl shadow-sm border border-neutral-200 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1752733005874-89c7c2bafe84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b28lMjBtYXAlMjBkaXJlY3RvcnklMjBlbnRyYW5jZXxlbnwxfHx8fDE3NzUwNjA5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent" />
            <Link to="/app/map" className="relative z-10 p-6 h-full flex flex-col justify-end text-white min-h-[200px]">
              <div className="text-3xl font-semibold mb-1">📍</div>
              <div className="opacity-90 mb-1 text-[16px] font-bold">Interactive Map</div>
              <div className="opacity-75 text-[14px]">Navigate the zoo</div>
            </Link>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-sm border border-neutral-200 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1588014307927-38c469ccccc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ndWlucyUyMGFxdWFyaXVtJTIwdW5kZXJ3YXRlciUyMHpvb3xlbnwxfHx8fDE3NzUwNjA5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/40 to-transparent" />
            <Link to="/app/benefits" className="relative z-10 p-6 h-full flex flex-col justify-end text-white min-h-[200px]">
              <div className="text-3xl font-semibold mb-1">{unusedPerks.length}</div>
              <div className="opacity-90 mb-1 text-[16px] font-bold">Available Member Experiences</div>
              <div className="opacity-75 text-[14px]">Ready to book</div>
            </Link>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-sm border border-neutral-200 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1630980271037-e4a978a1e9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b28lMjBmYW1pbHklMjBjaGlsZHJlbiUyMGV2ZW50cyUyMGFjdGl2aXRpZXN8ZW58MXx8fHwxNzc1MDYwOTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent" />
            <Link to="/app/community#upcoming-events" className="relative z-10 p-6 h-full flex flex-col justify-end text-white min-h-[200px]">
              <div className="text-3xl font-semibold mb-1">3</div>
              <div className="opacity-90 mb-1 text-[16px] font-bold">Upcoming Events</div>
              <div className="opacity-75 text-[14px]">This week</div>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-xl shadow-sm border border-neutral-200 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1588014307509-1ef94e20955f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHpvbyUyMHdhbGtpbmclMjBzYWZhcml8ZW58MXx8fHwxNzc1MDYwOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
            <Link to="/app/progress" className="relative z-10 p-6 h-full flex flex-col justify-end text-white min-h-[200px]">
              <div className="text-3xl font-semibold mb-1">📈</div>
              <div className="opacity-90 mb-1 text-[16px] font-bold">Your Impact</div>
              <div className="opacity-75 text-[14px]">Track your journey</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended for Your Family */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neutral-900">Recommended for Your Family</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Baby Penguin Hatching Livestream */}
          <Link to="/app/events/baby-penguin-hatching">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="relative h-48">
                <img 
                  src={babyPenguinChickUrl}
                  alt="Baby penguin hatching"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  LIVE SOON
                </div>
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  +50 Points
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Family Friendly</span>
                  <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Interactive</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">🐧 Baby Penguin Hatching</h3>
                <p className="text-sm text-neutral-600 mb-4">Watch adorable penguin chicks hatch live! Perfect for kids.</p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>Today, 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>1.2k watching</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Zookeeper Feeding Demo */}
          <Link to="/events/zookeeper-feeding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1773270775823-d300fbe0b216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b29rZWVwZXIlMjBmZWVkaW5nJTIwZGVtb25zdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzc1MDYwNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Zookeeper feeding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  +30 Points
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Educational</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">🦁 Zookeeper Q&A Live</h3>
                <p className="text-sm text-neutral-600 mb-4">Ask questions and learn about animal care from our experts.</p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>Tomorrow, 11:00 AM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>850 registered</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Animal Enrichment */}
          <Link to="/events/animal-enrichment">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1753444431949-04b5be8d0c42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaGlsZHJlbiUyMHpvbyUyMHBlbmd1aW5zJTIwaGFwcHl8ZW58MXx8fHwxNzc1MDYwNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Family at zoo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  +25 Points
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Family Friendly</span>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Interactive</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">🎨 Animal Enrichment Workshop</h3>
                <p className="text-sm text-neutral-600 mb-4">Watch how we keep our animals happy and engaged!</p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>This Saturday, 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>620 registered</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Happening This Weekend */}
      <section>
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Happening This Weekend</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden border-2 border-green-200"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1758599667717-27c61bcdd14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zZXJ2YXRpb24lMjBlYXJ0aCUyMGRheSUyMHZvbHVudGVlcnMlMjBuYXR1cmV8ZW58MXx8fHwxNzc1MDYwNDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Family Conservation Day"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                🌟 Featured Event
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-3 py-1 bg-green-600 text-white rounded-full">In-Person</span>
                <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Family Friendly</span>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-3">Family Conservation Day</h2>
              <p className="text-neutral-600 mb-4">
                Join us for a day of hands-on conservation activities! Plant trees, learn about wildlife protection, and help make a difference.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Calendar size={18} className="text-green-600" />
                  <span className="font-medium">Saturday, June 13 · 10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <MapPin size={18} className="text-green-600" />
                  <span>Conservation Garden, Metro Zoo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Users size={18} className="text-green-600" />
                  <span>245 members registered</span>
                </div>
              </div>
              <Link 
                to="/events/family-conservation-day"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                View Event Details
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Reminder Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Gift size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-neutral-900 mb-1">
              You have {unusedPerks.length} unused perks this month
            </h4>
            <p className="text-sm text-neutral-600 mb-3">
              Don't miss out on the value you've earned. Explore and redeem your benefits today.
            </p>
            <Link
              to="/app/benefits"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors"
            >
              Explore Benefits
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>

      <BenefitModal
        benefit={selectedBenefit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRedeem={handleRedeem}
      />
    </div>
  );
}