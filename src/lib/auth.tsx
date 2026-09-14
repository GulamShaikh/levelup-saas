import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "email" | "google" | "github";
};

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, password?: string, name?: string) => Promise<AuthUser>;
  signInWithProvider: (provider: "google" | "github") => Promise<AuthUser>;
  signUp: (name: string, email: string, password: string) => Promise<AuthUser>;
  signOut: () => void;
};

const KEY = "levelup.user";

const Ctx = createContext<AuthContextValue | null>(null);

function avatarFor(name: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1F2A5A&textColor=ffffff`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) window.localStorage.setItem(KEY, JSON.stringify(u));
      else window.localStorage.removeItem(KEY);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      signIn: async (email, _password, name) => {
        const display = name || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        const u: AuthUser = { id: `u_${Date.now()}`, name: display, email, avatar: avatarFor(display), provider: "email" };
        persist(u);
        return u;
      },
      signInWithProvider: async (provider) => {
        const name = provider === "google" ? "Aarav Mehta" : "Aarav Mehta";
        const u: AuthUser = {
          id: `u_${provider}`,
          name,
          email: `${name.split(" ")[0].toLowerCase()}@levelup.events`,
          avatar: avatarFor(name),
          provider,
        };
        persist(u);
        return u;
      },
      signUp: async (name, email) => {
        const u: AuthUser = { id: `u_${Date.now()}`, name, email, avatar: avatarFor(name), provider: "email" };
        persist(u);
        return u;
      },
      signOut: () => persist(null),
    }),
    [user, ready]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}
