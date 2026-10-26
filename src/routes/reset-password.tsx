import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const { session, loading, updatePassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = password.length >= 6 && password === confirm;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    const { error: updateError } = await updatePassword(password);
    setSubmitting(false);
    if (updateError) {
      setError(updateError);
      return;
    }
    setDone(true);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="text-sm text-ink-soft">Checking your reset link...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="kicker text-terracotta">Link expired</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-charcoal">
          This reset link is invalid or has expired.
        </h1>
        <Link
          to="/forgot-password"
          className="focus-ring mt-6 inline-flex items-center justify-center rounded-md bg-forest px-6 py-3 text-sm font-medium text-ivory hover:bg-forest/90"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="kicker text-terracotta">Password updated</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-charcoal">
          Your password has been changed.
        </h1>
        <Button className="mt-6" onClick={() => navigate({ to: "/passport" })}>
          Continue to your passport
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <PageKicker eyebrow="Reset password" title="Choose a new password." />

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <div>
          <label htmlFor="password" className="kicker mb-1.5 block text-ink-soft">
            New password
          </label>
          <Input
            id="password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-1 text-xs text-ink-soft">At least 6 characters.</p>
        </div>
        <div>
          <label htmlFor="confirm" className="kicker mb-1.5 block text-ink-soft">
            Confirm new password
          </label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {mismatch ? (
            <p className="mt-1 text-xs text-destructive">Passwords don't match.</p>
          ) : null}
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={!canSubmit || submitting}>
          {submitting ? "Saving..." : "Save new password"}
        </Button>
      </form>
    </div>
  );
}
