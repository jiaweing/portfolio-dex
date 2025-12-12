"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    if (!isOpen || !api) return;

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
      <div className={cn("flex justify-center gap-2 mt-4", className)}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => targetApi?.scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300 shadow-sm",
              activeIndex === index
                ? "bg-primary w-6" // Active dot is wider
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              className?.includes("text-white") &&
                (activeIndex === index
                  ? "bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                  : "bg-white/50 hover:bg-white/80 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]")
            )}
            aria-label={`Go to slide ${index + 1}`}
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
      <div className="relative group">
        <Carousel
          setApi={setMainApi}
          className="w-full"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {images.map((url, index) => (
              <CarouselItem key={index}>
                <div
                  className="aspect-video relative overflow-hidden rounded-2xl cursor-zoom-in group/image"
                  onClick={() => openGalleryHandler(index)}
                >
                  <Image
                    src={url}
                    alt={`Project Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover/image:scale-105"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100">
                    <ZoomIn className="text-white drop-shadow-md w-12 h-12" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </Carousel>

        {/* Main Dots */}
        {renderDots(mainApi, mainApi?.selectedScrollSnap() || 0)}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="border-none bg-transparent shadow-none p-0 overflow-hidden outline-none flex flex-col items-center justify-center z-1000 [&>button]:text-white [&>button]:bg-black/50 [&>button]:p-2 [&>button]:rounded-full [&>button]:top-4 [&>button]:right-4 [&>button]:drop-shadow-lg [&>button]:hover:bg-black/70 [&>button]:hover:text-white"
          style={{ maxWidth: "95vw", width: "95vw", height: "95vh" }}
        >
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
            <Carousel
              setApi={setApi}
              className="w-full h-full [&_[data-slot=carousel-content]]:h-full"
              opts={{
                loop: true,
                align: "center",
              }}
            >
              <CarouselContent className="h-full">
                {images.map((url, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center h-full max-h-full"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={url}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === initialSlide}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 h-12 w-12 bg-black/50 hover:bg-black/70 border-none text-white" />
              <CarouselNext className="right-4 h-12 w-12 bg-black/50 hover:bg-black/70 border-none text-white" />
            </Carousel>
          </div>

          {/* Lightbox Dots */}
          <div className="w-full absolute bottom-4 left-0 z-50">
            {renderDots(api, current, "text-white mt-0")}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
