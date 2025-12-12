"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Project } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="portfolio" className="py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 flex flex-row">
          <h2 className="text-2xl font-medium tracking-tighter">our work</h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block h-full"
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
      <div className="relative overflow-hidden rounded-[1rem] border bg-card shadow-sm transition-all hover:shadow-lg cursor-pointer group-hover:border-primary/30 h-full flex flex-col">
        {/* Image container with hover effect */}
        <div className="aspect-[3/4] relative overflow-hidden group w-full">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:brightness-90"
              width={400}
              height={533} // Adjusted for 3:4 aspect ratio
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-muted text-accent-foreground min-h-[300px]`}
            >
              <span className="text-xl font-medium">{project.title}</span>
            </div>
          )}

          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent flex flex-col justify-end items-start p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
            <div className="text-sm font-semibold transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-sm text-white">
              {year}
            </div>
            <h3 className="mt-1 text-2xl font-semibold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              {project.title}
            </h3>
            <p className="text-sm text-white/90 max-w-xs leading-relaxed transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
