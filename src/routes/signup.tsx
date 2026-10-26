import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && password.length >= 6;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    const { error: signUpError, needsEmailConfirmation } = await signUp({
      email: email.trim(),
      password,
      preferredName: name.trim(),
    });
    setSubmitting(false);
    if (signUpError) {
      setError(signUpError);
      return;
    }
    if (needsEmailConfirmation) {
      setCheckEmail(true);
      return;
    }
    navigate({ to: "/onboarding" });
  };

  if (checkEmail) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="kicker text-terracotta">Almost there</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-charcoal">
          Check your email to confirm your account.
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          We sent a confirmation link to {email}. Once you confirm, come back and sign in.
        </p>
        <Link
          to="/signin"
          className="focus-ring mt-6 inline-flex items-center justify-center rounded-md bg-forest px-6 py-3 text-sm font-medium text-ivory hover:bg-forest/90"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="Create your passport"
        title="Start your journey."
        description="Just a name, an email and a password. Nothing else."
      />

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <div>
          <label htmlFor="name" className="kicker mb-1.5 block text-ink-soft">
            First name or nickname
          </label>
          <Input id="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email" className="kicker mb-1.5 block text-ink-soft">
            Email address
          </label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password" className="kicker mb-1.5 block text-ink-soft">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-1 text-xs text-ink-soft">At least 6 characters.</p>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={!canSubmit || submitting}>
          {submitting ? "Creating your passport..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        Already have an account?{" "}
        <Link to="/signin" className="link-underline text-forest">
          Sign in
        </Link>
      </p>
    </div>
  );
}
