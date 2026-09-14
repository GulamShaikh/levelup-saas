import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — Admin" }] }),
  component: Reports,
});

const reports = [
  { id: "r_1", name: "Monthly engagement", desc: "Active users, event participation and Discord activity", period: "June 2026", size: "1.2 MB" },
  { id: "r_2", name: "Hackathon registrations", desc: "Per-team breakdown with tracks and certificates", period: "Summer 2026", size: "640 KB" },
  { id: "r_3", name: "Course completion", desc: "By cohort, university and provider", period: "Q2 2026", size: "880 KB" },
  { id: "r_4", name: "Certificate issuance", desc: "All verified certificates issued in the period", period: "Q2 2026", size: "2.1 MB" },
  { id: "r_5", name: "Community contribution", desc: "Top contributors and Discord role changes", period: "May 2026", size: "510 KB" },
];

function Reports() {
  return (
    <AppShell>
      <PageHeader
        title="Reports"
        description="Scheduled and on-demand exports across the platform."
        actions={<Button onClick={() => toast.success("New report queued", { description: "It'll appear here when ready." })}>Generate report</Button>}
      />
      <Card className="shadow-soft">
        <CardHeader><CardTitle>Recent reports</CardTitle><CardDescription>Click any row to download as CSV</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="size-4" /></div>
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.desc}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{r.period}</TableCell>
                  <TableCell className="text-muted-foreground">{r.size}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast.success(`Downloaded ${r.name}.csv`)}>
                      <Download className="size-3.5" /> CSV
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
