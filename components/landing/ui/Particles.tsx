"use client";

import { useEffect, useRef, useState } from "react";

type ParticlesProps = {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  /** Hex string, e.g. "#00d4ff" */
  color?: string;
  vx?: number;
  vy?: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const v = parseInt(clean, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export function Particles({
  className,
  quantity = 90,
  staticity = 50,
  ease = 50,
  size = 0.5,
  refresh = false,
  color = "#00d4ff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const dprRef = useRef(1);
  const [rgb, setRgb] = useState<[number, number, number]>([0, 212, 255]);

  useEffect(() => {
    setRgb(hexToRgb(color));
  }, [color]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    dprRef.current = window.devicePixelRatio || 1;
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }

    const resize = () => {
      if (!containerRef.current || !canvasRef.current || !ctxRef.current) return;
      circlesRef.current = [];
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      sizeRef.current = { w, h };
      canvasRef.current.width = w * dprRef.current;
      canvasRef.current.height = h * dprRef.current;
      canvasRef.current.style.width = `${w}px`;
      canvasRef.current.style.height = `${h}px`;
      ctxRef.current.scale(dprRef.current, dprRef.current);
      // seed
      for (let i = 0; i < quantity; i++) {
        circlesRef.current.push(makeCircle(w, h, size));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = sizeRef.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) mouseRef.current = { x, y };
    };

    let raf = 0;
    const animate = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h);
      circlesRef.current.forEach((c, i) => {
        const edge = [
          c.x + c.translateX - c.size,
          sizeRef.current.w - c.x - c.translateX - c.size,
          c.y + c.translateY - c.size,
          sizeRef.current.h - c.y - c.translateY - c.size,
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remap = parseFloat(((closestEdge / 20) * 1).toFixed(2));
        if (remap > 1) {
          c.alpha = Math.min(c.alpha + 0.02, c.targetAlpha);
        } else {
          c.alpha = c.targetAlpha * Math.max(remap, 0);
        }
        c.x += c.dx + vx;
        c.y += c.dy + vy;
        c.translateX +=
          (mouseRef.current.x / (staticity / c.magnetism) - c.translateX) / ease;
        c.translateY +=
          (mouseRef.current.y / (staticity / c.magnetism) - c.translateY) / ease;
        drawCircle(ctx, c, rgb, dprRef.current);
        if (
          c.x < -c.size ||
          c.x > sizeRef.current.w + c.size ||
          c.y < -c.size ||
          c.y > sizeRef.current.h + c.size
        ) {
          circlesRef.current.splice(i, 1);
          circlesRef.current.push(
            makeCircle(sizeRef.current.w, sizeRef.current.h, size),
          );
        }
      });
      raf = requestAnimationFrame(animate);
    };

    resize();
    raf = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [quantity, ease, size, staticity, vx, vy, rgb, refresh]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function makeCircle(w: number, h: number, baseSize: number): Circle {
  return {
    x: Math.floor(Math.random() * w),
    y: Math.floor(Math.random() * h),
    translateX: 0,
    translateY: 0,
    size: Math.floor(Math.random() * 2) + baseSize,
    alpha: 0,
    targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    magnetism: 0.1 + Math.random() * 4,
  };
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  c: Circle,
  rgb: [number, number, number],
  dpr: number,
) {
  ctx.translate(c.translateX, c.translateY);
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
  ctx.fillStyle = `rgba(${rgb.join(", ")}, ${c.alpha})`;
  ctx.fill();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
