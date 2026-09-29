import React from 'react';
import { ProfileData } from '../types';
import { NameDisplay } from './NameDisplay';

interface ExploreProps {
  profiles: ProfileData[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ExploreProfiles({ profiles, activeId, onSelect }: ExploreProps) {
  return (
    <div className="w-full max-w-4xl my-6 flex flex-col gap-6 animate-in fade-in duration-200">
      <div className="border-b border-white/10 pb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
          Community Spotlight
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-white mt-1">Explore Featured Bios</h2>
        <p className="text-xs text-white/60 mt-1">
          Browse popular creator and gamer setups on uvy.bio. Click any profile to view its animated effects or clone the theme.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {profiles.map((p) => {
          const isCurrent = p.id === activeId;
          return (
            <div
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center group ${
                isCurrent
                  ? 'bg-purple-950/20 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                  : 'bg-zinc-950/60 border-white/10 hover:border-white/25 hover:-translate-y-1'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mb-3 group-hover:scale-105 transition-transform">
                <img src={p.avatarUrl} alt={p.displayName} className="w-full h-full object-cover" />
              </div>

              <div className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                <NameDisplay
                  displayName={p.displayName}
                  nameEffect={p.nameEffect}
                  fontStyle={p.fontStyle}
                  namePrefix={p.namePrefix}
                  nameSuffix={p.nameSuffix}
                />
              </div>

              <p className="text-xs font-mono text-white/50 mt-0.5">@{p.handle}</p>

              <p className="text-xs text-white/60 mt-2 line-clamp-2 px-2 leading-relaxed">
                {p.bio}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-white/40 font-mono">
                <span>{p.views.toLocaleString()} views</span>
                <span className="text-purple-400 font-semibold">{isCurrent ? 'Current' : 'View Bio →'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
