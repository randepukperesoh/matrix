"use client";
import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/ui/radio-group";
import { Label } from "@/components/ui/ui/label";
import { Input } from "@/components/ui/ui/input";
import { Textarea } from "@/components/ui/ui/textarea";
import { Button } from "@/components/ui/ui/button";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "sonner";

const projectTypes = [
  {
    id: "web",
    label: "Веб-разработка",
    description:
      "Создание frontend и backend компонентов веб-сайтов и веб-приложений",
  },
  {
    id: "mobile",
    label: "Мобильные и десктоп приложения",
    description:
      "Разработка, внедрение и сопровождение десктоп и мобильных приложений",
  },
  {
    id: "bot",
    label: "Разработка ботов",
    description:
      "Разработка, внедрение и сопровождение десктоп и мобильных приложений",
  },
  {
    id: "ui_ux",
    label: "UI/UX разработка",
    description:
      "Создание продуманного и эстетичного пользовательского интерфейса",
  },
  {
    id: "seo",
    label: "SEO-продвижение",
    description:
      "Комплексное продвижение в интернете: SEO-оптимизация сайтов, настройка и ведение рекламных кампаний в Яндекс Директ и Google Ads, аналитика результатов через Google Analytics для увеличения трафика и конверсий",
  },
  {
    id: "ml",
    label: "Data Science и ML",
    description:
      "Создание модулей и приложений на основе технологий машинного обучения для автоматизации и оптимизации.",
  },
];

const timeframes = [
  { id: "1-2", label: "1-2 месяца", description: "Быстрый запуск MVP" },
  { id: "3-6", label: "3-6 месяцев", description: "Средний проект" },
  { id: "6-12", label: "6-12 месяцев", description: "Крупный проект" },
  { id: "12+", label: "Более 12 месяцев", description: "Комплексное решение" },
];

interface BriefFormData {
  projectType: string;
  budget: number[];
  timeframe: string;
  contactName: string;
  email: string;
  additionalInfo: string;
  number: string;
  telegram_link: string;
}

export default function BriefForm() {
  const form = useForm<BriefFormData>({
    defaultValues: {
      projectType: "",
      budget: [0.5],
      timeframe: "",
      contactName: "",
      email: "",
      additionalInfo: "",
      number: "",
      telegram_link: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
  } = form;

  const babki = watch("budget");

  const onSubmit = async (data: BriefFormData) => {
    const briefData = {
      ...data,
      budget: data.budget[0] + "млн",
      timeframes: data.timeframe + "месяцев",
    };

    try {
      const url = process.env.NEXT_PUBLIC_BACKEND + "/send_form_topic";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(briefData),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        toast.success("Бриф отправлен! Мы свяжемся с вами в ближайшее время.");
      } else {
        toast.error("Ошибка при отправке брифа.");
      }
    } catch (error) {
      console.error("Error submitting brief:", error);
      // toast.error('Ошибка при отправке брифа.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div>
        <h2
          className="text-white mb-6"
          style={{ fontSize: "32px", fontWeight: 600 }}
        >
          Тип проекта
        </h2>
        <p className="text-gray-400 mb-8" style={{ fontSize: "16px" }}>
          Выберите направление, которое лучше всего описывает ваш проект
        </p>

        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              className="space-y-4"
              onValueChange={(e) => field.onChange(e)}
            >
              {projectTypes.map((type, i) => {
                return (
                  <label
                    htmlFor={type.id}
                    key={type.id + "_" + i}
                    className={`relative border rounded-xl p-6 cursor-pointer transition-all 
                      ${clsx({
                        "border-[#4ade80] bg-[#4ade80]/5":
                          field.value === type.id,
                        "border-gray-800 hover:border-gray-700":
                          field.value !== type.id,
                      })}
                      `}
                  >
                    <div className="flex items-start gap-4">
                      <RadioGroupItem
                        itemID={type.id}
                        value={type.id}
                        id={type.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={type.id}
                          className="text-white cursor-pointer"
                          style={{ fontSize: "18px", fontWeight: 600 }}
                        >
                          {type.label}
                        </Label>
                        <p
                          className="text-gray-400 mt-1"
                          style={{ fontSize: "14px" }}
                        >
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </RadioGroup>
          )}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="space-y-10">
          <div>
            <div className="mb-6">
              <h2
                className="text-white mb-6"
                style={{ fontSize: "32px", fontWeight: 600 }}
              >
                Бюджет
              </h2>
              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <SliderPrimitive.Root
                    className="relative flex items-center select-none touch-none h-5 w-full"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    max={5}
                    min={0.1}
                    step={0.1}
                  >
                    <SliderPrimitive.Track className="relative grow rounded-full bg-gray-700 h-2 overflow-hidden">
                      <SliderPrimitive.Range className="absolute h-full bg-linear-to-r from-[#4ade80] to-[#22c55e] rounded-full" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-[#4ade80] bg-[#4ade80] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
                  </SliderPrimitive.Root>
                )}
              />
            </div>
            <div
              className="flex justify-between text-gray-500"
              style={{ fontSize: "12px" }}
            >
              <span>100К</span>
              <span>
                {babki[0] < 1 ? babki[0] * 1000 + " К" : babki[0] + " М"}
              </span>
              <span>5M+</span>
            </div>
          </div>

          <div>
            <h2
              className="text-white mb-6"
              style={{ fontSize: "32px", fontWeight: 600 }}
            >
              Сроки реализации
            </h2>
            <Controller
              name="timeframe"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                  className="space-y-3"
                >
                  {timeframes.map((tf) => (
                    <label
                      htmlFor={tf.id}
                      key={tf.id}
                      className={`relative border rounded-xl p-5 cursor-pointer transition-all ${clsx(
                        {
                          "border-[#4ade80] bg-[#4ade80]/5":
                            field.value === tf.id,
                          "border-gray-800 hover:border-gray-700":
                            field.value !== tf.id,
                        }
                      )}`}
                    >
                      <div className="flex items-start gap-4">
                        <RadioGroupItem
                          value={tf.id}
                          id={tf.id}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={tf.id}
                            className="text-white cursor-pointer"
                            style={{ fontSize: "16px", fontWeight: 600 }}
                          >
                            {tf.label}
                          </Label>
                          <p
                            className="text-gray-400 mt-1"
                            style={{ fontSize: "13px" }}
                          >
                            {tf.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <h2
          className="text-white mb-6"
          style={{ fontSize: "32px", fontWeight: 600 }}
        >
          Контактная информация
        </h2>
        <p className="text-gray-400 mb-8" style={{ fontSize: "16px" }}>
          Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
        </p>

        <div className="space-y-6">
          <div>
            <Label
              htmlFor="contactName"
              className="text-white mb-2 block"
              style={{ fontSize: "15px" }}
            >
              Контактное лицо *
            </Label>
            <Controller
              name="contactName"
              control={control}
              render={({ field }) => (
                <Input
                  id="contactName"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Иван Иванов"
                  className={`bg-black border-gray-800 text-white`}
                />
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-white mb-2 block"
              style={{ fontSize: "15px" }}
            >
              Email *
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="example@company.com"
                  className={`bg-black border-gray-800 text-white `}
                />
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="block text-white mb-2"
              style={{ fontSize: "15px" }}
            >
              Телефон
            </Label>
            <Controller
              control={control}
              name="number"
              render={({ field }) => (
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="bg-black border-gray-800 text-white"
                  placeholder="+7 (999) 123-45-67"
                />
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="tg"
              className="block text-white mb-2"
              style={{ fontSize: "15px" }}
            >
              Ссылка на телеграмм
            </Label>
            <Controller
              control={control}
              name="telegram_link"
              render={({ field }) => (
                <Input
                  id="tg"
                  name="tg"
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="bg-black border-gray-800 text-white"
                  placeholder="t.me/username | @username"
                />
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="additionalInfo"
              className="text-white mb-2 block"
              style={{ fontSize: "15px" }}
            >
              Дополнительная информация
            </Label>
            <Textarea
              id="additionalInfo"
              {...register("additionalInfo", {
                required: true,
                minLength: {
                  value: 10,
                  message: "Минимальная длина 10 символов",
                },
              })}
              placeholder="Любые дополнительные детали о проекте или специальные требования..."
              className="bg-black border-gray-800 text-white min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 bg-linear-to-r from-[#4ade80] to-[#22c55e] text-black rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            className="flex items-center justify-center gap-2"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            <Check className="w-5 h-5" />
            Отправить бриф
          </span>
        </Button>
      </div>
    </form>
  );
}
