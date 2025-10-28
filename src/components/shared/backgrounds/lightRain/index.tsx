"use client";
import dynamic from "next/dynamic";

const MotionLight = dynamic(() => import("./LightRain"), {
  ssr: false,
});

export default MotionLight;
