export type NameEffectId =
  | 'none'
  | 'galaxy_glow'
  | 'supernova_burst'
  | 'void_black_hole'
  | 'divine_ascension'
  | 'quantum_overdrive'
  | 'chroma_wave'
  | 'cyber_glitch'
  | 'golden_sparkle'
  | 'burning_flame'
  | 'electric_plasma'
  | 'diamond_frost'
  | 'cosmic_void'
  | 'bloodmoon'
  | 'neon_pulse';

export type FontStyleId = 'inter' | 'serif' | 'mono' | 'gothic' | 'cursive';

export interface NameEffect {
  id: NameEffectId;
  name: string;
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Godly';
  price: number;
  description: string;
  tag: string;
  cssClass: string;
}

export interface ProfileBadge {
  id: string;
  label: string;
  icon: string;
  color: string;
  tooltip: string;
}

export interface CustomLink {
  id: string;
  title: string;
  url: string;
  subtitle?: string;
  clicks: number;
  highlight?: boolean;
}

export interface SocialLink {
  platform: 'discord' | 'github' | 'twitter' | 'spotify' | 'steam' | 'twitch' | 'youtube';
  url: string;
}

export interface ProfileData {
  id: string;
  handle: string;
  displayName: string;
  pronouns: string;
  nameEffect: NameEffectId;
  fontStyle: FontStyleId;
  namePrefix?: string;
  nameSuffix?: string;
  bio: string;
  avatarUrl: string;
  bannerGradient: string;
  accentColor: string;
  badges: string[];
  discord: {
    tag: string;
    status: 'online' | 'idle' | 'dnd' | 'offline';
    activity: string;
    details: string;
  };
  music: {
    title: string;
    artist: string;
    duration: string;
  };
  uid: number;
  views: number;
  joined: string;
  socials: SocialLink[];
  links: CustomLink[];
  styling: {
    cardBlur: number;
    cardOpacity: number;
    borderGlow: boolean;
    borderStyle: 'glow' | 'solid' | 'metal' | 'dashed' | 'hologram' | 'chroma';
    borderRadius: number;
    backgroundEffect: 'particles' | 'stars' | 'mesh' | 'pure_black' | 'grid';
    typewriter: boolean;
    clickToEnter: boolean;
    customCss?: string;
    holographicBorder?: boolean;
    audioBoost?: boolean;
    vipAura?: boolean;
  };
}

export interface UserForumStats {
  rankTitle: string;
  rankColor: string;
  stars: number; // 1 to 5
  starColor: string;
  joinDate: string;
  posts: number;
  reputation: number;
  repPower: number;
  repPips: number; // 1-5 green squares
  points: number;
  level: number;
  levelProgress: number; // 0-100%
  pointsNeeded: number;
  activity: number; // e.g. 92.4%
  achievements: string[]; // e.g. ['🥇', '🎖️', '🗓️', '💎']
}

export interface ForumComment {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  authorEffect?: NameEffectId;
  authorStats?: UserForumStats;
  time: string;
  text: string;
}

export interface ForumThread {
  id: string;
  title: string;
  category: 'Showcases' | 'Themes & CSS' | 'Audio & Music' | 'General';
  author: string;
  handle: string;
  avatar: string;
  authorEffect?: NameEffectId;
  authorStats?: UserForumStats;
  time: string;
  upvotes: number;
  hasUpvoted: boolean;
  content: string;
  tags: string[];
  views: number;
  comments: ForumComment[];
}

export type SubscriptionTier = 'free' | 'plus' | 'godly_vip';

export interface UserSubscription {
  tier: SubscriptionTier;
  billingCycle: 'monthly' | 'yearly';
  expiresAt: string;
  isActive: boolean;
  autoRenew: boolean;
}

export interface CurrencyPackage {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  priceUsd: number;
  badge?: string;
  popular?: boolean;
  description: string;
  icon: string;
}
