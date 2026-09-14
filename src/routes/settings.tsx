import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState, type ReactNode } from "react";
import { useTheme, type ThemeMode } from "@/lib/theme";
import { toast } from "sonner";
import { Sun, Moon, Monitor } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — LevelUp" }] }),
  component: SettingsPage,
});

const PREFS_KEY = "levelup.preferences";

type Prefs = {
  language: string;
  timezone: string;
  notifications: { reminders: boolean; digest: boolean; promotions: boolean; marketing: boolean };
  privacy: { publicProfile: boolean; showAchievements: boolean; indexable: boolean };
};

const defaultPrefs: Prefs = {
  language: "en-IN",
  timezone: "Asia/Kolkata",
  notifications: { reminders: true, digest: true, promotions: true, marketing: false },
  privacy: { publicProfile: true, showAchievements: true, indexable: false },
};

function usePrefs() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) setPrefs({ ...defaultPrefs, ...JSON.parse(raw) });
    } catch {}
  }, []);
  const update = (patch: Partial<Prefs>) => {
    setPrefs((p) => {
      const next = { ...p, ...patch };
      try { localStorage.setItem(PREFS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return { prefs, update };
}

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { prefs, update } = usePrefs();

  return (
    <AppShell>
      <PageHeader title="Settings" description="Customize your LevelUp experience. Changes save automatically." />
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="shadow-soft"><CardContent className="space-y-5 p-6">
            <SettingRow label="Language" description="Interface language">
              <Select value={prefs.language} onValueChange={(v) => { update({ language: v }); toast.success("Language updated"); }}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-IN">English (India)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="hi-IN">हिन्दी</SelectItem>
                  <SelectItem value="ta-IN">தமிழ்</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
            <SettingRow label="Time zone" description="Used for event reminders and schedules">
              <Select value={prefs.timezone} onValueChange={(v) => { update({ timezone: v }); toast.success("Time zone updated"); }}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">America/New York</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="shadow-soft"><CardContent className="space-y-5 p-6">
            <SettingRow label="Theme" description="Live preview — changes apply instantly">
              <div className="flex gap-2">
                {([
                  { v: "light", label: "Light", Icon: Sun },
                  { v: "dark", label: "Dark", Icon: Moon },
                  { v: "system", label: "System", Icon: Monitor },
                ] as { v: ThemeMode; label: string; Icon: typeof Sun }[]).map((o) => (
                  <button
                    key={o.v}
                    onClick={() => { setTheme(o.v); toast.success(`Theme set to ${o.label}`); }}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                      theme === o.v ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                    }`}
                  >
                    <o.Icon className="size-4" /> {o.label}
                  </button>
                ))}
              </div>
            </SettingRow>
            <SettingRow label="Density" description="Compact mode for power users">
              <Switch />
            </SettingRow>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-soft"><CardContent className="space-y-5 p-6">
            {[
              { k: "reminders", t: "Event reminders", d: "24h and 1h before each registered event" },
              { k: "digest", t: "Weekly digest", d: "What's new in your community" },
              { k: "promotions", t: "Discord promotions", d: "When you gain a new role" },
              { k: "marketing", t: "Marketing", d: "Occasional product updates" },
            ].map((row) => (
              <SettingRow key={row.k} label={row.t} description={row.d}>
                <Switch
                  checked={prefs.notifications[row.k as keyof Prefs["notifications"]]}
                  onCheckedChange={(v) => update({ notifications: { ...prefs.notifications, [row.k]: v } })}
                />
              </SettingRow>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-soft"><CardContent className="space-y-5 p-6">
            <SettingRow label="Two-factor authentication" description="Add an extra layer of security">
              <Button variant="outline" size="sm" onClick={() => toast("2FA setup coming soon")}>Enable 2FA</Button>
            </SettingRow>
            <SettingRow label="Active sessions" description="3 devices currently signed in">
              <Button variant="outline" size="sm" onClick={() => toast("Session manager opened")}>Manage</Button>
            </SettingRow>
            <SettingRow label="Change password" description="Use a strong, unique password">
              <div className="flex gap-2">
                <Input type="password" placeholder="Current" />
                <Input type="password" placeholder="New" />
              </div>
            </SettingRow>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="shadow-soft"><CardContent className="space-y-5 p-6">
            {[
              { k: "publicProfile", t: "Public profile", d: "Show your profile to anyone with the link" },
              { k: "showAchievements", t: "Show achievements", d: "Display certificates and awards publicly" },
              { k: "indexable", t: "Indexed by search engines", d: "Allow Google to surface your profile" },
            ].map((row) => (
              <SettingRow key={row.k} label={row.t} description={row.d}>
                <Switch
                  checked={prefs.privacy[row.k as keyof Prefs["privacy"]]}
                  onCheckedChange={(v) => update({ privacy: { ...prefs.privacy, [row.k]: v } })}
                />
              </SettingRow>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="shadow-soft"><CardContent className="space-y-5 p-6">
            <SettingRow label="Export your data" description="Download everything LevelUp has on you">
              <Button variant="outline" size="sm" onClick={() => toast.success("Data export started", { description: "We'll email a download link within an hour." })}>Request export</Button>
            </SettingRow>
            <SettingRow label="Delete account" description="Permanently remove your account and data">
              <Button variant="destructive" size="sm" onClick={() => toast.error("Account deletion is a placeholder in this demo.")}>Delete</Button>
            </SettingRow>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function SettingRow({ label, description, children }: { label: string; description: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div><Label className="text-sm font-medium">{label}</Label><p className="text-xs text-muted-foreground mt-0.5">{description}</p></div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
