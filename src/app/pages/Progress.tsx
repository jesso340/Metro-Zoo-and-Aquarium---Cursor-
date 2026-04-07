import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Award,
  Trophy,
  Zap,
  Calendar,
  Gift,
  TrendingUp,
  Star,
  Lock,
  RefreshCw,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { pointsRewards as basePointsRewards } from "../data/mockData";

/** Lower tiers already redeemed over 9 months */
const pointsRewards = basePointsRewards.map((r, idx) =>
  idx < 2 ? { ...r, unlocked: true } : r
);

/** Grace — metrics as if she has been a member for ~9 months (since late July 2025 → “now”) */
const progressStats = {
  memberSince: "July 10th, 2025",
  tier: "Gold",
  perksUsedThisMonth: 5,
  eventsAttended: 24,
  totalSavings: 412,
  streakDays: 14,
};

const progressPoints = {
  current: 485,
  totalEarned: 1240,
  nextRewardAt: 500,
};

const progressRecentActivities = [
  { id: "1", type: "event" as const, title: "Sunset Safari Tour", date: "March 28th, 2026", value: 18 },
  { id: "2", type: "perk" as const, title: "Priority entry + dining discount", date: "March 15th, 2026", value: 22 },
  { id: "3", type: "event" as const, title: "Keeper talk: Big Cats", date: "February 22nd, 2026", value: undefined },
  { id: "4", type: "milestone" as const, title: "Visited all 5 habitats", date: "January 8th, 2026", value: undefined },
  { id: "5", type: "perk" as const, title: "Member lounge + gift shop savings", date: "December 3rd, 2025", value: 31 },
];

const renewalConfettiColors = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#fbbf24", "#fde68a", "#34d399"];

function fireRenewalConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const burst = (opts: Parameters<typeof confetti>[0]) => {
    void confetti({ ...opts, colors: renewalConfettiColors, disableForReducedMotion: true });
  };

  burst({ particleCount: 110, spread: 78, startVelocity: 38, origin: { y: 0.72, x: 0.5 }, ticks: 220, scalar: 1.05 });
  window.setTimeout(() => {
    burst({ particleCount: 55, angle: 55, spread: 48, origin: { x: 0.08, y: 0.68 } });
  }, 160);
  window.setTimeout(() => {
    burst({ particleCount: 55, angle: 125, spread: 48, origin: { x: 0.92, y: 0.68 } });
  }, 320);
}

export function Progress() {
  const [membershipRenewed, setMembershipRenewed] = useState(false);
  const handleRenewMembership = useCallback(() => {
    setMembershipRenewed(true);
    fireRenewalConfetti();
  }, []);
  const nextTier = "Platinum";
  const progressToNextTier = 72;

  const achievements = [
    { id: "1", title: "Zoo Explorer", description: "Visited all 5 habitats", earned: true, icon: Award },
    { id: "2", title: "Animal Ambassador", description: "Attended 10+ events", earned: true, icon: Calendar },
    { id: "3", title: "Conservation Champion", description: "Supported $1,000+ in conservation", earned: false, icon: TrendingUp },
    { id: "4", title: "Wildlife Photographer", description: "Completed photography workshop", earned: true, icon: Zap },
    { id: "5", title: "Education Advocate", description: "Attended 5 keeper talks", earned: true, icon: Trophy },
    { id: "6", title: "Member Extraordinaire", description: "Booked 50 experiences", earned: false, icon: Gift },
  ];

  const milestones = [
    { label: "Joined as a Family member", date: "July 10th, 2025", completed: true },
    { label: "First zoo visit as member", date: "July 12th, 2025", completed: true },
    { label: "10 animal encounters", date: "November 2025", completed: true },
    { label: "First keeper talk attended", date: "August 2025", completed: true },
    { label: "Reached Platinum tier", date: "2 perks away", completed: false },
    { label: "50 experiences booked", date: "26 of 50 — keep going!", completed: false },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">Your Impact</h1>
        <p className="text-neutral-600">Track your membership journey and achievements</p>
      </div>

      {/* Current Tier Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-black/15 bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-700 ring-1 ring-white/10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
          <div className="min-w-0 pr-2">
            <div className="text-white/85 text-sm font-medium mb-1 tracking-wide uppercase">
              Current Tier
            </div>
            <h2 className="text-4xl font-bold mb-2 text-white drop-shadow-sm">{progressStats.tier}</h2>
            <p className="text-amber-100/95 text-sm sm:text-base leading-snug">
              Member since {progressStats.memberSince} · 9 months
            </p>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-black/25 border border-white/20 backdrop-blur-sm rounded-full flex items-center justify-center self-start sm:self-auto">
            <Trophy size={32} className="text-amber-100" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-black/20 p-4 border border-white/10">
          <div className="flex items-center justify-between text-sm gap-3">
            <span className="text-white font-medium">Progress to {nextTier}</span>
            <span className="font-bold tabular-nums text-white shrink-0">{progressToNextTier}%</span>
          </div>
          <ProgressPrimitive.Root className="h-3 bg-black/35 rounded-full overflow-hidden border border-white/10">
            <ProgressPrimitive.Indicator
              className="h-full bg-gradient-to-r from-amber-200 to-white rounded-full transition-transform duration-500 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
              style={{ transform: `translateX(-${100 - progressToNextTier}%)` }}
            />
          </ProgressPrimitive.Root>
          <p className="text-xs text-amber-50/95 leading-relaxed">
            Redeem 2 more perks or attend 1 more event to reach {nextTier}
          </p>
        </div>
      </motion.div>

      {/* Renew membership */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        layout
        className={`rounded-2xl p-5 sm:p-6 shadow-sm border transition-colors duration-500 relative overflow-hidden ${
          membershipRenewed
            ? "border-green-400/60 bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50/90 shadow-md shadow-green-200/40 ring-2 ring-green-300/30"
            : "border-neutral-200 bg-white"
        }`}
      >
        {membershipRenewed && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-amber-300/35 blur-3xl"
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-emerald-400/25 blur-3xl"
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </>
        )}
        <AnimatePresence mode="wait">
          {!membershipRenewed ? (
            <motion.div
              key="renew-prompt"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-5 sm:items-start min-w-0"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0 sm:mt-0.5">
                <RefreshCw className="text-green-700" size={22} strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-neutral-900 leading-tight">
                    Renew Your Membership
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Keep your Family Gold benefits without interruption. Early renewal can lock in your current member rate.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRenewMembership}
                  className="inline-flex w-auto max-w-full items-center justify-start px-5 py-3 sm:py-2.5 rounded-xl bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors active:scale-[0.98]"
                >
                  Renew Membership
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="renew-confirmed"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6 min-w-0 text-center sm:text-left"
            >
              {[
                { top: "8%", left: "6%", delay: 0 },
                { top: "18%", right: "10%", delay: 0.15 },
                { bottom: "22%", left: "12%", delay: 0.3 },
                { bottom: "12%", right: "8%", delay: 0.45 },
              ].map((pos, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute text-amber-500/90"
                  style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.2 + pos.delay }}
                >
                  <motion.span
                    animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
                  >
                    <Sparkles size={20} strokeWidth={1.75} className="drop-shadow-sm" />
                  </motion.span>
                </motion.span>
              ))}

              <div className="relative flex justify-center sm:justify-start shrink-0">
                <motion.div
                  aria-hidden
                  className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-green-400/25"
                  initial={{ scale: 0.6, opacity: 0.9 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
                <motion.div
                  initial={{ scale: 0.2, rotate: -25, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 16, delay: 0.06 }}
                  className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-600/35 ring-4 ring-white/80"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0], rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <PartyPopper size={32} strokeWidth={1.5} aria-hidden />
                  </motion.div>
                </motion.div>
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <motion.h2
                  className="text-xl sm:text-2xl font-bold text-green-950 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
                >
                  You’re renewed — welcome back, Grace!
                </motion.h2>
                <motion.p
                  className="text-sm text-green-900/90 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.35 }}
                >
                  Your renewal is confirmed. Family Gold stays active for another year of perks and savings.{" "}
                  <span className="font-semibold text-green-950">Check your email for confirmation.</span>
                </motion.p>
                <motion.ul
                  className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } },
                  }}
                >
                  {["Family Gold locked in", "Same great benefits", "Another year of memories"].map((label) => (
                    <motion.li
                      key={label}
                      variants={{
                        hidden: { opacity: 0, y: 8, scale: 0.92 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-800 shadow-sm border border-green-200/80 backdrop-blur-sm"
                    >
                      {label}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <Gift size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">{progressStats.perksUsedThisMonth}</div>
          </div>
          <div className="text-sm text-neutral-600">Perks This Month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">{progressStats.eventsAttended}</div>
          </div>
          <div className="text-sm text-neutral-600">Events Attended</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">${progressStats.totalSavings}</div>
          </div>
          <div className="text-sm text-neutral-600">Total Savings</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div className="text-3xl font-semibold text-neutral-900">{progressStats.streakDays}</div>
          </div>
          <div className="text-sm text-neutral-600">Day Streak</div>
        </motion.div>
      </div>

      {/* Points & Rewards */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Points & Rewards</h2>
        
        {/* Points Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg mb-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-indigo-100 mb-1">Your Points Balance</div>
              <h2 className="text-5xl font-bold mb-2">{progressPoints.current}</h2>
              <p className="text-indigo-100 text-sm">Total earned: {progressPoints.totalEarned} points</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Star size={32} fill="white" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-indigo-100">Progress to next reward</span>
              <span className="font-semibold">{progressPoints.current} / {progressPoints.nextRewardAt}</span>
            </div>
            <ProgressPrimitive.Root className="h-3 bg-white/20 rounded-full overflow-hidden">
              <ProgressPrimitive.Indicator
                className="h-full bg-white rounded-full transition-transform duration-500"
                style={{ transform: `translateX(-${100 - (progressPoints.current / progressPoints.nextRewardAt * 100)}%)` }}
              />
            </ProgressPrimitive.Root>
            <p className="text-xs text-indigo-100">
              {progressPoints.nextRewardAt - progressPoints.current} more points to unlock Behind-the-Scenes Tour!
            </p>
          </div>
        </motion.div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pointsRewards.map((reward, index) => {
            const canUnlock = progressPoints.current >= reward.pointsRequired;
            const isUnlocked = reward.unlocked;
            
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-5 rounded-xl border-2 relative overflow-hidden ${
                  isUnlocked
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                    : canUnlock
                    ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                    : "bg-neutral-50 border-neutral-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-4xl flex-shrink-0 ${
                      !isUnlocked && !canUnlock ? "opacity-40 grayscale" : ""
                    }`}
                  >
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className={`font-semibold ${
                          isUnlocked || canUnlock ? "text-neutral-900" : "text-neutral-500"
                        }`}
                      >
                        {reward.title}
                      </h3>
                      {!isUnlocked && !canUnlock && (
                        <Lock size={16} className="text-neutral-400" />
                      )}
                    </div>
                    <p
                      className={`text-sm mb-3 ${
                        isUnlocked || canUnlock ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      {reward.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <Star size={14} className={isUnlocked || canUnlock ? "text-amber-500" : "text-neutral-400"} fill={isUnlocked || canUnlock ? "#f59e0b" : "none"} />
                        <span className={isUnlocked || canUnlock ? "text-amber-600" : "text-neutral-500"}>
                          {reward.pointsRequired} points
                        </span>
                      </div>
                      
                      {isUnlocked ? (
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          ✓ Unlocked
                        </span>
                      ) : canUnlock ? (
                        <button className="text-xs font-medium text-amber-900 bg-amber-200 hover:bg-amber-300 px-3 py-1 rounded-full transition-colors">
                          Claim Now
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-neutral-500">
                          {reward.pointsRequired - progressPoints.current} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-5 rounded-xl border-2 ${
                  achievement.earned
                    ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200"
                    : "bg-neutral-50 border-neutral-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.earned
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                        : "bg-neutral-300 text-neutral-500"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        achievement.earned ? "text-neutral-900" : "text-neutral-500"
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        achievement.earned ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <div className="mt-2 text-xs font-medium text-indigo-600">✓ Earned</div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Milestones */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Journey Milestones</h2>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      milestone.completed
                        ? "bg-indigo-600 border-indigo-600"
                        : "bg-white border-neutral-300"
                    }`}
                  >
                    {milestone.completed && (
                      <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  {index < milestones.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-8 w-0.5 h-8 -translate-x-1/2 ${
                        milestone.completed ? "bg-indigo-600" : "bg-neutral-300"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div
                    className={`font-medium ${
                      milestone.completed ? "text-neutral-900" : "text-neutral-500"
                    }`}
                  >
                    {milestone.label}
                  </div>
                  <div className="text-sm text-neutral-500">{milestone.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 divide-y divide-neutral-200">
          {progressRecentActivities.map((activity) => (
            <div key={activity.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "perk"
                      ? "bg-purple-100 text-purple-600"
                      : activity.type === "event"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {activity.type === "perk" ? (
                    <Gift size={18} />
                  ) : activity.type === "event" ? (
                    <Calendar size={18} />
                  ) : (
                    <Trophy size={18} />
                  )}
                </div>
                <div>
                  <div className="font-medium text-neutral-900">{activity.title}</div>
                  <div className="text-sm text-neutral-500">{activity.date}</div>
                </div>
              </div>
              {activity.value && (
                <div className="text-green-600 font-semibold">+${activity.value}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}