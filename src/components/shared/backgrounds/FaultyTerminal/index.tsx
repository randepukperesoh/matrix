"use client";
import dynamic from "next/dynamic";

const DynamicFaultyTerminal = dynamic(() => import("./Terminal"), {
  ssr: false,
  loading: () => <div>Loading WebGL Terminal...</div>,
});

export default DynamicFaultyTerminal;
