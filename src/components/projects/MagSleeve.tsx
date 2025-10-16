'use client';

import React from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import magSleeveFront from './assets/MagSleeve/mag_sleeve_front.png';
import magSleeveBack from './assets/MagSleeve/mag_sleeve_back.png';
import magSleeveTop from './assets/MagSleeve/mag_sleeve_top.png';

const images = [
  { src: magSleeveFront, caption: "Front View - Clean Design" },
  { src: magSleeveBack, caption: "Back View - Heat Dissipation Slots" },
  { src: magSleeveTop, caption: "Top View - Mounting System" },
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
            Mag Sleeve is a fabric laptop sleeve that mounts to the side of your desk and automatically connects your laptop to all your peripherals via magnetic connectors. Drop your laptop in, everything connects instantly. Pick it up to leave, and it disconnects smoothly—no more fumbling with cables.
          </p>
          
          <p>
            It combines fabric fabrication, 3D printing, woodworking, and electronics to create a seamless desktop experience. This project pushed me to learn sewing, work with magnetic connectors, and think deeply about ergonomics and user experience.
          </p>
        </div>
      </div>

      {/* Demo Video */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">See It In Action</h3>
        <div className="relative w-full aspect-video overflow-hidden rounded-3xl bg-slate-100">
          <video
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          >
            <source src="/src/components/projects/assets/MagSleeve/mag_sleeve_demo.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Detail Photos Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">Design Details</h3>
        <p className="text-base text-slate-600 italic">
          Every element was designed for both function and aesthetics—from the heat dissipation slots to the adjustable mounting system.
        </p>
        
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="max-w-3xl sm:mx-auto mb-5"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover rounded-3xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1040px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-3xl">
                    <p className="text-white font-medium text-lg">{image.caption}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
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
            <strong>Fabric Construction.</strong> The sleeve is made from felt that I designed templates for and learned to sew. It's soft enough to protect the laptop while being sturdy enough to hold its shape when mounted vertically.
          </p>
          
          <p>
            <strong>Mounting System.</strong> Wooden dowels slide through the top of the sleeve and rest on 3D-printed brackets that attach to the side of the desk. The peg closer to the desk can slide, creating a gap that lets you fit your fingers in to lift out the laptop smoothly.
          </p>

          <p>
            <strong>Magnetic Connection.</strong> At the bottom of the sleeve is an alignment piece measured precisely for a 14" MacBook. It positions magnetic USB-C connectors to line up perfectly with the laptop's ports—drop the laptop in and it clicks into place magnetically.
          </p>

          <p>
            <strong>Cable Management.</strong> The cables from the magnetic connectors pass through a gap in the felt's stitched border at the bottom. My two monitors use USB-C for both power and display, so these two ports handle all my peripherals—keyboard, mouse, monitors, power, ethernet, everything.
          </p>

          <p>
            <strong>Thermal Design.</strong> The back side of the sleeve features decorative slots that serve a real purpose: they allow heat to dissipate from the laptop. Your laptop stays cooler, and the design looks intentional rather than purely functional.
          </p>
        </div>
      </div>

      {/* Fabrication Journey Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Fabrication Journey</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Learning to Sew.</strong> This project required learning fabric work from scratch. I created templates, practiced stitching, and figured out how to make clean seams and openings for the cables and mounting dowels.
          </p>
          
          <p>
            <strong>3D Printing Brackets.</strong> The mounting brackets went through several iterations to get the right balance of strength and elegance. They needed to be sturdy enough to hold a laptop securely but minimal enough to not dominate the desk aesthetic.
          </p>

          <p>
            <strong>Precise Measurements.</strong> The alignment piece at the bottom needed to be machined to precise tolerances. A millimeter off and the magnetic connectors wouldn't align properly. It took multiple prototypes to get it perfect.
          </p>

          <p>
            <strong>Cable Selection.</strong> Finding the right magnetic USB-C connectors was crucial. They needed to be strong enough to hold reliably but easy enough to disconnect when lifting the laptop. After testing several options, I found ones that hit the sweet spot.
          </p>
        </div>
      </div>

      {/* Daily Use Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Daily Use</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            The Mag Sleeve completely changed my desk workflow. Before, I'd have to disconnect two USB-C cables, unplug power, and manage the cable mess every time I wanted to work somewhere else. Now it's effortless: lift the laptop out and go, drop it back in when I return.
          </p>
          
          <p>
            The vertical storage also freed up valuable desk space. Instead of having my laptop taking up room on my desk, it hangs cleanly on the side, keeping my workspace open while still being instantly accessible.
          </p>

          <p>
            It's become one of those projects that I use every single day. There's something deeply satisfying about building a solution to your own problem and having it work exactly as intended, improving your daily routine in a tangible way.
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

