import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Benefit } from "../data/mockData";
import { Calendar, DollarSign, Tag, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface BenefitModalProps {
  benefit: Benefit | null;
  isOpen: boolean;
  onClose: () => void;
  onRedeem: (benefitId: string) => void;
}

export function BenefitModal({ benefit, isOpen, onClose, onRedeem }: BenefitModalProps) {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);

  if (!benefit) return null;

  const handleRedeem = async () => {
    setIsRedeeming(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsRedeemed(true);
    onRedeem(benefit.id);
    setTimeout(() => {
      setIsRedeemed(false);
      setIsRedeeming(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{benefit.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="h-64 bg-neutral-200 rounded-lg overflow-hidden">
            <img 
              src={benefit.image} 
              alt={benefit.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-neutral-600">
                <DollarSign size={18} />
                <span className="text-sm font-medium">{benefit.value}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <Tag size={18} />
                <span className="text-sm font-medium capitalize">{benefit.category}</span>
              </div>
              {benefit.expiresAt && (
                <div className="flex items-center gap-2 text-orange-600">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">Expires {benefit.expiresAt}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-neutral-900">About this benefit</h3>
              <p className="text-neutral-700 leading-relaxed">{benefit.description}</p>
              <p className="text-neutral-600 mt-3 text-sm leading-relaxed">
                This exclusive member benefit gives you access to premium services and experiences. 
                Take advantage of this offer to maximize your membership value and enjoy unique perks 
                that enhance your lifestyle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-neutral-900">How to redeem</h3>
              <ol className="space-y-2 text-sm text-neutral-700">
                <li>1. Click the "{benefit.ctaText}" button below</li>
                <li>2. You'll receive a confirmation email with details</li>
                <li>3. Follow the instructions in the email to complete your booking</li>
                <li>4. Show your member ID when using the benefit</li>
              </ol>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg font-medium border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleRedeem}
              disabled={benefit.used || isRedeeming || isRedeemed}
              className={`flex-1 py-3 rounded-lg font-medium transition-all relative overflow-hidden ${
                benefit.used
                  ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  : isRedeemed
                  ? "bg-green-500 text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {isRedeemed ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  ✓ Redeemed!
                </motion.span>
              ) : isRedeeming ? (
                "Processing..."
              ) : benefit.used ? (
                "Already Used"
              ) : (
                benefit.ctaText
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}