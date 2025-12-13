"use client";

import { ProjectContent } from "@/components/ProjectContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project } from "@/lib/notion";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface ProjectsCardStackProps {
  projects: (Project & { blocks: BlockObjectResponse[] })[];
}

export function ProjectsCardStack({ projects }: ProjectsCardStackProps) {
  // Sort projects by year descending
  const sortedProjects = [...projects].sort((a, b) => {
    return parseInt(b.year || "0") - parseInt(a.year || "0");
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
      <div className="hidden 2xl:flex fixed inset-0 z-30 pointer-events-none items-center justify-center">
        <div className="w-full max-w-7xl px-6 grid grid-cols-2 gap-24 h-full">
          <div className="flex flex-col items-center justify-center pointer-events-auto h-full max-h-[100vh]">
            <div className="w-[320px] h-[420px] relative">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                loop={true}
                speed={100}
                modules={[EffectCards, Keyboard, Mousewheel]}
                keyboard={{ enabled: true }}
                mousewheel={{ sensitivity: 1.5 }}
                className="w-full h-full"
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
              >
                {sortedProjects.map((project, index) => (
                  <SwiperSlide
                    key={`desktop-${project.id}`}
                    className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-zinc-900 border border-white/10"
                  >
                    <div className="relative w-full h-full">
                      {project.cover ? (
                        <Image
                          src={project.cover}
                          alt={project.title}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground font-medium text-xl">
                          {project.title}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-col items-center gap-4 text-center mt-6">
              <div className="flex flex-col items-center gap-1">
                {activeProject.year && (
                  <span className="text-sm font-semibold text-muted-foreground">
                    {activeProject.year}
                  </span>
                )}
                <div className="flex items-center gap-3 justify-center">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {activeProject.title}
                  </h2>
                  {activeProject.logo && (
                    <Avatar className="size-8 rounded-lg border border-white/10 bg-zinc-900/50">
                      <AvatarImage
                        src={activeProject.logo}
                        alt={activeProject.title}
                        className="object-cover"
                      />
                      <AvatarFallback>{activeProject.title[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-sm line-clamp-2">
                {activeProject.description}
              </p>
              <span className="text-xs font-medium text-muted-foreground tracking-widest tabular-nums pt-2">
                {activeIndex + 1} / {sortedProjects.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Mobile Stack */}
      <div className="w-full max-w-7xl mx-auto py-12 px-6 relative z-10">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-12 2xl:gap-24 items-start">
          {/* Mobile Stack (Visible < 2xl) */}
          <div className="flex flex-col items-center gap-6 order-1 2xl:hidden">
            <div className="w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] relative">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                loop={true}
                speed={100}
                modules={[EffectCards, Keyboard, Mousewheel]}
                keyboard={{ enabled: true }}
                mousewheel={{ sensitivity: 1.5 }}
                className="w-full h-full"
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
              >
                {sortedProjects.map((project, index) => (
                  <SwiperSlide
                    key={`mobile-${project.id}`}
                    className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-zinc-900 border border-white/10"
                  >
                    <div className="relative w-full h-full">
                      {project.cover ? (
                        <Image
                          src={project.cover}
                          alt={project.title}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground font-medium text-xl">
                          {project.title}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-col items-center gap-4 text-center mt-6">
              <div className="flex flex-col items-center gap-1">
                {activeProject.year && (
                  <span className="text-sm font-semibold text-muted-foreground">
                    {activeProject.year}
                  </span>
                )}
                <div className="flex items-center gap-3 justify-center">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {activeProject.title}
                  </h2>
                  {activeProject.logo && (
                    <Avatar className="size-8 rounded-lg border border-white/10 bg-zinc-900/50">
                      <AvatarImage
                        src={activeProject.logo}
                        alt={activeProject.title}
                        className="object-cover"
                      />
                      <AvatarFallback>{activeProject.title[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-sm line-clamp-2">
                {activeProject.description}
              </p>
              <span className="text-xs font-medium text-muted-foreground tracking-widest tabular-nums pt-2">
                {activeIndex + 1} / {sortedProjects.length}
              </span>
            </div>
          </div>

          {/* Spacer for Desktop Grid Layering */}
          <div className="hidden 2xl:block order-1" />

          {/* Right Column: Project Details */}
          <div className="flex flex-col order-2 2xl:min-h-[50vh] w-full max-w-4xl mx-auto 2xl:max-w-none 2xl:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={debouncedActiveIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectContent
                  project={displayedProject}
                  blocks={displayedProject.blocks}
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
