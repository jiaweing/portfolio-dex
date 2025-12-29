"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Layers, WalletCards } from "lucide-react";
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
      <Tabs className="w-full" defaultValue="gallery" variant="pills">
        <div className="container mx-auto flex justify-center">
          <TabsList>
            <TabsTrigger value="gallery" variant="pills">
              <Layers className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="stack" variant="pills">
              <WalletCards className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}
