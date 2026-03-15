"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export default function FaqPage() {
  const t = useTranslations("pages.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="border-t">
          {FAQ_KEYS.map((key, index) => (
            <div key={key} className="border-b">
              <button
                onClick={() => handleToggle(index)}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-5 text-left text-base font-medium transition-colors hover:text-primary md:px-6 md:py-6"
              >
                {t(`items.${key}.question`)}
                <ChevronDown
                  className={cn(
                    "ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  openIndex === index ? "grid-rows-[1fr] pb-5 md:pb-6" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-4 text-sm leading-relaxed text-muted-foreground md:px-6 md:text-base">
                    {t(`items.${key}.answer`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollFadeIn>
    </div>
  );
}
