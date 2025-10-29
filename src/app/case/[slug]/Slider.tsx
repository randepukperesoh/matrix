// "use client";

import Image from "next/image";
import { IImage } from "@/components/shared/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CaseSliderProps = {
  mediaSlider: IImage[];
};

export function CaseSlider({ mediaSlider }: CaseSliderProps) {
  if (mediaSlider.length === 0) {
    return <p className="text-white">Нет изображений для отображения.</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {mediaSlider.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-96 md:h-[500px] bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alternativeText || "Case media"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
