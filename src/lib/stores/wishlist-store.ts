import { create } from "zustand";

const STORAGE_KEY = "stillne_wishlist";

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
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

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: loadFromStorage(),

  toggleWishlist: (id: string) => {
    const current = get().wishlistIds;
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    saveToStorage(next);
    set({ wishlistIds: next });
  },

  isInWishlist: (id: string) => {
    return get().wishlistIds.includes(id);
  },

  clearWishlist: () => {
    saveToStorage([]);
    set({ wishlistIds: [] });
  },
}));
