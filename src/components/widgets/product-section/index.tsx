import { ProductCard } from "@/components/enteties/productCard";
import { Advantage, Function, ProductItem, Tech, getProducts } from "./lib";

export { type Advantage, type Function, type ProductItem, type Tech };

export async function ProductsSection() {
  const response = await getProducts();

  if (!response) return null;

  return (
    <section id="products" className="py-12 md:py-24 px-6 w-full relative">
      <div className="absolute inset-0 z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col relative z-1000">
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
