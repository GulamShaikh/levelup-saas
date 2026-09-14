import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Award, GraduationCap, Banknote, Sparkles, Download } from "lucide-react";
import { achievements } from "@/lib/mock-data";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements — LevelUp" }] }),
  component: Achievements,
});

const icons = { Certificate: GraduationCap, Funding: Banknote, Scholarship: Award, Award: Trophy, Recognition: Sparkles };

function Achievements() {
  return (
    <AppShell>
      <PageHeader title="Achievements" description="Certificates, funding, awards and recognition you've earned." actions={<Button variant="outline" className="gap-2"><Download className="size-4" /> Export all</Button>} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Timeline</h2>
            <ol className="relative ml-3 space-y-5 border-l-2 border-border pl-6">
              {achievements.map((a) => {
                const Icon = icons[a.type];
                return (
                  <li key={a.id} className="relative">
                    <span className="absolute -left-[34px] grid size-7 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
                      <Icon className="size-3.5" />
                    </span>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.issuer} · {new Date(a.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                      </div>
                      <Badge variant="secondary">{a.type}</Badge>
                    </div>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {(["Certificate","Funding","Scholarship","Award","Recognition"] as const).map((t) => {
            const count = achievements.filter((a) => a.type === t).length;
            const Icon = icons[t];
            return (
              <Card key={t} className="shadow-soft"><CardContent className="flex items-center gap-3 p-4">
                <div className="grid size-10 place-items-center rounded-lg bg-muted text-primary"><Icon className="size-5" /></div>
                <div className="flex-1"><div className="text-sm font-medium">{t}s</div><div className="text-xs text-muted-foreground">{count} earned</div></div>
                <div className="text-xl font-semibold">{count}</div>
              </CardContent></Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
