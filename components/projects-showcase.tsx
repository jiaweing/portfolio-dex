"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/lib/notion";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16" id="portfolio">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 flex flex-row">
          <h2 className="font-medium text-2xl tracking-tighter">our work</h2>
        </div>

        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <CarouselItem
                className="pl-4 md:basis-1/2 lg:basis-1/3"
                key={project.id}
              >
                <div className="h-full">
                  <Link
                    className="block h-full"
                    href={`/projects/${project.slug}`}
                  >
                    <ProjectCard project={project} />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const year = project.year || "";

  return (
    <div className="h-full w-full">
      <div className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1rem] border bg-card shadow-sm transition-all hover:shadow-lg group-hover:border-primary/30">
        {/* Image container with hover effect */}
        <div className="group relative aspect-[3/4] w-full overflow-hidden">
          {project.cover ? (
            <Image
              alt={project.title}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90 group-hover:filter"
              height={533}
              src={project.cover}
              width={400} // Adjusted for 3:4 aspect ratio
            />
          ) : (
            <div
              className={
                "flex h-full min-h-[300px] w-full items-center justify-center bg-muted text-accent-foreground"
              }
            >
              <span className="font-medium text-xl">{project.title}</span>
            </div>
          )}

          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/50 via-black/30 to-transparent p-5 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
            <div className="translate-y-1 transform font-semibold text-sm text-white drop-shadow-sm transition-transform duration-300 group-hover:translate-y-0">
              {year}
            </div>
            <h3 className="mt-1 translate-y-2 transform font-semibold text-2xl text-white transition-transform duration-300 ease-out group-hover:translate-y-0">
              {project.title}
            </h3>
            <p className="line-clamp-2 max-w-xs translate-y-2 transform text-sm text-white/90 leading-relaxed transition-transform delay-75 duration-300 ease-out group-hover:translate-y-0">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
