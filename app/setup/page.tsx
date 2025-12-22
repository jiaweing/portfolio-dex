// Import structured data component
import { GearSection } from "@/components/GearSection";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import JsonLd from "../jsonld";

export const metadata = generateMetadata({
  title: "Setup",
  description: "My hardware, software, and tools tailored for productivity.",
  url: "/setup",
});

export default async function Home() {
  return (
    <>
      <JsonLd />
      <FadeIn>
        <GearSection />
      </FadeIn>
    </>
  );
}
