import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";
import { cn } from "@/lib/utils";

type Props = {
  to?: string;
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
  subtitle?: string;
};

/**
 * Official LevelUp logo. Swap src/assets/logo.jpg to update the logo everywhere.
 */
export function Logo({
  to = "/",
  className,
  iconClassName,
  showWordmark = false,
  subtitle,
}: Props) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={logo}
        alt="LevelUp"
        className={cn("h-8 w-auto select-none", iconClassName)}
        draggable={false}
      />
      {showWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">LevelUp Events</span>
          {subtitle && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  );
  if (!to) return inner;
  return (
    <Link to={to} className="inline-flex items-center">
      {inner}
    </Link>
  );
}
