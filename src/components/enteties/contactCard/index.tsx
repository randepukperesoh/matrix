import { IContactCard } from "@/components/widgets/contact-section";

export const ContactCard = ({
  description,
  icon,
  title,
  value,
}: IContactCard) => {
  const Icon = icon;
  return (
    <div
      key={title}
      className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-[#4ade80] transition-all group"
    >
      <div className="w-12 h-12 bg-[#4ade80]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#4ade80]/20 transition-colors">
        <Icon className="w-6 h-6 text-[#4ade80]" />
      </div>
      <h3
        className="text-white mb-1"
        style={{ fontSize: "18px", fontWeight: 600 }}
      >
        {title}
      </h3>
      <p className="text-[#4ade80] mb-1" style={{ fontSize: "16px" }}>
        {value}
      </p>
      <p className="text-gray-500" style={{ fontSize: "14px" }}>
        {description}
      </p>
    </div>
  );
};
