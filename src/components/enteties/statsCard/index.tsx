import { Item } from "@/components/widgets/stats-section";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

const stats = [TrendingUp, Users, Award, Clock];

interface IStatsCard extends Item {
  i: number;
}

export const StatsCard = ({
  i,
  description,
  descriptionSecondary,
  title,
}: IStatsCard) => {
  const Icon = stats[i];

  return (
    <div className="bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group">
      <div className="w-12 h-12 bg-[#4ade80]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#4ade80]/20 transition-colors">
        <Icon className="w-6 h-6 text-[#4ade80]" />
      </div>

      <div
        className="text-white mb-2"
        style={{ fontSize: "36px", fontWeight: 700 }}
      >
        {title}
      </div>

      <div
        className="text-gray-200 mb-1"
        style={{ fontSize: "16px", fontWeight: 600 }}
      >
        {description}
      </div>

      <div className="text-gray-500" style={{ fontSize: "13px" }}>
        {descriptionSecondary}
      </div>
    </div>
  );
};
