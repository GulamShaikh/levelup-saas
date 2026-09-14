import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Download, Plus } from "lucide-react";
import { adminUsers } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Manage users — LevelUp Admin" }] }),
  component: UsersAdmin,
});

function UsersAdmin() {
  const [q, setQ] = useState("");
  const filtered = adminUsers.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));
  const statusColor = { Active: "bg-secondary text-secondary-foreground", Invited: "bg-warning/15 text-warning border-warning/20", Suspended: "bg-destructive/10 text-destructive border-destructive/20" } as const;

  return (
    <AppShell>
      <PageHeader title="Users" description={`${adminUsers.length} total members`} actions={
        <div className="flex gap-2"><Button variant="outline" className="gap-2"><Download className="size-4"/> CSV</Button><Button className="gap-2"><Plus className="size-4"/> Invite</Button></div>
      } />
      <Card className="shadow-soft">
        <CardContent className="p-0">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search users…" className="h-9 pl-9" />
            </div>
            <Button variant="outline" size="sm">Filter</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground"><tr>
                <th className="py-3 px-4 text-left"><Checkbox /></th>
                <th className="py-3 px-4 text-left font-medium">User</th>
                <th className="py-3 px-4 text-left font-medium">Role</th>
                <th className="py-3 px-4 text-left font-medium">University</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Events</th>
                <th className="py-3 px-4 text-left font-medium">Joined</th>
                <th className="py-3 px-4"></th>
              </tr></thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-t border-border hover:bg-muted/30">
                    <td className="py-3 px-4"><Checkbox /></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center text-xs font-semibold">{u.name.split(" ").map(n=>n[0]).join("")}</div>
                        <div><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{u.role}</td>
                    <td className="py-3 px-4 text-muted-foreground">{u.university}</td>
                    <td className="py-3 px-4"><Badge className={statusColor[u.status]} variant="outline">{u.status}</Badge></td>
                    <td className="py-3 px-4 text-muted-foreground">{u.events}</td>
                    <td className="py-3 px-4 text-muted-foreground">{new Date(u.joinedAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</td>
                    <td className="py-3 px-4">
                      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View profile</DropdownMenuItem>
                          <DropdownMenuItem>Change role</DropdownMenuItem>
                          <DropdownMenuItem>Reset password</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border p-3 text-xs text-muted-foreground">
            <div>Showing {filtered.length} of {adminUsers.length}</div>
            <div className="flex gap-2"><Button variant="outline" size="sm">Previous</Button><Button variant="outline" size="sm">Next</Button></div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
