import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navigation = {
  services: [
    { name: "Data Science и ML", href: "../#services" },
    { name: "UI/UX-дизайн", href: "../#services" },
    { name: "Разработка ПО", href: "../#services" },
    { name: "Веб-разработка", href: "../#services" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Link href="..">
                <Image src="./logo.svg" alt="12313" height={60} width={120} />
              </Link>
            </div>
            <p
              className="text-gray-400 mb-6"
              style={{ fontSize: "14px", lineHeight: 1.6, maxWidth: "300px" }}
            >
              Создаём цифровые решения для бизнеса. Автоматизируем процессы и
              увеличиваем эффективность с 2017 года.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-[#4ade80]" />
                <span style={{ fontSize: "14px" }}>info@devsolutions.ru</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-[#4ade80]" />
                <span style={{ fontSize: "14px" }}>+7 (918) 591-29-26</span>
              </div>
            </div>
          </div>

          <div>
            <h3
              className="text-white mb-4"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Услуги
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-[#4ade80] transition-colors"
                    style={{ fontSize: "14px" }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500" style={{ fontSize: "14px" }}>
              © 2025 Matrix Solutions. Все права защищены.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
