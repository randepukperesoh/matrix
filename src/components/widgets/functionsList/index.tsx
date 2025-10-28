import { Function } from "../product-section";
import { FunctionItem } from "@/components/functionItem";

export const FunctionsList = ({ functions }: { functions: Function[] }) => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-white mb-12"
          style={{ fontSize: "40px", fontWeight: 600 }}
        >
          Функциональность
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functions.map((feature, idx) => (
            <FunctionItem item={feature.item} key={"feature_" + idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
