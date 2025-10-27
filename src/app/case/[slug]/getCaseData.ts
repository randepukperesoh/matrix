// lib/getCaseData.ts
import { ICase } from "@/components/ui/cases-section";

export async function getCaseData(id: string): Promise<ICase | null> {
  // Проверьте правильность URL и endpoint в Strapi
  // Вероятно, должно быть /cases/{id}, а не /case/{id}
  const endpoint = `/cases/${id}?populate[mediaSlider]=*`; // Уточните populate в соответствии с вашей схемой Strapi
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}${endpoint}`, {
    cache: "force-cache",
    headers: {
      "Cache-Control": `public, s-maxage=${3600 * 24}, stale-while-revalidate=86400`,
    },
  });

  if (!response.ok) {
    // console.error('Failed to fetch case:', response.status, response.statusText); // Для отладки
    return null;
  }

  const data = await response.json();

  // Strapi может возвращать данные внутри поля data
  return data.data || data; // Возвращаем data.data, если это формат Strapi v4, или просто data, если структура плоская
}