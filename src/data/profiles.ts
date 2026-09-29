import { ProfileData, ForumThread } from '../types';

export const INITIAL_PROFILES: ProfileData[] = [
  {
    id: 'uvy',
    handle: 'uvy',
    displayName: 'uvy',
    pronouns: 'he/they',
    nameEffect: 'galaxy_glow',
    fontStyle: 'inter',
    namePrefix: '[OWNER]',
    nameSuffix: '★',
    bio: 'founder of uvy.bio · orchestrating next-gen aesthetic links, status effects & custom bio cards',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop&q=80',
    bannerGradient: 'linear-gradient(135deg, rgba(88, 28, 135, 0.5), rgba(15, 23, 42, 0.95))',
    accentColor: '#a855f7',
    badges: ['verified', 'developer', 'early', 'vip', 'og'],
    discord: {
      tag: 'uvy#0001',
      status: 'online',
      activity: 'Playing VALORANT',
      details: 'Competitive · Radiant Lobby'
    },
    music: {
      title: 'Midnight Drive (Lo-fi)',
      artist: 'uvy.bio soundworks',
      duration: '02:45'
    },
    uid: 1,
    views: 184500,
    joined: 'Jan 2013',
    socials: [
      { platform: 'discord', url: 'https://discord.gg' },
      { platform: 'github', url: 'https://github.com' },
      { platform: 'twitter', url: 'https://x.com' },
      { platform: 'twitch', url: 'https://twitch.tv' },
      { platform: 'spotify', url: 'https://spotify.com' }
    ],
    links: [
      { id: 'l1', title: 'Effects Store & Perk Shop', subtitle: 'Browse animated status effects for your name', url: '#store', clicks: 12400, highlight: true },
      { id: 'l2', title: 'Official Discord Community', subtitle: 'Join 18,000+ creators and gamers', url: 'https://discord.gg', clicks: 9810 },
      { id: 'l3', title: 'Linux Dotfiles & Neovim Setup', subtitle: 'Hyprland, Waybar & transparent themes', url: 'https://github.com', clicks: 4210 },
      { id: 'l4', title: 'Late Night Coding Synthwave', subtitle: 'Curated 24/7 lo-fi playlist', url: 'https://spotify.com', clicks: 3120 }
    ],
    styling: {
      cardBlur: 24,
      cardOpacity: 0.65,
      borderGlow: true,
      borderStyle: 'glow',
      borderRadius: 18,
      backgroundEffect: 'particles',
      typewriter: true,
      clickToEnter: true
    }
  },
  {
    id: 'phantom',
    handle: 'phantom',
    displayName: 'phantom',
    pronouns: 'they/them',
    nameEffect: 'void_black_hole',
    fontStyle: 'mono',
    namePrefix: '[ADMIN]',
    nameSuffix: '',
    bio: 'kernel security researcher & reverse engineer · breaking hypervisors and low-level sandbox protections',
    avatarUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&q=80',
    bannerGradient: 'linear-gradient(135deg, rgba(6, 78, 59, 0.45), rgba(2, 6, 23, 0.95))',
    accentColor: '#10b981',
    badges: ['verified', 'developer', 'og'],
    discord: {
      tag: 'phantom#1337',
      status: 'idle',
      activity: 'Visual Studio Code',
      details: 'kernel_bypass.c · 4 hrs'
    },
    music: {
      title: 'Nightcall (Cyber Synth)',
      artist: 'Phantom Labs',
      duration: '03:12'
    },
    uid: 7,
    views: 89400,
    joined: 'Feb 2018',
    socials: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'twitter', url: 'https://x.com' },
      { platform: 'discord', url: 'https://discord.gg' }
    ],
    links: [
      { id: 'p1', title: 'Security Research CVE Disclosures', subtitle: 'Public vulnerability audit writeups', url: 'https://github.com', clicks: 6120, highlight: true },
      { id: 'p2', title: 'PGP Public Key', subtitle: 'Fingerprint: 4E9A 12BF 88CD', url: 'https://keybase.io', clicks: 1250 }
    ],
    styling: {
      cardBlur: 20,
      cardOpacity: 0.75,
      borderGlow: true,
      borderStyle: 'metal',
      borderRadius: 14,
      backgroundEffect: 'grid',
      typewriter: true,
      clickToEnter: false
    }
  },
  {
    id: 'luna',
    handle: 'luna',
    displayName: 'luna',
    pronouns: 'she/her',
    nameEffect: 'divine_ascension',
    fontStyle: 'cursive',
    namePrefix: '♡',
    nameSuffix: '♡',
    bio: 'ambient music producer & visual sound designer · crafting midnight tape loops and nostalgic chillout beats',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80',
    bannerGradient: 'linear-gradient(135deg, rgba(131, 24, 67, 0.45), rgba(24, 24, 27, 0.95))',
    accentColor: '#f43f5e',
    badges: ['verified', 'vip', 'early'],
    discord: {
      tag: 'luna#9999',
      status: 'dnd',
      activity: 'Ableton Live 12',
      details: 'Mastering "ethereal_dreams.als"'
    },
    music: {
      title: 'Ethereal Dreams (Tape Mix)',
      artist: 'Luna',
      duration: '02:30'
    },
    uid: 13,
    views: 64200,
    joined: 'Mar 2021',
    socials: [
      { platform: 'spotify', url: 'https://spotify.com' },
      { platform: 'twitch', url: 'https://twitch.tv' },
      { platform: 'twitter', url: 'https://x.com' },
      { platform: 'discord', url: 'https://discord.gg' }
    ],
    links: [
      { id: 'u1', title: 'Stream My New EP on Spotify', subtitle: 'Warm analog synthesizer harmonies', url: 'https://spotify.com', clicks: 8900, highlight: true },
      { id: 'u2', title: 'Sound Design Sample Packs', subtitle: 'Free Roland Juno-106 & DX7 presets', url: 'https://gumroad.com', clicks: 3410 }
    ],
    styling: {
      cardBlur: 28,
      cardOpacity: 0.6,
      borderGlow: true,
      borderStyle: 'glow',
      borderRadius: 22,
      backgroundEffect: 'stars',
      typewriter: true,
      clickToEnter: true
    }
  }
];

export const INITIAL_THREADS: ForumThread[] = [
  {
    id: 'f-1',
    title: 'Showcase: Just unlocked the Godly Galaxy Cosmic Glow on uvy.bio — rate my setup!',
    category: 'Showcases',
    author: 'uvy',
    handle: '@uvy',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&h=160&fit=crop&q=80',
    authorEffect: 'galaxy_glow',
    authorStats: {
      rankTitle: 'Founder & Owner',
      rankColor: '#a855f7',
      stars: 5,
      starColor: '#facc15',
      joinDate: 'Jan 2013',
      posts: 2418,
      reputation: 9840,
      repPower: 1520,
      repPips: 5,
      points: 89450,
      level: 99,
      levelProgress: 94,
      pointsNeeded: 550,
      activity: 98.6,
      achievements: ['👑', '💎', '🛡️', '🏆']
    },
    time: '3rd September 2026, 04:50 PM',
    upvotes: 142,
    hasUpvoted: false,
    content:
      '[b][color=#facc15]★ Founder Showcase:[/color][/b] The new [b][color=#a855f7]Godly Galaxy Cosmic Glow[/color][/b] and [b][color=#38bdf8]Tachyon Quantum Overdrive[/color][/b] effects are officially live on uvy.bio!\n\nHere is a screenshot of my current bio setup featuring the new 3D spinning stars and liquid holographic border:\n[img]https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop&q=80[/img]\n\nCheck out the raw CSS styling for dark mode:\n[code].bio-card-wrapper {\n  background: rgba(10, 10, 12, 0.85);\n  box-shadow: 0 0 35px #a855f7;\n  border-radius: 18px;\n}[/code]\n\nWhat are your thoughts on the new 3D spinning rank stars and non-repetitive Godly mechanics?',
    tags: ['#showcase', '#godly', '#galaxyglow', '#badges'],
    views: 3420,
    comments: [
      {
        id: 'c1',
        author: 'phantom',
        handle: '@phantom',
        avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=160&h=160&fit=crop&q=80',
        authorEffect: 'void_black_hole',
        authorStats: {
          rankTitle: 'Lead Administrator',
          rankColor: '#ef4444',
          stars: 5,
          starColor: '#ef4444',
          joinDate: 'Feb 2018',
          posts: 1842,
          reputation: 7120,
          repPower: 980,
          repPips: 5,
          points: 64200,
          level: 74,
          levelProgress: 68,
          pointsNeeded: 1200,
          activity: 91.2,
          achievements: ['🛡️', '⚡', '💻', '🎖️']
        },
        time: '3rd September 2026, 05:12 PM',
        text: '[quote=@uvy]\nThe new Godly Galaxy Cosmic Glow and Tachyon Quantum Overdrive effects are officially live on uvy.bio!\n[/quote]\n\n[color=#38bdf8]Looks unreal![/color] The [b]3D spinning stars[/b] under the rank make the forum cards feel just like UnknownCheats. The inward gravitational infall on Event Horizon is so clean.'
      },
      {
        id: 'c2',
        author: 'luna',
        handle: '@luna',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&q=80',
        authorEffect: 'divine_ascension',
        authorStats: {
          rankTitle: 'VIP Sound Designer',
          rankColor: '#ec4899',
          stars: 4,
          starColor: '#ec4899',
          joinDate: 'Mar 2021',
          posts: 942,
          reputation: 4920,
          repPower: 640,
          repPips: 4,
          points: 38100,
          level: 48,
          levelProgress: 45,
          pointsNeeded: 850,
          activity: 84.5,
          achievements: ['🎵', '💖', '🎨', '🌟']
        },
        time: '3rd September 2026, 05:35 PM',
        text: 'The [b][color=#f43f5e]Celestial Seraph Halo[/color][/b] with the flapping wings matches my ambient sound aesthetic so cleanly! Here is a snapshot of my audio studio setup:\n[img]https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&fit=crop&q=80[/img]'
      }
    ]
  },
  {
    id: 'f-2',
    title: 'CSS Trick: Stacking Chroma Wave animation with glowing text-shadow',
    category: 'Themes & CSS',
    author: 'Sarah Chen',
    handle: '@schen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&q=80',
    authorEffect: 'chroma_wave',
    authorStats: {
      rankTitle: 'Elite Member',
      rankColor: '#22c55e',
      stars: 4,
      starColor: '#22c55e',
      joinDate: 'Aug 2022',
      posts: 412,
      reputation: 1850,
      repPower: 310,
      repPips: 4,
      points: 18900,
      level: 26,
      levelProgress: 52,
      pointsNeeded: 940,
      activity: 76.2,
      achievements: ['🎖️', '🗓️', '⭐']
    },
    time: '2nd September 2026, 11:20 AM',
    upvotes: 68,
    hasUpvoted: false,
    content:
      '[b][color=#10b981]Developer Tip:[/color][/b] For anyone customizing their bio cards, here is how you can pair the Rainbow Chroma Wave effect with subtle backdrop-blur:\n\n[code]/* Custom High-Contrast Backdrop */\n.bio-card-wrapper {\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n}[/code]\n\n[img]https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop&q=80[/img]\n\nFeel free to test it in the customizer!',
    tags: ['#css', '#chromawave', '#typography', '#snippet'],
    views: 1820,
    comments: []
  },
  {
    id: 'f-3',
    title: 'Which Godly animated effect has the ultimate status symbol on bio cards?',
    category: 'General',
    author: 'Marcus V',
    handle: '@mvance',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&q=80',
    authorEffect: 'supernova_burst',
    authorStats: {
      rankTitle: 'Member',
      rankColor: '#38bdf8',
      stars: 3,
      starColor: '#38bdf8',
      joinDate: 'Jan 2013',
      posts: 74,
      reputation: 439,
      repPower: 335,
      repPips: 3,
      points: 11368,
      level: 13,
      levelProgress: 29,
      pointsNeeded: 932,
      activity: 13.9,
      achievements: ['🥇', '🎖️', '🗓️']
    },
    time: '1st September 2026, 09:14 PM',
    upvotes: 52,
    hasUpvoted: false,
    content:
      'The [b][color=#f97316]Supernova Singularity[/color][/b] has the expanding shockwaves and crosshair flare spikes, while [b][color=#06b6d4]Tachyon Quantum Overdrive[/color][/b] has the sweeping laser scanner.\n\n[img]https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&fit=crop&q=80[/img]\n\nWhich one are you saving up credits to buy?',
    tags: ['#status', '#store', '#godly', '#quantum'],
    views: 1450,
    comments: []
  }
];
