import { ISeo } from "@/components/shared/types";
import { CasesSection } from "@/components/ui/cases-section";
import { ContactSection } from "@/components/ui/contact-section";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/ui/hero-section";
import { ProductsSection } from "@/components/ui/producs-section";
import { ServicesSection } from "@/components/ui/services-section";
import { StatsSection } from "@/components/ui/stats-section";
import { TeamSection } from "@/components/ui/team-section";

interface ISeoResponse {
  data: {
    id: number;
    seo: ISeo;
  };
}

export async function generateMetadata(): Promise<import("next").Metadata> {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_STRAPI + "/home-seo?populate=*",
      {
        cache: "force-cache",
        headers: {
          "Cache-Control": `public, s-maxage=${
            3600 * 24
          }, stale-while-revalidate=86400`,
        },
      }
    );

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
      title: "Matrix",
      description: "Matrix solution",
    };
  }
}

const Home = async () => {
  return (
    <div className="size-full bg-black">
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <StatsSection />
      <CasesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
