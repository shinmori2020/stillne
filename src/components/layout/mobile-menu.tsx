"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useUIStore } from "@/lib/stores/ui-store";
import { CATEGORIES } from "@/lib/categories";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function MobileMenu() {
  const pathname = usePathname();
  const t = useTranslations();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  // Extract locale from pathname
  const locale = pathname.split("/")[1] ?? "ja";

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={closeMobileMenu}>
      <SheetContent side="left" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle>
            <Link
              href={`/${locale}`}
              onClick={handleLinkClick}
              className="font-heading text-xl lowercase tracking-wide"
            >
              stillne
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col space-y-1" aria-label="Mobile navigation">
          {/* All Products */}
          <Link
            href={`/${locale}/products`}
            onClick={handleLinkClick}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary"
          >
            {t("common.all")}
          </Link>

          {/* Category Links */}
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/${locale}/products?category=${cat.handle}`}
              onClick={handleLinkClick}
              className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary"
            >
              {t(`category.${cat.key}`)}
            </Link>
          ))}

          <Separator className="my-4" />

          {/* Account Links */}
          <Link
            href={`/${locale}/account`}
            onClick={handleLinkClick}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary"
          >
            {t("account.myPage")}
          </Link>
          <Link
            href={`/${locale}/account/orders`}
            onClick={handleLinkClick}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary"
          >
            {t("account.orders")}
          </Link>

          <Separator className="my-4" />

          {/* Language & Theme */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-muted-foreground">Language</span>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
