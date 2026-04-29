import type { Metadata } from "next";
import type { BlogPost, Page, Project } from "@/lib/notion";

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Jia Wei Ng",
  description:
    "Jia Wei Ng — founder, designer & engineer in Singapore. CEO at amajor.ai (AI agents), co-founder of ryu. Google APAC Top 1 Singapore 2025.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jiaweing.com",
  ogImage: "https://jiaweing.com/og/index.png",
  links: {
    twitter: "https://twitter.com/jiaweihq",
    github: "https://github.com/jiaweing",
  },
};

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  category?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  crawlDelay?: number;
}

export function generateMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description,
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    tags,
    category,
    noIndex,
    noFollow,
    crawlDelay,
  } = options;

  // When using a template in layout.tsx, we should pass the raw title
  const pageTitle = title || siteConfig.name;

  const pageDescription = description || siteConfig.description;
  const pageImage = image || siteConfig.ogImage;
  const pageUrl =
    url === "/"
      ? siteConfig.url
      : url
        ? new URL(url, siteConfig.url)
        : siteConfig.url;

  // Construct static OG image URL from public/og folder
  // Matches logic in scripts/generate-og.ts: / -> index, /foo/bar -> foo-bar
  const staticOgPath = url
    ? url === "/"
      ? "index"
      : url.replace(/^\//, "").replace(/\//g, "-")
    : "index";
  const staticOgUrl = new URL(
    `/og/${staticOgPath}.png`,
    siteConfig.url
  ).toString();

  // Use: explicit image > static pre-generated > dynamic API fallback
  const dynamicOgUrl = new URL("/api/og", siteConfig.url);
  dynamicOgUrl.searchParams.set("title", pageTitle);
  if (description) dynamicOgUrl.searchParams.set("subtitle", description);
  if (type === "article")
    dynamicOgUrl.searchParams.set(
      "type",
      url?.startsWith("/blog") ? "blog" : "project"
    );

  const ogImageUrl = image || staticOgUrl;

  const openGraphImages = [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: title || siteConfig.name,
    },
  ];

  return {
    title, // Next.js will apply the template from layout.tsx
    description: pageDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: openGraphImages,
      locale: "en_US",
      type,
      publishedTime,
      modifiedTime,
      authors,
      tags,
      section: category,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
      creator: siteConfig.links.twitter.replace("https://twitter.com/", "@"),
    },
    robots: {
      index: noIndex !== true,
      follow: noFollow !== true,
      googleBot: {
        index: noIndex !== true,
        follow: noFollow !== true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      ...(crawlDelay && { crawlDelay }),
    },
    other: {
      ...(publishedTime && { "article:published_time": publishedTime }),
      ...(modifiedTime && { "article:modified_time": modifiedTime }),
    },
  };
}

export function generateBlogMetadata(post: BlogPost): Metadata {
  const authorNames = [siteConfig.name];

  const dynamicOg = new URL("/api/og", siteConfig.url);
  dynamicOg.searchParams.set("title", post.title);
  dynamicOg.searchParams.set("type", "blog");
  if (post.description)
    dynamicOg.searchParams.set("subtitle", post.description);

  return generateMetadata({
    title: post.title,
    description: post.description,
    image: post.cover
      ? `${siteConfig.url}/api/notion-image?pageId=${post.id}&prop=cover`
      : dynamicOg.toString(),
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.lastEdited ?? post.date,
    authors: authorNames,
    tags: post.tags,
    category: "blog",
  });
}

export function generateProjectMetadata(project: Project): Metadata {
  const dynamicOg = new URL("/api/og", siteConfig.url);
  dynamicOg.searchParams.set("title", project.title);
  dynamicOg.searchParams.set("type", "project");
  if (project.description)
    dynamicOg.searchParams.set("subtitle", project.description);

  return generateMetadata({
    title: project.title,
    description: project.description,
    image: project.cover
      ? `${siteConfig.url}/api/notion-image?pageId=${project.id}&prop=cover`
      : dynamicOg.toString(),
    url: `/projects/${project.slug}`,
    type: "article",
    category: "project",
    tags: project.techStack,
  });
}

export function generatePageMetadata(page: Page): Metadata {
  return generateMetadata({
    title: page.title,
    description: page.description,
    image: page.cover
      ? `${siteConfig.url}/api/notion-image?pageId=${page.id}&prop=cover`
      : undefined,
    url: `/${page.slug}`, // Assuming generic pages are at root or need adjustment based on route
    modifiedTime: page.lastEdited,
  });
}
