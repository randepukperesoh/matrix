import { Code2, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const navigation = {
  services: [
    { name: 'CRM Системы', href: '#' },
    { name: 'ERP Решения', href: '#' },
    { name: 'Аналитика и BI', href: '#' },
    { name: 'Облачные решения', href: '#' }
  ],
  company: [
    { name: 'О компании', href: '#' },
    { name: 'Команда', href: '#team' },
    { name: 'Кейсы', href: '#cases' },
    { name: 'Карьера', href: '#' }
  ],
  support: [
    { name: 'Документация', href: '#' },
    { name: 'Техподдержка', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Контакты', href: '#contact' }
  ]
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' }
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
                DevSolutions
              </span>
            </div>
            <p className="text-gray-400 mb-6" style={{ fontSize: '14px', lineHeight: 1.6, maxWidth: '300px' }}>
              Создаём цифровые решения для бизнеса. Автоматизируем процессы и увеличиваем эффективность с 2017 года.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-[#4ade80]" />
                <span style={{ fontSize: '14px' }}>info@devsolutions.ru</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-[#4ade80]" />
                <span style={{ fontSize: '14px' }}>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-[#4ade80]" />
                <span style={{ fontSize: '14px' }}>Москва, Пресненская наб. 12</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Услуги
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-[#4ade80] transition-colors"
                    style={{ fontSize: '14px' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Компания
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-[#4ade80] transition-colors"
                    style={{ fontSize: '14px' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Поддержка
            </h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-[#4ade80] transition-colors"
                    style={{ fontSize: '14px' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500" style={{ fontSize: '14px' }}>
              © 2025 DevSolutions. Все права защищены.
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:bg-[#4ade80]/10 transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
