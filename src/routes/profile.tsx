import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Globe, MapPin, GraduationCap } from "lucide-react";
import { currentUser } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — LevelUp" }] }),
  component: Profile,
});

function Profile() {
  return (
    <AppShell>
      <PageHeader title="Profile" description="How others see you across LevelUp." actions={<Button>Save changes</Button>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft lg:col-span-1"><CardContent className="p-6 text-center">
          <img src={currentUser.avatar} alt="" className="mx-auto size-24 rounded-full ring-4 ring-muted" />
          <div className="mt-4 text-lg font-semibold">{currentUser.name}</div>
          <div className="text-sm text-muted-foreground">{currentUser.role}</div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            <Badge variant="secondary"><GraduationCap className="size-3 mr-1" />{currentUser.university}</Badge>
            <Badge variant="secondary"><MapPin className="size-3 mr-1" />Mumbai, IN</Badge>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{currentUser.bio}</p>
          <Button variant="outline" className="mt-4 w-full">Change photo</Button>
        </CardContent></Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft"><CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Personal information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue={currentUser.name} /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input defaultValue={currentUser.email} /></div>
              <div className="space-y-1.5"><Label>University</Label><Input defaultValue={currentUser.university} /></div>
              <div className="space-y-1.5"><Label>Year</Label><Input defaultValue={currentUser.year} /></div>
            </div>
            <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={3} defaultValue={currentUser.bio} /></div>
          </CardContent></Card>

          <Card className="shadow-soft"><CardContent className="p-6 space-y-3">
            <h3 className="font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {["TypeScript","React","Next.js","Postgres","Python","Design Systems","Public speaking","Community ops"].map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
            </div>
          </CardContent></Card>

          <Card className="shadow-soft"><CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Social links</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <SocialField icon={<Github className="size-4" />} label="GitHub" placeholder="github.com/aaravm" />
              <SocialField icon={<Linkedin className="size-4" />} label="LinkedIn" placeholder="linkedin.com/in/aaravm" />
              <SocialField icon={<Twitter className="size-4" />} label="X / Twitter" placeholder="@aaravm" />
              <SocialField icon={<Globe className="size-4" />} label="Website" placeholder="aarav.dev" />
            </div>
          </CardContent></Card>
        </div>
      </div>
    </AppShell>
  );
}

function SocialField({ icon, label, placeholder }: { icon: React.ReactNode; label: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2">{icon}{label}</Label>
      <Input placeholder={placeholder} />
    </div>
  );
}
