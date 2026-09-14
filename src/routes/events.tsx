import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MapPin, Clock, Users, Heart, Filter } from "lucide-react";
import { events, type EventItem } from "@/lib/mock-data";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — LevelUp" }] }),
  component: Events,
});

const categories = ["All", "Workshop", "Hackathon", "Bootcamp", "Meetup", "Talk"] as const;

function Events() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [tab, setTab] = useState("upcoming");

  const filtered = events.filter((e) => {
    if (cat !== "All" && e.category !== cat) return false;
    if (q && !e.title.toLowerCase().includes(q.toLowerCase()) && !e.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))) return false;
    if (tab === "upcoming" && !(e.status === "upcoming" || e.status === "registered")) return false;
    if (tab === "registered" && e.status !== "registered") return false;
    if (tab === "past" && e.status !== "past") return false;
    if (tab === "wishlist" && e.status !== "wishlist") return false;
    return true;
  });

  return (
    <AppShell>
      <PageHeader title="Events" description="Workshops, hackathons, bootcamps and talks from the LevelUp community." actions={<Button className="gap-2">+ Suggest event</Button>} />

      <Card className="shadow-soft mb-5">
        <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events, topics, tags…" className="h-10 pl-9" />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto -mx-1 px-1">
            {categories.map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "ghost"} className={cat === c ? "bg-primary" : ""} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Filter className="size-4" /> Filters</Button>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value={tab} className="mt-5">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <h3 className="font-semibold">No events match your filters</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try clearing the search or switching tabs.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function EventCard({ event: e }: { event: EventItem }) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="group block">
      <Card className="overflow-hidden border-border/70 shadow-soft transition hover:shadow-elevated">
        <div className="relative h-32" style={{ background: e.cover }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <Badge className="absolute left-3 top-3 bg-white/95 text-primary hover:bg-white">{e.category}</Badge>
          <button className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/95 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
          </button>
          <div className="absolute bottom-3 left-3 text-primary-foreground">
            <div className="text-xs opacity-90">{new Date(e.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 font-semibold group-hover:text-primary">{e.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{e.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {e.time}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {e.mode}</span>
            <span className="inline-flex items-center gap-1"><Users className="size-3" /> {e.filled}/{e.seats}</span>
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-secondary" style={{ width: `${(e.filled / e.seats) * 100}%` }} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
