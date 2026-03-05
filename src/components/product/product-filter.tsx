"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/categories";

interface ProductFilterProps {
  locale: string;
  currentCategory?: string;
}

export function ProductFilter({ locale, currentCategory }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("category");
  const tCommon = useTranslations("common");

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    // Reset to page 1 when filter changes
    params.delete("page");

    const queryString = params.toString();
    router.push(`/${locale}/products${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {locale === "ja" ? "カテゴリ" : "Category"}:
      </span>
      <Select
        value={currentCategory ?? "all"}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {tCommon("all")}
          </SelectItem>
          {CATEGORIES.map((category) => (
            <SelectItem
              key={category.key}
              value={category.handle}
            >
              {t(category.key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
