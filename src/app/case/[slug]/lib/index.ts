import { Metadata } from "next";
import { ICase } from "@/components/widgets/cases-section";

export async function getCaseData(id: string): Promise<ICase | null> {
  const url = process.env.NEXT_PUBLIC_STRAPI +`/cases/${id}?populate=*`;
  
  const response = await fetch(url, {
    cache: "force-cache",

    headers: {
      "Cache-Control": `public, s-maxage=${3600 * 24}, stale-while-revalidate=86400`,
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
      title: seo.title || caseData.title,
      description: seo.description || caseData.description,
      type: "article",
    },
    keywords: seo.keyword,
  };
}