import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/ui/hero-section";
import { CasesSection } from "@/components/widgets/cases-section";
import { ContactSection } from "@/components/widgets/contact-section";
import { ProductsSection } from "@/components/widgets/product-section";
import { ServicesSection } from "@/components/widgets/service-section";
import { StatsSection } from "@/components/widgets/stats-section";
import { TeamSection } from "@/components/widgets/team-section";
import { generateMetadata } from "./lib";

export { generateMetadata };

const Home = async () => {
  return (
    <div className="size-full bg-black mt-28 xl:mt-0">
      ХУЙ
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
