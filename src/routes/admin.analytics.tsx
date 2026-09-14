import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { userGrowth, eventParticipation, completionByCategory } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — LevelUp Admin" }] }),
  component: Analytics,
});

function Analytics() {
  return (
    <AppShell>
      <PageHeader title="Analytics" description="Deep dive into platform metrics." actions={
        <div className="flex gap-2"><Button variant="outline" className="gap-2"><Download className="size-4"/> CSV</Button><Button variant="outline" className="gap-2"><Download className="size-4"/> Excel</Button></div>
      } />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Engagement rate" value="74%" trend={{value:"+3.2%",positive:true}} />
        <StatCard label="Avg events / member" value="4.8" trend={{value:"+0.4",positive:true}} />
        <StatCard label="Completion rate" value="81%" trend={{value:"+1.1%",positive:true}} />
        <StatCard label="NPS" value="62" trend={{value:"+5",positive:true}} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-soft"><CardHeader><CardTitle>Member growth</CardTitle><CardDescription>YTD</CardDescription></CardHeader><CardContent>
          <div className="h-64"><ResponsiveContainer><AreaChart data={userGrowth}>
            <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-secondary)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{borderRadius:12,border:"1px solid var(--color-border)"}} />
            <Area dataKey="users" stroke="var(--color-secondary)" strokeWidth={2} fill="url(#ga)" />
          </AreaChart></ResponsiveContainer></div>
        </CardContent></Card>

        <Card className="shadow-soft"><CardHeader><CardTitle>Event participation</CardTitle><CardDescription>Registered vs attended</CardDescription></CardHeader><CardContent>
          <div className="h-64"><ResponsiveContainer><BarChart data={eventParticipation}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{borderRadius:12,border:"1px solid var(--color-border)"}} />
            <Bar dataKey="registered" fill="var(--color-primary)" radius={[6,6,0,0]} />
            <Bar dataKey="attended" fill="var(--color-secondary)" radius={[6,6,0,0]} />
          </BarChart></ResponsiveContainer></div>
        </CardContent></Card>

        <Card className="shadow-soft lg:col-span-2"><CardHeader><CardTitle>Completion rate by category</CardTitle></CardHeader><CardContent>
          <div className="h-56"><ResponsiveContainer><LineChart data={completionByCategory}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="category" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{borderRadius:12,border:"1px solid var(--color-border)"}} />
            <Line dataKey="rate" stroke="var(--color-primary)" strokeWidth={2.5} dot={{r:4,fill:"var(--color-primary)"}} />
          </LineChart></ResponsiveContainer></div>
        </CardContent></Card>
      </div>
    </AppShell>
  );
}
