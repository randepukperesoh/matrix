import { IServiceResponse } from "@/components/widgets/service-section";
import {
  Workflow,
  BarChart3,
  Lock,
  Cloud,
  Cog,
  AirplayIcon,
  DicesIcon,
} from "lucide-react";

const serviceIcons = [
  AirplayIcon,
  DicesIcon,
  Workflow,
  BarChart3,
  Cloud,
  Cog,
  Lock,
];

interface ISectionCard extends IServiceResponse {
  i: number;
}
export const SectionCard = ({
  title,
  services,
  description,
  i,
}: ISectionCard) => {
  const Icon = serviceIcons[i];
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group">
      <div className="w-14 h-14 bg-[#4ade80]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4ade80]/20 transition-colors">
        <Icon className="w-7 h-7 text-[#4ade80]" />
      </div>

      <h3
        className="text-white mb-3"
        style={{ fontSize: "22px", fontWeight: 600 }}
      >
        {title}
      </h3>

      <p
        className="text-gray-400 mb-6"
        style={{ fontSize: "15px", lineHeight: 1.6 }}
      >
        {description}
      </p>

      <ul className="space-y-2">
        {services?.map((feature, idx) => (
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
};
