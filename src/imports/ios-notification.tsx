import { motion } from "motion/react";
import { Footprints } from "lucide-react";

interface IOSNotificationProps {
  appName?: string;
  time?: string;
  title?: string;
  body?: string;
  expanded?: boolean;
  onAction?: () => void;
  onClick?: () => void;
}

export function IOSNotification({
  appName = "Metro Zoo and Aquarium",
  time = "9:41 AM",
  title = "Hey Grace, come join us today!",
  body = "There's a family conservation event your kids would love at Metro Zoo & Aquarium.",
  expanded = false,
  onAction,
  onClick,
}: IOSNotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[393px] mx-auto"
    >
      <button
        onClick={onClick}
        className="w-full bg-black/75 backdrop-blur-2xl rounded-[18px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 active:scale-[0.98] transition-transform cursor-pointer text-left"
      >
        <div className="flex gap-2.5 px-3 py-3">
          {/* App Icon - Centered Vertically */}
          <div className="relative flex-shrink-0 self-center">
            <div className="w-[28px] h-[28px] bg-gradient-to-br from-[#096965] via-[#0A7571] to-[#0B827C] rounded-[6px] flex items-center justify-center shadow-sm">
              <Footprints className="text-white" size={16} strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* App Name and Time */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-white/90 tracking-tight text-[14px]">{appName}</span>
              <span className="text-[12px] text-white/50 tracking-tight flex-shrink-0 ml-2">now</span>
            </div>
            
            {/* Notification Text */}
            <div>
              <p className="text-[14px] leading-[18px] text-white font-semibold mb-0.5 tracking-tight">
                Hey Grace, check out this livestream!
              </p>
              <p className="text-[14px] leading-[18px] text-white/70 tracking-tight">
                Baby penguins are hatching live now! We remembered they're your favorite 🐧
              </p>
            </div>
          </div>
        </div>

        {/* Expanded Actions */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="border-t border-white/10"
          >
            {/* Button removed */}
          </motion.div>
        )}
      </button>
    </motion.div>
  );
}