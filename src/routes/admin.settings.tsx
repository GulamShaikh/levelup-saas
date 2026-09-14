import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Admin Settings — LevelUp" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <AppShell>
      <PageHeader title="Platform settings" description="Configuration that applies to every workspace." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader><CardTitle>Branding</CardTitle><CardDescription>How LevelUp shows up across the product</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Display name" defaultValue="LevelUp Events" />
            <Field label="Support email" defaultValue="support@levelup.events" type="email" />
            <Field label="Primary domain" defaultValue="levelup.events" />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Registration</CardTitle><CardDescription>Who can sign up and how</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Toggle label="Open registration" desc="Anyone can create an account" defaultChecked />
            <Toggle label="University email required" desc="Restrict to .edu / .ac.in domains" />
            <Toggle label="Manual mentor approval" desc="Mentors require admin review" defaultChecked />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Default channels and limits</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Toggle label="Email notifications" desc="System-wide email delivery" defaultChecked />
            <Toggle label="Push notifications" desc="Browser push for registered users" defaultChecked />
            <Field label="Daily send limit" defaultValue="3" />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Integrations</CardTitle><CardDescription>Third-party services and webhooks</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Discord webhook" defaultValue="https://discord.com/api/webhooks/…" />
            <Field label="Slack webhook" placeholder="Optional" />
            <Field label="Analytics token" defaultValue="•••• •••• •••• 4821" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => toast.success("Platform settings saved")}>Save changes</Button>
      </div>
    </AppShell>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Input {...rest} className="mt-1.5" />
    </div>
  );
}

function Toggle({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
