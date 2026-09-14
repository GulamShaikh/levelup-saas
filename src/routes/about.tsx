import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Compass, Users, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — LevelUp Events" }, { name: "description", content: "Why LevelUp exists, who we serve, and how we measure success." }] }),
  component: About,
});

const values = [
  { icon: Heart, title: "Students first", desc: "Every product decision is tested against a simple question — does this make a student's life better?" },
  { icon: Compass, title: "Real over rehearsed", desc: "We celebrate work that ships, problems that get solved, and people who show up. No vanity metrics." },
  { icon: Users, title: "Community as infrastructure", desc: "The best learning happens between students. Our job is to remove every barrier to that happening." },
  { icon: Lightbulb, title: "Earn it forward", desc: "Recognition you receive on LevelUp comes with one expectation — pay it forward to the next cohort." },
];

function About() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Our story</div>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          We started LevelUp because student potential deserves better infrastructure.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Three years ago, we were running a 200-person WhatsApp group for hackathon updates.
          Spreadsheets for attendance. Google Forms for feedback. A Notion page that nobody updated.
          The students were brilliant. The tools were a mess. So we built one.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Today LevelUp is the workspace that 12,000+ student builders across India open
          every day — to find their next event, ship their next project, earn their next
          certificate, and get recognised for the work they actually do.
        </p>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">What we believe</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <Card key={v.title} className="border-border/70 shadow-soft">
                <CardContent className="p-6">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><v.icon className="size-5" /></div>
                  <div className="mt-4 text-base font-semibold">{v.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">Join us</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">If any of this resonates, the best way to learn more is to be in the room.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register"><Button size="lg" className="gap-2">Get started <ArrowRight className="size-4" /></Button></Link>
            <Link to="/contact"><Button size="lg" variant="outline">Talk to us</Button></Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
