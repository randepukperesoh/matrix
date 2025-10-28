import { ProductCard } from "@/components/enteties/productCard";
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

const getProducts = async () => {
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

export async function ProductsSection() {
  const response = await getProducts();

  if (!response) return null;

  return (
    <section id="products" className="bg-black py-12 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            Наши продукты
          </h2>
          <p
            className="text-gray-400"
            style={{ fontSize: "18px", maxWidth: "600px" }}
          >
            Готовые решения для автоматизации и развития вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {response.map((product) => (
            <ProductCard key={"product_" + product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
