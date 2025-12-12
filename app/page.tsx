import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProfileBio } from "@/components/ProfileBio";
import { ProfileHeader } from "@/components/ProfileHeader";
import { FadeIn } from "@/components/ui/fade-in";
import { getProjects } from "@/lib/notion";

import JsonLd from "./jsonld";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <JsonLd />

      <FadeIn>
        <ProfileHeader />
      </FadeIn>
      <FadeIn delay={0.1}>
        <ProfileBio />
      </FadeIn>
      <FadeIn delay={0.2}>
        <ContactSection />
      </FadeIn>
      <FadeIn delay={0.3}>
        <ExperienceSection projects={projects} />
      </FadeIn>
    </>
  );
}