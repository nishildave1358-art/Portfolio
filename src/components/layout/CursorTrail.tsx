import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./CursorTrail.css";

interface TrailDot {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  size: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const dotsRef = useRef<TrailDot[]>([]);
  const animRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const dx = mouseRef.current.x - mouseRef.current.px;
      const dy = mouseRef.current.y - mouseRef.current.py;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 3) {
        const count = Math.min(3, Math.floor(speed / 8));
        for (let i = 0; i < count; i++) {
          dotsRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 4,
            y: mouseRef.current.y + (Math.random() - 0.5) * 4,
            life: 1,
            maxLife: 20 + Math.random() * 20,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5 - 0.3,
            size: 1.5 + Math.random() * 2,
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = dotsRef.current.length - 1; i >= 0; i--) {
        const dot = dotsRef.current[i];
        dot.life++;
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vy += 0.01;

        const progress = dot.life / dot.maxLife;
        const alpha = 1 - progress;

        if (progress >= 1) {
          dotsRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 255, 46, ${alpha * 0.5})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail"
      aria-hidden="true"
    />
  );
}
