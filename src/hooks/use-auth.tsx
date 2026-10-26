import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { supabase } from "@/lib/supabase";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (params: {
    email: string;
    password: string;
    preferredName: string;
  }) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  signIn: (params: { email: string; password: string }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  deleteAccount: () => Promise<{ error: string | null }>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      signUp: async ({ email, password, preferredName }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { preferred_name: preferredName },
            // Without this, the confirmation email falls back to the
            // Supabase project's dashboard-configured Site URL, which can
            // silently point at the wrong environment (e.g. localhost) on a
            // preview/production deploy. Using the page's own origin keeps
            // the confirmation link correct wherever the app is running.
            emailRedirectTo: `${window.location.origin}/signin`,
          },
        });
        if (error) return { error: error.message, needsEmailConfirmation: false };
        const needsEmailConfirmation = !data.session;
        return { error: null, needsEmailConfirmation };
      },
      signIn: async ({ email, password }) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error ? error.message : null };
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
      requestPasswordReset: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        return { error: error ? error.message : null };
      },
      updatePassword: async (newPassword) => {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        return { error: error ? error.message : null };
      },
      deleteAccount: async () => {
        const { error } = await supabase.rpc("delete_own_account");
        if (!error) await supabase.auth.signOut();
        return { error: error ? error.message : null };
      },
    }),
    [session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
