"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

type Service = {
  id: string;
  idx: string;
  headline: string;
  body: string;
  price: string;
  href: string;
  cta: string;
};

const services: Service[] = [
  {
    id: "ship",
    idx: "01",
    headline: "Web app to both stores",
    body: "Your app to the App Store and Google Play, under your accounts. Icons, screenshots, metadata, rejection handling. The entire submission, handled. 7–14 days.",
    price: "From $399 flat",
    href: "/ship-web-app-to-app-store",
    cta: "How it works",
  },
  {
    id: "build",
    idx: "02",
    headline: "Website design that books leads",
    body: "Custom websites for service businesses, consultants, and founders who need a sharp offer, SEO basics, and direct founder support — not an agency handoff maze.",
    price: "From $499",
    href: "/website-design",
    cta: "See website packages",
  },
  {
    id: "integrate",
    idx: "03",
    headline: "AI chatbot for your business",
    body: "Chatbots trained on your content. Agents that book, route, and close. Deployed on cost-efficient infra in under two weeks.",
    price: "From $399 + hosting",
    href: "/ai-chatbots",
    cta: "See chatbot options",
  },
  {
    id: "consult",
    idx: "04",
    headline: "Consulting and sessions",
    body: "Architecture review, debugging, Apple rejection strategy, stack decisions. 90 minutes with a senior engineer who ships.",
    price: "$299 per session",
    href: "/kickoff",
    cta: "Book a session",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
      className="group rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] p-6 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] md:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)]">
          {service.idx}
        </span>
        <span className="font-mono text-[11.5px] tracking-wide text-[var(--color-accent)]">
          {service.price}
        </span>
      </div>

      <h3 className="mt-5 text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--color-fg)] md:text-[22px]">
        {service.headline}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)]">
        {service.body}
      </p>

      <Link
        href={service.href}
        className="mt-6 inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg)] transition-colors duration-200 hover:text-[var(--color-accent)]"
      >
        <span className="border-b border-[color-mix(in_srgb,var(--color-fg)_25%,transparent)] pb-0.5 transition-colors duration-200 group-hover:border-[var(--color-accent)]">
          {service.cta}
        </span>
      </Link>
    </motion.div>
  );
}

export function CoverServices() {
  return (
    <section
      className="cover-services px-5 pt-20 md:px-10 md:pt-28 lg:px-16"
      aria-label="Services"
    >
      <div className="mb-10 md:mb-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
          Services
        </span>
        <h2 className="mt-3 max-w-[22ch] text-[clamp(1.7rem,4.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-fg)]">
          Four ways we work together.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
