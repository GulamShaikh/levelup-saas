import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Github, Mail } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — LevelUp" }] }),
  component: Login,
});

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.56-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.11A6.62 6.62 0 0 1 5.5 12c0-.73.13-1.45.34-2.11V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.15 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function Login() {
  const { signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<"email" | "google" | "github" | null>(null);

  const finish = (name: string) => {
    toast.success(`Welcome back, ${name.split(" ")[0]}!`);
    navigate({ to: "/home" });
  };

  const onEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("email");
    const fd = new FormData(e.currentTarget);
    const u = await signIn(String(fd.get("email")), String(fd.get("password")));
    setLoading(null);
    finish(u.name);
  };

  const onProvider = async (p: "google" | "github") => {
    setLoading(p);
    const u = await signInWithProvider(p);
    setLoading(null);
    finish(u.name);
  };

  return (
    <AuthLayout
      title="Sign in to LevelUp"
      subtitle="Welcome back — pick up right where you left off."
      footer={<>New to LevelUp? <Link to="/register" className="font-medium text-primary hover:underline">Create an account</Link></>}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" className="gap-2" disabled={loading !== null} onClick={() => onProvider("google")}>
            <GoogleIcon className="size-4" /> Google
          </Button>
          <Button type="button" variant="outline" className="gap-2" disabled={loading !== null} onClick={() => onProvider("github")}>
            <Github className="size-4" /> GitHub
          </Button>
        </div>
        <div className="relative my-2 text-center text-xs text-muted-foreground">
          <span className="bg-background px-2 relative z-10">or continue with email</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>
        <form className="space-y-4" onSubmit={onEmail}>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required defaultValue="aarav.mehta@levelup.events" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</Link>
            </div>
            <Input id="password" name="password" type="password" required defaultValue="levelup2026" />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox defaultChecked /> Keep me signed in for 30 days
          </label>
          <Button type="submit" className="w-full gap-2" disabled={loading !== null}>
            <Mail className="size-4" /> {loading === "email" ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
