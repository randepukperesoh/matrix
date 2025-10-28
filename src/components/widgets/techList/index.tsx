import { TechItem } from "@/components/enteties/techitem";
import { Tech } from "../product-section";

export const TechList = ({ techList }: { techList: Tech[] }) => {
  return (
    <div>
      <h2
        className="text-white mb-6"
        style={{ fontSize: "40px", fontWeight: 600 }}
      >
        Технологии
      </h2>
      <p
        className="text-gray-400 mb-8"
        style={{ fontSize: "18px", lineHeight: 1.7 }}
      >
        Мы используем современный стек технологий для создания надежных и
        масштабируемых решений
      </p>
      <div className="flex flex-wrap gap-3">
        {techList.map((tech, idx) => (
          <TechItem item={tech.item || "strapi"} key={"tech_" + idx} />
        ))}
      </div>
    </div>
  );
};
