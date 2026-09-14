import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, GitBranch, Star, Users } from "lucide-react";
import { projects } from "@/lib/mock-data";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const p = projects.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ params }) => ({ meta: [{ title: `${projects.find((p) => p.id === params.id)?.name ?? "Project"} — LevelUp` }] }),
  component: ProjectDetail,
  notFoundComponent: () => <AppShell><div className="p-10 text-center"><h2 className="text-xl font-semibold">Project not found</h2><Link to="/projects" className="text-primary">← Back</Link></div></AppShell>,
});

function ProjectDetail() {
  const p = Route.useLoaderData();
  return (
    <AppShell>
      <PageHeader breadcrumb={[{ label: "Projects", to: "/projects" }, { label: p.name }]} title={p.name} description={p.summary} actions={
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Github className="size-4" /> GitHub</Button>
          {p.demo !== "—" && <Button className="gap-2"><ExternalLink className="size-4" /> Live demo</Button>}
        </div>
      } />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft"><CardContent className="p-6">
            <h2 className="font-semibold mb-2">Overview</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {p.summary} Built and maintained as part of the LevelUp builder track. Used by an active community of students with regular feature releases and an open contribution model.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Stars</div><div className="text-lg font-semibold">{p.stars}</div></div>
              <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Status</div><div className="text-lg font-semibold">{p.status}</div></div>
              <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Updated</div><div className="text-lg font-semibold">{new Date(p.updatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</div></div>
            </div>
          </CardContent></Card>

          <Card className="shadow-soft"><CardContent className="p-6">
            <h2 className="font-semibold mb-3">Recent commits</h2>
            <ul className="divide-y divide-border text-sm">
              {[
                { msg: "feat(search): semantic re-ranking on top results", author: "Aarav Mehta", time: "2h ago" },
                { msg: "fix(auth): refresh token rotation race", author: "Diya Sharma", time: "Yesterday" },
                { msg: "chore(deps): bump tanstack/react-query to 5.51", author: "Aarav Mehta", time: "2 days ago" },
                { msg: "docs(readme): add deployment guide", author: "Kabir Anand", time: "4 days ago" },
              ].map((c, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <GitBranch className="size-4 text-muted-foreground" />
                  <div className="flex-1"><div className="font-medium">{c.msg}</div><div className="text-xs text-muted-foreground">{c.author} · {c.time}</div></div>
                </li>
              ))}
            </ul>
          </CardContent></Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-soft"><CardContent className="p-6">
            <h3 className="font-semibold mb-3">Tech stack</h3>
            <div className="flex flex-wrap gap-1.5">{p.stack.map((s: string) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
          </CardContent></Card>
          <Card className="shadow-soft"><CardContent className="p-6">
            <h3 className="font-semibold mb-3 inline-flex items-center gap-2"><Users className="size-4" /> Contributors</h3>
            <div className="space-y-2 text-sm">
              {["Aarav Mehta","Diya Sharma","Kabir Anand"].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-muted grid place-items-center text-[10px] font-semibold">{n.split(" ").map(x=>x[0]).join("")}</div>
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </CardContent></Card>
          <Card className="shadow-soft"><CardContent className="p-6">
            <h3 className="font-semibold mb-3 inline-flex items-center gap-2"><Star className="size-4" /> Trending</h3>
            <p className="text-sm text-muted-foreground">This project is trending in the LevelUp community this week.</p>
          </CardContent></Card>
        </div>
      </div>
    </AppShell>
  );
}
