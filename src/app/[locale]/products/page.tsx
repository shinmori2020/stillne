import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ProductListClient } from "@/components/product/product-list-client";
import { getProducts } from "@/lib/api/products";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "product" });

  return {
    title: t("allProducts"),
    description:
      locale === "ja"
        ? "stillneの全商品一覧"
        : "Browse all products at stillne",
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { locale } = await params;
  const { category, sort, page } = await searchParams;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("product");
  const tCategory = await getTranslations("category");

  // Parse pagination
  const currentPage = parseInt(page ?? "1", 10);
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  // Build query options
  const queryOptions: {
    limit: number;
    offset: number;
    category_id?: string[];
    order?: string;
  } = {
    limit,
    offset,
  };

  // Map category slug to category_id (this would need to be fetched from Medusa in production)
  if (category) {
    // For now, we'll pass category as a filter - in production this would be category_id
    queryOptions.category_id = [category];
  }

  // Map sort option to Medusa order
  if (sort) {
    const sortMap: Record<string, string> = {
      newest: "-created_at",
      priceAsc: "variants.prices.amount",
      priceDesc: "-variants.prices.amount",
    };
    queryOptions.order = sortMap[sort] ?? "-created_at";
  }

  // Fetch products
  const { products, count } = await getProducts(queryOptions);

  const totalPages = Math.ceil(count / limit);

  // Get page title based on category
  const pageTitle = category ? tCategory(category) : t("allProducts");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 lg:px-12">
      <PageHeader title={pageTitle} />

      <ProductListClient
        initialProducts={products}
        initialCount={count}
        locale={locale}
        category={category}
        sort={sort}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
