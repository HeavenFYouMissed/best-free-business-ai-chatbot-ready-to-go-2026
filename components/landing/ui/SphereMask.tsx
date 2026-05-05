// Startup template — components/magicui/sphere-mask.tsx
// Cinematic spotlight transition between sections, brand cyan tinted.
//
// Responsive sizing: the original template used a fixed `h-[50rem]` + huge
// negative margins which created a giant empty scroll band on mobile because
// the sphere couldn't collapse with the viewport. We scale height + margins
// per breakpoint so the effect is dense on mobile, expansive on desktop.
import { cn } from "@/components/landing/utils";

export function SphereMask({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "[--color:var(--color-accent)]",
        "pointer-events-none relative -z-[2] mx-auto overflow-hidden",
        "h-[28rem] sm:h-[36rem] md:h-[44rem] lg:h-[50rem]",
        // sphere mask — radial fade from center
        "[mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)]",
        reverse
          ? "my-[-10rem] rotate-180 sm:my-[-14rem] md:my-[-18rem] md:mt-[-22rem] lg:mt-[-30rem]"
          : "my-[-8rem] sm:my-[-12rem] md:my-[-16rem] lg:my-[-18.8rem]",
        // glow halo
        "before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)]",
        // bottom curved horizon line
        "after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-white/10 after:bg-[var(--color-bg)]",
      )}
    />
  );
}
