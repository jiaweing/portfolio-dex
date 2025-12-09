// Import structured data component
import { GearSection } from "@/components/GearSection";
import { FadeIn } from "@/components/ui/fade-in";
import JsonLd from "../jsonld";

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
