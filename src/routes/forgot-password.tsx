import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageKicker } from "@/components/page-kicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    await requestPasswordReset(email.trim());
    setSubmitting(false);
    // Always show success, regardless of whether the email exists, to avoid
    // revealing which addresses have accounts.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="kicker text-terracotta">Check your email</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-charcoal">
          If an account exists for {email}, a reset link is on its way.
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          Follow the link in the email to choose a new password. It may take a minute to arrive.
        </p>
        <Link
          to="/signin"
          className="focus-ring mt-6 inline-block link-underline text-sm text-forest"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="Reset password"
        title="Let's get you back in."
        description="Enter your email and we'll send a link to reset your password."
      />

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
        <Button type="submit" className="w-full" disabled={!email.trim() || submitting}>
          {submitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        <Link to="/signin" className="link-underline text-forest">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
