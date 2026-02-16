"use client";

import { usePathname, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/constants";

const LOCALE_LABELS: Record<SupportedLocale, { flag: string; label: string }> = {
  ja: { flag: "🇯🇵", label: "日本語" },
  en: { flag: "🇬🇧", label: "English" },
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname (e.g., /ja/products -> ja)
  const currentLocale = (pathname.split("/")[1] ?? "ja") as SupportedLocale;

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    if (newLocale === currentLocale) return;

    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    router.push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="font-mono text-sm">
          {currentLocale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className="flex items-center justify-between"
          >
            <span>
              {LOCALE_LABELS[locale].flag} {LOCALE_LABELS[locale].label}
            </span>
            {locale === currentLocale && (
              <Check className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
