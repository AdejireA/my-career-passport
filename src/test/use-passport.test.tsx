import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CAREERS, getCareer } from "@/data/careers";
import { buildRoadmapTasks } from "@/lib/roadmap";

const fakeUser = { id: "test-user-1" };

vi.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({ user: fakeUser, loading: false }),
}));

vi.mock("@/lib/passport-data", async () => {
  const actual = await vi.importActual<typeof import("@/lib/passport-data")>("@/lib/passport-data");
  return {
    ...actual,
    fetchPassportState: vi.fn().mockResolvedValue({ state: actual.EMPTY_STATE, error: null }),
    createRoadmap: vi.fn().mockResolvedValue({ error: null, id: "roadmap-1", startedAt: "now" }),
    setActiveRoadmapSlug: vi.fn().mockResolvedValue({ error: null }),
  };
});

// Imported after the mocks above so the hook picks them up.
const { PassportProvider, usePassport } = await import("@/hooks/use-passport");

function wrapper({ children }: { children: React.ReactNode }) {
  return <PassportProvider>{children}</PassportProvider>;
}

describe("ensureRoadmap preserves existing progress", () => {
  it("does not regenerate or reset tasks for a roadmap that already exists", async () => {
    const { result } = renderHook(() => usePassport(), { wrapper });

    const career = getCareer("software-developer")!;

    await waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => {
      result.current.ensureRoadmap(career.slug, buildRoadmapTasks(career, "SS1"), "SS1");
    });

    await waitFor(() => expect(result.current.state.roadmaps[career.slug]).toBeDefined());

    const firstTaskId = result.current.state.roadmaps[career.slug]!.tasks[0]!.id;

    act(() => {
      result.current.toggleRoadmapTask(career.slug, firstTaskId);
    });
    expect(result.current.state.roadmaps[career.slug]!.tasks[0]!.done).toBe(true);

    // Re-run ensureRoadmap as if the student revisited the career page and
    // clicked "Build a roadmap" again, now with a different (SS3) level.
    // Because a roadmap for this career already exists, this must only
    // switch the active roadmap — it must not replace the task list or
    // clear the completed task above.
    act(() => {
      result.current.ensureRoadmap(career.slug, buildRoadmapTasks(career, "SS3"), "SS3");
    });

    const roadmapAfter = result.current.state.roadmaps[career.slug]!;
    expect(roadmapAfter.generatedForLevel).toBe("SS1");
    expect(roadmapAfter.tasks[0]!.id).toBe(firstTaskId);
    expect(roadmapAfter.tasks[0]!.done).toBe(true);
  });
});

describe("buildRoadmapTasks is level-aware", () => {
  const career = CAREERS[0]!;

  it("produces a different task set for each school level", () => {
    const ss1 = buildRoadmapTasks(career, "SS1");
    const ss2 = buildRoadmapTasks(career, "SS2");
    const ss3 = buildRoadmapTasks(career, "SS3");

    const ids = (tasks: typeof ss1) =>
      tasks
        .map((t) => t.id)
        .sort()
        .join(",");
    expect(ids(ss1)).not.toBe(ids(ss2));
    expect(ids(ss2)).not.toBe(ids(ss3));
  });

  it("only SS3 includes admission-timing and application-process tasks", () => {
    const ss1 = buildRoadmapTasks(career, "SS1");
    const ss2 = buildRoadmapTasks(career, "SS2");
    const ss3 = buildRoadmapTasks(career, "SS3");

    expect(ss3.some((t) => t.id === "milestone-application")).toBe(true);
    expect(ss3.some((t) => t.id === "verify-current")).toBe(true);
    expect(ss1.some((t) => t.id === "milestone-application")).toBe(false);
    expect(ss2.some((t) => t.id === "milestone-application")).toBe(false);
  });

  it("only SS2 nudges students to compare pathways against another career", () => {
    const ss1 = buildRoadmapTasks(career, "SS1");
    const ss2 = buildRoadmapTasks(career, "SS2");
    const ss3 = buildRoadmapTasks(career, "SS3");

    expect(ss2.some((t) => t.id === "activity-compare")).toBe(true);
    expect(ss1.some((t) => t.id === "activity-compare")).toBe(false);
    expect(ss3.some((t) => t.id === "activity-compare")).toBe(false);
  });
});
