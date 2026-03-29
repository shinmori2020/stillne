"use client";

import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/lib/stores/recently-viewed-store";

interface TrackViewProps {
  productId: string;
}

export function TrackView({ productId }: TrackViewProps) {
  const { addViewed } = useRecentlyViewedStore();

  useEffect(() => {
    addViewed(productId);
  }, [productId, addViewed]);

  return null;
}
