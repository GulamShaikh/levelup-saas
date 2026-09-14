import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FolderKanban, Trophy, GraduationCap, MessagesSquare, Sparkles, Bell, Shield, Search, Globe, Smartphone, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({ meta: [{ title: "Features — LevelUp Events" }, { name: "description", content: "Every feature in the LevelUp workspace, from event discovery to verifiable achievements." }] }),
  component: Features,
});

const groups = [
  { title: "Discover", items: [
    { icon: Calendar, title: "Events", desc: "Card, list and calendar views with smart filters and QR check-in." },
    { icon: Search, title: "Search & bookmarks", desc: "Find any event, project or course in milliseconds. Save anything for later." },
    { icon: Bell, title: "Smart notifications", desc: "Reminders that respect your time. Pick what you want, mute what you don't." },
  ]},
  { title: "Build", items: [
    { icon: FolderKanban, title: "Project pages", desc: "Team, stack, milestones, gallery, awards — everything on one shareable page." },
    { icon: GraduationCap, title: "Learning paths", desc: "Track courses, hours and progress. Pick up where you left off, on any device." },
    { icon: Trophy, title: "Achievements", desc: "Issued certificates, awards and scholarships — provable and portable." },
  ]},
  { title: "Belong", items: [
    { icon: MessagesSquare, title: "Discord roles", desc: "Verified roles that sync from your activity. Mentor, Crew, Core — earned not bought." },
    { icon: Sparkles, title: "XP & levels", desc: "Tasteful gamification that rewards consistency over volume." },
    { icon: Shield, title: "Privacy first", desc: "You decide what's public. Granular controls on every section of your profile." },
  ]},
  { title: "Platform", items: [
    { icon: Globe, title: "Works everywhere", desc: "Built as a responsive web app — install it on any device, no app store required." },
    { icon: Smartphone, title: "Mobile ready", desc: "Designed for one-handed use on the bus and full-power use at your desk." },
    { icon: BarChart3, title: "Analytics for organisers", desc: "Registrations, attendance, satisfaction and demographics in real time." },
  ]},
];

function Features() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Features</div>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Everything you need to ship your student years.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">A complete workspace — not a collection of disconnected tools.</p>
      </section>

      {groups.map((g, gi) => (
        <section key={g.title} className={gi % 2 ? "border-t border-border bg-card/40" : "border-t border-border"}>
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight">{g.title}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it) => (
                <Card key={it.title} className="border-border/70 shadow-soft">
                  <CardContent className="p-6">
                    <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><it.icon className="size-5" /></div>
                    <div className="mt-4 font-semibold">{it.title}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Link to="/register"><Button size="lg">Get started — it's free</Button></Link>
        </div>
      </section>
    </MarketingShell>
  );
}
