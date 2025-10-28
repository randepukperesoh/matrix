"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IImage } from "@/components/shared/types";

type CaseSliderProps = {
  mediaSlider: IImage[];
};

const AUTOPLAY_INTERVAL_MS = 5000;

export function CaseSlider({ mediaSlider }: CaseSliderProps) {
  const [sliderValue, setSliderValue] = useState([0]);

  const currentIndex = sliderValue[0];

  const safeIndex = Math.min(Math.max(currentIndex, 0), mediaSlider.length - 1);
  const currentImage = mediaSlider[safeIndex];

  useEffect(() => {
    if (mediaSlider.length <= 1) return;

    const interval = setInterval(() => {
      setSliderValue((prev) => {
        const nextIndex = (prev[0] + 1) % mediaSlider.length;
        return [nextIndex];
      });
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [mediaSlider.length]);

  if (mediaSlider.length === 0) {
    return <p className="text-white">Нет изображений для отображения.</p>;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-10">
      <div className="relative w-full h-96 md:h-[500px] bg-gray-800 rounded-lg overflow-hidden">
        <Image
          src={currentImage.url}
          alt={currentImage.alternativeText || "Case media"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
