import { StackTable } from "@/components/StackTable";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import { getStackItems } from "@/lib/notion";
import JsonLd from "../jsonld";

export const metadata = generateMetadata({
  title: "Setup",
  description: "My hardware, software, and tools tailored for productivity.",
  url: "/setup",
});

export default async function SetupPage() {
  const items = await getStackItems();
  return (
    <>
      <JsonLd />
      <FadeIn>
        <div className="-mx-6 w-screen overflow-x-auto">
          <StackTable items={items} />
        </div>
      </FadeIn>
    </>
  );
}
