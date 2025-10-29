import { IImage, ISeo } from "@/components/shared/types";

export type Advantage = {
  id: number;
  item: string;
};

export type Function = {
  id: number;
  item: string;
};

export type Tech = {
  id: number;
  item: string | null;
};

export type ProductItem = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  price: string;
  photo?: IImage;
  functions: Function[];
  techList: Tech[];
  advantages: Advantage[];
  icon: string;
  seo: ISeo;
  documentId: string;
};

export const getProducts = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI + "/products?populate=*",
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${
          3600 * 24
        }, stale-while-revalidate=86400`,
      },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();

  return data.data as ProductItem[];
};