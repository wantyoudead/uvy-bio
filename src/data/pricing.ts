import { CurrencyPackage } from '../types';

export const CURRENCY_PACKAGES: CurrencyPackage[] = [
  {
    id: 'pack_starter',
    name: 'Starter Stash',
    credits: 5000,
    bonusCredits: 0,
    priceUsd: 4.99,
    description: 'Perfect for trying out several rare & epic animated status effects.',
    icon: 'coins'
  },
  {
    id: 'pack_creator',
    name: 'Creator Vault',
    credits: 20000,
    bonusCredits: 5000,
    priceUsd: 14.99,
    badge: 'MOST POPULAR',
    popular: true,
    description: 'Unlocks all mythic & legendary animations plus custom styling setups.',
    icon: 'sparkles'
  },
  {
    id: 'pack_cosmic',
    name: 'Cosmic Singularity',
    credits: 75000,
    bonusCredits: 25000,
    priceUsd: 39.99,
    badge: 'BEST VALUE (+33% BONUS)',
    description: 'Instantly grants enough credits for Godly Galaxy Glow & Supernova Singularity.',
    icon: 'flame'
  },
  {
    id: 'pack_godly_treasury',
    name: 'Godly Sovereign Treasury',
    credits: 250000,
    bonusCredits: 100000,
    priceUsd: 89.99,
    badge: 'WHALE TIER (+40% BONUS)',
    popular: false,
    description: 'The ultimate credit stash. Instant unlock for Tachyon Quantum Overdrive and all store effects.',
    icon: 'crown'
  }
];

export interface SubscriptionPlan {
  id: 'free' | 'plus' | 'godly_vip';
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge?: string;
  highlight?: boolean;
  features: { text: string; included: boolean; godlyOnly?: boolean }[];
  creditsGrantedMonthly: number;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Member',
    tagline: 'Standard bio link page & basic customizer access',
    monthlyPrice: 0,
    yearlyPrice: 0,
    creditsGrantedMonthly: 0,
    features: [
      { text: 'Custom bio link (uvy.bio/handle)', included: true },
      { text: 'Default & Rare animated name effects', included: true },
      { text: 'Community forum participation & posting', included: true },
      { text: 'Member rank (3 stars) in forums', included: true },
      { text: 'Epic & Legendary status animations', included: false },
      { text: 'Godly Tier status effects (Singularity, Tachyon)', included: false },
      { text: 'Custom CSS raw styling injector', included: false },
      { text: 'Prismatic Hologram & Liquid Metal borders', included: false },
      { text: 'Hi-Fi Audio loop boosting & custom music', included: false },
      { text: '5-Star VIP forum badge & ranking', included: false }
    ]
  },
  {
    id: 'plus',
    name: 'uvy.bio PLUS',
    tagline: 'Enhanced aesthetics & monthly bonus credits for active creators',
    monthlyPrice: 6.99,
    yearlyPrice: 65,
    creditsGrantedMonthly: 10000,
    badge: 'POPULAR',
    features: [
      { text: 'Everything in Free Member', included: true },
      { text: '+10,000 Monthly Bonus Credits deposited', included: true },
      { text: 'Unlock all Epic & Legendary effects in store', included: true },
      { text: '4-Star Elite rank & green badge in forums', included: true },
      { text: 'Hi-Fi Audio loop boosting & custom music', included: true },
      { text: 'Card blur & opacity fine-tuning sliders', included: true },
      { text: 'Custom CSS raw styling injector', included: false },
      { text: 'Godly Tier status effects included for free', included: false },
      { text: 'Prismatic Hologram & Liquid Metal borders', included: false },
      { text: '5-Star Godly VIP rank & purple aura', included: false }
    ]
  },
  {
    id: 'godly_vip',
    name: 'uvy.bio GODLY VIP',
    tagline: 'The absolute pinnacle of status, exclusive effects & unlimited custom styling',
    monthlyPrice: 14.99,
    yearlyPrice: 140,
    creditsGrantedMonthly: 50000,
    badge: '★ GODLY STATUS',
    highlight: true,
    features: [
      { text: 'Everything in Free & PLUS tiers', included: true },
      { text: '+50,000 Monthly Bonus Credits deposited', included: true },
      { text: 'ALL 5 GODLY EFFECTS FREE (Tachyon, Galaxy, Halo, etc.)', included: true, godlyOnly: true },
      { text: 'Custom CSS Raw Styling Injector (Keyframes & animations)', included: true, godlyOnly: true },
      { text: 'Exclusive Prismatic Hologram & Liquid Metal borders', included: true, godlyOnly: true },
      { text: '5-Star VIP Founder rank & glowing purple aura in forums', included: true, godlyOnly: true },
      { text: 'Priority bio verification checkmark', included: true, godlyOnly: true },
      { text: 'Zero platform fees on community drops', included: true, godlyOnly: true },
      { text: 'Vanity handle reservation (uvy.bio/custom)', included: true, godlyOnly: true },
      { text: 'Direct discord VIP lounge access', included: true, godlyOnly: true }
    ]
  }
];
