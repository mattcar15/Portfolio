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

import campView from './assets/CarCamper/camp_view.jpeg';
import internalView from './assets/CarCamper/internal_view.jpeg';
import oilChange from './assets/CarCamper/oil_change.jpeg';
import frontView from './assets/CarCamper/front_view.jpeg';
import sideView from './assets/CarCamper/side_view.jpeg';
import backSleepingView from './assets/CarCamper/back_sleeping_view.jpeg';
import marcView from './assets/CarCamper/marc_view.jpeg';
import cookingView from './assets/CarCamper/cooking_view.jpeg';

const images = [
  { src: campView, caption: "Camp View" },
  { src: internalView, caption: "Internal View" },
  { src: backSleepingView, caption: "Back Sleeping View" },
  { src: frontView, caption: "Front View" },
  { src: cookingView, caption: "Cooking View" },
  { src: sideView, caption: "Side View" },
  { src: marcView, caption: "Marc View" },
];

export default function CarCamper() {
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

      {/* Build Details Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Build</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            To make this adventure possible, I designed and built out a custom camper conversion in my Subaru Forester with help from friends. It was an ambitious project that turned my car into a fully self-sufficient mobile home.
          </p>
          
          <p>
            <strong>Storage & Kitchen.</strong> We built two dedicated compartments for clothes and gear. Above the wheel well, we installed a fridge in a custom frame. The stove folded down in front of it, creating a flat cooking surface.
          </p>

          <p>
            <strong>Sleeping Setup.</strong> The front seats moved forward and a piece of the insert lifted up to create a level platform. We used crash pads as our mattress—surprisingly comfortable for a month of camping.
          </p>

          <p>
            <strong>Solar Power.</strong> A custom fiberglass box on the roof housed solar panels wired to the internals. This kept the fridge running continuously off-grid—a total game changer for the trip.
          </p>

          <p>
            <strong>Ventilation.</strong> My favorite feature was the magnetic bug net for the back hatch. On warm nights, we slept with the trunk open for airflow without worrying about mosquitoes.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">The Journey</h3>
        <div className="text-lg text-slate-700 space-y-5 leading-relaxed">
          <p>
            After graduating college, I wanted to go on a cross-country road trip. Living in Atlanta at the time, I planned an epic adventure heading west with a friend.
          </p>
          
          <p>
            <strong>Nashville & Chicago.</strong> Our first stop was Nashville, where we immersed ourselves in authentic country music on Broadway. Then north to Chicago for deep-dish pizza and a night tour of the city.
          </p>

          <p>
            <strong>The Badlands.</strong> The landscape changed dramatically in South Dakota. Buffalo roaming free, otherworldly rock formations, and Wall Drug (iykyk). The stark beauty was unlike anything we'd experienced.
          </p>

          <p>
            <strong>Yellowstone.</strong> We spent days wandering through geothermal wonders and spotting wildlife. We hilariously mistimed our visit—apparently, we came during one of the busiest weekends of the year. Still, watching geysers erupt and seeing bison up close was unforgettable.
          </p>

          <p>
            <strong>San Francisco & Yosemite.</strong> Met up with friends in SF, then headed to one of the trip highlights: Yosemite. We conquered Half Dome and Clouds Rest, stayed at the legendary Camp 4, and took in breathtaking views from the valley.
          </p>

          <p>
            <strong>San Diego.</strong> Hung out with friends and I tackled a personal milestone—my first oil change. It felt surprisingly satisfying to do it myself on the road. Afterward, we went surfing to celebrate.
          </p>

          <div className="my-8">
            <Image
              src={oilChange}
              alt="First oil change in San Diego"
              width={1200}
              height={900}
              className="w-full h-auto rounded-3xl"
            />
            <p className="text-center text-sm text-slate-500 mt-3 italic">My first oil change in San Diego—a proud moment on the road</p>
          </div>

          <p>
            <strong>Vegas & Grand Canyon.</strong> An impromptu night in Las Vegas—a wild contrast to the natural wonders we'd been seeing. Then the Grand Canyon, where we hiked to the bottom on a scorching hot day. Coming back up in that heat was brutal.
          </p>

          <p>
            <strong>Route 66 & Colorado.</strong> Made classic stops at the Colorado Dam and drove the iconic Route 66. Boulder and Denver gave us a taste of mountain town life before the long journey east.
          </p>

          <p>
            <strong>The Finale.</strong> On our way back to Connecticut, we caught The Lumineers performing live from the pit in rural Pennsylvania. Standing in that crowd, feeling the music, knowing we'd just completed something truly special together—the perfect ending to an incredible month.
          </p>

          <p>
            The camper conversion made it all possible. Every feature we'd built proved its worth. From cooking in national park parking lots to sleeping under the stars with the hatch open, the car became our home and adventure base.
          </p>
        </div>
      </div>
    </div>
  );
}

export const carCamperMetadata = {
  id: 6,
  title: "Car Camper",
  description: "Custom-built camper conversion for cross-country adventure",
  type: "gradient" as const,
  tags: ["Design", "Fabrication", "Adventure"],
  height: "h-[380px] md:h-[460px]",
  component: CarCamper
};
