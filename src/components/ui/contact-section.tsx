"use client";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "./ui/toast";
import { env } from "process";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tg: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Некорректный номер телефона";
    }

    if (
      formData.tg &&
      !/^(t\.me\/[a-zA-Z0-9_]+|@[a-zA-Z0-9_]+)$/.test(formData.tg)
    ) {
      newErrors.tg =
        "Введите корректную ссылку на Telegram (t.me/username или @username)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND + "/send_form",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            fio: formData.name,
            number: formData.phone,
            telegram_link: formData.tg,
            message: formData.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        tg: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      toast.error("Произошла ошибка при отправке. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#050505] py-24 px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl top-1/4 left-1/4" />
        <div className="absolute w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl bottom-1/4 right-1/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-[#4ade80] transition-all group"
              >
                <div className="w-12 h-12 bg-[#4ade80]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#4ade80]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#4ade80]" />
                </div>
                <h3
                  className="text-white mb-1"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="text-[#4ade80] mb-1" style={{ fontSize: "16px" }}>
                  {item.value}
                </p>
                <p className="text-gray-500" style={{ fontSize: "14px" }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-gray-800 rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-[#0a0a0a] border-gray-800 text-white focus:border-[#4ade80] focus:ring-[#4ade80]/20 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Иван Иванов"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-[#0a0a0a] border-gray-800 text-white focus:border-[#4ade80] focus:ring-[#4ade80]/20 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="ivan@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Телефон
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`bg-[#0a0a0a] border-gray-800 text-white focus:border-[#4ade80] focus:ring-[#4ade80]/20 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="tg"
                  className="block text-white mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Ссылка на телеграмм
                </label>
                <Input
                  id="tg"
                  name="tg"
                  type="text"
                  value={formData.tg}
                  onChange={handleChange}
                  className={`bg-[#0a0a0a] border-gray-800 text-white focus:border-[#4ade80] focus:ring-[#4ade80]/20 ${
                    errors.tg ? "border-red-500" : ""
                  }`}
                  placeholder="t.me/username | @username"
                />
                {errors.tg && (
                  <p className="text-red-500 text-sm mt-1">{errors.tg}</p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-white mb-2"
                style={{ fontSize: "14px" }}
              >
                Сообщение *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`bg-[#0a0a0a] border-gray-800 text-white focus:border-[#4ade80] focus:ring-[#4ade80]/20 resize-none ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="Расскажите о вашем проекте..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4ade80] text-black hover:bg-[#3bc970] w-full sm:w-auto px-8 py-6 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Отправка...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Отправить заявку
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>

              <div
                className="flex items-center gap-2 text-gray-400"
                style={{ fontSize: "13px" }}
              >
                <CheckCircle className="w-4 h-4 text-[#4ade80]" />
                <span>Ответим в течение 24 часов</span>
              </div>
            </div>

            <p
              className="text-gray-500 mt-6 text-center sm:text-left"
              style={{ fontSize: "12px" }}
            >
              Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
