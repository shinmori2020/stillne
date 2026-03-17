import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getProductByHandle, getProducts } from "@/lib/api/products";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { routing } from "@/i18n/routing";

interface ProductPageProps {
  params: Promise<{ locale: string; handle: string }>;
}

export async function generateStaticParams() {
  const { products } = await getProducts({ limit: 100 });
  const locales = routing.locales;

  return locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      handle: product.handle,
    }))
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description ?? product.title,
    openGraph: {
      title: product.title,
      description: product.description ?? product.title,
      images: product.thumbnail ? [{ url: product.thumbnail }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, handle } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Get related products (same category, exclude current)
  const categoryHandle = product.categories?.[0]?.handle;
  const { products: allProducts } = await getProducts({
    limit: 12,
    category_id: categoryHandle ? [categoryHandle] : undefined,
  });
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const isJa = locale === "ja";
  const categoryName = product.categories?.[0]?.name;

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: isJa ? "ホーム" : "Home", href: `/${locale}` },
    { label: isJa ? "商品一覧" : "Products", href: `/${locale}/products` },
    ...(categoryName
      ? [
          {
            label: categoryName,
            href: `/${locale}/products?category=${categoryHandle}`,
          },
        ]
      : []),
    { label: product.title },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 lg:px-12">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Product Detail */}
      <ProductDetail product={product} locale={locale} />

      {/* Reviews */}
      <div className="mt-16">
        <ProductReviews productId={product.id} locale={locale} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <RelatedProducts products={relatedProducts} locale={locale} />
        </div>
      )}
    </div>
  );
}
