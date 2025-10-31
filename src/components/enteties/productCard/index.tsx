import Link from "next/link";
import { Users, BarChart3, Building2, Smartphone, Fan } from "lucide-react";
import { ProductItem } from "@/components/widgets/product-section";

const iconMap = {
  Users: Users,
  BarChart3: BarChart3,
  Building2: Building2,
  Smartphone: Smartphone,
  undefined: Fan,
};

const ProductCard = ({
  icon,
  id,
  description,
  title,
  functions,
  price,
  subTitle,
  documentId,
}: ProductItem) => {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <Link key={id + description} href={`/product/${documentId}`}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-[#4ade80] transition-all duration-300 group cursor-pointer h-full flex flex-col">
        <div className="flex items-start gap-4 mb-6 flex-col sm:flex-row">
          <div className="w-14 h-14 bg-linear-to-br from-[#4ade80] to-[#22c55e] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-black" />
          </div>

          <div className="flex-1">
            <h3
              className="text-white mb-2"
              style={{ fontSize: "24px", fontWeight: 600 }}
            >
              {title}
            </h3>

            <p className="text-[#4ade80]" style={{ fontSize: "14px" }}>
              {subTitle}
            </p>
          </div>
        </div>

        <p
          className="text-gray-300 mb-6 grow"
          style={{ fontSize: "16px", lineHeight: 1.6 }}
        >
          {description}
        </p>

        <div className="border-t border-gray-800 pt-6 mb-6">
          <p
            className="text-gray-500 mb-3"
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Ключевые возможности
          </p>
          <ul className="space-y-2">
            {functions.slice(0, 3).map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-gray-300"
                style={{ fontSize: "14px" }}
              >
                <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></div>
                {feature.item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between flex-col sm:flex-row mt-auto">
          <span
            className="text-white"
            style={{ fontSize: "18px", fontWeight: 600 }}
          >
            от {price} рублей
          </span>
          <span
            className="text-[#4ade80] group-hover:translate-x-1 transition-transform"
            style={{ fontSize: "14px" }}
          >
            Подробнее →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
