import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Users, CalendarDays, Share2, CheckCircle2 } from "lucide-react";
import { events } from "@/lib/mock-data";

export const Route = createFileRoute("/events/$id")({
  head: ({ params }) => {
    const ev = events.find((e) => e.id === params.id);
    return { meta: [{ title: `${ev?.title ?? "Event"} — LevelUp` }] };
  },
  loader: ({ params }) => {
    const ev = events.find((e) => e.id === params.id);
    if (!ev) throw notFound();
    return ev;
  },
  component: EventDetail,
  notFoundComponent: () => (
    <AppShell><div className="p-10 text-center"><h2 className="text-xl font-semibold">Event not found</h2><Link to="/events" className="text-primary mt-3 inline-block">← Back to events</Link></div></AppShell>
  ),
});

function EventDetail() {
  const ev = Route.useLoaderData();
  const [registered, setRegistered] = useState(ev.status === "registered");
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <AppShell>
      <PageHeader breadcrumb={[{ label: "Events", to: "/events" }, { label: ev.title }]} title={ev.title} description={ev.host ? `Hosted by ${ev.host}` : undefined} actions={
        <Button variant="outline" size="sm" className="gap-2"><Share2 className="size-4" /> Share</Button>
      } />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-56 rounded-xl overflow-hidden" style={{ background: ev.cover }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-primary-foreground">
              <div>
                <Badge className="bg-white/95 text-primary hover:bg-white">{ev.category}</Badge>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" />{new Date(ev.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-4" />{ev.time}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{ev.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-soft"><CardContent className="p-6">
            <h2 className="font-semibold mb-2">About this event</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{ev.description} You'll leave with a working project, a community of peers, and clear next steps. Snacks and swag are on us.</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {ev.tags.map((t: string) => <Badge key={t} variant="secondary">{t}</Badge>)}
            </div>
          </CardContent></Card>

          <Card className="shadow-soft"><CardContent className="p-6">
            <h2 className="font-semibold mb-3">Agenda</h2>
            <ol className="space-y-3 text-sm">
              {[
                { t: "Check-in & networking", d: "30 min" },
                { t: "Kickoff & framing", d: "20 min" },
                { t: "Build session (with mentors)", d: "2 hrs" },
                { t: "Demos & community share", d: "45 min" },
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-medium">{i + 1}</span>
                  <div className="flex-1"><div className="font-medium">{s.t}</div><div className="text-xs text-muted-foreground">{s.d}</div></div>
                </li>
              ))}
            </ol>
          </CardContent></Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-soft"><CardContent className="p-6">
            <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Seats filled</span><span className="font-medium">{ev.filled}/{ev.seats}</span></div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-secondary" style={{ width: `${(ev.filled / ev.seats) * 100}%` }} />
            </div>
            {registered ? (
              <div className="mt-5 rounded-lg border border-secondary/30 bg-secondary/10 p-3 text-sm">
                <div className="flex items-center gap-2 font-medium"><CheckCircle2 className="size-4 text-secondary" /> You're registered</div>
                <p className="mt-1 text-xs text-muted-foreground">We'll send reminders 24h and 1h before.</p>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild><Button className="mt-5 w-full" disabled={ev.filled >= ev.seats}>{ev.filled >= ev.seats ? "Event full" : "Register now"}</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Register for {ev.title}</DialogTitle><DialogDescription>Confirm your details to reserve a spot.</DialogDescription></DialogHeader>
                  <div className="space-y-3 py-2">
                    <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Aarav Mehta" /></div>
                    <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="aarav.mehta@levelup.events" /></div>
                    <div className="space-y-1.5"><Label>Any dietary preferences?</Label><Input placeholder="Optional" /></div>
                  </div>
                  <DialogFooter><Button onClick={() => { setRegistered(true); setShowSuccess(true); }}>Confirm registration</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="outline" className="mt-2 w-full">Add to wishlist</Button>
          </CardContent></Card>

          <Card className="shadow-soft"><CardContent className="p-6">
            <div className="text-sm font-semibold mb-3">Host</div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center font-semibold">{ev.host.split(" ").map((n: string)=>n[0]).slice(0,2).join("")}</div>
              <div><div className="text-sm font-medium">{ev.host}</div><div className="text-xs text-muted-foreground">Community Mentor · LevelUp</div></div>
            </div>
          </CardContent></Card>

          <Card className="shadow-soft"><CardContent className="p-6">
            <div className="text-sm font-semibold mb-3 inline-flex items-center gap-2"><Users className="size-4" /> Attending</div>
            <div className="flex -space-x-2">
              {["AM", "DS", "KA", "NP", "RI"].map((i, idx) => (
                <div key={i} className="size-8 rounded-full ring-2 ring-card grid place-items-center text-[10px] font-semibold text-primary-foreground" style={{ background: ["#1F2A5A","#8BC34A","#1F2A5A","#64748B","#8BC34A"][idx] }}>{i}</div>
              ))}
              <div className="size-8 rounded-full ring-2 ring-card bg-muted grid place-items-center text-[10px] font-medium">+{(ev.filled as number) - 5}</div>
            </div>
          </CardContent></Card>
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <div className="py-4 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-secondary/15"><CheckCircle2 className="size-7 text-secondary" /></div>
            <h2 className="mt-4 text-lg font-semibold">You're in! 🎉</h2>
            <p className="mt-1 text-sm text-muted-foreground">Confirmation sent to your email. See you at the event.</p>
          </div>
          <DialogFooter><Button className="w-full" onClick={() => setShowSuccess(false)}>Done</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
