import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar, FolderKanban, Trophy, GraduationCap, ArrowUpRight, CheckCircle2,
  Sparkles, Download, BookOpen, Megaphone, Compass, PlusCircle,
} from "lucide-react";
import { currentUser, stats, events, projects, achievements, courses, userGrowth, eventParticipation, notifications } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — LevelUp" }] }),
  component: Home,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function Home() {
  const upcoming = events.filter((e) => e.status === "upcoming" || e.status === "registered").slice(0, 3);
  const inProgress = courses.filter((c) => c.progress < 100).slice(0, 2);
  const suggested = events.filter((e) => e.status === "wishlist" || e.status === "upcoming").slice(0, 3);
  const pendingCerts = achievements.filter((a) => a.type === "Certificate").slice(0, 2);

  return (
    <AppShell>
      <PageHeader
        title={`${greeting()}, ${currentUser.name.split(" ")[0]} 👋`}
        description="Here's what's happening across your LevelUp workspace today."
        actions={
          <div className="flex gap-2">
            <Link to="/events"><Button variant="outline" className="gap-2"><Calendar className="size-4" /> Browse events</Button></Link>
            <Link to="/journey"><Button className="gap-2"><Sparkles className="size-4" /> My journey</Button></Link>
          </div>
        }
      />

      {/* Announcement banner */}
      <Card className="mb-6 border-secondary/40 bg-secondary/5 shadow-soft">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-secondary text-secondary-foreground"><Megaphone className="size-4" /></div>
            <div>
              <div className="text-sm font-medium">Summer Hackathon 2026 registrations close in 7 days</div>
              <div className="text-xs text-muted-foreground">412 of 500 seats filled · ₹5 lakh in prizes across four tracks.</div>
            </div>
          </div>
          <Link to="/events/$id" params={{ id: "e_102" }}><Button size="sm" variant="secondary">View event</Button></Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Events" value={stats.eventsParticipated} hint="Participated this year" icon={<Calendar className="size-5" />} trend={{ value: "+4 this month", positive: true }} />
        <StatCard label="Projects" value={stats.projectsBuilt} hint="Shipped & in progress" icon={<FolderKanban className="size-5" />} trend={{ value: "+2", positive: true }} />
        <StatCard label="Achievements" value={stats.achievements} hint="Awards & recognition" icon={<Trophy className="size-5" />} trend={{ value: "+1", positive: true }} />
        <StatCard label="Courses" value={stats.coursesCompleted} hint={`${stats.certificates} certificates`} icon={<GraduationCap className="size-5" />} trend={{ value: "+3", positive: true }} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Engagement */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Your engagement</CardTitle>
              <CardDescription>Events registered vs attended in the last 6 months</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1"><span className="size-1.5 rounded-full bg-secondary" /> Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={eventParticipation}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", boxShadow: "var(--shadow-elevated)" }} />
                  <Area type="monotone" dataKey="registered" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g1)" />
                  <Area type="monotone" dataKey="attended" stroke="var(--color-secondary)" strokeWidth={2} fill="url(#g2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* XP / Level */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Level progress</CardTitle>
            <CardDescription>Earn XP by attending events and shipping work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xl font-bold">{currentUser.level}</div>
              <div className="flex-1">
                <div className="text-sm font-medium">Level {currentUser.level} · Community Builder</div>
                <div className="text-xs text-muted-foreground">{currentUser.xpToNext} XP to Level {currentUser.level + 1}</div>
                <Progress value={(currentUser.xpInLevel / (currentUser.xpInLevel + currentUser.xpToNext)) * 100} className="mt-2" />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted p-3"><div className="text-xs text-muted-foreground">Contribution</div><div className="text-lg font-semibold">{currentUser.contributionScore}</div></div>
              <div className="rounded-lg bg-muted p-3"><div className="text-xs text-muted-foreground">Discord rank</div><div className="text-lg font-semibold">Core</div></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: PlusCircle, label: "Register for an event", to: "/events" },
          { i: BookOpen, label: "Continue a course", to: "/courses" },
          { i: FolderKanban, label: "Add a project", to: "/projects" },
          { i: Compass, label: "Open my journey", to: "/journey" },
        ].map((q) => (
          <Link key={q.label} to={q.to} className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated">
            <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><q.i className="size-5" /></div>
            <div className="flex-1 text-sm font-medium">{q.label}</div>
            <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>Upcoming for you</CardTitle><CardDescription>Events you've registered for or are starting soon</CardDescription></div>
            <Link to="/events"><Button variant="ghost" size="sm" className="gap-1">View all <ArrowUpRight className="size-4" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map((e) => (
              <Link key={e.id} to="/events/$id" params={{ id: e.id }} className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition hover:shadow-soft hover:border-primary/30">
                <div className="grid size-12 shrink-0 place-items-center rounded-lg text-primary-foreground font-semibold" style={{ background: e.cover }}>
                  {new Date(e.date).getDate()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })} · {e.time} · {e.location}</div>
                </div>
                <Badge variant={e.status === "registered" ? "default" : "secondary"} className={e.status === "registered" ? "bg-secondary text-secondary-foreground" : ""}>
                  {e.status === "registered" ? "Registered" : "Upcoming"}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Continue learning</CardTitle><CardDescription>Pick up where you left off</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {inProgress.map((c) => (
              <div key={c.id} className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.provider}</div>
                  </div>
                  <Link to="/courses/$id" params={{ id: c.id }}><Button size="sm" variant="outline">Continue</Button></Link>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={c.progress} className="flex-1" />
                  <span className="text-xs font-medium text-muted-foreground">{c.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader><CardTitle>Recent activity</CardTitle><CardDescription>Across your workspace</CardDescription></CardHeader>
          <CardContent>
            <ol className="relative ml-3 space-y-4 border-l border-border pl-5">
              {achievements.slice(0, 4).map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[27px] grid size-5 place-items-center rounded-full bg-secondary text-secondary-foreground"><CheckCircle2 className="size-3" /></span>
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.issuer} · {new Date(a.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Suggested events</CardTitle><CardDescription>Picked from your interests</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {suggested.map((e) => (
              <Link key={e.id} to="/events/$id" params={{ id: e.id }} className="block rounded-lg border border-border p-3 transition hover:border-primary/30">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-sm font-medium">{e.title}</div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{e.category}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} · {e.location}</div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Certificates awaiting download</CardTitle><CardDescription>Issued and ready for your records</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {pendingCerts.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-2 rounded-lg border border-border p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.issuer}</div>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast.success("Certificate downloaded", { description: a.title })}>
                  <Download className="size-3.5" /> PDF
                </Button>
              </div>
            ))}
            <Link to="/journey" className="block pt-1 text-xs font-medium text-primary hover:underline">View all in My Journey →</Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader><CardTitle>Active projects</CardTitle><CardDescription>What you're shipping right now</CardDescription></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {projects.slice(0, 4).map((p) => (
              <Link key={p.id} to="/projects/$id" params={{ id: p.id }} className="rounded-lg border border-border p-4 transition hover:shadow-soft hover:border-primary/30">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.name}</div>
                  <Badge variant={p.status === "Live" ? "default" : "secondary"} className={p.status === "Live" ? "bg-secondary text-secondary-foreground" : ""}>{p.status}</Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.stack.slice(0, 3).map((s) => <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{s}</span>)}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Community growth</CardTitle><CardDescription>LevelUp members over time</CardDescription></CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowth}>
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                  <Bar dataKey="users" fill="var(--color-secondary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">12,420 members · +28% this quarter · {notifications.filter(n => !n.read).length} unread updates</div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
