import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set a new password — LevelUp" }] }),
  component: Reset,
});

function Reset() {
  return (
    <AuthLayout title="Set a new password" subtitle="Choose something memorable but strong." footer={<Link to="/login" className="hover:underline">← Back to sign in</Link>}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/login"; }}>
        <div className="space-y-1.5"><Label>New password</Label><Input type="password" placeholder="At least 8 characters" /></div>
        <div className="space-y-1.5"><Label>Confirm new password</Label><Input type="password" /></div>
        <Button className="w-full">Update password</Button>
      </form>
    </AuthLayout>
  );
}
