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
                {/* Image */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="font-medium text-lg text-white tracking-tight">
                    {project.title}
                  </p>
                  {project.year && (
                    <p className="font-mono text-[10px] text-white/50">
                      {project.year}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-2 text-white/70 text-xs">
                    {project.description}
                  </p>
                  <div className="mt-3 flex hidden flex-wrap gap-1.5 group-hover:flex">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span
                        className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm"
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack && project.techStack.length > 3 && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                        +{project.techStack.length - 3}
                      </span>
                    )}
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
