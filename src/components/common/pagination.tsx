"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: Record<string, string | undefined>;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();

    // Add existing search params
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });
    }

    // Add page param (only if not page 1)
    if (page > 1) {
      params.set("page", page.toString());
    }

    const queryString = params.toString();
    return `${baseUrl}${queryString ? `?${queryString}` : ""}`;
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      {/* Previous button */}
      <Button
        variant="ghost"
        size="icon"
        asChild={currentPage > 1}
        disabled={currentPage <= 1}
        className="h-9 w-9"
      >
        {currentPage > 1 ? (
          <Link href={buildUrl(currentPage - 1)} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Button
            key={page}
            variant={isActive ? "secondary" : "ghost"}
            size="icon"
            asChild={!isActive}
            className={cn("h-9 w-9", isActive && "pointer-events-none")}
            aria-current={isActive ? "page" : undefined}
          >
            {isActive ? (
              <span>{page}</span>
            ) : (
              <Link href={buildUrl(page)}>{page}</Link>
            )}
          </Button>
        );
      })}

      {/* Next button */}
      <Button
        variant="ghost"
        size="icon"
        asChild={currentPage < totalPages}
        disabled={currentPage >= totalPages}
        className="h-9 w-9"
      >
        {currentPage < totalPages ? (
          <Link href={buildUrl(currentPage + 1)} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  );
}
