import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { pairHighlights } from "@/lib/highlights";

const HIGHLIGHTS = pairHighlights(
  import.meta.glob<string>("../assets/highlights/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

const ADVANCE_MS = 4500;

const controlClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-accent hover:bg-accent hover:text-white";

export function HighlightsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setTabHidden(document.visibilityState === "hidden");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!api) return;
    const sync = () => setCurrent(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api]);

  const playing = !reducedMotion && !hovered && !tabHidden;

  useEffect(() => {
    if (!api || !playing) return;
    const id = window.setInterval(() => api.scrollNext(), ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [api, playing]);

  if (HIGHLIGHTS.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {HIGHLIGHTS.map((photo, i) => (
              <CarouselItem key={photo.key} className="pl-4 basis-full">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl">
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes="(max-width: 671px) 100vw, 672px"
                    alt={`REEF 2026 Governor's Cup, photo ${i + 1} of ${HIGHLIGHTS.length}`}
                    className="h-full w-full object-cover"
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous photo"
          className={controlClass}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <span
          className="min-w-[4.5rem] text-center text-sm font-medium text-muted-foreground tabular-nums"
          aria-live={playing ? "off" : "polite"}
          aria-atomic="true"
        >
          {current + 1} / {HIGHLIGHTS.length}
        </span>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next photo"
          className={controlClass}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
