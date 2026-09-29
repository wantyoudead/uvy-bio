import React, { useState, useEffect } from 'react';
import {
  User,
  Sliders,
  MessageSquare,
  Compass,
  ShoppingBag,
  Volume2,
  VolumeX,
  Share2,
  CheckCircle,
  Headphones,
  Coins,
  Crown
} from 'lucide-react';
import { ProfileData, NameEffect, NameEffectId, ForumThread, CurrencyPackage, UserSubscription, SubscriptionTier } from './types';
import { INITIAL_PROFILES, INITIAL_THREADS } from './data/profiles';
import { soundEngine } from './audioEngine';
import { BioCard } from './components/BioCard';
import { CustomizeStudio } from './components/CustomizeStudio';
import { EffectsStore } from './components/EffectsStore';
import { PricingStore } from './components/PricingStore';
import { ForumView, NewThreadModal } from './components/ForumView';
import { ExploreProfiles } from './components/ExploreProfiles';
import { BackgroundRenderer } from './components/BackgroundRenderer';

export default function App() {
  const [currentView, setCurrentView] = useState<'bio' | 'store' | 'customize' | 'forum' | 'explore' | 'pricing'>('bio');
  const [profiles, setProfiles] = useState<ProfileData[]>(INITIAL_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string>('uvy');

  // Subscription state
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'free',
    billingCycle: 'yearly',
    expiresAt: '2027-09-29',
    isActive: true,
    autoRenew: true
  });

  // Name Effects Store & Credits state
  const [userCredits, setUserCredits] = useState<number>(2450);
  const [ownedEffects, setOwnedEffects] = useState<NameEffectId[]>([
    'none',
    'chroma_wave',
    'golden_sparkle'
  ]);

  // Audio & Splash state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.8);
  const [hasEntered, setHasEntered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Forum state
  const [threads, setThreads] = useState<ForumThread[]>(INITIAL_THREADS);
  const [forumCategory, setForumCategory] = useState<string>('All');
  const [forumSearch, setForumSearch] = useState<string>('');
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(null);
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);

  // Active Profile
  const currentProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState('');
  useEffect(() => {
    if (!currentProfile.styling.typewriter) {
      setTypewriterText(currentProfile.bio);
      return;
    }
    let idx = 0;
    setTypewriterText('');
    const bioStr = currentProfile.bio;
    const timer = setInterval(() => {
      if (idx < bioStr.length) {
        setTypewriterText(bioStr.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(timer);
      }
    }, 28);
    return () => clearInterval(timer);
  }, [currentProfile.bio, currentProfile.styling.typewriter, activeProfileId]);

  const togglePlayAudio = () => {
    const newState = soundEngine.toggle();
    setIsPlayingAudio(newState);
  };

  const handleVolumeChange = (newVol: number) => {
    setAudioVolume(newVol);
    soundEngine.setVolume(newVol);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleEnterSite = () => {
    setHasEntered(true);
    soundEngine.start();
    setIsPlayingAudio(true);
  };

  const updateCurrentProfile = (updater: (prev: ProfileData) => ProfileData) => {
    setProfiles((prev) => prev.map((p) => (p.id === currentProfile.id ? updater(p) : p)));
  };

  // Store actions
  const handleEquipEffect = (effectId: NameEffectId) => {
    updateCurrentProfile((p) => ({ ...p, nameEffect: effectId }));
  };

  const handleBuyEffect = (effect: NameEffect) => {
    if (userCredits < effect.price) return;
    setUserCredits((prev) => prev - effect.price);
    setOwnedEffects((prev) => [...prev, effect.id]);
    updateCurrentProfile((p) => ({ ...p, nameEffect: effect.id }));
  };

  const handleClaimDailyCredits = () => {
    setUserCredits((prev) => prev + 250);
  };

  const handleClaimGodlyGrant = (amount: number = 50000) => {
    setUserCredits((prev) => prev + amount);
  };

  const handlePurchaseCredits = (pkg: CurrencyPackage) => {
    const totalAdded = pkg.credits + pkg.bonusCredits;
    setUserCredits((prev) => prev + totalAdded);
  };

  const handleSubscribe = (tier: SubscriptionTier, billingCycle: 'monthly' | 'yearly') => {
    setSubscription({
      tier,
      billingCycle,
      expiresAt: billingCycle === 'yearly' ? '2027-09-29' : '2026-10-29',
      isActive: true,
      autoRenew: true
    });

    if (tier === 'godly_vip') {
      // Automatically unlock all 5 Godly effects
      setOwnedEffects((prev) =>
        Array.from(
          new Set([
            ...prev,
            'galaxy_glow',
            'supernova_burst',
            'void_black_hole',
            'divine_ascension',
            'quantum_overdrive'
          ])
        )
      );
      setUserCredits((prev) => prev + 50000);
      updateCurrentProfile((p) => ({
        ...p,
        nameEffect: 'quantum_overdrive',
        badges: Array.from(new Set([...p.badges, 'vip', 'og', 'verified']))
      }));
    } else if (tier === 'plus') {
      setUserCredits((prev) => prev + 10000);
      updateCurrentProfile((p) => ({
        ...p,
        badges: Array.from(new Set([...p.badges, 'vip']))
      }));
    }
  };

  const handleCancelSubscription = () => {
    setSubscription((prev) => ({
      ...prev,
      tier: 'free',
      isActive: false
    }));
  };

  const handleViewUserProfile = (targetHandle: string) => {
    const clean = targetHandle.replace(/^@/, '').toLowerCase();
    const found = profiles.find((p) => p.handle.toLowerCase() === clean || p.id.toLowerCase() === clean);
    if (found) {
      setActiveProfileId(found.id);
      setCurrentView('bio');
      showToast(`Viewing @${found.handle}'s profile`);
    } else {
      // Dynamic profile creation for forum members
      const newProfile: ProfileData = {
        id: clean,
        handle: clean,
        displayName: clean,
        pronouns: 'they/them',
        nameEffect: 'supernova_burst',
        fontStyle: 'inter',
        namePrefix: '[MEMBER]',
        nameSuffix: '★',
        bio: `active member of uvy.bio community · exploring bio customizations & setups`,
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&q=80`,
        bannerGradient: 'linear-gradient(135deg, rgba(30, 58, 138, 0.45), rgba(15, 23, 42, 0.95))',
        accentColor: '#38bdf8',
        badges: ['verified', 'early'],
        discord: {
          tag: `${clean}#1337`,
          status: 'online',
          activity: 'Browsing uvy.bio',
          details: 'Community Forum'
        },
        music: {
          title: 'Cosmic Drift',
          artist: `${clean} sound`,
          duration: '02:40'
        },
        uid: 404 + Math.floor(Math.random() * 500),
        views: 12500,
        joined: 'Jan 2024',
        socials: [
          { platform: 'discord', url: 'https://discord.gg' },
          { platform: 'github', url: 'https://github.com' }
        ],
        links: [
          { id: 'l1', title: 'Community Profile', subtitle: 'View my setups and configurations', url: 'https://uvy.bio', clicks: 840 }
        ],
        styling: {
          cardBlur: 20,
          cardOpacity: 0.7,
          borderGlow: true,
          borderStyle: 'glow',
          borderRadius: 16,
          backgroundEffect: 'particles',
          typewriter: true,
          clickToEnter: false
        }
      };
      setProfiles((prev) => [...prev, newProfile]);
      setActiveProfileId(newProfile.id);
      setCurrentView('bio');
      showToast(`Viewing @${newProfile.handle}'s profile`);
    }
  };

  // Forum actions
  const handleUpvoteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextVoted = !t.hasUpvoted;
          return {
            ...t,
            hasUpvoted: nextVoted,
            upvotes: nextVoted ? t.upvotes + 1 : t.upvotes - 1
          };
        }
        return t;
      })
    );
  };

  const handleAddComment = (threadId: string, commentText: string) => {
    if (!commentText.trim()) return;
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            comments: [
              ...t.comments,
              {
                id: 'c-' + Date.now(),
                author: currentProfile.displayName,
                handle: '@' + currentProfile.handle,
                avatar: currentProfile.avatarUrl,
                authorEffect: currentProfile.nameEffect,
                authorStats: {
                  rankTitle: currentProfile.handle === 'uvy' ? 'Founder & Owner' : 'Verified Member',
                  rankColor: currentProfile.handle === 'uvy' ? '#a855f7' : '#38bdf8',
                  stars: currentProfile.handle === 'uvy' ? 5 : 4,
                  starColor: '#facc15',
                  joinDate: currentProfile.joined || 'Jan 2024',
                  posts: 124,
                  reputation: 980,
                  repPower: 340,
                  repPips: 4,
                  points: 14200,
                  level: 22,
                  levelProgress: 64,
                  pointsNeeded: 480,
                  activity: 88.5,
                  achievements: ['👑', '🎖️', '⭐', '💎']
                },
                time: 'Just now',
                text: commentText.trim()
              }
            ]
          };
        }
        return t;
      })
    );
  };

  const handleCreateThread = (newThread: {
    title: string;
    category: ForumThread['category'];
    content: string;
    tags: string[];
  }) => {
    const created: ForumThread = {
      id: 'f-' + Date.now(),
      title: newThread.title,
      category: newThread.category,
      author: currentProfile.displayName,
      handle: '@' + currentProfile.handle,
      avatar: currentProfile.avatarUrl,
      authorEffect: currentProfile.nameEffect,
      authorStats: {
        rankTitle: currentProfile.handle === 'uvy' ? 'Founder & Owner' : 'Verified Member',
        rankColor: currentProfile.handle === 'uvy' ? '#a855f7' : '#38bdf8',
        stars: currentProfile.handle === 'uvy' ? 5 : 4,
        starColor: '#facc15',
        joinDate: currentProfile.joined || 'Jan 2024',
        posts: 124,
        reputation: 980,
        repPower: 340,
        repPips: 4,
        points: 14200,
        level: 22,
        levelProgress: 64,
        pointsNeeded: 480,
        activity: 88.5,
        achievements: ['👑', '🎖️', '⭐', '💎']
      },
      time: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
      content: newThread.content,
      tags: newThread.tags,
      views: 1,
      comments: []
    };
    setThreads([created, ...threads]);
    setExpandedThreadId(created.id);
    setIsNewThreadModalOpen(false);
    showToast('Discussion published to community forum');
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-sans select-none overflow-x-hidden">
      {/* Background Canvas */}
      <BackgroundRenderer effect={currentProfile.styling.backgroundEffect} accent={currentProfile.accentColor} />

      {/* Click to Enter Splash Overlay */}
      {currentProfile.styling.clickToEnter && !hasEntered && currentView === 'bio' && (
        <div
          onClick={handleEnterSite}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md cursor-pointer transition-opacity duration-500"
        >
          <div className="text-center space-y-3 p-6 animate-pulse">
            <div className="w-12 h-12 rounded-full border border-white/20 mx-auto flex items-center justify-center bg-white/5">
              <Headphones className="w-5 h-5 text-white/80" />
            </div>
            <p className="text-sm font-medium tracking-widest uppercase text-white/70">[ click anywhere to enter ]</p>
            <p className="text-xs text-white/40">sound enabled · ambient audio synthesis</p>
          </div>
        </div>
      )}

      {/* Floating Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setCurrentView('bio')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xs group-hover:scale-105 transition-transform shadow-md shadow-purple-600/30">
              U
            </div>
            <span className="font-bold tracking-tight text-sm text-white group-hover:text-purple-300 transition-colors">
              uvy<span className="text-white/40 font-normal">.bio</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>uvy.bio/{currentProfile.handle}</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">
          <button
            onClick={() => setCurrentView('bio')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              currentView === 'bio' ? 'bg-white text-black shadow-sm font-semibold' : 'text-white/70 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Bio</span>
          </button>

          <button
            onClick={() => setCurrentView('store')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              currentView === 'store' ? 'bg-white text-black shadow-sm font-semibold' : 'text-white/70 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Effects Store</span>
          </button>

          <button
            onClick={() => setCurrentView('pricing')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'pricing'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-md shadow-purple-500/20'
                : 'text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/25'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>VIP & Buy Credits</span>
          </button>

          <button
            onClick={() => setCurrentView('customize')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              currentView === 'customize' ? 'bg-white text-black shadow-sm font-semibold' : 'text-white/70 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          <button
            onClick={() => setCurrentView('forum')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              currentView === 'forum' ? 'bg-white text-black shadow-sm font-semibold' : 'text-white/70 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Forum</span>
          </button>

          <button
            onClick={() => setCurrentView('explore')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              currentView === 'explore' ? 'bg-white text-black shadow-sm font-semibold' : 'text-white/70 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore</span>
          </button>
        </nav>

        {/* Top Right Controls & Credits Badge */}
        <div className="flex items-center gap-2">
          {/* User Credits Pill */}
          <button
            onClick={() => setCurrentView('store')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-bold hover:bg-amber-500/20 transition-all"
            title="View Store & Balance"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>{userCredits.toLocaleString()} c</span>
          </button>

          <button
            onClick={togglePlayAudio}
            className={`p-2 rounded-lg border transition-all flex items-center justify-center ${
              isPlayingAudio
                ? 'border-purple-500/50 bg-purple-500/10 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20'
            }`}
            title={isPlayingAudio ? 'Mute Audio Synth' : 'Play Ambient Lo-fi'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.origin + '#' + currentProfile.handle);
              }
              showToast('Bio link copied to clipboard!');
            }}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 transition-all"
            title="Share Bio Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="relative z-10 w-full min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8">
        {currentView === 'bio' && (
          <BioCard
            profile={currentProfile}
            typewriterText={typewriterText}
            isPlayingAudio={isPlayingAudio}
            togglePlayAudio={togglePlayAudio}
            audioVolume={audioVolume}
            handleVolumeChange={handleVolumeChange}
            onCustomize={() => setCurrentView('customize')}
            onOpenStore={() => setCurrentView('store')}
          />
        )}

        {currentView === 'store' && (
          <EffectsStore
            displayName={currentProfile.displayName}
            currentEffect={currentProfile.nameEffect}
            ownedEffects={ownedEffects}
            userCredits={userCredits}
            onEquipEffect={handleEquipEffect}
            onBuyEffect={handleBuyEffect}
            onClaimDaily={handleClaimDailyCredits}
            onClaimGodlyGrant={handleClaimGodlyGrant}
            onOpenPricing={() => setCurrentView('pricing')}
            showToast={showToast}
          />
        )}

        {currentView === 'pricing' && (
          <PricingStore
            userCredits={userCredits}
            subscription={subscription}
            onPurchaseCredits={handlePurchaseCredits}
            onSubscribe={handleSubscribe}
            onCancelSubscription={handleCancelSubscription}
            showToast={showToast}
            onNavigateToCustomize={() => setCurrentView('customize')}
          />
        )}

        {currentView === 'customize' && (
          <CustomizeStudio
            profile={currentProfile}
            ownedEffects={ownedEffects}
            subscription={subscription}
            updateProfile={updateCurrentProfile}
            showToast={showToast}
            onPreviewBio={() => setCurrentView('bio')}
            onOpenStore={() => setCurrentView('store')}
            onOpenPricing={() => setCurrentView('pricing')}
          />
        )}

        {currentView === 'forum' && (
          <ForumView
            threads={threads}
            category={forumCategory}
            setCategory={setForumCategory}
            searchQuery={forumSearch}
            setSearchQuery={setForumSearch}
            expandedThreadId={expandedThreadId}
            setExpandedThreadId={setExpandedThreadId}
            onUpvote={handleUpvoteThread}
            onAddComment={handleAddComment}
            onOpenNewThread={() => setIsNewThreadModalOpen(true)}
            onViewProfile={handleViewUserProfile}
          />
        )}

        {currentView === 'explore' && (
          <ExploreProfiles
            profiles={profiles}
            activeId={activeProfileId}
            onSelect={(id) => {
              setActiveProfileId(id);
              setCurrentView('bio');
              showToast(`Switched to @${id}`);
            }}
          />
        )}
      </main>

      {/* New Discussion Modal */}
      {isNewThreadModalOpen && (
        <NewThreadModal
          onClose={() => setIsNewThreadModalOpen(false)}
          onSubmit={handleCreateThread}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/20 text-white text-xs font-medium shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
