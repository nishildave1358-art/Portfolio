import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./InteractiveHeroVisual.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  hue: number;
}

interface CodeLine {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  text: string;
  length: number;
}

interface CodeFragment {
  x: number;
  y: number;
  text: string;
  opacity: number;
  baseOpacity: number;
  rotation: number;
  scale: number;
  drift: number;
}

interface GridPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

const CODE_SNIPPETS = [
  "const app = () => {}",
  "import React from 'react'",
  "fetch('/api/data')",
  "async function init()",
  "npm run dev",
  "git commit -m 'feat'",
  "<Component />",
  "useState(false)",
  "TypeScript generics",
  "export default",
  "if (vuln.scan()) {",
  "nmap -sV target",
  "try { decrypt() }",
  "Promise.all([])",
  ".map(x => x.id)",
  "console.log('debug')",
  "SELECT * FROM",
  "docker build .",
  "process.env.NODE",
  "interface Props {}",
];

const DATA_STREAMS = [
  "01100110 01101111",
  "10101011 11001100",
  "FF A0 B2 C1 D3",
  "a3:f2:91:bc:e7",
  "GET /api/v1/users",
  "200 OK | 301 →",
  "TCP → SYN → ACK",
  "RSA-2048 enc",
  "hash: sha256",
  "CVE-2026-XXXX",
];

export default function InteractiveHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const codeLinesRef = useRef<CodeLine[]>([]);
  const fragmentsRef = useRef<CodeFragment[]>([]);
  const gridPulsesRef = useRef<GridPulse[]>([]);
  const timeRef = useRef(0);
  const animRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  const init = useCallback((width: number, height: number) => {
    // Particles
    const pCount = Math.min(90, Math.floor((width * height) / 12000));
    particlesRef.current = Array.from({ length: pCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.1,
      opacity: 0,
      hue: Math.random() > 0.7 ? 0 : 1, // 0 = lime, 1 = white
    }));

    // Falling code streams (vertical)
    const streamCount = Math.min(8, Math.floor(width / 180));
    codeLinesRef.current = Array.from({ length: streamCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      speed: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.08 + 0.02,
      text: DATA_STREAMS[Math.floor(Math.random() * DATA_STREAMS.length)],
      length: Math.random() * 60 + 40,
    }));

    // Floating code fragments
    const fragCount = Math.min(10, Math.floor(pCount / 7));
    fragmentsRef.current = Array.from({ length: fragCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      opacity: Math.random() * 0.1 + 0.03,
      baseOpacity: Math.random() * 0.1 + 0.03,
      rotation: (Math.random() - 0.5) * 0.15,
      scale: 0.7 + Math.random() * 0.5,
      drift: Math.random() * 0.2 + 0.05,
    }));

    // Occasional grid pulses
    gridPulsesRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      init(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      }
    };

    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouch, { passive: true });

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const mouse = mouseRef.current;
      timeRef.current += 0.016;

      ctx.clearRect(0, 0, W, H);

      if (reducedMotion) {
        // Static rendering
        for (const p of particlesRef.current) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.hue === 0
            ? `rgba(200, 255, 46, ${p.baseOpacity * 0.5})`
            : `rgba(240, 236, 228, ${p.baseOpacity * 0.3})`;
          ctx.fill();
        }
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // ── Grid (very subtle) ──
      const gridSize = 80;
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // ── Grid pulses (spawn randomly) ──
      if (Math.random() < 0.005) {
        gridPulsesRef.current.push({
          x: Math.random() * W,
          y: Math.random() * H,
          radius: 0,
          maxRadius: 60 + Math.random() * 80,
          opacity: 0.15,
          speed: 0.8 + Math.random() * 0.5,
        });
      }

      for (let i = gridPulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = gridPulsesRef.current[i];
        pulse.radius += pulse.speed;
        pulse.opacity *= 0.97;

        if (pulse.opacity < 0.01 || pulse.radius > pulse.maxRadius) {
          gridPulsesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 255, 46, ${pulse.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Particles ──
      const particles = particlesRef.current;
      for (const p of particles) {
        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.vx -= (dx / (dist || 1)) * force * 0.03;
          p.vy -= (dy / (dist || 1)) * force * 0.03;
          p.opacity = Math.min(p.baseOpacity * 2, p.opacity + 0.02);
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        // Gentle drift
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.hue === 0) {
          ctx.fillStyle = `rgba(200, 255, 46, ${p.opacity})`;
        } else {
          ctx.fillStyle = `rgba(240, 236, 228, ${p.opacity * 0.6})`;
        }
        ctx.fill();
      }

      // ── Connections ──
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200, 255, 46, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // ── Mouse proximity lines (connections to cursor) ──
      if (mouse.x > 0 && mouse.y > 0) {
        for (const p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 150) {
            const alpha = (1 - d / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(200, 255, 46, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ── Falling data streams ──
      ctx.font = '9px "JetBrains Mono", monospace';
      for (const stream of codeLinesRef.current) {
        stream.y += stream.speed;
        if (stream.y > H + 50) {
          stream.y = -50;
          stream.x = Math.random() * W;
          stream.text = DATA_STREAMS[Math.floor(Math.random() * DATA_STREAMS.length)];
        }

        ctx.fillStyle = `rgba(200, 255, 46, ${stream.opacity})`;
        ctx.fillText(stream.text, stream.x, stream.y);
      }

      // ── Floating code fragments ──
      ctx.font = '10px "JetBrains Mono", monospace';
      for (const frag of fragmentsRef.current) {
        frag.y -= frag.drift;
        frag.x += Math.sin(timeRef.current + frag.x * 0.01) * 0.15;

        if (frag.y < -30) {
          frag.y = H + 30;
          frag.x = Math.random() * W;
          frag.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        }

        // Mouse brightness
        const dx = mouse.x - frag.x;
        const dy = mouse.y - frag.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const mouseFactor = d < 200 ? 1 + (1 - d / 200) * 2 : 1;
        frag.opacity += (frag.baseOpacity * mouseFactor - frag.opacity) * 0.05;

        ctx.save();
        ctx.translate(frag.x, frag.y);
        ctx.rotate(frag.rotation);
        ctx.scale(frag.scale, frag.scale);
        ctx.fillStyle = `rgba(200, 255, 46, ${Math.min(frag.opacity, 0.25)})`;
        ctx.fillText(frag.text, 0, 0);
        ctx.restore();
      }

      // ── Radial vignette ──
      const gradient = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.5, H * 0.5, W * 0.7);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0.6)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, [reducedMotion, init]);

  return <canvas ref={canvasRef} className="hero-visual" aria-hidden="true" />;
}
