import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { ChipPicker, INTEREST_SUGGESTIONS, SUBJECT_SUGGESTIONS } from "@/components/chip-picker";
import { PageKicker } from "@/components/page-kicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCareer } from "@/data/careers";
import { useAuth } from "@/hooks/use-auth";
import { usePassport } from "@/hooks/use-passport";
import { requireAuth } from "@/lib/require-auth";
import type { SchoolLevel } from "@/lib/types";

export const Route = createFileRoute("/profile")({
  beforeLoad: requireAuth,
  component: Profile,
});

const LEVELS: SchoolLevel[] = ["SS1", "SS2", "SS3"];

function Profile() {
  const navigate = useNavigate();
  const { user, updatePassword, deleteAccount, signOut } = useAuth();
  const { state, setProfile } = usePassport();

  const [name, setName] = useState("");
  const [level, setLevel] = useState<SchoolLevel>("SS1");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (state.profile) {
      setName(state.profile.name);
      setLevel(state.profile.level);
      setSubjects(state.profile.subjects);
      setInterests(state.profile.interests);
    }
  }, [state.profile]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const saveDetails = (e: FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfile({
      name: name.trim(),
      level,
      subjects,
      interests,
      hasCareerInMind: state.profile?.hasCareerInMind ?? false,
      careerInMind: state.profile?.careerInMind ?? "",
    });
    setSavingProfile(false);
    toast.success("Profile updated");
  };

  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return;
    setSavingPassword(true);
    const { error } = await updatePassword(newPassword);
    setSavingPassword(false);
    if (error) {
      toast.error("Couldn't update your password", { description: error });
      return;
    }
    setNewPassword("");
    toast.success("Password updated");
  };

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onDeleteAccount = async () => {
    setDeleting(true);
    const { error } = await deleteAccount();
    setDeleting(false);
    if (error) {
      toast.error("Couldn't delete your account", { description: error });
      return;
    }
    navigate({ to: "/" });
  };

  const exploredSorted = [...state.explored].sort((a, b) =>
    b.exploredAt.localeCompare(a.exploredAt),
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <PageKicker
        eyebrow="My profile"
        title="Your account."
        description="Focused on your career development, not a social profile. Nothing here is public."
      />

      <form onSubmit={saveDetails} className="mt-10 space-y-6 border-t border-border pt-8">
        <p className="kicker text-ink-soft">Details</p>
        <div>
          <label htmlFor="email" className="kicker mb-1.5 block text-ink-soft">
            Email
          </label>
          <Input id="email" value={user?.email ?? ""} disabled />
        </div>
        <div>
          <label htmlFor="name" className="kicker mb-1.5 block text-ink-soft">
            Preferred name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div>
          <p className="kicker mb-1.5 text-ink-soft">School level</p>
          <Select value={level} onValueChange={(v) => setLevel(v as SchoolLevel)}>
            <SelectTrigger className="w-32" aria-label="School level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="kicker mb-1.5 text-ink-soft">Favourite subjects</p>
          <ChipPicker
            suggestions={SUBJECT_SUGGESTIONS}
            selected={subjects}
            onToggle={(v) => toggle(subjects, setSubjects, v)}
            onAddCustom={(v) => setSubjects([...subjects, v])}
          />
        </div>
        <div>
          <p className="kicker mb-1.5 text-ink-soft">Interests</p>
          <ChipPicker
            suggestions={INTEREST_SUGGESTIONS}
            selected={interests}
            onToggle={(v) => toggle(interests, setInterests, v)}
            onAddCustom={(v) => setInterests([...interests, v])}
          />
        </div>
        <Button type="submit" disabled={savingProfile}>
          {savingProfile ? "Saving..." : "Save details"}
        </Button>
      </form>

      <form onSubmit={savePassword} className="mt-12 space-y-4 border-t border-border pt-8">
        <p className="kicker text-ink-soft">Change password</p>
        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit" variant="outline" disabled={newPassword.length < 6 || savingPassword}>
          {savingPassword ? "Saving..." : "Update password"}
        </Button>
      </form>

      <section className="mt-12 border-t border-border pt-8">
        <p className="kicker mb-3 text-ink-soft">
          Career exploration history ({exploredSorted.length})
        </p>
        {exploredSorted.length > 0 ? (
          <ul className="space-y-1.5">
            {exploredSorted.map((e) => {
              const c = getCareer(e.slug);
              if (!c) return null;
              return (
                <li key={e.slug} className="text-sm text-charcoal">
                  {c.name}
                  <span className="ml-2 text-xs text-ink-soft">
                    {new Date(e.exploredAt).toLocaleDateString()}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-ink-soft">You haven&apos;t opened a career profile yet.</p>
        )}
      </section>

      <section className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <p className="kicker text-ink-soft">Session</p>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </section>

      <section className="mt-12 border-t border-destructive/30 pt-8">
        <p className="kicker mb-2 text-destructive">Delete account</p>
        <p className="mb-4 max-w-md text-sm text-ink-soft">
          This permanently deletes your account and every piece of data linked to it: your profile,
          discoveries, saved careers and roadmaps. It cannot be undone.
        </p>
        {confirmingDelete ? (
          <div className="flex gap-3">
            <Button variant="destructive" onClick={onDeleteAccount} disabled={deleting}>
              {deleting ? "Deleting..." : "Yes, delete my account"}
            </Button>
            <Button variant="ghost" onClick={() => setConfirmingDelete(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="destructive" onClick={() => setConfirmingDelete(true)}>
            Delete my account
          </Button>
        )}
      </section>
    </div>
  );
}
