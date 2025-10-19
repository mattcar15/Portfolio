'use client';

import React from 'react';
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Picture from "@/components/Picture";
import type { RESPONSIVE_IMAGES } from "@/components/projects/assets.generated";

const images: { srcKey: keyof typeof RESPONSIVE_IMAGES; caption: string }[] = [
  { srcKey: "WDTTool/full_real", caption: "Full Real" },
  { srcKey: "WDTTool/separated_real", caption: "Separated Real" },
  { srcKey: "WDTTool/front_render", caption: "Front View Render" },
  { srcKey: "WDTTool/top_render", caption: "Top View Render" },
];

export default function WDTTool() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Project</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            This started because I got an espresso machine and saw videos of these WDT (Weiss Distribution Technique) tools on Instagram, but they were expensive. The idea is to break up clumps in the coffee grounds and evenly spread them out before brewing—resulting in better, more consistent espresso shots.
          </p>
          
          <p>
            I decided I&apos;d see how hard it would be to design a good one and package everything needed for a complete product. It became a deep dive into manufacturing, iterative design, and the challenges of scaling something from prototype to production.
          </p>
        </div>
      </div>

      {/* CAD Renders Carousel */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">Design Renders</h3>
        <p className="text-base text-slate-600 italic">
          Current renders from CAD - photos and video of the physical tool coming soon!
        </p>
        
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="max-w-3xl sm:mx-auto mb-5"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((image, index) => {
              return (
                <CarouselItem key={index} className="flex justify-center">
                  <figure className="relative flex justify-center">
                    <div className="relative inline-flex items-center justify-center overflow-hidden rounded-3xl">
                      <Picture
                        srcKey={image.srcKey}
                        alt={image.caption}
                        className="h-[320px] w-auto max-w-full object-contain sm:h-[420px] lg:h-[480px]"
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 720px, 960px"
                      />
                    </div>
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
                      <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-slate-900 shadow backdrop-blur">
                        {image.caption}
                      </span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                index === current
                  ? 'bg-slate-900 w-8'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Design Process Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Design Process</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Iterative Design.</strong> Through dozens of iterations, I refined the design for optimal printability and functionality. I added chamfered overhangs to minimize support material, keeping production efficient and clean.
          </p>
          
          <p>
            <strong>Precision Engineering.</strong> The holes for the needles needed to be tightly toleranced—too loose and they&apos;d wobble, too tight and they wouldn&apos;t fit. I dialed in dimensions that hold tiny needles perfectly without requiring adhesive.
          </p>

          <p>
            <strong>Smooth Mechanism.</strong> I designed custom gears that allow a screw to thread in without needing a bearing, while still providing very smooth spinning. The top gear holder is press-fit and uses no bearing—just a little canola oil and it spins butter-smooth.
          </p>

          <p>
            <strong>Print-in-Place Features.</strong> Many of the mechanical features are designed to print assembled or with minimal post-processing, making production faster and more consistent.
          </p>
        </div>
      </div>

      {/* Production Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Going to Production</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Beyond just designing the tool itself, I sourced packaging—boxes and wrapping—to make each one feel like a proper product. I produced around 20 units, learning the entire process from design to packaged product.
          </p>
          
          <p>
            I considered running an Etsy store to sell them, but decided against the time commitment of managing inventory, customer service, and fulfillment. Instead, I give them to friends and family when they get an espresso setup—which has been way more rewarding than running a business.
          </p>

          <p>
            This project taught me what it takes to scale a physical product. It&apos;s one thing to make a prototype that works; it&apos;s another to make 20 identical units that all work perfectly, look great, and come packaged professionally.
          </p>
        </div>
      </div>
    </div>
  );
}

export const wdtToolMetadata = {
  id: 8,
  title: "WDT Tool",
  description: "Precision-engineered coffee distribution tool for espresso",
  type: "gradient" as const,
  tags: ["CAD", "3D Printing", "Product Design"],
  height: "h-[380px] md:h-[370px]",
  component: WDTTool
};
