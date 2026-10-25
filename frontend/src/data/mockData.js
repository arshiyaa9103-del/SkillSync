export const initialCurrentUser = {
  id: "user-aarav",
  name: "Aarav Mehta",
  avatar: "AM",
  role: "Full-Stack Developer",
  year: "Year 3",
  department: "Computer Science & Engineering",
  university: "National Institute of Technology",
  badge: "Available for Hackathons",
  status: "available",
  bio: "Full-stack developer interested in building useful technology products, scalable web apps, and participating in high-impact innovation challenges.",
  skills: [
    { name: "React.js", level: "Advanced", matched: true },
    { name: "JavaScript", level: "Advanced", matched: true },
    { name: "Python", level: "Intermediate", matched: true },
    { name: "Node.js", level: "Advanced", matched: true },
    { name: "MongoDB", level: "Intermediate", matched: true },
    { name: "Tailwind CSS", level: "Advanced", matched: false },
    { name: "Git", level: "Advanced", matched: false },
  ],
  preferredRoles: [
    "Frontend Developer",
    "Full Stack Developer",
    "Product Engineer"
  ],
  experience: {
    projects: 5,
    hackathons: 3,
    internships: 2
  },
  projects: [
    {
      title: "CampusConnect",
      description: "A student networking and peer collaboration platform with real-time study rooms.",
      tags: ["React", "Socket.io", "Tailwind", "Node.js"],
      githubUrl: "https://github.com/aaravmehta/campus-connect",
      liveUrl: "https://campus-connect.demo"
    },
    {
      title: "TeamTrack",
      description: "A collaborative project management tool featuring live Kanban boards and milestone analytics.",
      tags: ["React", "Express", "MongoDB", "Redux"],
      githubUrl: "https://github.com/aaravmehta/teamtrack",
      liveUrl: null
    }
  ],
  socials: {
    github: "github.com/aaravmehta",
    linkedin: "linkedin.com/in/aaravmehta-dev",
    portfolio: "aaravmehta.dev"
  }
};

export const initialHackathons = [
  {
    id: "technova-2026",
    title: "TechNova Challenge 2026",
    tagline: "Build technology solutions that improve everyday digital experiences.",
    status: "Open",
    badgeColor: "success",
    dates: "18 Nov – 21 Nov 2026",
    startDate: "2026-11-18",
    endDate: "2026-11-21",
    teamSize: "3–6 members",
    minTeamSize: 3,
    maxTeamSize: 6,
    mode: "Hybrid",
    location: "Bengaluru Innovation Hub & Virtual",
    domains: ["Web", "AI/ML", "Cloud", "Cybersecurity", "Product Design"],
    prizePool: "₹2,50,000",
    registrationDeadline: "12 Nov 2026",
    registeredTeams: 142,
    spotsLeft: 38,
    overview: "TechNova Challenge 2026 invites student teams to build next-generation consumer, enterprise, and educational products. Whether you are creating frictionless workflows, intelligent micro-services, or accessible interfaces, TechNova is where student innovation turns into production-grade prototypes.",
    problemDomains: [
      {
        title: "Digital Inclusivity & Accessibility",
        desc: "Designing assistive workflows and multi-modal experiences for diverse demographics."
      },
      {
        title: "Distributed Data & Cloud Systems",
        desc: "High-throughput, privacy-first backends with edge sync and automated fallbacks."
      },
      {
        title: "Adaptive Learning & Student Utilities",
        desc: "Tools that streamline academic collaboration, peer mentoring, and experiential learning."
      },
      {
        title: "Responsible Automation & Analytics",
        desc: "Transparent algorithmic pipelines that provide actionable insights without opaque black-boxes."
      }
    ],
    eligibility: [
      "Currently enrolled undergraduate or postgraduate students from any recognized university.",
      "Teams must consist of 3 to 6 active members.",
      "Inter-college and multi-disciplinary teams are strongly encouraged.",
      "All submissions must be original code authored during the hackathon period."
    ],
    rules: [
      "No pre-built repositories or commercial templates allowed before kickoff.",
      "Use of open-source libraries and public APIs is permitted with proper attribution.",
      "Teams must commit source code regularly to the designated platform repository.",
      "Final presentations include a 4-minute live functional demo and 2-minute Q&A."
    ],
    timeline: [
      { date: "12 Nov 2026", event: "Registration & Team Formation Closes" },
      { date: "18 Nov 2026, 09:00 AM", event: "Opening Ceremony & Problem Statement Drop" },
      { date: "19 Nov 2026, 06:00 PM", event: "Mid-Sprint Mentorship & Architecture Check" },
      { date: "21 Nov 2026, 02:00 PM", event: "Code Freeze & Video Submission" },
      { date: "21 Nov 2026, 05:30 PM", event: "Finalist Pitches & Award Ceremony" }
    ],
    prizes: [
      { rank: "1st Place (Grand Champion)", amount: "₹1,25,000", perks: "Cloud Credits + Fast-track Interviews" },
      { rank: "2nd Place (Runner Up)", amount: "₹75,000", perks: "Ecosystem Mentorship + Hardware Kits" },
      { rank: "3rd Place (Innovation Award)", amount: "₹35,000", perks: "Incubation Access & Subscriptions" },
      { rank: "Best UI/UX Design Track", amount: "₹15,000", perks: "Design System Tooling Licenses" }
    ]
  },
  {
    id: "bharat-digital-futures",
    title: "Bharat Digital Futures",
    tagline: "Empowering the next generation of scalable public digital infrastructure and services.",
    status: "Open",
    badgeColor: "success",
    dates: "05 Dec – 08 Dec 2026",
    startDate: "2026-12-05",
    endDate: "2026-12-08",
    teamSize: "2–5 members",
    minTeamSize: 2,
    maxTeamSize: 5,
    mode: "Hybrid",
    location: "New Delhi & Virtual",
    domains: ["FinTech", "Public Digital Goods", "AI/ML", "Open Data"],
    prizePool: "₹3,00,000",
    registrationDeadline: "28 Nov 2026",
    registeredTeams: 98,
    spotsLeft: 52,
    overview: "Focusing on national open-source digital infrastructure, payment rails, citizen governance tools, and open telemetry to benefit hundreds of millions of users.",
    problemDomains: [
      { title: "UPI & Micro-Credit Innovation", desc: "Simplifying trust mechanisms for unbanked micro-entrepreneurs." },
      { title: "Civic Reporting & Telemetry", desc: "Decentralized municipal problem tracking and verifiable resolutions." }
    ],
    eligibility: ["Undergraduate & Masters students in India."],
    rules: ["Public repository mandatory under Apache 2.0 or MIT license."],
    timeline: [
      { date: "28 Nov 2026", event: "Registration Closes" },
      { date: "05 Dec 2026", event: "Sprint Begins" },
      { date: "08 Dec 2026", event: "Grand Showcase" }
    ],
    prizes: [
      { rank: "1st Place", amount: "₹1,50,000", perks: "GovTech Fellowship" },
      { rank: "2nd Place", amount: "₹1,00,000", perks: "Incubator Support" },
      { rank: "3rd Place", amount: "₹50,000", perks: "Open Source Grant" }
    ]
  },
  {
    id: "greencode-sprint",
    title: "GreenCode Innovation Sprint",
    tagline: "Design low-carbon code architectures and IoT-based environmental monitoring systems.",
    status: "Open",
    badgeColor: "success",
    dates: "28 Nov – 30 Nov 2026",
    startDate: "2026-11-28",
    endDate: "2026-11-30",
    teamSize: "3–4 members",
    minTeamSize: 3,
    maxTeamSize: 4,
    mode: "Online",
    location: "Virtual (Global)",
    domains: ["CleanTech", "IoT", "Climate Tech", "Energy Optimization"],
    prizePool: "₹1,50,000",
    registrationDeadline: "22 Nov 2026",
    registeredTeams: 76,
    spotsLeft: 24,
    overview: "Sustainability meets systems programming. Teams develop algorithms that reduce server compute carbon footprint and optimize micro-grid renewable energy distribution.",
    problemDomains: [
      { title: "Energy-Efficient Compute", desc: "Workload distribution heuristics that prioritize off-peak green grid hours." },
      { title: "Smart Micro-Grid IoT", desc: "Low-power sensor networks tracking building emissions in real time." }
    ],
    eligibility: ["Open to student technologists worldwide."],
    rules: ["Carbon metrics of tested software should be reported in demo."],
    timeline: [
      { date: "22 Nov 2026", event: "Sign-ups End" },
      { date: "28 Nov 2026", event: "48-Hour Sprint Commences" },
      { date: "30 Nov 2026", event: "Green Pitch & Results" }
    ],
    prizes: [
      { rank: "Winner", amount: "₹1,00,000", perks: "Clean Energy Grant" },
      { rank: "Runner Up", amount: "₹50,000", perks: "Hardware Starter Pack" }
    ]
  },
  {
    id: "campus-product-jam",
    title: "Campus Product Jam",
    tagline: "Rapid 48-hour student sprint building student-first digital utility tools.",
    status: "Upcoming",
    badgeColor: "warning",
    dates: "10 Jan – 12 Jan 2027",
    startDate: "2027-01-10",
    endDate: "2027-01-12",
    teamSize: "2–4 members",
    minTeamSize: 2,
    maxTeamSize: 4,
    mode: "In-Person",
    location: "Campus Innovation Center, Pune",
    domains: ["Mobile", "Web", "UX/UI", "Education Tech"],
    prizePool: "₹1,00,000",
    registrationDeadline: "02 Jan 2027",
    registeredTeams: 45,
    spotsLeft: 55,
    overview: "Focusing strictly on product-market fit, delight, and usable prototypes that solve daily university and student life friction.",
    problemDomains: [
      { title: "Campus Housing & Roommate Matching", desc: "Verified peer living discovery and roommate compatibility." },
      { title: "Collaborative Note Synthesis", desc: "Real-time lecture notes sharing and group flashcards." }
    ],
    eligibility: ["All verified college students with active student IDs."],
    rules: ["High-fidelity prototype and 5 real student user testimonials required."],
    timeline: [
      { date: "02 Jan 2027", event: "Registration Closes" },
      { date: "10 Jan 2027", event: "On-Campus Kickoff" },
      { date: "12 Jan 2027", event: "Product Demo Day" }
    ],
    prizes: [
      { rank: "Product of the Year", amount: "₹60,000", perks: "Product Hunt Featured Launch" },
      { rank: "Best UX Award", amount: "₹40,000", perks: "Design Studio Mentorship" }
    ]
  },
  {
    id: "healthtech-buildathon",
    title: "HealthTech Buildathon",
    tagline: "Creating resilient, accessible digital healthcare diagnostics and caregiver workflows.",
    status: "Upcoming",
    badgeColor: "warning",
    dates: "22 Jan – 25 Jan 2027",
    startDate: "2027-01-22",
    endDate: "2027-01-25",
    teamSize: "3–5 members",
    minTeamSize: 3,
    maxTeamSize: 5,
    mode: "Hybrid",
    location: "Hyderabad Medical Tech Park & Virtual",
    domains: ["Healthcare", "AI", "BioInformatics", "Telemedicine"],
    prizePool: "₹2,00,000",
    registrationDeadline: "15 Jan 2027",
    registeredTeams: 32,
    spotsLeft: 48,
    overview: "Bridging the gap between clinicians and patient data. Teams build privacy-preserving health portals, automated triage assistants, and predictive analytics tools.",
    problemDomains: [
      { title: "Rural Remote Triage", desc: "Low-bandwidth audio/visual diagnostic support for health workers." },
      { title: "Synthetic Patient Records", desc: "Differential privacy models for clinical trial optimization." }
    ],
    eligibility: ["Engineers, med students, and designers welcomed."],
    rules: ["No real private health data may be stored in public repos."],
    timeline: [
      { date: "15 Jan 2027", event: "Registration Deadline" },
      { date: "22 Jan 2027", event: "Buildathon Launch" },
      { date: "25 Jan 2027", event: "Clinician Jury Review" }
    ],
    prizes: [
      { rank: "Grand Prize", amount: "₹1,20,000", perks: "Hospital Pilot Partnership" },
      { rank: "Special Category", amount: "₹80,000", perks: "Medical Device Sandbox Access" }
    ]
  },
  {
    id: "fintech-forge",
    title: "FinTech Forge",
    tagline: "Next-gen algorithmic compliance and seamless cross-border payment protocols.",
    status: "Completed",
    badgeColor: "secondary",
    dates: "15 Sep – 18 Sep 2026",
    startDate: "2026-09-15",
    endDate: "2026-09-18",
    teamSize: "2–4 members",
    minTeamSize: 2,
    maxTeamSize: 4,
    mode: "Online",
    location: "Virtual",
    domains: ["Web3", "DeFi", "Open Banking", "Fraud Detection"],
    prizePool: "₹2,00,000",
    registrationDeadline: "08 Sep 2026",
    registeredTeams: 160,
    spotsLeft: 0,
    overview: "Concluded hackathon exploring programmable money, micro-hedging, and automated AML (anti-money laundering) patterns.",
    problemDomains: [
      { title: "Cross-Border Remittance", desc: "Sub-cent fee settlement algorithms." }
    ],
    eligibility: ["Completed event."],
    rules: ["Standard archival rules."],
    timeline: [
      { date: "18 Sep 2026", event: "Event Concluded & Winners Announced" }
    ],
    prizes: [
      { rank: "Winner", amount: "₹1,20,000", perks: "Venture Builder Demo" }
    ]
  },
  {
    id: "algonation-2026",
    title: "AlgoNation 2026",
    tagline: "High-performance systems, distributed algorithms, and national cloud innovation.",
    status: "Open",
    badgeColor: "success",
    dates: "14 Dec – 17 Dec 2026",
    startDate: "2026-12-14",
    endDate: "2026-12-17",
    teamSize: "3–6 members",
    minTeamSize: 3,
    maxTeamSize: 6,
    mode: "Hybrid",
    location: "Bengaluru Tech Hub & Virtual",
    domains: ["Algorithms", "Cloud Systems", "AI/ML", "Distributed Computing"],
    prizePool: "₹3,50,000",
    registrationDeadline: "05 Dec 2026",
    registeredTeams: 110,
    spotsLeft: 40,
    overview: "AlgoNation 2026 brings together the country's most capable student programmers to tackle complex algorithmic optimizations, fault-tolerant infrastructure, and scalable telemetry.",
    problemDomains: [
      { title: "High-Throughput Consensus", desc: "Low-latency distributed consensus engines for asynchronous clusters." },
      { title: "Real-time Telemetry Routing", desc: "Adaptive packet scheduling for mission-critical edge gateways." }
    ],
    eligibility: ["Undergraduate & Postgraduate students enrolled in accredited institutions."],
    rules: ["Zero-dependency baseline benchmarks required with reproducible telemetry."],
    timeline: [
      { date: "05 Dec 2026", event: "Registration Closes" },
      { date: "14 Dec 2026", event: "National Hackathon Kickoff" },
      { date: "17 Dec 2026", event: "Grand Finale & Awards" }
    ],
    prizes: [
      { rank: "National Champions", amount: "₹2,00,000", perks: "Industry Fellowship & Cloud Credits" },
      { rank: "First Runners-Up", amount: "₹1,00,000", perks: "Fast-Track Technical Interviews" },
      { rank: "Algorithmic Excellence", amount: "₹50,000", perks: "Developer Tooling Licenses" }
    ]
  }
];

export const initialCandidates = [
  {
    id: "cand-neha",
    name: "Neha Kapoor",
    avatar: "NK",
    matchPercentage: 91,
    role: "Data Scientist",
    department: "Computer Science",
    year: "Year 2",
    university: "Indian Institute of Information Technology",
    availability: "Available",
    bio: "Data science student interested in ML, analytics and solving real-world problems. Experienced in data cleaning, exploratory analysis, and deploying lightweight predictive models.",
    skills: ["Python", "Pandas", "SQL", "Machine Learning", "Data Visualization"],
    experience: {
      hackathons: 2,
      projects: 4
    },
    preferredRoles: ["Data Scientist", "ML Engineer", "Data Analyst"],
    whyReasons: [
      "Covers Data Science gap (currently 40% in Team Nova)",
      "Python matches team requirement for backend pipeline integration",
      "Available for the selected hackathon (TechNova Challenge 2026)"
    ],
    socials: {
      github: "github.com/nehakapoor",
      linkedin: "linkedin.com/in/nehakapoor-ds"
    },
    highlights: ["Won 2nd place in DataHack 2025", "Built customer churn predictor with 93% accuracy"]
  },
  {
    id: "cand-rohan",
    name: "Rohan Mehta",
    avatar: "RM",
    matchPercentage: 87,
    role: "UI/UX Designer",
    department: "Design & Human-Computer Interaction",
    year: "Year 3",
    university: "National Institute of Design",
    availability: "Available",
    bio: "Product designer focused on intuitive design systems, high-fidelity Figma prototypes, and accessible user flows. Passionate about turning complex systems into clean interfaces.",
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping", "User Research"],
    experience: {
      hackathons: 3,
      projects: 6
    },
    preferredRoles: ["UI/UX Designer", "Product Designer", "Design Technologist"],
    whyReasons: [
      "Covers UI/UX critical gap (currently only 20% in Team Nova)",
      "Figma & Design Systems expertise speeds up frontend handoff",
      "Available immediately with 3 hackathon podium finishes"
    ],
    socials: {
      github: "github.com/rohanmehta-design",
      linkedin: "linkedin.com/in/rohanmehta-ux"
    },
    highlights: ["Created published design system with 1.2k Figma Community dupes", "Track winner at DesignSprint 2025"]
  },
  {
    id: "cand-ananya",
    name: "Ananya Shah",
    avatar: "AS",
    matchPercentage: 84,
    role: "Data Analyst",
    department: "Information Technology",
    year: "Year 2",
    university: "Delhi Technological University",
    availability: "Available",
    bio: "Data enthusiast with strong statistical analysis and dashboard storytelling skills. Skilled in transforming complex datasets into clear visual narratives.",
    skills: ["Python", "SQL", "Data Visualization", "Tableau", "Statistics"],
    experience: {
      hackathons: 1,
      projects: 3
    },
    preferredRoles: ["Data Analyst", "Business Intelligence", "Research Assistant"],
    whyReasons: [
      "Helps fill the team's data analytics needs",
      "Strong visual storytelling for presentation pitch deck",
      "Available for weekend sprint periods"
    ],
    socials: {
      github: "github.com/ananyashah",
      linkedin: "linkedin.com/in/ananyashah-data"
    },
    highlights: ["Built COVID recovery trend dashboard used by campus health dept"]
  },
  {
    id: "cand-vihaan",
    name: "Vihaan Patel",
    avatar: "VP",
    matchPercentage: 79,
    role: "Cybersecurity Specialist",
    department: "Computer Science & Engineering",
    year: "Year 3",
    university: "Vellore Institute of Technology",
    availability: "Available",
    bio: "Security researcher interested in application hardening, API security, and network defenses. Experienced in CTF challenges and automated security audits.",
    skills: ["Network Security", "Linux", "Python", "Cryptography", "OWASP"],
    experience: {
      hackathons: 2,
      projects: 3
    },
    preferredRoles: ["Cybersecurity Specialist", "DevSecOps", "Security Analyst"],
    whyReasons: [
      "Matches TechNova Challenge Cybersecurity domain requirements",
      "Strengthens backend API protection and authentication token security",
      "Available for full 72-hour duration"
    ],
    socials: {
      github: "github.com/vihaanpatel",
      linkedin: "linkedin.com/in/vihaanpatel-sec"
    },
    highlights: ["Ranked top 5% in National Inter-College CTF 2025"]
  },
  {
    id: "cand-tara",
    name: "Tara Malhotra",
    avatar: "TM",
    matchPercentage: 76,
    role: "Cloud Engineer",
    department: "Computer Science",
    year: "Year 4",
    university: "Birla Institute of Technology and Science",
    availability: "Busy",
    bio: "Infrastructure architect and cloud enthusiast. Passionate about serverless architectures, Docker containerization, and zero-downtime automated CI/CD deployments.",
    skills: ["AWS", "Docker", "Kubernetes", "Node.js", "Terraform"],
    experience: {
      hackathons: 4,
      projects: 8
    },
    preferredRoles: ["Cloud Engineer", "DevOps Engineer", "Site Reliability"],
    whyReasons: [
      "High infrastructure competence for high-scale demo load",
      "Experience with 4 previous hackathons",
      "Note: Marked busy due to final exams, partial availability"
    ],
    socials: {
      github: "github.com/taramalhotra",
      linkedin: "linkedin.com/in/tara-malhotra"
    },
    highlights: ["AWS Certified Cloud Practitioner", "Scaled demo app to 10k mock requests"]
  },
  {
    id: "cand-arjun",
    name: "Arjun Nair",
    avatar: "AN",
    matchPercentage: 73,
    role: "Mobile Developer",
    department: "Computer Engineering",
    year: "Year 2",
    university: "College of Engineering Guindy",
    availability: "Available",
    bio: "Mobile app developer specializing in cross-platform experiences using Flutter and React Native with Firebase real-time synchronizations.",
    skills: ["Flutter", "React Native", "Firebase", "Dart", "REST APIs"],
    experience: {
      hackathons: 1,
      projects: 3
    },
    preferredRoles: ["Mobile Developer", "Cross-Platform Engineer"],
    whyReasons: [
      "Adds native mobile companion option to web apps",
      "Quick Firebase integration capability",
      "Available immediately"
    ],
    socials: {
      github: "github.com/arjunnair",
      linkedin: "linkedin.com/in/arjun-nair-dev"
    },
    highlights: ["Published 2 Flutter utilities on Google Play Store"]
  },
  {
    id: "cand-meera",
    name: "Meera Kapoor",
    avatar: "MK",
    matchPercentage: 70,
    role: "Backend Engineer",
    department: "Software Engineering",
    year: "Year 3",
    university: "RV College of Engineering",
    availability: "Available",
    bio: "Systems and backend developer focused on high-concurrency Go services, relational database modeling, and microservice architectures.",
    skills: ["Go", "PostgreSQL", "Microservices", "Redis", "gRPC"],
    experience: {
      hackathons: 2,
      projects: 5
    },
    preferredRoles: ["Backend Engineer", "Systems Architect"],
    whyReasons: [
      "High performance Go microservices knowledge",
      "PostgreSQL and caching background",
      "Available"
    ],
    socials: {
      github: "github.com/meerakapoor",
      linkedin: "linkedin.com/in/meera-kapoor"
    },
    highlights: ["Engineered transactional distributed lock system in Go"]
  },
  {
    id: "cand-devansh",
    name: "Devansh Rao",
    avatar: "DR",
    matchPercentage: 68,
    role: "IoT / Embedded Engineer",
    department: "Electronics & Communication",
    year: "Year 2",
    university: "Manipal Institute of Technology",
    availability: "Available",
    bio: "Hardware prototyping fanatic building edge telemetry with ESP32, Arduino, and MQTT message brokers connected to web dashboards.",
    skills: ["C++", "Arduino", "MQTT", "Raspberry Pi", "Hardware Prototyping"],
    experience: {
      hackathons: 1,
      projects: 4
    },
    preferredRoles: ["Embedded Systems Engineer", "IoT Developer"],
    whyReasons: [
      "Physical device integration specialist",
      "Knowledge of sensor data protocols",
      "Available"
    ],
    socials: {
      github: "github.com/devanshrao",
      linkedin: "linkedin.com/in/devansh-rao"
    },
    highlights: ["Automated solar tracker prototype with ESP32"]
  }
];

export const initialTeam = {
  id: "team-nova",
  name: "Team Nova",
  hackathonId: "technova-2026",
  hackathonName: "TechNova Challenge 2026",
  status: "Building", // "Building" -> "Ready"
  teamLead: "Aarav Mehta",
  targetMembers: 6,
  minMembers: 3,
  description: "Building an intuitive, accessible student collaboration and research workspace for the TechNova Challenge.",
  members: [
    {
      id: "user-aarav",
      name: "Aarav Mehta",
      avatar: "AM",
      role: "Frontend Developer",
      isLead: true,
      department: "Computer Science · Year 3",
      skills: ["React.js", "JavaScript", "Tailwind CSS", "UI Architecture"],
      contribution: "Core UI/UX state and component hierarchy"
    },
    {
      id: "member-riya",
      name: "Riya Shah",
      avatar: "RS",
      role: "Backend Developer",
      isLead: false,
      department: "Information Tech · Year 3",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
      contribution: "API routes, database schema, and server endpoints"
    },
    {
      id: "member-kabir",
      name: "Kabir Joshi",
      avatar: "KJ",
      role: "Research & Strategy",
      isLead: false,
      department: "Data Analytics · Year 2",
      skills: ["User Research", "Market Analysis", "Technical Writing"],
      contribution: "Problem validation, competitor analysis, and pitch slides"
    },
    {
      id: "member-mehul",
      name: "Mehul Jain",
      avatar: "MJ",
      role: "Product",
      isLead: false,
      department: "Computer Engineering · Year 3",
      skills: ["Product Roadmapping", "Agile", "System Design"],
      contribution: "Feature scoping, user stories, and acceptance criteria"
    }
  ],
  openPositions: [
    {
      role: "Data Scientist",
      urgency: "Critical Gap",
      reason: "Needed for ML scoring pipeline and data processing model",
      suggestedCandidateId: "cand-neha"
    },
    {
      role: "UI/UX Designer",
      urgency: "Critical Gap",
      reason: "Needed for polished Figma prototypes and design system consistency",
      suggestedCandidateId: "cand-rohan"
    }
  ],
  skillMap: [
    { name: "Frontend", coverage: 100, level: "strong" },
    { name: "Backend", coverage: 80, level: "strong" },
    { name: "Research", coverage: 80, level: "strong" },
    { name: "Product", coverage: 80, level: "strong" },
    { name: "Data Science", coverage: 40, level: "critical" },
    { name: "UI/UX", coverage: 20, level: "critical" }
  ],
  criticalGaps: ["Data Science", "UI/UX"],
  overallCoverage: 74,
  eligibilityStatus: {
    statusText: "Needs 2 more members",
    isReady: false,
    checklist: [
      { text: "Minimum team size met (4/3)", passed: true },
      { text: "Hackathon challenge selected (TechNova 2026)", passed: true },
      { text: "Registration window open", passed: true },
      { text: "Data Science role covered", passed: false, gapRole: "Data Science" },
      { text: "UI/UX role covered", passed: false, gapRole: "UI/UX" }
    ]
  }
};

export const initialInvitations = {
  received: [
    {
      id: "inv-rec-1",
      teamName: "Team Apex",
      hackathonName: "Bharat Digital Futures",
      invitedBy: "Tanmay Sen",
      invitedByAvatar: "TS",
      role: "Frontend Developer",
      date: "2 hours ago",
      status: "Pending",
      teamSize: "3 / 5 Members",
      message: "Hey Aarav! We saw your React & Tailwind work on CampusConnect and would love to have you lead our frontend for Bharat Digital Futures."
    }
  ],
  sent: [
    {
      id: "inv-sent-1",
      candidateId: "cand-sneha",
      candidateName: "Sneha Rao",
      candidateAvatar: "SR",
      candidateRole: "Research Specialist",
      hackathonName: "TechNova Challenge 2026",
      role: "Research Specialist",
      date: "Sent 2 days ago",
      status: "Pending",
      reason: "Team strategy and user study support"
    }
  ]
};

export const initialNotifications = [
  {
    id: "notif-1",
    title: "Registration Reminder",
    message: "TechNova Challenge registration closes in 5 days (Nov 12).",
    time: "1 hour ago",
    read: false,
    type: "warning"
  },
  {
    id: "notif-2",
    title: "Team Skill Gap Alert",
    message: "Your team is missing a UI/UX designer and Data Scientist.",
    time: "3 hours ago",
    read: false,
    type: "info"
  },
  {
    id: "notif-3",
    title: "High Match Candidate",
    message: "Neha Kapoor (91% match) is available for Data Science.",
    time: "5 hours ago",
    read: true,
    type: "success"
  },
  {
    id: "notif-4",
    title: "Team Invitation Received",
    message: "Team Apex invited you to join for Bharat Digital Futures.",
    time: "1 day ago",
    read: true,
    type: "info"
  }
];
