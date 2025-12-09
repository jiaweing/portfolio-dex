import { BooksSection } from "@/components/BooksSection";
import { FadeIn } from "@/components/ui/fade-in";
import JsonLd from "../jsonld";

export default async function Home() {
  return (
    <>
      <JsonLd />
      <FadeIn>
        <BooksSection />
      </FadeIn>
    </>
  );
}
