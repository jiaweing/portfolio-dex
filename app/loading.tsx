import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
