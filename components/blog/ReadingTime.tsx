import { Clock } from "lucide-react";

interface ReadingTimeProps {
  minutes: number;
}

export function ReadingTime({ minutes }: ReadingTimeProps) {
  if (!minutes || minutes < 1) return null;

  return (
    <span className="inline-flex items-center gap-1">
      <Clock aria-hidden="true" className="size-3" />
      <span>
        {minutes} {minutes === 1 ? "min" : "mins"} read
      </span>
    </span>
  );
}
