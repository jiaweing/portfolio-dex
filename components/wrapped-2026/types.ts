export interface Day {
  date: string;
  count: number;
  level: number;
}

export interface PostTitle {
  title: string;
  slug: string;
}

export interface SocialSeries {
  key: "youtube" | "threads" | "x" | "instagram" | "tiktok";
  label: string;
  icon: string;
  // Black logos that need flipping to white on the night print
  invertDark?: boolean;
  href: string;
  // Follower counts, one a week, oldest first
  values: number[];
}

export interface WrappedData {
  days: Day[];
  posts: PostTitle[];
  postTotal: number;
  perMonth: number[];
  social: SocialSeries[];
  socialSince: string;
}
