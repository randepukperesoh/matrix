"use client";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/ui/input";
import { Textarea } from "@/components/ui/ui/textarea";
import { Button } from "@/components/ui/ui/button";
import { useContactForm } from "../hooks/useContactForm";

export const ContactForm = () => {
  const { handleChange, isSubmitting, handleSubmit, errors, formData } =
    useContactForm();

  return (
    <div className="bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] border border-gray-800 rounded-3xl p-8 md:p-12">
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
  );
};
