import { motion } from "motion/react";
import { Footprints, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function IOSHomeScreen() {
  // App icons data
  const apps = [
    { name: "Phone", color: "bg-green-500", emoji: "📞" },
    {
      name: "Safari",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      emoji: "🧭",
    },
    {
      name: "Messages",
      color: "bg-green-500",
      emoji: "💬",
      badge: 32,
    },
    {
      name: "Mail",
      color: "bg-gradient-to-b from-blue-400 to-blue-500",
      emoji: "✉️",
      badge: 156,
    },

    {
      name: "Music",
      color:
        "bg-gradient-to-br from-red-400 via-pink-400 to-pink-500",
      emoji: "🎵",
    },
    { name: "Calendar", color: "bg-white", emoji: "📅" },
    {
      name: "Photos",
      color:
        "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500",
      emoji: "🌅",
    },
    { name: "Camera", color: "bg-gray-700", emoji: "📷" },

    {
      name: "Weather",
      color: "bg-gradient-to-br from-blue-400 to-blue-500",
      emoji: "☀️",
    },
    { name: "Clock", color: "bg-black", emoji: "🕐" },
    { name: "Maps", color: "bg-white", emoji: "🗺️" },
    { name: "Wallet", color: "bg-black", emoji: "💳" },

    {
      name: "Metro Zoo",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
      isZooApp: true,
    },
    { name: "Settings", color: "bg-gray-600", emoji: "⚙️" },
    { name: "App Store", color: "bg-blue-500", emoji: "📦" },
    { name: "Health", color: "bg-white", emoji: "❤️" },

    { name: "Notes", color: "bg-yellow-300", emoji: "📝" },
    { name: "Reminders", color: "bg-white", emoji: "✓" },
    { name: "Contacts", color: "bg-gray-600", emoji: "👤" },
    { name: "Files", color: "bg-blue-500", emoji: "📁" },
  ];

  const dockApps = [
    { name: "Phone", color: "bg-green-500", emoji: "📞" },
    {
      name: "Safari",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      emoji: "🧭",
    },
    {
      name: "Messages",
      color: "bg-green-500",
      emoji: "💬",
      badge: 32,
    },
    {
      name: "Mail",
      color: "bg-gradient-to-b from-blue-400 to-blue-500",
      emoji: "✉️",
      badge: 156,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden max-w-[var(--metro-shell-max-width)] mx-auto bg-black">
      {/* Background Wallpaper */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1769704552351-d5059b8bb6f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmx1ZSUyMHB1cnBsZSUyMHdhbGxwYXBlcnxlbnwxfHx8fDE3NzU0ODgwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="iOS wallpaper"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* iOS Status Bar */}
      <div className="relative z-10 px-8 pt-4 flex items-center justify-between text-white">
        <span className="text-[17px] font-semibold tracking-tight drop-shadow-lg">
          9:41
        </span>
        <div className="flex items-center gap-[6px]">
          {/* Cellular Signal */}
          <div className="flex items-end gap-[2px]">
            <div className="w-[3px] h-[4px] bg-white rounded-full drop-shadow-md" />
            <div className="w-[3px] h-[6px] bg-white rounded-full drop-shadow-md" />
            <div className="w-[3px] h-[8px] bg-white rounded-full drop-shadow-md" />
            <div className="w-[3px] h-[10px] bg-white rounded-full drop-shadow-md" />
          </div>
          {/* WiFi */}
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="white"
            className="mt-0.5 drop-shadow-md"
          >
            <path d="M7.5 3.5C9.5 3.5 11.3 4.3 12.6 5.5L14 4C12.2 2.3 9.9 1.2 7.5 1.2C5.1 1.2 2.8 2.3 1 4L2.4 5.5C3.7 4.3 5.5 3.5 7.5 3.5Z" />
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-[2px] drop-shadow-md">
            <div className="w-[22px] h-[11px] border-2 border-white rounded-[3px] relative">
              <div className="absolute inset-[2px] bg-white rounded-[1px]" />
            </div>
            <div className="w-[2px] h-[4px] bg-white rounded-r-sm" />
          </div>
        </div>
      </div>

      {/* App Grid */}
      <div className="relative z-10 px-[22px] pt-16">
        <div className="grid grid-cols-4 gap-x-[18px] gap-y-[20px]">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.03,
                type: "spring",
                damping: 15,
                stiffness: 200,
              }}
              className="flex flex-col items-center gap-[6px]"
            >
              <button
                className={`w-[60px] h-[60px] rounded-[13px] ${app.isZooApp ? "bg-gradient-to-br from-[#096965] via-[#0A7571] to-[#0B827C]" : app.color} shadow-lg flex items-center justify-center text-2xl relative transition-transform active:scale-[0.88]`}
                style={{
                  boxShadow: app.isZooApp
                    ? "0 8px 24px rgba(9, 105, 101, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.3)"
                    : "0 3px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                {app.isZooApp ? (
                  <Footprints
                    className="w-8 h-8 text-white"
                    strokeWidth={2.5}
                  />
                ) : (
                  <span className="text-[28px]">
                    {app.emoji}
                  </span>
                )}
                {app.badge && (
                  <div className="absolute -top-[4px] -right-[4px] min-w-[18px] h-[18px] bg-[#FF3B30] rounded-full flex items-center justify-center px-[5px] shadow-md border-[1.5px] border-black/10">
                    <span className="text-white text-[11px] font-semibold">
                      {app.badge > 99 ? "99+" : app.badge}
                    </span>
                  </div>
                )}
              </button>
              <span className="text-white text-[11px] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-center leading-tight max-w-[64px] tracking-tight">
                {app.isZooApp ? "Metro Zoo" : app.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute bottom-[110px] left-[22px] right-[22px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/20 backdrop-blur-2xl rounded-[14px] px-3 py-[7px] flex items-center gap-2 border border-white/10 shadow-lg"
        >
          <Search
            className="w-[16px] h-[16px] text-white/70"
            strokeWidth={2.5}
          />
          <span className="text-white/70 text-[15px] tracking-tight">
            Search
          </span>
        </motion.div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-[20px] left-[16px] right-[16px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            type: "spring",
            damping: 20,
          }}
          className="bg-white/15 backdrop-blur-3xl rounded-[24px] px-[18px] py-[10px] flex items-center justify-around shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10"
        >
          {dockApps.map((app, index) => (
            <div key={index} className="relative">
              <button
                className={`w-[60px] h-[60px] rounded-[13px] ${app.color} shadow-md flex items-center justify-center text-2xl transition-transform active:scale-[0.88]`}
                style={{
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span className="text-[28px]">{app.emoji}</span>
                {app.badge && (
                  <div className="absolute -top-[4px] -right-[4px] min-w-[18px] h-[18px] bg-[#FF3B30] rounded-full flex items-center justify-center px-[5px] shadow-md border-[1.5px] border-black/10">
                    <span className="text-white text-[11px] font-semibold">
                      {app.badge > 99 ? "99+" : app.badge}
                    </span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}