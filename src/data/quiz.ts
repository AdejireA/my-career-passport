import type { QuizQuestion } from "@/lib/types";

/**
 * Nine reflection questions. Every option carries transparent interest tags,
 * so results can always be explained by pointing back at the student's own
 * answers. Nothing here is a psychological diagnosis.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "saturday",
    kind: "multi",
    max: 3,
    prompt: "A free Saturday afternoon appears. Which of these would you happily spend it on?",
    helper: "Choose up to three.",
    options: [
      { id: "sat-help", label: "Helping at a community health outreach", tags: ["helping"] },
      {
        id: "sat-build",
        label: "Repairing or building something with your hands",
        tags: ["hands"],
      },
      {
        id: "sat-puzzle",
        label: "Cracking a hard puzzle or past-question paper",
        tags: ["solving"],
      },
      { id: "sat-design", label: "Designing a poster for an upcoming event", tags: ["creative"] },
      {
        id: "sat-records",
        label: "Helping your family record what the shop earned",
        tags: ["numbers"],
      },
      { id: "sat-farm", label: "Tending a small garden or visiting a farm", tags: ["nature"] },
      { id: "sat-speak", label: "Practising a debate or comparing a show", tags: ["speaking"] },
      { id: "sat-plan", label: "Planning the whole day hour by hour", tags: ["organising"] },
      { id: "sat-tech", label: "Exploring every setting of a new phone or app", tags: ["tech"] },
    ],
  },
  {
    id: "assembly",
    kind: "single",
    prompt:
      "During assembly, a classmate suddenly feels dizzy and sits on the ground. What do you do first?",
    options: [
      { id: "asm-care", label: "Stay with them and get them water and shade", tags: ["helping"] },
      { id: "asm-think", label: "Quietly work out what might have caused it", tags: ["solving"] },
      {
        id: "asm-lead",
        label: "Take charge and direct others to help quickly",
        tags: ["organising"],
      },
      { id: "asm-calm", label: "Speak gently to calm them and the crowd", tags: ["speaking"] },
    ],
  },
  {
    id: "cultural-day",
    kind: "single",
    prompt:
      "Your school is planning its cultural day. Which job would you quietly hope to be given?",
    options: [
      { id: "cd-design", label: "Designing the posters and decorations", tags: ["creative"] },
      { id: "cd-money", label: "Keeping track of all the money spent", tags: ["numbers"] },
      { id: "cd-mc", label: "Announcing items and holding the crowd", tags: ["speaking"] },
      { id: "cd-build", label: "Building the stage and arranging chairs", tags: ["hands"] },
      { id: "cd-sound", label: "Managing the sound system and projector", tags: ["tech"] },
      { id: "cd-garden", label: "Arranging plants and the outdoor space", tags: ["nature"] },
      {
        id: "cd-welcome",
        label: "Welcoming guests and making them comfortable",
        tags: ["helping"],
      },
      {
        id: "cd-schedule",
        label: "Drawing up the schedule and coordinating everyone",
        tags: ["organising"],
      },
    ],
  },
  {
    id: "junior",
    kind: "single",
    prompt: "A junior student is finding a subject really difficult. What do you do?",
    options: [
      {
        id: "jr-sit",
        label: "Sit with them and explain it step by step",
        tags: ["helping", "speaking"],
      },
      { id: "jr-search", label: "Find videos and apps that can help them learn", tags: ["tech"] },
      {
        id: "jr-notes",
        label: "Create simple notes and diagrams to make it clearer",
        tags: ["creative"],
      },
      {
        id: "jr-plan",
        label: "Show them how you organise your own study time",
        tags: ["organising"],
      },
      {
        id: "jr-outdoor",
        label: "Use a plant, animal or outdoor example to make the idea click",
        tags: ["nature"],
      },
    ],
  },
  {
    id: "worlds",
    kind: "multi",
    max: 4,
    prompt: "If you could step into any of these worlds, which would you enter?",
    helper: "Choose up to four.",
    options: [
      { id: "w-medicine", label: "Medicine and the human body", tags: ["helping", "solving"] },
      { id: "w-farm", label: "Farming and food production", tags: ["nature", "hands"] },
      {
        id: "w-build",
        label: "Machines, structures and how things are built",
        tags: ["hands", "solving"],
      },
      { id: "w-money", label: "Money, markets and business", tags: ["numbers", "organising"] },
      { id: "w-art", label: "Art, fashion and design", tags: ["creative"] },
      { id: "w-law", label: "Law and justice", tags: ["speaking", "solving"] },
      { id: "w-teach", label: "Teaching and sharing knowledge", tags: ["speaking", "helping"] },
      { id: "w-code", label: "Computers, apps and code", tags: ["tech", "solving"] },
      { id: "w-media", label: "Music, film and media", tags: ["creative", "speaking"] },
    ],
  },
  {
    id: "allowance",
    kind: "single",
    prompt: "You receive ₦5,000 for the month. What is your first instinct?",
    options: [
      { id: "al-track", label: "Write down every kobo so nothing disappears", tags: ["numbers"] },
      {
        id: "al-make",
        label: "Buy thread and beads and make something to sell",
        tags: ["hands", "creative"],
      },
      {
        id: "al-save",
        label: "Save it and plan carefully for something bigger",
        tags: ["organising"],
      },
      {
        id: "al-share",
        label: "Share part of it with someone who needs it more",
        tags: ["helping"],
      },
      {
        id: "al-grow",
        label: "Buy seeds or seedlings to grow and sell something",
        tags: ["nature", "hands"],
      },
    ],
  },
  {
    id: "problem",
    kind: "single",
    prompt: "Which problem in Nigeria would you most love to help solve one day?",
    options: [
      { id: "pb-health", label: "More hospitals and care in rural areas", tags: ["helping"] },
      {
        id: "pb-power",
        label: "Reliable electricity and clean energy",
        tags: ["solving", "hands"],
      },
      { id: "pb-food", label: "Local farms that feed the whole country", tags: ["nature"] },
      { id: "pb-tech", label: "Nigerian software used all over the world", tags: ["tech"] },
      {
        id: "pb-school",
        label: "Schools and learning every child enjoys",
        tags: ["speaking", "creative"],
      },
      { id: "pb-justice", label: "Clear justice and fairness for everyone", tags: ["speaking"] },
      {
        id: "pb-jobs",
        label: "Strong businesses that create jobs",
        tags: ["numbers", "organising"],
      },
    ],
  },
  {
    id: "lesson",
    kind: "single",
    prompt: "Your teacher introduces something new. What keeps you most interested?",
    options: [
      { id: "ls-figures", label: "Examples with figures and calculations", tags: ["numbers"] },
      { id: "ls-real", label: "How it works in real machines or gadgets", tags: ["hands", "tech"] },
      { id: "ls-visual", label: "Pictures, colours and good design", tags: ["creative"] },
      { id: "ls-debate", label: "Group discussion and debate", tags: ["speaking"] },
      { id: "ls-people", label: "How it connects to people's lives", tags: ["helping"] },
      { id: "ls-field", label: "Practical experiments, especially outdoors", tags: ["nature"] },
      { id: "ls-crack", label: "A case to crack step by step", tags: ["solving"] },
      {
        id: "ls-summary",
        label: "Putting the whole thing into an ordered summary",
        tags: ["organising"],
      },
    ],
  },
  {
    // This question names professionals directly, so it signals who a
    // student is curious about more than it signals an independent trait
    // the other eight questions measure. It still carries real evidence
    // (reasons stay visible), but counts for half a point so a single
    // "who sounds interesting" pick can't outweigh a pattern built from
    // several trait-based answers.
    id: "shadow",
    kind: "single",
    weight: 0.5,
    prompt: "You get to shadow one professional for a full working day. Who do you pick?",
    options: [
      { id: "sh-doctor", label: "A doctor on ward rounds", tags: ["helping"] },
      { id: "sh-nurse", label: "A nurse managing a busy clinic", tags: ["helping", "hands"] },
      { id: "sh-dev", label: "A software developer at their desk", tags: ["tech"] },
      { id: "sh-farmer", label: "A farmer on their land", tags: ["nature", "hands"] },
      { id: "sh-lawyer", label: "A lawyer preparing a case", tags: ["speaking", "solving"] },
      { id: "sh-accountant", label: "An accountant closing monthly accounts", tags: ["numbers"] },
      {
        id: "sh-teacher",
        label: "A teacher taking their best class",
        tags: ["speaking", "helping"],
      },
      {
        id: "sh-engineer",
        label: "An engineer on a construction site",
        tags: ["hands", "solving"],
      },
      { id: "sh-designer", label: "A designer in their studio", tags: ["creative"] },
      {
        id: "sh-founder",
        label: "An entrepreneur running their business",
        tags: ["organising", "numbers"],
      },
    ],
  },
];
