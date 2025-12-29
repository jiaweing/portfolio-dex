"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProjectContent } from "@/components/ProjectContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Project } from "@/lib/notion";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, type SwiperClass, SwiperSlide } from "swiper/react";

interface ProjectsCardStackProps {
  projects: (Project & { blocks: BlockObjectResponse[] })[];
}

export function ProjectsCardStack({ projects }: ProjectsCardStackProps) {
  // Sort projects by year descending
  const sortedProjects = [...projects].sort((a, b) => {
    return Number.parseInt(b.year || "0") - Number.parseInt(a.year || "0");
  });

  // Fixed: removed duplicate declaration
  const [activeIndex, setActiveIndex] = useState(0);
  const [debouncedActiveIndex, setDebouncedActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  // Debounce the heavy content render to unblock the main thread for scrolling
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedActiveIndex(activeIndex);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  if (!sortedProjects || sortedProjects.length === 0) return null;

  const activeProject = sortedProjects[activeIndex];
  const displayedProject = sortedProjects[debouncedActiveIndex];

  return (
    <>
      {/* Desktop Fixed Card Stack - Visible 2xl+ */}
      <div className="pointer-events-none fixed inset-0 z-30 hidden items-center justify-center 2xl:flex">
        <div className="grid h-full w-full max-w-7xl grid-cols-2 gap-24 px-6">
          <div className="pointer-events-auto flex h-full max-h-[100vh] flex-col items-center justify-center">
            <div className="relative h-[420px] w-[320px]">
              <Swiper
                className="h-full w-full"
                effect={"cards"}
                grabCursor={true}
                keyboard={{ enabled: true }}
                loop={true}
                modules={[EffectCards, Keyboard, Mousewheel]}
                mousewheel={{ sensitivity: 1.5 }}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                speed={100}
              >
                {sortedProjects.map((project, index) => (
                  <SwiperSlide
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xl dark:bg-zinc-900"
                    key={`desktop-${project.id}`}
                  >
                    <div className="relative h-full w-full">
                      {project.cover ? (
                        <Image
                          alt={project.title}
                          className="object-cover"
                          fill
                          priority={index === 0}
                          src={project.cover}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground text-xl">
                          {project.title}
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                {activeProject.year && (
                  <span className="font-semibold text-muted-foreground text-sm">
                    {activeProject.year}
                  </span>
                )}
                <div className="flex items-center justify-center gap-3">
                  <h2 className="font-semibold text-2xl text-foreground tracking-tight">
                    {activeProject.title}
                  </h2>
                  {activeProject.logo && (
                    <Avatar className="size-8 rounded-lg border border-white/10 bg-zinc-900/50">
                      <AvatarImage
                        alt={activeProject.title}
                        className="object-cover"
                        src={activeProject.logo}
                      />
                      <AvatarFallback>{activeProject.title[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <p className="line-clamp-2 max-w-sm text-muted-foreground/90 text-sm leading-relaxed">
                {activeProject.description}
              </p>
              <span className="pt-2 font-medium text-muted-foreground text-xs tabular-nums tracking-widest">
                {activeIndex + 1} / {sortedProjects.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Mobile Stack */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 items-start gap-12 2xl:grid-cols-2 2xl:gap-24">
          {/* Mobile Stack (Visible < 2xl) */}
          <div className="order-1 flex flex-col items-center gap-6 2xl:hidden">
            <div className="relative h-[380px] w-[280px] sm:h-[420px] sm:w-[320px]">
              <Swiper
                className="h-full w-full"
                effect={"cards"}
                grabCursor={true}
                keyboard={{ enabled: true }}
                loop={true}
                modules={[EffectCards, Keyboard, Mousewheel]}
                mousewheel={{ sensitivity: 1.5 }}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                speed={100}
              >
                {sortedProjects.map((project, index) => (
                  <SwiperSlide
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xl dark:bg-zinc-900"
                    key={`mobile-${project.id}`}
                  >
                    <div className="relative h-full w-full">
                      {project.cover ? (
                        <Image
                          alt={project.title}
                          className="object-cover"
                          fill
                          priority={index === 0}
                          src={project.cover}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground text-xl">
                          {project.title}
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                {activeProject.year && (
                  <span className="font-semibold text-muted-foreground text-sm">
                    {activeProject.year}
                  </span>
                )}
                <div className="flex items-center justify-center gap-3">
                  <h2 className="font-semibold text-2xl text-foreground tracking-tight">
                    {activeProject.title}
                  </h2>
                  {activeProject.logo && (
                    <Avatar className="size-8 rounded-lg border border-white/10 bg-zinc-900/50">
                      <AvatarImage
                        alt={activeProject.title}
                        className="object-cover"
                        src={activeProject.logo}
                      />
                      <AvatarFallback>{activeProject.title[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <p className="line-clamp-2 max-w-sm text-muted-foreground/90 text-sm leading-relaxed">
                {activeProject.description}
              </p>
              <span className="pt-2 font-medium text-muted-foreground text-xs tabular-nums tracking-widest">
                {activeIndex + 1} / {sortedProjects.length}
              </span>
            </div>
          </div>

          {/* Spacer for Desktop Grid Layering */}
          <div className="order-1 hidden 2xl:block" />

          {/* Right Column: Project Details */}
          <div className="order-2 mx-auto flex w-full max-w-4xl flex-col 2xl:mx-0 2xl:min-h-[50vh] 2xl:max-w-none">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                initial={{ opacity: 0, x: 20 }}
                key={debouncedActiveIndex}
                transition={{ duration: 0.3 }}
              >
                <ProjectContent
                  blocks={displayedProject.blocks}
                  project={displayedProject}
                  showHeader={false}
                  showLink={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
