import React, { useRef, useEffect } from 'react';
import { ProfileData } from '../types';

export function BackgroundRenderer({
  effect,
  accent
}: {
  effect: ProfileData['styling']['backgroundEffect'];
  accent: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (effect === 'pure_black') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particleCount = effect === 'stars' ? 90 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (effect === 'stars' ? 1.5 : 2.5) + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (effect === 'grid') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        const step = 48;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [effect]);

  if (effect === 'pure_black') {
    return <div className="fixed inset-0 pointer-events-none bg-black z-0" />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ backgroundColor: accent }}
      />
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
    </div>
  );
}
