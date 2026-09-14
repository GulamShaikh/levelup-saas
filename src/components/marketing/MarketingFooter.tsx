import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/community", label: "Community" },
      { to: "/success-stories", label: "Success Stories" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/register", label: "Get started" },
      { to: "/login", label: "Sign in" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/faq", label: "Help center" },
      { to: "/community", label: "Discord" },
      { to: "/success-stories", label: "Case studies" },
      { to: "/contact", label: "Partnerships" },
    ],
  },
] as const;

const socials = [
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo showWordmark subtitle="Events" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The all-in-one workspace for student communities — events, learning,
              projects, achievements and recognition, all in one place.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-foreground/80 transition hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} LevelUp Events. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/about" className="hover:text-foreground">Privacy</Link>
            <Link to="/about" className="hover:text-foreground">Terms</Link>
            <Link to="/contact" className="hover:text-foreground">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
