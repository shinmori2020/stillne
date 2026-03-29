"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  size?: "sm" | "md";
  className?: string;
}

export function WishlistButton({
  productId,
  size = "md",
  className,
}: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const active = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  if (size === "sm") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background",
          className
        )}
        aria-label={active ? "お気に入りから削除" : "お気に入りに追加"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            active ? "fill-red-500 text-red-500" : "text-muted-foreground"
          )}
        />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors hover:bg-secondary",
        className
      )}
      aria-label={active ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          active ? "fill-red-500 text-red-500" : "text-muted-foreground"
        )}
      />
    </button>
  );
}
