import { BooksSection } from "@/components/BooksSection";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import JsonLd from "../jsonld";

export const metadata = generateMetadata({
  title: "Books",
  description: "A collection of books I've read and recommend.",
  url: "/books",
});

export default async function Home() {
  return (
    <>
      <JsonLd />
      <FadeIn>
        <div className="flex h-[calc(100svh-12rem)] items-center">
          <BooksSection />
        </div>
      </FadeIn>
    </>
  );
}
