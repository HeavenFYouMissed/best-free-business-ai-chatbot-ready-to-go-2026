import Image from "next/image";

import { cn } from "@/components/landing/utils";

/**
 * IphoneFrame — premium iPhone X-style bezel sourced from the Cruip Appy
 * template (lifetime license). Asset lives at `/devices/iphone-frame.png`
 * (688×1348, transparent center).
 *
 * Renders by layering the screenshot at 84.33% of the wrapper width — the
 * exact inset where the frame's transparent screen area sits — and stacking
 * the bezel on top. Works on top of screenshots that already have a frame
 * baked in (the new bezel covers the old one because 84.33% pushes the
 * underlying content inside the new frame).
 *
 * Usage:
 *   <IphoneFrame src="/work/superclaw-chat.png" alt="SuperClaw chat" />
 *
 *   <IphoneFrame alt="AI chat">
 *     <CustomChatPanel />
 *   </IphoneFrame>
 */

type IphoneFrameProps = {
  /** Screenshot image source (recommended path: `/work/...`) */
  src?: string;
  /** Alt text for the screenshot (required for a11y) */
  alt: string;
  /** Optional priority hint for above-the-fold uses */
  priority?: boolean;
  /** Custom children rendered inside the frame instead of an image. */
  children?: React.ReactNode;
  /** Optional wrapper className */
  className?: string;
  /** Tailwind sizes attr for the screenshot image */
  sizes?: string;
  /**
   * Fill the parent box instead of enforcing the device aspect ratio.
   * Use for embedded UIs (e.g. chat panel) where the outer shell sets size.
   */
  fill?: boolean;
};

export function IphoneFrame({
  src,
  alt,
  priority = false,
  children,
  className,
  sizes,
  fill = false,
}: IphoneFrameProps) {
  return (
    <div
      className={cn(
        fill
          ? "relative block h-full min-h-0 w-full select-none"
          : "relative inline-flex aspect-[688/1348] w-full select-none items-center justify-center",
        className,
      )}
    >
      {/* Inner content area — sized to the frame's transparent screen window
          (84.33% wide, ~92% tall). Anything passed as children or as `src`
          renders here. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10%/5%]" style={{ width: "84.33%", height: "92.5%" }}>
        {children ? (
          children
        ) : src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "(max-width: 640px) 60vw, 240px"}
            className="object-cover"
            priority={priority}
          />
        ) : null}
      </div>

      {/* Bezel — sits on top, pointer-events disabled so clicks pass through
          to the screen content underneath. */}
      <Image
        src="/devices/iphone-frame.png"
        alt=""
        aria-hidden="true"
        width={688}
        height={1348}
        className="pointer-events-none relative z-10 h-full w-full object-contain"
        priority={priority}
      />
    </div>
  );
}
