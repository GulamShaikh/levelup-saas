// Realistic placeholder data for the LevelUp platform.

export const currentUser = {
  id: "u_001",
  name: "Aarav Mehta",
  email: "aarav.mehta@levelup.events",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav%20Mehta&backgroundColor=1F2A5A&textColor=ffffff",
  role: "Student Ambassador",
  university: "IIT Bombay",
  year: "Third Year · Computer Science",
  bio: "Building communities, shipping side-projects, and learning out loud.",
  joinedAt: "2024-08-12",
  contributionScore: 1480,
  level: 7,
  xpToNext: 320,
  xpInLevel: 680,
};

export const stats = {
  eventsParticipated: 24,
  projectsBuilt: 9,
  achievements: 17,
  coursesCompleted: 12,
  discordPromotions: 3,
  certificates: 8,
};

export type EventItem = {
  id: string;
  title: string;
  category: "Workshop" | "Hackathon" | "Meetup" | "Bootcamp" | "Talk";
  date: string;
  time: string;
  location: string;
  mode: "Online" | "In-person" | "Hybrid";
  host: string;
  seats: number;
  filled: number;
  cover: string;
  description: string;
  status: "upcoming" | "registered" | "past" | "wishlist";
  tags: string[];
};

const eventCovers = [
  "linear-gradient(135deg,#1F2A5A,#3b4bb0)",
  "linear-gradient(135deg,#8BC34A,#B7E081)",
  "linear-gradient(135deg,#1F2A5A,#8BC34A)",
  "linear-gradient(135deg,#0f172a,#1F2A5A)",
  "linear-gradient(135deg,#B7E081,#1F2A5A)",
];

export const events: EventItem[] = [
  { id: "e_101", title: "Build Your First AI Agent with LangChain", category: "Workshop", date: "2026-06-28", time: "18:00", location: "Bengaluru · Koramangala", mode: "Hybrid", host: "Priya Raman", seats: 120, filled: 98, cover: eventCovers[0], description: "A hands-on session covering agentic workflows, tool use, memory and shipping a chat agent end-to-end.", status: "upcoming", tags: ["AI", "Python", "Beginner"] },
  { id: "e_102", title: "LevelUp Summer Hackathon 2026", category: "Hackathon", date: "2026-07-12", time: "09:00", location: "Online", mode: "Online", host: "Rohan Kapoor", seats: 500, filled: 412, cover: eventCovers[1], description: "48 hours, four tracks, ₹5 lakh in prizes. Build something people actually want to use.", status: "registered", tags: ["Hackathon", "Prizes", "Team"] },
  { id: "e_103", title: "From Side Project to Startup — Founder Q&A", category: "Talk", date: "2026-06-30", time: "19:30", location: "Online", mode: "Online", host: "Ananya Iyer", seats: 1000, filled: 643, cover: eventCovers[2], description: "Three founders share how their college projects turned into funded startups.", status: "registered", tags: ["Startup", "Career"] },
  { id: "e_104", title: "Full-Stack TypeScript Bootcamp", category: "Bootcamp", date: "2026-07-22", time: "10:00", location: "Hyderabad · HITEC City", mode: "In-person", host: "Vikram Shetty", seats: 60, filled: 47, cover: eventCovers[3], description: "Four-day intensive on Next.js, tRPC, Postgres and shipping to production.", status: "upcoming", tags: ["TypeScript", "Web", "Intermediate"] },
  { id: "e_105", title: "Design Systems for Engineers", category: "Workshop", date: "2026-06-15", time: "17:00", location: "Online", mode: "Online", host: "Meera Joshi", seats: 200, filled: 200, cover: eventCovers[4], description: "Why teams adopt design systems, and how to build one inside an existing codebase.", status: "past", tags: ["Design", "Frontend"] },
  { id: "e_106", title: "Open Source Contribution Sprint", category: "Meetup", date: "2026-05-30", time: "11:00", location: "Pune · College of Engineering", mode: "In-person", host: "Karan Bhatia", seats: 80, filled: 72, cover: eventCovers[0], description: "Pair up, pick an issue, ship a PR. Mentors from popular OSS projects on site.", status: "past", tags: ["Open Source", "Git"] },
  { id: "e_107", title: "Product Thinking for Student Builders", category: "Talk", date: "2026-07-05", time: "18:00", location: "Online", mode: "Online", host: "Sneha Pillai", seats: 800, filled: 311, cover: eventCovers[2], description: "How to validate problems, scope MVPs and avoid building things nobody wants.", status: "wishlist", tags: ["Product", "Career"] },
  { id: "e_108", title: "DevOps Essentials with Docker & Kubernetes", category: "Workshop", date: "2026-08-02", time: "16:00", location: "Hybrid · Chennai", mode: "Hybrid", host: "Arjun Nair", seats: 150, filled: 88, cover: eventCovers[3], description: "From your laptop to a cluster — containers, orchestration and CI/CD.", status: "wishlist", tags: ["DevOps", "Cloud"] },
];

export type Project = {
  id: string;
  name: string;
  summary: string;
  status: "Live" | "In Progress" | "Archived";
  stack: string[];
  github: string;
  demo: string;
  stars: number;
  updatedAt: string;
};

export const projects: Project[] = [
  { id: "p_201", name: "Notes.ai", summary: "AI-assisted lecture notes with semantic search across your entire semester.", status: "Live", stack: ["Next.js", "tRPC", "Postgres", "OpenAI"], github: "github.com/aaravm/notes-ai", demo: "notes-ai.vercel.app", stars: 142, updatedAt: "2026-06-10" },
  { id: "p_202", name: "Campus Pulse", summary: "Realtime dashboard for student club events, attendance and feedback.", status: "Live", stack: ["React", "Firebase", "Tailwind"], github: "github.com/aaravm/campus-pulse", demo: "campuspulse.in", stars: 87, updatedAt: "2026-05-22" },
  { id: "p_203", name: "Inkwell", summary: "A markdown-first journaling app with daily prompts and mood tracking.", status: "In Progress", stack: ["SvelteKit", "SQLite"], github: "github.com/aaravm/inkwell", demo: "—", stars: 34, updatedAt: "2026-06-18" },
  { id: "p_204", name: "Quanta", summary: "Visual algorithms playground used by 4 universities for intro CS courses.", status: "Live", stack: ["React", "D3", "TypeScript"], github: "github.com/aaravm/quanta", demo: "quanta.dev", stars: 261, updatedAt: "2026-04-02" },
  { id: "p_205", name: "Mess Menu", summary: "Weekly mess menu PWA with ratings and dietary filters. Archived after graduation handoff.", status: "Archived", stack: ["Vue", "Supabase"], github: "github.com/aaravm/mess-menu", demo: "—", stars: 19, updatedAt: "2025-12-11" },
  { id: "p_206", name: "PaperTrail", summary: "Citation tracker for research papers with collaborative annotations.", status: "In Progress", stack: ["Remix", "Postgres", "Prisma"], github: "github.com/aaravm/papertrail", demo: "papertrail.io", stars: 56, updatedAt: "2026-06-19" },
];

export type Achievement = {
  id: string;
  title: string;
  type: "Certificate" | "Funding" | "Scholarship" | "Award" | "Recognition";
  issuer: string;
  date: string;
  description: string;
};

export const achievements: Achievement[] = [
  { id: "a_301", title: "Winner — LevelUp Winter Hackathon 2025", type: "Award", issuer: "LevelUp Events", date: "2025-12-20", description: "First place across 312 teams for Notes.ai." },
  { id: "a_302", title: "Google Summer of Code 2025", type: "Recognition", issuer: "Google Open Source", date: "2025-05-04", description: "Contributor to the Rust Foundation, mentored by Carol Nichols." },
  { id: "a_303", title: "Inlaks Shivdasani Scholarship", type: "Scholarship", issuer: "Inlaks Foundation", date: "2025-08-15", description: "Awarded ₹4,00,000 for academic excellence and community work." },
  { id: "a_304", title: "Seed Grant — Campus Pulse", type: "Funding", issuer: "Sequoia Surge", date: "2026-02-10", description: "Received $25,000 in pre-seed funding through the Surge Scout program." },
  { id: "a_305", title: "AWS Cloud Practitioner", type: "Certificate", issuer: "Amazon Web Services", date: "2025-09-28", description: "Foundational AWS certification." },
  { id: "a_306", title: "Meta Frontend Developer Professional Certificate", type: "Certificate", issuer: "Meta · Coursera", date: "2025-11-12", description: "Nine-course program covering React, UX and accessibility." },
  { id: "a_307", title: "Community Builder of the Quarter", type: "Recognition", issuer: "LevelUp Events", date: "2026-03-31", description: "Recognized for organizing 6 events with 1,200+ attendees." },
];

export type Course = {
  id: string;
  title: string;
  provider: string;
  hours: number;
  progress: number;
  skills: string[];
  completedAt?: string;
};

export const courses: Course[] = [
  { id: "c_401", title: "CS50's Introduction to Computer Science", provider: "Harvard · edX", hours: 100, progress: 100, skills: ["C", "Python", "SQL", "Algorithms"], completedAt: "2024-12-15" },
  { id: "c_402", title: "Designing Data-Intensive Applications", provider: "O'Reilly Learning", hours: 28, progress: 100, skills: ["Distributed Systems", "Databases"], completedAt: "2025-04-02" },
  { id: "c_403", title: "Full-Stack Open 2025", provider: "University of Helsinki", hours: 130, progress: 78, skills: ["React", "Node", "GraphQL", "TypeScript"] },
  { id: "c_404", title: "Machine Learning Specialization", provider: "DeepLearning.AI", hours: 60, progress: 64, skills: ["ML", "NumPy", "TensorFlow"] },
  { id: "c_405", title: "Rust for Rustaceans", provider: "No Starch Press", hours: 22, progress: 100, skills: ["Rust", "Systems Programming"], completedAt: "2025-09-30" },
  { id: "c_406", title: "Product Management Fundamentals", provider: "Reforge", hours: 18, progress: 42, skills: ["Discovery", "Roadmapping"] },
];

export type DiscordRole = { id: string; name: string; color: string; awardedAt: string; description: string };
export const discordRoles: DiscordRole[] = [
  { id: "r_1", name: "Core Contributor", color: "#1F2A5A", awardedAt: "2026-01-12", description: "Top 1% of community by helpful answers." },
  { id: "r_2", name: "Event Crew", color: "#8BC34A", awardedAt: "2025-10-04", description: "Organized 3+ official LevelUp events." },
  { id: "r_3", name: "Hackathon Winner", color: "#B7E081", awardedAt: "2025-12-21", description: "Won a featured LevelUp hackathon." },
  { id: "r_4", name: "Mentor", color: "#64748B", awardedAt: "2026-03-01", description: "Verified mentor for new students." },
];

export const promotionTimeline = [
  { date: "2024-08-12", title: "Joined LevelUp Discord", detail: "Started as Member" },
  { date: "2024-11-04", title: "Promoted to Active Member", detail: "50+ helpful messages, 5 events attended" },
  { date: "2025-04-19", title: "Promoted to Event Crew", detail: "Helped organize Spring Bootcamp" },
  { date: "2025-12-21", title: "Earned Hackathon Winner", detail: "Notes.ai took 1st place" },
  { date: "2026-01-12", title: "Promoted to Core Contributor", detail: "Top 1% engagement for Q4 2025" },
  { date: "2026-03-01", title: "Verified as Mentor", detail: "Onboarded 12 new students" },
];

export type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  type: "event" | "achievement" | "community" | "system";
};

export const notifications: Notification[] = [
  { id: "n_1", title: "Your hackathon team is confirmed", detail: "Team 'Indigo' for LevelUp Summer Hackathon 2026.", time: "12 min ago", read: false, type: "event" },
  { id: "n_2", title: "New certificate available", detail: "Meta Frontend Developer is ready to download.", time: "2 hours ago", read: false, type: "achievement" },
  { id: "n_3", title: "You were promoted in Discord", detail: "Welcome to Core Contributor — new perks unlocked.", time: "Yesterday", read: true, type: "community" },
  { id: "n_4", title: "Event reminder: Build Your First AI Agent", detail: "Starts in 2 days at 6:00 PM.", time: "Yesterday", read: true, type: "event" },
  { id: "n_5", title: "Profile 92% complete", detail: "Add your social links to reach 100%.", time: "2 days ago", read: true, type: "system" },
];

// Charts
export const userGrowth = [
  { month: "Jan", users: 1240 }, { month: "Feb", users: 1520 }, { month: "Mar", users: 1880 },
  { month: "Apr", users: 2310 }, { month: "May", users: 2760 }, { month: "Jun", users: 3420 },
];
export const eventParticipation = [
  { month: "Jan", registered: 420, attended: 360 }, { month: "Feb", registered: 510, attended: 442 },
  { month: "Mar", registered: 690, attended: 580 }, { month: "Apr", registered: 720, attended: 612 },
  { month: "May", registered: 830, attended: 715 }, { month: "Jun", registered: 980, attended: 861 },
];
export const completionByCategory = [
  { category: "Workshops", rate: 88 }, { category: "Bootcamps", rate: 72 },
  { category: "Hackathons", rate: 94 }, { category: "Courses", rate: 64 }, { category: "Talks", rate: 81 },
];

export type AdminUser = { id: string; name: string; email: string; role: string; university: string; status: "Active" | "Invited" | "Suspended"; joinedAt: string; events: number; };
export const adminUsers: AdminUser[] = [
  { id: "u_001", name: "Aarav Mehta", email: "aarav.mehta@levelup.events", role: "Student Ambassador", university: "IIT Bombay", status: "Active", joinedAt: "2024-08-12", events: 24 },
  { id: "u_002", name: "Diya Sharma", email: "diya.sharma@levelup.events", role: "Member", university: "BITS Pilani", status: "Active", joinedAt: "2025-01-04", events: 11 },
  { id: "u_003", name: "Kabir Anand", email: "kabir.anand@levelup.events", role: "Mentor", university: "IIIT Hyderabad", status: "Active", joinedAt: "2024-11-23", events: 32 },
  { id: "u_004", name: "Ishita Verma", email: "ishita.verma@levelup.events", role: "Member", university: "Delhi University", status: "Invited", joinedAt: "2026-06-18", events: 0 },
  { id: "u_005", name: "Neel Patel", email: "neel.patel@levelup.events", role: "Event Crew", university: "NIT Trichy", status: "Active", joinedAt: "2025-03-30", events: 18 },
  { id: "u_006", name: "Sana Khan", email: "sana.khan@levelup.events", role: "Member", university: "VIT Vellore", status: "Suspended", joinedAt: "2025-07-12", events: 3 },
  { id: "u_007", name: "Rahul Iyer", email: "rahul.iyer@levelup.events", role: "Mentor", university: "IIT Madras", status: "Active", joinedAt: "2024-09-09", events: 27 },
  { id: "u_008", name: "Tara Joshi", email: "tara.joshi@levelup.events", role: "Member", university: "Manipal Institute", status: "Active", joinedAt: "2025-02-17", events: 9 },
];

export const auditLog = [
  { id: "l_1", actor: "admin@levelup.events", action: "Created event", target: "LevelUp Summer Hackathon 2026", at: "2026-06-20 14:32" },
  { id: "l_2", actor: "kabir.anand@levelup.events", action: "Updated user role", target: "neel.patel → Event Crew", at: "2026-06-19 11:08" },
  { id: "l_3", actor: "admin@levelup.events", action: "Exported CSV", target: "Registrations · June 2026", at: "2026-06-19 09:45" },
  { id: "l_4", actor: "admin@levelup.events", action: "Suspended user", target: "sana.khan@levelup.events", at: "2026-06-18 17:20" },
  { id: "l_5", actor: "priya.raman@levelup.events", action: "Published course", target: "Build Your First AI Agent", at: "2026-06-17 10:02" },
];
