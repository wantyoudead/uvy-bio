import React from 'react';
import { NameEffectId, FontStyleId } from '../types';
import { NAME_EFFECTS } from '../data/effects';

interface NameDisplayProps {
  displayName: string;
  nameEffect: NameEffectId;
  fontStyle?: FontStyleId;
  namePrefix?: string;
  nameSuffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function NameDisplay({
  displayName,
  nameEffect,
  fontStyle = 'inter',
  namePrefix,
  nameSuffix,
  className = '',
  style
}: NameDisplayProps) {
  const effectObj = NAME_EFFECTS.find((e) => e.id === nameEffect);
  const effectClass = effectObj?.cssClass || '';

  const getFontFamilyClass = (f: FontStyleId) => {
    switch (f) {
      case 'serif':
        return 'font-serif italic tracking-normal';
      case 'mono':
        return 'font-mono tracking-tight';
      case 'gothic':
        return 'font-black tracking-wider uppercase';
      case 'cursive':
        return 'italic font-serif tracking-wide';
      case 'inter':
      default:
        return 'font-sans font-bold tracking-tight';
    }
  };

  return (
    <span
      className={`relative inline-flex items-center gap-1.5 ${getFontFamilyClass(fontStyle)} ${className}`}
      style={style}
    >
      {/* =========================================================================
          GODLY 1: GALAXY COSMIC GLOW (50,000c)
          MECHANIC: Planetary Pulsar Orbits & Twinkling Celestial Stars
          ========================================================================= */}
      {nameEffect === 'galaxy_glow' && (
        <span className="absolute inset-0 pointer-events-none flex items-center justify-center -z-0 overflow-visible" aria-hidden="true">
          <span className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_24px_#06b6d4] godly-orb-1" />
          <span className="absolute w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6,0_0_20px_#ec4899] godly-orb-2" />
          <span className="absolute w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_14px_#c084fc,0_0_28px_#a855f7] godly-orb-3" />
          <span className="absolute -top-3 -left-3 text-cyan-300 text-xs godly-star select-none">✦</span>
          <span className="absolute -bottom-2.5 -right-3 text-pink-300 text-xs godly-star select-none" style={{ animationDelay: '0.6s' }}>★</span>
          <span className="absolute -top-2.5 right-1/4 text-purple-300 text-[10px] godly-star select-none" style={{ animationDelay: '1.1s' }}>✧</span>
        </span>
      )}

      {/* =========================================================================
          GODLY 2: SUPERNOVA SINGULARITY (85,000c)
          MECHANIC: Thermonuclear Shockwave Rings & Blinding Crosshair Lens Flares
          ========================================================================= */}
      {nameEffect === 'supernova_burst' && (
        <span className="absolute inset-0 pointer-events-none flex items-center justify-center -z-0 overflow-visible" aria-hidden="true">
          {/* Outward Expanding Supernova Blast Shockwaves */}
          <span className="absolute w-20 h-10 rounded-full border-2 border-amber-300 supernova-shockwave-1" />
          <span className="absolute w-28 h-14 rounded-full border-2 border-orange-500 supernova-shockwave-2" />

          {/* Crosshair Horizontal & Vertical Lens Flare Spikes */}
          <span className="absolute w-36 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent supernova-flare-h" />
          <span className="absolute h-16 w-[2px] bg-gradient-to-b from-transparent via-orange-300 to-transparent supernova-flare-v" />

          {/* Floating Thermonuclear Plasma Embers Rising Upward */}
          <span className="absolute bottom-0 -left-2 w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#fef08a] supernova-ember-1" />
          <span className="absolute bottom-0 right-1 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_#f97316] supernova-ember-2" />
          <span className="absolute -top-1 left-1/3 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#ffffff] supernova-ember-1" style={{ animationDelay: '0.5s' }} />

          {/* Hot Thermal Core Glow */}
          <span className="absolute w-16 h-8 rounded-full bg-amber-500/20 blur-md pointer-events-none" />
        </span>
      )}

      {/* =========================================================================
          GODLY 3: EVENT HORIZON BLACK HOLE (120,000c)
          MECHANIC: Inward Gravitational Infall, Relativistic Accretion Lens & Void Core
          ========================================================================= */}
      {nameEffect === 'void_black_hole' && (
        <span className="absolute inset-0 pointer-events-none flex items-center justify-center -z-0 overflow-visible" aria-hidden="true">
          {/* Pitch Dark Matter Void Core Shadow */}
          <span className="absolute w-20 h-9 rounded-full bg-purple-950/80 blackhole-core border border-purple-500/30" />

          {/* Relativistic Accretion Lens Ring */}
          <span className="absolute w-28 h-10 rounded-full border-2 border-purple-400/60 blackhole-accretion pointer-events-none" />

          {/* Gravitational Infall: Particles being violently sucked INWARD into the singularity */}
          <span className="absolute w-2 h-2 rounded-full bg-fuchsia-300 blackhole-infall-1" />
          <span className="absolute w-2.5 h-2.5 rounded-full bg-purple-400 blackhole-infall-2" />
          <span className="absolute w-1.5 h-1.5 rounded-full bg-indigo-300 blackhole-infall-3" />

          {/* Spacetime Gravity Well Distortion */}
          <span className="absolute -top-2 left-1/4 text-purple-400 text-xs font-mono select-none opacity-40">🕳</span>
        </span>
      )}

      {/* =========================================================================
          GODLY 4: CELESTIAL SERAPH HALO (175,000c)
          MECHANIC: Levitating Sacred Halo, Ethereal Seraph Wings & Ascending God-Rays
          ========================================================================= */}
      {nameEffect === 'divine_ascension' && (
        <span className="absolute inset-0 pointer-events-none flex items-center justify-center -z-0 overflow-visible" aria-hidden="true">
          {/* Hovering Sacred Golden Halo Over Text */}
          <span
            className="absolute -top-4 w-16 h-4 rounded-full border-2 border-yellow-300 seraph-halo pointer-events-none"
            style={{ perspective: '280px' }}
          />

          {/* Ascending Holy God-Rays */}
          <span className="absolute w-24 h-16 bg-gradient-to-t from-transparent via-yellow-300/15 to-transparent seraph-godray blur-xs" />

          {/* Left Seraph Light Wing */}
          <span className="absolute -left-7 top-1/2 -translate-y-1/2 flex items-center text-amber-300 text-base select-none seraph-wing-left drop-shadow-[0_0_12px_#fde047]">
            🪽
          </span>

          {/* Right Seraph Light Wing */}
          <span className="absolute -right-7 top-1/2 -translate-y-1/2 flex items-center text-amber-300 text-base select-none seraph-wing-right drop-shadow-[0_0_12px_#fde047]">
            🪽
          </span>

          {/* Falling Golden Holy Manna Sparkles */}
          <span className="absolute -top-2 left-1/4 text-yellow-200 text-xs seraph-manna-1 select-none">✦</span>
          <span className="absolute -top-1 right-1/4 text-white text-[10px] seraph-manna-2 select-none">✧</span>
        </span>
      )}

      {/* =========================================================================
          GODLY 5: TACHYON QUANTUM OVERDRIVE (250,000c - Pinnacle Artifact)
          MECHANIC: Cyber Laser Scanner Beam, HUD Target Brackets & Electric Lightning
          ========================================================================= */}
      {nameEffect === 'quantum_overdrive' && (
        <span className="absolute inset-0 pointer-events-none flex items-center justify-center -z-0 overflow-visible" aria-hidden="true">
          {/* Laser Scanner Line Sweeping Across the Name */}
          <span className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-white to-emerald-400 shadow-[0_0_12px_#22d3ee] quantum-laser-scanner z-20 pointer-events-none" />

          {/* Holographic HUD Targeting Reticle Brackets on all 4 corners */}
          <span className="absolute -top-1.5 -left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400 quantum-hud-bracket" />
          <span className="absolute -top-1.5 -right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400 quantum-hud-bracket" />
          <span className="absolute -bottom-1.5 -left-2 w-2 h-2 border-b-2 border-l-2 border-emerald-400 quantum-hud-bracket" />
          <span className="absolute -bottom-1.5 -right-2 w-2 h-2 border-b-2 border-r-2 border-emerald-400 quantum-hud-bracket" />

          {/* Crackling Electric Lightning Arcs */}
          <span className="absolute -top-2.5 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent quantum-lightning" />
          <span className="absolute -bottom-2 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent quantum-lightning" style={{ animationDelay: '0.4s' }} />

          {/* Quantum Binary Stream Telemetry */}
          <span className="absolute -top-4 right-0 text-[8px] font-mono text-cyan-300 font-bold tracking-widest quantum-binary select-none">
            [SYS:01]
          </span>
          <span className="absolute -bottom-4 left-0 text-[8px] font-mono text-emerald-400 font-bold tracking-widest quantum-binary select-none" style={{ animationDelay: '0.8s' }}>
            ⚡ 100%
          </span>
        </span>
      )}

      {namePrefix && (
        <span className="text-white/60 text-[0.8em] font-mono select-none relative z-10">
          {namePrefix}
        </span>
      )}

      <span className={`relative z-10 transition-all duration-300 ${effectClass}`}>
        {displayName}
      </span>

      {nameSuffix && (
        <span className="text-white/60 text-[0.8em] font-mono select-none relative z-10">
          {nameSuffix}
        </span>
      )}
    </span>
  );
}
