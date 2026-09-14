import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, GraduationCap } from "lucide-react";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — LevelUp" }] }),
  component: Courses,
});

function Courses() {
  const completed = courses.filter((c) => c.progress === 100);
  const inProgress = courses.filter((c) => c.progress < 100);

  return (
    <AppShell>
      <PageHeader title="Courses" description="Your learning library — completed and in progress." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="shadow-soft"><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Completed</div><div className="mt-1 text-2xl font-semibold">{completed.length}</div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">In progress</div><div className="mt-1 text-2xl font-semibold">{inProgress.length}</div></CardContent></Card>
        <Card className="shadow-soft"><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Total hours</div><div className="mt-1 text-2xl font-semibold">{courses.reduce((s,c)=>s+c.hours,0)}</div></CardContent></Card>
      </div>

      <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">In progress</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {inProgress.map((c) => <CourseCard key={c.id} c={c} />)}
      </div>

      <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Completed</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {completed.map((c) => <CourseCard key={c.id} c={c} />)}
      </div>
    </AppShell>
  );
}

function CourseCard({ c }: { c: typeof courses[number] }) {
  return (
    <Link to="/courses/$id" params={{ id: c.id }}>
      <Card className="h-full shadow-soft transition hover:shadow-elevated hover:border-primary/30">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-muted-foreground">{c.provider}</div>
              <div className="mt-0.5 font-semibold">{c.title}</div>
            </div>
            {c.progress === 100 ? <Badge className="bg-secondary text-secondary-foreground gap-1"><CheckCircle2 className="size-3"/>Done</Badge> : <Badge variant="secondary"><Clock className="size-3 mr-1"/>{c.progress}%</Badge>}
          </div>
          <Progress value={c.progress} className="mt-4" />
          <div className="mt-3 flex flex-wrap gap-1">{c.skills.map((s)=><span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">{s}</span>)}</div>
          <div className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1"><GraduationCap className="size-3.5"/> {c.hours} hours</div>
        </CardContent>
      </Card>
    </Link>
  );
}
