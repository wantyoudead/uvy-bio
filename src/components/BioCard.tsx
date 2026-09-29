import React, { useState } from 'react';
import {
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Shield,
  Code2,
  Crown,
  Flame,
  CheckCircle,
  Eye,
  Sliders,
  Gamepad2,
  Headphones,
  Link as LinkIcon,
  Github,
  Twitter,
  Disc as DiscordIcon,
  Twitch
} from 'lucide-react';
import { ProfileData } from '../types';
import { ALL_BADGES } from '../data/effects';
import { NameDisplay } from './NameDisplay';

interface BioCardProps {
  profile: ProfileData;
  typewriterText: string;
  isPlayingAudio: boolean;
  togglePlayAudio: () => void;
  audioVolume: number;
  handleVolumeChange: (vol: number) => void;
  onCustomize: () => void;
  onOpenStore: () => void;
}

export function BioCard({
  profile,
  typewriterText,
  isPlayingAudio,
  togglePlayAudio,
  audioVolume,
  handleVolumeChange,
  onCustomize,
  onOpenStore
}: BioCardProps) {
  const [clickCount, setClickCount] = useState<Record<string, number>>({});

  const handleLinkClick = (linkId: string, url: string) => {
    setClickCount((prev) => ({
      ...prev,
      [linkId]: (prev[linkId] || 0) + 1
    }));
    if (url === '#store') {
      onOpenStore();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getBorderClass = () => {
    switch (profile.styling.borderStyle as string) {
      case 'hologram':
        return 'vip-hologram-border';
      case 'chroma':
        return 'vip-chroma-border';
      case 'glow':
        return 'border border-white/15 shadow-[0_0_35px_rgba(255,255,255,0.08)]';
      case 'metal':
        return 'border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]';
      case 'dashed':
        return 'border border-dashed border-white/25';
      case 'solid':
      default:
        return 'border border-white/10';
    }
  };

  return (
    <div className="w-full max-w-[480px] my-auto py-6 flex flex-col items-center">
      {/* Inject custom CSS if configured via GODLY VIP */}
      {profile.styling.customCss && (
        <style dangerouslySetInnerHTML={{ __html: profile.styling.customCss }} />
      )}

      {/* Glassmorphic Bio Container Card */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 ${getBorderClass()}`}
        style={{
          borderRadius: `${profile.styling.borderRadius}px`,
          backgroundColor: `rgba(10, 10, 12, ${profile.styling.cardOpacity})`,
          backdropFilter: `blur(${profile.styling.cardBlur}px)`,
          WebkitBackdropFilter: `blur(${profile.styling.cardBlur}px)`
        }}
      >
        {/* Banner Area */}
        <div
          className="w-full h-24 relative"
          style={{ background: profile.bannerGradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 pt-0 relative -mt-12 flex flex-col items-center text-center">
          {/* Avatar with Status Indicator Ring */}
          <div className="relative group">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 p-0.5 shadow-xl bg-black relative"
              style={{
                boxShadow: profile.styling.borderGlow
                  ? `0 0 24px ${profile.accentColor}40`
                  : undefined
              }}
            >
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Discord Status Indicator Dot */}
            <div
              className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center ${
                profile.discord.status === 'online'
                  ? 'bg-emerald-500'
                  : profile.discord.status === 'idle'
                  ? 'bg-amber-500'
                  : profile.discord.status === 'dnd'
                  ? 'bg-rose-500'
                  : 'bg-zinc-600'
              }`}
              title={`Status: ${profile.discord.status}`}
            >
              {profile.discord.status === 'dnd' && <div className="w-2.5 h-0.5 bg-black rounded" />}
            </div>
          </div>

          {/* Name with Animated Effect & Custom Styling */}
          <div className="mt-3.5 flex items-center justify-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold flex items-center">
              <NameDisplay
                displayName={profile.displayName}
                nameEffect={profile.nameEffect}
                fontStyle={profile.fontStyle}
                namePrefix={profile.namePrefix}
                nameSuffix={profile.nameSuffix}
              />
            </h1>
            {profile.pronouns && (
              <span className="text-xs text-white/40 font-mono tracking-tight">
                ({profile.pronouns})
              </span>
            )}
          </div>

          {/* Handle */}
          <p className="text-xs text-white/50 font-mono mt-0.5">@{profile.handle}</p>

          {/* Badges Shelf */}
          {profile.badges.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
              {profile.badges.map((bId) => {
                const badgeInfo = ALL_BADGES.find((b) => b.id === bId);
                if (!badgeInfo) return null;
                return (
                  <div
                    key={bId}
                    className="p-1 rounded-md bg-white/5 border border-white/10 hover:border-white/30 transition-colors group relative cursor-help"
                    title={badgeInfo.tooltip}
                  >
                    {badgeInfo.icon === 'check' && <CheckCircle className="w-3.5 h-3.5 text-sky-400" />}
                    {badgeInfo.icon === 'code' && <Code2 className="w-3.5 h-3.5 text-purple-400" />}
                    {badgeInfo.icon === 'sparkles' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                    {badgeInfo.icon === 'crown' && <Crown className="w-3.5 h-3.5 text-pink-400" />}
                    {badgeInfo.icon === 'flame' && <Flame className="w-3.5 h-3.5 text-rose-500" />}
                    {badgeInfo.icon === 'shield' && <Shield className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bio Description with Typewriter */}
          <div className="mt-4 px-2 min-h-[44px] flex items-center justify-center">
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
              {typewriterText}
              {profile.styling.typewriter && (
                <span className="inline-block w-1.5 h-3.5 bg-white/80 ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {/* Discord Presence Card */}
          {profile.discord && (
            <div className="w-full mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2]">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-white/80 flex items-center gap-1.5">
                    <span>{profile.discord.activity}</span>
                  </span>
                  <span className="text-[10px] text-white/50">{profile.discord.details}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/60 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{profile.discord.tag}</span>
              </div>
            </div>
          )}

          {/* Audio Player Widget (uvy.bio audio experience) */}
          <div className="w-full mt-3.5 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={togglePlayAudio}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-transform active:scale-95 flex-shrink-0"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
              </button>

              <div className="flex flex-col text-left min-w-0">
                <div className="text-xs font-medium text-white truncate flex items-center gap-1.5">
                  <span className="truncate">{profile.music.title}</span>
                  {isPlayingAudio && (
                    <div className="flex items-end gap-0.5 h-3">
                      <div className="w-0.5 bg-purple-400 anim-bar-1" />
                      <div className="w-0.5 bg-purple-400 anim-bar-2" />
                      <div className="w-0.5 bg-purple-400 anim-bar-3" />
                      <div className="w-0.5 bg-purple-400 anim-bar-4" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-white/50 truncate">{profile.music.artist}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 accent-purple-400 cursor-pointer bg-white/20 rounded"
              />
              <span className="text-[10px] font-mono text-white/40">{profile.music.duration}</span>
            </div>
          </div>

          {/* Socials Icon Bar */}
          {profile.socials.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4 w-full">
              {profile.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:-translate-y-0.5"
                  title={s.platform}
                >
                  {s.platform === 'github' && <Github className="w-4 h-4" />}
                  {s.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                  {s.platform === 'discord' && <DiscordIcon className="w-4 h-4" />}
                  {s.platform === 'twitch' && <Twitch className="w-4 h-4" />}
                  {s.platform === 'spotify' && <Headphones className="w-4 h-4" />}
                </a>
              ))}
            </div>
          )}

          {/* Custom Bio Links List */}
          <div className="w-full mt-4 flex flex-col gap-2.5">
            {profile.links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.url)}
                className={`w-full py-3 px-4 rounded-xl text-left flex items-center justify-between transition-all group ${
                  link.highlight
                    ? 'bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-black/60 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform flex-shrink-0">
                    <LinkIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-white group-hover:text-purple-200 transition-colors truncate">
                      {link.title}
                    </span>
                    {link.subtitle && (
                      <span className="text-[10px] text-white/50 truncate">{link.subtitle}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <span className="text-[10px] text-white/40 font-mono group-hover:text-white/60">
                    {(link.clicks + (clickCount[link.id] || 0)).toLocaleString()}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Footer Metadata */}
          <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-white/40 font-mono">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{profile.views.toLocaleString()} views</span>
            </span>
            <span>UID #{profile.uid}</span>
            <span>joined {profile.joined}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={onCustomize}
          className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-xs font-medium text-white/70 hover:text-white transition-all flex items-center gap-2 backdrop-blur-md"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customize Profile</span>
        </button>

        <button
          onClick={onOpenStore}
          className="px-4 py-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-xs font-semibold text-purple-200 transition-all flex items-center gap-2 backdrop-blur-md shadow-lg shadow-purple-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Effects Store</span>
        </button>
      </div>
    </div>
  );
}
