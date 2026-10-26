import { redirect } from "@tanstack/react-router";

import { supabase } from "@/lib/supabase";

export async function requireAuth({ location }: { location: { href: string } }) {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    throw redirect({ to: "/signin", search: { redirect: location.href } });
  }
}
