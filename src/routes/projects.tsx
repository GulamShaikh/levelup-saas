import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/mock-data";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — LevelUp" }] }),
  component: Projects,
});

function Projects() {
  return (
    <AppShell>
      <PageHeader title="Projects" description="Everything you've shipped or are building right now." actions={<Button>+ New project</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link key={p.id} to="/projects/$id" params={{ id: p.id }}>
            <Card className="h-full shadow-soft transition hover:shadow-elevated hover:border-primary/30">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
                  </div>
                  <Badge className={
                    p.status === "Live" ? "bg-secondary text-secondary-foreground" :
                    p.status === "In Progress" ? "bg-warning/15 text-warning border-warning/20" : ""
                  } variant={p.status === "Archived" ? "secondary" : "default"}>{p.status}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-1">
                  {p.stack.map((s) => <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">{s}</span>)}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Star className="size-3.5" /> {p.stars}</span>
                  <span>Updated {new Date(p.updatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
