import { useNavigate, useRouterState } from "@tanstack/react-router";

import { useAuth } from "@/hooks/use-auth";

/**
 * Lets anonymous visitors browse careers freely, but routes any action that
 * would save or sync personal progress (save, compare, start a roadmap)
 * through sign-in first, sending them back to where they were.
 */
export function useRequireAuthAction() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const href = useRouterState({ select: (s) => s.location.href });

  return (action: () => void) => {
    if (!user) {
      navigate({ to: "/signin", search: { redirect: href } });
      return;
    }
    action();
  };
}
