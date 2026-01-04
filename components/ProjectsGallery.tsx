"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { GenerativeGradient } from "@/components/GenerativeGradient";
import { ProjectContent } from "@/components/ProjectContent";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { FadeIn } from "@/components/ui/fade-in";
import { GithubDark } from "@/components/ui/svgs/githubDark";
import type { Project } from "@/lib/notion";

interface ProjectsGalleryProps {
  projects: (Project & { blocks: BlockObjectResponse[] })[];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  // Sort projects by year descending
  const sortedProjects = [...projects].sort((a, b) => {
    return Number.parseInt(b.year || "0") - Number.parseInt(a.year || "0");
  });

  // Define status order
  const STATUS_ORDER = ["Active", "Paused", "Past", "Cancelled", "Open Source"];

  console.log(
    "ProjectsGallery received projects:",
    projects.map((p) => ({ title: p.title, status: p.status }))
  );

  // Group projects by status
  const groupedProjects = STATUS_ORDER.reduce(
    (acc, status) => {
      const projectsInStatus = sortedProjects.filter(
        (p) => p.status?.toLowerCase() === status.toLowerCase()
      );
      if (projectsInStatus.length > 0) {
        acc[status] = projectsInStatus;
      }
      return acc;
    },
    {} as Record<string, typeof projects>
  );

  // Handle unmatched projects
  const otherProjects = sortedProjects.filter(
    (p) =>
      !STATUS_ORDER.some(
        (s) => s.toLowerCase() === (p.status || "").toLowerCase()
      )
  );

  return (
    <div className="flex flex-col gap-12">
      {STATUS_ORDER.map((status) => {
        const projectsInGroup = groupedProjects[status];
        if (!projectsInGroup) return null;

        return (
          <div className="flex flex-col gap-6" key={status}>
            <h2 className="px-1 pl-4 font-medium text-2xl text-muted-foreground">
              {status}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projectsInGroup.map((project, index) => (
                <ProjectCard index={index} key={project.id} project={project} />
              ))}
            </div>
          </div>
        );
      })}

      {otherProjects.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="px-1 pl-4 font-medium text-2xl text-muted-foreground">
            Other
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {otherProjects.map((project, index) => (
              <ProjectCard index={index} key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project & { blocks: BlockObjectResponse[] };
  index: number;
}) {
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Favicon error state
  const [faviconError, setFaviconError] = useState(false);

  // Spring configuration for smooth animation
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-10, 10]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPos = (event.clientX - rect.left) / rect.width - 0.5;
    const yPos = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <FadeIn delay={index * 0.05} key={project.id}>
      <Credenza>
        <CredenzaTrigger asChild>
          <div style={{ perspective: 1000 }}>
            <motion.div
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-zinc-900/50 transition-colors hover:bg-zinc-900 dark:border-white/10"
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {project.cover ? (
                  <Image
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    src={project.cover}
                  />
                ) : (
                  <GenerativeGradient title={project.title} />
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-60 transition-opacity group-hover:opacity-80" />
              </div>

              {/* Top Content: Logo, Title, Year, Link */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
                <div className="flex items-center gap-3">
                  {project.logo ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg backdrop-blur-sm">
                      <Image
                        alt={`${project.title} logo`}
                        className="h-full w-full object-cover"
                        fill
                        sizes="40px"
                        src={project.logo}
                      />
                    </div>
                  ) : project.github ? (
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm">
                      <GithubDark className="h-6 w-6" />
                    </div>
                  ) : project.url && !faviconError ? (
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm">
                      <div className="relative h-6 w-6">
                        <Image
                          alt={`${project.title} favicon`}
                          className="object-cover"
                          fill
                          onError={() => setFaviconError(true)}
                          sizes="24px"
                          src={`https://unavatar.io/${new URL(project.url).hostname}?fallback=false`}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex flex-col">
                    <h3 className="font-medium text-lg text-white leading-tight">
                      {project.title}
                    </h3>
                    {project.year && (
                      <p className="font-mono text-white/70 text-xs">
                        {project.year}
                      </p>
                    )}
                  </div>
                </div>

                {project.url && (
                  <a
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-transform duration-100 hover:scale-110"
                    href={project.url}
                    onClick={(e) => e.stopPropagation()}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="7" x2="17" y1="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Bottom Content: Description & Badges */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-left">
                <p className="mb-3 line-clamp-3 font-medium text-sm text-white/90 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.badges?.map((badge, i) => (
                    <BadgePill color={badge.color} key={i} name={badge.name} />
                  ))}
                  {!project.badges?.length &&
                    project.techStack?.slice(0, 3).map((tech) => (
                      <span
                        className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm"
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </CredenzaTrigger>
        <CredenzaContent className="min-w-[90vw] rounded-3xl bg-background/80 backdrop-blur-md md:min-w-[700px] lg:min-w-[900px]">
          <CredenzaHeader className="hidden">
            <CredenzaTitle>{project.title}</CredenzaTitle>
          </CredenzaHeader>
          <div className="max-h-[80vh] overflow-y-auto p-4 md:p-6">
            <ProjectContent
              blocks={project.blocks}
              project={project}
              showHeader={true}
              showLink={true}
            />
          </div>
        </CredenzaContent>
      </Credenza>
    </FadeIn>
  );
}

function BadgePill({ name, color }: { name: string; color: string }) {
  const colorMap: Record<string, string> = {
    default: "bg-white/20 text-white",
    gray: "bg-zinc-500/20 text-zinc-200",
    brown: "bg-orange-900/40 text-orange-200",
    orange: "bg-orange-500/20 text-orange-200",
    yellow: "bg-yellow-500/20 text-yellow-200",
    green: "bg-green-500/20 text-green-200",
    blue: "bg-blue-500/20 text-blue-200",
    purple: "bg-purple-500/20 text-purple-200",
    pink: "bg-pink-500/20 text-pink-200",
    red: "bg-red-500/20 text-red-200",
  };

  const colorClass = colorMap[color] || colorMap.default;

  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-medium text-xs backdrop-blur-sm ${colorClass}`}
    >
      {name}
    </span>
  );
}
