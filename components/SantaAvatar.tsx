import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SantaAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  size?: number;
}

export function SantaAvatar({ className, size = 10, ...props }: SantaAvatarProps) {
  const [showHat, setShowHat] = useState(false);

  useEffect(() => {
    const now = new Date();
    // Show only in December (Month index 11)
    if (now.getMonth() === 11) {
      setShowHat(true);
    }
  }, []);

  return (
    <div className="relative inline-flex group">
      {showHat && (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-6 -left-2 z-10 size-12 -rotate-[22deg] transform"
        >
          {/* Pom-pom - moved to the drooping tip */}
          <circle cx="3" cy="11" r="2.5" className="fill-white" />
          {/* Hat Body - Drooping to the left */}
          <path
            d="M19 17 C20 12 15 2 8 5 C 5 6 3 9 4 11 C 5 12 4 17 4 17 L19 17 Z"
            className="fill-red-600"
          />
          {/* Brim - unchanged */}
          <path
            d="M2 16C2 15.4477 2.44772 15 3 15H20C20.5523 15 21 15.4477 21 16V18C21 18.5523 20.5523 19 20 19H3C2.44772 19 2 18.5523 2 18V16Z"
            className="fill-white"
          />
        </svg>
      )}
      <Avatar
        className={cn(
          "rounded-xl border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-300",
          className
        )}
        {...props}
      >
        <AvatarImage src="/images/avatars/shadcn.png" alt="Jia Wei Ng" />
        <AvatarFallback>JW</AvatarFallback>
      </Avatar>
    </div>
  );
}
