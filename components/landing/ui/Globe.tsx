"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/components/landing/utils";

const DAMPING = 1400;

const BASE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.5,
  mapSamples: 16000,
  mapBrightness: 1.4,
  baseColor: [0.32, 0.4, 0.5],
  glowColor: [0, 212 / 255, 255 / 255],
  markerColor: [0 / 255, 212 / 255, 255 / 255],
  markers: [
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [41.7658, -72.6734], size: 0.12 },
    { location: [51.5074, -0.1278], size: 0.08 },
    { location: [37.7749, -122.4194], size: 0.08 },
    { location: [34.0522, -118.2437], size: 0.06 },
    { location: [52.52, 13.405], size: 0.06 },
    { location: [48.8566, 2.3522], size: 0.06 },
    { location: [-33.8688, 151.2093], size: 0.05 },
    { location: [35.6762, 139.6503], size: 0.07 },
    { location: [1.3521, 103.8198], size: 0.05 },
    { location: [25.2048, 55.2708], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.06 },
    { location: [19.4326, -99.1332], size: 0.06 },
    { location: [55.7558, 37.6173], size: 0.05 },
    { location: [28.6139, 77.209], size: 0.07 },
  ],
};

type GlobeProps = {
  className?: string;
  config?: Partial<COBEOptions>;
};

export function Globe({ className, config = {} }: GlobeProps) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const finalConfig = useMemo(
    () => ({ ...BASE_CONFIG, ...config }),
    [config],
  );

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / DAMPING);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...finalConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    });

    let raf = 0;
    const tick = () => {
      if (!pointerInteracting.current) phiRef.current += 0.005;
      globe.update({
        phi: phiRef.current + rs.get(),
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [finalConfig, rs]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
