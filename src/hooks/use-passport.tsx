import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import {
  EMPTY_STATE,
  addComparisonCareer,
  addExploredCareer,
  addSavedCareer,
  createRoadmap,
  fetchPassportState,
  removeComparisonCareer,
  removeSavedCareer,
  saveProfile,
  saveQuizAnswers,
  setActiveRoadmapSlug,
  updateRoadmapNotes,
  updateRoadmapTaskDone,
} from "@/lib/passport-data";
import type { CareerRoadmap, PassportState, RoadmapTask, StudentProfile } from "@/lib/types";

type PassportContextValue = {
  state: PassportState;
  hydrated: boolean;
  setProfile: (profile: StudentProfile) => void;
  setQuizAnswers: (answers: Record<string, string[]>) => void;
  toggleSavedCareer: (slug: string) => void;
  markExplored: (slug: string) => void;
  toggleCompareCareer: (slug: string) => void;
  removeCompareCareer: (slug: string) => void;
  ensureRoadmap: (slug: string, tasks: RoadmapTask[], level: StudentProfile["level"]) => void;
  toggleRoadmapTask: (slug: string, taskId: string) => void;
  setRoadmapNotes: (slug: string, notes: string) => void;
  setActiveRoadmap: (slug: string) => void;
};

const PassportContext = createContext<PassportContextValue | null>(null);

function updateRoadmap(
  roadmaps: Record<string, CareerRoadmap>,
  slug: string,
  update: (roadmap: CareerRoadmap) => CareerRoadmap,
) {
  const roadmap = roadmaps[slug];
  if (!roadmap) return roadmaps;
  return { ...roadmaps, [slug]: update(roadmap) };
}

function reportError(message: string, error: { message: string } | null) {
  if (!error) return;
  toast.error(message, { description: error.message });
}

export function PassportProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<PassportState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);
  const notesTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    if (!user) {
      setState(EMPTY_STATE);
      setHydrated(true);
      return;
    }
    let cancelled = false;
    setHydrated(false);
    fetchPassportState(user.id).then(({ state: loaded, error }) => {
      if (cancelled) return;
      setState(loaded);
      setHydrated(true);
      if (error) {
        reportError("Couldn't load some of your saved data. Try refreshing the page.", error);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const value = useMemo<PassportContextValue>(
    () => ({
      state,
      hydrated,
      setProfile: (profile) => {
        setState((s) => ({ ...s, profile }));
        if (user)
          saveProfile(user.id, profile).then(({ error }) =>
            reportError("Couldn't save your profile", error),
          );
      },
      setQuizAnswers: (answers) => {
        setState((s) => ({ ...s, quizAnswers: answers }));
        if (user)
          saveQuizAnswers(user.id, answers).then(({ error }) =>
            reportError("Couldn't save your answers", error),
          );
      },
      toggleSavedCareer: (slug) => {
        const adding = !state.savedCareers.includes(slug);
        setState((s) => ({
          ...s,
          savedCareers: adding
            ? [...s.savedCareers, slug]
            : s.savedCareers.filter((c) => c !== slug),
        }));
        if (!user) return;
        const op = adding ? addSavedCareer(user.id, slug) : removeSavedCareer(user.id, slug);
        op.then(({ error }) => reportError("Couldn't update your saved careers", error));
      },
      markExplored: (slug) => {
        if (state.explored.some((e) => e.slug === slug)) return;
        setState((s) => ({
          ...s,
          explored: [...s.explored, { slug, exploredAt: new Date().toISOString() }],
        }));
        if (user)
          addExploredCareer(user.id, slug).then(({ error }) =>
            reportError("Couldn't record that you viewed this career", error),
          );
      },
      toggleCompareCareer: (slug) => {
        const inComparison = state.comparisonCareers.includes(slug);
        if (!inComparison && state.comparisonCareers.length >= 3) return;
        setState((s) => ({
          ...s,
          comparisonCareers: inComparison
            ? s.comparisonCareers.filter((c) => c !== slug)
            : [...s.comparisonCareers, slug],
        }));
        if (!user) return;
        const op = inComparison
          ? removeComparisonCareer(user.id, slug)
          : addComparisonCareer(user.id, slug);
        op.then(({ error }) => reportError("Couldn't update your comparison list", error));
      },
      removeCompareCareer: (slug) => {
        setState((s) => ({
          ...s,
          comparisonCareers: s.comparisonCareers.filter((c) => c !== slug),
        }));
        if (user)
          removeComparisonCareer(user.id, slug).then(({ error }) =>
            reportError("Couldn't update your comparison list", error),
          );
      },
      ensureRoadmap: (slug, tasks, level) => {
        // Existing roadmaps are never regenerated or overwritten here — if one
        // already exists for this career, this only switches which roadmap is
        // active. The task list (and any completed/done state) a student
        // already has stays exactly as it was, even if buildRoadmapTasks or
        // the student's profile level changes later.
        if (state.roadmaps[slug]) {
          setState((s) => ({ ...s, activeRoadmapSlug: slug }));
          if (user)
            setActiveRoadmapSlug(user.id, slug).then(({ error }) =>
              reportError("Couldn't switch your active roadmap", error),
            );
          return;
        }
        const startedAt = new Date().toISOString();
        setState((s) => ({
          ...s,
          activeRoadmapSlug: slug,
          roadmaps: {
            ...s.roadmaps,
            [slug]: {
              id: "",
              careerSlug: slug,
              tasks,
              notes: "",
              startedAt,
              generatedForLevel: level,
            },
          },
        }));
        if (!user) return;
        createRoadmap(user.id, slug, tasks, level).then((result) => {
          if (result.error) {
            reportError("Couldn't create your roadmap", result.error);
            return;
          }
          if (result.id) {
            setState((s) =>
              s.roadmaps[slug]
                ? {
                    ...s,
                    roadmaps: updateRoadmap(s.roadmaps, slug, (r) => ({ ...r, id: result.id! })),
                  }
                : s,
            );
          }
        });
        setActiveRoadmapSlug(user.id, slug).then(({ error }) =>
          reportError("Couldn't switch your active roadmap", error),
        );
      },
      toggleRoadmapTask: (slug, taskId) => {
        const roadmap = state.roadmaps[slug];
        const task = roadmap?.tasks.find((t) => t.id === taskId);
        if (!roadmap || !task) return;
        const nextDone = !task.done;
        setState((s) => ({
          ...s,
          roadmaps: updateRoadmap(s.roadmaps, slug, (r) => ({
            ...r,
            tasks: r.tasks.map((t) => (t.id === taskId ? { ...t, done: nextDone } : t)),
          })),
        }));
        if (user && roadmap.id)
          updateRoadmapTaskDone(roadmap.id, taskId, nextDone).then(({ error }) =>
            reportError("Couldn't save that change", error),
          );
      },
      setRoadmapNotes: (slug, notes) => {
        setState((s) => ({
          ...s,
          roadmaps: updateRoadmap(s.roadmaps, slug, (r) => ({ ...r, notes })),
        }));
        const roadmap = state.roadmaps[slug];
        if (!user || !roadmap?.id) return;
        const existing = notesTimers.current.get(slug);
        if (existing) clearTimeout(existing);
        const roadmapId = roadmap.id;
        notesTimers.current.set(
          slug,
          setTimeout(() => {
            updateRoadmapNotes(roadmapId, notes).then(({ error }) =>
              reportError("Couldn't save your notes", error),
            );
          }, 600),
        );
      },
      setActiveRoadmap: (slug) => {
        setState((s) => ({ ...s, activeRoadmapSlug: slug }));
        if (user)
          setActiveRoadmapSlug(user.id, slug).then(({ error }) =>
            reportError("Couldn't switch your active roadmap", error),
          );
      },
    }),
    [state, hydrated, user],
  );

  return <PassportContext.Provider value={value}>{children}</PassportContext.Provider>;
}

export function usePassport() {
  const ctx = useContext(PassportContext);
  if (!ctx) throw new Error("usePassport must be used within PassportProvider");
  return ctx;
}
