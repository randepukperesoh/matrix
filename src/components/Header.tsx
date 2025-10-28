"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Услуги", href: "../#services" },
  { name: "Продукты", href: "../#products" },
  { name: "Кейсы", href: "../#cases" },
  { name: "Команда", href: "../#team" },
  { name: "Контакты", href: "../#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="..">
            <Image src="./logo.svg" alt="12313" height={60} width={120} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-[#4ade80] transition-colors"
                style={{ fontSize: "15px" }}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/brief"
              className="px-6 py-2.5 bg-[#1a1a1a] text-white border border-gray-800 rounded-lg hover:border-[#4ade80] hover:text-[#4ade80] transition-all"
            >
              <span style={{ fontSize: "15px", fontWeight: 600 }}>
                Заполнить бриф
              </span>
            </Link>
            <Link
              href="../#contact"
              className="px-6 py-2.5 bg-[#4ade80] text-black rounded-lg hover:bg-[#3bc970] transition-all"
            >
              <span style={{ fontSize: "15px", fontWeight: 600 }}>
                Связаться
              </span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-[#4ade80]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-[#4ade80] transition-colors"
                  style={{ fontSize: "16px" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/brief"
                className="px-6 py-2.5 bg-[#4ade80] text-black rounded-lg hover:bg-[#3bc970] transition-all w-full mt-2"
              >
                <span style={{ fontSize: "15px", fontWeight: 600 }}>
                  Заполнить бриф
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
