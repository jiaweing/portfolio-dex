"use client";

import { ZoomInAreaIcon as ZoomIn } from "hugeicons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Update slide when api is available
  useEffect(() => {
    if (api) {
      api.scrollTo(initialSlide);
    }
  }, [api, initialSlide]);

  useEffect(() => {
    if (!mainApi) {
      return;
    }

    setCurrent(mainApi.selectedScrollSnap());

    mainApi.on("select", () => {
      setCurrent(mainApi.selectedScrollSnap());
    });
  }, [mainApi]);

  // Sync lightbox current slide
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Handle keyboard and mouse wheel navigation for lightbox
  useEffect(() => {
    if (!(isOpen && api)) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        api.scrollNext();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling only if we're actually navigating
      if (Math.abs(e.deltaY) > 20) {
        // e.preventDefault(); // Optional: might block page scroll if needed, but dialog usually locks body
        if (e.deltaY > 0) {
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen, api]);

  const openGallery = (index: number) => {
    setInitialSlide(index);
    setIsOpen(true);
  };

  // Common dot indicator logic
  const renderDots = (
    targetApi: CarouselApi | undefined,
    activeIndex: number,
    className?: string
  ) => {
    if (!images || images.length <= 1) return null;

    return (
      <div className={cn("mt-4 flex justify-center gap-2", className)}>
        {images.map((_, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2 w-2 rounded-full shadow-sm transition-all duration-300",
              activeIndex === index
                ? "w-6 bg-primary" // Active dot is wider
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              className?.includes("text-white") &&
                (activeIndex === index
                  ? "bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                  : "bg-white/50 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] hover:bg-white/80")
            )}
            key={index}
            onClick={() => targetApi?.scrollTo(index)}
          />
        ))}
      </div>
    );
  };

  const openGalleryHandler = (index: number) => {
    openGallery(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="group relative">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: "start",
          }}
          setApi={setMainApi}
        >
          <CarouselContent>
            {images.map((url, index) => (
              <CarouselItem key={index}>
                <div
                  className="group/image relative aspect-video cursor-zoom-in overflow-hidden rounded-2xl"
                  onClick={() => openGalleryHandler(index)}
                >
                  <Image
                    alt={`Project Image ${index + 1}`}
                    className="object-cover transition-transform duration-700 ease-in-out group-hover/image:scale-105"
                    fill
                    priority={index === 0}
                    src={url}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors hover:bg-black/10 hover:opacity-100">
                    <ZoomIn className="h-12 w-12 text-white drop-shadow-md" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4 opacity-0 transition-opacity group-hover:opacity-100" />
              <CarouselNext className="right-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </>
          )}
        </Carousel>

        {/* Main Dots */}
        {renderDots(mainApi, mainApi?.selectedScrollSnap() || 0)}
      </div>

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent
          className="z-1000 flex flex-col items-center justify-center overflow-hidden border-none bg-transparent p-0 shadow-none outline-none [&>button]:top-4 [&>button]:right-4 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:p-2 [&>button]:text-white [&>button]:drop-shadow-lg [&>button]:hover:bg-black/70 [&>button]:hover:text-white"
          style={{ maxWidth: "95vw", width: "95vw", height: "95vh" }}
        >
          <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
            <Carousel
              className="h-full w-full [&_[data-slot=carousel-content]]:h-full"
              opts={{
                loop: true,
                align: "center",
              }}
              setApi={setApi}
            >
              <CarouselContent className="h-full">
                {images.map((url, index) => (
                  <CarouselItem
                    className="flex h-full max-h-full items-center justify-center"
                    key={index}
                  >
                    <div className="relative flex h-full w-full items-center justify-center">
                      <Image
                        alt={`Screenshot ${index + 1}`}
                        className="object-contain"
                        fill
                        priority={index === initialSlide}
                        src={url}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 h-12 w-12 border-none bg-black/50 text-white hover:bg-black/70" />
              <CarouselNext className="right-4 h-12 w-12 border-none bg-black/50 text-white hover:bg-black/70" />
            </Carousel>
          </div>

          {/* Lightbox Dots */}
          <div className="absolute bottom-4 left-0 z-50 w-full">
            {renderDots(api, current, "text-white mt-0")}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
