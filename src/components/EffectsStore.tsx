import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, Coins, Gift, Flame, Shield, ArrowRight } from 'lucide-react';
import { NameEffect, NameEffectId } from '../types';
import { NAME_EFFECTS } from '../data/effects';
import { NameDisplay } from './NameDisplay';

interface EffectsStoreProps {
  displayName: string;
  currentEffect: NameEffectId;
  ownedEffects: NameEffectId[];
  userCredits: number;
  onEquipEffect: (effectId: NameEffectId) => void;
  onBuyEffect: (effect: NameEffect) => void;
  onClaimDaily: () => void;
  onClaimGodlyGrant: (amount?: number) => void;
  onOpenPricing?: () => void;
  showToast: (msg: string) => void;
}

export function EffectsStore({
  displayName,
  currentEffect,
  ownedEffects,
  userCredits,
  onEquipEffect,
  onBuyEffect,
  onClaimDaily,
  onClaimGodlyGrant,
  onOpenPricing,
  showToast
}: EffectsStoreProps) {
  const [filterRarity, setFilterRarity] = useState<string>('All');
  const [previewEffect, setPreviewEffect] = useState<NameEffectId>(currentEffect);

  const filteredEffects = NAME_EFFECTS.filter((e) => {
    if (filterRarity === 'All') return true;
    return e.rarity === filterRarity;
  });

  const getRarityBadge = (rarity: NameEffect['rarity']) => {
    switch (rarity) {
      case 'Godly':
        return 'bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 text-white border-purple-400/80 shadow-[0_0_18px_rgba(168,85,247,0.5)] font-black tracking-widest';
      case 'Mythic':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]';
      case 'Legendary':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]';
      case 'Epic':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'Rare':
      default:
        return 'bg-zinc-800 text-zinc-300 border-white/10';
    }
  };

  return (
    <div className="w-full max-w-4xl my-6 flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Store Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-950 to-zinc-950 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
              Exclusive Status Store
            </span>
            <span className="text-xs text-white/40">uvy.bio Perks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5 flex items-center gap-2.5">
            <span>Animated Name Effects</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-lg">
            Stand out in bio links, explore showcases, and community discussions with custom holographic, glitch, and flaming name animations.
          </p>
        </div>

        {/* User Balance & Daily Reward Card */}
        <div className="flex flex-col sm:items-end gap-2 p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-white">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-lg font-black font-mono tracking-tight text-amber-300">
                {userCredits.toLocaleString()}
              </span>
              <span className="text-xs text-white/50">Credits</span>
            </div>

            {onOpenPricing && (
              <button
                onClick={onOpenPricing}
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/50 text-purple-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Buy (USD)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                onClaimDaily();
                showToast('Claimed +250 Free Daily Credits!');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold text-xs transition-all flex items-center gap-1"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>+250</span>
            </button>

            <button
              onClick={() => {
                onClaimGodlyGrant(50000);
                showToast('Godly Grant: +50,000 Credits Granted!');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-purple-200 font-bold text-xs transition-all flex items-center gap-1"
              title="Claim 50,000 credits"
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>+50k</span>
            </button>

            <button
              onClick={() => {
                onClaimGodlyGrant(250000);
                showToast('Supreme Godly Grant: +250,000 Credits Granted!');
              }}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-cyan-500/40 hover:from-purple-600/60 hover:to-cyan-500/60 border border-purple-400 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-pulse"
              title="Claim 250,000 credits to test all Godly effects"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>+250k Supreme Grant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Interactive Preview Box */}
      <div className="p-5 rounded-xl bg-zinc-950/80 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
            <Flame className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] text-white/40 uppercase font-mono tracking-wider">Live Name Status Preview</span>
            <div className="text-2xl mt-0.5">
              <NameDisplay displayName={displayName} nameEffect={previewEffect} />
            </div>
          </div>
        </div>

        <div className="text-xs text-white/50 font-mono">
          Hover or click any effect card below to test preview
        </div>
      </div>

      {/* Rarity Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Godly', 'Mythic', 'Legendary', 'Epic', 'Rare'].map((rarity) => (
          <button
            key={rarity}
            onClick={() => setFilterRarity(rarity)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterRarity === rarity
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {rarity === 'Godly' ? '★ Godly' : rarity}
          </button>
        ))}
      </div>

      {/* Effects Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEffects.map((effect) => {
          const isOwned = ownedEffects.includes(effect.id) || effect.price === 0;
          const isEquipped = currentEffect === effect.id;
          const isAffordable = userCredits >= effect.price;

          return (
            <div
              key={effect.id}
              onMouseEnter={() => setPreviewEffect(effect.id)}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 group ${
                isEquipped
                  ? 'bg-purple-950/20 border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.15)]'
                  : 'bg-zinc-950/60 border-white/10 hover:border-white/25 hover:bg-zinc-950'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getRarityBadge(effect.rarity)}`}>
                    {effect.rarity}
                  </span>

                  <span className="text-[11px] font-mono text-white/40">
                    {effect.price === 0 ? 'DEFAULT' : `${effect.price} CREDITS`}
                  </span>
                </div>

                {/* Effect Name & Live Demo */}
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>{effect.name}</span>
                  {isEquipped && (
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Equipped
                    </span>
                  )}
                </h3>

                <p className="text-xs text-white/55 mt-1 leading-relaxed">
                  {effect.description}
                </p>

                {/* Preview on user's name */}
                <div className="mt-3 p-3 rounded-lg bg-black/70 border border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-white/40 uppercase font-mono">Effect Sample:</span>
                  <div className="text-lg">
                    <NameDisplay displayName={displayName} nameEffect={effect.id} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                {isEquipped ? (
                  <button
                    disabled
                    className="w-full py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-default"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Active on Profile</span>
                  </button>
                ) : isOwned ? (
                  <button
                    onClick={() => {
                      onEquipEffect(effect.id);
                      showToast(`Equipped ${effect.name}!`);
                    }}
                    className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                  >
                    <span>Equip Effect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!isAffordable) {
                        showToast('Not enough credits! Claim the free daily reward above.');
                        return;
                      }
                      onBuyEffect(effect);
                      showToast(`Unlocked ${effect.name}!`);
                    }}
                    disabled={!isAffordable}
                    className={`w-full py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      isAffordable
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:scale-[1.02]'
                        : 'bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Unlock for {effect.price} Credits</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
