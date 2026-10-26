import { useEffect, useId, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

import logoEmblem from "@/assets/logo-emblem.png";
import logoFull from "@/assets/logo-full.png";
import { useAuth } from "@/hooks/use-auth";
import { usePassport } from "@/hooks/use-passport";

type NavLink = { to: string; label: string };

const PUBLIC_LINKS: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/careers", label: "Explore Careers" },
  { to: "/stories", label: "Career Stories" },
];

const AUTH_LINKS: NavLink[] = [
  { to: "/passport", label: "My Passport" },
  { to: "/discover", label: "Discover" },
  { to: "/careers", label: "Explore Careers" },
  { to: "/roadmap", label: "My Roadmap" },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state } = usePassport();
  const { user, loading, signOut } = useAuth();
  const isLanding = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a, button"));
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const navLinks = user ? AUTH_LINKS : PUBLIC_LINKS;

  const isActive = (to: string) => pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));

  const linkClasses = (active: boolean) =>
    `focus-ring kicker rounded-sm transition-colors hover:text-forest ${
      active ? "text-forest" : "text-ink-soft"
    }`;

  return (
    <header
      className="relative border-b border-border"
      style={{ backgroundColor: isLanding ? "transparent" : "var(--color-ivory)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="focus-ring flex shrink-0 items-center gap-2 rounded-sm">
          <img src={logoEmblem} alt="" className="h-8 w-8 object-contain md:hidden" />
          <span className="font-display text-lg font-semibold tracking-tight text-forest md:hidden">
            My Career Passport
          </span>
          <img
            src={logoFull}
            alt="My Career Passport"
            className="hidden h-10 w-auto object-contain md:block"
          />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={linkClasses(isActive(link.to))}
                style={
                  isActive(link.to)
                    ? {
                        textDecoration: "underline",
                        textDecorationColor: "var(--color-terracotta)",
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                      }
                    : undefined
                }
              >
                {link.label}
                {link.to === "/careers" && state.savedCareers.length > 0 ? (
                  <span className="ml-1.5 text-terracotta">({state.savedCareers.length})</span>
                ) : null}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-border pl-6">
            {loading ? null : user ? (
              <>
                <Link to="/profile" className={linkClasses(isActive("/profile"))}>
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="focus-ring kicker rounded-sm text-ink-soft transition-colors hover:text-forest"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="focus-ring kicker rounded-sm text-ink-soft transition-colors hover:text-forest"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="focus-ring rounded-md bg-forest px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ivory transition-colors hover:bg-forest/90"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="focus-ring -mr-1 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-sm md:hidden"
        >
          <span
            className="block h-[2px] w-6 bg-charcoal transition-transform"
            style={menuOpen ? { transform: "translateY(7px) rotate(45deg)" } : undefined}
          />
          <span
            className="block h-[2px] w-6 bg-charcoal transition-opacity"
            style={menuOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="block h-[2px] w-6 bg-charcoal transition-transform"
            style={menuOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : undefined}
          />
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-charcoal/30 md:hidden"
          />
          <div
            id={panelId}
            ref={panelRef}
            className="fixed inset-x-0 top-16 z-50 border-b border-border bg-ivory px-4 py-6 shadow-lg md:hidden"
          >
            <nav aria-label="Primary" className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring kicker rounded-md px-2 py-3 text-left transition-colors"
                  style={{
                    color: isActive(link.to) ? "var(--color-forest)" : "var(--color-ink-soft)",
                  }}
                >
                  {link.label}
                  {link.to === "/careers" && state.savedCareers.length > 0 ? (
                    <span className="ml-1.5 text-terracotta">({state.savedCareers.length})</span>
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              {loading ? null : user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="focus-ring kicker rounded-md px-2 py-3 text-left text-ink-soft"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="focus-ring kicker rounded-md px-2 py-3 text-left text-ink-soft"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMenuOpen(false)}
                    className="focus-ring kicker rounded-md px-2 py-3 text-left text-ink-soft"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="focus-ring rounded-md bg-forest px-4 py-3 text-center text-sm font-semibold text-ivory"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
