import { ArrowRight, Code2, Zap, Shield } from "lucide-react";
import { Fragment } from "react";
import MotionRain from "../shared/backgrounds/rain";

interface Advantage {
  id: number;
  title: string;
  description: string;
}

interface ThreePostOfAdvantage {
  id: number;
  title: string;
  description: string;
}

interface IHeroResponse {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  shortAdventages: Advantage[];
  ThreePostOfAdvantages: ThreePostOfAdvantage[];
}

const getHero = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI + "/hero?populate=*", {
    cache: "force-cache",
    headers: {
      "Cache-Control": `public, s-maxage=${7200}, stale-while-revalidate=86400`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.data as IHeroResponse;
};

const svgArr = [
  <Code2 key="code2" className="w-6 h-6 text-[#4ade80]" />,
  <Zap key="zap" className="w-6 h-6 text-[#4ade80]" />,
  <Shield key="shield" className="w-6 h-6 text-[#4ade80]" />,
];

export async function HeroSection() {
  const { ThreePostOfAdvantages, description, shortAdventages, title } =
    await getHero();

  const titleArr = title.split(" ");
  const startTitle = titleArr
    .filter((_, i) => i !== titleArr.length - 1)
    .join(" ");

  const endTitle = titleArr
    .filter((_, i) => i === titleArr.length - 1)
    .join(" ");

  return (
    <section className="relative bg-black flex items-center p-6 overflow-hidden">
      <div>
        <div className="bg-[#4ade80]/10 rounded-full blur-3xl top-20 -left-20" />
        <div className="bg-[#4ade80]/5 rounded-full blur-3xl bottom-20 -right-20" />
      </div>

      <MotionRain />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-[#4ade80]" />
              <span className="text-[#4ade80]" style={{ fontSize: "14px" }}>
                Цифровые решения для бизнеса
              </span>
            </div>

            <h1
              className="text-white mb-6"
              style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.1 }}
            >
              {startTitle} <span className="text-[#4ade80]">{endTitle}</span>
            </h1>

            <p
              className="text-gray-400 mb-8"
              style={{ fontSize: "20px", lineHeight: 1.6, maxWidth: "540px" }}
            >
              {description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact">
                <button className="px-8 py-4 bg-[#4ade80] text-black rounded-lg hover:bg-[#3bc970] transition-all flex items-center gap-2 group">
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Обсудить проект
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a href="#cases">
                <button className="px-8 py-4 bg-white/5 text-white border border-gray-800 rounded-lg hover:bg-white/10 hover:border-[#4ade80] transition-all">
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Наши работы
                  </span>
                </button>
              </a>
            </div>

            <div className="flex gap-8 xs: flex-col sm:flex-col md:flex-row">
              {shortAdventages.map((el, i) => (
                <Fragment key={el.title + "_" + i}>
                  <div>
                    <div
                      className="text-white mb-1"
                      style={{ fontSize: "32px", fontWeight: 700 }}
                    >
                      {el.title}
                    </div>
                    <div className="text-gray-500" style={{ fontSize: "14px" }}>
                      {el.description}
                    </div>
                  </div>
                  {i !== shortAdventages.length - 1 && (
                    <div className="hidden sm:block w-px bg-gray-800" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-linear-to-br mb-4 from-gray-900 to-black border border-gray-800 rounded-3xl backdrop-blur-sm lg:p-8 md:p-4 sm:p-2 p-2">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#4ade80]/20 rounded-full blur-2xl" />

              <div className="space-y-4">
                {ThreePostOfAdvantages.map((el, i) => (
                  <div
                    key={el.title + "_" + i}
                    className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-gray-800"
                  >
                    <div className="w-12 h-12 bg-[#4ade80]/10 rounded-lg flex items-center justify-center shrink-0">
                      {svgArr[i]}
                    </div>
                    <div className="flex-1">
                      <div
                        className="text-white mb-1"
                        style={{ fontSize: "16px", fontWeight: 600 }}
                      >
                        {el.title}
                      </div>
                      <div
                        className="text-gray-500"
                        style={{ fontSize: "13px" }}
                      >
                        {el.description}
                      </div>
                    </div>
                    <div
                      className="text-[#4ade80]"
                      style={{ fontSize: "20px", fontWeight: 700 }}
                    >
                      ✓
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-linear-to-r from-[#4ade80]/10 to-transparent border border-[#4ade80]/20 rounded-xl">
                <div
                  className="text-[#4ade80] mb-1"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  💡 Бесплатная консультация
                </div>
                <div className="text-gray-400" style={{ fontSize: "13px" }}>
                  Обсудим ваш проект и подберём оптимальное решение
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
