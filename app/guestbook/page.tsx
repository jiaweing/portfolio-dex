import { GuestbookBoard } from "@/components/guestbook/GuestbookBoard";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Guestbook",
  description: "Sign the guestbook and leave your mark on the wall.",
  url: "/guestbook",
});

export default function GuestbookPage() {
  return (
    <FadeIn>
      <div className="mx-auto max-w-3xl pb-16">
        <GuestbookBoard />
      </div>
    </FadeIn>
  );
}
