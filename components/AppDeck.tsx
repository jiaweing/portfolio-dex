"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GenerativeGradient } from "@/components/GenerativeGradient";
import type { Project } from "@/lib/notion";

interface AppDeckProps {
  projects: Project[];
}

export function AppDeck({ projects }: AppDeckProps) {
  const mainProjects = projects.filter(
    (p) => p.status?.toLowerCase() !== "open source"
  );
  const openSource = projects.filter(
    (p) => p.status?.toLowerCase() === "open source"
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">my ventures</h3>
          <Link
            className="text-muted-foreground text-sm hover:text-foreground"
            href="/projects"
          >
            all {mainProjects.length} →
          </Link>
        </div>
        <AppGrid offset={0} projects={mainProjects} />
      </div>

      {/* open source section temporarily hidden
      {openSource.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">open source</h3>
            <Link
              className="text-muted-foreground text-sm hover:text-foreground"
              href="/projects"
            >
              {openSource.length} projects →
            </Link>
          </div>
          <AppGrid offset={mainProjects.length} projects={openSource} />
        </div>
      )}
      */}
    </div>
  );
}

function AppGrid({
  projects,
  offset,
}: {
  projects: Project[];
  offset: number;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [placeholders, setPlaceholders] = useState(0);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const update = () => {
      const cols = getComputedStyle(el).gridTemplateColumns.split(" ").length;
      const rem = projects.length % cols;
      setPlaceholders(rem === 0 ? 0 : cols - rem);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [projects.length]);

  return (
    <>
      <div
        className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8"
        ref={gridRef}
      >
        {projects.map((project, index) => (
          <AppIcon index={offset + index} key={project.id} project={project} />
        ))}
        {Array.from({ length: placeholders }).map((_, i) => (
          <HolePlaceholder
            index={offset + projects.length + i}
            key={`hole-${i}`}
          />
        ))}
      </div>
    </>
  );
}

function HolePlaceholder({ index }: { index: number }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-1.5"
      initial={{ opacity: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      <div className="aspect-square w-full rounded-[22%] bg-muted" />
      <div className="h-[13px]" />
    </motion.div>
  );
}

function AppIcon({ project, index }: { project: Project; index: number }) {
  const [faviconError, setFaviconError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const router = useRouter();
  const href = `/projects/${project.slug}`;

  return (
    // Outer cell: holds space in grid, hole lives here absolutely behind
    <div className="relative flex flex-col items-center gap-1.5">
      {/* Hole — absolute, revealed when icon lifts */}
      <div
        className="absolute top-0 right-0 left-0 aspect-square rounded-[22%] bg-muted transition-opacity duration-150"
        style={{
          opacity: isDragging || hasMoved ? 1 : 0,
        }}
      />

      <motion.div
        animate={{ opacity: 1 }}
        className="relative w-full cursor-grab active:cursor-grabbing"
        drag
        initial={{ opacity: 0 }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          if (Math.abs(info.offset.x) < 4 && Math.abs(info.offset.y) < 4) {
            setHasMoved(false);
            router.push(href);
          } else {
            setHasMoved(true);
          }
        }}
        onDragStart={() => setIsDragging(true)}
        style={{ zIndex: isDragging ? 9999 : hasMoved ? 100 : 1 }}
        transition={{ delay: index * 0.04, duration: 0.4 }}
        whileDrag={{ scale: 1.15 }}
        whileHover={{
          scale: 1.1,
          transition: { type: "spring", stiffness: 400, damping: 15 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className="relative aspect-square w-full select-none overflow-hidden rounded-[22%]"
          onDragStart={(e) => e.preventDefault()}
          style={
            {
              boxShadow: isDragging
                ? "0 12px 32px rgba(0,0,0,0.28), 0 4px 8px rgba(0,0,0,0.18)"
                : "0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)",
              WebkitUserDrag: "none",
            } as React.CSSProperties
          }
        >
          {project.logo ? (
            <Image
              alt={project.title}
              className="pointer-events-none h-full w-full object-cover"
              draggable={false}
              fill
              sizes="72px"
              src={project.logo}
            />
          ) : project.url && !faviconError ? (
            <FaviconIcon
              onError={() => setFaviconError(true)}
              title={project.title}
              url={project.url}
            />
          ) : (
            <GenerativeGradient title={project.title} />
          )}
        </div>
        <p className="mt-1 w-full select-none truncate text-center font-medium text-[11px] text-foreground/80 leading-tight">
          {project.title}
        </p>
      </motion.div>
    </div>
  );
}

function FaviconIcon({
  url,
  title,
  onError,
}: {
  url: string;
  title: string;
  onError: () => void;
}) {
  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch {
    onError();
    return <GenerativeGradient title={title} />;
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
      <div className="relative h-2/3 w-2/3">
        <Image
          alt={title}
          className="pointer-events-none object-contain"
          draggable={false}
          fill
          onError={onError}
          sizes="48px"
          src={`https://unavatar.io/${hostname}?fallback=false`}
        />
      </div>
    </div>
  );
}
