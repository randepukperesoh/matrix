import { IImage } from "@/components/shared/types";
import { TeamCard } from "@/components/enteties/teamCard";
import LightRain from "@/components/shared/backgrounds/lightRain/LightRain";

export interface TeamMember {
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
        "Cache-Control": `public, s-maxage=${3600}, stale-while-revalidate=86400`,
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
    <section id="team" className="bg-[#000000] relative py-12 md:py-24 px-6">
      <div className="absolute inset-0 overflow-hidden">
        <LightRain />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            <TeamCard key={"team_" + member.id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
