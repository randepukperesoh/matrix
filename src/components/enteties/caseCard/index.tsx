import { ICase } from "@/components/widgets/cases-section";
import Link from "next/link";

export const CaseCard = ({
  tag,
  title,
  shortDescription,
  results,
  documentId,
}: ICase) => {
  return (
    <Link href={"/case/" + documentId}>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group h-full flex flex-col">
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 bg-[#4ade80]/10 text-[#4ade80] rounded-full"
            style={{ fontSize: "14px" }}
          >
            {tag}
          </span>
        </div>

        <h3
          className="text-white mb-3"
          style={{ fontSize: "24px", fontWeight: 600 }}
        >
          {title}
        </h3>

        <p
          className="text-gray-300 mb-6 grow"
          style={{ fontSize: "16px", lineHeight: 1.6 }}
        >
          {shortDescription}
        </p>

        <div className="border-t border-gray-800 pt-6 mt-auto">
          <p
            className="text-gray-500 mb-3"
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Результаты
          </p>
          <div className="flex flex-wrap gap-2">
            {results.map((result, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#0a0a0a] text-gray-300 rounded-lg border border-gray-800"
                style={{ fontSize: "14px" }}
              >
                {result.item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
