"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
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
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Extract locale from pathname (e.g., /ja/products -> ja)
  const locale = pathname.split("/")[1] ?? "ja";

  const itemCount = cart?.items?.length ?? 0;

  // Check if current page is a category page
  const isProductsPage = pathname.startsWith(`/${locale}/products`);

  // Close mega menu on route change
  useEffect(() => {
    setMegaMenuOpen(false);
  }, [pathname]);

  // Close mega menu on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      megaMenuRef.current &&
      !megaMenuRef.current.contains(e.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      setMegaMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (megaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaMenuOpen, handleClickOutside]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="border-b border-border">
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

              <button
                ref={triggerRef}
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors hover:text-foreground",
                  megaMenuOpen ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {t("navigation.categories")}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    megaMenuOpen && "rotate-180"
                  )}
                />
              </button>
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
      </div>

      {/* Mega Menu */}
      <div
        ref={megaMenuRef}
        className={cn(
          "hidden lg:block overflow-hidden border-b border-border bg-secondary/60 shadow-sm transition-all duration-300 ease-in-out",
          megaMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-b-0"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 xl:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href={`/${locale}/products?category=${cat.handle}`}
                className="group flex items-center gap-2 py-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMegaMenuOpen(false)}
              >
                <span className="h-px w-3 bg-border transition-all group-hover:w-5 group-hover:bg-foreground" />
                {t(`category.${cat.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
