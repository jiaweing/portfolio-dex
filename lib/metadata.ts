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
    "Software engineer and designer from Singapore specializing in AI, blockchain, and game development.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jiaweing.com",
  ogImage:
    "https://jiaweing.com/api/og?title=Jia%20Wei%20Ng&subtitle=Software%20Engineer%20%26%20Designer",
  links: {
    twitter: "https://twitter.com/j14wei",
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
  const pageUrl = url ? new URL(url, siteConfig.url) : siteConfig.url;

  // Construct static OG image URL
  // Matches logic in scripts/generate-og.ts: / -> index, /foo/bar -> foo-bar
  let staticOgUrl: string | null = null;
  if (url) {
    const cleanPath =
      url === "/" ? "index" : url.replace(/^\//, "").replace(/\//g, "-");
    staticOgUrl = new URL(`/og/${cleanPath}.png`, siteConfig.url).toString();
  }

  const openGraphImages = [
    ...(staticOgUrl
      ? [
          {
            url: staticOgUrl,
            width: 1200,
            height: 630,
            alt: title || siteConfig.name,
          },
        ]
      : []),
    {
      url: pageImage,
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
      images: [pageImage],
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
  const authorNames = post.authors?.map((author) => author.name) || [
    siteConfig.name,
  ];

  return generateMetadata({
    title: post.title,
    description: post.description,
    image: post.cover,
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date, // Notion doesn't always have distinct modified time for blog posts in this type, using date as fallback
    authors: authorNames,
    tags: post.tags,
    category: "blog",
  });
}

export function generateProjectMetadata(project: Project): Metadata {
  return generateMetadata({
    title: project.title,
    description: project.description,
    image: project.cover,
    url: `/projects/${project.slug}`,
    type: "article", // or website, but projects are like articles/case studies
    category: "project",
    tags: project.techStack,
  });
}

export function generatePageMetadata(page: Page): Metadata {
  return generateMetadata({
    title: page.title,
    description: page.description,
    image: page.cover,
    url: `/${page.slug}`, // Assuming generic pages are at root or need adjustment based on route
    modifiedTime: page.lastEdited,
  });
}
