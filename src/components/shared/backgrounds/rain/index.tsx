import dynamic from "next/dynamic";

const MotionRain = dynamic(() => import("./Rain"), {
  ssr: false,
  loading: () => <div>Loading Rain...</div>,
});

export default MotionRain;
