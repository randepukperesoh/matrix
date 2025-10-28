import { ISeo } from "@/components/shared/types";
import { Metadata } from "next";

interface ISeoResponse {
  data: {
    id: number;
    seo: ISeo;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_STRAPI + "/brief?populate=*",
      {
        cache: "force-cache",
        headers: {
          "Cache-Control": `public, s-maxage=${
            3600 * 24
          }, stale-while-revalidate=86400`,
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
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Matrix",
      description: "Matrix solution",
    };
  }
}