export type CareerStory = {
  id: string;
  careerSlug: string;
  name: string;
  role: string;
  kind: "professional" | "student";
  quote: string;
  body: string;
  /**
   * Whether this is a real, consented account from an actual person
   * ("verified") or a fictional placeholder written for the prototype
   * ("fictional"). Every entry today is "fictional" — this field exists so
   * a future real interview can be added without changing the data shape,
   * and so the UI can render the two kinds differently rather than ever
   * implying a placeholder is a genuine testimonial.
   */
  verification: "fictional" | "verified";
  /** Required when verification is "verified": who supplied/checked it and when. */
  source?: { attributedTo: string; collectedAt: string };
};

/**
 * Every story below is a fictional placeholder written for prototype
 * testing. No real person, credential or testimonial is represented here.
 * Each entry's `role` carries a visible "fictional placeholder" marker and
 * `verification` is explicitly "fictional" — both are read by the UI, so
 * removing either would stop the disclosure from rendering. Do not add a
 * "verified" entry without a real, consented source.
 */
export const CAREER_STORIES: CareerStory[] = [
  {
    id: "story-amaka",
    careerSlug: "doctor",
    name: "Amaka O.",
    role: "Final-year medical student, fictional placeholder",
    kind: "student",
    quote:
      "The first time I took a real patient's history, I understood why I sat all those biology exams.",
    body: "Clinical postings are long and tiring, but the moment a diagnosis actually helps someone feels like nothing else. The hardest part so far has been learning to stay calm when a case does not go the way the textbook said it would.",
    verification: "fictional",
  },
  {
    id: "story-tolu",
    careerSlug: "software-developer",
    name: "Tolu A.",
    role: "Software developer, fictional placeholder",
    kind: "professional",
    quote:
      "Nobody warned me that most of the job is reading other people's code, not writing my own from scratch.",
    body: "I started with free tutorials on my phone before I ever owned a laptop. The breakthrough was not a course, it was building one small, ugly project and finishing it. Debugging still humbles me every week.",
    verification: "fictional",
  },
  {
    id: "story-ifeoma",
    careerSlug: "civil-engineer",
    name: "Ifeoma N.",
    role: "Civil engineering student, fictional placeholder",
    kind: "student",
    quote:
      "I used to think engineering was only equations. It is also convincing a site team to trust your drawing.",
    body: "Site visits taught me more than lecture halls did. Seeing a drain you helped design actually carry water during the first heavy rain is a strange, quiet kind of pride.",
    verification: "fictional",
  },
  {
    id: "story-bisi",
    careerSlug: "fashion-designer",
    name: "Bisi K.",
    role: "Fashion designer, fictional placeholder",
    kind: "professional",
    quote:
      "My first customer was my aunt, and my first serious mistake was cutting fabric before I had her measurements right.",
    body: "I learned pattern-making from a tailor two streets from my house before any formal course. The business side, pricing, record-keeping, saying no to late payers, took longer to learn than the sewing did.",
    verification: "fictional",
  },
  {
    id: "story-chidi",
    careerSlug: "lawyer",
    name: "Chidi E.",
    role: "Law graduate, fictional placeholder",
    kind: "student",
    quote: "Law school taught me to argue. My first pupillage taught me to listen before I argue.",
    body: "I expected courtroom drama. Most days are actually research, drafting and re-drafting. The part I did not expect to love is how often a calm, well-written letter settles something before it ever reaches a judge.",
    verification: "fictional",
  },
  {
    id: "story-grace",
    careerSlug: "agronomist",
    name: "Grace M.",
    role: "Agribusiness founder, fictional placeholder",
    kind: "professional",
    quote:
      "Farming taught me patience. Agribusiness taught me that patience alone does not sell tomatoes before they spoil.",
    body: "My degree was in crop science, but the real education came from a failed first harvest. Now half my work is in the field and half is on the phone, talking to buyers and tracking what sells.",
    verification: "fictional",
  },
  {
    id: "story-seun",
    careerSlug: "accountant",
    name: "Seun O.",
    role: "ICAN trainee, fictional placeholder",
    kind: "student",
    quote:
      "I thought accounting was quiet and solitary. It is actually a lot of explaining numbers to people who are nervous about them.",
    body: "The exams are demanding, but the skill that surprised me most is translating a spreadsheet into three sentences a non-accountant can act on.",
    verification: "fictional",
  },
  {
    id: "story-funmi",
    careerSlug: "journalist",
    name: "Funmi A.",
    role: "Community reporter, fictional placeholder",
    kind: "professional",
    quote:
      "Chasing a story is exciting. Checking it twice before you publish is the part that actually makes you a journalist.",
    body: "I started writing for a school newsletter. The instinct to verify, to call a second source even when the first one sounds certain, is the habit that took longest to build and matters most.",
    verification: "fictional",
  },
  {
    id: "story-ngozi",
    careerSlug: "teacher",
    name: "Ngozi P.",
    role: "Secondary school teacher, fictional placeholder",
    kind: "professional",
    quote:
      "I prepared for a subject. Nobody told me I would spend just as much time managing a room of forty different moods.",
    body: "My first term I over-explained everything because I was nervous. The shift came when I started asking students to explain ideas back to me in their own words; that is when I could actually tell who understood and who was just nodding.",
    verification: "fictional",
  },
  {
    id: "story-blessing",
    careerSlug: "nurse",
    name: "Blessing U.",
    role: "Ward nurse, fictional placeholder",
    kind: "professional",
    quote:
      "Doctors diagnose for ten minutes. Nurses are the ones there for the other twenty-three hours and fifty.",
    body: "Nursing school drilled procedure into me, but the ward taught me to read a patient's face before they say anything is wrong. The physical stamina the job needs still surprises people who have not done a full shift on their feet.",
    verification: "fictional",
  },
  {
    id: "story-emeka",
    careerSlug: "electrician",
    name: "Emeka J.",
    role: "Electrical installer, fictional placeholder",
    kind: "professional",
    quote:
      "Everyone wants the light to just work. Almost nobody wants to think about what is behind the switch.",
    body: "I learned under an older electrician for two years before I touched a client's wiring alone. The part nobody warns you about is how much of the job is about safety discipline, not just knowing where the wires go.",
    verification: "fictional",
  },
];
