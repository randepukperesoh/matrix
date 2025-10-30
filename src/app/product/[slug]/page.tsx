import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Users,
  BarChart3,
  Building2,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ContactSection } from "@/components/widgets/contact-section";
import { TechList } from "@/components/widgets/techList";
import { AdvantagesList } from "@/components/widgets/advantagesList";
import { FunctionsList } from "@/components/widgets/functionsList";
import { getProduct, generateMetadata } from "./lib";

export { generateMetadata };

const iconMap = {
  Users: Users,
  BarChart3: BarChart3,
  Building2: Building2,
  Smartphone: Smartphone,
};

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const Icon = iconMap[product.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen bg-black w-full">
      <section className="relative bg-[#0a0a0a] p-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-[#4ade80] transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontSize: "15px" }}>Назад к продуктам</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-[#4ade80] to-[#22c55e] rounded-2xl flex items-center justify-center">
                  <Icon className="w-9 h-9 text-black" />
                </div>
              </div>

              <h1
                className="text-white mb-4"
                style={{ fontSize: "56px", fontWeight: 700, lineHeight: 1.1 }}
              >
                {product.title}
              </h1>

              <p className="text-[#4ade80] mb-6" style={{ fontSize: "24px" }}>
                {product.subTitle}
              </p>

              <p
                className="text-gray-300 mb-8"
                style={{ fontSize: "18px", lineHeight: 1.7 }}
              >
                {product.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-[#4ade80] text-black rounded-lg hover:bg-[#3bc970] transition-all"
                >
                  <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    Получить консультацию
                  </span>
                </Link>
                <div className="px-8 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg">
                  <span
                    className="text-white"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    от {product.price} рублей
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-gray-800">
                {product.photo && (
                  <Image
                    width={500}
                    height={350}
                    src={product.photo.url}
                    alt={product.photo.alternativeText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#4ade80]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <FunctionsList functions={product.functions} />

      <section className="bg-[#0a0a0a] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <TechList techList={product.techList} />

            <AdvantagesList list={product.advantages} />
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
