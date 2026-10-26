import type { Career, RoadmapTask, SchoolLevel } from "@/lib/types";

function articleFor(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function researchTask(career: Career): RoadmapTask {
  const name = career.name.toLowerCase();
  return {
    id: "activity-research",
    category: "activity",
    label: `Find one Nigerian who works as ${articleFor(name)} ${name} (family, community, or online) and read or watch something they have shared about their work.`,
    done: false,
  };
}

/**
 * Roadmap task lists are generated once, at creation time, from the
 * student's career choice AND their school level. A saved roadmap's tasks
 * are never regenerated after that — changing this function only changes
 * what NEW roadmaps look like. Existing students keep exactly the tasks
 * (and completed/done state) they already have. See `CareerRoadmap.generatedForLevel`.
 */
export function buildRoadmapTasks(career: Career, level: SchoolLevel): RoadmapTask[] {
  switch (level) {
    case "SS1":
      return buildSS1Tasks(career);
    case "SS2":
      return buildSS2Tasks(career);
    case "SS3":
      return buildSS3Tasks(career);
  }
}

function buildSS1Tasks(career: Career): RoadmapTask[] {
  const tasks: RoadmapTask[] = [];

  // Discover interests and career possibilities.
  career.interestsSkills.slice(0, 3).forEach((skill, i) => {
    tasks.push({ id: `skill-${i}`, category: "skill", label: skill, done: false });
  });

  // Explore relevant subjects.
  tasks.push({
    id: "skill-subjects",
    category: "skill",
    label: `Look at how ${career.subjects.slice(0, 3).join(", ")} connect to subjects you're already taking, and notice which ones you actually enjoy.`,
    done: false,
  });

  // Beginner-friendly practical activities.
  tasks.push({ id: "activity-try", category: "activity", label: career.tryThis, done: false });
  tasks.push(researchTask(career));

  // Learn about professionals working in different fields.
  tasks.push({
    id: "question-day",
    category: "question",
    label: "What does a normal day actually look like for you?",
    done: false,
  });
  tasks.push({
    id: "question-like",
    category: "question",
    label: "What is your favourite part of this work, and why?",
    done: false,
  });

  tasks.push({
    id: "verify-note",
    category: "verify",
    label: career.verifyNote,
    done: false,
  });

  tasks.push({
    id: "milestone-talk",
    category: "milestone",
    label: `Talk to one person connected to ${career.name.toLowerCase()} work`,
    done: false,
  });
  tasks.push({
    id: "milestone-try",
    category: "milestone",
    label: "Complete the practical activity for this career",
    done: false,
  });

  return tasks;
}

function buildSS2Tasks(career: Career): RoadmapTask[] {
  const tasks: RoadmapTask[] = [];

  // Identify skills and learning opportunities.
  career.interestsSkills.slice(0, 4).forEach((skill, i) => {
    tasks.push({ id: `skill-${i}`, category: "skill", label: skill, done: false });
  });

  // Research entry requirements + explore institutions and alternative pathways
  // (each career's own pathway text already names the different routes).
  career.educationPathways.forEach((pathway, i) => {
    tasks.push({ id: `verify-path-${i}`, category: "verify", label: pathway, done: false });
  });
  tasks.push({ id: "verify-note", category: "verify", label: career.verifyNote, done: false });

  // Practical activities + comparing pathways.
  tasks.push({ id: "activity-try", category: "activity", label: career.tryThis, done: false });
  tasks.push(researchTask(career));
  tasks.push({
    id: "activity-compare",
    category: "activity",
    label:
      "Add one other career you're curious about to your Compare list, and write down one real difference in the day-to-day work and one in how you'd train for it.",
    done: false,
  });

  tasks.push({
    id: "question-hard",
    category: "question",
    label: "What is the hardest part of this work that people do not expect?",
    done: false,
  });
  tasks.push({
    id: "question-start",
    category: "question",
    label: "What would you tell a secondary school student who wants to start this path today?",
    done: false,
  });

  tasks.push({
    id: "milestone-talk",
    category: "milestone",
    label: `Talk to one person connected to ${career.name.toLowerCase()} work`,
    done: false,
  });
  tasks.push({
    id: "milestone-subjects",
    category: "milestone",
    label: `Check your current results in ${career.subjects.slice(0, 2).join(" and ")}, and note anything you need to strengthen before SS3`,
    done: false,
  });
  tasks.push({
    id: "milestone-institutions",
    category: "milestone",
    label:
      "List two or three specific institutions, colleges or training routes offering this path (university, polytechnic, technical college, or training programme) that you could realistically reach",
    done: false,
  });

  return tasks;
}

function buildSS3Tasks(career: Career): RoadmapTask[] {
  const tasks: RoadmapTask[] = [];

  career.interestsSkills.slice(0, 2).forEach((skill, i) => {
    tasks.push({ id: `skill-${i}`, category: "skill", label: skill, done: false });
  });

  // Investigate current admission requirements.
  career.educationPathways.forEach((pathway, i) => {
    tasks.push({ id: `verify-path-${i}`, category: "verify", label: pathway, done: false });
  });
  tasks.push({ id: "verify-note", category: "verify", label: career.verifyNote, done: false });
  tasks.push({
    id: "verify-current",
    category: "verify",
    label:
      "This year's exact subject combinations, cut-off marks or application windows are not listed here on purpose — confirm the current ones directly with JAMB, the institution, or the regulatory body named above before you rely on them.",
    done: false,
  });

  tasks.push({ id: "activity-try", category: "activity", label: career.tryThis, done: false });
  tasks.push(researchTask(career));

  tasks.push({
    id: "question-hard",
    category: "question",
    label: "What is the hardest part of this work that people do not expect?",
    done: false,
  });
  tasks.push({
    id: "question-regret",
    category: "question",
    label:
      "Looking back, what do you wish you had done differently in your final year of secondary school?",
    done: false,
  });

  // Prepare a transition plan + research application processes + practical next steps.
  tasks.push({
    id: "milestone-subjects",
    category: "milestone",
    label: `Confirm your current results in ${career.subjects.slice(0, 2).join(" and ")} meet what this path typically expects, and plan how to close any gap before you finish`,
    done: false,
  });
  tasks.push({
    id: "milestone-application",
    category: "milestone",
    label:
      "Write out the exact next registration or application step for this path (for example: JAMB UTME registration, a Trade Test centre, a polytechnic ND intake, or an apprenticeship placement) and its usual timing, then confirm this year's real dates with the right body",
    done: false,
  });
  tasks.push({
    id: "milestone-backup",
    category: "milestone",
    label:
      "Identify one realistic backup pathway into this field, in case your first choice doesn't work out this cycle",
    done: false,
  });
  tasks.push({
    id: "milestone-talk",
    category: "milestone",
    label: `Talk to one person connected to ${career.name.toLowerCase()} work`,
    done: false,
  });

  return tasks;
}

export const ROADMAP_SECTIONS: {
  category: RoadmapTask["category"];
  title: string;
  helper: string;
}[] = [
  {
    category: "skill",
    title: "Skills to explore",
    helper: "Interests and skills this career draws on.",
  },
  {
    category: "verify",
    title: "Educational requirements to verify",
    helper: "Pathways and notes to confirm with real institutions.",
  },
  {
    category: "activity",
    title: "Practical activities",
    helper: "Small, practical ways to try this out.",
  },
  {
    category: "question",
    title: "Questions to ask professionals",
    helper: "Bring these if you get to talk to someone.",
  },
  {
    category: "milestone",
    title: "Steps worth checking off",
    helper: "Short-term, level-appropriate next steps.",
  },
];
