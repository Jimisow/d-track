// Confettis maison sur canvas — léger, sans dépendance.
import { SYMBOLS } from '../game/symbols.js';

export function launchConfetti(duration = 2800) {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = SYMBOLS.map((s) => s.color);
  const parts = Array.from({ length: 140 }, () => ({
    x: Math.random() * innerWidth,
    y: -20 - Math.random() * innerHeight * 0.4,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 8,
    vy: 2 + Math.random() * 3,
    vx: -1.4 + Math.random() * 2.8,
    rot: Math.random() * Math.PI,
    vr: -0.12 + Math.random() * 0.24,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  const start = performance.now();
  let raf;

  function frame(now) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const elapsed = now - start;
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (elapsed < duration) {
      raf = requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      cancelAnimationFrame(raf);
    }
  }
  raf = requestAnimationFrame(frame);
}
