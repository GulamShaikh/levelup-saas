import { type ReactNode, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Calendar, FolderKanban, GraduationCap, MessagesSquare,
  Bell, User, Settings, Search, ChevronDown, Shield, LogOut, Sparkles, Menu, X,
  FileText, Megaphone, Compass, BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser as mockUser, notifications } from "@/lib/mock-data";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; badge?: string };

const userNav: { section: string; items: NavItem[] }[] = [
  {
    section: "Workspace",
    items: [
      { to: "/home", label: "Home", icon: LayoutDashboard },
      { to: "/events", label: "Events", icon: Calendar },
      { to: "/projects", label: "Projects", icon: FolderKanban },
      { to: "/courses", label: "Courses", icon: GraduationCap },
      { to: "/journey", label: "My Journey", icon: Compass, badge: "New" },
      { to: "/discord", label: "Community", icon: MessagesSquare },
    ],
  },
  {
    section: "Account",
    items: [
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/profile", label: "Profile", icon: User },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

const adminNav: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", icon: User },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/courses", label: "Courses", icon: GraduationCap },
  { to: "/admin/achievements", label: "Achievements", icon: Sparkles },
  { to: "/admin/community", label: "Community", icon: MessagesSquare },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/reports", label: "Reports", icon: FileText },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/audit", label: "Audit Logs", icon: Shield },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const displayUser = user ?? { name: mockUser.name, email: mockUser.email, avatar: mockUser.avatar };
  const handleSignOut = () => {
    signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  const sections = isAdmin
    ? [{ section: "Admin", items: adminNav }]
    : userNav;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-sidebar lg:flex lg:flex-col">
        <SidebarBody sections={sections} isAdmin={isAdmin} pathname={pathname} />
      </aside>

      {/* Sidebar — mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-border bg-sidebar shadow-elevated">
            <SidebarBody sections={sections} isAdmin={isAdmin} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search events, projects, people…" className="h-10 pl-9 bg-muted/60 border-transparent focus-visible:bg-card" />
          </div>
          <div className="flex-1 md:hidden" />
          <div className="flex items-center gap-2">
            <Link to={isAdmin ? "/home" : "/admin"}>
              <Button variant="outline" size="sm" className="hidden gap-2 sm:inline-flex">
                <Shield className="size-4" />
                {isAdmin ? "Exit admin" : "Admin"}
              </Button>
            </Link>
            <ThemeToggle />
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="size-5" />
              </Button>
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-secondary-foreground">{unread}</span>
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full p-1 hover:bg-muted">
                  <img src={displayUser.avatar} alt="" className="size-8 rounded-full" />
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{displayUser.name}</div>
                  <div className="text-xs font-normal text-muted-foreground">{displayUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 size-4" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}

function SidebarBody({
  sections, isAdmin, pathname, onNavigate,
}: {
  sections: { section: string; items: NavItem[] }[];
  isAdmin: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
        <Logo to="/home" iconClassName="h-7" showWordmark subtitle={isAdmin ? "Admin" : "Workspace"} />
        {onNavigate && (
          <button onClick={onNavigate} className="rounded-md p-1.5 hover:bg-sidebar-accent" aria-label="Close">
            <X className="size-4" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section) => (
          <div key={section.section}>
            <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.section}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = item.to === "/home" || item.to === "/admin"
                  ? pathname === item.to
                  : pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", active && "text-primary")} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{item.badge}</Badge>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-xl bg-muted p-3">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Sparkles className="size-3.5 text-secondary" /> Level {mockUser.level}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-card">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${(mockUser.xpInLevel / (mockUser.xpInLevel + mockUser.xpToNext)) * 100}%` }} />
          </div>
          <div className="mt-1.5 text-[11px] text-muted-foreground">{mockUser.xpToNext} XP to Level {mockUser.level + 1}</div>
        </div>
      </div>
    </>
  );
}

export function PageHeader({
  title, description, actions, breadcrumb,
}: { title: string; description?: string; actions?: ReactNode; breadcrumb?: { label: string; to?: string }[] }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {breadcrumb && (
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {b.to ? <Link to={b.to} className="hover:text-foreground">{b.label}</Link> : <span>{b.label}</span>}
                {i < breadcrumb.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
