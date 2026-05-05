"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ShipButton } from "@/components/ui/ShipButton";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { openIntake } from "./intakeBus";

const Fireworks5 = dynamic(
  () => import("@/components/shaders/presets/Fireworks5").then((m) => m.Fireworks5),
  { ssr: false }
);

export function BfyFinalCta() {
  return (
    <SectionShell
      id="start"
      mode="peak"
      shader={() => <Fireworks5 className="h-full w-full" />}
      shaderOpacity={0.78}
      className="scroll-mt-28 py-24 md:py-32"
    >
      <div
        className="container-tight relative"
        style={{ ["--hotspot-x" as string]: "50%", ["--hotspot-y" as string]: "66%" }}
      >
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel index="07" label="Start" />
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-4 text-balance text-center">What are you building?</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-[46ch] text-center text-[16px] leading-relaxed text-[var(--color-muted)]">
            Sites, chatbots, app polish, or something custom. One intake, one builder, one
            flat fee. Tell me what you need.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ShipButton href="#start" size="large" onClick={(e) => { e.preventDefault(); openIntake({ scope: "general" }); }}>
              Start a project
              <ArrowRight className="icon" aria-hidden />
            </ShipButton>
            <a
              href="mailto:daniel@publishd.app"
              className="btn btn--ghost inline-flex min-h-[44px] items-center"
            >
              <Mail className="icon" aria-hidden />
              daniel@publishd.app
            </a>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-4 text-center text-[12.5px] text-[var(--color-muted)]">
            Responses typically within 6 hours · one flat fee · you own everything
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}

export default BfyFinalCta;
