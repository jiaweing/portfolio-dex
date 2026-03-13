"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { ProjectContent } from "@/components/ProjectContent";
import type { Project } from "@/lib/notion";

interface ProjectModalProps {
  project: Project;
  blocks: BlockObjectResponse[];
}

export function ProjectModal({ project, blocks }: ProjectModalProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.back();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  // Close on overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        router.back();
      }
    },
    [router]
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
      ref={overlayRef}
    >
      <div className="relative mx-4 w-full max-w-4xl rounded-3xl bg-background/80 shadow-2xl backdrop-blur-md">
        <button
          aria-label="Close"
          className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => router.back()}
        >
          <XIcon className="size-4" />
        </button>
        <div className="max-h-[80vh] overflow-y-auto px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8">
          <ProjectContent
            blocks={blocks}
            project={project}
            showHeader={true}
            showLink={true}
          />
        </div>
      </div>
    </div>
  );
}
