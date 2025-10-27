import { ISeo } from "@/components/shared/types";
import BriefForm from "./briefForm";
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

export default function BriefPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-6 w-full">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#4ade80]/10 rounded-full blur-3xl top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl bottom-20 -right-20" />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 700 }}
          >
            Бриф проекта
          </h1>
          <p className="text-gray-400" style={{ fontSize: "18px" }}>
            Заполните бриф, чтобы мы могли лучше понять ваш проект и подготовить
            персональное предложение
          </p>
        </div>

        <BriefForm />
      </div>
    </div>
  );
}
