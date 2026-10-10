import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSeasonalEffect } from "@/hooks/use-seasonal-effect";
import { findSeasonalEgg } from "@/lib/easter-eggs";
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
  const showWitchHat = effect === "embers";
  const showPartyHat = effect === "confetti";
  const showBunnyEars = effect === "eggs";
  const showHeart = effect === "hearts";
  const showLantern = effect === "blossoms";

  return (
    <span className="group relative inline-flex">
      {showHat && (
        <svg
          aria-label="Santa Hat"
          className={cn(
            "cursor-pointer",
            "absolute -top-5 -left-1.5 z-10 size-10 -rotate-[22deg] transform",
            hatClassName
          )}
          fill="none"
          onClick={() => findSeasonalEgg("hohoho", "christmas")}
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
      {showWitchHat && (
        <svg
          aria-label="Witch Hat"
          className={cn(
            "absolute -top-5 -left-1.5 z-10 size-10 -rotate-[18deg] transform drop-shadow-sm",
            hatClassName
          )}
          fill="none"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Witch Hat</title>
          {/* Cone with a tip that flops over to the right */}
          <path
            className="fill-zinc-900 dark:fill-zinc-800"
            d="M9 21 C11 15 12.5 9.5 15 5.5 C17 2.5 21.5 2 23.5 4.5 C21 4.2 19.2 5.8 19.2 8.5 C19.2 12.5 20.6 17 23 21 Z"
          />
          <path
            className="fill-orange-500"
            d="M9.7 18.6 C14 19.5 18.5 19.5 22.2 18.6 L23 21 C18.3 21.9 13.6 21.9 9 21 Z"
          />
          <rect
            className="stroke-amber-300"
            height="2.6"
            rx="0.4"
            strokeWidth="0.9"
            width="2.6"
            x="14.6"
            y="18.8"
          />
          {/* Wide curved brim */}
          <path
            className="fill-zinc-900 dark:fill-zinc-800"
            d="M1.5 22.5 C7 25.5 25 25.5 30.5 21.5 C27 19.6 5.5 19.6 1.5 22.5 Z"
          />
        </svg>
      )}
      {showPartyHat && (
        <svg
          aria-label="Party Hat"
          className={cn(
            "cursor-pointer",
            "absolute -top-5 -left-1.5 z-10 size-10 -rotate-[22deg] transform",
            hatClassName
          )}
          fill="none"
          onClick={() => findSeasonalEgg("countdown", "newyear")}
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Party Hat</title>
          <path className="fill-fuchsia-500" d="M12 3 L19 18 L5 18 Z" />
          <path
            className="fill-yellow-300"
            d="M10.1 7 L13.9 7 L15.3 10 L8.7 10 Z"
          />
          <path
            className="fill-sky-400"
            d="M7.8 12 L16.2 12 L17.6 15 L6.4 15 Z"
          />
          <circle className="fill-yellow-300" cx="12" cy="3" r="2" />
        </svg>
      )}
      {showBunnyEars && (
        <svg
          aria-label="Bunny Ears"
          className="pointer-events-none absolute -top-[62%] left-[8%] z-10 size-[84%]"
          fill="none"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Bunny Ears</title>
          <ellipse
            className="fill-white stroke-zinc-300"
            cx="8.5"
            cy="13"
            rx="4"
            ry="11"
            strokeWidth="0.8"
            transform="rotate(-12 8.5 13)"
          />
          <ellipse
            className="fill-pink-300"
            cx="8.5"
            cy="14"
            rx="2"
            ry="8"
            transform="rotate(-12 8.5 14)"
          />
          <ellipse
            className="fill-white stroke-zinc-300"
            cx="19.5"
            cy="13"
            rx="4"
            ry="11"
            strokeWidth="0.8"
            transform="rotate(12 19.5 13)"
          />
          <ellipse
            className="fill-pink-300"
            cx="19.5"
            cy="14"
            rx="2"
            ry="8"
            transform="rotate(12 19.5 14)"
          />
        </svg>
      )}
      {showHeart && (
        <svg
          aria-label="Heart"
          className="pointer-events-none absolute -top-[30%] -right-[30%] z-10 size-[60%] animate-pulse"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Heart</title>
          <path
            className="fill-rose-500"
            d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.8 0 5.9 4 4.4 7.3C19.5 16.4 12 21 12 21Z"
          />
        </svg>
      )}
      {showLantern && (
        <svg
          aria-label="Lantern"
          className="pointer-events-none absolute -top-[45%] -right-[28%] z-10 size-[70%]"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Lantern</title>
          <line
            className="stroke-yellow-500"
            strokeWidth="1"
            x1="12"
            x2="12"
            y1="0"
            y2="4"
          />
          <rect
            className="fill-yellow-500"
            height="2"
            rx="0.6"
            width="7"
            x="8.5"
            y="4"
          />
          <ellipse className="fill-red-600" cx="12" cy="11.5" rx="7" ry="6" />
          <path
            className="stroke-red-800"
            d="M12 5.5v12M8 6.5c-1.6 3-1.6 7 0 10M16 6.5c1.6 3 1.6 7 0 10"
            fill="none"
            strokeWidth="0.6"
          />
          <rect
            className="fill-yellow-500"
            height="2"
            rx="0.6"
            width="7"
            x="8.5"
            y="17"
          />
          <path
            className="stroke-red-600"
            d="M12 19v4M10.5 19.5v3M13.5 19.5v3"
            strokeWidth="0.8"
          />
        </svg>
      )}
      <Avatar
        className={cn(
          "rounded-full border border-white/10 transition-transform duration-300 group-hover:scale-110",
          className
        )}
        {...props}
      >
        <AvatarImage alt="Jia Wei Ng" src="/images/avatars/jiawei2.png" />
        <AvatarFallback>JW</AvatarFallback>
      </Avatar>
    </span>
  );
}
