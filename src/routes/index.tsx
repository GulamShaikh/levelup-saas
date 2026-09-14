import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/brand/Logo";
import {
  ArrowRight, Calendar, Trophy, GraduationCap, FolderKanban, MessagesSquare,
  Sparkles, CheckCircle2, Quote, ChevronDown, Star,
} from "lucide-react";
import { events } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LevelUp Events — From Connection to Collective Success" },
      { name: "description", content: "The all-in-one platform for student communities. Discover events, ship projects, earn certificates, and grow with thousands of student builders across India." },
    ],
  }),
  component: Landing,
});

const platformStats = [
  { value: "12,400+", label: "Active students" },
  { value: "850+", label: "Events hosted" },
  { value: "120+", label: "Partner universities" },
  { value: "4.9/5", label: "Member rating" },
];

const features = [
  { icon: Calendar, title: "Curated events", desc: "Workshops, bootcamps and hackathons hand-picked for student builders, with one-click registration and QR check-in." },
  { icon: FolderKanban, title: "Ship public projects", desc: "Showcase work with rich project pages — team, tech stack, milestones, awards and a live demo link." },
  { icon: GraduationCap, title: "Learning paths", desc: "Track courses from Harvard, Helsinki, DeepLearning.AI and more. Earn certificates that count." },
  { icon: Trophy, title: "Verifiable achievements", desc: "Every award, scholarship and recognition stays on your profile — provable and portable." },
  { icon: MessagesSquare, title: "Living community", desc: "Discord roles, mentor circles, and a contribution score that recognises the work you actually do." },
  { icon: Sparkles, title: "XP & levels", desc: "Tasteful gamification that rewards consistent participation, not vanity metrics." },
];

const stories = [
  { name: "Diya Sharma", school: "BITS Pilani", quote: "I went from attending my first hackathon to leading a team that raised pre-seed funding — all tracked on my LevelUp profile.", role: "Founder, StudyOS" },
  { name: "Kabir Anand", school: "IIIT Hyderabad", quote: "LevelUp gave me a way to mentor 40+ first years without spreadsheets. The contribution score is the closest thing to a real-world ranking I've seen.", role: "Mentor & Core Contributor" },
  { name: "Sneha Pillai", school: "VIT Vellore", quote: "Getting recognised as Community Builder of the Quarter opened doors for internships I didn't even apply to.", role: "Product Intern, Razorpay" },
];

const universities = [
  "IIT Bombay", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy", "IIT Madras",
  "Delhi University", "VIT Vellore", "Manipal Institute", "IIIT Bangalore", "IIT Kanpur",
];

const faqs = [
  { q: "Is LevelUp free for students?", a: "Yes. Every student feature — events, courses, projects, achievements and Discord access — is completely free. We only charge partner organisations for premium event hosting." },
  { q: "Which universities are part of LevelUp?", a: "Students from 120+ universities across India are active on LevelUp, including all IITs, IIITs, BITS campuses, NITs and most top private institutions." },
  { q: "Do certificates from LevelUp count?", a: "Certificates are issued in partnership with the hosting organisation (e.g. Meta, AWS, DeepLearning.AI) and are verifiable on your public profile." },
  { q: "How does the XP and level system work?", a: "You earn XP for attending events, shipping projects, completing courses and helping others on Discord. Levels unlock new perks like mentor access and event priority." },
  { q: "Can I host events on LevelUp?", a: "Verified clubs, chapters and student organisations can apply to host. Hit Contact and our community team will get you onboarded within 48 hours." },
];

function Landing() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -bottom-40 right-0 size-[420px] rounded-full bg-primary/15 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 flex justify-center">
              <Logo to={undefined} iconClassName="h-14" />
            </div>
            <Badge variant="secondary" className="mb-5 gap-1.5 bg-accent/30 text-foreground hover:bg-accent/40">
              <span className="size-1.5 rounded-full bg-secondary" /> Trusted by 12,400+ student builders
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              From <span className="text-primary">Connection</span> to{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Collective Success.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              The home base for student communities — discover events, ship projects, earn
              certificates, level up your profile, and get recognised for the work you actually do.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/register"><Button size="lg" className="gap-2">Get started free <ArrowRight className="size-4" /></Button></Link>
              <Link to="/events"><Button size="lg" variant="outline" className="gap-2"><Calendar className="size-4" /> Explore events</Button></Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-secondary" /> No credit card required
              <span className="mx-2">·</span>
              <CheckCircle2 className="size-3.5 text-secondary" /> Free forever for students
            </div>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {platformStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
                <div className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Everything in one place</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A real workspace for your student journey</h2>
            <p className="mt-3 text-muted-foreground">Stop juggling Notion, WhatsApp, Google Forms and ten certificate PDFs. LevelUp brings it all together.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border-border/70 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
                <CardContent className="p-6">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </div>
                  <div className="mt-4 text-base font-semibold">{f.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Upcoming</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Featured events</h2>
            </div>
            <Link to="/events" className="hidden sm:block"><Button variant="ghost" className="gap-1">All events <ArrowRight className="size-4" /></Button></Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.filter(e => e.status !== "past").slice(0, 3).map((e) => (
              <Link key={e.id} to="/events/$id" params={{ id: e.id }} className="group rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="h-32 rounded-t-2xl" style={{ background: e.cover }} />
                <div className="space-y-2 p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{e.category}</Badge>
                    <span>·</span>
                    <span>{new Date(e.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                  </div>
                  <h3 className="font-semibold leading-snug transition group-hover:text-primary">{e.title}</h3>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{e.description}</p>
                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <span>{e.location}</span>
                    <span className="font-medium text-foreground">{e.filled}/{e.seats} seats</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Stories</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built by students. Used by thousands.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {stories.map((s) => (
              <Card key={s.name} className="border-border/70 shadow-soft">
                <CardContent className="p-6">
                  <Quote className="size-5 text-secondary" />
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{s.quote}</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <div className="grid size-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{s.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{s.role} · {s.school}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Active across 120+ universities
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {universities.map((u) => (
              <span key={u} className="text-sm font-medium text-muted-foreground/80 transition hover:text-foreground">{u}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <Badge variant="secondary" className="mb-4 bg-secondary text-secondary-foreground">Community</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A Discord that actually feels like home.</h2>
            <p className="mt-4 text-primary-foreground/80">
              12,000+ students. Mentor circles. Weekly office hours. Verified roles that follow you to
              your profile. Plus the kind of inside jokes that only happen when builders find their people.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/community"><Button size="lg" variant="secondary" className="gap-2"><MessagesSquare className="size-4" /> Join the community</Button></Link>
              <Link to="/about"><Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Read our story</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "Active members", v: "12,400+" },
              { k: "Daily messages", v: "3,200" },
              { k: "Verified mentors", v: "180" },
              { k: "Office hours / wk", v: "24" },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5">
                <div className="text-2xl font-semibold">{x.v}</div>
                <div className="mt-1 text-xs text-primary-foreground/70">{x.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Questions, answered</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Star className="mx-auto size-6 text-secondary" />
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Ready to level up?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Set up your profile in under 60 seconds. No payment, no commitment — just your next step as a student builder.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register"><Button size="lg" className="gap-2">Create your account <ArrowRight className="size-4" /></Button></Link>
            <Link to="/events"><Button size="lg" variant="outline">Browse events</Button></Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card transition hover:border-primary/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</div>}
    </div>
  );
}
