import { create } from "zustand";

const STORAGE_KEY = "stillne_recently_viewed";
const MAX_ITEMS = 12;

interface RecentlyViewedState {
  viewedIds: string[];
  addViewed: (id: string) => void;
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

export const useRecentlyViewedStore = create<RecentlyViewedState>((set, get) => ({
  viewedIds: loadFromStorage(),

  addViewed: (id: string) => {
    const current = get().viewedIds;
    const filtered = current.filter((item) => item !== id);
    const next = [id, ...filtered].slice(0, MAX_ITEMS);
    saveToStorage(next);
    set({ viewedIds: next });
  },
}));
