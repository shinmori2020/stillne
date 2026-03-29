import { create } from "zustand";

const STORAGE_KEY = "stillne_reviews";

export interface UserReview {
  id: string;
  productId: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

interface ReviewState {
  reviews: UserReview[];
  addReview: (review: Omit<UserReview, "id" | "createdAt">) => void;
  getReviewsByProductId: (productId: string) => UserReview[];
}

function loadFromStorage(): UserReview[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage(reviews: UserReview[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // Storage full or unavailable
  }
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: loadFromStorage(),

  addReview: (review) => {
    const newReview: UserReview = {
      ...review,
      id: `user_rev_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [newReview, ...get().reviews];
    saveToStorage(next);
    set({ reviews: next });
  },

  getReviewsByProductId: (productId: string) => {
    return get().reviews.filter((r) => r.productId === productId);
  },
}));
