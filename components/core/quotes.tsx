import { TextLoop } from "@/components/motion-primitives/text-loop";

export function Quotes() {
  return (
    <div className="group mt-12 flex flex-col items-start">
      {/* 3 Muted Dots Separator */}
      <div className="mb-12 flex w-full justify-center space-x-4">
        <div className="size-1.5 rounded-full bg-muted-foreground/20" />
        <div className="size-1.5 rounded-full bg-muted-foreground/20" />
        <div className="size-1.5 rounded-full bg-muted-foreground/20" />
      </div>

      <div className="w-full text-left">
        <TextLoop className="whitespace-normal text-lg text-muted-foreground/80 italic leading-relaxed md:text-xl">
          <span>
            "The people who are crazy enough to think they can change the world
            are the ones who do." — Steve Jobs
          </span>
          <span>
            "We all die. The goal isn't to live forever, the goal is to create
            something that will." — Chuck Palahniuk
          </span>
          <span>
            "Focus on the journey, not the destination." — Joy Anderson
          </span>
        </TextLoop>
      </div>
    </div>
  );
}
