import { CasesSection } from "@/components/ui/cases-section";
import { ContactSection } from "@/components/ui/contact-section";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/ui/hero-section";
import { ServicesSection } from "@/components/ui/services-section";
import { StatsSection } from "@/components/ui/stats-section";
import { TeamSection } from "@/components/ui/team-section";

interface ISeoResponse {
  data: {
    id: number;
    seo: {
      title: string;
      description: string;
      keyword: string;
    };
  };
}

export async function generateMetadata(): Promise<import("next").Metadata> {
  try {
    const res = await fetch("http://localhost:1337/api/home-seo?populate=*", {
      // cache: "no-store", // Отключить кэширование (если нужно)
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch SEO data: ${res.status} ${res.statusText}`
      );
      return {
        title: "Matrix",
        description: "Matrix solutions",
      };
    }

    const jsonData: ISeoResponse = await res.json();

    const attributes = jsonData.data.seo;
    const title = attributes.title;
    const description = attributes.description;
    const keywords = attributes.keyword;

    return {
      title,
      description,
      other: keywords ? { keywords } : undefined,
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

const Home = async () => {
  return (
    <div className="size-full bg-black">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <CasesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
