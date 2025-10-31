import { ThreePostOfAdvantage } from "../lib";
import { Code2, Zap, Shield, Lamp, Check } from "lucide-react";

interface IThreePostOfAdvantagesCard extends ThreePostOfAdvantage {
  i: number;
}

const svgArr = [
  <Code2 key="code2" className="w-6 h-6 text-[#4ade80]" />,
  <Zap key="zap" className="w-6 h-6 text-[#4ade80]" />,
  <Shield key="shield" className="w-6 h-6 text-[#4ade80]" />,
  <Lamp key="lamp" className="w-6 h-6 text-[#4ade80]" />,
];

export const ThreePostOfAdvantagesCard = ({
  description,
  title,
  i,
}: IThreePostOfAdvantagesCard) => {
  return (
    <div className="md:w-82 w-full flex items-center gap-4 p-4 rounded-xl border border-gray-800">
      <div className="w-12 h-12  rounded-lg flex items-center justify-center shrink-0">
        {svgArr[i]}
      </div>
      <div className="flex-1">
        <div
          className="text-white mb-1"
          style={{ fontSize: "16px", fontWeight: 600 }}
        >
          {title}
        </div>
        <div className="text-gray-500" style={{ fontSize: "13px" }}>
          {description}
        </div>
      </div>
      <div>
        <Check className="w-6 h-6 text-[#4ade80]" />
      </div>
    </div>
  );
};
