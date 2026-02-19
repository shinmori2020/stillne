/**
 * Product API functions
 */

import { medusa } from "@/lib/medusa";
import type { Product } from "@/types/product";

// Check if Medusa backend is configured
const isMedusaConfigured = !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

// Helper to generate placeholder image URLs
function dummyImg(label: string, bg: string, fg: string) {
  return `https://placehold.co/600x600/${bg}/${fg}?text=${encodeURIComponent(label)}`;
}

// Dummy products for development/demo
const DUMMY_PRODUCTS = [
  {
    id: "prod_01",
    title: "セラミックフラワーベース A-001",
    handle: "ceramic-flower-vase-a001",
    description: "シンプルなフォルムが空間に溶け込む、日常使いのためのフラワーベース。マットな質感と柔らかな曲線が特徴です。",
    material: "陶器（マット釉薬仕上げ）",
    weight: 850,
    width: 120,
    height: 200,
    length: 120,
    thumbnail: dummyImg("Vase A-001", "f5f0eb", "8b7355"),
    images: [
      { id: "img_01a", url: dummyImg("Vase A-001", "f5f0eb", "8b7355"), alt: "フラワーベース 正面" },
      { id: "img_01b", url: dummyImg("Vase Side", "ebe6e0", "7a6548"), alt: "フラワーベース 側面" },
      { id: "img_01c", url: dummyImg("Vase Detail", "e0dbd5", "6b583d"), alt: "フラワーベース 質感" },
      { id: "img_01d", url: dummyImg("Vase Scene", "d6d1cb", "5c4b33"), alt: "フラワーベース 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_interior", name: "インテリア雑貨", handle: "interior" }],
    variants: [{
      id: "var_01",
      title: "ホワイト",
      sku: "FV-A001-WH",
      inventory_quantity: 15,
      prices: [{ amount: 580000, currency_code: "jpy" }],
      options: [{ value: "ホワイト" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_02",
    title: "キャンドルホルダー B-002",
    handle: "candle-holder-b002",
    description: "真鍮の上品な輝きが空間にアクセントを添える、モダンなキャンドルホルダー。",
    material: "真鍮（無垢）",
    weight: 320,
    width: 80,
    height: 100,
    length: 80,
    thumbnail: dummyImg("Candle B-002", "f0ebe5", "8b7355"),
    images: [
      { id: "img_02a", url: dummyImg("Candle B-002", "f0ebe5", "8b7355"), alt: "キャンドルホルダー 正面" },
      { id: "img_02b", url: dummyImg("Candle Detail", "e5e0da", "7a6548"), alt: "キャンドルホルダー ディテール" },
      { id: "img_02c", url: dummyImg("Candle Scene", "dad5cf", "6b583d"), alt: "キャンドルホルダー 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_interior", name: "インテリア雑貨", handle: "interior" }],
    variants: [{
      id: "var_02",
      title: "ゴールド",
      sku: "CH-B002-GD",
      inventory_quantity: 8,
      prices: [{ amount: 420000, currency_code: "jpy" }],
      options: [{ value: "ゴールド" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_03",
    title: "マグカップ C-003",
    handle: "mug-cup-c003",
    description: "手に馴染む丸みを帯びたフォルム。毎日のコーヒータイムを特別なひとときに。",
    material: "磁器",
    weight: 280,
    width: 85,
    height: 90,
    length: 110,
    thumbnail: dummyImg("Mug C-003", "ebe8e3", "8b7355"),
    images: [
      { id: "img_03a", url: dummyImg("Mug C-003", "ebe8e3", "8b7355"), alt: "マグカップ 正面" },
      { id: "img_03b", url: dummyImg("Mug Top", "e0ddd8", "7a6548"), alt: "マグカップ 上面" },
      { id: "img_03c", url: dummyImg("Mug Scene", "d5d2cd", "6b583d"), alt: "マグカップ 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_tableware", name: "テーブルウェア", handle: "tableware" }],
    variants: [{
      id: "var_03",
      title: "グレー",
      sku: "MC-C003-GY",
      inventory_quantity: 25,
      prices: [{ amount: 280000, currency_code: "jpy" }],
      options: [{ value: "グレー" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_04",
    title: "リネンクッションカバー D-004",
    handle: "linen-cushion-cover-d004",
    description: "上質なリネン100%のクッションカバー。ナチュラルな風合いがお部屋を優しく彩ります。",
    material: "リネン100%",
    weight: 180,
    width: 450,
    height: 450,
    thumbnail: dummyImg("Linen D-004", "f2ede7", "8b7355"),
    images: [
      { id: "img_04a", url: dummyImg("Linen D-004", "f2ede7", "8b7355"), alt: "クッションカバー 正面" },
      { id: "img_04b", url: dummyImg("Linen Texture", "e7e2dc", "7a6548"), alt: "クッションカバー 質感" },
      { id: "img_04c", url: dummyImg("Linen Scene", "dcd7d1", "6b583d"), alt: "クッションカバー 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_fabric", name: "ファブリック", handle: "fabric" }],
    variants: [{
      id: "var_04",
      title: "ベージュ",
      sku: "LC-D004-BG",
      inventory_quantity: 12,
      prices: [{ amount: 380000, currency_code: "jpy" }],
      options: [{ value: "ベージュ" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_05",
    title: "レザーノート E-005",
    handle: "leather-notebook-e005",
    description: "イタリアンレザーを使用した上質なノート。時間とともに深まる風合いをお楽しみください。",
    material: "イタリアンレザー（牛革）",
    weight: 220,
    width: 148,
    height: 210,
    length: 15,
    thumbnail: dummyImg("Note E-005", "ede8e2", "8b7355"),
    images: [
      { id: "img_05a", url: dummyImg("Note E-005", "ede8e2", "8b7355"), alt: "レザーノート 表紙" },
      { id: "img_05b", url: dummyImg("Note Open", "e2ddd7", "7a6548"), alt: "レザーノート 見開き" },
      { id: "img_05c", url: dummyImg("Note Detail", "d7d2cc", "6b583d"), alt: "レザーノート 革の質感" },
    ],
    status: "published",
    categories: [{ id: "cat_stationery", name: "ステーショナリー", handle: "stationery" }],
    variants: [{
      id: "var_05",
      title: "ブラウン",
      sku: "LN-E005-BR",
      inventory_quantity: 20,
      prices: [{ amount: 450000, currency_code: "jpy" }],
      options: [{ value: "ブラウン" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_06",
    title: "ガラスプレート F-006",
    handle: "glass-plate-f006",
    description: "透明感のある手吹きガラスのプレート。光を受けて美しく輝きます。",
    material: "手吹きガラス",
    weight: 450,
    width: 260,
    height: 25,
    length: 260,
    thumbnail: dummyImg("Plate F-006", "eee9e3", "8b7355"),
    images: [
      { id: "img_06a", url: dummyImg("Plate F-006", "eee9e3", "8b7355"), alt: "ガラスプレート 正面" },
      { id: "img_06b", url: dummyImg("Plate Side", "e3ded8", "7a6548"), alt: "ガラスプレート 側面" },
      { id: "img_06c", url: dummyImg("Plate Scene", "d8d3cd", "6b583d"), alt: "ガラスプレート 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_tableware", name: "テーブルウェア", handle: "tableware" }],
    variants: [{
      id: "var_06",
      title: "クリア",
      sku: "GP-F006-CL",
      inventory_quantity: 6,
      prices: [{ amount: 320000, currency_code: "jpy" }],
      options: [{ value: "クリア" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_07",
    title: "ウールブランケット G-007",
    handle: "wool-blanket-g007",
    description: "ニュージーランド産ウールを使用した軽くて暖かいブランケット。",
    material: "ニュージーランド産ウール100%",
    weight: 900,
    width: 1300,
    height: 1800,
    thumbnail: dummyImg("Blanket G-007", "e9e4de", "8b7355"),
    images: [
      { id: "img_07a", url: dummyImg("Blanket G-007", "e9e4de", "8b7355"), alt: "ウールブランケット 全体" },
      { id: "img_07b", url: dummyImg("Blanket Texture", "ded9d3", "7a6548"), alt: "ウールブランケット 質感" },
      { id: "img_07c", url: dummyImg("Blanket Scene", "d3cec8", "6b583d"), alt: "ウールブランケット 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_fabric", name: "ファブリック", handle: "fabric" }],
    variants: [{
      id: "var_07",
      title: "チャコール",
      sku: "WB-G007-CH",
      inventory_quantity: 4,
      prices: [{ amount: 1200000, currency_code: "jpy" }],
      options: [{ value: "チャコール" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_08",
    title: "真鍮ペンスタンド H-008",
    handle: "brass-pen-stand-h008",
    description: "デスクを上品に彩る真鍮製のペンスタンド。経年変化も楽しめます。",
    material: "真鍮（無垢）",
    weight: 280,
    width: 65,
    height: 100,
    length: 65,
    thumbnail: dummyImg("Pen H-008", "f0ebe5", "8b7355"),
    images: [
      { id: "img_08a", url: dummyImg("Pen H-008", "f0ebe5", "8b7355"), alt: "ペンスタンド 正面" },
      { id: "img_08b", url: dummyImg("Pen Detail", "e5e0da", "7a6548"), alt: "ペンスタンド ディテール" },
      { id: "img_08c", url: dummyImg("Pen Scene", "dad5cf", "6b583d"), alt: "ペンスタンド 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_stationery", name: "ステーショナリー", handle: "stationery" }],
    variants: [{
      id: "var_08",
      title: "ゴールド",
      sku: "PS-H008-GD",
      inventory_quantity: 10,
      prices: [{ amount: 680000, currency_code: "jpy" }],
      options: [{ value: "ゴールド" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
] as unknown as Product[];

/**
 * Get dummy products filtered by category
 */
function getDummyProducts(options?: {
  limit?: number;
  offset?: number;
  category_id?: string[];
}): { products: Product[]; count: number } {
  let filtered = [...DUMMY_PRODUCTS];

  // Filter by category handle (from URL query)
  if (options?.category_id && options.category_id.length > 0) {
    const categoryHandles = options.category_id;
    filtered = filtered.filter((p) =>
      p.categories?.some((c) => categoryHandles.includes(c.handle))
    );
  }

  const total = filtered.length;
  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? 12;

  return {
    products: filtered.slice(offset, offset + limit),
    count: total,
  };
}

/**
 * Wrap API call with timeout
 */
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 3000
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
  );
  return Promise.race([promise, timeout]);
}

/**
 * Fetch products list from Medusa
 */
export async function getProducts(options?: {
  limit?: number;
  offset?: number;
  category_id?: string[];
  order?: string;
}): Promise<{ products: Product[]; count: number }> {
  // Return dummy products if Medusa is not configured
  if (!isMedusaConfigured) {
    return getDummyProducts(options);
  }

  try {
    const response = await withTimeout(
      medusa.store.product.list({
        limit: options?.limit ?? 12,
        offset: options?.offset ?? 0,
        category_id: options?.category_id,
        order: options?.order,
        fields: "*variants.prices,*images",
      })
    );

    return {
      products: response.products as unknown as Product[],
      count: response.count ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [], count: 0 };
  }
}

/**
 * Fetch single product by handle
 */
export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  // Return dummy product if Medusa is not configured
  if (!isMedusaConfigured) {
    return DUMMY_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }

  try {
    const response = await withTimeout(
      medusa.store.product.list({
        handle,
        fields: "*variants.prices,*images,*options.values",
        limit: 1,
      })
    );

    if (response.products && response.products.length > 0) {
      return response.products[0] as unknown as Product;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

/**
 * Fetch new arrival products (sorted by created_at desc)
 */
export async function getNewArrivals(limit: number = 8): Promise<Product[]> {
  try {
    const { products } = await getProducts({
      limit,
      order: "-created_at",
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
    return [];
  }
}
