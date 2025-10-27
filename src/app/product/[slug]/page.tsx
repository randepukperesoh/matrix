// app/product/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation"; // Для обработки отсутствующего продукта
import { ContactSection } from "@/components/ui/contact-section";
import { ImageWithFallback } from "@/components/ui/figma/ImageWithFallback";
import { ProductItem } from "@/components/ui/producs-section"; // Убедитесь, что тип импортирован
import {
  ArrowLeft,
  Users,
  BarChart3,
  Building2,
  Smartphone,
  Check,
} from "lucide-react";
import Link from "next/link";

// Карта иконок
const iconMap = {
  Users: Users,
  BarChart3: BarChart3,
  Building2: Building2,
  Smartphone: Smartphone,
};

const getProduct = async (slug: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI + "/products?populate=*",
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${
          3600 * 24
        }, stale-while-revalidate=86400`,
      },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();

  const products = data.data as ProductItem[];
  const product = products.find((el) => el.id === +slug); // Используем find вместо filter

  return product || null; // Возвращаем null, если продукт не найден
};

// Функция генерации метаданных
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Продукт не найден",
      description: "Запрашиваемый продукт не существует.",
    };
  }

  const seoTitle = product.seo?.title;
  const seoDescription = product.seo?.description;
  const seoImage = product.photo?.url; // Предполагается, что photo.url - это путь к изображению
  const keywords = product.seo?.title;

  const fullImageURL = seoImage
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL + seoImage}`
    : undefined;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: fullImageURL ? [fullImageURL] : [],
      type: "website", // или 'product', если применимо
      url: `https://yourdomain.com/product/${params.slug}`, // Замените на ваш домен
    },
    keywords,
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: fullImageURL ? [fullImageURL] : [],
    },
  };
}

// Основной компонент страницы
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  // Если продукт не найден, показываем 404
  if (!product) {
    notFound(); // Это вызывает стандартную 404 страницу Next.js
  }

  const Icon = iconMap[product.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen bg-black w-full">
      {/* Ваш существующий JSX код для отображения продукта */}
      {/* --- Начало JSX --- */}
      <section className="relative bg-[#0a0a0a] pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products" // Обновите путь, если необходимо
            className="flex items-center gap-2 text-gray-400 hover:text-[#4ade80] transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontSize: "15px" }}>Назад к продуктам</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-2xl flex items-center justify-center">
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
                    {product.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800">
                <ImageWithFallback
                  src={"http://localhost:1337" + product.photo?.url}
                  alt={product.photo?.alternativeText || product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#4ade80]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-white mb-12"
            style={{ fontSize: "40px", fontWeight: 600 }}
          >
            Функциональность
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.functions.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 hover:border-[#4ade80] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#4ade80]/10 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-[#4ade80]" />
                </div>
                <p
                  className="text-white"
                  style={{ fontSize: "16px", lineHeight: 1.6 }}
                >
                  {feature.item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2
                className="text-white mb-6"
                style={{ fontSize: "40px", fontWeight: 600 }}
              >
                Технологии
              </h2>
              <p
                className="text-gray-400 mb-8"
                style={{ fontSize: "18px", lineHeight: 1.7 }}
              >
                Мы используем современный стек технологий для создания надежных
                и масштабируемых решений
              </p>
              <div className="flex flex-wrap gap-3">
                {product.techList.map((tech, idx) =>
                  tech.item ? ( // Проверяем, что item не null
                    <span
                      key={idx}
                      className="px-4 py-2 bg-black border border-gray-800 text-gray-300 rounded-lg"
                      style={{ fontSize: "15px" }}
                    >
                      {tech.item}
                    </span>
                  ) : null
                )}
              </div>
            </div>

            <div>
              <h2
                className="text-white mb-6"
                style={{ fontSize: "40px", fontWeight: 600 }}
              >
                Преимущества
              </h2>
              <div className="space-y-4">
                {product.advantages.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-black border border-gray-800 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-[#4ade80] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <p
                      className="text-gray-300"
                      style={{ fontSize: "16px", lineHeight: 1.6 }}
                    >
                      {benefit.item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      {/* --- Конец JSX --- */}
    </div>
  );
}
