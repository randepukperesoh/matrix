import { IImage } from "../shared/types";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Github, Linkedin, Mail } from "lucide-react";

interface TeamMember {
  id: number;
  fio: string;
  profession: string;
  professionSecondary: string;
  description: string;
  skill: { item: string }[];
  photo: IImage;
}

interface ITeamResponse {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  teams: TeamMember[];
}

const getTeam = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI +
      "/teams?populate[teams][populate][]=skill&populate[teams][populate][]=photo",
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, s-maxage=${3600 * 24}, stale-while-revalidate=86400`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.data as ITeamResponse[];
};

export async function TeamSection() {
  const response = await getTeam();

  const { teams: team, title, description } = response[0];

  return (
    <section id="team" className="bg-[#000000] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            {title}
          </h2>
          <p
            className="text-gray-400 mx-auto"
            style={{ fontSize: "18px", maxWidth: "700px" }}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team?.map((member) => (
            <div
              key={member.id}
              className="bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#4ade80] transition-all duration-300 group"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <ImageWithFallback
                  src={`http://localhost:1337` + member.photo.url}
                  alt={member.photo.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <h3
                    className="text-white mb-1"
                    style={{ fontSize: "22px", fontWeight: 600 }}
                  >
                    {member.fio}
                  </h3>
                  <p className="text-[#4ade80]" style={{ fontSize: "14px" }}>
                    {member.profession}
                  </p>
                  <p className="text-gray-500" style={{ fontSize: "13px" }}>
                    {member.professionSecondary}
                  </p>
                </div>

                <p
                  className="text-gray-400 mb-4"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  {member.description}
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
                    {member.skill.map((skill, idx) => (
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

                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-[#4ade80] hover:bg-[#4ade80]/10 transition-all">
                    <Github className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-[#4ade80] hover:bg-[#4ade80]/10 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-[#4ade80] hover:bg-[#4ade80]/10 transition-all">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
