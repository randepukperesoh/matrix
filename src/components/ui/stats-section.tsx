import { TrendingUp, Users, Award, Clock } from "lucide-react";

const stats = [TrendingUp, Users, Award, Clock];

interface Item {
  id: number;
  title: string;
  description: string;
  descriptionSecondary: string;
}

interface IStatsResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  item: Item[];
}

const getStats = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI + "/big-advantages?populate=*",
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

  return data.data as IStatsResponse[];
};

export async function StatsSection() {
  const response = await getStats();

  const items = response[0].item;
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stat, i) => {
            const Icon = stats[i];
            return (
              <div
                key={stat.id}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#4ade80]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#4ade80]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#4ade80]" />
                </div>

                <div
                  className="text-white mb-2"
                  style={{ fontSize: "36px", fontWeight: 700 }}
                >
                  {stat.title}
                </div>

                <div
                  className="text-gray-200 mb-1"
                  style={{ fontSize: "16px", fontWeight: 600 }}
                >
                  {stat.description}
                </div>

                <div className="text-gray-500" style={{ fontSize: "13px" }}>
                  {stat.descriptionSecondary}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
