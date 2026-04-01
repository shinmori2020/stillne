"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const t = useTranslations();
  const { openCart, toggleMobileMenu, openSearch } = useUIStore();
  const { data: cart } = useCart();

  // Extract locale from pathname (e.g., /ja/products -> ja)
  const locale = pathname.split("/")[1] ?? "ja";

  const itemCount = cart?.items?.length ?? 0;

  // Check if current page is a category page
  const isProductsPage = pathname.startsWith(`/${locale}/products`);

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
          className="font-heading text-2xl lowercase tracking-wide md:text-3xl"
        >
          stillne
        </Link>

        {/* Right side: Navigation + Icons */}
        <div className="flex items-center gap-1">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-6 mr-2" aria-label="Main navigation">
            <Link
              href={`/${locale}/products`}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                isProductsPage ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {t("common.all")}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("navigation.categories")}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem key={cat.key} asChild>
                    <Link
                      href={`/${locale}/products?category=${cat.handle}`}
                      className="cursor-pointer"
                    >
                      {t(`category.${cat.key}`)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
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
