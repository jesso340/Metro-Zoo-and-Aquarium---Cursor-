import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Award, X, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  points?: number;
  buttons?: { label: string; value: string; points?: number }[];
}

interface ZooAssistantLivestreamProps {
  streamId: string;
  onPointsEarned: (points: number) => void;
}

export function ZooAssistantLivestream({ streamId, onPointsEarned }: ZooAssistantLivestreamProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasAnsweredQuestion, setHasAnsweredQuestion] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Proactive assistant messages for penguin stream
  useEffect(() => {
    if (streamId === "baby-penguin-hatching") {
      // Welcome message
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: "Welcome Grace! 👋 I'm so excited you're here for the baby penguin hatching! I'll help guide you through this magical moment. You've already earned 5 points just for joining! 🎉",
          sender: "assistant",
          timestamp: new Date(),
          points: 5
        };
        setMessages([welcomeMessage]);
        onPointsEarned(5);
      }, 1000);

      // Fun fact
      setTimeout(() => {
        const factMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "🐧 Fun Fact: African penguin eggs take 38-42 days to hatch! The chick uses a special egg tooth to break through the shell. Watch closely - you might see it!",
          sender: "assistant",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, factMessage]);
      }, 8000);

      // Key moment alert
      setTimeout(() => {
        const keyMoment: Message = {
          id: (Date.now() + 2).toString(),
          text: "🎯 Key Moment Alert: The egg is starting to crack! This is called 'pipping' - it's the first sign of hatching. The chick is working hard in there!",
          sender: "assistant",
          timestamp: new Date(),
          points: 10
        };
        setMessages(prev => [...prev, keyMoment]);
        onPointsEarned(10);
      }, 15000);

      // Interactive question
      setTimeout(() => {
        const questionMessage: Message = {
          id: (Date.now() + 3).toString(),
          text: "🤔 Quick Question: How can YOU help protect penguins in the wild?",
          sender: "assistant",
          timestamp: new Date(),
          buttons: [
            { label: "Support conservation", value: "conservation", points: 10 },
            { label: "Reduce plastic use", value: "plastic", points: 10 },
            { label: "Spread awareness", value: "awareness", points: 10 }
          ]
        };
        setMessages(prev => [...prev, questionMessage]);
      }, 25000);

      // Another key moment
      setTimeout(() => {
        const hatchingMessage: Message = {
          id: (Date.now() + 4).toString(),
          text: "🎊 Amazing! The chick is breaking through! Look at those tiny flippers! You're witnessing something truly special. +15 points for staying engaged!",
          sender: "assistant",
          timestamp: new Date(),
          points: 15
        };
        setMessages(prev => [...prev, hatchingMessage]);
        onPointsEarned(15);
      }, 35000);

      // Impact opportunity
      setTimeout(() => {
        const impactMessage: Message = {
          id: (Date.now() + 5).toString(),
          text: "💚 Your points are making a difference! Would you like to apply 20 points toward penguin habitat restoration? This directly supports our conservation work.",
          sender: "assistant",
          timestamp: new Date(),
          buttons: [
            { label: "Yes, donate points", value: "donate", points: 5 },
            { label: "Learn more first", value: "learn", points: 0 }
          ]
        };
        setMessages(prev => [...prev, impactMessage]);
      }, 45000);
    }
  }, [streamId]);

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

    // Simple response logic
    setTimeout(() => {
      let responseText = "";
      const lowerInput = inputValue.toLowerCase();

      if (lowerInput.includes("how") || lowerInput.includes("what") || lowerInput.includes("when")) {
        responseText = "Great question! Our zookeeper team is working to provide the best care for these adorable chicks. Each penguin has unique personality traits that emerge as they grow! 🐧";
      } else if (lowerInput.includes("cute") || lowerInput.includes("adorable") || lowerInput.includes("love")) {
        responseText = "I know, right?! Baby penguins are absolutely precious. Did you know they'll grow their waterproof feathers in about 60-90 days? +5 points for your enthusiasm! 💙";
        onPointsEarned(5);
      } else {
        responseText = "Thanks for engaging with the stream! Every interaction helps support our conservation efforts. Keep watching for more amazing moments! ✨";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 800);
  };

  const handleButtonClick = (button: { label: string; value: string; points?: number }) => {
    if (hasAnsweredQuestion && button.points) {
      return; // Prevent multiple answers
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: button.label,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    if (button.points) {
      setHasAnsweredQuestion(true);
    }

    setTimeout(() => {
      let responseText = "";
      
      if (button.value === "conservation" || button.value === "plastic" || button.value === "awareness") {
        responseText = `Excellent answer! ${button.label === "Support conservation" ? "Supporting conservation organizations" : button.label === "Reduce plastic use" ? "Reducing plastic pollution" : "Spreading awareness"} makes a real difference for penguins. +${button.points} points! 🌟`;
        if (button.points) {
          onPointsEarned(button.points);
        }
      } else if (button.value === "donate") {
        responseText = "Thank you for your generosity! Your 20 points have been applied to penguin habitat restoration. You're making a real impact! +5 bonus points for your commitment! 💚";
        onPointsEarned(button.points || 0);
      } else if (button.value === "learn") {
        responseText = "African penguins are endangered with only about 41,000 left in the wild. Climate change, overfishing, and habitat loss are major threats. Every bit of support helps! 🐧";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
            style={{ position: 'fixed', bottom: '2rem', right: '1.5rem', zIndex: 60 }}
            className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-2xl flex items-center justify-center text-white hover:from-green-700 hover:to-green-800 transition-all relative md:bottom-8 md:right-8"
          >
            {/* Pulsing Red Notification Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ position: 'fixed', bottom: '2rem', right: '1.5rem', zIndex: 60 }}
            className="w-[90vw] md:w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 md:bottom-8 md:right-8"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Live Assistant</h3>
                  <p className="text-xs text-green-100">Guiding your experience</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-white" size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[80%]">
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-green-600 text-white"
                          : "bg-white border border-neutral-200 text-neutral-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.points && message.points > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                          <Award size={14} />
                          <span>+{message.points} points earned</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Button options */}
                    {message.buttons && message.buttons.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.buttons.map((button, index) => (
                          <button
                            key={index}
                            onClick={() => handleButtonClick(button)}
                            disabled={hasAnsweredQuestion && !!button.points}
                            className="w-full bg-white hover:bg-neutral-50 disabled:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-900 border border-neutral-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left"
                          >
                            {button.label}
                            {button.points && <span className="ml-2 text-green-600">+{button.points} pts</span>}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-green-100 text-right" : "text-neutral-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <div className="flex items-end gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  style={{ maxHeight: "100px" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-xl p-3 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}