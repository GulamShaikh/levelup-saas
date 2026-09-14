import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/announcements")({
  head: () => ({ meta: [{ title: "Announcements — Admin" }] }),
  component: Announcements,
});

type Item = { id: string; title: string; body: string; audience: string; status: "Scheduled" | "Live" | "Draft"; date: string };

const seed: Item[] = [
  { id: "a_1", title: "Summer Hackathon registrations open", body: "₹5 lakh in prizes across four tracks. Apply with your team or as a solo builder.", audience: "All members", status: "Live", date: "2026-06-15" },
  { id: "a_2", title: "Discord verification rollout", body: "We're rolling out automatic role syncing for all 12,000+ members this week.", audience: "Discord", status: "Live", date: "2026-06-12" },
  { id: "a_3", title: "Maintenance window — Jul 4", body: "Brief platform downtime between 02:00-03:00 IST for an infrastructure upgrade.", audience: "All members", status: "Scheduled", date: "2026-07-04" },
  { id: "a_4", title: "New mentor program", body: "Applications open for verified mentors in product, design and ML.", audience: "Mentors", status: "Draft", date: "—" },
];

function Announcements() {
  const [items, setItems] = useState<Item[]>(seed);
  const [open, setOpen] = useState(false);

  const add = (data: Omit<Item, "id" | "date" | "status">) => {
    const it: Item = { ...data, id: `a_${Date.now()}`, status: "Scheduled", date: new Date().toISOString().slice(0, 10) };
    setItems((arr) => [it, ...arr]);
    setOpen(false);
    toast.success("Announcement scheduled");
  };

  return (
    <AppShell>
      <PageHeader
        title="Announcements"
        description="Platform-wide messages, targeted by audience."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className="gap-2"><Plus className="size-4" /> New announcement</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New announcement</DialogTitle>
                <DialogDescription>Composed messages go out in the next scheduled batch.</DialogDescription>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  add({
                    title: String(fd.get("title")),
                    body: String(fd.get("body")),
                    audience: String(fd.get("audience")),
                  });
                }}
              >
                <div><Label htmlFor="title">Title</Label><Input id="title" name="title" required className="mt-1.5" /></div>
                <div><Label htmlFor="body">Message</Label><Textarea id="body" name="body" rows={4} required className="mt-1.5" /></div>
                <div>
                  <Label htmlFor="audience">Audience</Label>
                  <Select name="audience" defaultValue="All members">
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All members">All members</SelectItem>
                      <SelectItem value="Discord">Discord only</SelectItem>
                      <SelectItem value="Mentors">Mentors</SelectItem>
                      <SelectItem value="Event Crew">Event Crew</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">Schedule</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.id} className="shadow-soft">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="grid size-10 place-items-center rounded-lg bg-secondary/15 text-secondary"><Megaphone className="size-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-medium">{it.title}</div>
                  <Badge
                    variant={it.status === "Live" ? "default" : "outline"}
                    className={it.status === "Live" ? "bg-secondary text-secondary-foreground" : ""}
                  >{it.status}</Badge>
                  <span className="text-xs text-muted-foreground">· {it.audience} · {it.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => toast("Edit dialog placeholder")}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { setItems(arr => arr.filter(i => i.id !== it.id)); toast.success("Announcement removed"); }}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
