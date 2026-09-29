import React, { useState } from 'react';
import {
  Sparkles,
  Coins,
  Crown,
  Check,
  X,
  CreditCard,
  ShieldCheck,
  Zap,
  Flame,
  ArrowRight,
  Gift,
  Lock,
  Layers,
  Code
} from 'lucide-react';
import { CurrencyPackage, UserSubscription, SubscriptionTier } from '../types';
import { CURRENCY_PACKAGES, SUBSCRIPTION_PLANS, SubscriptionPlan } from '../data/pricing';

interface PricingStoreProps {
  userCredits: number;
  subscription: UserSubscription;
  onPurchaseCredits: (pkg: CurrencyPackage) => void;
  onSubscribe: (tier: SubscriptionTier, billingCycle: 'monthly' | 'yearly') => void;
  onCancelSubscription: () => void;
  showToast: (msg: string) => void;
  onNavigateToCustomize: () => void;
}

export function PricingStore({
  userCredits,
  subscription,
  onPurchaseCredits,
  onSubscribe,
  onCancelSubscription,
  showToast,
  onNavigateToCustomize
}: PricingStoreProps) {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'currency'>('subscriptions');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Checkout Modal State
  const [selectedPackage, setSelectedPackage] = useState<CurrencyPackage | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenCurrencyCheckout = (pkg: CurrencyPackage) => {
    setSelectedPackage(pkg);
    setSelectedPlan(null);
    setIsCheckoutOpen(true);
  };

  const handleOpenPlanCheckout = (plan: SubscriptionPlan) => {
    if (plan.id === subscription.tier) {
      showToast(`You are already subscribed to ${plan.name}`);
      return;
    }
    setSelectedPlan(plan);
    setSelectedPackage(null);
    setIsCheckoutOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutOpen(false);

      if (selectedPackage) {
        onPurchaseCredits(selectedPackage);
        showToast(
          `Payment Successful! +${(
            selectedPackage.credits + selectedPackage.bonusCredits
          ).toLocaleString()} credits added to your vault.`
        );
      } else if (selectedPlan) {
        onSubscribe(selectedPlan.id, billingCycle);
        showToast(`Welcome to ${selectedPlan.name}! All exclusive tier features are unlocked.`);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl my-6 flex flex-col gap-8 animate-in fade-in duration-200">
      {/* Top Banner: Currency & Membership Hub */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-zinc-950 to-zinc-950 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-[11px] font-black text-purple-200 uppercase tracking-widest animate-pulse">
              Official uvy.bio Store
            </span>
            <span className="text-xs text-white/50">Real Currency & Perks</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center gap-2.5">
            <span>Membership & Credit Vault</span>
            <Crown className="w-6 h-6 text-amber-400" />
          </h2>

          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-lg">
            Purchase in-platform currency packages or subscribe to unlock Godly effects, custom CSS injection, holographic borders, and 5-Star VIP status.
          </p>
        </div>

        {/* Current Active Status Card */}
        <div className="relative z-10 flex flex-col gap-2.5 p-4 rounded-xl bg-black/70 border border-white/20 backdrop-blur-md flex-shrink-0 min-w-[240px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/50 uppercase font-mono tracking-wider">Your Balance</span>
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-black text-sm">
              <Coins className="w-4 h-4" />
              <span>{userCredits.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-white/50 font-mono">Current Plan</span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full border ${
                subscription.tier === 'godly_vip'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                  : subscription.tier === 'plus'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                  : 'bg-zinc-800 text-white/60 border-white/10'
              }`}
            >
              {subscription.tier === 'godly_vip'
                ? '★ GODLY VIP'
                : subscription.tier === 'plus'
                ? 'PLUS MEMBER'
                : 'FREE TIER'}
            </span>
          </div>

          {subscription.tier !== 'free' && (
            <button
              onClick={() => {
                onCancelSubscription();
                showToast('Subscription canceled. Reverted to Free tier.');
              }}
              className="text-[10px] text-red-400/80 hover:text-red-300 underline font-mono text-right transition-colors"
            >
              Cancel Membership
            </button>
          )}
        </div>
      </div>

      {/* Navigation Switcher: Subscriptions vs Buy Credits */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-950 border border-white/15">
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'subscriptions'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>VIP Subscriptions</span>
          </button>

          <button
            onClick={() => setActiveTab('currency')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'currency'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Buy Credits (USD)</span>
          </button>
        </div>

        {activeTab === 'subscriptions' && (
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className={billingCycle === 'monthly' ? 'text-white font-bold' : 'text-white/50'}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-12 h-6 rounded-full bg-zinc-800 border border-white/20 p-0.5 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-purple-400 shadow-md transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={billingCycle === 'yearly' ? 'text-purple-300 font-bold' : 'text-white/50'}>
              Yearly <span className="text-[10px] text-emerald-400 font-mono">(Save 20%)</span>
            </span>
          </div>
        )}
      </div>

      {/* =========================================================================
          TAB 1: SUBSCRIPTION TIERS (FREE vs PLUS vs GODLY VIP)
          ========================================================================= */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = subscription.tier === plan.id;
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const billingPeriodText = billingCycle === 'yearly' ? '/year' : '/month';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-purple-950/60 to-zinc-950 border-2 border-purple-500 shadow-[0_0_35px_rgba(168,85,247,0.25)]'
                    : 'bg-zinc-950/80 border border-white/15 hover:border-white/30'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-black tracking-widest text-white shadow-lg uppercase">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">{plan.name}</h3>
                    {plan.id === 'godly_vip' && <Crown className="w-5 h-5 text-amber-400 animate-bounce" />}
                    {plan.id === 'plus' && <Sparkles className="w-5 h-5 text-emerald-400" />}
                  </div>

                  <p className="text-xs text-white/55 mt-1 min-h-[32px]">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-white">
                      ${price === 0 ? '0' : price.toFixed(2)}
                    </span>
                    <span className="text-xs text-white/50 font-mono">{billingPeriodText}</span>
                  </div>

                  {plan.creditsGrantedMonthly > 0 && (
                    <div className="mt-2 text-xs font-mono text-amber-300 flex items-center gap-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <Coins className="w-3.5 h-3.5" />
                      <span>+{plan.creditsGrantedMonthly.toLocaleString()} credits / month</span>
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <div className="mt-6 flex flex-col gap-2.5">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        {feat.included ? (
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              feat.godlyOnly ? 'text-amber-400' : 'text-emerald-400'
                            }`}
                          />
                        ) : (
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-white/20" />
                        )}
                        <span
                          className={`${
                            feat.included
                              ? feat.godlyOnly
                                ? 'text-purple-200 font-bold'
                                : 'text-white/85'
                              : 'text-white/30 line-through'
                          }`}
                        >
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscription Action Button */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  {isCurrent ? (
                    <div className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-center text-xs font-bold text-white/70">
                      Current Active Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenPlanCheckout(plan)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30'
                          : plan.id === 'plus'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-black'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <span>{plan.id === 'free' ? 'Downgrade to Free' : `Upgrade to ${plan.name}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          TAB 2: REAL LIFE MONEY CURRENCY PACKAGES
          ========================================================================= */}
      {activeTab === 'currency' && (
        <div className="flex flex-col gap-6">
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>All credit purchases are instant, permanent, and directly deposited to your uvy.bio balance.</span>
            <div className="flex items-center gap-1.5 text-white/40 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CURRENCY_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 rounded-2xl flex flex-col justify-between transition-all relative ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-purple-950/50 to-zinc-950 border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                    : 'bg-zinc-950/90 border border-white/15 hover:border-white/30'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[9px] font-black tracking-widest text-black shadow-md uppercase whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    {pkg.icon === 'crown' ? (
                      <Crown className="w-6 h-6 text-amber-400" />
                    ) : pkg.icon === 'flame' ? (
                      <Flame className="w-6 h-6 text-orange-400" />
                    ) : pkg.icon === 'sparkles' ? (
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    ) : (
                      <Coins className="w-6 h-6 text-yellow-400" />
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white">{pkg.name}</h3>

                  {/* Credits & Bonus */}
                  <div className="mt-2 flex flex-col gap-0.5">
                    <span className="text-2xl font-black font-mono text-amber-300">
                      {pkg.credits.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-white/50">Credits</span>
                    </span>
                    {pkg.bonusCredits > 0 && (
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        +{pkg.bonusCredits.toLocaleString()} Bonus Credits
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-white/50 mt-3 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xl font-black font-mono text-white">${pkg.priceUsd}</span>

                  <button
                    onClick={() => handleOpenCurrencyCheckout(pkg)}
                    className="px-4 py-2 rounded-lg bg-white hover:bg-white/90 text-black font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          FEATURE SHOWCASE: WHAT SUBSCRIBERS GET UNLOCKED
          ========================================================================= */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-white/15 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400">
              VIP Perk Architecture
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Features Locked For Free Users & Unlocked with GODLY VIP
            </h3>
          </div>
          <button
            onClick={onNavigateToCustomize}
            className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Customizer Studio</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Code className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                VIP ONLY
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">Raw CSS Injector</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Inject custom CSS styles, blur filters, pseudo-elements, and keyframe animations directly onto your bio card.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                VIP ONLY
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">Holographic Borders</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Unlock the animated Liquid Metal and Prismatic Holographic border styles that shimmer around your profile card.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Zap className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                VIP ONLY
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">Free Godly Effects Access</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Get all 5 Godly effects (Tachyon Overdrive, Seraph Halo, Supernova, etc.) with 0 credits required as long as you're subscribed.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CHECKOUT MODAL (Simulated Real-World Payment Gateway)
          ========================================================================= */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-zinc-950 border border-white/20 shadow-2xl flex flex-col gap-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Secure Checkout</h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 rounded text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Order Summary Item */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {selectedPackage ? selectedPackage.name : selectedPlan?.name}
                </h4>
                <p className="text-xs text-white/50">
                  {selectedPackage
                    ? `+${(selectedPackage.credits + selectedPackage.bonusCredits).toLocaleString()} Credits`
                    : `Billed ${billingCycle} · Full perks unlocked`}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black font-mono text-white">
                  $
                  {selectedPackage
                    ? selectedPackage.priceUsd
                    : billingCycle === 'yearly'
                    ? selectedPlan?.yearlyPrice.toFixed(2)
                    : selectedPlan?.monthlyPrice.toFixed(2)}
                </span>
                <span className="block text-[10px] text-emerald-400 font-mono">Instant Delivery</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white/70">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-purple-600/30 border-purple-500 text-white'
                      : 'bg-zinc-900 border-white/10 text-white/60'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'apple'
                      ? 'bg-purple-600/30 border-purple-500 text-white'
                      : 'bg-zinc-900 border-white/10 text-white/60'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'crypto'
                      ? 'bg-purple-600/30 border-purple-500 text-white'
                      : 'bg-zinc-900 border-white/10 text-white/60'
                  }`}
                >
                  <span>Crypto (SOL)</span>
                </button>
              </div>
            </div>

            {/* Simulated Card Fields */}
            {paymentMethod === 'card' && (
              <div className="flex flex-col gap-3 p-3.5 rounded-xl bg-black border border-white/10 font-mono text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/50">Card Number</span>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-zinc-900 px-3 py-1.5 rounded border border-white/15 text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-white/50">Expires</span>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="bg-zinc-900 px-3 py-1.5 rounded border border-white/15 text-white outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-white/50">CVC</span>
                    <input
                      type="text"
                      defaultValue="739"
                      className="bg-zinc-900 px-3 py-1.5 rounded border border-white/15 text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Pay Button */}
            <button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-extrabold text-sm transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    Confirm & Pay $
                    {selectedPackage
                      ? selectedPackage.priceUsd
                      : billingCycle === 'yearly'
                      ? selectedPlan?.yearlyPrice.toFixed(2)
                      : selectedPlan?.monthlyPrice.toFixed(2)}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
