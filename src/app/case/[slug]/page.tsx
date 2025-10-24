import { Case } from "@/components/ui/cases-section";
import { notFound } from "next/navigation";
import LexicalRenderer from "./Lexical";
import { CaseSlider } from "./Slider";

async function getCaseData(id: string): Promise<Case | null> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI +
      `/our-case?populate[cases][populate]=mediaSlider`,
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${3600 * 24}, stale-while-revalidate=86400`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  const res = (data.data.cases as Case[]).filter((el) => el.id + "" === id);

  return res[0];
}

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const caseId = params.slug;

  const caseData = await getCaseData(caseId);

  if (!caseData) {
    notFound();
  }

  return (
    <section className="relative bg-black min-h-screen flex items-start px-6 overflow-hidden pt-24 w-full">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-[#4ade80]/10 rounded-full blur-3xl top-20 -left-20" />
          <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl bottom-20 -right-20" />
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="text-white text-3xl font-bold">{caseData.title}</h1>

          <LexicalRenderer content={caseData.description} />
          <CaseSlider mediaSlider={caseData.mediaSlider} />
        </div>
      </div>
    </section>
  );
}
