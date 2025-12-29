import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  ArrowRight01Icon as ArrowRight,
  LinkSquare02Icon as ExternalLink,
} from "hugeicons-react";
import Link from "next/link";
import { NotionRenderer } from "@/components/markdown-renderer";
import ProjectGallery from "@/components/project-gallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeIn } from "@/components/ui/fade-in";
import type { Project } from "@/lib/notion";

interface ProjectContentProps {
  project: Project;
  blocks: BlockObjectResponse[];
  showHeader?: boolean;
  showLink?: boolean;
}

export function ProjectContent({
  project,
  blocks,
  showHeader = true,
  showLink = false,
}: ProjectContentProps) {
  return (
    <div className="space-y-8">
      {/* Title and Date */}
      {showHeader && (
        <div className="space-y-4">
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="font-medium text-3xl tracking-tight md:text-4xl">
                    {project.title}
                  </h1>
                  {project.logo && (
                    <Avatar className="size-12 rounded-xl border border-white/10 bg-zinc-900/50">
                      <AvatarImage
                        alt={project.title}
                        className="object-cover"
                        src={project.logo}
                      />
                      <AvatarFallback>{project.title[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <span className="text-muted-foreground">{project.year}</span>
              </div>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.2}>
            <div className="text-foreground/90 leading-relaxed">
              {project.description}
            </div>
          </FadeIn>
        </div>
      )}

      <div className="flex flex-row items-center justify-between">
        {/* Links */}
        <FadeIn delay={0.45}>
          <div className="flex items-center gap-4 pt-2">
            {project.url && (
              <a
                className="inline-flex items-center gap-2 font-medium text-primary text-sm hover:underline"
                href={project.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4 w-4" />
                Website
              </a>
            )}

            {project.github && (
              <a
                className="inline-flex items-center gap-2 font-medium text-primary text-sm hover:underline"
                href={project.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
            )}

            {showLink && project.slug && (
              <Link
                className="inline-flex items-center gap-2 font-medium text-primary text-sm hover:underline"
                href={`/projects/${project.slug}`}
              >
                <ArrowRight className="h-4 w-4" />
                View Project
              </Link>
            )}
          </div>
        </FadeIn>

        {/* Technologies */}
        {project.techStack && project.techStack.length > 0 && (
          <FadeIn delay={0.4}>
            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    className="inline-flex items-center rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground text-sm"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Header Image & Gallery */}
      {(project.cover ||
        (project.screenshots && project.screenshots.length > 0)) && (
        <FadeIn delay={0.3}>
          <ProjectGallery
            images={[project.cover, ...(project.screenshots || [])].filter(
              (img): img is string => !!img
            )}
          />
        </FadeIn>
      )}

      {/* Markdown Content */}
      {blocks && blocks.length > 0 && (
        <FadeIn delay={0.5}>
          <div className="mt-12">
            <NotionRenderer blocks={blocks} />
          </div>
        </FadeIn>
      )}
    </div>
  );
}
