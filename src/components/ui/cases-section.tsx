import { IImage, ISeo } from "../shared/types";
import { CaseCard } from "../shared/ui/caseCard";

export interface ICase {
  id: number;
  tag: string;
  title: string;
  description: string;
  shortDescription: string;
  results: { item: string }[];
  mediaSlider: IImage[];
  seo: ISeo;
}

export const getCases = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI + "/cases?populate=*",
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
    return [];
  }

  const data = await res.json();

  return data.data as ICase[];
};

export async function CasesSection() {
  const cases = await getCases();

  return (
    <section id="cases" className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            Наши кейсы
          </h2>
          <p
            className="text-gray-400"
            style={{ fontSize: "18px", maxWidth: "600px" }}
          >
            Реальные проекты, которые принесли измеримые результаты нашим
            клиентам
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
