import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, PlayCircle } from "lucide-react";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/courses/$id")({
  loader: ({ params }) => { const c = courses.find(x=>x.id===params.id); if(!c) throw notFound(); return c; },
  head: ({ params }) => ({ meta: [{ title: `${courses.find(c=>c.id===params.id)?.title ?? "Course"} — LevelUp` }] }),
  component: CourseDetail,
  notFoundComponent: () => <AppShell><div className="p-10 text-center"><h2 className="text-xl font-semibold">Course not found</h2><Link to="/courses" className="text-primary">← Back</Link></div></AppShell>,
});

function CourseDetail() {
  const c = Route.useLoaderData();
  const lessons = ["Course intro & setup", "Foundations & syntax", "Building your first project", "Working with data", "Testing & debugging", "Deploying to production", "Final capstone project"];

  return (
    <AppShell>
      <PageHeader breadcrumb={[{label:"Courses", to:"/courses"},{label:c.title}]} title={c.title} description={`${c.provider} · ${c.hours} hours`} actions={
        c.progress === 100
          ? <Button className="gap-2"><Download className="size-4" /> Download certificate</Button>
          : <Button className="gap-2"><PlayCircle className="size-4" /> Resume course</Button>
      } />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft"><CardContent className="p-6">
            <div className="flex items-center justify-between text-sm"><span>Progress</span><span className="font-medium">{c.progress}%</span></div>
            <Progress value={c.progress} className="mt-2 h-2.5" />
          </CardContent></Card>

          <Card className="shadow-soft"><CardContent className="p-6">
            <h2 className="font-semibold mb-3">Lessons</h2>
            <ol className="divide-y divide-border">
              {lessons.map((l, i) => {
                const done = (i + 1) / lessons.length * 100 <= c.progress;
                return (
                  <li key={i} className="flex items-center gap-3 py-3">
                    <span className={`grid size-7 place-items-center rounded-full text-xs font-medium ${done ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>{i+1}</span>
                    <div className="flex-1 text-sm">{l}</div>
                    <span className="text-xs text-muted-foreground">{done ? "Completed" : "Locked"}</span>
                  </li>
                );
              })}
            </ol>
          </CardContent></Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-soft"><CardContent className="p-6">
            <h3 className="font-semibold mb-3">Skills you'll learn</h3>
            <div className="flex flex-wrap gap-1.5">{c.skills.map((s: string)=><Badge key={s} variant="secondary">{s}</Badge>)}</div>
          </CardContent></Card>
          <Card className="shadow-soft"><CardContent className="p-6 text-sm">
            <h3 className="font-semibold mb-2">Recommended next</h3>
            <ul className="space-y-2">
              {courses.filter(x=>x.id!==c.id).slice(0,3).map(x => (
                <li key={x.id}><Link to="/courses/$id" params={{id:x.id}} className="hover:text-primary">{x.title}</Link><div className="text-xs text-muted-foreground">{x.provider}</div></li>
              ))}
            </ul>
          </CardContent></Card>
        </div>
      </div>
    </AppShell>
  );
}
