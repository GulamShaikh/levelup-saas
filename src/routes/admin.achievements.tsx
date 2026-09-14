import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Award } from "lucide-react";
import { achievements } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/achievements")({
  head: () => ({ meta: [{ title: "Manage achievements — LevelUp Admin" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Achievements" description="Issue certificates, awards and recognition." actions={<Button className="gap-2"><Plus className="size-4"/> Issue achievement</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map(a => (
          <Card key={a.id} className="shadow-soft"><CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="grid size-10 place-items-center rounded-lg bg-muted text-primary"><Award className="size-5" /></div>
              <Badge variant="secondary">{a.type}</Badge>
            </div>
            <div className="mt-3 font-semibold">{a.title}</div>
            <div className="text-xs text-muted-foreground">{a.issuer} · {new Date(a.date).toLocaleDateString("en-IN", { month: "short", day:"numeric", year:"numeric" })}</div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.description}</p>
          </CardContent></Card>
        ))}
      </div>
    </AppShell>
  ),
});
