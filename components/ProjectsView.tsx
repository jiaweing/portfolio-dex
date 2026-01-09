"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Gamepad2, Layers, WalletCards } from "lucide-react";
import { MemoryGame } from "@/components/MemoryGame";
import { ProjectsCardStack } from "@/components/ProjectsCardStack";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/lib/notion";

interface ProjectsViewProps {
  projects: (Project & { blocks: BlockObjectResponse[] })[];
}

export function ProjectsView({ projects }: ProjectsViewProps) {
  return (
    <div className="relative min-h-screen w-full">
      <Tabs className="w-full" defaultValue="gallery">
        <div className="container mx-auto flex justify-center">
          <TabsList variant="pills">
            <TabsTrigger value="gallery" variant="pills">
              <Layers className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="stack" variant="pills">
              <WalletCards className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="game" variant="pills">
              <Gamepad2 className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="pt-10 outline-none" value="gallery">
          <div className="container mx-auto px-4 pb-12">
            <ProjectsGallery projects={projects} />
          </div>
        </TabsContent>

        <TabsContent className="outline-none" value="stack">
          <ProjectsCardStack projects={projects} />
        </TabsContent>

        <TabsContent className="outline-none" value="game">
          <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 pb-12">
            <MemoryGame projects={projects} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
