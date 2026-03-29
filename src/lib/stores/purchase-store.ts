import { create } from "zustand";

const STORAGE_KEY = "stillne_purchases";

interface PurchaseState {
  purchasedProductIds: string[];
  addPurchasedProducts: (ids: string[]) => void;
  hasPurchased: (productId: string) => boolean;
}

function loadFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or unavailable
  }
}

export const usePurchaseStore = create<PurchaseState>((set, get) => ({
  purchasedProductIds: loadFromStorage(),

  addPurchasedProducts: (ids: string[]) => {
    const current = get().purchasedProductIds;
    const unique = [...new Set([...current, ...ids])];
    saveToStorage(unique);
    set({ purchasedProductIds: unique });
  },

  hasPurchased: (productId: string) => {
    return get().purchasedProductIds.includes(productId);
  },
}));
