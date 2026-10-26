import { supabase } from "@/lib/supabase";
import type {
  CareerRoadmap,
  PassportState,
  RoadmapTask,
  SchoolLevel,
  StudentProfile,
} from "@/lib/types";

export const EMPTY_STATE: PassportState = {
  profile: null,
  quizAnswers: {},
  savedCareers: [],
  comparisonCareers: [],
  explored: [],
  roadmaps: {},
  activeRoadmapSlug: null,
};

type RoadmapTaskRow = { task_id: string; category: string; label: string; done: boolean };
type RoadmapRow = {
  id: string;
  career_slug: string;
  notes: string | null;
  started_at: string;
  generated_for_level: string | null;
  roadmap_tasks: RoadmapTaskRow[] | null;
};

function isSchoolLevel(value: string | null): value is SchoolLevel {
  return value === "SS1" || value === "SS2" || value === "SS3";
}

export async function fetchPassportState(
  userId: string,
): Promise<{ state: PassportState; error: { message: string } | null }> {
  const [profileRes, quizRes, savedRes, exploredRes, comparisonRes, roadmapsRes] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("quiz_responses").select("answers").eq("user_id", userId).maybeSingle(),
      supabase.from("saved_careers").select("career_slug").eq("user_id", userId),
      supabase.from("explored_careers").select("career_slug, explored_at").eq("user_id", userId),
      supabase.from("comparison_careers").select("career_slug").eq("user_id", userId),
      supabase
        .from("roadmaps")
        .select(
          "id, career_slug, notes, started_at, generated_for_level, roadmap_tasks(task_id, category, label, done)",
        )
        .eq("user_id", userId),
    ]);

  const firstError =
    profileRes.error ??
    quizRes.error ??
    savedRes.error ??
    exploredRes.error ??
    comparisonRes.error ??
    roadmapsRes.error ??
    null;

  const profileRow = profileRes.data as {
    preferred_name: string | null;
    school_level: string | null;
    subjects: string[] | null;
    interests: string[] | null;
    has_career_in_mind: boolean | null;
    career_in_mind: string | null;
    active_roadmap_slug: string | null;
    onboarding_completed: boolean | null;
  } | null;

  const profile: StudentProfile | null = profileRow?.onboarding_completed
    ? {
        name: profileRow.preferred_name ?? "",
        level: (profileRow.school_level as SchoolLevel | null) ?? "SS1",
        subjects: profileRow.subjects ?? [],
        interests: profileRow.interests ?? [],
        hasCareerInMind: profileRow.has_career_in_mind ?? false,
        careerInMind: profileRow.career_in_mind ?? "",
      }
    : null;

  const roadmaps: Record<string, CareerRoadmap> = {};
  for (const row of (roadmapsRes.data as RoadmapRow[] | null) ?? []) {
    const level = isSchoolLevel(row.generated_for_level) ? row.generated_for_level : null;
    roadmaps[row.career_slug] = {
      id: row.id,
      careerSlug: row.career_slug,
      notes: row.notes ?? "",
      startedAt: row.started_at,
      ...(level ? { generatedForLevel: level } : {}),
      tasks: (row.roadmap_tasks ?? []).map((t) => ({
        id: t.task_id,
        category: t.category as RoadmapTask["category"],
        label: t.label,
        done: t.done,
      })),
    };
  }

  return {
    state: {
      profile,
      quizAnswers: (quizRes.data?.answers as Record<string, string[]> | undefined) ?? {},
      savedCareers: (savedRes.data ?? []).map((r) => r.career_slug),
      comparisonCareers: (comparisonRes.data ?? []).map((r) => r.career_slug),
      explored: (exploredRes.data ?? []).map((r) => ({
        slug: r.career_slug,
        exploredAt: r.explored_at,
      })),
      roadmaps,
      activeRoadmapSlug: profileRow?.active_roadmap_slug ?? null,
    },
    error: firstError,
  };
}

export async function saveProfile(userId: string, profile: StudentProfile) {
  return supabase.from("profiles").upsert({
    id: userId,
    preferred_name: profile.name,
    school_level: profile.level,
    subjects: profile.subjects,
    interests: profile.interests,
    has_career_in_mind: profile.hasCareerInMind,
    career_in_mind: profile.careerInMind,
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  });
}

export async function saveQuizAnswers(userId: string, answers: Record<string, string[]>) {
  return supabase
    .from("quiz_responses")
    .upsert({ user_id: userId, answers, updated_at: new Date().toISOString() });
}

export async function addSavedCareer(userId: string, slug: string) {
  return supabase.from("saved_careers").insert({ user_id: userId, career_slug: slug });
}

export async function removeSavedCareer(userId: string, slug: string) {
  return supabase.from("saved_careers").delete().eq("user_id", userId).eq("career_slug", slug);
}

export async function addExploredCareer(userId: string, slug: string) {
  return supabase
    .from("explored_careers")
    .upsert(
      { user_id: userId, career_slug: slug },
      { onConflict: "user_id,career_slug", ignoreDuplicates: true },
    );
}

export async function addComparisonCareer(userId: string, slug: string) {
  return supabase.from("comparison_careers").insert({ user_id: userId, career_slug: slug });
}

export async function removeComparisonCareer(userId: string, slug: string) {
  return supabase.from("comparison_careers").delete().eq("user_id", userId).eq("career_slug", slug);
}

export async function createRoadmap(
  userId: string,
  slug: string,
  tasks: RoadmapTask[],
  level: SchoolLevel,
) {
  const { data, error } = await supabase
    .from("roadmaps")
    .insert({ user_id: userId, career_slug: slug, notes: "", generated_for_level: level })
    .select("id, started_at")
    .single();
  if (error || !data) return { error };

  const { error: tasksError } = await supabase.from("roadmap_tasks").insert(
    tasks.map((t) => ({
      roadmap_id: data.id,
      task_id: t.id,
      category: t.category,
      label: t.label,
      done: t.done,
    })),
  );
  return { error: tasksError, id: data.id as string, startedAt: data.started_at as string };
}

export async function updateRoadmapTaskDone(roadmapId: string, taskId: string, done: boolean) {
  return supabase
    .from("roadmap_tasks")
    .update({ done })
    .eq("roadmap_id", roadmapId)
    .eq("task_id", taskId);
}

export async function updateRoadmapNotes(roadmapId: string, notes: string) {
  return supabase.from("roadmaps").update({ notes }).eq("id", roadmapId);
}

export async function setActiveRoadmapSlug(userId: string, slug: string) {
  return supabase.from("profiles").update({ active_roadmap_slug: slug }).eq("id", userId);
}
