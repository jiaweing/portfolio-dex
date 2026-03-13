import { Loader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <Loader size="lg" variant="pulse-dot" />
    </div>
  );
}
