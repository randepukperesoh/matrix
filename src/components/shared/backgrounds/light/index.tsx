"use client";
import dynamic from "next/dynamic";

const MotionLight = dynamic(() => import("./Light"), {
  ssr: false,
});

export default MotionLight;
