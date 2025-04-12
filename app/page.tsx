"use client";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProfileBio } from "@/components/ProfileBio";
import { ProfileHeader } from "@/components/ProfileHeader";

export default function Home() {
  return (
    <>
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
    </>
  );
}
