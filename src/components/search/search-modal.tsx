"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Search, X, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { useUIStore } from "@/lib/stores/ui-store";
import { searchProducts, type SearchResult } from "@/lib/api/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

const SUGGESTED_KEYWORDS_JA = [
  "フラワーベース",
  "キャンドル",
  "マグカップ",
  "リネン",
  "レザー",
  "ガラス",
  "家具",
  "照明",
];

const SUGGESTED_KEYWORDS_EN = [
  "vase",
  "candle",
  "mug",
  "linen",
  "leather",
  "glass",
  "furniture",
  "lighting",
];

export function SearchModal() {
  const locale = useLocale();
  const t = useTranslations();
  const { isSearchOpen, openSearch, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedKeywords =
    locale === "ja" ? SUGGESTED_KEYWORDS_JA : SUGGESTED_KEYWORDS_EN;

  // Keyboard shortcut: "/" to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !isSearchOpen &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, openSearch]);

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

  const handleSuggestedClick = useCallback((keyword: string) => {
    setQuery(keyword);
  }, []);

  const getPrice = (product: Product) => {
    const price = product.variants?.[0]?.prices?.[0];
    if (!price) return "";
    return formatPrice(price.amount, price.currency_code, locale);
  };

  const getCategory = (product: Product) => {
    return product.categories?.[0]?.name ?? "";
  };

  const getStockStatus = (product: Product) => {
    const variant = product.variants?.[0];
    if (!variant) return null;
    if (variant.inventory_quantity <= 0) return "outOfStock";
    if (variant.inventory_quantity <= 3) return "lowStock";
    return null;
  };

  // Group results by category
  const groupedResults = results.reduce<
    Record<string, SearchResult[]>
  >((acc, result) => {
    const category = getCategory(result.product) || (locale === "ja" ? "その他" : "Other");
    if (!acc[category]) acc[category] = [];
    acc[category].push(result);
    return acc;
  }, {});

  const hasQuery = query.trim().length > 0;
  const resultCount = results.length;

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

        {/* Empty State: Suggested Keywords */}
        {!hasQuery && (
          <div className="py-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("search.suggested")}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => handleSuggestedClick(keyword)}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-secondary"
                >
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {keyword}
                </button>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t("search.shortcutHint")}
            </p>
          </div>
        )}

        {/* Results */}
        {hasQuery && (
          <ScrollArea className="max-h-[60vh]">
            {resultCount > 0 ? (
              <div className="py-2">
                {/* Result count */}
                <p className="mb-2 px-2 text-xs text-muted-foreground">
                  {t("search.resultCount", { count: resultCount })}
                </p>

                {/* Grouped by category */}
                {Object.entries(groupedResults).map(
                  ([category, categoryResults]) => (
                    <div key={category} className="mb-3">
                      <p className="mb-1 px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {category}
                      </p>
                      <ul className="space-y-0.5">
                        {categoryResults.map(({ product }) => {
                          const stockStatus = getStockStatus(product);
                          return (
                            <li key={product.id}>
                              <Link
                                href={`/${locale}/products/${product.handle}`}
                                onClick={handleSelect}
                                className="flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-secondary"
                              >
                                {/* Thumbnail */}
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
                                  {product.thumbnail ? (
                                    <img
                                      src={product.thumbnail}
                                      alt={product.title}
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
                                    {stockStatus === "outOfStock" && (
                                      <span className="text-destructive">
                                        {t("product.outOfStock")}
                                      </span>
                                    )}
                                    {stockStatus === "lowStock" && (
                                      <span className="text-orange-600">
                                        {t("product.lowStock")}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Price */}
                                <span className="shrink-0 text-sm font-medium">
                                  {getPrice(product)}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  {t("search.noResults")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  {t("search.noResultsHint")}
                </p>
              </div>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
