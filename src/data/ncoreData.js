export const EVENT_DETAILS = {
  name: "NCORE 2026",
  fullName: "12HRS HACKATHON - THINK. BUILD. SOLVE. MAKE AN IMPACT.",
  hackathonTitle: "12HRS HACKATHON",
  tagline: "THINK. BUILD. SOLVE. MAKE AN IMPACT.",
  presentedBy: "POINTERS",
  organizer: "DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING",
  college: "ARUNAI ENGINEERING COLLEGE",
  collegeType: "(An Autonomous Institution)",
  location: "Tiruvannamalai, Tamil Nadu",
  association: "IN ASSOCIATION WITH i-GROW (STUDENT ASSOCIATION) & POINTERS",
  eventDate: "09 OCTOBER 2026",
  eventTimestamp: new Date("2026-10-09T09:00:00+05:30").getTime(),
  prizePool: "?20,000",
  contact: {
    phones: ["+91 87789 70224", "+91 91765 90993"],
    email: "pointers.csedept@gmail.com",
    website: "pointers-2026.vercel.app",
    instagram: "@pointers_cse"
  },
  conveners: [
    { name: "Mrs. V. Umadevi", role: "HOD (UG), CSE", title: "Convener" },
    { name: "Dr. P. Anandan", role: "HOD (PG), CSE", title: "Convener" }
  ],
  leadStudentCoordinator: {
    name: "A Abdulla",
    year: "IV / CSE",
    role: "Student Coordinator"
  },
  studentCoordinators: [
    "Abdulla A, IV / CSE",
    "Priyanka Gandhi V, IV / CSE",
    "Ranjithkumar K, IV / CSE",
    "Hariharan N, IV / CSE",
    "Sham G, IV / CSE",
    "Karthik M, IV / CSE",
    "Sanjai K, IV / CSE",
    "Abdul Rahaman K, III / CSE",
    "Sakthi S, III / CSE",
    "Abdul Vajith S, IV / CSE",
    "Sameer Basha S, IV / CSE",
    "Hemalatha R, IV / CSE",
    "Kalaimathi S, IV / CSE",
    "Srivarshini B, IV / CSE"
  ],
  organizingCommittee: [
    "Mr. N. Anandhakumar, AP/CSE",
    "Mrs. K. M. Banupriya, AP/CSE",
    "Mrs. R. Kalaivanisree, AP/CSE",
    "Ms. M. Sowndharya, AP/CSE",
    "Mrs. S. Lalitha, AP/CSE",
    "Mrs. S. Maheshwari, AP/CSE",
    "Mrs. P. Nithiya, AP/CSE",
    "Mr. P. Karunanithi, AP/CSE",
    "Mr. K. Neelamegam, AP/CSE",
    "Mr. K. Gowtham, AP/CSE",
    "Mrs. A. Winni De Leo, AP/CSE",
    "Mrs. K. Madhumitha, AP/CSE",
    "Mrs. S. Kanimozhi, AP/CSE"
  ],
  importantDates: [
    { label: "Team Registration Opens", date: "15 September 2026", badge: "OPEN" },
    { label: "Team Registration Deadline", date: "05 October 2026", badge: "CRITICAL" },
    { label: "Team Passkey & Workspace Allocation", date: "07 October 2026", badge: "CONFIRMATION" },
    { label: "Grand 12-Hour Hackathon Launch", date: "09 October 2026", badge: "EVENT DAY" }
  ]
};

export const HACKATHON_THEMES = [
  {
    id: "ai-ml",
    number: "01",
    title: "Artificial Intelligence & Machine Learning",
    shortTitle: "AI & ML",
    iconName: "BrainCircuit",
    description: "Architect intelligent autonomous agents, generative deep learning solutions, computer vision models, or NLP engines that solve industrial problems.",
    registeredTeamsCount: 28,
    sampleChallenges: ["Autonomous Healthcare Diagnostic Agent", "Edge AI for Precision Agriculture", "Real-time Multilingual Sign Translator"],
    color: "#00f0ff"
  },
  {
    id: "iot-smart",
    number: "02",
    title: "Internet of Things & Smart Systems",
    shortTitle: "IoT & Smart Systems",
    iconName: "Cpu",
    description: "Design connected sensor networks, smart urban infrastructure, edge computing nodes, or automated robotics with low-latency telemetry.",
    registeredTeamsCount: 24,
    sampleChallenges: ["Autonomous Grid Load Balancer", "Smart Campus Environmental Monitor", "Industrial Predictive Maintenance Sensor Array"],
    color: "#38bdf8"
  },
  {
    id: "cyber-blockchain",
    number: "03",
    title: "Cybersecurity & Blockchain",
    shortTitle: "Cyber & Blockchain",
    iconName: "ShieldCheck",
    description: "Build tamper-proof decentralized applications, zero-knowledge verification proofs, threat intelligence engines, or quantum-resilient cryptography.",
    registeredTeamsCount: 19,
    sampleChallenges: ["Decentralized Identity & Academic Credential Ledger", "Zero-Trust Mesh Network Guard", "Automated Smart Contract Audit Assistant"],
    color: "#60a5fa"
  },
  {
    id: "data-science",
    number: "04",
    title: "Data Science & Analytics",
    shortTitle: "Data Science",
    iconName: "BarChart3",
    description: "Transform complex big data into actionable intelligence with predictive statistical modeling, time-series forecasting, and interactive visualizations.",
    registeredTeamsCount: 22,
    sampleChallenges: ["Urban Traffic Anomaly Predictor", "Epidemiological Early-Warning Network", "Financial Fraud Detection Engine"],
    color: "#00f0ff"
  },
  {
    id: "green-tech",
    number: "05",
    title: "Sustainable & Green Technology",
    shortTitle: "Green Tech",
    iconName: "Leaf",
    description: "Engineer eco-friendly algorithms, carbon-footprint tracking telemetry, circular economy platforms, and renewable energy optimization systems.",
    registeredTeamsCount: 18,
    sampleChallenges: ["EV Battery Lifecycle & Recycling Optimization", "Microgrid Solar Routing System", "Smart Waste Segregation Automation"],
    color: "#10b981"
  },
  {
    id: "open-innovation",
    number: "06",
    title: "Open Innovation",
    shortTitle: "Open Innovation",
    iconName: "Lightbulb",
    description: "Pioneer unconventional breakthroughs intersecting multiple engineering fields�AR/VR, assistive robotics, fintech, or aerospace computing.",
    registeredTeamsCount: 31,
    sampleChallenges: ["Assistive Bionic Interface", "Disaster Drone Swarm Coordinator", "Cross-Platform Spatial Computing Tool"],
    color: "#ffd700"
  }
];

export const RESEARCH_TRACKS = [];

export const HACKATHON_ROUNDS = [
  {
    id: 1,
    roundNumber: "ROUND 01",
    title: "Problem & Architecture",
    tag: "Ideation & Blueprint",
    timeWindow: "09:30 AM � 11:30 AM",
    durationHours: 2,
    deliverables: [
      "Problem Statement Validation & User Persona",
      "System Architecture Diagram & Component Flow",
      "Tech Stack Feasibility & Data Pipeline Plan"
    ],
    evaluationCriteria: "Originality (30%), Architecture Soundness (40%), Technical Feasibility (30%)",
    statusBadge: "ACTIVE"
  },
  {
    id: 2,
    roundNumber: "ROUND 02",
    title: "PPT + Prototype",
    tag: "Working Implementation",
    timeWindow: "12:00 PM � 03:30 PM",
    durationHours: 3.5,
    deliverables: [
      "Mid-point Working Prototype Demonstration",
      "GitHub Repository with functional commit history",
      "Structured Presentation Deck (PPT/Slides)"
    ],
    evaluationCriteria: "Code Completeness (40%), UI/UX Quality (30%), Innovation (30%)",
    statusBadge: "UPCOMING"
  },
  {
    id: 3,
    roundNumber: "ROUND 03",
    title: "Final Pitch",
    tag: "Grand Presentation & Jury Q&A",
    timeWindow: "05:00 PM � 07:30 PM",
    durationHours: 2.5,
    deliverables: [
      "Live 5-Minute Pitch to the Distinguished Jury",
      "End-to-End Live System Demonstration",
      "3-Minute Rigorous Technical Q&A Defense"
    ],
    evaluationCriteria: "Impact & Scalability (35%), Product Polish (35%), Jury Q&A Performance (30%)",
    statusBadge: "UPCOMING"
  }
];

export const PRIZE_DATA = {
  totalPool: "?20,000",
  tiers: [
    {
      rank: "1st Place",
      title: "Grand Champion",
      cash: "?10,000",
      color: "gold",
      awards: [
        "Exclusive NCORE Championship Golden Trophy",
        "Gold Medal & Certificate of Excellence",
        "Consideration for Peer-Reviewed Journal Publication (Google Scholar indexed)",
        "Direct Incubation Mentorship & Seed Support"
      ]
    },
    {
      rank: "2nd Place",
      title: "First Runner Up",
      cash: "?6,000",
      color: "silver",
      awards: [
        "Silver Medal & Certificate of Distinction",
        "Consideration for Peer-Reviewed Journal Publication",
        "Cloud Credits & Tech Swag Bundle"
      ]
    },
    {
      rank: "3rd Place",
      title: "Second Runner Up",
      cash: "?4,000",
      color: "bronze",
      awards: [
        "Bronze Medal & Certificate of Merit",
        "Special Recognition in Conference Proceedings",
        "POINTERS Developer Gear"
      ]
    }
  ],
  publicationNote: "The Top 3 Papers will be considered for publication in a peer-reviewed journal (Google Scholar indexed); additional publication fees applicable.",
  participationAward: "Every verified participant receives an official, cryptographically signed NCORE Certificate of Participation issued by Arunai Engineering College & POINTERS."
};

export const INITIAL_SCHEDULE = [
  { id: "s1", time: "08:30 AM", title: "Registration & Welcome Kit", round: "Prelim", venue: "CSE Seminar Hall", active: false },
  { id: "s2", time: "09:00 AM", title: "Grand Inauguration & Keynote", round: "Inaugural", venue: "Auditorium", active: false },
  { id: "s3", time: "09:30 AM", title: "ROUND 01: Problem & Architecture Kickoff", round: "Round 1", venue: "Central Computing Lab", active: true },
  { id: "s4", time: "11:30 AM", title: "Round 01 Evaluation & Mentor Checkpoint", round: "Round 1", venue: "Lab 1 & 2", active: false },
  { id: "s5", time: "11:45 AM", title: "Networking & Refreshments Break", round: "Break", venue: "Courtyard Lounge", active: false },
  { id: "s6", time: "12:00 PM", title: "ROUND 02: PPT & Prototype Build Sprint", round: "Round 2", venue: "Central Computing Lab", active: false },
  { id: "s7", time: "01:30 PM", title: "Power Lunch Break", round: "Break", venue: "Dining Hall", active: false },
  { id: "s8", time: "02:15 PM", title: "Intensive Code & Hardware Sprint", round: "Round 2", venue: "Central Computing Lab", active: false },
  { id: "s9", time: "03:30 PM", title: "Round 02 Evaluation & PPT Presentation", round: "Round 2", venue: "Presentation Halls A & B", active: false },
  { id: "s10", time: "04:30 PM", title: "Tea & Final Polish Break", round: "Break", venue: "Courtyard Lounge", active: false },
  { id: "s11", time: "05:00 PM", title: "ROUND 03: Grand Final Pitch & Demo to Jury", round: "Round 3", venue: "Main Auditorium", active: false },
  { id: "s12", time: "07:30 PM", title: "Jury Deliberation & Leaderboard Normalization", round: "Jury", venue: "Conference Boardroom", active: false },
  { id: "s13", time: "08:00 PM", title: "Valedictory & ?20,000 Prize Distribution", round: "Valedictory", venue: "Main Auditorium", active: false }
];

export const INITIAL_JUDGES = [
  {
    id: "j1",
    name: "Dr. Rajesh Subramanian",
    designation: "Principal AI Architect",
    organization: "CloudSphere Technologies",
    expertise: "Autonomous Agents & Deep Learning",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "j2",
    name: "Priya Chandrasekaran",
    designation: "Director of Cyber Defense",
    organization: "CyShield Labs Global",
    expertise: "Cryptographic Systems & Zero Trust",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "j3",
    name: "Vikram Ranganathan",
    designation: "VP of IoT Hardware Engineering",
    organization: "SensorEdge Systems",
    expertise: "Embedded Edge Robotics & Telemetry",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "j4",
    name: "Ananya Sundaram",
    designation: "Lead Research Scientist",
    organization: "Quantum Analytics Institute",
    expertise: "Predictive Big Data Modeling",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_TEAMS = [
  {
    teamId: "NCORE-T101",
    teamName: "NeuralVanguard",
    leaderName: "Kavin Raj",
    leaderEmail: "kavin@example.com",
    college: "Arunai Engineering College",
    domain: "ai-ml",
    domainName: "Artificial Intelligence & Machine Learning",
    projectTitle: "NeuroGuardian: Vision-Based Industrial Safety Autopilot",
    passkey: "NVG-9021-X",
    members: [
      { name: "Kavin Raj", role: "Team Leader (IV / CSE)", pin: "1234" },
      { name: "Divya Prakash", role: "AI Research Lead (IV / CSE)", pin: "2345" },
      { name: "Suresh Kumar", role: "Fullstack Architect (IV / CSE)", pin: "3456" },
      { name: "Ananya Ramesh", role: "Edge ML Specialist (IV / CSE)", pin: "4567" }
    ],
    submission: {
      github: "https://github.com/ncore2026/neural-vanguard",
      demo: "https://neuroguardian.vercel.app",
      techStack: "PyTorch, YOLOv9, FastAPI, WebSockets, React 19",
      abstract: "Autonomous edge vision system monitoring factory hazards in real-time with sub-15ms inference.",
      round1Submitted: true,
      round2Submitted: true,
      round3Submitted: true
    },
    scores: {
      round1: 94,
      round2: 96,
      round3: 98,
      total: 288
    },
    rank: 1
  },
  {
    teamId: "NCORE-T102",
    teamName: "CipherGrid",
    leaderName: "Meera Krishnan",
    leaderEmail: "meera@example.com",
    college: "MIT Chennai",
    domain: "cyber-blockchain",
    domainName: "Cybersecurity & Blockchain",
    projectTitle: "ZkLedger: Zero-Knowledge Verification for Academic Certificates",
    passkey: "CGD-7814-K",
    members: [
      { name: "Meera Krishnan", role: "Team Leader (IV / CSE)", pin: "1122" },
      { name: "Aditya Verma", role: "Cryptography Engineer (IV / IT)", pin: "3344" },
      { name: "Pavithra S", role: "Smart Contract Dev (IV / CSE)", pin: "5566" },
      { name: "Sanjay Manikandan", role: "Security Auditor (IV / IT)", pin: "7788" }
    ],
    submission: {
      github: "https://github.com/ncore2026/zk-ledger",
      demo: "https://zkledger.eth.limo",
      techStack: "Solidity, Circom, SnarkJS, Next.js, IPFS",
      abstract: "Privacy-preserving academic credentials verified instantly via zero-knowledge proofs without exposing student PII.",
      round1Submitted: true,
      round2Submitted: true,
      round3Submitted: true
    },
    scores: {
      round1: 92,
      round2: 94,
      round3: 95,
      total: 281
    },
    rank: 2
  },
  {
    teamId: "NCORE-T103",
    teamName: "AeroPulse",
    leaderName: "Rohan Nair",
    leaderEmail: "rohan@example.com",
    college: "Vellore Institute of Technology",
    domain: "iot-smart",
    domainName: "Internet of Things & Smart Systems",
    projectTitle: "PulseMesh: Self-Healing Drone Mesh for Disaster Zones",
    passkey: "APL-5429-Z",
    members: [
      { name: "Rohan Nair", role: "Team Leader (IV / ECE)", pin: "4455" },
      { name: "Harish Bala", role: "Firmware Architect (IV / CSE)", pin: "6677" },
      { name: "Ananya Iyer", role: "Telemetry Engineer (III / CSE)", pin: "8899" },
      { name: "Karthik Raja", role: "Hardware Interop Dev (IV / ECE)", pin: "9900" }
    ],
    submission: {
      github: "https://github.com/ncore2026/pulse-mesh",
      demo: "https://pulsemesh-telemetry.io",
      techStack: "ESP32, LoRaWAN, Rust, WebAssembly, Leaflet.js",
      abstract: "Decentralized mesh telemetry bridging cellular communication blackouts during severe weather events.",
      round1Submitted: true,
      round2Submitted: true,
      round3Submitted: true
    },
    scores: {
      round1: 90,
      round2: 91,
      round3: 93,
      total: 274
    },
    rank: 3
  },
  {
    teamId: "NCORE-T104",
    teamName: "EcoSphere",
    leaderName: "Haritha Sundar",
    leaderEmail: "haritha@example.com",
    college: "PSG College of Technology",
    domain: "green-tech",
    domainName: "Sustainable & Green Technology",
    projectTitle: "CarbonSense: Automated Microgrid Carbon Balancer",
    passkey: "ECS-3310-M",
    members: [
      { name: "Haritha Sundar", role: "Team Leader (IV / CSE)", pin: "1212" },
      { name: "Vignesh G", role: "IoT Sensor Developer (IV / EEE)", pin: "3434" },
      { name: "Pooja Kumar", role: "Data Visualization Lead (IV / CSE)", pin: "5656" },
      { name: "Arun Balaji", role: "Embedded Systems Engineer (IV / EEE)", pin: "7878" }
    ],
    submission: {
      github: "https://github.com/ncore2026/carbon-sense",
      demo: "https://carbonsense.green",
      techStack: "Python, MQTT, InfluxDB, Grafana, React",
      abstract: "Real-time energy routing between local renewable rooftop solar arrays and industrial battery storage.",
      round1Submitted: true,
      round2Submitted: true,
      round3Submitted: false
    },
    scores: {
      round1: 88,
      round2: 90,
      round3: 0,
      total: 178
    },
    rank: 4
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "a1",
    timestamp: "10:15 AM",
    title: "ROUND 01 CHECKPOINT IN 45 MINUTES",
    message: "All teams must upload their System Architecture diagram and GitHub repository link before 11:30 AM for jury evaluation.",
    type: "CRITICAL",
    active: true
  },
  {
    id: "a2",
    timestamp: "09:30 AM",
    title: "12HRS HACKATHON OFFICIALLY INAUGURATED",
    message: "Hackathon Round 1 has commenced. Access your Team Workspace using your Team ID & Passkey.",
    type: "INFO",
    active: true
  }
];
