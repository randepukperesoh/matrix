import { Check } from "lucide-react";

export const FunctionItem = ({ item }: { item: string }) => {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 hover:border-[#4ade80] transition-all duration-300">
      <div className="w-10 h-10 bg-[#4ade80]/10 rounded-lg flex items-center justify-center mb-4">
        <Check className="w-5 h-5 text-[#4ade80]" />
      </div>
      <p className="text-white" style={{ fontSize: "16px", lineHeight: 1.6 }}>
        {item}
      </p>
    </div>
  );
};
