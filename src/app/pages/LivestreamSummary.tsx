import { motion } from "motion/react";
import { Award, TrendingUp, Heart, Calendar, ArrowRight, Sparkles, Target } from "lucide-react";
import { Link, useParams } from "react-router";

const summaryData: Record<string, any> = {
  "baby-penguin-hatching": {
    id: "baby-penguin-hatching",
    title: "Baby Penguin Hatching",
    totalPoints: 50,
    milestoneProgress: 15,
    nextMilestone: "Free Guest Pass",
    pointsToMilestone: 85,
    impactMessage: "You helped restore penguin habitats",
    watchTime: "42 minutes",
    interactions: 8,
    nextEvents: [
      {
        id: "zookeeper-qna",
        title: "🦁 Zookeeper Q&A Live",
        time: "Tomorrow, 11:00 AM",
        points: 30,
        image: "https://images.unsplash.com/photo-1773270775823-d300fbe0b216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b29rZWVwZXIlMjBmZWVkaW5nJTIwZGVtb25zdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzc1MDYwNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        id: "animal-enrichment",
        title: "🎨 Animal Enrichment Workshop",
        time: "This Saturday, 3:00 PM",
        points: 25,
        image: "https://images.unsplash.com/photo-1753444431949-04b5be8d0c42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjaGlsZHJlbiUyMHpvbyUyMHBlbmd1aW5zJTIwaGFwcHl8ZW58MXx8fHwxNzc1MDYwNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ]
  },
  "zookeeper-qna": {
    id: "zookeeper-qna",
    title: "Zookeeper Q&A",
    totalPoints: 30,
    milestoneProgress: 15,
    nextMilestone: "Free Guest Pass",
    pointsToMilestone: 85,
    impactMessage: "You supported animal care education",
    watchTime: "35 minutes",
    interactions: 5,
    nextEvents: []
  }
};

export function LivestreamSummary() {
  const { streamId } = useParams();
  const summary = summaryData[streamId || ""];

  if (!summary) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Summary Not Found</h1>
        <Link to="/" className="text-green-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <Award className="text-white" size={48} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-neutral-900 mb-3"
        >
          Amazing Experience!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-neutral-600"
        >
          Thanks for joining the {summary.title} livestream, Grace
        </motion.p>
      </motion.div>

      {/* Points Earned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200"
      >
        <div className="text-center">
          <div className="text-6xl font-bold text-amber-600 mb-2">+{summary.totalPoints}</div>
          <div className="text-xl font-semibold text-neutral-900 mb-1">Points Earned!</div>
          <div className="text-neutral-600">Added to your rewards balance</div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">{summary.watchTime}</div>
          <div className="text-sm text-neutral-600">Watch Time</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="text-purple-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">{summary.interactions}</div>
          <div className="text-sm text-neutral-600">Interactions</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="text-red-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">Impact</div>
          <div className="text-sm text-neutral-600">Conservation</div>
        </div>
      </motion.div>

      {/* Progress Toward Milestone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Target className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-neutral-900 mb-1">Almost There!</h3>
            <p className="text-neutral-600">Just {summary.pointsToMilestone} more points to unlock your {summary.nextMilestone}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>Progress</span>
            <span>{summary.milestoneProgress}%</span>
          </div>
          <div className="w-full h-3 bg-green-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${summary.milestoneProgress}%` }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Impact Made */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="text-emerald-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">Your Impact</h3>
            <p className="text-neutral-700 mb-3">{summary.impactMessage}</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="text-sm text-emerald-900 font-medium mb-1">🌍 Conservation Contribution</div>
              <div className="text-xs text-emerald-700">
                Your engagement directly supports our wildlife conservation programs and habitat restoration efforts.
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Events */}
      {summary.nextEvents && summary.nextEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"
        >
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Join Another Experience</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {summary.nextEvents.map((event: any) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="relative h-32">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      +{event.points} Points
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-neutral-900 mb-1">{event.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <Calendar size={12} />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Link 
          to="/app/progress"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          View Your Impact
          <ArrowRight size={20} />
        </Link>
        <Link 
          to="/app"
          className="flex items-center justify-center gap-2 bg-white border-2 border-neutral-300 text-neutral-700 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>

      {/* Set Reminder */}
      {summary.nextEvents && summary.nextEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center"
        >
          <h4 className="font-semibold text-neutral-900 mb-2">Don't Miss Out!</h4>
          <p className="text-sm text-neutral-600 mb-4">
            Set a reminder for the Zookeeper Q&A tomorrow
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Set Reminder
          </button>
        </motion.div>
      )}
    </div>
  );
}