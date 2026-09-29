import { NameEffect, ProfileBadge } from '../types';

export const NAME_EFFECTS: NameEffect[] = [
  // --- GODLY TIER (ULTRA EXCLUSIVE & EXPENSIVE) ---
  {
    id: 'quantum_overdrive',
    name: 'Tachyon Quantum Overdrive',
    rarity: 'Godly',
    price: 250000,
    description: 'The pinnacle 250k artifact. Active laser sweep beam, jittering holographic HUD corner brackets, crackling electric lightning arcs, and binary matrix telemetry.',
    tag: 'ULTIMATE',
    cssClass: 'effect-quantum_overdrive'
  },
  {
    id: 'divine_ascension',
    name: 'Celestial Seraph Halo',
    rarity: 'Godly',
    price: 175000,
    description: 'Sacred angelic ascension. Floating levitation halo, luminous flapping Seraph wings framing your name, ascending vertical god-rays, and falling golden holy dust.',
    tag: 'DIVINE',
    cssClass: 'effect-divine_ascension'
  },
  {
    id: 'void_black_hole',
    name: 'Event Horizon Black Hole',
    rarity: 'Godly',
    price: 120000,
    description: 'Relativistic gravitational singularity. Inward matter infall spiraling into the singularity, warped accretion lens, and deep dark-matter void shadow.',
    tag: 'SINGULARITY',
    cssClass: 'effect-void_black_hole'
  },
  {
    id: 'supernova_burst',
    name: 'Supernova Singularity',
    rarity: 'Godly',
    price: 85000,
    description: 'Thermonuclear stellar core collapse. Expanding supernova shockwave blast rings, crosshair horizontal & vertical lens flare spikes, and rising plasma embers.',
    tag: 'HYPERNOVA',
    cssClass: 'effect-supernova_burst'
  },
  {
    id: 'galaxy_glow',
    name: 'Galaxy Cosmic Glow',
    rarity: 'Godly',
    price: 50000,
    description: 'The supreme celestial status symbol. Planetary orbit system with 3 revolving cyan, pink & violet pulsar spheres and twinkling cosmic stars.',
    tag: 'CELESTIAL',
    cssClass: 'effect-galaxy_glow'
  },

  // --- MYTHIC, LEGENDARY, EPIC, RARE TIERS ---
  {
    id: 'golden_sparkle',
    name: 'Royal Golden Shimmer',
    rarity: 'Mythic',
    price: 1200,
    description: 'Polished 24k liquid gold finish with a traveling metallic light reflection.',
    tag: 'STATUS',
    cssClass: 'effect-golden_sparkle'
  },
  {
    id: 'diamond_frost',
    name: 'Diamond Ice Prism',
    rarity: 'Mythic',
    price: 1500,
    description: 'Pristine crystalline white with prismatic ice light refractions.',
    tag: 'EXCLUSIVE',
    cssClass: 'effect-diamond_frost'
  },
  {
    id: 'chroma_wave',
    name: 'Rainbow Chroma Wave',
    rarity: 'Legendary',
    price: 600,
    description: 'Signature guns.lol animated spectrum flow that pulses across your name.',
    tag: 'POPULAR',
    cssClass: 'effect-chroma_wave'
  },
  {
    id: 'burning_flame',
    name: 'Inferno Flame Aura',
    rarity: 'Legendary',
    price: 850,
    description: 'Deep crimson-to-amber blazing fire gradient with a radiant heat glow.',
    tag: 'HOT',
    cssClass: 'effect-burning_flame'
  },
  {
    id: 'cosmic_void',
    name: 'Cosmic Void & Nebula',
    rarity: 'Legendary',
    price: 750,
    description: 'Deep starlight purple space dust nebula with drifting starry highlights.',
    tag: 'AESTHETIC',
    cssClass: 'effect-cosmic_void'
  },
  {
    id: 'cyber_glitch',
    name: 'Cyberpunk Glitch',
    rarity: 'Epic',
    price: 450,
    description: 'Retro CRT chromatic aberration jitter with cyan and magenta split layers.',
    tag: 'RETRO',
    cssClass: 'effect-cyber_glitch'
  },
  {
    id: 'electric_plasma',
    name: 'High-Voltage Plasma',
    rarity: 'Epic',
    price: 500,
    description: 'Humming electric cyan-violet discharge that pulses with high energy.',
    tag: 'CYBER',
    cssClass: 'effect-electric_plasma'
  },
  {
    id: 'bloodmoon',
    name: 'Bloodmoon Eclipse',
    rarity: 'Epic',
    price: 550,
    description: 'Intense crimson occult aura with dark atmospheric shadow pulses.',
    tag: 'DARK',
    cssClass: 'effect-bloodmoon'
  },
  {
    id: 'neon_pulse',
    name: 'Hyper Neon Green',
    rarity: 'Rare',
    price: 350,
    description: 'Radioactive green neon tube bloom with continuous breathing luminance.',
    tag: 'VIBRANT',
    cssClass: 'effect-neon_pulse'
  },
  {
    id: 'none',
    name: 'Default Clean',
    rarity: 'Rare',
    price: 0,
    description: 'Minimalist clean typography with solid high-contrast rendering.',
    tag: 'FREE',
    cssClass: ''
  }
];

export const ALL_BADGES: ProfileBadge[] = [
  { id: 'verified', label: 'Verified', icon: 'check', color: '#38bdf8', tooltip: 'Officially Verified Profile' },
  { id: 'developer', label: 'Developer', icon: 'code', color: '#a855f7', tooltip: 'Core Platform Contributor' },
  { id: 'early', label: 'Early Supporter', icon: 'sparkles', color: '#f59e0b', tooltip: 'Joined During Beta Season' },
  { id: 'vip', label: 'VIP', icon: 'crown', color: '#ec4899', tooltip: 'VIP Member' },
  { id: 'og', label: 'OG Member', icon: 'flame', color: '#ef4444', tooltip: 'First 500 Registered UIDs' },
  { id: 'staff', label: 'Staff', icon: 'shield', color: '#10b981', tooltip: 'Community Moderator' }
];
