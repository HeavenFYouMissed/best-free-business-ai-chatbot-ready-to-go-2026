"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ShipButton } from "@/components/ui/ShipButton";
import { SectionShell } from "@/components/ui/SectionShell";

const Fireworks5 = dynamic(
  () => import("@/components/shaders/presets/Fireworks5").then((m) => m.Fireworks5),
  { ssr: false }
);

export function FinalCta() {
  return (
    <SectionShell
      id="contact"
      mode="peak"
      shader={() => <Fireworks5 className="h-full w-full" />}
      shaderOpacity={0.85}
      className="py-24 md:py-32"
    >
      <div
        className="container-tight relative"
        style={{ ["--hotspot-x" as string]: "50%", ["--hotspot-y" as string]: "66%" }}
      >
        <Reveal>
          <h2 className="text-balance text-center">
            Your app deserves to be in the App Store.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-5 max-w-[46ch] text-center text-[16px] leading-relaxed text-[var(--color-muted)]">
            Stop letting platform bureaucracy kill your momentum. Ship it this week.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ShipButton href="#pricing" size="large">
              Ship my app <span className="num">— $399</span>
              <ArrowRight className="icon" aria-hidden />
            </ShipButton>
            <Link
              href="/kickoff"
              className="btn btn--glass inline-flex min-h-[44px] items-center px-5 py-3 text-[14px] font-medium"
            >
              Start kickoff form
            </Link>
            <Link
              href="mailto:daniel@publishd.app"
              className="btn btn--ghost inline-flex min-h-[44px] items-center"
            >
              <Mail className="icon" aria-hidden />
              daniel@publishd.app
            </Link>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 text-center text-[12.5px] text-[var(--color-muted)]">
            Prefer to think it over? Email first — responses typically within hours.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
