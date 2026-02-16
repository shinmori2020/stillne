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

const SORT_OPTIONS = [
  { key: "newest", value: "newest" },
  { key: "priceAsc", value: "priceAsc" },
  { key: "priceDesc", value: "priceDesc" },
] as const;

interface ProductSortProps {
  locale: string;
  currentSort?: string;
}

export function ProductSort({ locale, currentSort }: ProductSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("sort");

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "newest") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    // Reset to page 1 when sort changes
    params.delete("page");

    const queryString = params.toString();
    router.push(`/${locale}/products${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {locale === "ja" ? "並び替え" : "Sort"}:
      </span>
      <Select
        value={currentSort ?? "newest"}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.key} value={option.value}>
              {t(option.key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
