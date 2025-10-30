import { SectionCard } from "@/components/enteties/sectionCard";
import { IServiceResponse, getMatrixService } from "./lib";

export { type IServiceResponse, getMatrixService };

export async function ServicesSection() {
  const services = await getMatrixService();

  return (
    <section
      id="services"
      className="bg-[#050505] p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            Услуги
          </h2>
          <p
            className="text-gray-400 mx-auto"
            style={{ fontSize: "18px", maxWidth: "700px" }}
          >
            Области нашей экспертизы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <SectionCard key={"service_" + service.id} i={i} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
