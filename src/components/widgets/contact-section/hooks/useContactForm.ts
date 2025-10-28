import { useState } from "react";
import { toast } from "sonner";
import { sendContactForm } from "../lib";

export interface IContactForm {
    name: string;
    email: string;
    phone: string;
    tg: string;
    message: string;
}

export const useContactForm =() => {
      const [formData, setFormData] = useState<IContactForm>({
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
      await sendContactForm(formData)

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

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return{
    isSubmitting,
    handleChange,

        handleSubmit,
        formData,
        errors,
  }
}