"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectContent } from "@/components/ProjectContent";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { FadeIn } from "@/components/ui/fade-in";
import type { Project } from "@/lib/notion";

interface ProjectsGalleryProps {
  projects: (Project & { blocks: BlockObjectResponse[] })[];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  // Sort projects by year descending
  const sortedProjects = [...projects].sort((a, b) => {
    return Number.parseInt(b.year || "0") - Number.parseInt(a.year || "0");
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedProjects.map((project, index) => (
        <FadeIn delay={index * 0.05} key={project.id}>
          <Credenza>
            <CredenzaTrigger asChild>
              <motion.div
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 transition-all hover:bg-zinc-900"
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
                    <div className="flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground">
                      {project.title}
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-60 transition-opacity group-hover:opacity-80" />
                </div>

                {/* Top Content: Logo, Title, Year, Link */}
                <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
                  <div className="flex items-center gap-3">
                    {project.logo && (
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg backdrop-blur-sm">
                        <Image
                          alt={`${project.title} logo`}
                          className="h-full w-full object-cover"
                          fill
                          sizes="40px"
                          src={project.logo}
                        />
                      </div>
                    )}
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
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
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
                      <BadgePill
                        color={badge.color}
                        key={i}
                        name={badge.name}
                      />
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
            </CredenzaTrigger>
            <CredenzaContent className="min-w-[90vw] bg-background/80 backdrop-blur-md md:min-w-[700px] lg:min-w-[900px]">
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
      ))}
    </div>
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
