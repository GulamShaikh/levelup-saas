import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — LevelUp Events" }, { name: "description", content: "Answers to the most common questions about LevelUp, accounts, events, certificates and the community." }] }),
  component: Faq,
});

const sections = [
  { title: "Getting started", items: [
    { q: "How do I sign up?", a: "Create a free account with your university email, Google or GitHub. Your profile is ready in under 60 seconds." },
    { q: "Is LevelUp free?", a: "Yes — every student feature is free, forever. We only charge partner organisations for premium event hosting." },
    { q: "Which devices are supported?", a: "LevelUp runs as a responsive web app on any modern browser. Install it as a PWA for an app-like experience on mobile." },
  ]},
  { title: "Events", items: [
    { q: "How do I register for an event?", a: "Open the event page and hit Register. You'll get a QR ticket and a calendar invite. Cancel any time before the event starts." },
    { q: "Can I host an event?", a: "Verified clubs and chapters can apply via Contact. Our community team gets back within 48 hours with a hosting kit." },
    { q: "What if I miss an event?", a: "Most events publish recordings within a week. You'll see them on the event page if available." },
  ]},
  { title: "Certificates & achievements", items: [
    { q: "Are LevelUp certificates verifiable?", a: "Yes. Every certificate is co-signed by the hosting organisation and gets a public verification page with a unique ID." },
    { q: "Can I share my profile externally?", a: "Your public profile has a permalink (e.g. levelup.events/u/aarav) that you can drop into LinkedIn, applications or your résumé." },
    { q: "How do I earn an achievement?", a: "Achievements are awarded automatically when you complete the underlying activity — finishing a course, winning a hackathon, receiving a scholarship, etc." },
  ]},
  { title: "Community", items: [
    { q: "How do Discord roles work?", a: "Roles are synced from your platform activity. The more you contribute — answers, events, projects — the higher you climb. Roles cannot be bought." },
    { q: "How do I find a mentor?", a: "Open Community → Mentors, filter by topic, and request a slot during published office hours." },
    { q: "What's the contribution score?", a: "A weighted score across helpful answers, event participation, projects shipped and mentor sessions held. It updates daily." },
  ]},
];

function Faq() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Frequently asked questions</h1>
          <p className="mt-3 text-muted-foreground">Can't find what you're looking for? Hit Contact and we'll get back within a day.</p>
        </div>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.title}</h2>
              <div className="mt-3 space-y-2">
                {s.items.map((it, i) => <Item key={i} q={it.q} a={it.a} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card transition hover:border-primary/40">
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</div>}
    </div>
  );
}
