import { ProductItem } from "@/components/widgets/product-section";
import { Metadata } from "next";

export const getProduct = async (slug: string) => {
  const url = process.env.NEXT_PUBLIC_STRAPI + `/products/${slug}?populate=*`;

  const response = await fetch(url, {
    cache: "force-cache",
    headers: {
      "Cache-Control": `public, s-maxage=${
        3600 
      }, stale-while-revalidate=86400`,
    },
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data.data as ProductItem;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Продукт не найден",
      description: "Запрашиваемый продукт не существует.",
      openGraph: {
        title: "Matrix solutions",
        description: "Разрабатываем CRM и корпоративные системы под ключ. Автоматизируем процессы и увеличиваем эффективность вашего бизнеса.",
        type: "website",
        images: [
          {
            url: "/logo.svg",
            width: 1200,
            height: 630,
            alt: "Matrix Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image", 
        title: "Matrix",
        description: "Matrix solutions",
        images: "/logo.svg", 
      },
    };
  }

  const seoTitle = product.seo?.title;
  const seoDescription = product.seo?.description;
  const seoImage = product.photo?.url;
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
      type: "website",
      url: `https://yourdomain.com/product/${slug}`,
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
