import BriefForm from "@/components/widgets/briefForm";
import { generateMetadata } from "./lib";

export { generateMetadata };

export default function BriefPage() {
  return (
    <div className="min-h-screen bg-black p-6 w-full">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#4ade80]/10 rounded-full blur-3xl top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl bottom-20 -right-20" />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 700 }}
          >
            Бриф проекта
          </h1>
          <p className="text-gray-400" style={{ fontSize: "18px" }}>
            Заполните бриф, чтобы мы могли лучше понять ваш проект и подготовить
            персональное предложение
          </p>
        </div>

        <BriefForm />
      </div>
    </div>
  );
}
