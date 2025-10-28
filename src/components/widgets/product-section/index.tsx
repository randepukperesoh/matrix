import { ProductCard } from "@/components/enteties/productCard";
import { Advantage, Function, ProductItem, Tech, getProducts } from "./lib";
import DynamicFaultyTerminal from "@/components/shared/backgrounds/FaultyTerminal";

export { type Advantage, type Function, type ProductItem, type Tech };

export async function ProductsSection() {
  const response = await getProducts();

  if (!response) return null;

  return (
    <section id="products" className="py-12 md:py-24 px-6 w-full relative">
      <div className="absolute inset-0 z-10">
        <DynamicFaultyTerminal
          scale={5.5}
          gridMul={[0.25, 0.25]}
          digitSize={1.2}
          timeScale={0.25}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={0.25}
          chromaticAberration={0}
          mouseReact={false}
          dither={0}
          curvature={0.1}
          tint="#00FF41"
          pageLoadAnimation={false}
          brightness={1}
          className="w-full h-full "
        />
      </div>

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
