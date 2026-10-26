import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

type SignInSearch = { redirect?: string };

export const Route = createFileRoute("/signin")({
  validateSearch: (search: Record<string, unknown>): SignInSearch => {
    const redirect = search["redirect"];
    return typeof redirect === "string" ? { redirect } : {};
  },
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await signIn({ email: email.trim(), password });
    setSubmitting(false);
    if (signInError) {
      setError(signInError);
      return;
    }
    if (redirect) {
      window.location.assign(redirect);
      return;
    }
    navigate({ to: "/passport" });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <PageKicker eyebrow="Welcome back" title="Sign in to your passport." />

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <div>
          <label htmlFor="email" className="kicker mb-1.5 block text-ink-soft">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="password" className="kicker mb-1.5 block text-ink-soft">
              Password
            </label>
            <Link to="/forgot-password" className="link-underline text-xs text-forest">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={!canSubmit || submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        New here?{" "}
        <Link to="/signup" className="link-underline text-forest">
          Create a passport
        </Link>
      </p>
    </div>
  );
}
