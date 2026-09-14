import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — LevelUp" }] }),
  component: Forgot,
});

function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout title="Forgot your password?" subtitle="We'll send you a secure reset link." footer={<Link to="/login" className="hover:underline">← Back to sign in</Link>}>
      {sent ? (
        <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-5 text-sm">
          <div className="flex items-center gap-2 font-medium text-foreground"><CheckCircle2 className="size-4 text-secondary" /> Check your inbox</div>
          <p className="mt-1 text-muted-foreground">We've sent a reset link to your email. It expires in 30 minutes.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="you@university.edu" required /></div>
          <Button className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthLayout>
  );
}
