import { Metadata } from "next";
import { ICase } from "@/components/widgets/cases-section";

export async function getCaseData(id: string): Promise<ICase | null> {
  const url = process.env.NEXT_PUBLIC_STRAPI +`/cases/${id}?populate=*`;
  
  const response = await fetch(url, {
    cache: "force-cache",

    headers: {
      "Cache-Control": `public, s-maxage=${3600 }, stale-while-revalidate=86400`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.data 
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug: caseId } = await params;

  const caseData = await getCaseData(caseId);

  if (!caseData) {
    return {
      title: "Case Not Found",
      description: "The requested case was not found.",
    };
  }

  const seo = caseData.seo || {};

  return {
    title: seo.title || caseData.title,
    description: seo.description || caseData.description,
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
    keywords: seo.keyword,
  };
}