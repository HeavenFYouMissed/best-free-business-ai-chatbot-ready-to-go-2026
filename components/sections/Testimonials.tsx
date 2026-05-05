import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";

const quoteVariants = ["wave", "swirl", "sphere"] as const;

const quotes: Array<{ body: string; context: string }> = [
  {
    body: "I'm sure there's a lot of value there. At every hurdle there's a demographic willing to pay you to take it across the finish line.",
    context: "Reddit user · r/vibecoding",
  },
  {
    body: "Would I have paid to not deal with all the asset images bullshit? Yes.",
    context: "Reddit user · r/SideProject",
  },
  {
    body: "I'd pay someone the premium to coach me through that. I get lost in the weeds too often trying to find best options.",
    context: "Reddit user · r/IndieHackers",
  },
];

export function Testimonials() {
  return (
    <section id="said">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="12" label="What people are saying" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-[24ch] text-balance">Real feedback from real builders.</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-3 max-w-[58ch] text-[14.5px] leading-relaxed text-[var(--color-muted)]">
            These are quotes from the threads where this service was validated. Attribution redacted to respect
            the posters.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.context} delay={i * 90}>
              <figure className="glass-card group relative h-full overflow-hidden rounded-[var(--radius-lg)] p-6">
                <ShaderBackdrop variant={quoteVariants[i % quoteVariants.length]} opacity={0.16} size={1.6} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 right-[-10%] h-40 w-40 rounded-full opacity-0 blur-[50px] transition-opacity duration-300 group-hover:opacity-40"
                  style={{
                    background:
                      "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 45%, transparent), transparent 70%)",
                  }}
                />
                <blockquote className="num relative text-[15px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_92%,transparent)]">
                  &ldquo;{q.body}&rdquo;
                </blockquote>
                <figcaption className="mono-label relative mt-5">— {q.context}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
