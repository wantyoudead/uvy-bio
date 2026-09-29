import React from 'react';
import { UserForumStats, NameEffectId } from '../types';
import { NameDisplay } from './NameDisplay';
import { RankStars } from './RankStars';
import { ExternalLink } from 'lucide-react';

interface AuthorForumCardProps {
  author: string;
  handle: string;
  avatar: string;
  authorEffect?: NameEffectId;
  stats?: UserForumStats;
  onViewProfile: (handle: string) => void;
  compact?: boolean;
}

export function AuthorForumCard({
  author,
  handle,
  avatar,
  authorEffect = 'none',
  stats,
  onViewProfile,
  compact = false
}: AuthorForumCardProps) {
  // Default stats fallback if not provided
  const userStats: UserForumStats = stats || {
    rankTitle: 'Member',
    rankColor: '#38bdf8',
    stars: 3,
    starColor: '#38bdf8',
    joinDate: 'Jan 2024',
    posts: 42,
    reputation: 150,
    repPower: 80,
    repPips: 3,
    points: 4200,
    level: 8,
    levelProgress: 35,
    pointsNeeded: 450,
    activity: 48.5,
    achievements: ['🎖️', '⭐']
  };

  const cleanHandle = handle.replace(/^@/, '');

  if (compact) {
    return (
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => onViewProfile(cleanHandle)}
          className="relative group flex-shrink-0 cursor-pointer"
          title={`Click to view @${cleanHandle}'s bio profile`}
        >
          <img
            src={avatar}
            alt={author}
            className="w-8 h-8 rounded-full object-cover border border-white/20 group-hover:border-purple-400 group-hover:scale-105 transition-all shadow-md"
          />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onViewProfile(cleanHandle)}
              className="text-left font-bold text-xs hover:text-purple-300 transition-colors cursor-pointer group flex items-center gap-1"
            >
              <NameDisplay displayName={author} nameEffect={authorEffect} className="text-xs" />
              <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
            </button>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border"
              style={{
                color: userStats.rankColor,
                borderColor: `${userStats.rankColor}40`,
                backgroundColor: `${userStats.rankColor}15`
              }}
            >
              {userStats.rankTitle}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-white/40 font-mono">
            <RankStars stars={userStats.stars} rankTitle={userStats.rankTitle} size="sm" />
            <span>·</span>
            <span>@{cleanHandle}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-52 flex-shrink-0 flex flex-col items-center text-center p-3 rounded-xl bg-zinc-950/90 border border-white/15 shadow-xl select-none font-sans">
      {/* 1. Author Name (Clickable to Bio Profile) */}
      <button
        onClick={() => onViewProfile(cleanHandle)}
        className="text-center font-bold text-sm hover:scale-[1.02] transition-transform cursor-pointer group flex items-center justify-center gap-1 w-full"
        title={`Click to view @${cleanHandle}'s full bio profile`}
      >
        <NameDisplay displayName={author} nameEffect={authorEffect} className="text-sm font-bold" />
        <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity text-purple-400" />
      </button>

      {/* 2. Rank Title Context (e.g. Founder & Owner, Administrator, Member) */}
      <div
        className="text-[11px] font-bold tracking-tight mt-0.5"
        style={{ color: userStats.rankColor }}
      >
        {userStats.rankTitle}
      </div>

      {/* 3. 3D Spinning & Animated Rank Stars (UnknownCheats Style) */}
      <div className="my-1">
        <RankStars stars={userStats.stars} rankTitle={userStats.rankTitle} size="md" />
      </div>

      {/* 4. Large Square Avatar Box with Hover Zoom */}
      <button
        onClick={() => onViewProfile(cleanHandle)}
        className="w-28 h-28 my-3 rounded-lg overflow-hidden border-2 border-white/20 hover:border-purple-400 transition-all cursor-pointer relative group shadow-2xl bg-black"
        title={`View @${cleanHandle}'s profile`}
      >
        <img
          src={avatar}
          alt={author}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
          View Bio →
        </div>
      </button>

      {/* 5. UnknownCheats Authentic Stat Boxes */}
      <div className="w-full flex flex-col gap-1.5 text-[10px] font-mono text-left">
        {/* Join Date Box */}
        <div className="px-2 py-1 rounded bg-black/60 border border-white/10 flex items-center justify-between text-white/70">
          <span>Join Date:</span>
          <span className="font-semibold text-white">{userStats.joinDate}</span>
        </div>

        {/* Posts Count Box */}
        <div className="px-2 py-1 rounded bg-black/60 border border-white/10 flex items-center justify-between text-white/70">
          <span>Posts:</span>
          <span className="font-semibold text-white">{userStats.posts.toLocaleString()}</span>
        </div>

        {/* Reputation & Rep Power with Green Pips Box */}
        <div className="px-2 py-1.5 rounded bg-black/60 border border-white/10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-white/70">
            <span>Reputation:</span>
            <span className="font-semibold text-emerald-400">{userStats.reputation.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-white/50 text-[9px]">
            <span>Rep Power:</span>
            <span className="text-white/80">{userStats.repPower}</span>
          </div>
          {/* Green Rep Pips (Just like UnknownCheats) */}
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2 rounded-[2px] ${
                  i < userStats.repPips
                    ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Points & Level Box with Orange Progress Bar */}
        <div className="px-2 py-1.5 rounded bg-black/60 border border-white/10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-white/70">
            <span>Points: {userStats.points.toLocaleString()}</span>
            <span className="font-bold text-amber-400">Lvl {userStats.level}</span>
          </div>
          {/* Orange Gradient Bar */}
          <div className="w-full h-2 rounded bg-zinc-900 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-orange-400 shadow-[0_0_8px_#f59e0b]"
              style={{ width: `${Math.min(100, userStats.levelProgress)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[9px] text-white/50">
            <span>Progress: {userStats.levelProgress}%</span>
            <span>{userStats.pointsNeeded} pts to next</span>
          </div>
        </div>

        {/* Activity Percentage Box with Green Progress Bar */}
        <div className="px-2 py-1.5 rounded bg-black/60 border border-white/10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-white/70">
            <span>Activity:</span>
            <span className="font-bold text-emerald-400">{userStats.activity}%</span>
          </div>
          {/* Green Gradient Bar */}
          <div className="w-full h-1.5 rounded bg-zinc-900 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-green-400 shadow-[0_0_6px_#22c55e]"
              style={{ width: `${Math.min(100, userStats.activity)}%` }}
            />
          </div>
        </div>

        {/* Last Achievements Medals Box */}
        {userStats.achievements.length > 0 && (
          <div className="px-2 py-1.5 rounded bg-black/60 border border-white/10 flex flex-col gap-1">
            <span className="text-[9px] text-white/40 uppercase tracking-wider">Last Achievements</span>
            <div className="flex items-center gap-1.5 text-sm">
              {userStats.achievements.map((ach, idx) => (
                <span key={idx} className="hover:scale-125 transition-transform cursor-help" title={`Achievement Medal #${idx + 1}`}>
                  {ach}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Direct Bio Profile Button */}
      <button
        onClick={() => onViewProfile(cleanHandle)}
        className="w-full mt-3 py-1.5 rounded-lg bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 text-[10px] font-bold text-white/80 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
      >
        <span>View @{cleanHandle}'s Bio</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </button>
    </div>
  );
}
