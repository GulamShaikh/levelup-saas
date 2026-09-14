import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { discordRoles, promotionTimeline } from "@/lib/mock-data";
import { MessagesSquare, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/community")({
  head: () => ({ meta: [{ title: "Community — LevelUp Admin" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Community" description="Discord, badges, recognition and promotions." />
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <StatCard label="Discord members" value="6,841" icon={<MessagesSquare className="size-5" />} trend={{ value:"+312 wk", positive:true }} />
        <StatCard label="Active mentors" value="48" icon={<Users className="size-5" />} />
        <StatCard label="Promotions this month" value="27" icon={<Sparkles className="size-5" />} trend={{ value:"+9", positive:true }} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft"><CardContent className="p-6">
          <h2 className="font-semibold mb-3">Configured roles</h2>
          <div className="space-y-2">
            {discordRoles.map(r => (
              <div key={r.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="size-7 rounded-md" style={{background:r.color}} />
                <div className="flex-1"><div className="font-medium" style={{color:r.color}}>{r.name}</div><div className="text-xs text-muted-foreground">{r.description}</div></div>
              </div>
            ))}
          </div>
        </CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-6">
          <h2 className="font-semibold mb-3">Recent promotions</h2>
          <ol className="space-y-3 text-sm">
            {promotionTimeline.slice().reverse().map((t,i) => (
              <li key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                <div><div className="font-medium">{t.title}</div><div className="text-xs text-muted-foreground">{t.detail}</div></div>
                <div className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString("en-IN", { day:"numeric", month:"short" })}</div>
              </li>
            ))}
          </ol>
        </CardContent></Card>
      </div>
    </AppShell>
  ),
});
