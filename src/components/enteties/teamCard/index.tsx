import { TeamMember } from "@/components/widgets/team-section";
import Image from "next/image";
// import { Github, Linkedin, Mail } from "lucide-react";

export const TeamCard = ({
  id,
  photo,
  fio,
  description,
  profession,
  professionSecondary,
  skill,
}: TeamMember) => {
  return (
    <div
      key={id}
      className="bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#4ade80] transition-all duration-300 group"
    >
      <div className="aspect-square bg-linear-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        {photo && (
          <Image
            width={350}
            height={350}
            src={photo.url}
            alt={photo?.alternativeText || "alt"}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3
            className="text-white mb-1"
            style={{ fontSize: "22px", fontWeight: 600 }}
          >
            {fio}
          </h3>
          <p className="text-[#4ade80]" style={{ fontSize: "14px" }}>
            {profession}
          </p>
          <p className="text-gray-500" style={{ fontSize: "13px" }}>
            {professionSecondary}
          </p>
        </div>

        <p
          className="text-gray-400 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.6 }}
        >
          {description}
        </p>

        <div className="mb-4">
          <p
            className="text-gray-500 mb-2"
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Навыки
          </p>
          <div className="flex flex-wrap gap-2">
            {skill.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#1a1a1a] text-gray-300 rounded border border-gray-800"
                style={{ fontSize: "12px" }}
              >
                {skill.item}
              </span>
            ))}
          </div>
        </div>

        {/* <div className="flex gap-3 pt-4 border-t border-gray-800">
          <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-[#4ade80] hover:bg-[#4ade80]/10 transition-all">
            <Github className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-[#4ade80] hover:bg-[#4ade80]/10 transition-all">
            <Linkedin className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-[#4ade80] hover:bg-[#4ade80]/10 transition-all">
            <Mail className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </div>
  );
};
