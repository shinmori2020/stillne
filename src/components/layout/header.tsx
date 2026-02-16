"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { key: "all", href: "/products" },
  { key: "interior", href: "/products?category=interior" },
  { key: "tableware", href: "/products?category=tableware" },
  { key: "fabric", href: "/products?category=fabric" },
  { key: "stationery", href: "/products?category=stationery" },
] as const;

export function Header() {
  const pathname = usePathname();
  const t = useTranslations();
  const { openCart, toggleMobileMenu, openSearch } = useUIStore();
  const { data: cart } = useCart();

  // Extract locale from pathname (e.g., /ja/products -> ja)
  const locale = pathname.split("/")[1] ?? "ja";

  const itemCount = cart?.items?.length ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12">
        {/* Mobile: Hamburger menu */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleMobileMenu}
          aria-label={t("navigation.menu")}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-heading text-xl lowercase tracking-wide"
        >
          stillne
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                pathname === `/${locale}${item.href}`
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.key === "all"
                ? t("common.all")
                : t(`category.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openSearch}
            aria-label={t("common.search")}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Language Switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Theme Toggle */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          {/* Account */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden lg:flex"
          >
            <Link href={`/${locale}/account`} aria-label={t("navigation.account")}>
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            aria-label={`${t("navigation.cart")}（${itemCount}${t("cart.itemCount", { count: itemCount })}）`}
            className="relative"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-xs text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
