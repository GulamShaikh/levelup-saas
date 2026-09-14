import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessagesSquare, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — LevelUp Events" }, { name: "description", content: "Get in touch with the LevelUp team — partnerships, hosting, press, or general questions." }] }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent", { description: "We'll be in touch within one business day." });
    }, 700);
  };

  return (
    <MarketingShell>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Let's talk.</h1>
            <p className="mt-4 text-muted-foreground">
              Partnerships, hosting, press, or just want to say hi? Drop us a line — a real
              human reads everything.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { i: Mail, t: "Email", v: "hello@levelup.events" },
                { i: MessagesSquare, t: "Community", v: "discord.gg/levelup" },
                { i: Phone, t: "Phone", v: "+91 80 4567 8910" },
                { i: MapPin, t: "Bengaluru HQ", v: "Indiranagar, Bengaluru 560038" },
              ].map((x) => (
                <div key={x.t} className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><x.i className="size-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{x.t}</div>
                    <div className="text-sm font-medium">{x.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-border/70 shadow-soft">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required placeholder="Your full name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="you@example.com" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="org">Organisation (optional)</Label>
                  <Input id="org" placeholder="University, club or company" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="msg">Message</Label>
                  <Textarea id="msg" required rows={6} placeholder="Tell us a bit about what you're looking for…" className="mt-1.5" />
                </div>
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "Sending…" : "Send message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingShell>
  );
}
