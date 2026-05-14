export type Platform =
  | "tiktok"
  | "twitch"
  | "youtube"
  | "instagram"
  | "threads"
  | "x";

export interface SocialSnapshot {
  day: number;
  date: string;
  tiktok: number;
  twitch: number;
  youtube: number;
  instagram: number;
  threads: number;
  x: number;
}

export const PLATFORM_CONFIG: Record<
  Platform,
  {
    label: string;
    color: string;
    logo: string;
    url: string;
    invertOnDark: boolean;
  }
> = {
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    logo: "/logos/youtube.svg",
    url: "https://youtube.com/@jiaweihq",
    invertOnDark: false,
  },
  twitch: {
    label: "Twitch",
    color: "#9146FF",
    logo: "/logos/twitch.svg",
    url: "https://twitch.tv/jiaweihq",
    invertOnDark: false,
  },
  tiktok: {
    label: "TikTok",
    color: "#EE1D52",
    logo: "/logos/tiktok.svg",
    url: "https://tiktok.com/@jiaweihq",
    invertOnDark: false,
  },
  instagram: {
    label: "Instagram",
    color: "#F97316",
    logo: "/logos/instagram.svg",
    url: "https://instagram.com/jiaweihq",
    invertOnDark: true,
  },
  threads: {
    label: "Threads",
    color: "#888888",
    logo: "/logos/threads.svg",
    url: "https://threads.net/@jiaweihq",
    invertOnDark: true,
  },
  x: {
    label: "X",
    color: "#1DA1F2",
    logo: "/logos/x.svg",
    url: "https://x.com/jiaweihq",
    invertOnDark: true,
  },
};

export const PLATFORMS: Platform[] = [
  "youtube",
  "twitch",
  "tiktok",
  "instagram",
  "threads",
  "x",
];

export const socialGrowthData: SocialSnapshot[] = [
  {
    day: 1,
    date: "2026-05-04",
    tiktok: 0,
    twitch: 0,
    youtube: 0,
    instagram: 9,
    threads: 52,
    x: 197,
  },
  {
    day: 2,
    date: "2026-05-05",
    tiktok: 0,
    twitch: 1,
    youtube: 1,
    instagram: 9,
    threads: 52,
    x: 198,
  },
  {
    day: 3,
    date: "2026-05-06",
    tiktok: 7,
    twitch: 3,
    youtube: 1,
    instagram: 11,
    threads: 53,
    x: 199,
  },
  {
    day: 4,
    date: "2026-05-07",
    tiktok: 7,
    twitch: 3,
    youtube: 1,
    instagram: 15,
    threads: 53,
    x: 200,
  },
  {
    day: 5,
    date: "2026-05-08",
    tiktok: 7,
    twitch: 3,
    youtube: 1,
    instagram: 15,
    threads: 53,
    x: 200,
  },
  {
    day: 6,
    date: "2026-05-11",
    tiktok: 8,
    twitch: 5,
    youtube: 13,
    instagram: 21,
    threads: 55,
    x: 198,
  },
  {
    day: 7,
    date: "2026-05-12",
    tiktok: 12,
    twitch: 6,
    youtube: 27,
    instagram: 21,
    threads: 55,
    x: 200,
  },
  {
    day: 8,
    date: "2026-05-13",
    tiktok: 13,
    twitch: 8,
    youtube: 36,
    instagram: 22,
    threads: 55,
    x: 209,
  },
  {
    day: 9,
    date: "2026-05-14",
    tiktok: 16,
    twitch: 8,
    youtube: 38,
    instagram: 24,
    threads: 55,
    x: 211,
  },
];
