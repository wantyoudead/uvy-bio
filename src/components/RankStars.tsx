import React from 'react';

interface RankStarsProps {
  stars: number; // 1 to 5
  rankTitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RankStars({ stars, rankTitle = 'Member', size = 'md' }: RankStarsProps) {
  const isTopRank = stars >= 5;
  const isHighRank = stars === 4;

  const starCount = Math.max(1, Math.min(5, stars));
  const emptyStars = Math.max(0, 5 - starCount);

  // Size classes
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-6 h-6';
      case 'md':
      default:
        return isTopRank ? 'w-5 h-5' : 'w-4 h-4';
    }
  };

  // Animation & Color classes based on rank
  const getRankAnimationClass = (index: number) => {
    if (isTopRank) {
      return 'animate-spin-3d-prism';
    }
    if (isHighRank) {
      return 'animate-spin-3d-emerald';
    }
    return 'animate-spin-3d-blue';
  };

  return (
    <div
      className="inline-flex items-center justify-center gap-1 select-none py-1"
      style={{ perspective: '500px' }}
      title={`${rankTitle} - ${stars} Star Rank`}
    >
      {[...Array(starCount)].map((_, i) => (
        <span
          key={`star-${i}`}
          className={`inline-block transition-transform duration-300 ${getSizeClass()} ${getRankAnimationClass(i)}`}
          style={{
            animationDelay: `${i * 0.18}s`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Faceted 3D Gold / Prismatic Vector Star */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full drop-shadow-md"
            style={{
              filter: isTopRank
                ? 'drop-shadow(0 0 6px currentColor) drop-shadow(0 0 12px currentColor)'
                : isHighRank
                ? 'drop-shadow(0 0 5px currentColor)'
                : 'drop-shadow(0 0 3px currentColor)'
            }}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </span>
      ))}

      {/* Inactive empty stars for lower ranks */}
      {[...Array(emptyStars)].map((_, i) => (
        <span
          key={`empty-${i}`}
          className={`inline-block ${getSizeClass()} text-white/15 opacity-40`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </span>
      ))}
    </div>
  );
}
