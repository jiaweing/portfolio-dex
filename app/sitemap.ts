import profileData from "@/data/profile.json";
import { getBlogPosts } from "@/lib/notion";
import { MetadataRoute } from "next";

interface OpenSourceProject {
  name: string;
  url: string;
  description: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jiaweing.com";
  const currentDate = new Date();

  // Main page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    // Add potential future pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Add all project URLs from profile data
  if (profileData.opensource) {
    profileData.opensource.forEach((project: OpenSourceProject) => {
      if (
        project.url &&
        project.url.startsWith("https://github.com/jiaweing")
      ) {
        routes.push({
          url: project.url,
          lastModified: currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    });
  }

  // Add social profiles for better discoverability
  const socialProfiles = [
    "https://github.com/jiaweing",
    "https://www.linkedin.com/in/jiaweing/",
    "https://x.com/j14wei",
  ];

  socialProfiles.forEach((profile) => {
    routes.push({
      url: profile,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    });
  });

  // Add blog posts
  const posts = await getBlogPosts();
  posts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  });

  return routes;
}
