interface Service {
  id: number;
  title: string;
  description: string;
  list: { id: string; item: string }[];
}

export interface IServiceResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tag: string;
  title: string;
  description: string;
  services: Service[];
}


export const getMatrixService = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI + "/matrix-services/?populate=*",
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${
          3600 
        }, stale-while-revalidate=86400`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.data as IServiceResponse[];
};