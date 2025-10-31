import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import MotionRain from "@/components/shared/backgrounds/rain";
import { getHero } from "./lib";
// import { ShortAdventagesCard } from "./ui/shortAdventagesCard";
import { ThreePostOfAdvantagesCard } from "./ui/ThreePostOfAdvantagesCard";

export async function HeroSection() {
  const { ThreePostOfAdvantages, description, title } = await getHero();

  const titleArr = title.split(" ");

  const startTitle = titleArr
    .filter((_, i) => i !== titleArr.length - 1)
    .join(" ");

  const endTitle = titleArr
    .filter((_, i) => i === titleArr.length - 1)
    .join(" ");

  return (
    <section className="w-full relative bg-black flex items-center p-6 overflow-hidden">
      <MotionRain />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="w-full gap-12">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-[#4ade80]" />
              <span className="text-[#4ade80]" style={{ fontSize: "14px" }}>
                Цифровые решения для бизнеса
              </span>
            </div>

            <div className="w-full flex flex-col justify-between md:flex-row gap-6">
              <div>
                <h1
                  className="text-white mb-6"
                  style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.1 }}
                >
                  {startTitle}{" "}
                  <span className="text-[#4ade80]">{endTitle}</span>
                </h1>

                <p
                  className="text-gray-400 mb-8"
                  style={{
                    fontSize: "20px",
                    lineHeight: 1.6,
                    maxWidth: "540px",
                  }}
                >
                  {description}
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link href="#contact">
                    <button className="px-8 py-4 bg-[#4ade80] text-black rounded-lg hover:bg-[#3bc970] transition-all flex items-center gap-2 group">
                      <span style={{ fontSize: "16px", fontWeight: 600 }}>
                        Обсудить проект
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  {/* <Link href="#cases">
                    <button className="px-8 py-4 bg-white/5 text-white border border-gray-800 rounded-lg hover:bg-white/10 hover:border-[#4ade80] transition-all">
                      <span style={{ fontSize: "16px", fontWeight: 600 }}>
                        Наши работы
                      </span>
                    </button>
                  </Link> */}
                </div>

                {/* <div className="flex gap-8 xs: flex-col sm:flex-col md:flex-row relative">
                  {shortAdventages.map((el, i) => (
                    <ShortAdventagesCard
                      len={shortAdventages.length}
                      i={i}
                      key={el.title + "_" + i}
                      {...el}
                    />
                  ))}
                </div> */}
              </div>

              <div className="flex flex-col gap-4 w-full md:w-2/3 items-end">
                {ThreePostOfAdvantages.map((el, i) => (
                  <ThreePostOfAdvantagesCard
                    i={i}
                    key={el.title + "_" + i}
                    {...el}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
