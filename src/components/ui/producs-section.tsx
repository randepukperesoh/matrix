import { Users, BarChart3, Building2, Smartphone } from "lucide-react";
import Link from "next/link";
import { IImage } from "../shared/types";

const iconMap = {
  Users: Users,
  BarChart3: BarChart3,
  Building2: Building2,
  Smartphone: Smartphone,
};

type Advantage = {
  id: number;
  item: string;
};

type Function = {
  id: number;
  item: string;
};

type Tech = {
  id: number;
  item: string | null;
};

export type ProductItem = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  price: string;
  photo?: IImage;
  functions: Function[];
  techList: Tech[];
  advantages: Advantage[];
  icon: string;
};

const getProducts = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI + "/products?populate=*",
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${3600 * 24}, stale-while-revalidate=86400`,
      },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();

  return data.data as ProductItem[];
};

export async function ProductsSection() {
  const response = await getProducts();

  if (!response) return null;

  return (
    <section id="products" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            Наши продукты
          </h2>
          <p
            className="text-gray-400"
            style={{ fontSize: "18px", maxWidth: "600px" }}
          >
            Готовые решения для автоматизации и развития вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {response.map((product) => {
            const Icon = iconMap[product.icon as keyof typeof iconMap];

            return (
              <Link
                key={product.id + product.description}
                href={`/product/${product.id}`}
              >
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-black" />
                    </div>

                    <div className="flex-1">
                      <h3
                        className="text-white mb-2"
                        style={{ fontSize: "24px", fontWeight: 600 }}
                      >
                        {product.title}
                      </h3>

                      <p
                        className="text-[#4ade80]"
                        style={{ fontSize: "14px" }}
                      >
                        {product.subTitle}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-gray-300 mb-6"
                    style={{ fontSize: "16px", lineHeight: 1.6 }}
                  >
                    {product.description}
                  </p>

                  <div className="border-t border-gray-800 pt-6 mb-6">
                    <p
                      className="text-gray-500 mb-3"
                      style={{
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      Ключевые возможности
                    </p>
                    <ul className="space-y-2">
                      {product.functions.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-300"
                          style={{ fontSize: "14px" }}
                        >
                          <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></div>
                          {feature.item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-white"
                      style={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      от {product.price}Р в мес
                    </span>
                    <span
                      className="text-[#4ade80] group-hover:translate-x-1 transition-transform"
                      style={{ fontSize: "14px" }}
                    >
                      Подробнее →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
