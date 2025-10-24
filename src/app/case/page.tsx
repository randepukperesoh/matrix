import { CaseCard } from "@/components/shared/ui/caseCard";
import { getCases } from "@/components/ui/cases-section";

export default async function Case() {
  const response = await getCases();

  const { cases } = response;
  return (
    <section className="relative bg-black min-h-screen flex items-start px-6 overflow-hidden pt-24">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col gap-2 ">
          <h1
            className="text-white mb-6"
            style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.1 }}
          >
            Наши кейсы
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((el, i) => (
              <CaseCard key={el.title + "_" + i} {...el} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
