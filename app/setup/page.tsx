import { StackTable } from "@/components/StackTable";
import { FadeIn } from "@/components/ui/fade-in";
import { getStackItems } from "@/lib/content";
import { generateMetadata } from "@/lib/metadata";
import JsonLd from "../jsonld";

export const metadata = generateMetadata({
  title: "Setup",
  description: "My hardware, software, and tools tailored for productivity.",
  url: "/setup",
});

export const revalidate = 1800;

export default async function SetupPage() {
  const items = await getStackItems();
  return (
    <>
      <JsonLd />
      <FadeIn>
        <div className="w-screen overflow-x-auto">
          <StackTable items={items} />
        </div>
      </FadeIn>
    </>
  );
}
