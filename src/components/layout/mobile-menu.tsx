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
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { key: "all", href: "/products" },
  { key: "interior", href: "/products?category=interior" },
  { key: "tableware", href: "/products?category=tableware" },
  { key: "fabric", href: "/products?category=fabric" },
  { key: "stationery", href: "/products?category=stationery" },
] as const;

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
          {/* Category Links */}
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              onClick={handleLinkClick}
              className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary"
            >
              {item.key === "all"
                ? t("common.all")
                : t(`category.${item.key}`)}
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
