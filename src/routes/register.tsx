import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Github } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create your account — LevelUp" }] }),
  component: Register,
});

function Register() {
  const { signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<"email" | "google" | "github" | null>(null);

  const finish = (name: string) => {
    toast.success(`Welcome to LevelUp, ${name.split(" ")[0]}!`);
    navigate({ to: "/home" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("email");
    const fd = new FormData(e.currentTarget);
    const name = `${fd.get("first")} ${fd.get("last")}`.trim();
    const u = await signUp(name, String(fd.get("email")), String(fd.get("password")));
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
      title="Create your account"
      subtitle="Join 12,000+ students leveling up together."
      footer={<>Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link></>}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" disabled={loading !== null} onClick={() => onProvider("google")}>Sign up with Google</Button>
          <Button type="button" variant="outline" className="gap-2" disabled={loading !== null} onClick={() => onProvider("github")}>
            <Github className="size-4" /> GitHub
          </Button>
        </div>
        <div className="relative my-2 text-center text-xs text-muted-foreground">
          <span className="bg-background px-2 relative z-10">or use your email</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label htmlFor="first">First name</Label><Input id="first" name="first" required defaultValue="Aarav" /></div>
            <div className="space-y-1.5"><Label htmlFor="last">Last name</Label><Input id="last" name="last" required defaultValue="Mehta" /></div>
          </div>
          <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required placeholder="you@university.edu" /></div>
          <div className="space-y-1.5"><Label htmlFor="org">University / Organization</Label><Input id="org" placeholder="IIT Bombay" /></div>
          <div className="space-y-1.5"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required placeholder="At least 8 characters" /></div>
          <Button type="submit" className="w-full" disabled={loading !== null}>{loading === "email" ? "Creating account…" : "Create account"}</Button>
          <p className="text-xs text-center text-muted-foreground">By signing up you agree to our Terms and Privacy Policy.</p>
        </form>
      </div>
    </AuthLayout>
  );
}
