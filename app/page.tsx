"use client";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProfileBio } from "@/components/ProfileBio";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/progressive-blur";

// Import structured data component
import JsonLd from "./jsonld";

export default function Home() {
  return (
    <>
      {/* Add structured data for SEO */}
      <JsonLd />

      {/* Top progressive blur effect */}
      <ProgressiveBlur position="top" height="100px" useThemeBackground />

      <main>
        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-24">
            <div className="relative z-10 mx-auto max-w-2xl space-y-4 leading-relaxed">
              <ProfileHeader />
              <ProfileBio />
              <ExperienceSection />
              <ContactSection />
            </div>
          </div>
        </section>
      </main>

      {/* Bottom progressive blur effect */}
      <ProgressiveBlur position="bottom" height="100px" useThemeBackground />
    </>
  );
}
