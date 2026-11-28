// Everything on /2026 that doesn't come from a live source. Live numbers
// (contributions, blog posts, social growth) are read in app/2026/page.tsx.
// Static numbers below were checked on 27 Nov 2026.

export const HOOK = {
  applied: 3800,
  interviews: 0,
  companies: 1,
  likes: "2.6K",
  href: "https://www.threads.com/@jiaweihq",
};

export interface Milestone {
  id: string;
  kicker: string;
  title: string;
  body: string;
  href?: string;
  // A logo or icon from /public, shown next to the title
  icon?: string;
  // Black logos that need flipping to white in dark mode
  invertDark?: boolean;
}

export const MILESTONES: Milestone[] = [
  {
    id: "graduated",
    kicker: "School's out",
    title: "Graduated with Distinction",
    body: "BSc (Hons) Computing Science from SIT and the University of Glasgow.",
    icon: "/images/icons/Shooting Star.png",
  },
  {
    id: "better-age",
    kicker: "Chapter closed",
    title: "3.5 years as Lead Mobile Developer",
    body: "Wrapped up at Better Age Solutions, shipping a medicine delivery app for Singapore's public hospitals.",
  },
  {
    id: "ceo",
    kicker: "Promoted myself",
    title: "Full-time CEO of A Major",
    body: "My own software studio. Bootstrapped, no outside money.",
    href: "https://amajor.ai",
    icon: "/logos/amajor.svg",
    invertDark: true,
  },
  {
    id: "live",
    kicker: "May 4",
    title: "Went live from zero",
    body: "Started streaming and posting every single day with zero followers.",
    href: "https://youtube.com/@jiaweihq",
    icon: "/logos/youtube.svg",
  },
  {
    id: "block71",
    kicker: "Accepted",
    title: "BLOCK71 Spring 2026 residency",
    body: "Got in with no product. Just an idea people already wanted.",
  },
  {
    id: "ryu",
    kicker: "Oct 29",
    title: "Introduced Ryu to the world",
    body: "Managed infrastructure for AI agents. Bring your own agent, Ryu does everything else.",
    href: "https://ryuhq.com",
    icon: "/logos/ryu.png",
  },
  {
    id: "anthropic",
    kicker: "Official",
    title: "Anthropic partner",
    body: "A Major joined the Claude Partner Network.",
    href: "https://amajor.ai",
    icon: "/logos/claude.svg",
  },
  {
    id: "comebck",
    kicker: "Giving back",
    title: "Mentor for Comebck Pakistan",
    body: "Mentoring the founding cohort, with A Major as the official AI learning partner.",
  },
  {
    id: "grind",
    kicker: "Every day",
    title: "15 hour days, 7 days a week",
    body: "Two dev machines running 24/7 crashed more times than I can count.",
    href: "https://x.com/jiaweing",
    icon: "/images/icons/Fire.png",
  },
];

// GitHub, from the GraphQL API on 27 Nov 2026
export const CODE_STATS = {
  contributions2025: 2045,
  contributionsFallback: 6019,
  pullRequests: 186,
  issues: 272,
  amajorRepos: 99,
  ryuApps: 72,
  models: 400,
  mcpTools: 250,
  ryuStars: 45,
  dropDrawerStars: 207,
};

export const RYU_APPS = [
  "activity",
  "agent-status",
  "app-studio",
  "approvals",
  "autopilot",
  "blueprint",
  "bookmarks",
  "bot-flows",
  "browser",
  "calendar",
  "canvas",
  "chat-broadcast",
  "checks",
  "clips",
  "convert",
  "crm",
  "dashboards",
  "decks",
  "desktop",
  "dictation",
  "drafts",
  "drawesome",
  "expenses",
  "family",
  "feedback-board",
  "finetune",
  "forms",
  "healing",
  "help-center",
  "invoices",
  "learning",
  "life-recorder",
  "mail",
  "meetings",
  "mission-control",
  "monitors",
  "mpp",
  "news",
  "outreach",
  "people",
  "places",
  "predict",
  "projects",
  "pull-requests",
  "quests",
  "reasoning",
  "recipes",
  "reelfarm",
  "research",
  "rlm",
  "rooms",
  "safe-actions",
  "security",
  "simulator",
  "sites",
  "skill-editor",
  "slides",
  "social",
  "subtitles",
  "teams",
  "teleprompter",
  "timeline",
  "token-table",
  "tuition",
  "ugc",
  "video-studio",
  "voice",
  "warmup",
  "webhooks",
  "whatsapp",
  "whiteboard",
  "workflows",
];

// LinkedIn creator analytics, past 365 days, read on 27 Nov 2026
export const LINKEDIN = {
  impressions: 45_486,
  reached: 12_157,
  followers: 2827,
  href: "https://linkedin.com/in/jiaweing",
};

// Threads, last 12 months, from BlackTwist on 28 Nov 2026
export const THREADS = {
  views: 1_379_147,
  likes: 7545,
  href: "https://www.threads.com/@jiaweihq",
};

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@jiaweihq",
  threads: "https://www.threads.com/@jiaweihq",
  x: "https://x.com/jiaweing",
  instagram: "https://instagram.com/jiaweihq",
  tiktok: "https://tiktok.com/@jiaweihq",
} as const;
