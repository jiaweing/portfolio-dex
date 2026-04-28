import type { MetadataRoute } from "next";
import { getBlogPosts, getPages, getProjects } from "@/lib/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jiaweing.com";

  const [pages, projects, posts] = await Promise.all([
    getPages(),
    getProjects(),
    getBlogPosts(),
  ]);

  const pageUrls = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(page.lastEdited),
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.lastEdited ?? "2025-01-01"),
  }));

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastEdited ?? post.date),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date("2025-01-01"),
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2025-01-01"),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: posts[0]?.date
        ? new Date(posts[0].date)
        : new Date("2025-01-01"),
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date("2025-01-01"),
    },
    {
      url: `${baseUrl}/setup`,
      lastModified: new Date("2025-01-01"),
    },
    {
      url: `${baseUrl}/contributions`,
      lastModified: new Date("2025-01-01"),
    },
    {
      url: `${baseUrl}/wrapped`,
      lastModified: new Date("2025-01-01"),
    },
    ...pageUrls,
    ...projectUrls,
    ...postUrls,
  ];
}
