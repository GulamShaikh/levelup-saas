import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessagesSquare, Users, Crown, Sparkles } from "lucide-react";
import { discordRoles, promotionTimeline } from "@/lib/mock-data";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community — LevelUp Events" }, { name: "description", content: "12,400+ student builders, mentor circles, weekly office hours, and roles you actually earn." }] }),
  component: Community,
});

function Community() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-4 bg-accent/30 text-foreground hover:bg-accent/40">12,400+ members</Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">A Discord that actually feels like home.</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Mentor circles, weekly office hours, project critique nights, and verified roles
              that follow you to your public profile. Built for the long game, not for noise.
            </p>
            <div className="mt-7 flex gap-3">
              <Link to="/register"><Button size="lg" className="gap-2"><MessagesSquare className="size-4" /> Join the community</Button></Link>
              <Link to="/about"><Button size="lg" variant="outline">How it works</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { i: Users, k: "Active members", v: "12,400+" },
              { i: Crown, k: "Verified mentors", v: "180" },
              { i: MessagesSquare, k: "Daily messages", v: "3,200" },
              { i: Sparkles, k: "Roles earned/mo", v: "240" },
            ].map((x) => (
              <Card key={x.k} className="border-border/70 shadow-soft">
                <CardContent className="p-5">
                  <div className="grid size-10 place-items-center rounded-lg bg-secondary/15 text-secondary"><x.i className="size-5" /></div>
                  <div className="mt-3 text-2xl font-semibold">{x.v}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{x.k}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">Roles you earn</h2>
          <p className="mt-2 text-sm text-muted-foreground">Every role is awarded by community activity — not by paying or asking.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {discordRoles.map((r) => (
              <Card key={r.id} className="border-border/70 shadow-soft">
                <CardContent className="p-5">
                  <div className="size-3 rounded-full" style={{ background: r.color }} />
                  <div className="mt-3 font-semibold">{r.name}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">A real journey, not a leaderboard</h2>
          <p className="mt-2 text-sm text-muted-foreground">Example promotion path for a typical member.</p>
          <ol className="relative mt-8 ml-3 space-y-5 border-l border-border pl-6">
            {promotionTimeline.map((p, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[33px] grid size-5 place-items-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold">{i + 1}</span>
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.detail} · {new Date(p.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </MarketingShell>
  );
}
