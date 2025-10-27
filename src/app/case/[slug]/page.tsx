import { notFound } from "next/navigation";
import { CaseSlider } from "./Slider";
import { Metadata } from "next";
import { getCaseData } from "./getCaseData";
// Импортируем функцию получения данных

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseId = params.slug;
  // Теперь getCaseData доступна
  const caseData = await getCaseData(caseId);

  if (!caseData) {
    return {
      title: "Case Not Found",
      description: "The requested case was not found.",
    };
  }

  const seo = caseData.seo || {};

  return {
    title: seo.title || caseData.title,
    description: seo.description || caseData.description,
    openGraph: {
      title: seo.title || caseData.title,
      description: seo.description || caseData.description,
      type: "article", // или 'website', в зависимости от контекста
      // url: `https://yourdomain.com/cases/${caseId}`, // Опционально
      // images: seo.og_image
      //   ? [
      //       {
      //         url:
      //           typeof seo.og_image === "string"
      //             ? seo.og_image
      //             : seo.og_image.url || "", // Адаптируйте под структуру вашего изображения
      //         width: seo.og_image.width, // Если доступно
      //         height: seo.og_image.height, // Если доступно
      //         alt: seo.og_image.alternativeText || caseData.title,
      //       },
      //     ]
      //   : undefined,
    },
    // twitter: {
    //   card: seo.twitter_card_type || "summary_large_image", // Предполагаем, что у вас есть такое поле в SEO
    //   title: seo.twitter_title || seo.title || caseData.title,
    //   description:
    //     seo.twitter_description || seo.description || caseData.description,
    //   images: seo.twitter_image
    //     ? [
    //         {
    //           url:
    //             typeof seo.twitter_image === "string"
    //               ? seo.twitter_image
    //               : seo.twitter_image.url || "",
    //           alt: seo.twitter_image.alternativeText || caseData.title,
    //         },
    //       ]
    //     : undefined,
    // },
    // Добавьте другие поля, если они есть в вашем SEO объекте
    keywords: seo.keyword, // Предполагаем, что у вас есть такое поле
    // ... другие мета-теги
  };
}

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const caseId = params.slug;

  const caseData = await getCaseData(caseId);

  if (!caseData) {
    notFound();
  }

  return (
    <section className="relative bg-black min-h-screen flex items-start px-6 overflow-hidden pt-24 w-full">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-[#4ade80]/10 rounded-full blur-3xl top-20 -left-20" />
          <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl bottom-20 -right-20" />
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="text-white text-3xl font-bold">{caseData.title}</h1>
          <p>{caseData.description}</p>
          <CaseSlider mediaSlider={caseData.mediaSlider} />
        </div>
      </div>
    </section>
  );
}
