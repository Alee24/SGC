export interface Leader {
  name: string;
  role: string;
  title: string;
  image: string;
  bio?: string;
  category: 'trustee' | 'management' | 'administration';
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ClubItem {
  name: string;
  category: string;
  description: string;
  activities: string[];
}

export interface CapitalProject {
  title: string;
  priority: 'Urgent' | 'High' | 'Strategic';
  description: string;
  goal: string;
  impact: string;
}

export interface TenderItem {
  id: string;
  title: string;
  publishedDate: string;
  closingDate?: string;
  status: 'Open' | 'Closed' | 'Evaluation';
  description: string;
  category: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  posts: number;
  deadline: string;
  type: string;
  description: string;
  requirements: string[];
  submissionEmail: string;
}

export const SCHOOL_INFO = {
  name: "Starehe Girls' Centre",
  officialTitle: "Starehe Girls' Centre & High School",
  mottoSwahili: "Elimu Yetu, Nguvu Yetu",
  mottoEnglish: "Our Education, Our Strength",
  mission: "To provide care and education for girls in need and inspire them to transform into productive and exemplary members of society.",
  vision: "A Starehe fraternity serving, leading and transforming society.",
  doctrine: "The Starehe Way — Character, discipline, integrity towards all people, dedicated service to the nation with head, heart, and hand committed to justice, zeal, and care.",
  slogan: "At Starehe, we don't just educate girls — we ignite legacies.",
  establishedYear: 2005,
  trustRegisteredYear: 2003,
  campusSize: "55 Acres",
  totalStudents: 800,
  sponsoredRatio: "70% Sponsored (Economically Disadvantaged) / 30% Self-Supported",
  annualIntake: 200,
  teachingStaff: 48,
  nonTeachingStaff: 46,
  universityTransitionRate: "95% over 18 years",
  location: {
    estate: "Bustani Estate, Njathaini",
    road: "Off Kiambu Road, 5 km from bypass",
    distance: "18 km North of Nairobi CBD",
    constituency: "Roysambu Constituency",
    subCounty: "Kasarani Sub-County",
    county: "Nairobi County",
    postalAddress: "P.O. Box 6847 - 00200, Nairobi, Kenya",
  },
  contact: {
    phones: ["0707 900 852", "0738 255 448"],
    primaryEmail: "info@starehegirlscentre.co.ke",
    recruitmentEmail: "recruitment@starehegirlscentre.co.ke",
    hours: "Monday – Friday: 8:00 AM – 5:00 PM (EAT)",
  },
  annualEvents: [
    {
      name: "Annual Charity Golf Tournament",
      period: "First Term (March)",
      purpose: "Mobilizing corporate partners and friends of Starehe to support the student sponsorship kitty.",
    },
    {
      name: "Annual Charity Walk",
      period: "Second Term (June)",
      purpose: "Campus-wide public walk uniting students, alumni, parents, and well-wishers to raise educational funding.",
    },
    {
      name: "Annual Charity Gala Dinner",
      period: "Third Term (October / November)",
      purpose: "Premier celebration of student achievement and gala fundraising for capital infrastructure projects.",
    },
  ],
};

export const KEY_STATS: StatItem[] = [
  {
    value: "95%",
    label: "University Transition",
    description: "Average rate of graduates qualifying for direct government and international university entry over 18 consecutive KCSE years.",
  },
  {
    value: "8.90 (B)",
    label: "2025 KCSE Mean Score",
    description: "Positive deviation of +0.07 following the 8.83 recorded in 2024, with 93% of the 187 candidates attaining C+ and above.",
  },
  {
    value: "800+",
    label: "Young Women Enrolled",
    description: "High-potential girls nurtured across Form 1 through Form 4 and pioneering Senior School CBE cohorts.",
  },
  {
    value: "70%",
    label: "Full Scholarships",
    description: "Bright girls from vulnerable economic backgrounds across all 47 counties sponsored in tuition, boarding, healthcare, and welfare.",
  },
  {
    value: "55 Acres",
    label: "Expansive Campus",
    description: "Serene educational sanctuary in Njathaini, featuring modern dormitories, laboratories, sports grounds, and lush greenery.",
  },
  {
    value: "100%",
    label: "2026 University Target",
    description: "Institutional target under 'Operation Plus 5' aiming for a 9.50 mean score and full university progression.",
  },
];

export const TRUSTEES: Leader[] = [
  {
    name: "Mrs. Eunice Mathu",
    role: "Chairperson, Board of Trustees",
    title: "Founding Trustee & Renowned Media Executive",
    image: "/images/leadership/trustee-eunice-mathu.jpg",
    bio: "Pioneering Kenyan publisher, editor, and advocate for women's empowerment. Mrs. Mathu has stewarded Starehe Girls' Centre since its founding trust registration in 2003, championing governance and sustainable endowment growth.",
    category: "trustee",
  },
  {
    name: "Dr. Manu Chandaria, OBE, EBS",
    role: "Founding Chairman of the Board of Trustees",
    title: "Industrialist & Philanthropist",
    image: "/images/leadership/trustee-manu-chandaria.jpg",
    bio: "Eminent business leader and patron of education across East Africa. Dr. Chandaria facilitated the transfer of the 55-acre Limuru Girls' Centre land to Starehe Girls' Centre in 2003, establishing its foundational infrastructure.",
    category: "trustee",
  },
  {
    name: "Dr. Julius Kipng'etich",
    role: "Member, Board of Trustees",
    title: "Corporate Leader & Strategy Specialist",
    image: "/images/leadership/trustee-julius-kipngetich.jpg",
    bio: "Distinguished Kenyan corporate executive and transformation leader. Dr. Kipng'etich provides strategic governance, institutional capacity building, and corporate partnership mentorship to the school.",
    category: "trustee",
  },
  {
    name: "Dr. Salome Gitoho",
    role: "Member, Board of Trustees & BOM",
    title: "Human Resource & Institutional Governance Consultant",
    image: "/images/leadership/trustee-salome-gitoho.png",
    bio: "Accomplished HR specialist and institutional development consultant serving on both the Board of Trustees and Board of Management, dedicated to staff wellness and student mentorship.",
    category: "trustee",
  },
  {
    name: "Ms. Grace Madoka",
    role: "Member, Board of Trustees",
    title: "Legal & Corporate Governance Expert",
    image: "/images/leadership/trustee-grace-madoka.jpg",
    bio: "Respected legal practitioner and corporate director, providing legal stewardship, regulatory compliance, and institutional integrity for the Starehe Girls' Centre Trust.",
    category: "trustee",
  },
  {
    name: "Dr. FCPA Anne E. Owuor",
    role: "Member, Board of Trustees",
    title: "Fellow Certified Public Accountant & Financial Analyst",
    image: "/images/leadership/trustee-anne-owuor.png",
    bio: "Leading audit and finance authority guiding the Centre's fiduciary accountability, endowment management, and transparent procurement policies.",
    category: "trustee",
  },
  {
    name: "Mrs. Suzanne W. Gachukia-Opembe",
    role: "Member, Board of Trustees",
    title: "Creative Arts, Culture & Communications Leader",
    image: "/images/leadership/trustee-suzanne-gachukia.png",
    bio: "Prominent communications and arts specialist continuing the foundational legacy of her mother, Prof. Eddah Gachukia, in girl-child empowerment, mentorship, and creative education.",
    category: "trustee",
  },
  {
    name: "Dr. Naomy Wangai",
    role: "Member, Board of Trustees",
    title: "Senior Educationalist & Former Director of Education",
    image: "/images/leadership/trustee-naomy-wangai.png",
    bio: "Renowned veteran educator with decades of national curriculum policymaking, ensuring Starehe maintains exemplary pedagogy and structured CBC integration.",
    category: "trustee",
  },
  {
    name: "Mr. Fred Okono",
    role: "Member, Board of Trustees & BOM",
    title: "Director representing Starehe Boys' Centre",
    image: "/images/leadership/trustee-fred-okono.jpg",
    bio: "Director bridging Starehe Boys' Centre and Starehe Girls' Centre, safeguarding the enduring shared ethos and fraternal values of 'The Starehe Way'.",
    category: "trustee",
  },
  {
    name: "Sister Jane Soita",
    role: "Director of Starehe Girls' Centre",
    title: "School Director & Executive Trustee",
    image: "/images/leadership/director-sister-jane-soita.jpg",
    bio: "Dedicated institutional leader and servant-hearted administrator guiding daily operations, academic rigor, fundraising mobilization, and spiritual wellness for all 800 young women.",
    category: "trustee",
  },
];

export const BOARD_OF_MANAGEMENT: Leader[] = [
  {
    name: "Prof. Mary Getui",
    role: "Chairperson, Board of Management",
    title: "Professor of Religious Studies & Academic Leader",
    image: "/images/leadership/bom-mary-getui.png",
    bio: "Distinguished academician providing strategic direction to the teaching faculty, curriculum innovation, student welfare, and character cultivation at Starehe Girls.",
    category: "management",
  },
  {
    name: "Mr. Vincent Rapando",
    role: "Member, Board of Management",
    title: "Finance & Institutional Strategy Specialist",
    image: "/images/leadership/bom-vincent-rapando.jpg",
    bio: "Experienced financial director overseeing budgetary allocations, resource management, and capital development oversight.",
    category: "management",
  },
  {
    name: "Dr. Fatuma Hirsi Mohamed",
    role: "Member, Board of Management",
    title: "Corporate Governance & Communications Expert",
    image: "/images/leadership/bom-fatuma-hirsi.png",
    bio: "Former Principal Secretary, acclaimed communications leader, and advocate for girl-child education in marginalized and vulnerable communities.",
    category: "management",
  },
  {
    name: "Dr. Salome Gitoho",
    role: "Member, Board of Management",
    title: "Human Resources & Institutional Development",
    image: "/images/leadership/trustee-salome-gitoho.png",
    bio: "Guiding staff professional development, organizational psychology, and teacher-student mentorship pipelines.",
    category: "management",
  },
  {
    name: "Mr. Fred Okono",
    role: "Member, Board of Management",
    title: "Starehe Boys' Centre Representative",
    image: "/images/leadership/trustee-fred-okono.jpg",
    bio: "Ensuring fraternal collaboration and synchronization of disciplinary standards and tradition.",
    category: "management",
  },
  {
    name: "Sister Jane Soita",
    role: "Director & Secretary to BOM",
    title: "Executive Director",
    image: "/images/leadership/director-sister-jane-soita.jpg",
    bio: "Executive custodian of school strategy, policy execution, donor engagement, and student welfare.",
    category: "management",
  },
];

export const ADMINISTRATION_LEADERS: Leader[] = [
  {
    name: "Sister Jane Soita",
    role: "Director",
    title: "Executive Director",
    image: "/images/leadership/director-sister-jane-soita-office.jpg",
    bio: "Sister Jane oversees the comprehensive operations of the Centre, coordinating between the Board of Trustees, donors, the Ministry of Education, and the senior academic team.",
    category: "administration",
  },
  {
    name: "Mrs. Beatrice Shirao",
    role: "Principal",
    title: "Principal & Chief Academic Officer",
    image: "/images/facilities/facilities-admin-block.jpg",
    bio: "Principal Shirao leads instructional excellence, curriculum implementation, teacher development, and the signature 'Operation Plus 5' academic motivation framework.",
    category: "administration",
  },
];

export const HISTORY_TIMELINE = [
  {
    year: "1990s",
    title: "Conception of the Dream",
    description: "The late Dr. Geoffrey William Griffin, Co-Founder and Director of Starehe Boys' Centre, envisions a sister school to replicate the transformative impact of Starehe for disadvantaged girls.",
  },
  {
    year: "2002",
    title: "Bequest of 55 Acres in Njathaini",
    description: "Limuru Girls' Centre, which operated on 55 acres of land bequeathed by Duncan and Jane Auld Gray for girls' education, ceased operations. The Trustees, led by Dr. Manu Chandaria, agreed to transfer the prime property to establish Starehe Girls' Centre.",
  },
  {
    year: "2003",
    title: "Registration of Starehe Girls' Centre Trust",
    description: "Dr. Griffin encouraged a team of pioneering women educators under Prof. Eddah Gachukia. The Trust was registered with founding trustees Dr. Manu Chandaria, Dr. Griffin, Prof. Eddah Gachukia, Ms. Raychelle Omamo, Prof. Wanjiku Kabira, Mrs. Eunice Mathu, Mrs. Margery Kabuya, and Mrs. Lucy Gitonga.",
  },
  {
    year: "2004",
    title: "Griffin Endowment & First Dormitory",
    description: "Dr. Griffin donated Kshs. 20 million accumulated from loyal donors for girls' education. This funded the construction of the iconic Griffin Dormitory Block alongside four renovated classrooms.",
  },
  {
    year: "January 2005",
    title: "First Intake of 72 Pioneer Students",
    description: "Starehe Girls' Centre officially opened its doors, welcoming 72 bright girls from economically disadvantaged backgrounds representing districts across Kenya into three small dormitories.",
  },
  {
    year: "February 12, 2005",
    title: "The Historic 'Itega' Welcoming Ceremony",
    description: "A ceremonial welcoming party (itega) officially welcomed the 72 girls, graced by First Lady Mama Lucy Kibaki as Guest of Honour and the late Dr. Geoffrey Griffin in one of his final public appearances before his passing.",
  },
  {
    year: "2006–Present",
    title: "Expansion to 800 Students & National Academic Dominance",
    description: "Under the stewardship of successive Directors (Mrs. Margaret Wanjohi and current Director Sister Jane Soita), the Centre has expanded to over 800 girls, achieving an unprecedented 95% university progression rate and national recognition in both KCSE and the new CBE curriculum.",
  },
];

export const ACADEMIC_TRACK_RECORD = {
  summary: "Starehe Girls' Centre has consistently ranked among Kenya's top national institutions. Over 18 consecutive KCSE graduating classes, approximately 95% of all candidates have gained admission to public universities under government sponsorship or earned prestigious international scholarships.",
  recentYears: [
    { year: 2025, candidates: 187, meanScore: "8.90", meanGrade: "B (Plain)", deviation: "+0.07", universityQualified: "93% (C+ & above)" },
    { year: 2024, candidates: 180, meanScore: "8.83", meanGrade: "B (Plain)", deviation: "+0.34", universityQualified: "92%" },
    { year: 2023, candidates: 175, meanScore: "8.49", meanGrade: "B- (Minus)", deviation: "+0.15", universityQualified: "90%" },
    { year: 2022, candidates: 168, meanScore: "8.34", meanGrade: "B- (Minus)", deviation: "+0.21", universityQualified: "89%" },
  ],
  operationPlus5: {
    title: "Operation Plus 5",
    description: "A school-wide student self-evaluation philosophy where every girl sets a personal benchmark to raise her performance by at least 5 marks in each subject from the previous examination. Starehe actively celebrates and rewards the 'Most Improved' students in every academic cycle, fostering an environment where every student has the agency to succeed.",
  },
  pathwaysCBC: [
    {
      name: "STEM Pathway",
      description: "Equips future innovators in science, technology, engineering, and mathematics.",
      tracks: ["Pure Mathematics", "Physics & Chemistry", "Biology & Health Sciences", "Computer Science & Robotics", "Agricultural Technology"],
    },
    {
      name: "Social Sciences Pathway",
      description: "Develops future leaders, policymakers, entrepreneurs, and judicial officers.",
      tracks: ["History & Citizenship", "Geography & Environmental Studies", "Business Studies & Economics", "Christian Religious Education / IRE"],
    },
    {
      name: "Arts & Sports Science Pathway",
      description: "Unlocks artistic expression, performance excellence, and athletic mastery.",
      tracks: ["Performing Arts (Music & Drama)", "Visual & Graphic Arts", "Sports Science & Physical Recreation"],
    },
  ],
};

export const ADMISSION_CRITERIA = {
  formOne: {
    totalSeats: 200,
    quota: "75% Fully Sponsored (High-Need) / 25% Self-Supported",
    eligibility: [
      "Must be 15 years old or younger at the time of admission.",
      "Must select Starehe Girls' Centre as First Choice National School in the national selection system.",
      "Must demonstrate exemplary academic merit in KCPE / primary terminal assessments.",
      "Must complete the official Starehe Blue Application Form by July 31st of the exam year.",
      "Must have the Blue Form authenticated by a Parent/Guardian, Primary School Headteacher, Local Area Chief, and a recognised religious leader (Pastor, Priest, or Imam).",
    ],
    needsAssessment: "Applications are evaluated on an objective poverty score (1 to 10). Shortlisted candidates undergo rigorous review by a 12-member vetting committee, followed by in-person home verification visits by the Sponsorship Office.",
    importantNotice: "The Starehe Blue Form Application is strictly FREE and is NEVER sold under any circumstance.",
  },
  seniorSchool: {
    grade: "Grade 10 Senior School (CBE Transition)",
    effectiveYear: "2026/2027",
    selectionProcess: "Admissions aligned with the Ministry of Education's Competency-Based Education framework, matching students to their chosen career pathways (STEM, Social Sciences, Arts & Sports Science).",
  },
};

export const CLUBS_AND_SOCIETIES: ClubItem[] = [
  {
    name: "Presidential Award Kenya",
    category: "Leadership & Adventure",
    description: "Engages students in expeditions, community service, and personal development, with Starehe girls regularly attaining Gold and Silver awards.",
    activities: ["Wilderness expeditions", "Community service projects", "Life skills acquisition", "Peer leadership mentorship"],
  },
  {
    name: "Robotics & Science Innovation Club",
    category: "STEM & Tech",
    description: "Fosters hands-on engineering, coding, and scientific research. Our young women build automated robotics and represent Kenya at national science congresses.",
    activities: ["Arduino & Scratch programming", "Science Congress research projects", "Drone & automation design", "STEM fairs"],
  },
  {
    name: "Model United Nations (MUN)",
    category: "Diplomacy & Public Speaking",
    description: "Cultivates global awareness, diplomatic negotiations, and assertive public oratory as students debate international resolutions at UNON Gigiri.",
    activities: ["Mock General Assembly debates", "Resolution drafting", "UN Gigiri conferences", "Bilateral negotiations"],
  },
  {
    name: "Kenya Red Cross Society",
    category: "Humanitarian & Health",
    description: "Trains students in emergency first aid, disaster response, and health advocacy within the school and local Njathaini community.",
    activities: ["First aid training & certification", "Community health outreach", "Blood donation drives", "Campus emergency response"],
  },
  {
    name: "Journalism & Media Club",
    category: "Communications",
    description: "Produces the school newsletter, curates school radio broadcasts, and photographs campus events, nurturing the next generation of investigative journalists.",
    activities: ["Termly newsletter publication", "Photography & videography", "Interviewing campus dignitaries", "Public address broadcasting"],
  },
  {
    name: "Drama & Music Society",
    category: "Creative Arts",
    description: "An acclaimed society that performs folk songs, verse, and dramatic plays at the Kenya National Drama and Music Festivals, winning multiple trophies.",
    activities: ["Choral & solo folk songs", "National Drama Festival performances", "Poetry and spoken word", "Instrumental concerts"],
  },
  {
    name: "Environmental & Wildlife Club",
    category: "Conservation",
    description: "Stewards of the Centre's 55-acre green ecosystem, driving indigenous tree planting, organic vegetable gardens, and waste reduction.",
    activities: ["Tree planting campaigns", "Zero-waste campus initiatives", "Nature walks & bird watching", "Kitchen garden maintenance"],
  },
  {
    name: "St. John Ambulance & Girl Guides",
    category: "Drill & Service",
    description: "Instils exemplary discipline, ceremonial parade drills, emergency assistance, and patriotic service to the nation.",
    activities: ["Parade and ceremonial drill", "National celebrations participation", "Camping and survival skills", "Service to elder communities"],
  },
];

export const SPORTS_DISCIPLINES = [
  { name: "Basketball", description: "Competitive court with inter-county tournaments and dedicated coaching." },
  { name: "Volleyball", description: "High-energy training, competing at sub-county and county school championships." },
  { name: "Football (Soccer)", description: "Full-size pitch for eleven-a-side matches fostering teamwork and endurance." },
  { name: "Athletics & Cross Country", description: "Sprint, middle-distance, and 55-acre cross-country trails on campus grounds." },
  { name: "Badminton & Table Tennis", description: "Indoor recreational and competitive sports for hand-eye coordination." },
  { name: "Netball", description: "Traditional school discipline emphasizing fast tactical play and agility." },
  { name: "Lawn Tennis", description: "Court coaching building tactical thinking and individual athletic excellence." },
];

export const CAPITAL_PROJECTS: CapitalProject[] = [
  {
    title: "Multipurpose Hall & Performing Arts Auditorium",
    priority: "Urgent",
    description: "The school urgently requires a modern 1,200-seat multipurpose hall to house student assemblies, CBE national assessments, musical performances, and academic symposiums currently held under temporary setups.",
    goal: "Kshs. 65,000,000",
    impact: "Provides an all-weather civic space for 800+ students and national educational gatherings.",
  },
  {
    title: "Twin Science Laboratories (Biology & Chemistry)",
    priority: "Urgent",
    description: "Current laboratories only accommodate 40 students per session, forcing the 200 students per class cohort to operate in shifts. Two additional specialized 60-seat labs are needed.",
    goal: "Kshs. 28,000,000",
    impact: "Eliminates lab shift schedules and enables simultaneous hands-on practicals for examination classes.",
  },
  {
    title: "160-Bed Modern Dormitory Block",
    priority: "High",
    description: "To decongest existing residential quarters and expand boarding capacity for deserving girls from all 47 counties.",
    goal: "Kshs. 35,000,000",
    impact: "Ensures hygienic, comfortable, and dignified living conditions for 160 additional scholars.",
  },
  {
    title: "Expanded Digital Learning Resource Centre (Library)",
    priority: "High",
    description: "The current library accommodates only 40 students at a time. The expansion will increase capacity to 250 students with high-speed digital e-learning stations.",
    goal: "Kshs. 22,000,000",
    impact: "Unlocks digital research, e-books, and quiet study for an entire form cohort at once.",
  },
  {
    title: "Elective Subjects Classroom Block",
    priority: "Strategic",
    description: "Dedicated specialised classrooms for CBC elective subjects: French, German, Music, Home Science, Computer Science, and Visual Arts.",
    goal: "Kshs. 30,000,000",
    impact: "Directly fulfills Ministry of Education CBE accreditation standards for Senior School.",
  },
  {
    title: "62-Seater School Bus & Campus Transport",
    priority: "Strategic",
    description: "Procurement of a safe 62-seater school coach to support academic fieldwork, national sports contests, science symposiums, and charity walks.",
    goal: "Kshs. 15,000,000",
    impact: "Guarantees student safety and significantly reduces hired transport expenditures.",
  },
];

export const TENDERS_LIST: TenderItem[] = [
  {
    id: "SGC/TND/2026-2027/01",
    title: "Invitation to Tender for Supply of Goods and Provision of Services (FY 2026/2027)",
    publishedDate: "11-06-2026",
    closingDate: "29-06-2026 at 1:00 PM",
    status: "Open",
    category: "General Procurement & Annual Supplies",
    description: "Starehe Girls' Centre invites eligible, competent, and registered suppliers for the supply and delivery of food supplies, laboratory chemicals, uniforms, textbooks, security, and cleaning services for the financial year 2026/2027.",
  },
  {
    id: "SGC/RFP/IA/2026/02",
    title: "Request For Proposal (RFP) for Outsourcing of Internal Audit Services",
    publishedDate: "16-04-2026",
    closingDate: "30-05-2026 at 4:00 PM",
    status: "Open",
    category: "Professional Audit Services",
    description: "To strengthen institutional governance, accountability, and internal control systems, the Centre seeks to outsource comprehensive Internal Audit Services to a qualified, reputable, and experienced accounting firm registered with ICPAK.",
  },
  {
    id: "SGC/RFP/EA/2025/03",
    title: "Request for External Audit Services under Trustees (Perpetual Succession) Act, Cap 164",
    publishedDate: "30-06-2025",
    closingDate: "21-07-2025",
    status: "Closed",
    category: "Statutory Financial Audit",
    description: "Statutory annual audit of financial statements and endowment fund stewardship in compliance with the Basic Education Act 2013 and Trust Deed provisions.",
  },
];

export const JOB_VACANCIES: JobVacancy[] = [
  {
    id: "SGC-HR-2026-01",
    title: "Administration Officer",
    posts: 1,
    deadline: "Monday, 3 August 2026",
    type: "Full-Time (Permanent)",
    description: "Starehe Girls' Centre seeks a diligent and detail-oriented Administration Officer to oversee institutional logistics, records management, procurement support, and inter-departmental administrative coordination.",
    requirements: [
      "Bachelor's Degree in Public Administration, Business Management, or equivalent from a recognised university.",
      "Minimum 3 to 5 years of progressive administrative experience, preferably in an educational or non-profit institution.",
      "Proficiency in ERP systems, office productivity suites, and database management.",
      "High level of integrity, confidentiality, and alignment with the Starehe values.",
      "Valid Police Clearance Certificate (Certificate of Good Conduct) and statutory compliance documents.",
    ],
    submissionEmail: "recruitment@starehegirlscentre.co.ke",
  },
  {
    id: "SGC-HR-2026-02",
    title: "School Cateress",
    posts: 1,
    deadline: "Monday, 3 August 2026",
    type: "Full-Time (Contract/Permanent)",
    description: "Responsible for managing the dining hall and kitchen operations catering for 800+ boarding students and staff, ensuring balanced, nutritious, hygienic, and cost-effective meal planning.",
    requirements: [
      "Diploma or Higher National Diploma in Food and Beverage Management or Institutional Catering from a recognised institution (e.g. Kenya Utalii College).",
      "At least 4 years experience running large-scale institutional catering (schools, colleges, or hospitals).",
      "Demonstrated mastery of food safety, hygiene protocols, inventory stock control, and kitchen staff supervision.",
      "Valid Food Handlers Medical Certificate.",
      "Strong work ethic, empathy, and passion for youth welfare.",
    ],
    submissionEmail: "recruitment@starehegirlscentre.co.ke",
  },
];

export const KUCCPS_ADVISORY = {
  title: "KUCCPS University & TVET Placement Advisory",
  targetCohort: "Graduating KCSE Candidates",
  message: "Congratulations to the Starehe Girls' Centre KCSE candidates on their remarkable academic performance. With over 93% attaining university entry grades (C+ and above), the school offers personalized counseling to ensure every student selects competitive degree or diploma courses aligned with her career vision.",
  portalUrl: "https://students.kuccps.net/",
  supportOffice: "Starehe Girls' Centre ICT & Careers Office",
  officeGuidance: "Students encountering challenges with the student portal, course revisions, or inter-institutional transfers should visit the campus IT office or email careers@starehegirlscentre.co.ke for one-on-one technical support.",
  keyReminders: [
    "Verify your KCPE/KCSE index number and password requirements before logging onto the KUCCPS student portal.",
    "Carefully review the minimum cluster points and subject prerequisites for your preferred degree courses.",
    "Always fill out all alternative choices to maximize your chances of premier placement.",
    "Remember to apply for HELB / Universities Fund tuition loan and scholarship assistance upon course placement.",
  ],
};
