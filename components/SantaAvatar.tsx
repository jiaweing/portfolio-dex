import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSeasonalEffect } from "@/hooks/use-seasonal-effect";
import { cn } from "@/lib/utils";

type SantaAvatarProps = React.ComponentPropsWithoutRef<typeof Avatar> & {
  hatClassName?: string;
};

export function SantaAvatar({
  className,
  hatClassName,
  ...props
}: SantaAvatarProps) {
  const effect = useSeasonalEffect();
  const showHat = effect === "snow";

  return (
    <span className="group relative inline-flex">
      {showHat && (
        <svg
          aria-label="Santa Hat"
          className={cn(
            "absolute -top-5 -left-1.5 z-10 size-10 -rotate-[22deg] transform",
            hatClassName
          )}
          fill="none"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Santa Hat</title>
          <circle className="fill-white" cx="3" cy="11" r="2.5" />
          <path
            className="fill-red-600"
            d="M19 17 C20 12 15 2 8 5 C 5 6 3 9 4 11 C 5 12 4 17 4 17 L19 17 Z"
          />
          <path
            className="fill-white"
            d="M2 16C2 15.4477 2.44772 15 3 15H20C20.5523 15 21 15.4477 21 16V18C21 18.5523 20.5523 19 20 19H3C2.44772 19 2 18.5523 2 18V16Z"
          />
        </svg>
      )}
      <Avatar
        className={cn(
          "corner-squircle border border-white/10 transition-transform duration-300 group-hover:scale-110",
          className
        )}
        {...props}
      >
        <AvatarImage alt="Jia Wei Ng" src="/images/avatars/shadcn.png" />
        <AvatarFallback>JW</AvatarFallback>
      </Avatar>
    </span>
  );
}
