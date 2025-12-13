import { NotionRenderer } from "@/components/markdown-renderer";
import ProjectGallery from "@/components/project-gallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeIn } from "@/components/ui/fade-in";
import { Project } from "@/lib/notion";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  ArrowRight01Icon as ArrowRight,
  LinkSquare02Icon as ExternalLink,
} from "hugeicons-react";
import Link from "next/link";

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
                  <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
                    {project.title}
                  </h1>
                  {project.logo && (
                    <Avatar className="size-12 rounded-xl border border-white/10 bg-zinc-900/50">
                      <AvatarImage
                        src={project.logo}
                        alt={project.title}
                        className="object-cover"
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
            <div className="leading-relaxed text-foreground/90">
              {project.description}
            </div>
          </FadeIn>
        </div>
      )}

      <div className="flex flex-row justify-between items-center">
        {/* Links */}
        <FadeIn delay={0.45}>
          <div className="flex items-center gap-4 pt-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Website
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
            )}

            {showLink && project.slug && (
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
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
                    key={tech}
                    className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
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
