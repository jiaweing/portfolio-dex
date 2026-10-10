"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GenerativeGradient } from "@/components/GenerativeGradient";
import type { Project } from "@/lib/content";

interface AppDeckProps {
  projects: Project[];
}

const HOME_PROJECT_LIMIT = 32;

export function AppDeck({ projects }: AppDeckProps) {
  const mainProjects = projects.filter(
    (p) => p.status?.toLowerCase() !== "open source"
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
        <AppGrid projects={mainProjects.slice(0, HOME_PROJECT_LIMIT)} />
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

function AppGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
      {projects.map((project, index) => (
        <AppIcon isEager={index < 8} key={project.id} project={project} />
      ))}
    </div>
  );
}

function AppIcon({ project, isEager }: { project: Project; isEager: boolean }) {
  const [faviconError, setFaviconError] = useState(false);
  const href = `/projects/${project.slug}`;
  let icon = <GenerativeGradient title={project.title} />;

  if (project.logo) {
    icon = (
      <Image
        alt={project.title}
        className="pointer-events-none h-full w-full object-cover"
        draggable={false}
        fill
        priority={isEager}
        sizes="72px"
        src={project.logo}
        unoptimized
      />
    );
  } else if (project.url && !faviconError) {
    icon = (
      <FaviconIcon
        onError={() => setFaviconError(true)}
        title={project.title}
        url={project.url}
      />
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      <Link
        className="relative block w-full transition-transform duration-150 hover:scale-105 active:scale-95"
        href={href}
      >
        <div
          className="relative aspect-square w-full select-none overflow-hidden rounded-[22%]"
          style={
            {
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)",
              WebkitUserDrag: "none",
            } as React.CSSProperties
          }
        >
          {icon}
        </div>
        <p className="mt-1 w-full select-none truncate text-center font-medium text-[11px] text-foreground/80 leading-tight">
          {project.title}
        </p>
      </Link>
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
