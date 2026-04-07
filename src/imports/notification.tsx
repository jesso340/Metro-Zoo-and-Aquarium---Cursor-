import { useNavigate } from "react-router";
import { IOSNotification } from "../components/ios-notification";
import { motion } from "motion/react";
import { Flashlight, Camera } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function NotificationScreen() {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/ios-home");
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col max-w-[430px] mx-auto relative overflow-hidden">
      {/* Background Image - Sunset */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1706796979993-465328b9d7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBza3klMjBiZWF1dGlmdWwlMjBvcmFuZ2UlMjBwaW5rfGVufDF8fHx8MTc3NTQ4ODMyNnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Lock screen wallpaper"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for better readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* iOS Status Bar */}
      <div className="absolute top-0 left-0 right-0 px-8 pt-4 flex items-center justify-between text-white z-10 drop-shadow-lg">
        <span className="text-[17px] font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-[6px]">
          {/* Cellular Signal */}
          <div className="flex items-end gap-[2px]">
            <div className="w-[3px] h-[4px] bg-white rounded-full" />
            <div className="w-[3px] h-[6px] bg-white rounded-full" />
            <div className="w-[3px] h-[8px] bg-white rounded-full" />
            <div className="w-[3px] h-[10px] bg-white rounded-full" />
          </div>
          {/* WiFi */}
          <svg width="15" height="11" viewBox="0 0 15 11" fill="white" className="mt-0.5">
            <path d="M7.5 3.5C9.5 3.5 11.3 4.3 12.6 5.5L14 4C12.2 2.3 9.9 1.2 7.5 1.2C5.1 1.2 2.8 2.3 1 4L2.4 5.5C3.7 4.3 5.5 3.5 7.5 3.5Z" />
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-[2px]">
            <div className="w-[22px] h-[11px] border-2 border-white rounded-[3px] relative">
              <div className="absolute inset-[2px] bg-white rounded-[1px]" />
            </div>
            <div className="w-[2px] h-[4px] bg-white rounded-r-sm" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 relative z-10 pt-20">
        {/* Time Display - iOS Lock Screen Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          <div className="text-[18px] font-medium tracking-tight mb-2">
            Wed, June 10
          </div>
          <div className="font-extralight tracking-tighter leading-none text-[96px]">
            9:41
          </div>
        </motion.div>

        {/* Notification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <IOSNotification
            expanded={true}
            onClick={handleViewDetails}
          />
        </motion.div>
      </div>

      {/* Bottom Lock Screen Controls */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-between px-12 z-10">
        <button className="w-[50px] h-[50px] rounded-full bg-white/15 backdrop-blur-lg flex items-center justify-center active:scale-95 transition-transform border border-white/10 drop-shadow-lg">
          <Flashlight className="w-[22px] h-[22px] text-white" strokeWidth={1.5} />
        </button>
        <button className="w-[50px] h-[50px] rounded-full bg-white/15 backdrop-blur-lg flex items-center justify-center active:scale-95 transition-transform border border-white/10 drop-shadow-lg">
          <Camera className="w-[22px] h-[22px] text-white" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}