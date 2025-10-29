import { ISeo } from "@/components/shared/types";

interface ISeoResponse {
  data: {
    id: number;
    seo: ISeo;
  };
}

export async function generateMetadata(): Promise<import("next").Metadata> {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_STRAPI + "/home-seo?populate=*",
      {
        cache: "force-cache",
        headers: {
          "Cache-Control": `public, s-maxage=${3600}, stale-while-revalidate=86400`,
        },
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch SEO data: ${res.status} ${res.statusText}`
      );
      return {
        title: "Matrix",
        description: "Matrix solutions",
      };
    }

    const jsonData: ISeoResponse = await res.json();

    const attributes = jsonData.data.seo;
    const title = attributes.title;
    const description = attributes.description;
    const keywords = attributes.keyword;

    return {
      title,
      description,
      other: keywords ? { keywords } : undefined,
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
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Matrix",
      description: "Matrix solution",
    };
  }
}
