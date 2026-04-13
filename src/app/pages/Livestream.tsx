import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Users, Eye, Heart, Share2, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { babyPenguinChickUrl } from "../constants/media";
import { IOSStatusBar } from "../components/IOSStatusBar";

const livestreamData: Record<string, any> = {
  "baby-penguin-hatching": {
    id: "baby-penguin-hatching",
    title: "Baby Penguin Hatching LIVE",
    thumbnail: babyPenguinChickUrl,
    viewers: 1247,
    points: 50,
    duration: "45 min remaining"
  },
  "zookeeper-qna": {
    id: "zookeeper-qna",
    title: "Zookeeper Q&A Live",
    thumbnail: "https://images.unsplash.com/photo-1773270775823-d300fbe0b216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b29rZWVwZXIlMjBmZWVkaW5nJTIwZGVtb25zdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzc1MDYwNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewers: 892,
    points: 30,
    duration: "1 hour remaining"
  }
};

export function Livestream() {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const stream = livestreamData[streamId || ""];
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentViewers, setCurrentViewers] = useState(stream?.viewers || 0);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentViewers(prev => prev + Math.floor(Math.random() * 10) - 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-earn points over time
  useEffect(() => {
    const pointsInterval = setInterval(() => {
      if (pointsEarned < (stream?.points || 50)) {
        setPointsEarned(prev => Math.min(prev + 5, stream?.points || 50));
      }
    }, 15000); // Earn 5 points every 15 seconds
    
    return () => clearInterval(pointsInterval);
  }, [pointsEarned, stream]);

  const handleEndStream = () => {
    navigate(`/livestream/${streamId}/summary`);
  };

  if (!stream) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Livestream Not Found</h1>
        <Link to="/" className="text-green-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 max-w-[430px] mx-auto border-x border-neutral-800 shadow-2xl relative overflow-hidden">
      {/* Top Bar */}
      <div className="bg-neutral-800 border-b border-neutral-700 sticky top-0 z-50">
        <IOSStatusBar variant="light" />
        <div className="w-full px-[24px] py-3 flex items-center justify-between">
          <Link 
            to={`/app/events/${streamId}`}
            className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-[14px] font-medium">Exit</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[14px] font-medium tracking-wider">LIVE</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Eye size={16} />
              <span className="text-[14px]">{currentViewers.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-[24px] py-4 space-y-4 h-[calc(100vh-96px)] flex flex-col overflow-hidden">
        {/* Main Video Player */}
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-neutral-950 rounded-xl overflow-hidden flex-1 min-h-0"
          >
            {/* Mock Video Content */}
            <img 
              src={stream.thumbnail}
              alt={stream.title}
              className="w-full h-full object-cover"
            />
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Points Progress */}
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-white font-medium mb-1">
                <span className="text-[14px]">{pointsEarned} / {stream.points} Pts</span>
              </div>
              <div className="w-24 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(pointsEarned / stream.points) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <span className="text-white text-[14px]">{stream.duration}</span>
                </div>
                <button className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Video Info - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-800 rounded-xl p-4 shrink-0"
          >
            <h1 className="text-[18px] font-bold text-white mb-2 leading-tight">{stream.title}</h1>
            <div className="flex items-center gap-4 text-neutral-400 mb-3">
              <div className="flex items-center gap-1.5">
                <Users size={16} />
                <span className="text-[14px]">{currentViewers.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart size={16} className="text-red-400" />
                <span className="text-[14px]">2.4k</span>
              </div>
            </div>
            <p className="text-neutral-300 text-[14px] leading-relaxed mb-4 line-clamp-2">
              {stream.id === 'baby-penguin-hatching' 
                ? "Experience the magic of new life as our adorable African penguin chicks break free from their eggs!"
                : "Ask questions and learn about animal care from our experts in this live session."}
            </p>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors">
                <Heart size={16} />
                Like
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="shrink-0"
          >
            <Link
              to="/app/progress"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-[13px] font-semibold transition-colors shadow-sm"
            >
              See Membership Impact
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
