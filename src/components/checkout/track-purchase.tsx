"use client";

import { useEffect } from "react";
import { usePurchaseStore } from "@/lib/stores/purchase-store";

interface TrackPurchaseProps {
  productIds: string[];
}

export function TrackPurchase({ productIds }: TrackPurchaseProps) {
  const { addPurchasedProducts } = usePurchaseStore();

  useEffect(() => {
    if (productIds.length > 0) {
      addPurchasedProducts(productIds);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
