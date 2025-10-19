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
  { srcKey: "MagSleeve/mag_sleeve_front", caption: "Front View - Clean Design" },
  { srcKey: "MagSleeve/mag_sleeve_back", caption: "Back View - Heat Dissipation Slots" },
  { srcKey: "MagSleeve/mag_sleeve_top", caption: "Top View - Mounting System" },
];

export default function MagSleeve() {
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
        <h3 className="text-3xl font-bold text-slate-900">The Concept</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Mag Sleeve is a fabric laptop sleeve that mounts to the side of your desk and automatically connects your laptop to all your peripherals via magnetic connectors. Drop your laptop in, everything connects instantly. Pick it up to leave, and it disconnects smoothly - no more fumbling with cables. It has honestly been such a great desk upgrade for me!
          </p>
        </div>
      </div>

      {/* Demo Video */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">See It In Action</h3>
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-[9/16] overflow-hidden rounded-3xl bg-slate-100">
            <video
              className="w-full h-full object-contain"
              controls
              preload="metadata"
            >
              <source src="/videos/MagSleeve/mag_sleeve_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Detail Photos Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">Design Details</h3>
        <p className="text-base text-slate-600 italic">
          I wanted the design to look clean like felt carrying cases I&apos;d seen, while still functional allowing the computer to not overheat and simply dropped in and slid out.
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

      {/* How It Works Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">How It Works</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Fabric Construction:</strong> The sleeve is made from felt that I designed templates for and then stitched together. It&apos;s soft enough to protect the laptop while being sturdy enough to hold its shape when mounted vertically. Plus, it was a good way to learn to sew a bit!
          </p>
          
          <p>
            <strong>Mounting System:</strong> Wooden dowels slide through the top of the sleeve and rest on 3D-printed brackets that attach to the side of the desk. The peg closer to the desk can slide, creating a gap that lets you fit your fingers in to lift out the laptop smoothly. The brackets also have tabs to make sure the felt gets held in place when lifing out the laptop.
          </p>

          <p>
            <strong>Magnetic Connection:</strong> At the bottom of the sleeve is an alignment piece measured precisely for a 14&quot; MacBook. It positions magnetic USB-C connectors to line up perfectly with the laptop&apos;s ports so it always aligns correctly.
          </p>

          <p>
            <strong>Cable Management:</strong> The cables from the magnetic connectors pass through a gap in the felt&apos;s stitched border at the bottom. My two monitors use USB-C for both power and display, so these two ports handle all my peripherals—keyboard, mouse, monitors, power, ethernet, everything.
          </p>
        </div>
      </div>
    </div>
  );
}

export const magSleeveMetadata = {
  id: 7,
  title: "Mag Sleeve",
  description: "Magnetic laptop sleeve with instant peripheral connection",
  type: "gradient" as const,
  tags: ["Sewing", "3D Printing", "Product Design"],
  height: "h-[380px] md:h-[450px]",
  component: MagSleeve
};
