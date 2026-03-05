"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { useUIStore } from "@/lib/stores/ui-store";
import { searchProducts } from "@/lib/api/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function SearchModal() {
  const locale = useLocale();
  const t = useTranslations();
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const found = searchProducts(query);
      setResults(found);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Reset on close
  useEffect(() => {
    if (!isSearchOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // Auto-focus input on open
  const handleOpenAutoFocus = useCallback((e: Event) => {
    e.preventDefault();
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const handleSelect = useCallback(() => {
    closeSearch();
  }, [closeSearch]);

  const getPrice = (product: Product) => {
    const price = product.variants?.[0]?.prices?.[0];
    if (!price) return "";
    return formatPrice(price.amount, price.currency_code, locale);
  };

  const getCategory = (product: Product) => {
    return product.categories?.[0]?.name ?? "";
  };

  const hasQuery = query.trim().length > 0;

  return (
    <Dialog open={isSearchOpen} onOpenChange={(open) => !open && closeSearch()}>
      <DialogContent
        className="top-[10%] translate-y-0 sm:max-w-xl"
        onOpenAutoFocus={handleOpenAutoFocus}
      >
        <DialogTitle className="sr-only">
          {t("common.search")}
        </DialogTitle>

        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 p-0 text-base shadow-none focus-visible:ring-0"
            aria-label={t("search.inputLabel")}
          />
          {hasQuery && (
            <button
              onClick={() => setQuery("")}
              className="shrink-0 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
              aria-label={t("common.close")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results */}
        {hasQuery && (
          <ScrollArea className="max-h-[60vh]">
            {results.length > 0 ? (
              <ul className="space-y-1 py-2">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/${locale}/products/${product.handle}`}
                      onClick={handleSelect}
                      className="flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-secondary"
                    >
                      {/* Thumbnail */}
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
                        {product.thumbnail ? (
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <PlaceholderImage className="rounded-md" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {getCategory(product) && (
                            <span>{getCategory(product)}</span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <span className="shrink-0 text-sm font-medium">
                        {getPrice(product)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center text-sm text-muted-foreground">
                {t("search.noResults")}
              </div>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
