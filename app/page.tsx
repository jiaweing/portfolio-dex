import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProfileBio } from "@/components/ProfileBio";
import { ProfileHeader } from "@/components/ProfileHeader";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoGallery } from "@/components/ui/gallery";
import { generateMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/notion";
import JsonLd from "./jsonld";

export const metadata = generateMetadata({
  title: "Jia Wei Ng",
  description:
    "Just an ordinary guy who makes software, with unique and original digital experiences.",
  url: "/",
});

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
        <div className="mt-16">
          <PhotoGallery />
        </div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <ExperienceSection projects={projects} />
      </FadeIn>
    </>
  );
}
