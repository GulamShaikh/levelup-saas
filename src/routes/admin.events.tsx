import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Download } from "lucide-react";
import { events } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/events")({
  head: () => ({ meta: [{ title: "Manage events — LevelUp Admin" }] }),
  component: EventsAdmin,
});

function EventsAdmin() {
  const [open, setOpen] = useState(false);
  return (
    <AppShell>
      <PageHeader title="Events" description="Create, edit and publish events." actions={
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="size-4"/> Export</Button>
          <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button className="gap-2"><Plus className="size-4"/> New event</Button></DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Create event</DialogTitle></DialogHeader>
              <div className="grid gap-3 py-2">
                <div className="space-y-1.5"><Label>Title</Label><Input placeholder="e.g. Intro to Rust" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Date</Label><Input type="date" /></div>
                  <div className="space-y-1.5"><Label>Time</Label><Input type="time" /></div>
                </div>
                <div className="space-y-1.5"><Label>Location</Label><Input placeholder="Online / city" /></div>
                <div className="space-y-1.5"><Label>Description</Label><Textarea rows={3} /></div>
              </div>
              <DialogFooter><Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={()=>setOpen(false)}>Publish</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      } />
      <Card className="shadow-soft"><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground"><tr>
            <th className="py-3 px-4 text-left font-medium">Event</th>
            <th className="py-3 px-4 text-left font-medium">Category</th>
            <th className="py-3 px-4 text-left font-medium">Date</th>
            <th className="py-3 px-4 text-left font-medium">Registrations</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4"></th>
          </tr></thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id} className="border-t border-border hover:bg-muted/30">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg" style={{ background: e.cover }} />
                    <div><div className="font-medium">{e.title}</div><div className="text-xs text-muted-foreground">by {e.host}</div></div>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{e.category}</td>
                <td className="py-3 px-4 text-muted-foreground">{new Date(e.date).toLocaleDateString("en-IN", { day:"numeric", month:"short" })}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2"><span className="font-medium">{e.filled}</span><span className="text-xs text-muted-foreground">/ {e.seats}</span></div>
                  <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-muted"><div className="h-full bg-secondary" style={{ width: `${(e.filled/e.seats)*100}%`}}/></div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={e.status==="past"?"secondary":"default"} className={e.status!=="past"?"bg-secondary text-secondary-foreground":""}>{e.status === "past" ? "Past" : "Published"}</Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="icon" className="size-8"><Edit className="size-4" /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive"><Trash2 className="size-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>
    </AppShell>
  );
}
