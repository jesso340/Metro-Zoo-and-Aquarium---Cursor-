import { motion } from "motion/react";
import { DollarSign, TrendingUp, Calendar, Gift, ArrowUp } from "lucide-react";
import { userStats, monthlyData } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export function Insights() {
  const thisMonthSavings = monthlyData[monthlyData.length - 1].savings;
  const lastMonthSavings = monthlyData[monthlyData.length - 2].savings;
  const savingsGrowth = lastMonthSavings > 0 
    ? ((thisMonthSavings - lastMonthSavings) / lastMonthSavings * 100).toFixed(0)
    : "100";

  const averageMonthlySavings = Math.round(
    monthlyData.reduce((sum, month) => sum + month.savings, 0) / monthlyData.length
  );

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">Value Insights</h1>
        <p className="text-neutral-600">See how much value you're gaining from your membership</p>
      </div>

      {/* Hero Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500 via-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-green-100 mb-1">Total Value Gained</div>
            <h2 className="text-5xl font-bold mb-2">${userStats.totalSavings}</h2>
            <p className="text-green-100">Since joining on {userStats.memberSince}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <DollarSign size={32} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUp size={16} className="text-green-200" />
              <span className="text-green-100 text-sm">This Month</span>
            </div>
            <div className="text-2xl font-semibold">${thisMonthSavings}</div>
            <div className="text-xs text-green-100 mt-1">+{savingsGrowth}% from last month</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-green-100 text-sm mb-1">Monthly Average</div>
            <div className="text-2xl font-semibold">${averageMonthlySavings}</div>
            <div className="text-xs text-green-100 mt-1">Across all months</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-green-100 text-sm mb-1">ROI</div>
            <div className="text-2xl font-semibold">24x</div>
            <div className="text-xs text-green-100 mt-1">Value vs. membership cost</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-3">
            <Gift size={24} />
          </div>
          <div className="text-2xl font-semibold text-neutral-900 mb-1">
            {monthlyData.reduce((sum, month) => sum + month.perks, 0)}
          </div>
          <div className="text-sm text-neutral-600">Total Perks Used</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-3">
            <Calendar size={24} />
          </div>
          <div className="text-2xl font-semibold text-neutral-900 mb-1">{userStats.eventsAttended}</div>
          <div className="text-sm text-neutral-600">Events Attended</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-3">
            <TrendingUp size={24} />
          </div>
          <div className="text-2xl font-semibold text-neutral-900 mb-1">{userStats.perksUsedThisMonth}</div>
          <div className="text-sm text-neutral-600">This Month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-3">
            <DollarSign size={24} />
          </div>
          <div className="text-2xl font-semibold text-neutral-900 mb-1">
            ${Math.round(userStats.totalSavings / monthlyData.reduce((sum, month) => sum + month.perks, 0))}
          </div>
          <div className="text-sm text-neutral-600">Avg Per Perk</div>
        </motion.div>
      </div>

      {/* Savings Over Time Chart */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Savings Over Time</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* Perks Used Per Month */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Perks Redeemed by Month</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="perks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* Value Breakdown */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Value Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <h3 className="font-semibold text-neutral-900 mb-4">By Category</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-700">Wellness</span>
                  <span className="text-sm font-semibold text-neutral-900">$485</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: "39%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-700">Experiences</span>
                  <span className="text-sm font-semibold text-neutral-900">$342</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "27%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-700">Learning</span>
                  <span className="text-sm font-semibold text-neutral-900">$220</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "18%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-700">Events</span>
                  <span className="text-sm font-semibold text-neutral-900">$135</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "11%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-700">Discounts</span>
                  <span className="text-sm font-semibold text-neutral-900">$65</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "5%" }} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
          >
            <h3 className="font-semibold text-neutral-900 mb-4">Membership Impact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-medium text-neutral-900">You've saved ${userStats.totalSavings}</div>
                  <div className="text-sm text-neutral-600">Equivalent to 24 months of membership</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-medium text-neutral-900">Attended {userStats.eventsAttended} events</div>
                  <div className="text-sm text-neutral-600">Worth over $500 in experiences</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-medium text-neutral-900">On a {userStats.streakDays}-day streak</div>
                  <div className="text-sm text-neutral-600">Keep it up to unlock bonus rewards!</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}