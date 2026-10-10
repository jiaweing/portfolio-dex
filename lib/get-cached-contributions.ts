import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/contribution-graph";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

const fetchContributions = unstable_cache(
  async (username: string, year = "last") => {
    const res = await fetch(
      `${process.env.GITHUB_CONTRIBUTIONS_API_URL || "https://github-contributions-api.jogruber.de"}/v4/${username}?y=${year}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) {
      throw new Error(`Contributions API responded ${res.status}`);
    }
    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions;
  },
  ["github-contributions"],
  { revalidate: 86_400 }
);

// Failures are thrown inside the cache so they are not stored, then turned
// into an empty graph here so a flaky API never takes down the page
export const getCachedContributions = (
  username: string,
  year?: string
): Promise<Activity[]> =>
  fetchContributions(username, year).catch((error) => {
    console.error("Failed to load GitHub contributions", error);
    return [];
  });
