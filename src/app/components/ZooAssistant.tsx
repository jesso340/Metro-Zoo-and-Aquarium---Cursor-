import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { MessageCircle, X, Send, Sparkles, Ticket, Bird, Map, Utensils, Navigation, List, Search, Coffee, Footprints, Clock, CheckCircle2, DollarSign, Timer, ChevronLeft, MoreHorizontal, Mic, Keyboard, Phone, Plus, MapPin, Gift, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { familyAdventureItinerary } from "../data/familyAdventureItinerary";
import type { ChatItinerary } from "../data/familyAdventureItinerary";
import { UserAvatar } from "./UserAvatar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  components?: React.ReactNode[];
  itinerary?: ChatItinerary;
  tourSuggestionChips?: { label: string; icon: LucideIcon; action?: "trip-perks" }[];
}

/** Encodes a real, scannable QR for the prototype priority-entry pass. */
const PRIORITY_ENTRY_QR_VALUE =
  "https://members.metrozoo.org/digital-pass/priority?member=grace-chen&tier=family-gold&valid=2026-04-06";

export function ZooAssistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [valueTracker, setValueTracker] = useState({
    potentialSave: 25,
    perksOpen: 5,
    estMinutesBack: 20,
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi Grace! We are so thrilled to have you join us for your very first visit as a member! 🦒\n\nYou're right on time for your Family Adventure Tour. Check out your Member Benefits to get the most value out of your day!",
      sender: "assistant",
      timestamp: new Date(new Date().setHours(9, 25, 0, 0)),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const st = location.state as { openZooAssistant?: boolean } | undefined;
    if (st?.openZooAssistant) {
      setIsOpen(true);
      navigate(`${location.pathname}${location.search}`, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, location.search, navigate]);

  const handleFullItinerary = () => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === "itinerary-full")) return prev;
      const t = Date.now();
      return [
        ...prev,
        {
          id: `user-itin-${t}`,
          text: "Full itinerary",
          sender: "user" as const,
          timestamp: new Date(),
        },
        {
          id: "itinerary-full",
          text: "Here's your full Family Adventure Tour itinerary for today — follow the stops in order. Open the Visit tab anytime for maps and add-ons.",
          sender: "assistant" as const,
          timestamp: new Date(),
          itinerary: {
            title: familyAdventureItinerary.title,
            duration: familyAdventureItinerary.duration,
            stops: familyAdventureItinerary.stops.map((s) => ({ ...s })),
          },
          tourSuggestionChips: [
            { label: "Navigate to your first stop", icon: Navigation },
            { label: "Lunch on your route", icon: Coffee },
            { label: "Restrooms & water fountains", icon: MapPin },
            { label: "Stroller-friendly paths", icon: Footprints },
            { label: "Show all the perks I used", icon: Sparkles, action: "trip-perks" },
          ],
        },
      ];
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for sharing that! I've updated your itinerary with priority access for the penguin feeding. Would you like me to show you the route?",
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const [showQR, setShowQR] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showLounge, setShowLounge] = useState(false);
  const [showTripPerksPanel, setShowTripPerksPanel] = useState(false);

  const MetroZooLogoAvatar = () => (
    <div
      className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-md border border-white"
      aria-label="Metro Zoo Guide Assistant"
    >
      <div className="w-full h-full bg-green-700 flex items-center justify-center">
        <Footprints size={20} className="text-white" />
      </div>
    </div>
  );

  // UI Components for the Chat
  const MemberBenefitsCard = () => (
    <div className="mt-6 space-y-3">
      <h4 className="text-[16px] font-bold text-neutral-800 tracking-tight px-1">Your Member Benefits Today</h4>
      <div className="grid grid-cols-1 gap-2">
        {[
          { id: 'priority', icon: Ticket, title: "Priority Entry", badge: null, color: "text-green-600", bg: "bg-green-50", action: "Skip the 15-minute wait 🎟️", hasView: true },
          { id: 'penguin', icon: Bird, title: "Penguin Feeding", badge: null, color: "text-blue-600", bg: "bg-blue-50", action: "Member-only access", hasView: false },
          { id: 'tour', icon: Map, title: "Family Adventure Tour", badge: null, color: "text-purple-600", bg: "bg-purple-50", action: "Priority access included", hasView: false },
          { id: 'dining', icon: Utensils, title: "Dining Discount", badge: "10% OFF", color: "text-orange-600", bg: "bg-orange-50", action: "Save at Savanna Cafe", hasView: true },
          { id: 'lounge', icon: Coffee, title: "Oasis Lounge", badge: "FREE DRINKS", color: "text-teal-600", bg: "bg-teal-50", action: "Air-conditioned rest area", hasView: false },
        ].map((benefit, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-neutral-200 rounded-xl p-3 shadow-sm flex items-center gap-3"
          >
            <div className={`w-10 h-10 ${benefit.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <benefit.icon className={benefit.color} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col">
                <h5 className="font-bold text-neutral-900 text-[14px] truncate">{benefit.title}</h5>
                {benefit.badge && (
                  <span className="inline-block w-fit bg-orange-100 text-orange-700 text-[10px] font-black px-1.5 py-0.5 rounded mt-0.5">
                    {benefit.badge}
                  </span>
                )}
              </div>
              <p className="text-[14px] text-neutral-600 mt-0.5">{benefit.action}</p>
            </div>
            {benefit.hasView && (
              <button 
                onClick={() => {
                  if (benefit.id === 'priority') setShowQR(true);
                  else if (benefit.id === 'dining') setShowDiscount(true);
                }}
                className="text-[14px] font-bold text-green-700 hover:bg-green-50 px-2 py-1 rounded-md transition-colors"
              >
                View
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* QR Code Modal/Overlay */}
      {showQR && (
          <div 
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <div 
              className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-neutral-900">Priority Entry Pass</h3>
                <button onClick={() => setShowQR(false)} className="p-1 hover:bg-neutral-100 rounded-full">
                  <X size={20} className="text-neutral-400" />
                </button>
              </div>
              <div className="bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200 mb-6">
                <div className="mx-auto w-fit rounded-lg bg-white p-3 shadow-inner ring-1 ring-neutral-200/80">
                  <QRCodeSVG
                    value={PRIORITY_ENTRY_QR_VALUE}
                    size={208}
                    level="M"
                    marginSize={2}
                    bgColor="#ffffff"
                    fgColor="#0a0a0a"
                    title="Metro Zoo priority entry digital pass"
                    className="block h-auto max-w-full rounded-[2px]"
                  />
                </div>
                <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                  Member priority · Family Gold
                </p>
              </div>
              <p className="text-sm text-neutral-500 mb-6">Scan this code at any member priority entrance.</p>
              <button className="w-full bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-800 transition-colors">
                <Footprints size={18} />
                Download Pass
              </button>
            </div>
          </div>
      )}

      {/* Dining Discount Modal/Overlay */}
      {showDiscount && (
          <div 
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDiscount(false)}
          >
            <div 
              className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-neutral-900">Dining Discount</h3>
                <button onClick={() => setShowDiscount(false)} className="p-1 hover:bg-neutral-100 rounded-full">
                  <X size={20} className="text-neutral-400" />
                </button>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border-2 border-dashed border-orange-200 mb-6">
                <div className="py-4">
                  <p className="text-sm font-bold text-orange-800 uppercase tracking-widest mb-2">Your Code</p>
                  <p className="text-4xl font-black text-neutral-900 tracking-tighter">ZOO-MEMBER-10</p>
                </div>
              </div>
              <p className="text-sm text-neutral-500 mb-6">Show this code at Savanna Cafe or any food kiosk to redeem your 10% discount.</p>
              <button 
                onClick={() => setShowDiscount(false)}
                className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors"
              >
                <Utensils size={18} />
                Done
              </button>
            </div>
          </div>
      )}

      {/* Oasis Lounge Modal/Overlay */}
      {showLounge && (
          <div 
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLounge(false)}
          >
            <div 
              className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-neutral-900">Oasis Lounge</h3>
                <button onClick={() => setShowLounge(false)} className="p-1 hover:bg-neutral-100 rounded-full">
                  <X size={20} className="text-neutral-400" />
                </button>
              </div>
              <div className="bg-teal-50 p-6 rounded-2xl border-2 border-dashed border-teal-200 mb-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Navigation className="text-teal-700" size={24} />
                  </div>
                  <p className="text-sm font-bold text-teal-800 uppercase tracking-widest">Located Near</p>
                  <p className="text-xl font-black text-neutral-900">African Savanna</p>
                </div>
              </div>
              <p className="text-sm text-neutral-500 mb-6">Enjoy complimentary refreshments, Wi-Fi, and air conditioning at our exclusive member lounge.</p>
              <button 
                onClick={() => setShowLounge(false)}
                className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
              >
                <Navigation size={18} />
                Get Directions
              </button>
            </div>
          </div>
      )}
    </div>
  );

  const RecommendationCard = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 bg-green-700 rounded-2xl p-4 shadow-lg text-white"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-green-300" />
        <span className="text-[14px] font-bold uppercase tracking-widest text-green-200">Recommended Next Step</span>
      </div>
      <h4 className="text-[18px] font-bold mb-1">Start your Family Adventure Tour</h4>
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-[14px] text-green-100">
          <Clock size={14} />
          <span>Starts in 5 minutes</span>
        </div>
        <div className="flex items-center gap-2 text-[14px] text-green-100">
          <CheckCircle2 size={14} />
          <span>Skip the line with Priority Access</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-white text-green-700 font-bold py-2.5 rounded-xl text-[14px] shadow-sm active:scale-95 transition-transform">
          Start Tour
        </button>
        <button className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-xl text-[14px] border border-green-500 active:scale-95 transition-transform">
          View Route
        </button>
      </div>
    </motion.div>
  );

  const ActionChips = ({ onFullItinerary }: { onFullItinerary: () => void }) => (
    <div className="mt-4 flex flex-wrap gap-2">
      {[
        { label: "Navigate to next stop", icon: Navigation },
        { label: "Full itinerary", icon: List },
        { label: "Nearby animals", icon: Footprints },
        { label: "Find food", icon: Coffee },
        { label: "Wait times", icon: Clock },
      ].map((chip, i) => (
        <motion.button
          key={i}
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.05 }}
          onClick={() => {
            if (chip.label === "Full itinerary") onFullItinerary();
          }}
          className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-1.5 rounded-full text-[14px] font-medium text-neutral-700 shadow-sm hover:border-green-300 hover:bg-green-50 transition-all active:scale-95"
        >
          <chip.icon size={14} className="text-green-600" />
          {chip.label}
        </motion.button>
      ))}
    </div>
  );

  const UtilityTools = () => (
    <div className="mt-4 bg-neutral-100 rounded-2xl p-4 border border-neutral-200">
      <h4 className="text-[14px] font-bold text-neutral-500 uppercase tracking-wider mb-3">Helpful Tools</h4>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Download Map", sub: "Offline access" },
          { label: "Open Live Map", sub: "Real-time" },
          { label: "Find Restrooms", sub: "Nearby" },
          { label: "Stroller Routes", sub: "Easy access" },
        ].map((tool, i) => (
          <button key={i} className="bg-white p-2.5 rounded-xl border border-neutral-200 text-left hover:border-green-300 transition-colors">
            <p className="text-[14px] font-bold text-neutral-900">{tool.label}</p>
            <p className="text-[14px] text-neutral-500">{tool.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const ValueTracker = () => (
    <div className="mt-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 shadow-sm">
      <h4 className="text-[14px] font-bold text-amber-900 mb-3 leading-snug tracking-tight">
        Member Value Opportunity Today
      </h4>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="flex items-center justify-center text-amber-600 mb-1">
            <DollarSign size={16} />
          </div>
          <p className="text-[18px] font-black text-neutral-900">${valueTracker.potentialSave}</p>
          <p className="text-[14px] font-bold text-neutral-500">Save up to</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-amber-600 mb-1">
            <Sparkles size={16} />
          </div>
          <p className="text-[18px] font-black text-neutral-900">{valueTracker.perksOpen}</p>
          <p className="text-[14px] font-bold text-neutral-500">Perks open</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-amber-600 mb-1">
            <Timer size={16} />
          </div>
          <p className="text-[18px] font-black text-neutral-900">{valueTracker.estMinutesBack}</p>
          <p className="text-[14px] font-bold text-neutral-500">Est. min back</p>
        </div>
      </div>
    </div>
  );

  /** Illustrative trip perks — matches Home / ValueTracker stat styling */
  const TripPerksUsedPanel = () => {
    const stats = [
      {
        icon: Ticket,
        value: "1×",
        label: "Priority entry",
        hint: "Fast lane",
        wrap: "bg-white border border-amber-300",
        iconColor: "text-green-600",
      },
      {
        icon: Utensils,
        value: "$8",
        label: "Dining saved",
        hint: "10% at cafés",
        wrap: "bg-white border border-amber-300",
        iconColor: "text-orange-600",
      },
      {
        icon: Coffee,
        value: "1",
        label: "Lounge visit",
        hint: "Oasis refresh",
        wrap: "bg-white border border-amber-300",
        iconColor: "text-teal-600",
      },
      {
        icon: MapPin,
        value: "6",
        label: "Stops w/ perks",
        hint: "Along your route",
        wrap: "bg-white border border-amber-300",
        iconColor: "text-green-600",
      },
    ];
    const couldUse = [
      { icon: Bird, text: "Member-only feeding window (penguin)", note: "Eligible today" },
      { icon: Gift, text: "Gift shop — extra 5% on top of member price", note: "At exit plaza" },
      { icon: Star, text: "Carousel & tram — included ride credits", note: "2 rides used" },
    ];
    return (
      <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/90 p-3 shadow-sm">
        <h4 className="text-lg font-bold text-neutral-900 tracking-tight">Perks From Your Zoo Trip</h4>
        <p className="text-[12px] text-neutral-600 mt-0.5 mb-3 leading-snug">
          Sample totals for a Family Adventure day — perks Grace could use on this route.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s, i) => (
            <div key={i} className={`rounded-xl p-3 ${s.wrap}`}>
              <s.icon className={`${s.iconColor} mb-2`} size={22} strokeWidth={1.5} />
              <div className="text-2xl font-bold text-neutral-900 leading-none mb-1">{s.value}</div>
              <div className="text-[13px] font-semibold text-neutral-800">{s.label}</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">{s.hint}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/80 border border-amber-200/80 px-3 py-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <DollarSign className="text-amber-700 shrink-0" size={18} strokeWidth={2} />
            <span className="text-[13px] font-semibold text-neutral-800">Est. value unlocked today</span>
          </div>
          <span className="text-lg font-black text-green-800 tabular-nums">~$47</span>
        </div>
        <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide mt-3 mb-1.5">Could still use</p>
        <ul className="space-y-2">
          {couldUse.map((row, i) => (
            <li
              key={i}
              className="flex gap-2.5 rounded-lg bg-white/90 border border-neutral-200/80 px-2.5 py-2 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                <row.icon className="text-green-700" size={16} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-neutral-900 leading-snug">{row.text}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{row.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-[calc(50%-215px+1.5rem)] w-[51px] h-[51px] bg-[#0B827C] rounded-full shadow-[0_6px_24px_rgb(0,0,0,0.25)] flex items-center justify-center text-white hover:bg-[#0A7571] transition-all z-50"
          >
            <MessageCircle size={26} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Native Mobile Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col max-w-[430px] mx-auto shadow-2xl overflow-hidden"
          >
            {/* Header - iOS Style */}
            <div className="bg-white border-b border-neutral-100 px-4 pt-12 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/notification", {
                      state: { showSecondNotificationOnly: true },
                    });
                  }}
                  className="p-1 -ml-1"
                  aria-label="Back to lock screen"
                >
                  <ChevronLeft size={28} className="text-neutral-900" />
                </button>
                <h3 className="text-xl font-bold text-neutral-900 leading-tight">Metro Zoo Guide Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1">
                  <Phone size={24} className="text-neutral-900" />
                </button>
                <button className="p-1">
                  <MoreHorizontal size={24} className="text-neutral-900" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8 bg-[#F8FAFC]">
              {messages.map((message) => {
                const isWelcomeAssistant = message.sender === "assistant" && message.id === "welcome";
                if (isWelcomeAssistant) {
                  return (
                    <div key={message.id} className="w-full">
                      <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 gap-y-1">
                        {/* Left logo: bottom-aligned with the first message bubble only */}
                        <div className="row-start-1 col-start-1 self-end">
                          <MetroZooLogoAvatar />
                        </div>
                        {/* First message bubble only — logo stays in original left avatar column */}
                        <div className="row-start-1 col-start-2 min-w-0 max-w-[85%]">
                          <div
                            className="px-4 py-3 shadow-sm rounded-2xl w-full border bg-[#F0FDF4] border-[#BBF7D0] text-neutral-900 rounded-bl-none"
                          >
                            <p className="text-[14px] font-medium leading-relaxed">{message.text}</p>
                            <div className="flex justify-end mt-1">
                              <span className="text-[10px] font-bold text-neutral-400 uppercase">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row-start-2 col-start-2 w-full min-w-0 max-w-[85%]">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="w-full"
                          >
                            <MemberBenefitsCard />
                            <ValueTracker />
                            <ActionChips onFullItinerary={handleFullItinerary} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user"
                      ? "flex-row-reverse items-end"
                      : "flex-row items-end"
                  }`}
                >
                  {/* Left avatar */}
                  {message.sender === "user" ? (
                    <UserAvatar className="shadow-md" />
                  ) : (
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-md border border-white">
                      <div className="w-full h-full bg-green-700 flex items-center justify-center">
                        <Footprints size={16} className="text-white" />
                      </div>
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={`max-w-[85%] space-y-1 ${message.sender === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-3 shadow-sm rounded-2xl w-full border ${
                          message.sender === "user"
                            ? "bg-[#E0F2FE] border-[#BAE6FD] text-neutral-900 rounded-br-none"
                            : "bg-[#F0FDF4] border-[#BBF7D0] text-neutral-900 rounded-bl-none"
                        }`}
                      >
                        <p className="text-[14px] font-medium leading-relaxed">{message.text}</p>
                        {message.sender === "assistant" && message.itinerary && (
                          <div className="mt-3 pt-3 border-t border-[#BBF7D0] space-y-3">
                            <p className="text-[13px] font-bold text-neutral-800">
                              {message.itinerary.title} · {message.itinerary.duration}
                            </p>
                            <ol className="space-y-4 m-0 p-0 list-none">
                              {message.itinerary.stops.map((stop, idx) => {
                                const timeLine =
                                  stop.time ??
                                  familyAdventureItinerary.stops.find((x) => x.name === stop.name)?.time;
                                return (
                                  <li key={idx} className="flex gap-2 text-left">
                                    <span className="font-bold text-green-700 shrink-0 w-5 text-[14px] pt-0.5">{idx + 1}.</span>
                                    <div className="min-w-0 flex-1 flex flex-col gap-0">
                                      <span className="font-semibold text-neutral-900 text-[14px] leading-snug">{stop.name}</span>
                                      {timeLine ? (
                                        <span className="text-[14px] text-green-800 font-semibold leading-normal mt-1.5 block">
                                          {timeLine}
                                        </span>
                                      ) : null}
                                      <span className="text-[14px] text-neutral-600 leading-snug mt-2 block">{stop.detail}</span>
                                    </div>
                                  </li>
                                );
                              })}
                            </ol>
                          </div>
                        )}
                        <div className="flex justify-end mt-1">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                      {message.sender === "assistant" &&
                        message.tourSuggestionChips &&
                        message.tourSuggestionChips.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="w-full mt-2"
                          >
                            <p className="text-[13px] font-medium text-neutral-500 mb-2">
                              Suggestions for your tour
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {message.tourSuggestionChips.map((chip, i) => {
                                const isTripPerks = chip.action === "trip-perks";
                                const isTripPerksActive =
                                  isTripPerks && message.id === "itinerary-full" && showTripPerksPanel;
                                return (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      if (isTripPerks) {
                                        setShowTripPerksPanel((open) => !open);
                                        return;
                                      }
                                      setInputValue(chip.label);
                                    }}
                                    className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-full text-[14px] font-medium shadow-sm transition-colors text-left ${
                                      isTripPerksActive
                                        ? "bg-green-50 border-green-400 text-green-900 ring-1 ring-green-200"
                                        : "bg-white border-neutral-200 text-neutral-700 hover:border-green-300 hover:bg-green-50"
                                    }`}
                                  >
                                    <chip.icon size={14} className="text-green-600 shrink-0" />
                                    {chip.label}
                                  </button>
                                );
                              })}
                            </div>
                            {message.id === "itinerary-full" && showTripPerksPanel && <TripPerksUsedPanel />}
                          </motion.div>
                        )}
                  </div>
                </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Image Style */}
            <div className="p-4 bg-white border-t border-neutral-100 pb-8">
              <div className="flex items-center gap-3">
                <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                  <Plus size={24} strokeWidth={1.5} />
                </button>
                
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Ask your guide..." 
                    className="w-full bg-transparent border-none focus:outline-none text-[14px] text-neutral-900 py-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 text-neutral-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
                >
                  <Send size={24} strokeWidth={1.5} className={inputValue.trim() ? "text-blue-600" : ""} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
