import type { Career } from "@/lib/types";

export const SECTORS = [
  "Healthcare",
  "Technology",
  "Engineering",
  "Business",
  "Education",
  "Creative",
  "Law",
  "Agriculture",
  "Vocational & Technical",
] as const;

export const CAREERS: Career[] = [
  {
    slug: "doctor",
    name: "Medical Doctor",
    sector: "Healthcare",
    tagline: "Diagnose and treat illness, and stay with patients through hard moments.",
    overview:
      "Doctors examine patients, order and read tests, diagnose conditions and plan treatment. In Nigeria they work in teaching hospitals, general hospitals, primary health centres and private clinics, and some serve rural communities through outreach programmes.",
    responsibilities: [
      "Consult with patients and take careful histories of their symptoms",
      "Examine patients and order laboratory tests or scans",
      "Diagnose illnesses and prescribe or carry out treatment",
      "Admit and monitor patients on wards, including emergencies",
      "Keep accurate patient records and work with nurses, pharmacists and specialists",
    ],
    interestsSkills: [
      "Biology and how the human body works",
      "Staying calm and thorough under pressure",
      "Careful observation and attention to detail",
      "Patience and clear communication with patients and families",
    ],
    tags: ["helping", "solving"],
    educationPathways: [
      "Strong SSCE results in Biology, Chemistry, Physics, English and Mathematics, then JAMB UTME into Medicine and Surgery (MBBS) at a university with a teaching hospital. Entry is very competitive; confirm current cut-off and subject requirements with JAMB and each university.",
      "Some students first complete a related science degree, then apply for graduate entry where offered. Check directly with the universities you have in mind.",
      "After the degree there is a housemanship year and full registration with the Medical and Dental Council of Nigeria. Requirements can change, so verify with the council.",
    ],
    subjects: ["Biology", "Chemistry", "Physics", "English", "Mathematics"],
    specialisations: [
      "Paediatrics (children's health)",
      "Obstetrics and gynaecology",
      "Surgery",
      "Public health and community medicine",
      "Radiology",
    ],
    tryThis:
      "Interview a doctor or nurse you know about one typical week of their work. Note three things that surprised you, and visit a nearby primary health centre (with permission) to see how many different roles keep it running.",
    verifyNote:
      "Admission requirements, cut-off marks and licensing steps change often. Always confirm with JAMB, the universities and the Medical and Dental Council of Nigeria.",
  },
  {
    slug: "nurse",
    name: "Nurse",
    sector: "Healthcare",
    tagline: "Hands-on daily care that keeps patients safe and healing.",
    overview:
      "Nurses give direct patient care: checking vital signs, giving medication, dressing wounds, assisting in procedures and teaching patients how to manage their health. Nigerian nurses work in hospitals, clinics, schools, community health programmes and abroad.",
    responsibilities: [
      "Monitor and record patients' vital signs and progress",
      "Give prescribed medication and injections safely",
      "Dress wounds, manage drips and assist doctors during procedures",
      "Teach patients and their families how to continue care at home",
      "Keep the ward organised and respond quickly to emergencies",
    ],
    interestsSkills: [
      "Genuine care for people in difficult situations",
      "Steady hands and careful procedure",
      "Good memory for detail, doses and timings",
      "Teamwork and clear communication",
    ],
    tags: ["helping", "hands"],
    educationPathways: [
      "Five SSCE credits including Biology, Chemistry, English and Mathematics, then a five-year Bachelor of Nursing Science at a university, or entry through an approved School of Nursing. Confirm current entry routes with JAMB and the Nursing and Midwifery Council of Nigeria.",
      "After training, nurses register with the Nursing and Midwifery Council of Nigeria before practising. Licensing steps can change, so verify them.",
    ],
    subjects: ["Biology", "Chemistry", "English", "Mathematics"],
    specialisations: [
      "Midwifery",
      "Accident and emergency nursing",
      "Paediatric nursing",
      "Community and public health nursing",
      "Theatre (operating room) nursing",
    ],
    tryThis:
      "Ask to shadow or interview a nurse at a clinic or hospital near you for even one hour. Write down every different thing you see them do, and count how many people they help in that hour.",
    verifyNote:
      "Entry requirements and licensing steps vary by institution and change over time. Confirm with JAMB, the universities and the Nursing and Midwifery Council of Nigeria.",
  },
  {
    slug: "pharmacist",
    name: "Pharmacist",
    sector: "Healthcare",
    tagline: "The expert between medicine and the people who need it.",
    overview:
      "Pharmacists prepare and dispense medicines, check doses for safety, advise patients on how to use drugs correctly and work with doctors to get treatment right. In Nigeria they work in hospitals, community pharmacies, the pharmaceutical industry and regulatory agencies.",
    responsibilities: [
      "Dispense prescriptions and check them for correct dosage and interactions",
      "Advise patients on how and when to take medicines",
      "Compound and prepare certain medicines",
      "Manage pharmacy stock, storage conditions and expiry dates",
      "Educate the public on drug safety and misuse",
    ],
    interestsSkills: [
      "Chemistry and how substances act in the body",
      "Precision with numbers, doses and labels",
      "Patience in explaining instructions clearly",
      "Integrity with controlled and sensitive products",
    ],
    tags: ["helping", "numbers"],
    educationPathways: [
      "Five SSCE credits including Chemistry, Biology, Physics, English and Mathematics, then the PharmD or B.Pharm degree at a university. Confirm current requirements with JAMB and the Pharmacists Council of Nigeria.",
      "After the degree, registration with the Pharmacists Council of Nigeria is required before practising. Verify the current steps with the council.",
    ],
    subjects: ["Chemistry", "Biology", "Physics", "Mathematics", "English"],
    specialisations: [
      "Hospital pharmacy",
      "Industrial and production pharmacy",
      "Regulatory affairs",
      "Community pharmacy ownership",
      "Pharmacology research",
    ],
    tryThis:
      "Visit a community pharmacy (politely, at a quiet time) and ask the pharmacist what they check before handing over any medicine. Write down the checklist they describe.",
    verifyNote:
      "Degree structures and registration requirements change. Confirm details with JAMB, the universities and the Pharmacists Council of Nigeria.",
  },
  {
    slug: "software-developer",
    name: "Software Developer",
    sector: "Technology",
    tagline: "Build the apps and systems people use every day.",
    overview:
      "Software developers design, write and test the code behind apps, websites and systems. Nigerian developers build fintech products, school platforms, logistics tools and more, working for companies, startups, agencies or as freelancers serving clients anywhere in the world.",
    responsibilities: [
      "Turn problems and designs into working software",
      "Write, test and debug code in one or more programming languages",
      "Work with designers, product managers and other developers",
      "Fix bugs and improve how fast and reliable systems are",
      "Keep learning new tools, because the field moves quickly",
    ],
    interestsSkills: [
      "Enjoying puzzles and step-by-step logic",
      "Curiosity about how apps and websites work",
      "Patience to debug when things refuse to work",
      "Clear writing, because so much teamwork happens in text",
    ],
    tags: ["tech", "solving", "creative"],
    educationPathways: [
      "A Computer Science, Software Engineering or related degree is one route, but many Nigerian developers also learn through free online courses, bootcamps and open-source projects. A strong portfolio of real projects often matters as much as a certificate.",
      "SSCE subjects including Mathematics, English and Computer Studies or ICT are a good base. Any specific employer or university requirements should be verified directly.",
    ],
    subjects: ["Mathematics", "Computer Studies / ICT", "English", "Physics"],
    specialisations: [
      "Web and mobile app development",
      "Backend systems and APIs",
      "Data engineering",
      "Cybersecurity",
      "Game development",
    ],
    tryThis:
      "Complete a free beginner tutorial (for example building a small webpage or a simple calculator app) and get one friend to use it. Note every piece of feedback they give you.",
    verifyNote:
      "There is no single licensing path in this field. Course offerings and hiring expectations change, so verify with the specific programmes or employers you are considering.",
  },
  {
    slug: "data-analyst",
    name: "Data Analyst",
    sector: "Technology",
    tagline: "Find the story hiding inside numbers.",
    overview:
      "Data analysts collect, clean and examine data to answer real questions: which products sell, where customers drop off, how a hospital's patients flow. Nigerian analysts work in banks, telcos, startups, hospitals and government agencies.",
    responsibilities: [
      "Collect data from records, surveys and systems",
      "Clean and organise messy data so it can be trusted",
      "Analyse data with spreadsheets and tools like SQL or Python",
      "Build charts and reports that non-technical people understand",
      "Point out patterns, risks and opportunities in the findings",
    ],
    interestsSkills: [
      "Comfort with numbers and patterns",
      "Curiosity, asking why the numbers look the way they do",
      "Care and honesty with data",
      "Clear storytelling so findings actually get used",
    ],
    tags: ["numbers", "tech", "solving"],
    educationPathways: [
      "Degrees in Statistics, Mathematics, Economics, Computer Science and related fields are common routes. Many analysts also build skills through online courses and practice datasets.",
      "SSCE Mathematics is essential. Specific course and job requirements vary, so verify with the institutions and employers you are interested in.",
    ],
    subjects: ["Mathematics", "Further Mathematics", "Economics", "Computer Studies / ICT"],
    specialisations: [
      "Business intelligence",
      "Health data analysis",
      "Financial analysis",
      "Monitoring and evaluation for development projects",
      "Data science and machine learning (after more study)",
    ],
    tryThis:
      "Record a week of real data from your own life (pocket money spent, water sachets used, pages read) in a table. Draw one chart and write three sentences about what it shows.",
    verifyNote:
      "Entry routes are flexible in this field. Verify any course requirements with the specific institutions you are considering.",
  },
  {
    slug: "civil-engineer",
    name: "Civil Engineer",
    sector: "Engineering",
    tagline: "Design and build the roads, bridges and buildings around you.",
    overview:
      "Civil engineers plan, design and supervise construction of roads, bridges, drains, dams and buildings. In Nigeria they work with construction firms, consultancies, government ministries and their own practices, often on projects you can physically point at.",
    responsibilities: [
      "Survey sites and study soil, drainage and load requirements",
      "Prepare designs and drawings that meet safety standards",
      "Estimate quantities and costs of materials",
      "Supervise construction and check quality on site",
      "Ensure projects follow approved plans and regulations",
    ],
    interestsSkills: [
      "Mathematics and physics applied to real structures",
      "Enjoying seeing physical results of your work",
      "Care with safety and standards",
      "Leadership and coordination of people on site",
    ],
    tags: ["hands", "solving", "numbers"],
    educationPathways: [
      "Five SSCE credits including Mathematics, Physics, Chemistry and English, then JAMB UTME into Civil Engineering (typically a five-year degree). Confirm current subject combinations and cut-offs with JAMB and each university.",
      "After graduation, practical training and professional registration with the Council for the Regulation of Engineering in Nigeria (COREN) apply. Verify current requirements with COREN.",
    ],
    subjects: ["Mathematics", "Physics", "Chemistry", "Technical Drawing", "English"],
    specialisations: [
      "Structural engineering",
      "Highway and transportation engineering",
      "Water resources and environmental engineering",
      "Geotechnical engineering",
      "Construction project management",
    ],
    tryThis:
      "Walk or drive around your area and pick one structure (a bridge, drain or building). Sketch it and write down three questions you would need answered before building it.",
    verifyNote:
      "Admission requirements and professional registration rules change. Confirm with JAMB, the universities and COREN.",
  },
  {
    slug: "electrical-engineer",
    name: "Electrical / Electronics Engineer",
    sector: "Engineering",
    tagline: "Work with power, machines and the electronics inside everything.",
    overview:
      "Electrical engineers design and maintain power systems, machines and electronic devices. In Nigeria this field covers the national grid, distribution companies, manufacturing plants, telecoms and the growing solar and renewable energy sector.",
    responsibilities: [
      "Design, install and maintain electrical systems and circuits",
      "Test equipment and diagnose faults",
      "Prepare wiring diagrams and technical documentation",
      "Supervise installation teams and enforce safety procedures",
      "Improve energy efficiency, including solar and backup power systems",
    ],
    interestsSkills: [
      "Physics and mathematics, especially electricity",
      "Hands-on experiments and tinkering",
      "Safety-first thinking",
      "Patience for careful measurement and testing",
    ],
    tags: ["tech", "hands", "solving"],
    educationPathways: [
      "Five SSCE credits including Mathematics, Physics, Chemistry and English, then JAMB UTME into Electrical and Electronics Engineering. Confirm current requirements with JAMB and each university.",
      "Professional registration with COREN applies after graduation and supervised experience. Verify the current steps with COREN.",
    ],
    subjects: ["Mathematics", "Physics", "Chemistry", "Further Mathematics", "Technical Drawing"],
    specialisations: [
      "Power systems and renewable energy",
      "Electronics and embedded systems",
      "Telecommunications",
      "Control and automation",
      "Instrumentation",
    ],
    tryThis:
      "Research what electrical/electronics engineers do, identify three common tools or instruments they use, and learn how electrical safety is maintained in the systems they design or maintain.",
    verifyNote:
      "Admission requirements and registration rules change. Confirm with JAMB, the universities and COREN.",
  },
  {
    slug: "architect",
    name: "Architect",
    sector: "Engineering",
    tagline: "Design buildings that are useful, safe and beautiful.",
    overview:
      "Architects design homes, schools, offices and public spaces, balancing beauty, function, cost and safety. Nigerian architects also wrestle with our climate, designing for heat, rain and local materials, and the field includes landscape and urban design.",
    responsibilities: [
      "Meet clients and translate their needs into a design brief",
      "Sketch and develop concepts, then produce detailed drawings and models",
      "Coordinate with engineers on structure and services",
      "Prepare cost estimates and submit drawings for approval",
      "Visit sites to check that construction follows the design",
    ],
    interestsSkills: [
      "Drawing and visual imagination",
      "Spatial sense, thinking in three dimensions",
      "Care with detail and building rules",
      "Balancing creative ideas with practical limits",
    ],
    tags: ["creative", "hands", "solving"],
    educationPathways: [
      "Five SSCE credits including Mathematics, Physics and English, then JAMB UTME into Architecture (typically a five-year degree, sometimes followed by a master's). Confirm current requirements with JAMB and each university.",
      "Registration with the Architects Registration Council of Nigeria (ARCON) applies before independent practice. Verify current requirements with ARCON.",
    ],
    subjects: ["Mathematics", "Physics", "Technical Drawing", "Fine Art", "English"],
    specialisations: [
      "Residential and commercial architecture",
      "Landscape architecture",
      "Urban and regional planning",
      "Sustainable and climate-responsive design",
      "Interior architecture",
    ],
    tryThis:
      "Measure one small room at home and draw its floor plan to scale on graph paper, including doors and windows. Then redesign it on paper for better use of space.",
    verifyNote:
      "Admission requirements and registration rules change. Confirm with JAMB, the universities and ARCON.",
  },
  {
    slug: "accountant",
    name: "Accountant",
    sector: "Business",
    tagline: "Keep the money story of an organisation honest and clear.",
    overview:
      "Accountants record, check and report how money moves through a business or institution, prepare financial statements, manage tax compliance and help leaders make sound decisions. In Nigeria they work in firms, banks, companies, NGOs and practice on their own.",
    responsibilities: [
      "Record transactions and reconcile accounts",
      "Prepare financial statements and management reports",
      "Manage budgets and monitor spending",
      "Handle tax computations and filings within the law",
      "Spot errors, waste and irregularities, and advise on controls",
    ],
    interestsSkills: [
      "Comfort and care with numbers",
      "Orderliness and accuracy",
      "Integrity and independence",
      "Understanding how businesses work",
    ],
    tags: ["numbers", "organising"],
    educationPathways: [
      "Five SSCE credits including Mathematics, English and Economics, then a degree in Accounting or related fields. Confirm current requirements with JAMB and each university.",
      "Many Nigerian accountants also qualify professionally through ICAN (Institute of Chartered Accountants of Nigeria) or ANAN. Verify current entry routes and exam structures with the institute.",
    ],
    subjects: ["Mathematics", "Economics", "Financial Accounting", "Commerce", "English"],
    specialisations: [
      "Audit and assurance",
      "Taxation",
      "Management accounting",
      "Forensic accounting",
      "Financial reporting for NGOs and public sector",
    ],
    tryThis:
      "Keep a complete income and expense record of one month of your pocket money, down to the last ₦50. At the end, write which category surprised you and one change you would make.",
    verifyNote:
      "Degree and professional qualification requirements change. Confirm with JAMB, the universities and ICAN.",
  },
  {
    slug: "entrepreneur",
    name: "Entrepreneur",
    sector: "Business",
    tagline: "Spot a problem people will pay to solve, and build the solution.",
    overview:
      "Entrepreneurs start and run businesses: identifying what people need, arranging products or services, managing money and growing. Nigerian entrepreneurship spans food processing, retail, fashion, logistics, tech startups and services, often beginning small and learning fast.",
    responsibilities: [
      "Identify customer problems and test ideas quickly",
      "Plan products, pricing and supply",
      "Manage cash flow, records and basic accounts",
      "Market and sell, building trust with customers",
      "Hire, organise and lead a team as the business grows",
    ],
    interestsSkills: [
      "Noticing gaps and opportunities around you",
      "Comfort with responsibility and uncertainty",
      "Energy for selling and persuading",
      "Discipline with records, planning and follow-through",
    ],
    tags: ["organising", "creative", "numbers"],
    educationPathways: [
      "There is no fixed degree for entrepreneurship. Business, Economics, Marketing and related courses help, but many successful founders learned by starting small, taking free business courses and joining local business communities or incubators.",
      "Registration with the Corporate Affairs Commission (CAC) is needed for formal businesses. Verify current steps with CAC or a business centre.",
    ],
    subjects: [
      "Economics",
      "Commerce",
      "Mathematics",
      "Financial Accounting",
      "Marketing (where offered)",
    ],
    specialisations: [
      "Retail and distribution",
      "Food processing and agribusiness",
      "Fashion and creative enterprises",
      "Technology startups",
      "Service businesses (catering, logistics, cleaning and more)",
    ],
    tryThis:
      "Run a one-week micro-experiment: identify one small need around you (snacks, errands, tutoring), plan it on paper, then try it on a tiny scale. Write down what worked and what you would change.",
    verifyNote:
      "Business registration rules and support programmes change. Confirm current steps with the Corporate Affairs Commission and any programme you join.",
  },
  {
    slug: "teacher",
    name: "Teacher",
    sector: "Education",
    tagline: "Help understanding happen, one student at a time.",
    overview:
      "Teachers plan lessons, explain ideas, guide practice and mentor students. Nigerian teachers work in public and private primary and secondary schools, and the skills extend to training centres, edtech companies and educational content creation.",
    responsibilities: [
      "Plan lessons that meet the curriculum and students' needs",
      "Explain concepts in more than one way until they land",
      "Set, mark and give feedback on assignments and exams",
      "Manage the classroom with fairness and patience",
      "Mentor students and communicate with parents",
    ],
    interestsSkills: [
      "Deep knowledge of the subject you teach",
      "Patience and genuine care for young people",
      "Creativity in explaining difficult ideas simply",
      "Organisation and steady consistency",
    ],
    tags: ["speaking", "helping"],
    educationPathways: [
      "A degree in Education (or a subject degree plus a Postgraduate Diploma in Education) is the standard route. Colleges of Education award the NCE for primary teaching. Confirm current requirements with JAMB and the institutions.",
      "Registration with the Teachers Registration Council of Nigeria (TRCN) is required to teach formally. Verify the current steps with TRCN.",
    ],
    subjects: ["Your chosen teaching subject", "English", "Mathematics (for many subjects)"],
    specialisations: [
      "Primary education",
      "Science and mathematics education",
      "Special education needs",
      "Educational technology and content creation",
      "School leadership and administration",
    ],
    tryThis:
      "Teach one topic you know well to two younger students or cousins. Prepare a 10-minute explanation with an example, then ask them to explain it back to you and note what you had to correct.",
    verifyNote:
      "Qualification and registration requirements change. Confirm with JAMB, the institutions and TRCN.",
  },
  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    sector: "Creative",
    tagline: "Make information clear and beautiful, from logos to posters.",
    overview:
      "Graphic designers create visual work: brand identities, posters, packaging, social media content, book covers and interfaces. Nigerian designers serve brands, agencies, publishers and international clients remotely, and visual storytelling is in demand everywhere.",
    responsibilities: [
      "Discuss a client's goals and turn them into visual concepts",
      "Design logos, flyers, packaging and digital content",
      "Choose type, colour and layout with intent",
      "Prepare files correctly for print and for screens",
      "Revise work based on feedback, on deadline",
    ],
    interestsSkills: [
      "An eye for colour, composition and typography",
      "Learning tools like Illustrator, Photoshop or Figma",
      "Listening well and turning vague briefs into clear designs",
      "Meeting deadlines and handling revisions calmly",
    ],
    tags: ["creative", "tech"],
    educationPathways: [
      "Some designers study Fine and Applied Arts or related degrees; many build the skill through online courses, YouTube tutorials and constant practice. A portfolio of real work is the industry's real currency.",
      "There is no licensing exam. Verify any specific course requirements with the institutions you are considering.",
    ],
    subjects: ["Fine Art", "Computer Studies / ICT", "English", "Mathematics (basic)"],
    specialisations: [
      "Brand identity design",
      "UI/UX design for apps and websites",
      "Motion graphics and animation",
      "Illustration",
      "Print and packaging design",
    ],
    tryThis:
      "Redesign the poster of one event at your school (or a fake one for an imaginary event). Make three versions with different layouts and ask five people which communicates fastest and why.",
    verifyNote:
      "Entry routes are flexible and portfolio-driven. Verify any formal course requirements directly with the institutions.",
  },
  {
    slug: "journalist",
    name: "Journalist",
    sector: "Creative",
    tagline: "Find out what happened, check it, and tell people clearly.",
    overview:
      "Journalists investigate events, interview people and publish accurate stories in newspapers, radio, television and digital media. Nigerian journalism includes community reporting, investigative work, sports, business and data storytelling.",
    responsibilities: [
      "Follow leads, attend events and interview people",
      "Verify facts with more than one source",
      "Write or record stories that are clear, fair and on deadline",
      "Edit work to length and house style",
      "Uphold ethics: accuracy, fairness and protecting sources",
    ],
    interestsSkills: [
      "Strong curiosity about people and events",
      "Clear, honest writing and speaking",
      "Courage and fairness, especially on sensitive stories",
      "Fast, organised work under deadline pressure",
    ],
    tags: ["speaking", "creative"],
    educationPathways: [
      "Degrees in Mass Communication, Journalism or English are common routes. Confirm current requirements with JAMB and each university.",
      "Media houses also hire strong writers from other fields. Verify any specific requirements with the organisations you are interested in.",
    ],
    subjects: [
      "English",
      "Literature-in-English",
      "Government",
      "Economics",
      "CRS/IRS or Civic Education",
    ],
    specialisations: [
      "Investigative reporting",
      "Broadcast (radio and television)",
      "Sports journalism",
      "Business and data journalism",
      "Photojournalism and documentary work",
    ],
    tryThis:
      "Report a small local event this week: interview three people about it, note what they each said, then write a 200-word news piece with a headline. Check every fact you wrote.",
    verifyNote:
      "Course requirements vary by institution. Confirm with JAMB and the universities you are considering.",
  },
  {
    slug: "fashion-designer",
    name: "Fashion Designer",
    sector: "Creative",
    tagline: "Turn fabric and ideas into clothing people love to wear.",
    overview:
      "Fashion designers sketch styles, select fabrics, cut and sew garments or oversee production. In Nigeria the industry includes bespoke tailoring, ready-to-wear labels, Aso-ebi culture, textile design and export potential for African prints.",
    responsibilities: [
      "Sketch designs and plan collections",
      "Source fabrics, trims and materials",
      "Pattern-draft, cut and sew, or supervise tailors",
      "Fit garments on clients and adjust for body types",
      "Price, market and sell, including on social media",
    ],
    interestsSkills: [
      "Drawing and a sense of colour and fabric",
      "Practical sewing and construction skill",
      "Measuring carefully and finishing neatly",
      "Understanding customers and trends",
    ],
    tags: ["creative", "hands"],
    educationPathways: [
      "Routes include Fashion Design or Home Economics related degrees, technical schools and, very commonly, apprenticeship under an established tailor or designer. Verify any formal course requirements with the institutions.",
      "There is no licensing exam; skill and a body of work speak loudest. Business registration applies when you formalise. Check with CAC when ready.",
    ],
    subjects: [
      "Fine Art",
      "Home Economics (where offered)",
      "Mathematics (for measurements and costing)",
      "Commerce",
    ],
    specialisations: [
      "Bespoke tailoring and bridal wear",
      "Ready-to-wear label ownership",
      "Textile and print design",
      "Fashion illustration",
      "Costume design for film and theatre",
    ],
    tryThis:
      "Hand-sketch five outfit ideas for one friend, based on what they actually wear and like. Get feedback from them, then draft the pattern for the simplest one on old fabric.",
    verifyNote:
      "Entry routes vary widely. Verify any formal course requirements directly with the institutions.",
  },
  {
    slug: "lawyer",
    name: "Lawyer",
    sector: "Law",
    tagline: "Argue fairly, defend rights and make sense of the rules we live by.",
    overview:
      "Lawyers advise clients, draft documents and argue cases in and out of court. Nigerian lawyers practice in litigation, corporate offices, banks, NGOs and government, and the profession touches nearly every part of national life.",
    responsibilities: [
      "Advise clients on their rights and obligations",
      "Research laws, precedents and regulations",
      "Draft contracts, letters and court documents",
      "Represent clients in negotiations and in court",
      "Uphold professional ethics and confidentiality",
    ],
    interestsSkills: [
      "Reading widely and carefully",
      "Clear, persuasive writing and speaking",
      "Logical argument and spotting weak points",
      "Integrity and discretion",
    ],
    tags: ["speaking", "solving"],
    educationPathways: [
      "Five SSCE credits including English and Literature-in-English, then a five-year LLB law degree, followed by attendance at the Nigerian Law School and call to Bar. Confirm current requirements with JAMB, the universities and the Council of Legal Education.",
      "Admission to the Law School is competitive and requirements can change. Verify with the Council of Legal Education and the Nigerian Law School.",
    ],
    subjects: [
      "English",
      "Literature-in-English",
      "Government",
      "Economics",
      "History (where offered)",
    ],
    specialisations: [
      "Litigation and court practice",
      "Corporate and commercial law",
      "Human rights and public interest law",
      "Intellectual property law",
      "Oil and gas law",
    ],
    tryThis:
      "Find a simple court news story from a Nigerian newspaper. Write down the two sides of the argument in your own words, then the strongest point you think each side could make.",
    verifyNote:
      "Admission and Bar requirements change. Confirm with JAMB, the universities, the Council of Legal Education and the Nigerian Law School.",
  },
  {
    slug: "agronomist",
    name: "Agronomist (Agribusiness)",
    sector: "Agriculture",
    tagline: "Grow more food, better, and turn farming into real business.",
    overview:
      "Agronomists apply science to crop production: soil health, seeds, pests, irrigation and yield. In Nigeria, agriculture is a major employer and agribusiness adds value through processing, storage, logistics and markets, feeding the country and creating export products.",
    responsibilities: [
      "Study soils and recommend crops, fertiliser and irrigation",
      "Diagnose and manage pests and plant diseases",
      "Run field trials and measure yields",
      "Advise farmers and agribusinesses on best practice",
      "Plan production, storage and sales as a business",
    ],
    interestsSkills: [
      "Interest in plants, soil and the outdoors",
      "Scientific observation and record-keeping",
      "Patience with seasons and experiments",
      "Business sense for markets and costs",
    ],
    tags: ["nature", "numbers", "organising"],
    educationPathways: [
      "Five SSCE credits including Biology/Agricultural Science, Chemistry, Mathematics and English, then a degree in Agronomy, Crop Science, Soil Science or Agricultural Economics. Confirm current requirements with JAMB and each university.",
      "Agribusiness itself needs no fixed degree; many succeed through training programmes and starting small. Verify support programmes before joining them.",
    ],
    subjects: ["Agricultural Science", "Biology", "Chemistry", "Mathematics", "Economics"],
    specialisations: [
      "Crop production and horticulture",
      "Soil science",
      "Crop protection (pests and diseases)",
      "Agricultural economics and extension services",
      "Food processing and value addition",
    ],
    tryThis:
      "Plant one crop (maize, beans or tomato) in a container at home. Keep a weekly record of height, leaves and water given for six weeks, and note what you would do differently next time.",
    verifyNote:
      "Admission requirements change. Confirm with JAMB and the universities you are considering.",
  },
  {
    slug: "veterinarian",
    name: "Veterinarian",
    sector: "Agriculture",
    tagline: "Care for the animals that feed and serve us.",
    overview:
      "Veterinarians diagnose and treat animals: livestock on farms, pets in cities, poultry in commercial operations. In Nigeria their work protects food supply, public health and livelihoods, from rural herdsmen to urban vet clinics.",
    responsibilities: [
      "Examine animals, diagnose illness and injuries",
      "Treat animals and perform procedures or surgery",
      "Vaccinate livestock and advise farmers on herd health",
      "Inspect meat and safeguard against animal disease outbreaks",
      "Educate owners on animal welfare and nutrition",
    ],
    interestsSkills: [
      "Care for animals, large and small",
      "Science, especially biology and chemistry",
      "Calmness around frightened or large animals",
      "Physical stamina for farm and field work",
    ],
    tags: ["helping", "nature"],
    educationPathways: [
      "Five SSCE credits including Biology, Chemistry, Physics, Mathematics and English, then JAMB UTME into Veterinary Medicine (typically a six-year degree). Confirm current requirements with JAMB and each university.",
      "Registration with the Veterinary Council of Nigeria applies before practising. Verify the current steps with the council.",
    ],
    subjects: ["Biology", "Chemistry", "Physics", "Agricultural Science", "Mathematics"],
    specialisations: [
      "Companion animal (pet) practice",
      "Livestock and poultry production health",
      "Public health and meat inspection",
      "Wildlife and conservation medicine",
      "Veterinary pharmacy and research",
    ],
    tryThis:
      "Visit a livestock market or farm (with an adult and permission) and observe the animals for one hour. Write down five health signs a vet would probably check, then ask a vet or agricultural teacher to review your list.",
    verifyNote:
      "Admission and registration requirements change. Confirm with JAMB, the universities and the Veterinary Council of Nigeria.",
  },
  {
    slug: "electrician",
    name: "Electrician",
    sector: "Vocational & Technical",
    tagline: "Wire buildings safely and keep the power running.",
    overview:
      "Electricians install, inspect and repair the wiring, sockets, switches and electrical systems in homes, offices and sites. In Nigeria this is a hands-on trade you can enter without a university degree, through a technical college, a trade test, or apprenticeship under an established electrician.",
    responsibilities: [
      "Install and wire circuits, sockets, switches and distribution boards",
      "Read basic wiring diagrams and follow safety codes",
      "Test circuits and diagnose faults",
      "Maintain and repair existing electrical installations",
      "Work safely around live power, using proper tools and protection",
    ],
    interestsSkills: [
      "Comfort working with your hands and tools",
      "Careful, safety-first thinking around electricity",
      "Patience to trace and fix faults methodically",
      "Basic maths for measurements and circuit loads",
    ],
    tags: ["hands", "solving"],
    educationPathways: [
      "Technical colleges (under state Ministries of Education) offer a National Technical Certificate in electrical installation, examined by NABTEB (National Business and Technical Examinations Board). This does not require a university-track SSCE result; confirm current entry requirements with a technical college near you and with NABTEB.",
      "Apprenticeship under a licensed/established electrician is a long-standing alternative route in Nigeria, alongside structured skills schemes run by the Industrial Training Fund (ITF) through its National Apprenticeship and Traineeship System (NATS).",
      "A Trade Test Certificate (grades I-III) assesses and certifies practical competence; a secondary source names the Federal Ministry of Labour and Productivity as administering these — verify this directly with the Ministry, as this needs independent confirmation.",
    ],
    subjects: [
      "Basic Technology / Technical Drawing",
      "Mathematics",
      "Physics (where offered)",
      "English",
    ],
    specialisations: [
      "Domestic and building wiring",
      "Industrial and panel wiring",
      "Solar and backup power installation",
      "Maintenance electrician for a factory or estate",
    ],
    tryThis:
      "Research what electricians do, identify three common tools they use, and learn how electrical safety is maintained in homes and workplaces.",
    verifyNote:
      "This is a non-degree, trade-certified path. Confirm current entry routes and fees with a technical college, NABTEB, and your state's ITF office — do not treat the Trade Test administration detail above as final until you verify it yourself.",
  },
  {
    slug: "automotive-technician",
    name: "Automotive Technician",
    sector: "Vocational & Technical",
    tagline: "Diagnose and fix what makes vehicles run.",
    overview:
      "Automotive technicians service, diagnose and repair cars, motorcycles and commercial vehicles: engines, brakes, electrical systems and increasingly computer-controlled parts. Nigeria's large vehicle-repair and transport sector means steady local demand, from roadside workshops to dealership service centres.",
    responsibilities: [
      "Diagnose mechanical and electrical faults in vehicles",
      "Service engines, brakes, suspension and other systems",
      "Use diagnostic tools to read modern vehicles' computer systems",
      "Order and fit replacement parts correctly",
      "Keep clear records of work done for each vehicle",
    ],
    interestsSkills: [
      "Curiosity about how machines and engines work",
      "Hands-on problem solving",
      "Patience to isolate a fault by testing, not guessing",
      "Physical stamina for workshop conditions",
    ],
    tags: ["hands", "solving"],
    educationPathways: [
      "Technical colleges offer a National Technical Certificate in Motor Vehicle Mechanic Work, examined by NABTEB. This is a non-degree route; confirm current entry requirements with a technical college and NABTEB.",
      "Apprenticeship under an experienced mechanic is a very common and respected route into this trade in Nigeria, often alongside or instead of formal college study.",
      "Polytechnics also offer an ND/HND in Motor Vehicle / Automobile Engineering Technology, accredited by the National Board for Technical Education (NBTE), for technicians who want to progress further academically.",
    ],
    subjects: [
      "Basic Technology / Technical Drawing",
      "Mathematics",
      "Physics (where offered)",
      "English",
    ],
    specialisations: [
      "Engine and mechanical repair",
      "Auto electrical and diagnostics",
      "Panel beating and auto body work",
      "Heavy-duty and commercial vehicle maintenance",
    ],
    tryThis:
      "Visit a trusted mechanic's workshop (with an adult) and ask them to show you one real fault they are currently diagnosing, step by step. Write down the order they checked things in and why.",
    verifyNote:
      "This is a non-degree, trade-certified path with a strong apprenticeship tradition. Confirm current entry routes with a technical college, NABTEB, and any polytechnic ND/HND programme you consider.",
  },
  {
    slug: "ict-support-technician",
    name: "ICT Support Technician",
    sector: "Vocational & Technical",
    tagline: "Keep computers, networks and devices working for everyone who relies on them.",
    overview:
      "ICT support technicians install, maintain and troubleshoot computers, networks and everyday office or school technology. Demand spans schools, banks, hospitals, government offices and small businesses across Nigeria, and this field has multiple entry routes beyond a full computer science degree.",
    responsibilities: [
      "Set up and maintain computers, printers and office networks",
      "Diagnose and fix hardware and software problems",
      "Support users who are stuck or frustrated with their devices",
      "Keep basic security practices (updates, backups, anti-malware) in place",
      "Document recurring problems and fixes",
    ],
    interestsSkills: [
      "Patience helping people who are not comfortable with technology",
      "Step-by-step troubleshooting rather than guesswork",
      "Comfort opening up and understanding hardware, not just using it",
      "Clear, calm explanation of technical problems to non-technical people",
    ],
    tags: ["tech", "helping", "solving"],
    educationPathways: [
      "Technical colleges and polytechnics offer Computer/ICT-related technical certificate and ND/HND programmes accredited by NBTE. Confirm current programme names and entry requirements with the institution.",
      "Government-backed digital skills initiatives exist, including NITDA's partnership programmes and the 3 Million Technical Talent (3MTT) programme; these change over time, so confirm current intake windows directly with NITDA or the 3MTT programme before relying on them.",
      "Internationally recognised vendor certifications (for example CompTIA A+ or Cisco's entry-level networking certificates) are a widely used route in this field; verify current exam content and cost directly with the certifying body, as these are not Nigeria-specific and can change.",
    ],
    subjects: [
      "Computer Studies / ICT",
      "Mathematics",
      "English",
      "Basic Technology (where offered)",
    ],
    specialisations: [
      "Hardware repair and maintenance",
      "Network administration",
      "Help desk and end-user support",
      "Basic cybersecurity support",
    ],
    tryThis:
      "Offer to troubleshoot one real tech problem for a family member or neighbour (a slow computer, a printer that won't connect, a phone running out of storage). Write down every step you tried, in order, even the ones that didn't work.",
    verifyNote:
      "Entry routes in this field are varied and change quickly, especially government-backed training schemes. Confirm current programmes directly with NBTE-accredited institutions, NITDA, or the specific certification body.",
  },
  {
    slug: "caterer",
    name: "Caterer / Culinary Professional",
    sector: "Vocational & Technical",
    tagline: "Turn ingredients, timing and presentation into food people remember.",
    overview:
      "Caterers and culinary professionals plan, prepare and present food for events, restaurants or their own food businesses. Nigeria's events and food-service culture (weddings, parties, corporate events, restaurants) makes this a real, demand-driven trade with both employed and self-employed paths.",
    responsibilities: [
      "Plan menus and portion/cost them correctly",
      "Prepare and cook food safely and on schedule",
      "Manage hygiene, storage and food safety standards",
      "Coordinate delivery, presentation and service for events",
      "Manage suppliers, stock and pricing if running your own business",
    ],
    interestsSkills: [
      "Enjoying cooking and experimenting with flavour",
      "Working calmly under time pressure",
      "Attention to cleanliness and food safety",
      "Basic numeracy for costing and portioning",
    ],
    tags: ["hands", "creative", "organising"],
    educationPathways: [
      "Technical colleges offer catering-related National Technical Certificates examined by NABTEB; confirm current entry requirements with a technical college near you.",
      "Polytechnics offer ND/HND in Hospitality Management Technology (the current NBTE national curriculum for this was published in November 2022), which includes culinary and catering modules alongside broader hospitality management.",
      "Apprenticeship under an established caterer, and private catering/culinary schools, are both common non-degree routes; verify the reputation and current curriculum of any private school directly before enrolling.",
    ],
    subjects: [
      "Food and Nutrition / Home Economics",
      "Mathematics",
      "English",
      "Biology/Agricultural Science (where offered)",
    ],
    specialisations: [
      "Event catering",
      "Restaurant and kitchen management",
      "Pastry and baking",
      "Food business ownership and private chef work",
    ],
    tryThis:
      "Plan and cook one full dish for your family within a set budget you track to the last ₦50. Time how long each step actually takes versus how long you expected, and write down what you would change next time.",
    verifyNote:
      "This field has multiple non-degree routes. Confirm current entry requirements with a technical college, an NBTE-accredited polytechnic programme, or any private catering school directly.",
  },
  {
    slug: "renewable-energy-technician",
    name: "Renewable Energy Technician",
    sector: "Vocational & Technical",
    tagline:
      "Install and maintain the solar and clean-energy systems powering more of Nigeria every year.",
    overview:
      "Renewable energy technicians install, wire and maintain solar panels, inverters, batteries and related systems, for homes, businesses and off-grid communities. This is a growing field in Nigeria given unreliable grid power and increasing solar adoption, and it is newer and less standardised than older trades, so entry routes are still forming.",
    responsibilities: [
      "Install solar panels, inverters, batteries and associated wiring",
      "Size a system correctly for a household or business's power needs",
      "Test, commission and maintain installed systems",
      "Diagnose faults in solar and backup power systems",
      "Follow electrical safety standards throughout",
    ],
    interestsSkills: [
      "Hands-on technical and electrical aptitude",
      "Interest in energy and sustainability",
      "Careful, methodical fault-finding",
      "Comfort with ongoing learning, since the technology keeps changing",
    ],
    tags: ["hands", "solving", "tech"],
    educationPathways: [
      "A small but growing number of polytechnic and partner-institute diploma programmes in solar/renewable energy technology exist, developed with NBTE; availability, entry requirements (including any JAMB/UTME component) and locations vary a lot and should be checked directly with the specific institution.",
      "Short, free or subsidised solar PV installer training programmes have been run through government and donor-backed projects in the past (for example programmes linked to COREN-certified training or the National Power Training Institute of Nigeria, NAPTIN); these come and go, so confirm current availability before assuming one exists.",
      "This trade often builds on, or is combined with, electrician training (technical college/NABTEB route) plus manufacturer-specific solar equipment training.",
    ],
    subjects: ["Basic Technology / Technical Drawing", "Physics", "Mathematics", "English"],
    specialisations: [
      "Residential solar installation",
      "Off-grid and mini-grid systems",
      "Industrial/commercial solar",
      "Maintenance and after-sales service",
    ],
    tryThis:
      "Find out how your own home or school is powered when the grid is out (generator, inverter, solar, or nothing) and sketch how you think that backup system connects to the building's wiring. Ask an adult or technician to check your sketch.",
    verifyNote:
      "This field is newer and less standardised in Nigeria than older trades — training availability changes quickly. Verify any specific programme, certification or institute directly before relying on it; do not assume the examples above are currently running.",
  },
  {
    slug: "agricultural-technician",
    name: "Agricultural Technician",
    sector: "Vocational & Technical",
    tagline: "Hands-on field work that keeps crops and livestock productive.",
    overview:
      "Agricultural technicians carry out the practical, day-to-day work behind farm and agribusiness operations: planting, irrigation, pest control, record-keeping and equipment care. This is a hands-on, field-based route into agriculture that does not require the longer agronomy degree path.",
    responsibilities: [
      "Carry out planting, irrigation and field maintenance tasks",
      "Monitor crops or livestock for pests, disease and growth",
      "Operate and maintain basic farm tools and equipment",
      "Keep field records (planting dates, yields, treatments used)",
      "Support an agronomist, farm manager or extension officer's plans",
    ],
    interestsSkills: [
      "Genuine interest in plants, animals and outdoor work",
      "Comfort with physical, hands-on tasks",
      "Reliable record-keeping and observation",
      "Patience with the slow pace of seasons and growth",
    ],
    tags: ["nature", "hands"],
    educationPathways: [
      "Technical colleges and agricultural training centres offer agriculture-related technical certificates; confirm current programmes with NABTEB and your state's agricultural training institutions.",
      "Polytechnics offer an ND/HND in Agricultural Technology, accredited by NBTE, as a route to progress further within this field.",
      "State Agricultural Development Programmes (ADPs) and extension services also provide practical, shorter-form training; verify current programmes directly with your state's ADP.",
    ],
    subjects: ["Agricultural Science", "Biology", "Mathematics", "English"],
    specialisations: [
      "Crop production support",
      "Livestock and poultry farm work",
      "Irrigation and farm equipment maintenance",
      "Farm records and extension support",
    ],
    tryThis:
      "Plant one crop (maize, beans or tomato) in a container at home. Keep a weekly record of height, leaves and water given for six weeks, and note what you would do differently next time.",
    verifyNote:
      "Programme names and availability vary by state and institution. Confirm current entry requirements with NABTEB, an NBTE-accredited polytechnic, or your state's ADP.",
  },
  {
    slug: "hospitality-professional",
    name: "Hospitality Professional",
    sector: "Vocational & Technical",
    tagline: "Make hotels, events and guest experiences run smoothly.",
    overview:
      "Hospitality professionals manage the guest-facing and operational side of hotels, event centres, restaurants and tourism services: front desk, housekeeping standards, event coordination and guest experience. Nigeria's hotel, events and tourism sector offers a real, demand-driven route that does not require a university degree to start.",
    responsibilities: [
      "Coordinate bookings, check-ins and guest requests",
      "Oversee housekeeping, dining or event-floor standards",
      "Plan and run the logistics of an event or function",
      "Handle guest complaints calmly and fairly",
      "Manage schedules, suppliers and front-line staff",
    ],
    interestsSkills: [
      "Genuine ease and patience with people",
      "Organisation under time pressure",
      "Attention to detail and presentation",
      "Calm problem-solving when something goes wrong on the day",
    ],
    tags: ["helping", "organising"],
    educationPathways: [
      "Polytechnics offer ND/HND in Hospitality Management Technology, accredited by NBTE (the current national curriculum for this programme was published in November 2022); typical O'Level entry includes English, Mathematics and Biology/Agricultural Science plus two relevant electives — confirm the current list with the specific polytechnic.",
      "Private hospitality and catering colleges also exist in Nigeria; verify accreditation and current curriculum directly with the institution before enrolling.",
      "Many roles in this field (front desk, event support) are also entered through on-the-job training at a hotel or events company, without a prior hospitality qualification.",
    ],
    subjects: [
      "English",
      "Mathematics",
      "Food and Nutrition / Home Economics (where offered)",
      "Economics",
    ],
    specialisations: [
      "Hotel front office and operations",
      "Event and wedding planning",
      "Food and beverage service management",
      "Tourism and guest relations",
    ],
    tryThis:
      "Plan the full run-of-show for one small event (a birthday, a school function) on paper: timing, who does what, and what could go wrong. Ask someone who has organised a real event to review your plan.",
    verifyNote:
      "Entry routes range from on-the-job training to a full ND/HND. Confirm current requirements with an NBTE-accredited polytechnic or any private institution you are considering.",
  },
];

export function getCareer(slug: string): Career | undefined {
  return CAREERS.find((c) => c.slug === slug);
}
