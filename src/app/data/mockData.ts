import { babyPenguinChickUrl } from "../constants/media";

export interface Benefit {
  id: string;
  title: string;
  category: "events" | "discounts" | "experiences" | "conservation" | "education";
  description: string;
  value: string;
  image: string;
  used: boolean;
  expiresAt?: string;
  ctaText: string;
}

export interface UserStats {
  name: string;
  memberSince: string;
  tier: "Gold" | "Silver" | "Platinum";
  totalSavings: number;
  perksUsedThisMonth: number;
  eventsAttended: number;
  streakDays: number;
}

export interface Activity {
  id: string;
  type: "perk" | "event" | "milestone";
  title: string;
  date: string;
  value?: number;
}

export interface Notification {
  id: string;
  type: "new_benefit" | "reminder" | "event" | "milestone" | "video";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface VirtualEvent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  points: number;
  startTime: Date;
  duration: string;
  attendees: number;
  category: "livestream" | "workshop" | "qa" | "tour";
  isLive?: boolean;
}

export interface PointsReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  unlocked: boolean;
  icon: string;
}

export const userStats: UserStats = {
  name: "Grace Chen",
  memberSince: "June 10th, 2026",
  tier: "Gold",
  totalSavings: 50,
  perksUsedThisMonth: 1,
  eventsAttended: 2,
  streakDays: 3,
};

export const benefits: Benefit[] = [
  {
    id: "1",
    title: "Red Panda Encounter",
    category: "experiences",
    description: "Get up close with our adorable red pandas during feeding time",
    value: "$45 value",
    image: "https://images.unsplash.com/photo-1687092932883-21ec7eecd85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBwYW5kYSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzc0MzExNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    ctaText: "Book Experience",
  },
  {
    id: "2",
    title: "Behind-the-Scenes: Elephant Care",
    category: "events",
    description: "Join our elephant keepers for an exclusive look at daily care routines",
    value: "Free for members",
    image: "https://images.unsplash.com/photo-1475265582030-e0247dbdc82c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMGZhbWlseSUyMHpvb3xlbnwxfHx8fDE3NzQzNzk3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    expiresAt: "2026-06-28",
    ctaText: "RSVP",
  },
  {
    id: "3",
    title: "Penguin Plunge Experience",
    category: "experiences",
    description: "Watch our penguins dive and swim in their underwater habitat",
    value: "$30 value",
    image: "https://images.unsplash.com/photo-1685143288924-945cabda4717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ndWluJTIwc3dpbW1pbmclMjB1bmRlcndhdGVyfGVufDF8fHx8MTc3NDM3OTcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    ctaText: "Reserve Spot",
  },
  {
    id: "4",
    title: "Wildlife Conservation Workshops",
    category: "education",
    description: "Learn about global conservation efforts and how you can help",
    value: "Free access",
    image: "https://images.unsplash.com/photo-1667377532685-7048d322143e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uJTIwcHJpZGUlMjBzYWZhcml8ZW58MXx8fHwxNzc0Mzc5NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: true,
    ctaText: "Join Workshop",
  },
  {
    id: "5",
    title: "Giraffe Feeding Platform Access",
    category: "experiences",
    description: "Hand-feed our gentle giants from our exclusive viewing platform",
    value: "$35 value",
    image: "https://images.unsplash.com/photo-1645978293086-4a13212f2a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJhZmZlJTIwZWF0aW5nJTIwbGVhdmVzfGVufDF8fHx8MTc3NDM3OTcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    ctaText: "Book Now",
  },
  {
    id: "6",
    title: "Sunset Safari Tour",
    category: "events",
    description: "Guided evening tour through our African savanna exhibit",
    value: "Free for Gold+",
    image: "https://images.unsplash.com/photo-1759273871890-6d9b2108a837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3JpbGxhJTIwZmFtaWx5JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0Mzc5NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: true,
    expiresAt: "2026-06-30",
    ctaText: "Join Tour",
  },
  {
    id: "7",
    title: "Gift Shop Discount",
    category: "discounts",
    description: "20% off all merchandise, books, and educational materials",
    value: "Save up to $50",
    image: "https://images.unsplash.com/photo-1667842287139-183a4b856110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJpcmRzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzc0Mzc5NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    ctaText: "Shop Now",
  },
  {
    id: "8",
    title: "Sea Otter Keeper Talk",
    category: "education",
    description: "Interactive session with our marine mammal specialists",
    value: "Included",
    image: "https://images.unsplash.com/photo-1751949246697-a11c754b648d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBvdHRlciUyMHBsYXlpbmd8ZW58MXx8fHwxNzc0Mzc5NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    ctaText: "Attend Talk",
  },
  {
    id: "9",
    title: "Big Cat Photography Workshop",
    category: "events",
    description: "Learn wildlife photography with our resident tigers and lions",
    value: "$85 value",
    image: "https://images.unsplash.com/photo-1710639046619-b69fa8b71536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWdlciUyMHBvcnRyYWl0JTIwem9vfGVufDF8fHx8MTc3NDM3OTcyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    expiresAt: "2026-07-15",
    ctaText: "Register",
  },
  {
    id: "10",
    title: "Lemur Forest Walkthrough",
    category: "experiences",
    description: "Walk among free-roaming lemurs in our Madagascar habitat",
    value: "$25 value",
    image: "https://images.unsplash.com/photo-1660359410606-0945987d5a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW11ciUyMHJpbmclMjB0YWlsfGVufDF8fHx8MTc3NDM3OTcyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    used: false,
    expiresAt: "2026-06-27",
    ctaText: "Book Visit",
  },
];

export const recentActivities: Activity[] = [
  {
    id: "1",
    type: "milestone",
    title: "Became a member!",
    date: "June 10th, 2026",
  },
  {
    id: "2",
    type: "event",
    title: "Attended first zoo visit",
    date: "June 10th, 2026",
    value: 25,
  },
];

export const notifications: Notification[] = [
  {
    id: "1",
    type: "video",
    title: "🐧 Baby Penguins Are Hatching LIVE — Join & Earn 50 Points",
    description: "Watch adorable penguin chicks break free from their eggs right now! Tap to join the livestream.",
    time: "Just now",
    read: false,
  },
  {
    id: "2",
    type: "event",
    title: "New Event This Weekend",
    description: "Big Cat Photography Workshop - limited spots available",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "reminder",
    title: "Explore your member benefits",
    description: "You have amazing experiences waiting to be booked",
    time: "2 days ago",
    read: false,
  },
  {
    id: "4",
    type: "milestone",
    title: "Welcome to Metro Zoo!",
    description: "Start earning points by attending events and visiting the zoo",
    time: "June 10th, 2026",
    read: true,
  },
];

export const monthlyData = [
  { month: "Jun", savings: 50, perks: 1 },
];

export const memberStories = [
  {
    id: "1",
    name: "Michael Chen",
    image: "professional man headshot",
    story: "My kids learned so much from the conservation workshops!",
    role: "Gold Member",
  },
  {
    id: "2",
    name: "Sarah Williams",
    image: "professional woman headshot",
    story: "The behind-the-scenes tours gave us unforgettable experiences.",
    role: "Platinum Member",
  },
  {
    id: "3",
    name: "David Rodriguez",
    image: "professional man portrait",
    story: "Supporting wildlife conservation while enjoying amazing benefits!",
    role: "Gold Member",
  },
];

// Virtual Events
export const virtualEvents: VirtualEvent[] = [
  {
    id: "ve-1",
    title: "Baby Penguin Hatching 🐧",
    description: "Watch our Gentoo penguin chick emerge live from its egg!",
    thumbnail: babyPenguinChickUrl,
    points: 50,
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: "45 min",
    attendees: 847,
    category: "livestream",
    isLive: false,
  },
  {
    id: "ve-2",
    title: "Zookeeper Q&A: Big Cats",
    description: "Ask our tiger and lion experts anything about these magnificent predators",
    thumbnail: "https://images.unsplash.com/photo-1710639046619-b69fa8b71536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWdlciUyMHBvcnRyYWl0JTIwem9vfGVufDF8fHx8MTc3NDM3OTcyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    points: 35,
    startTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
    duration: "30 min",
    attendees: 623,
    category: "qa",
    isLive: false,
  },
  {
    id: "ve-3",
    title: "Virtual Safari: African Savanna 🦁",
    description: "Join us for a live tour of our lions, giraffes, and zebras",
    thumbnail: "https://images.unsplash.com/photo-1667377532685-7048d322143e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uJTIwcHJpZGUlMjBzYWZhcml8ZW58MXx8fHwxNzc0Mzc5NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: 40,
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: "60 min",
    attendees: 1243,
    category: "tour",
    isLive: false,
  },
  {
    id: "ve-4",
    title: "Conservation Workshop: Ocean Life",
    description: "Learn how we're protecting sea otters and marine ecosystems",
    thumbnail: "https://images.unsplash.com/photo-1751949246697-a11c754b648d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBvdHRlciUyMHBsYXlpbmd8ZW58MXx8fHwxNzc0Mzc5NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: 45,
    startTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
    duration: "40 min",
    attendees: 512,
    category: "workshop",
    isLive: false,
  },
];

// Points & Rewards
export const pointsRewards: PointsReward[] = [
  {
    id: "r-1",
    title: "Free Guest Pass",
    description: "Bring a friend to the zoo for free",
    pointsRequired: 100,
    unlocked: false,
    icon: "🎟️",
  },
  {
    id: "r-2",
    title: "VIP Family Photo Session",
    description: "Professional photoshoot with our animals",
    pointsRequired: 250,
    unlocked: false,
    icon: "📸",
  },
  {
    id: "r-3",
    title: "Behind-the-Scenes Tour",
    description: "Exclusive access to animal care areas",
    pointsRequired: 500,
    unlocked: false,
    icon: "🚪",
  },
  {
    id: "r-4",
    title: "Penguin Habitat Sponsor",
    description: "Support penguin conservation efforts",
    pointsRequired: 750,
    unlocked: false,
    icon: "🐧",
  },
  {
    id: "r-5",
    title: "Premium Upgrade (1 Year)",
    description: "Upgrade to Premium membership",
    pointsRequired: 1000,
    unlocked: false,
    icon: "💎",
  },
];

// Current user points balance
export const userPoints = {
  current: 15,
  totalEarned: 15,
  nextRewardAt: 100,
};