import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { auditLog } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({ meta: [{ title: "Audit logs — LevelUp Admin" }] }),
  component: Audit,
});

function Audit() {
  const [q, setQ] = useState("");
  const filtered = auditLog.filter(l => (l.action+l.actor+l.target).toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell>
      <PageHeader title="Audit logs" description="Every privileged action across the platform." />
      <Card className="shadow-soft">
        <CardContent className="p-0">
          <div className="border-b border-border p-3">
            <div className="relative max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search logs…" className="h-9 pl-9" />
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground"><tr>
              <th className="py-3 px-4 text-left font-medium">When</th>
              <th className="py-3 px-4 text-left font-medium">Actor</th>
              <th className="py-3 px-4 text-left font-medium">Action</th>
              <th className="py-3 px-4 text-left font-medium">Target</th>
            </tr></thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                  <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{l.at}</td>
                  <td className="py-3 px-4">{l.actor}</td>
                  <td className="py-3 px-4 font-medium">{l.action}</td>
                  <td className="py-3 px-4 text-muted-foreground">{l.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
