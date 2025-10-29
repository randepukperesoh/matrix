import { StatsCard } from "@/components/enteties/statsCard";

export interface Item {
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
        "Cache-Control": `public, s-maxage=${3600}, stale-while-revalidate=86400`,
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
    <section className="bg-black py-10 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stat, i) => (
            <StatsCard key={"stats_" + stat.id} i={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
