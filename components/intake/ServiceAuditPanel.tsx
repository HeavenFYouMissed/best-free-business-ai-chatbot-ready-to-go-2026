"use client";

import { ArrowRight, Mail } from "lucide-react";
import { openIntake, type IntakeScope } from "@/components/built-for-you/intakeBus";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";

type ServiceAuditPanelProps = {
  label?: string;
  index?: string;
  title: string;
  description: string;
  scope: IntakeScope;
  source: string;
  note: string;
  buttonLabel: string;
  emailSubject: string;
  footnote?: string;
};

export function ServiceAuditPanel({
  label = "Free audit",
  index = "AUD",
  title,
  description,
  scope,
  source,
  note,
  buttonLabel,
  emailSubject,
  footnote = "Free review · reply within 6 business hours · no spam · no weird drip funnel",
}: ServiceAuditPanelProps) {
  const mailtoHref = `mailto:daniel@publishd.app?subject=${encodeURIComponent(emailSubject)}`;

  return (
    <section className="container-tight">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-7 md:p-10">
        <SectionLabel index={index} label={label} />
        <h2 className="mt-4 max-w-[16ch] text-balance text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
          {title}
        </h2>
        <p className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ShipButton
            href="#free-audit"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              openIntake({ scope, note, source });
            }}
          >
            {buttonLabel}
            <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
          </ShipButton>
          <a href={mailtoHref} className="btn btn--glass inline-flex items-center px-5 py-3 text-[14px]">
            <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
            daniel@publishd.app
          </a>
        </div>

        <p className="mt-5 text-[12.5px] leading-relaxed text-[var(--color-muted)]">{footnote}</p>
      </div>
    </section>
  );
}