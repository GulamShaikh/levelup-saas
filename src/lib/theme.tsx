import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";
const KEY = "levelup.theme";

type Ctx = { theme: ThemeMode; setTheme: (t: ThemeMode) => void; resolved: "light" | "dark" };
const ThemeCtx = createContext<Ctx | null>(null);

function apply(mode: ThemeMode): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const root = document.documentElement;
  const resolved: "light" | "dark" =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : mode;
  root.classList.toggle("dark", resolved === "dark");
  return resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (window.localStorage.getItem(KEY) as ThemeMode | null)) || "system";
    setThemeState(stored);
    setResolved(apply(stored));
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((window.localStorage.getItem(KEY) as ThemeMode | null) === "system") setResolved(apply("system"));
    };
    mql.addEventListener("change", onChange);

    // Cross-tab sync: another tab changing the theme fires a `storage` event
    // here (never in the tab that made the change), so pick up its value and
    // re-apply immediately instead of drifting out of sync until next reload.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY && e.key !== null) return;
      const next = (window.localStorage.getItem(KEY) as ThemeMode | null) || "system";
      setThemeState(next);
      setResolved(apply(next));
    };
    window.addEventListener("storage", onStorage);

    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, t);
    setResolved(apply(t));
  };

  return <ThemeCtx.Provider value={{ theme, setTheme, resolved }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const v = useContext(ThemeCtx);
  if (!v) throw new Error("useTheme must be used inside <ThemeProvider>");
  return v;
}
