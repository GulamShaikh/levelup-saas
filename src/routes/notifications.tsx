import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, MessagesSquare, Settings as SetIcon, Bell } from "lucide-react";
import { notifications as initial } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — LevelUp" }] }),
  component: Notifications,
});

const typeIcon = { event: Calendar, achievement: Trophy, community: MessagesSquare, system: SetIcon };

function Notifications() {
  const [items, setItems] = useState(initial);
  const markAll = () => setItems(items.map(n => ({ ...n, read: true })));
  const unread = items.filter(n => !n.read).length;

  return (
    <AppShell>
      <PageHeader title="Notifications" description={`${unread} unread`} actions={<Button variant="outline" onClick={markAll}>Mark all read</Button>} />
      <Card className="shadow-soft">
        <CardContent className="p-0 divide-y divide-border">
          {items.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground"><Bell className="mx-auto size-8 mb-2" /> You're all caught up.</div>
          ) : items.map((n) => {
            const Icon = typeIcon[n.type];
            return (
              <button key={n.id} onClick={() => setItems(items.map(x => x.id===n.id?{...x,read:true}:x))} className={`flex w-full items-start gap-4 p-4 text-left hover:bg-muted/50 ${!n.read ? "bg-secondary/5" : ""}`}>
                <div className={`grid size-9 place-items-center rounded-lg ${!n.read ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Icon className="size-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="font-medium">{n.title}</span>{!n.read && <span className="size-1.5 rounded-full bg-secondary" />}</div>
                  <div className="text-sm text-muted-foreground">{n.detail}</div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</div>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </AppShell>
  );
}
