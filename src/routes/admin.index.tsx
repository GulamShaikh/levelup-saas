import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, GraduationCap, MessagesSquare, Download } from "lucide-react";
import { userGrowth, eventParticipation, completionByCategory, adminUsers, auditLog } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — LevelUp" }] }),
  component: AdminDashboard,
});

const COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)", "var(--color-chart-4)", "var(--color-chart-5)"];

function AdminDashboard() {
  return (
    <AppShell>
      <PageHeader title="Admin dashboard" description="Operational view across the LevelUp platform." actions={<Button variant="outline" className="gap-2"><Download className="size-4" /> Export</Button>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total members" value="12,420" icon={<Users className="size-5" />} trend={{ value: "+8.2% MoM", positive: true }} />
        <StatCard label="Events this month" value="38" icon={<Calendar className="size-5" />} trend={{ value: "+12 vs last", positive: true }} />
        <StatCard label="Course completions" value="2,184" icon={<GraduationCap className="size-5" />} trend={{ value: "+4.1%", positive: true }} />
        <StatCard label="Discord active" value="6,841" icon={<MessagesSquare className="size-5" />} trend={{ value: "-1.3%", positive: false }} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader><CardTitle>User growth</CardTitle><CardDescription>Monthly active members</CardDescription></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowth}>
                  <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                  <Area type="monotone" dataKey="users" stroke="var(--color-primary)" strokeWidth={2} fill="url(#ag)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader><CardTitle>Completion by category</CardTitle><CardDescription>Last 90 days</CardDescription></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={completionByCategory} dataKey="rate" nameKey="category" innerRadius={50} outerRadius={85} paddingAngle={2}>
                    {completionByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader><CardTitle>Event participation</CardTitle><CardDescription>Registered vs attended</CardDescription></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventParticipation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                  <Bar dataKey="registered" fill="var(--color-primary)" radius={[6,6,0,0]} />
                  <Bar dataKey="attended" fill="var(--color-secondary)" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader><CardTitle>Recent activity</CardTitle><CardDescription>Audit log</CardDescription></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {auditLog.slice(0,5).map((l) => (
              <div key={l.id} className="border-b border-border pb-2 last:border-0">
                <div className="font-medium">{l.action}</div>
                <div className="text-xs text-muted-foreground">{l.target} · {l.actor}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{l.at}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-soft">
        <CardHeader><CardTitle>Recently joined members</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr className="border-b border-border">
                <th className="py-2 text-left font-medium">Name</th><th className="text-left font-medium">University</th><th className="text-left font-medium">Role</th><th className="text-left font-medium">Joined</th>
              </tr></thead>
              <tbody>
                {adminUsers.slice(0,5).map(u => (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">{u.name}</td>
                    <td className="text-muted-foreground">{u.university}</td>
                    <td className="text-muted-foreground">{u.role}</td>
                    <td className="text-muted-foreground">{new Date(u.joinedAt).toLocaleDateString("en-IN", { day:"numeric", month: "short", year:"numeric" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
