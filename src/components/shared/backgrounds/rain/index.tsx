"use client";
import dynamic from "next/dynamic";

const MotionRain = dynamic(() => import("./Rain"), {
  ssr: false,
});

export default MotionRain;
