import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function AuthLayout({
  title, subtitle, children, footer,
}: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(800px 400px at 20% 10%, #8BC34A55, transparent), radial-gradient(600px 400px at 80% 80%, #B7E08144, transparent)" }} />
        <div className="relative flex items-center rounded-xl bg-primary-foreground/95 px-3 py-2 w-fit">
          <Logo to="/" iconClassName="h-7" />
        </div>
        <div className="relative">
          <blockquote className="text-2xl font-medium leading-snug max-w-md">
            "LevelUp replaced four spreadsheets, two Notion docs and a WhatsApp group. Our community finally has one home."
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="size-10 rounded-full bg-accent/30" />
            <div>
              <div className="text-sm font-medium">Ananya Iyer</div>
              <div className="text-xs opacity-75">Community Lead · BITS Pilani</div>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-4 max-w-sm">
          {[["12k+", "Students"], ["340+", "Events"], ["96%", "NPS"]].map(([n, l]) => (
            <div key={l}><div className="text-xl font-semibold">{n}</div><div className="text-xs opacity-75">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="relative flex flex-col justify-center p-6 sm:p-12 bg-background">
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <ThemeToggle />
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Logo to="/" iconClassName="h-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-center text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

