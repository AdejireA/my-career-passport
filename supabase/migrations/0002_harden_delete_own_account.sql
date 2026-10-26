-- Hardening: delete_own_account() is granted to `authenticated` in 0001, but
-- Postgres grants EXECUTE on new functions to PUBLIC by default, so it was
-- still callable (as a harmless no-op, since auth.uid() is null) by the
-- anonymous role. Lock it down explicitly and fail loudly for unauthenticated
-- callers instead of silently doing nothing.
-- Safe to re-run.

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke execute on function public.delete_own_account() from public;
revoke execute on function public.delete_own_account() from anon;
grant execute on function public.delete_own_account() to authenticated;
