import { Check } from "lucide-react";

export const AdvantagesItem = ({ item }: { item: string }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-black border border-gray-800 rounded-lg">
      <div className="w-6 h-6 bg-[#4ade80] rounded-full flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-4 h-4 text-black" />
      </div>
      <p
        className="text-gray-300"
        style={{ fontSize: "16px", lineHeight: 1.6 }}
      >
        {item}
      </p>
    </div>
  );
};
