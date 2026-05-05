import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/landing/ui/Accordion";

export function LandingFAQ() {
  const { faq } = landingConfig;

  return (
    <section
      id="faq"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-10 px-6 md:px-10">
        <SectionHeader eyebrow={faq.eyebrow} title={faq.title} />

        <Accordion type="single" collapsible className="grid w-full gap-2.5">
          {faq.items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
