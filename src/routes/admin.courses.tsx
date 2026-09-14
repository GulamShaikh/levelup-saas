import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/courses")({
  head: () => ({ meta: [{ title: "Manage courses — LevelUp Admin" }] }),
  component: () => (
    <AppShell>
      <PageHeader title="Courses" description="Curate the learning library." actions={<Button className="gap-2"><Plus className="size-4"/> New course</Button>} />
      <Card className="shadow-soft"><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground"><tr>
            <th className="py-3 px-4 text-left font-medium">Course</th>
            <th className="py-3 px-4 text-left font-medium">Provider</th>
            <th className="py-3 px-4 text-left font-medium">Hours</th>
            <th className="py-3 px-4 text-left font-medium">Skills</th>
            <th className="py-3 px-4"></th>
          </tr></thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{c.title}</td>
                <td className="py-3 px-4 text-muted-foreground">{c.provider}</td>
                <td className="py-3 px-4 text-muted-foreground">{c.hours}</td>
                <td className="py-3 px-4"><div className="flex flex-wrap gap-1">{c.skills.slice(0,3).map((s: string) => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}</div></td>
                <td className="py-3 px-4 text-right"><Button variant="ghost" size="icon" className="size-8"><Edit className="size-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </AppShell>
  ),
});
