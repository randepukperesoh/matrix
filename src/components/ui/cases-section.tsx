import { IImage, LexicalContent } from "../shared/types";
import { CaseCard } from "../shared/ui/caseCard";

export interface Case {
  id: number;
  tag: string;
  title: string;
  description: LexicalContent;
  shortDescription: string;
  results: { item: string }[];
  mediaSlider: IImage[];
}

interface ICasesResponse {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string; // или Date, если будете парсить
  updatedAt: string; // или Date, если будете парсить
  publishedAt: string; // или Date, если будете парсить
  cases: Case[];
}

export const getCases = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI +
      "/our-case?populate[cases][populate]=results",
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${3600 * 24}, stale-while-revalidate=86400`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.data as ICasesResponse;
};

export async function CasesSection() {
  const response = await getCases();
  const { cases, title, description } = response;

  return (
    <section id="cases" className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            {title}
          </h2>
          <p
            className="text-gray-400"
            style={{ fontSize: "18px", maxWidth: "600px" }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.id} {...caseItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
