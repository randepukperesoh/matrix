import { ContactCard } from "@/components/enteties/contactCard";
import { Mail, Phone, MapPin, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ContactForm } from "./ui/contactForm";

export interface IContactCard {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  value: string;
  description: string;
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@devsolutions.ru",
    description: "Ответим в течение 24 часов",
  },
  {
    icon: Phone,
    title: "Телефон",
    value: "+7 (918) 591-29-26",
    description: "Пн-Вс с 00:00 до 23:59",
  },
  {
    icon: MapPin,
    title: "Офис",
    value: "Ожидается в ближайшем будущем",
    description: "",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#050505] py-12 md:py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl top-1/4 left-1/4" />
        <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl bottom-1/4 right-1/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-full mb-4">
            <span className="text-[#4ade80]" style={{ fontSize: "14px" }}>
              Свяжитесь с нами
            </span>
          </div>

          <h2
            className="text-white mb-4"
            style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.2 }}
          >
            Обсудим ваш проект
          </h2>
          <p
            className="text-gray-400 mx-auto"
            style={{ fontSize: "18px", maxWidth: "700px" }}
          >
            Оставьте заявку, и мы свяжемся с вами для бесплатной консультации
          </p>
        </div>

        <ContactForm />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {contactInfo.map((item) => (
            <ContactCard key={"contact_" + item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
