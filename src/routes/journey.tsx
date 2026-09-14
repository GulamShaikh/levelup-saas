import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Trophy, GraduationCap, FolderKanban, Award, ExternalLink, Download, Github, Sparkles, Star,
} from "lucide-react";
import { achievements, courses, projects, currentUser, stats, promotionTimeline } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ title: "My Journey — LevelUp" }] }),
  component: Journey,
});

function Journey() {
  const certs = achievements.filter((a) => a.type === "Certificate");
  const completed = courses.filter((c) => c.progress === 100);
  const ongoing = courses.filter((c) => c.progress < 100);
  const xpPct = (currentUser.xpInLevel / (currentUser.xpInLevel + currentUser.xpToNext)) * 100;

  return (
    <AppShell>
      <PageHeader
        title="My Journey"
        description="Your projects, courses, certificates and recognition — one continuous story."
        actions={
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Portfolio exported", { description: "Your public profile PDF is ready." })}>
            <Download className="size-4" /> Export portfolio
          </Button>
        }
      />

      {/* Top summary */}
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-5">
              <div className="grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl font-bold text-primary-foreground">{currentUser.level}</div>
              <div className="min-w-0 flex-1">
                <div className="text-sm uppercase tracking-wider text-muted-foreground">Level {currentUser.level} · Community Builder</div>
                <div className="mt-0.5 text-xl font-semibold tracking-tight">{currentUser.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser.university} · {currentUser.year}</div>
                <Progress value={xpPct} className="mt-3" />
                <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{currentUser.xpInLevel} XP earned</span>
                  <span>{currentUser.xpToNext} XP to Level {currentUser.level + 1}</span>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Events", value: stats.eventsParticipated, icon: Sparkles },
                { label: "Projects", value: stats.projectsBuilt, icon: FolderKanban },
                { label: "Certificates", value: stats.certificates, icon: Award },
                { label: "Awards", value: stats.achievements, icon: Trophy },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-muted/40 p-3">
                  <s.icon className="size-4 text-primary" />
                  <div className="mt-2 text-xl font-semibold">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Contribution</CardTitle><CardDescription>Weighted across activity</CardDescription></CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold tracking-tight">{currentUser.contributionScore}</div>
            <div className="mt-1 text-xs text-muted-foreground">Top 4% of all LevelUp members</div>
            <div className="mt-4 space-y-2 text-sm">
              {[
                { k: "Helpful answers", v: 124 },
                { k: "Events organised", v: 6 },
                { k: "Mentor sessions", v: 18 },
                { k: "Projects shipped", v: 9 },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-1.5">
                  <span className="text-muted-foreground">{r.k}</span>
                  <span className="font-medium">{r.v}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" className="mt-6">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-5">
          <Card className="shadow-soft">
            <CardHeader><CardTitle>Activity timeline</CardTitle><CardDescription>Every milestone since you joined LevelUp</CardDescription></CardHeader>
            <CardContent>
              <ol className="relative ml-2 space-y-5 border-l border-border pl-6">
                {promotionTimeline.map((p, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[33px] grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"><Star className="size-2.5" /></span>
                    <div className="text-sm font-medium">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.detail} · {new Date(p.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Card key={p.id} className="shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <Link to="/projects/$id" params={{ id: p.id }} className="font-semibold hover:text-primary">{p.name}</Link>
                    <Badge variant={p.status === "Live" ? "default" : "secondary"} className={p.status === "Live" ? "bg-secondary text-secondary-foreground" : ""}>{p.status}</Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.stack.map((s) => <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{s}</span>)}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="size-3 text-warning" />{p.stars}</span>
                    <a className="inline-flex items-center gap-1 hover:text-foreground" href={`https://${p.github}`} target="_blank" rel="noreferrer"><Github className="size-3" /> GitHub</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-5 space-y-6">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">In progress</div>
            <div className="grid gap-3 md:grid-cols-2">
              {ongoing.map((c) => (
                <Card key={c.id} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{c.title}</div>
                        <div className="text-xs text-muted-foreground">{c.provider} · {c.hours}h</div>
                      </div>
                      <Link to="/courses/$id" params={{ id: c.id }}><Button size="sm" variant="outline">Continue</Button></Link>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Progress value={c.progress} className="flex-1" />
                      <span className="text-xs font-medium text-muted-foreground">{c.progress}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completed</div>
            <div className="grid gap-3 md:grid-cols-2">
              {completed.map((c) => (
                <Card key={c.id} className="shadow-soft">
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <div className="font-medium">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.provider} · Completed {c.completedAt && new Date(c.completedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
                    </div>
                    <Badge variant="secondary" className="bg-secondary/15 text-secondary"><GraduationCap className="mr-1 size-3" /> Done</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-5">
          <div className="grid gap-4 md:grid-cols-2">
            {certs.map((c) => (
              <Card key={c.id} className="shadow-soft">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-secondary">{c.issuer}</div>
                      <div className="mt-1 font-medium">{c.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">Issued {new Date(c.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</div>
                    </div>
                    <Award className="size-6 text-secondary" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast.success("Certificate downloaded", { description: c.title })}><Download className="size-3.5" /> Download</Button>
                    <Button size="sm" variant="ghost" className="gap-1.5" onClick={() => toast("Verification link copied")}><ExternalLink className="size-3.5" /> Verify</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-5">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((a) => (
              <Card key={a.id} className="shadow-soft">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="grid size-10 place-items-center rounded-lg bg-secondary/15 text-secondary"><Trophy className="size-5" /></div>
                  <div className="min-w-0">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{a.type}</Badge>
                    <div className="mt-1.5 font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.issuer} · {new Date(a.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-5">
          <Card className="shadow-soft">
            <CardHeader><CardTitle>Public portfolio</CardTitle><CardDescription>Your shareable LevelUp profile</CardDescription></CardHeader>
            <CardContent>
              <div className="rounded-xl border border-dashed border-border p-6 text-center">
                <div className="text-sm">Your public profile lives at</div>
                <div className="mt-1 font-mono text-primary">levelup.events/u/{currentUser.name.split(" ")[0].toLowerCase()}</div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Button size="sm" onClick={() => toast.success("Link copied to clipboard")}>Copy link</Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/profile">Edit profile</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
