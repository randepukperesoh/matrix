import { Database, Workflow, BarChart3, Lock, Cloud, Cog } from "lucide-react";

const serviceIcons = [Database, Workflow, BarChart3, Cloud, Cog, Lock];

interface Service {
  id: number;
  title: string;
  description: string;
  list: { id: string; item: string }[];
}

interface IServiceResponse {
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

const getMatrixService = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI + "/matrix-services/?populate=*",
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${
          3600 * 24
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

export async function ServicesSection() {
  const services = await getMatrixService();

  return (
    <section
      id="services"
      className="bg-[#050505] py-24 px-6 relative overflow-hidden"
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
          <div className="inline-block px-4 py-2 bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-full mb-4">
            <span className="text-[#4ade80]" style={{ fontSize: "14px" }}>
              Наши сервисы
            </span>
          </div>

          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            Сервисы
          </h2>
          <p
            className="text-gray-400 mx-auto"
            style={{ fontSize: "18px", maxWidth: "700px" }}
          >
            Наши разработки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <div
                key={service.id}
                className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#4ade80]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4ade80]/20 transition-colors">
                  <Icon className="w-7 h-7 text-[#4ade80]" />
                </div>

                <h3
                  className="text-white mb-3"
                  style={{ fontSize: "22px", fontWeight: 600 }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-gray-400 mb-6"
                  style={{ fontSize: "15px", lineHeight: 1.6 }}
                >
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {services.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-300"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full" />
                      {feature.title}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
