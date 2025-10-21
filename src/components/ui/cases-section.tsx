interface Case {
  id: number;
  tag: string;
  title: string;
  description: string;
  results: { item: string }[];
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

const getCases = async () => {
  const res = await fetch(
    "http://localhost:1337/api/our-cases?populate[cases][populate]=results",
    {
      // cache: "no-store", // Отключить кэширование (если нужно)
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.data as ICasesResponse[];
};

export async function CasesSection() {
  const reponse = await getCases();
  const { cases, title, description } = reponse[0];

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
            <div
              key={caseItem.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group"
            >
              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1 bg-[#4ade80]/10 text-[#4ade80] rounded-full"
                  style={{ fontSize: "14px" }}
                >
                  {caseItem.tag}
                </span>
              </div>

              <h3
                className="text-white mb-3"
                style={{ fontSize: "24px", fontWeight: 600 }}
              >
                {caseItem.title}
              </h3>

              {/* <p className="text-gray-400 mb-2" style={{ fontSize: "14px" }}>
                Клиент:{" "}
                <span className="text-[#4ade80]">{caseItem.client}</span>
              </p> */}

              <p
                className="text-gray-300 mb-6"
                style={{ fontSize: "16px", lineHeight: 1.6 }}
              >
                {caseItem.description}
              </p>

              <div className="border-t border-gray-800 pt-6">
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
                  {caseItem.results.map((result, idx) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
