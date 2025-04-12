"use client";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProfileBio } from "@/components/ProfileBio";
import { ProfileHeader } from "@/components/ProfileHeader";
import { FeatherEffect } from "@/components/ui/feather-effect";

export default function Home() {
  return (
    <>
      {/* Top feather effect with medium blur */}
      <FeatherEffect position="top" />

      <main>
        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-24">
            <div className="relative z-10 mx-auto max-w-2xl space-y-4">
              <ProfileHeader />
              <ProfileBio />
              <ExperienceSection />
              <ContactSection />
            </div>
          </div>
        </section>
      </main>

      {/* Bottom feather effect with medium blur */}
      <FeatherEffect position="bottom" />
    </>
  );
}
