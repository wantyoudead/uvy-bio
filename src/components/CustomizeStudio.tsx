import React, { useState } from 'react';
import { Sliders, Check, Plus, X, Sparkles, ShoppingBag, Crown, Lock, Code, Layers } from 'lucide-react';
import { ProfileData, NameEffectId, FontStyleId, UserSubscription } from '../types';
import { ALL_BADGES, NAME_EFFECTS } from '../data/effects';
import { NameDisplay } from './NameDisplay';

interface CustomizeProps {
  profile: ProfileData;
  ownedEffects: NameEffectId[];
  subscription: UserSubscription;
  updateProfile: (updater: (prev: ProfileData) => ProfileData) => void;
  showToast: (msg: string) => void;
  onPreviewBio: () => void;
  onOpenStore: () => void;
  onOpenPricing: () => void;
}

export function CustomizeStudio({
  profile,
  ownedEffects,
  subscription,
  updateProfile,
  showToast,
  onPreviewBio,
  onOpenStore,
  onOpenPricing
}: CustomizeProps) {
  const [activeTab, setActiveTab] = useState<'name' | 'profile' | 'style' | 'badges' | 'links'>('name');

  // New link draft state
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkSubtitle, setNewLinkSubtitle] = useState('');

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;

    updateProfile((p) => ({
      ...p,
      links: [
        ...p.links,
        {
          id: 'l-' + Date.now(),
          title: newLinkTitle.trim(),
          subtitle: newLinkSubtitle.trim() || undefined,
          url: newLinkUrl.trim().startsWith('http') ? newLinkUrl.trim() : `https://${newLinkUrl.trim()}`,
          clicks: 0
        }
      ]
    }));

    setNewLinkTitle('');
    setNewLinkUrl('');
    setNewLinkSubtitle('');
    showToast('New link added to bio');
  };

  const handleRemoveLink = (linkId: string) => {
    updateProfile((p) => ({
      ...p,
      links: p.links.filter((l) => l.id !== linkId)
    }));
    showToast('Link removed');
  };

  const toggleBadge = (badgeId: string) => {
    updateProfile((p) => {
      const exists = p.badges.includes(badgeId);
      return {
        ...p,
        badges: exists ? p.badges.filter((b) => b !== badgeId) : [...p.badges, badgeId]
      };
    });
  };

  return (
    <div className="w-full max-w-3xl my-6 flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Studio Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            <span>Profile Customizer Studio</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Personalize your name typography, animated status aura, glass theme, and widgets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              showToast('Profile configuration saved!');
              onPreviewBio();
            }}
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5 shadow-lg shadow-white/10"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save & View Bio</span>
          </button>
        </div>
      </div>

      {/* Live Name Badge Preview Box */}
      <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/15 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-xs text-white/40 uppercase font-mono">Current Name Look:</div>
          <div className="text-xl">
            <NameDisplay
              displayName={profile.displayName}
              nameEffect={profile.nameEffect}
              fontStyle={profile.fontStyle}
              namePrefix={profile.namePrefix}
              nameSuffix={profile.nameSuffix}
            />
          </div>
        </div>

        <button
          onClick={onOpenStore}
          className="px-3 py-1.5 rounded-lg bg-purple-600/25 hover:bg-purple-600/40 border border-purple-500/40 text-purple-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Get More Effects in Store</span>
        </button>
      </div>

      {/* Customizer Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab('name')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'name' ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:text-white'
          }`}
        >
          Name & Status Effects
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'profile' ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:text-white'
          }`}
        >
          Identity & Discord
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'style' ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:text-white'
          }`}
        >
          Glass & Aesthetics
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'badges' ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:text-white'
          }`}
        >
          Badges & Music
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'links' ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:text-white'
          }`}
        >
          Links & Socials
        </button>
      </div>

      {/* TAB 1: NAME & STATUS EFFECTS */}
      {activeTab === 'name' && (
        <div className="flex flex-col gap-6 p-6 rounded-xl bg-zinc-950/70 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/70">Display Name</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => updateProfile((p) => ({ ...p, displayName: e.target.value }))}
                className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/70">Font Style</label>
              <select
                value={profile.fontStyle}
                onChange={(e) => updateProfile((p) => ({ ...p, fontStyle: e.target.value as FontStyleId }))}
                className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white outline-none"
              >
                <option value="inter">Inter (Modern Clean Sans)</option>
                <option value="serif">Instrument Serif (Editorial Italic)</option>
                <option value="mono">Cyber Monospace (Hacker)</option>
                <option value="gothic">Gothic Heavy Bold</option>
                <option value="cursive">Aesthetic Script</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/70">Status Role / Prefix (e.g. [VIP], [PRO])</label>
              <input
                type="text"
                value={profile.namePrefix || ''}
                onChange={(e) => updateProfile((p) => ({ ...p, namePrefix: e.target.value }))}
                placeholder="e.g. [VIP], [DEV], ★"
                className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/70">Title Suffix (e.g. ★, ♡)</label>
              <input
                type="text"
                value={profile.nameSuffix || ''}
                onChange={(e) => updateProfile((p) => ({ ...p, nameSuffix: e.target.value }))}
                placeholder="e.g. ★, ⚡, ♡"
                className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none font-mono"
              />
            </div>
          </div>

          {/* Animated Name Effect Picker */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Equipped Animated Name Effect</h3>
                <p className="text-xs text-white/50">Choose from effects you own or acquire legendary status in the store</p>
              </div>
              <button
                onClick={onOpenStore}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Visit Store</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {NAME_EFFECTS.map((effect) => {
                const isVipUnlocked = subscription.tier === 'godly_vip' && effect.rarity === 'Godly';
                const isOwned = ownedEffects.includes(effect.id) || effect.price === 0 || isVipUnlocked;
                const isSelected = profile.nameEffect === effect.id;

                return (
                  <button
                    key={effect.id}
                    onClick={() => {
                      if (!isOwned) {
                        onOpenStore();
                        return;
                      }
                      updateProfile((p) => ({ ...p, nameEffect: effect.id }));
                      showToast(`Equipped ${effect.name}`);
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/30 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                        : isOwned
                        ? 'bg-black border-white/10 hover:border-white/30 text-white/70 hover:text-white'
                        : 'bg-black/40 border-white/5 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={isSelected ? 'text-purple-300 font-bold' : 'text-white/40'}>
                        {effect.rarity}
                      </span>
                      {isSelected ? (
                        <span className="text-emerald-400 font-bold">Active</span>
                      ) : isVipUnlocked ? (
                        <span className="text-purple-300 font-bold flex items-center gap-0.5">
                          <Crown className="w-2.5 h-2.5 text-amber-400" />
                          <span>VIP Free</span>
                        </span>
                      ) : !isOwned ? (
                        <span className="text-amber-400 font-bold">Lock ({effect.price}c)</span>
                      ) : null}
                    </div>

                    <div className="text-sm py-1 font-semibold truncate">
                      <NameDisplay displayName={effect.name} nameEffect={effect.id} />
                    </div>

                    <span className="text-[10px] text-white/40 line-clamp-1">{effect.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IDENTITY & DISCORD */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 rounded-xl bg-zinc-950/70 border border-white/10">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Handle / URL Slug</label>
            <div className="flex items-center rounded-lg bg-black border border-white/15 px-3">
              <span className="text-xs text-white/40">uvy.bio/</span>
              <input
                type="text"
                value={profile.handle}
                onChange={(e) => updateProfile((p) => ({ ...p, handle: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') }))}
                className="w-full py-2 bg-transparent text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Pronouns</label>
            <input
              type="text"
              value={profile.pronouns}
              onChange={(e) => updateProfile((p) => ({ ...p, pronouns: e.target.value }))}
              placeholder="e.g. he/they, she/her"
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-white/70">Avatar Image URL</label>
            <input
              type="text"
              value={profile.avatarUrl}
              onChange={(e) => updateProfile((p) => ({ ...p, avatarUrl: e.target.value }))}
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white/70">Bio Description</label>
              <label className="text-[11px] text-white/50 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.styling.typewriter}
                  onChange={(e) =>
                    updateProfile((p) => ({
                      ...p,
                      styling: { ...p.styling, typewriter: e.target.checked }
                    }))
                  }
                  className="accent-purple-500 rounded"
                />
                <span>Typewriter Animation</span>
              </label>
            </div>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => updateProfile((p) => ({ ...p, bio: e.target.value }))}
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Discord Tag</label>
            <input
              type="text"
              value={profile.discord.tag}
              onChange={(e) =>
                updateProfile((p) => ({
                  ...p,
                  discord: { ...p.discord, tag: e.target.value }
                }))
              }
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/70">Discord Status</label>
            <select
              value={profile.discord.status}
              onChange={(e) =>
                updateProfile((p) => ({
                  ...p,
                  discord: { ...p.discord, status: e.target.value as ProfileData['discord']['status'] }
                }))
              }
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
            >
              <option value="online">Online (Green)</option>
              <option value="idle">Idle (Amber)</option>
              <option value="dnd">Do Not Disturb (Red)</option>
              <option value="offline">Invisible / Offline</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-white/70">Discord Activity / Playing Status</label>
            <input
              type="text"
              value={profile.discord.activity}
              onChange={(e) =>
                updateProfile((p) => ({
                  ...p,
                  discord: { ...p.discord, activity: e.target.value }
                }))
              }
              placeholder="e.g. Playing VALORANT, Listening to Spotify"
              className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
            />
          </div>
        </div>
      )}

      {/* TAB 3: GLASS & AESTHETICS */}
      {activeTab === 'style' && (
        <div className="flex flex-col gap-5 p-6 rounded-xl bg-zinc-950/70 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white/70">Backdrop Glass Blur</span>
                <span className="font-mono text-white/40">{profile.styling.cardBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={profile.styling.cardBlur}
                onChange={(e) =>
                  updateProfile((p) => ({
                    ...p,
                    styling: { ...p.styling, cardBlur: parseInt(e.target.value) }
                  }))
                }
                className="accent-purple-400 bg-white/20 h-1.5 rounded cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white/70">Card Opacity</span>
                <span className="font-mono text-white/40">{Math.round(profile.styling.cardOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.95"
                step="0.05"
                value={profile.styling.cardOpacity}
                onChange={(e) =>
                  updateProfile((p) => ({
                    ...p,
                    styling: { ...p.styling, cardOpacity: parseFloat(e.target.value) }
                  }))
                }
                className="accent-purple-400 bg-white/20 h-1.5 rounded cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/70">Border Style</label>
              <select
                value={profile.styling.borderStyle}
                onChange={(e) => {
                  const val = e.target.value as ProfileData['styling']['borderStyle'];
                  if ((val === 'hologram' || val === 'chroma') && subscription.tier !== 'godly_vip') {
                    showToast('Hologram & Chroma borders require uvy.bio GODLY VIP');
                    onOpenPricing();
                    return;
                  }
                  updateProfile((p) => ({
                    ...p,
                    styling: { ...p.styling, borderStyle: val }
                  }));
                }}
                className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white outline-none"
              >
                <option value="glow">Aesthetic Glow (guns.lol style)</option>
                <option value="metal">Liquid Metal (uvy.bio style)</option>
                <option value="solid">Minimalist Thin Solid</option>
                <option value="dashed">Dashed Tech Border</option>
                <option value="hologram">★ Prismatic Hologram (GODLY VIP)</option>
                <option value="chroma">★ Chroma Flow Aura (GODLY VIP)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/70">Background Atmosphere</label>
              <select
                value={profile.styling.backgroundEffect}
                onChange={(e) =>
                  updateProfile((p) => ({
                    ...p,
                    styling: { ...p.styling, backgroundEffect: e.target.value as ProfileData['styling']['backgroundEffect'] }
                  }))
                }
                className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white outline-none"
              >
                <option value="particles">Floating Cyber Particles</option>
                <option value="stars">Starfield Cosmic Nebula</option>
                <option value="grid">Retro Cyberpunk Grid</option>
                <option value="pure_black">Pure Obsidian Black (#000000)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-xs font-medium text-white/70">Accent Glow Color</label>
              <div className="flex items-center gap-3">
                {['#a855f7', '#38bdf8', '#10b981', '#f43f5e', '#f59e0b', '#ffffff'].map((color) => (
                  <button
                    key={color}
                    onClick={() => updateProfile((p) => ({ ...p, accentColor: color }))}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      profile.accentColor === color ? 'scale-110 border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <span className="text-xs font-mono text-white/50 ml-2">{profile.accentColor}</span>
              </div>
            </div>

            {/* Custom Raw CSS Injector (GODLY VIP Feature) */}
            <div className="sm:col-span-2 pt-3 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Custom Raw CSS Injector
                  </span>
                </div>
                {subscription.tier === 'godly_vip' ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    ★ VIP UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>GODLY VIP ONLY</span>
                  </span>
                )}
              </div>

              {subscription.tier !== 'godly_vip' ? (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-white/80 font-semibold">
                      Unlock full CSS & Keyframes injectability for your bio link.
                    </p>
                    <p className="text-[11px] text-white/50">
                      Inject custom shadow blooms, scanline filters, backdrop blurs, and animation rules.
                    </p>
                  </div>
                  <button
                    onClick={onOpenPricing}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg flex-shrink-0 cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Upgrade to VIP</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-white/50">
                    <span>Enter valid CSS rules or use quick presets:</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateProfile((p) => ({
                            ...p,
                            styling: {
                              ...p.styling,
                              customCss: `/* Cyber Scanlines Overlay */
.bio-card-wrapper::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  z-index: 20;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}`
                            }
                          }))
                        }
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-purple-300 font-mono text-[10px]"
                      >
                        + Scanlines Preset
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateProfile((p) => ({
                            ...p,
                            styling: {
                              ...p.styling,
                              customCss: `/* Pulsing Neon Drop Shadow */
.bio-card-wrapper {
  animation: cardPulseGlow 3s ease-in-out infinite alternate !important;
}
@keyframes cardPulseGlow {
  0% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
  100% { box-shadow: 0 0 45px rgba(6, 182, 212, 0.7); }
}`
                            }
                          }))
                        }
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-cyan-300 font-mono text-[10px]"
                      >
                        + Neon Glow Preset
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={profile.styling.customCss || ''}
                    onChange={(e) =>
                      updateProfile((p) => ({
                        ...p,
                        styling: { ...p.styling, customCss: e.target.value }
                      }))
                    }
                    placeholder="/* Custom CSS rules applied directly to bio card */&#10;.bio-card-wrapper { filter: contrast(1.1); }"
                    className="w-full p-3 rounded-lg bg-black border border-white/15 text-xs text-white font-mono outline-none focus:border-purple-400 resize-none"
                  />
                </div>
              )}
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">"Click to Enter" Splash Screen</p>
                <p className="text-[11px] text-white/40">Displays the classic guns.lol & uvy.bio click-to-enter prompt</p>
              </div>
              <input
                type="checkbox"
                checked={profile.styling.clickToEnter}
                onChange={(e) =>
                  updateProfile((p) => ({
                    ...p,
                    styling: { ...p.styling, clickToEnter: e.target.checked }
                  }))
                }
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BADGES & MUSIC */}
      {activeTab === 'badges' && (
        <div className="flex flex-col gap-6 p-6 rounded-xl bg-zinc-950/70 border border-white/10">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Select Profile Badges</h3>
            <p className="text-xs text-white/50 mb-3">Toggle exclusive status badges that appear on your bio card</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ALL_BADGES.map((badge) => {
                const isActive = profile.badges.includes(badge.id);
                return (
                  <button
                    key={badge.id}
                    onClick={() => toggleBadge(badge.id)}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                      isActive
                        ? 'bg-purple-950/30 border-purple-500/50 text-white'
                        : 'bg-black border-white/10 text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-xs font-bold text-white/80">{badge.label.slice(0, 2)}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold truncate">{badge.label}</span>
                      <span className="text-[10px] text-white/40 truncate">{isActive ? 'Active' : 'Click to enable'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Audio Player Track Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/70">Song Title</label>
                <input
                  type="text"
                  value={profile.music.title}
                  onChange={(e) =>
                    updateProfile((p) => ({
                      ...p,
                      music: { ...p.music, title: e.target.value }
                    }))
                  }
                  className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/70">Artist Name</label>
                <input
                  type="text"
                  value={profile.music.artist}
                  onChange={(e) =>
                    updateProfile((p) => ({
                      ...p,
                      music: { ...p.music, artist: e.target.value }
                    }))
                  }
                  className="px-3.5 py-2 rounded-lg bg-black border border-white/15 text-sm text-white focus:border-purple-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LINKS & SOCIALS */}
      {activeTab === 'links' && (
        <div className="flex flex-col gap-6 p-6 rounded-xl bg-zinc-950/70 border border-white/10">
          <form onSubmit={handleAddLink} className="flex flex-col gap-3 p-4 rounded-lg bg-black border border-white/15">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-purple-400" />
              <span>Add Custom Link Button</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Link Title (e.g. My GitHub Configs)"
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
                className="px-3 py-2 rounded-md bg-zinc-900 border border-white/10 text-xs text-white outline-none"
                required
              />
              <input
                type="text"
                placeholder="Destination URL (e.g. github.com)"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                className="px-3 py-2 rounded-md bg-zinc-900 border border-white/10 text-xs text-white outline-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Subtitle / Description (optional)"
                value={newLinkSubtitle}
                onChange={(e) => setNewLinkSubtitle(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md bg-zinc-900 border border-white/10 text-xs text-white outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold text-white/60">Active Bio Links ({profile.links.length})</h4>
            {profile.links.map((link) => (
              <div
                key={link.id}
                className="p-3 rounded-lg bg-black border border-white/10 flex items-center justify-between gap-3"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-white truncate">{link.title}</span>
                  <span className="text-[10px] text-white/40 truncate">{link.url}</span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-mono text-white/40">{link.clicks} clicks</span>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="p-1 rounded text-white/40 hover:text-rose-400 hover:bg-white/5 transition-colors"
                    title="Delete link"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
