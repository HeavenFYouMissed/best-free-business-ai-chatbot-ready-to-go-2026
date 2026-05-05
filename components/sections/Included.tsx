"use client";

import dynamic from "next/dynamic";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import { StackReveal } from "@/components/ui/StackReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { DiscretionBadge } from "@/components/ui/DiscretionBadge";

const EnterTheMatrix = dynamic(
  () => import("@/components/shaders/presets/EnterTheMatrix").then((m) => m.EnterTheMatrix),
  { ssr: false }
);

type Column = {
  title: string;
  items: string[];
  variant: "simplex" | "warp" | "ripple";
  color: string;
};

const columns: Column[] = [
  {
    title: "Technical",
    variant: "simplex",
    color: "#00d4ff",
    items: [
      "Native iOS + Android build (Capacitor or Expo — whichever fits)",
      "Native features to pass Apple 4.2 (push, biometric, offline, share)",
      "App signing + certificate management",
      "Bundle ID + provisioning profile setup",
      "Version management",
    ],
  },
  {
    title: "Store assets",
    variant: "warp",
    color: "#ff6b3d",
    items: [
      "App icon in all 20+ required sizes",
      "Screenshots for 6 device classes (iPhone, iPad, Android phone, tablet)",
      "App Store description + keyword optimization",
      "Privacy policy, auto-generated and customized",
      "Category selection",
    ],
  },
  {
    title: "Submission",
    variant: "ripple",
    color: "#7cf0d4",
    items: [
      "App Store Connect full submission",
      "Google Play Console full submission",
      "Rejection handling + appeals — included, not extra",
      "30 days of post-launch support",
    ],
  },
];

export function Included() {
  return (
    <SectionShell
      id="included"
      mode="peak"
      shader={() => <EnterTheMatrix className="h-full w-full" />}
      shaderOpacity={0.45}
      className="py-16 md:py-24"
    >
      <div
        className="container-x"
        style={{ ["--hotspot-x" as string]: "50%", ["--hotspot-y" as string]: "18%" }}
      >
        <Reveal>
          <SectionLabel index="05" label="What's included" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-[24ch] text-balance">Everything between your URL and live.</h2>
        </Reveal>

        <Reveal delay={140}>
          <DiscretionBadge
            variant="banner"
            className="mt-6"
            sublabel="Customers stay anonymous by default. I don't list clients, leak transcripts, or name who built what — ever. Your idea, your stealth launch, your call."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {columns.map((col, i) => (
            <StackReveal key={col.title} index={i} count={columns.length}>
              <div className="glass-card relative h-full overflow-hidden rounded-[var(--radius-lg)]">
                <ShaderBackdrop variant={col.variant} color={col.color} opacity={0.18} size={1.5} />
                <div className="relative p-6">
                  <div className="mono-label mb-5">[ {col.title.toLowerCase()} ]</div>
                  <ul className="space-y-2.5 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full"
                          style={{ background: col.color }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StackReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
