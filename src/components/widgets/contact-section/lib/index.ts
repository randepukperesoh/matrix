import { IContactForm } from "../hooks/useContactForm";

export const sendContactForm = async (formData: IContactForm) =>{
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

      return response
} 