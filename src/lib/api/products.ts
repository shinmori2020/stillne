/**
 * Product API functions
 */

import { medusa } from "@/lib/medusa";
import type { Product } from "@/types/product";

// Check if Medusa backend is configured
const isMedusaConfigured = !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

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
    thumbnail: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_01a", url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80", alt: "フラワーベース 正面" },
      { id: "img_01b", url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80", alt: "フラワーベース 側面" },
      { id: "img_01c", url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80", alt: "フラワーベース 質感" },
      { id: "img_01d", url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=80", alt: "フラワーベース 使用シーン" },
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
    thumbnail: "https://images.unsplash.com/photo-1602874801006-93455f040fe9?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_02a", url: "https://images.unsplash.com/photo-1602874801006-93455f040fe9?auto=format&fit=crop&w=800&q=80", alt: "キャンドルホルダー 正面" },
      { id: "img_02b", url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80", alt: "キャンドルホルダー ディテール" },
      { id: "img_02c", url: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=800&q=80", alt: "キャンドルホルダー 使用シーン" },
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
    thumbnail: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_03a", url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80", alt: "マグカップ 正面" },
      { id: "img_03b", url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80", alt: "マグカップ 上面" },
      { id: "img_03c", url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80", alt: "マグカップ 使用シーン" },
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
    thumbnail: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_04a", url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80", alt: "クッションカバー 正面" },
      { id: "img_04b", url: "https://images.unsplash.com/photo-1616627844558-89e2f4c0b3b2?auto=format&fit=crop&w=800&q=80", alt: "クッションカバー 質感" },
      { id: "img_04c", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80", alt: "クッションカバー 使用シーン" },
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
    thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_05a", url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80", alt: "レザーノート 表紙" },
      { id: "img_05b", url: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80", alt: "レザーノート 見開き" },
      { id: "img_05c", url: "https://images.unsplash.com/photo-1531346598635-8e8d20f4c78a?auto=format&fit=crop&w=800&q=80", alt: "レザーノート 革の質感" },
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
    thumbnail: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_06a", url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80", alt: "ガラスプレート 正面" },
      { id: "img_06b", url: "https://images.unsplash.com/photo-1586421846262-65213ace8940?auto=format&fit=crop&w=800&q=80", alt: "ガラスプレート 側面" },
      { id: "img_06c", url: "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?auto=format&fit=crop&w=800&q=80", alt: "ガラスプレート 使用シーン" },
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
    thumbnail: "https://images.unsplash.com/photo-1610012939329-778e6e4e8b9b?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_07a", url: "https://images.unsplash.com/photo-1610012939329-778e6e4e8b9b?auto=format&fit=crop&w=800&q=80", alt: "ウールブランケット 全体" },
      { id: "img_07b", url: "https://images.unsplash.com/photo-1616804309054-a8f1c9624239?auto=format&fit=crop&w=800&q=80", alt: "ウールブランケット 質感" },
      { id: "img_07c", url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", alt: "ウールブランケット 使用シーン" },
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
    thumbnail: "https://images.unsplash.com/photo-1588427168315-3a9262f20e50?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_08a", url: "https://images.unsplash.com/photo-1588427168315-3a9262f20e50?auto=format&fit=crop&w=800&q=80", alt: "ペンスタンド 正面" },
      { id: "img_08b", url: "https://images.unsplash.com/photo-1606914469633-bb29c4ceee0d?auto=format&fit=crop&w=800&q=80", alt: "ペンスタンド ディテール" },
      { id: "img_08c", url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80", alt: "ペンスタンド 使用シーン" },
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
  {
    id: "prod_09",
    title: "ウォールナットサイドテーブル I-009",
    handle: "walnut-side-table-i009",
    description: "無垢のウォールナット材を使用したサイドテーブル。シンプルな設計ながら存在感のある佇まいが、空間に温もりを添えます。",
    material: "ウォールナット無垢材（オイル仕上げ）",
    weight: 6500,
    width: 450,
    height: 550,
    length: 450,
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_09a", url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", alt: "サイドテーブル 正面" },
      { id: "img_09b", url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80", alt: "サイドテーブル 天板" },
      { id: "img_09c", url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", alt: "サイドテーブル 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_furniture", name: "家具", handle: "furniture" }],
    variants: [{
      id: "var_09",
      title: "ナチュラル",
      sku: "ST-I009-NT",
      inventory_quantity: 3,
      prices: [{ amount: 3800000, currency_code: "jpy" }],
      options: [{ value: "ナチュラル" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_10",
    title: "テーブルランプ J-010",
    handle: "table-lamp-j010",
    description: "和紙のシェードが柔らかな光を広げるテーブルランプ。ベッドサイドやリビングのアクセントに。",
    material: "ベース: オーク材 / シェード: 和紙",
    weight: 1200,
    width: 200,
    height: 380,
    length: 200,
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_10a", url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80", alt: "テーブルランプ 点灯時" },
      { id: "img_10b", url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80", alt: "テーブルランプ 消灯時" },
      { id: "img_10c", url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80", alt: "テーブルランプ 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_lighting", name: "照明", handle: "lighting" }],
    variants: [{
      id: "var_10",
      title: "ナチュラル",
      sku: "TL-J010-NT",
      inventory_quantity: 5,
      prices: [{ amount: 1850000, currency_code: "jpy" }],
      options: [{ value: "ナチュラル" }],
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_11",
    title: "木製カッティングボード K-011",
    handle: "wooden-cutting-board-k011",
    description: "チェリー材を贅沢に使用したカッティングボード。調理にもサービングプレートにもお使いいただけます。",
    material: "チェリー材（食品安全オイル仕上げ）",
    weight: 750,
    width: 350,
    height: 20,
    length: 200,
    thumbnail: "https://images.unsplash.com/photo-1603285387656-a61148cdb89d?auto=format&fit=crop&w=800&q=80",
    images: [
      { id: "img_11a", url: "https://images.unsplash.com/photo-1603285387656-a61148cdb89d?auto=format&fit=crop&w=800&q=80", alt: "カッティングボード 正面" },
      { id: "img_11b", url: "https://images.unsplash.com/photo-1574698604393-413d2a0b2f41?auto=format&fit=crop&w=800&q=80", alt: "カッティングボード 側面" },
      { id: "img_11c", url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80", alt: "カッティングボード 使用シーン" },
    ],
    status: "published",
    categories: [{ id: "cat_kitchen", name: "キッチン", handle: "kitchen" }],
    variants: [{
      id: "var_11",
      title: "ナチュラル",
      sku: "CB-K011-NT",
      inventory_quantity: 8,
      prices: [{ amount: 580000, currency_code: "jpy" }],
      options: [{ value: "ナチュラル" }],
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
 * Search products by query string (works with dummy data locally)
 */
export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();

  return DUMMY_PRODUCTS.filter((product) => {
    const searchableFields = [
      product.title,
      product.description,
      product.material,
      ...(product.categories?.map((c) => c.name) ?? []),
      ...(product.variants?.map((v) => v.title) ?? []),
    ]
      .filter(Boolean)
      .map((field) => (field as string).toLowerCase());

    return searchableFields.some((field) => field.includes(normalizedQuery));
  });
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
