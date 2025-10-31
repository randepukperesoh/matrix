
export interface Advantage {
  id: number;
  title: string;
  description: string;
}

export interface ThreePostOfAdvantage {
  id: number;
  title: string;
  description: string;
}

interface IHeroResponse {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  shortAdventages: Advantage[];
  ThreePostOfAdvantages: ThreePostOfAdvantage[];
}

export const getHero = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI + "/hero?populate=*", {
    cache: "force-cache",
    headers: {
      "Cache-Control": `public, s-maxage=${7200}, stale-while-revalidate=86400`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.data as IHeroResponse;
};