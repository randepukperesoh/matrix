"use client";
import { motion } from "framer-motion";

const LightRain = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-0.5"
          style={{
            left: `${i * 5}%`,
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.3), transparent)",
          }}
          animate={{
            y: ["-100%", "200%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
};

export default LightRain;
