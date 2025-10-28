import { Advantage } from "../product-section";
import { AdvantagesItem } from "@/components/enteties/advantagesItem";

export const AdvantagesList = ({ list: advantages }: { list: Advantage[] }) => {
  return (
    <div>
      <h2
        className="text-white mb-6"
        style={{ fontSize: "40px", fontWeight: 600 }}
      >
        Преимущества
      </h2>
      <div className="space-y-4">
        {advantages.map((benefit, idx) => (
          <AdvantagesItem key={"benefit_" + idx} item={benefit.item} />
        ))}
      </div>
    </div>
  );
};
