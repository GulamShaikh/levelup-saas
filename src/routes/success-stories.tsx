import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/success-stories")({
  head: () => ({ meta: [{ title: "Success Stories — LevelUp Events" }, { name: "description", content: "Real students. Real outcomes. From first hackathon to funded startup, GSoC to Reforge — built on LevelUp." }] }),
  component: Stories,
});

const stories = [
  { name: "Diya Sharma", school: "BITS Pilani", outcome: "Founded StudyOS, raised ₹25L pre-seed", tag: "Founder",
    body: "I joined LevelUp in my second year as a complete beginner. Two hackathons in, I had a co-founder. Six months later, we'd raised a pre-seed round from a Surge Scout. The contribution timeline became my pitch deck appendix." },
  { name: "Kabir Anand", school: "IIIT Hyderabad", outcome: "Selected for Google Summer of Code", tag: "Open Source",
    body: "My LevelUp profile was the first thing my GSoC mentor opened. Every PR, every open-source contribution, every workshop I'd led — all in one place. It cut the verification call in half." },
  { name: "Sneha Pillai", school: "VIT Vellore", outcome: "Joined Razorpay as a product intern", tag: "Career",
    body: "Community Builder of the Quarter showed up in my LinkedIn feed and three recruiters DM'd in 48 hours. I didn't apply to Razorpay — they applied to me." },
  { name: "Rahul Iyer", school: "IIT Madras", outcome: "180+ students mentored in 14 months", tag: "Mentor",
    body: "Mentoring used to mean replying to DMs at midnight. LevelUp gave me a scheduled, scoped way to help — office hours, project critique slots, mentor circles. My impact actually became measurable." },
  { name: "Ananya Iyer", school: "NIT Trichy", outcome: "Awarded the Inlaks Scholarship", tag: "Scholarship",
    body: "Half of the scholarship application was 'evidence of community contribution'. Half of my LevelUp profile was exactly that. I exported a PDF, attached it, and got the call." },
  { name: "Neel Patel", school: "Manipal Institute", outcome: "Organised a 500-person hackathon", tag: "Crew",
    body: "Hosting Summer Hackathon on LevelUp meant zero spreadsheets, zero WhatsApp chaos, and check-in via QR. We sold out in 48 hours and ran the cleanest event of my college life." },
];

function Stories() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Success Stories</div>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Real students. Real outcomes.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">Funded startups, GSoC selections, scholarships, internships. Every one of these started with a single event registration.</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((s) => (
            <Card key={s.name} className="border-border/70 shadow-soft transition hover:shadow-elevated">
              <CardContent className="p-6">
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{s.tag}</Badge>
                <div className="mt-3 text-sm font-medium text-primary">{s.outcome}</div>
                <Quote className="mt-4 size-5 text-secondary" />
                <p className="mt-2 text-sm leading-relaxed text-foreground">{s.body}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid size-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {s.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.school}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">Your story starts with the next event.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/register"><Button size="lg" className="gap-2">Create your profile <ArrowRight className="size-4" /></Button></Link>
            <Link to="/events"><Button size="lg" variant="outline">Browse events</Button></Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
