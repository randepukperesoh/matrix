"use client";
import { motion } from "framer-motion";

const symbols =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789".split(
    ""
  );

const symbolCount = 10;

const sLength = symbols.length;

const numColumns = 4;

export const Matrix = () => {
  const arr = Array.from({ length: numColumns * symbolCount }, (_, i) => i);

  const symbolsListMostFlat = arr.map((el) => {
    const i = el / symbolCount;
    const j = el % numColumns;
    const rndNumber = Math.random();
    const twoRndNumber = rndNumber * 2;
    const jS = j / symbolCount;

    const symbol = symbols[Math.floor(rndNumber * sLength)];
    const opacity = 1 - jS;
    const fontSize = 14 + rndNumber * 6;
    const delay = twoRndNumber;
    const duration = 3 + twoRndNumber;
    const initialY = jS * 100;
    const finalY = initialY + 100;

    return {
      id: `${i}_${j}`,
      symbol,
      leftPos: `${(i / numColumns) * 100}%`,
      opacity,
      fontSize,
      delay,
      duration,
      initialY: `${initialY}vh`,
      finalY: `${finalY}vh`,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbolsListMostFlat.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-green-400 font-mono"
          style={{
            left: s.leftPos,
            opacity: s.opacity,
            fontSize: `${s.fontSize}px`,
            top: s.initialY,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: `calc(${s.finalY} - ${s.initialY})`,
            opacity: [0, s.opacity, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeIn",
            delay: s.delay,
            times: [0, 0.1, 1],
          }}
        >
          {s.symbol}
        </motion.div>
      ))}
    </div>
  );
};
