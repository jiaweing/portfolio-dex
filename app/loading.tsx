import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <Loader2 className="animate-spin"></Loader2>
    </div>
  );
}
