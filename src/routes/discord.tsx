import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, MessagesSquare, TrendingUp } from "lucide-react";
import { discordRoles, promotionTimeline, currentUser } from "@/lib/mock-data";

export const Route = createFileRoute("/discord")({
  head: () => ({ meta: [{ title: "Community — LevelUp" }] }),
  component: Discord,
});

function Discord() {
  return (
    <AppShell>
      <PageHeader title="Community" description="Your standing, roles and recognition in the LevelUp Discord." />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card className="shadow-soft"><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Contribution score</div><div className="mt-1 flex items-center gap-2"><span className="text-2xl font-semibold">{currentUser.contributionScore}</span><TrendingUp className="size-4 text-secondary" /></div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Active roles</div><div className="mt-1 text-2xl font-semibold">{discordRoles.length}</div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Promotions</div><div className="mt-1 text-2xl font-semibold">{promotionTimeline.length}</div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft"><CardContent className="p-6">
          <h2 className="font-semibold mb-4 inline-flex items-center gap-2"><Award className="size-4" /> Roles & badges</h2>
          <div className="space-y-3">
            {discordRoles.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="size-9 rounded-lg" style={{ background: r.color }} />
                <div className="flex-1"><div className="font-medium" style={{ color: r.color }}>{r.name}</div><div className="text-xs text-muted-foreground">{r.description}</div></div>
                <div className="text-xs text-muted-foreground">{new Date(r.awardedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
              </div>
            ))}
          </div>
        </CardContent></Card>

        <Card className="shadow-soft"><CardContent className="p-6">
          <h2 className="font-semibold mb-4 inline-flex items-center gap-2"><MessagesSquare className="size-4" /> Promotion timeline</h2>
          <ol className="relative ml-3 space-y-4 border-l-2 border-border pl-6">
            {promotionTimeline.map((t, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[33px] size-3 rounded-full bg-secondary ring-4 ring-background" />
                <div className="text-sm font-medium">{t.title}</div>
                <div className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString("en-IN", { day:"numeric", month: "short", year: "numeric" })} · {t.detail}</div>
              </li>
            ))}
          </ol>
        </CardContent></Card>
      </div>

      <Card className="shadow-soft mt-6"><CardContent className="p-6">
        <h2 className="font-semibold mb-4">Recognition wall</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { who: "Priya Raman", msg: "Aarav's answer in #help-react unblocked our whole team." },
            { who: "Vikram Shetty", msg: "Thanks for jumping on the bootcamp at 2am — legendary." },
            { who: "Sneha Pillai", msg: "Loved your demo. Already forked Notes.ai for our cohort." },
          ].map((r, i) => (
            <div key={i} className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm">"{r.msg}"</p>
              <div className="mt-3 text-xs font-medium">{r.who}</div>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </AppShell>
  );
}
