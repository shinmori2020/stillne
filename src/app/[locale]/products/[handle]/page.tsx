import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getProductByHandle } from "@/lib/api/products";
import { ProductDetail } from "@/components/product/product-detail";

interface ProductPageProps {
  params: Promise<{ locale: string; handle: string }>;
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

  const t = await getTranslations("product");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 lg:px-12">
      <ProductDetail product={product} locale={locale} />
    </div>
  );
}
