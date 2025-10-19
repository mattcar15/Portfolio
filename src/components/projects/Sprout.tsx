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
  { srcKey: "Sprout/presentation", caption: "Project Presentation" },
  { srcKey: "Sprout/app_controls", caption: "App Controls Interface" },
  { srcKey: "Sprout/app_plants", caption: "Plant Management Screen" },
];

export default function Sprout() {
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
      {/* Image Carousel */}
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

      {/* Overview Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Project</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            Sprout was a project I did with a few friends in college for a program called Idea 2 Prototype at Georgia Tech. We designed an automated growing system for plants that combined hardware fabrication with mobile app development.
          </p>
          
          <p>
            The goal was to make growing plants at home as easy as possible by automating water cycles, lighting, and monitoring—all controlled from your phone.
          </p>
        </div>
      </div>

      {/* Technical Details Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">What I Built</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Hardware Design.</strong> I helped design the CAD for the planter itself using Onshape, focusing on a design that was both functional and manufacturable. After finalizing the design, I handled the 3D printing and ABS welding to assemble the pieces into a sturdy, watertight planter.
          </p>
          
          <p>
            <strong>Mobile App.</strong> I designed the app interface and wrote about half the codebase using React Native. The app gave users control over water cycles, lighting schedules, and stored general plant information to help track growth over time.
          </p>

          <p>
            <strong>Backend & Integration.</strong> We used Firebase as our backend, which made it easy to sync data between the hardware and the app in real-time. Users could adjust settings from anywhere and the planter would respond immediately.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Features</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            <strong>Automated Watering.</strong> Set custom watering schedules or let the system decide based on sensor data. The app let you trigger manual waterings or adjust the schedule on the fly.
          </p>
          
          <p>
            <strong>Smart Lighting.</strong> Control grow lights remotely to give your plants the perfect amount of light. Set schedules that match natural day/night cycles or customize for specific plant needs.
          </p>

          <p>
            <strong>Plant Profiles.</strong> Store information about each plant—when you planted it, what variety it is, and track its growth over time. The app became a digital garden journal.
          </p>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Experience</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            This project was an incredible learning experience in bringing together hardware and software. Coordinating physical fabrication with app development taught me a lot about the challenges of IoT products and the importance of reliable hardware-software communication.
          </p>
          
          <p>
            Working with a team through the Idea 2 Prototype program at Georgia Tech gave us structure and resources to take the project from concept to working prototype. It was rewarding to see something we designed on a screen come to life as a functional product.
          </p>
        </div>
      </div>
    </div>
  );
}

export const sproutMetadata = {
  id: 5,
  title: "Sprout",
  description: "Automated hydroponic system with mobile app control",
  type: "gradient" as const,
  tags: ["React Native", "CAD", "IoT"],
  height: "h-[380px] md:h-[400px]",
  component: Sprout
};
