import { notFound } from "next/navigation";
import { CaseSlider } from "./Slider";
import { generateMetadata, getCaseData } from "./lib";

export { generateMetadata };

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: caseId } = await params;

  const caseData = await getCaseData(caseId);

  if (!caseData) {
    notFound();
  }

  return (
    <section className="relative bg-black min-h-screen flex items-start p-6 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-[#4ade80]/10 rounded-full blur-3xl top-20 -left-20" />
          <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl bottom-20 -right-20" />
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="text-white text-3xl font-bold">{caseData.title}</h1>
          <p>{caseData.description}</p>
          <CaseSlider mediaSlider={caseData.mediaSlider} />
        </div>
      </div>
    </section>
  );
}
