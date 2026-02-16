import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Generic JSON-LD component
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization JSON-LD
 */
export function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stillne.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "stillne",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    sameAs: [
      "https://instagram.com/stillne",
      "https://twitter.com/stillne",
    ],
  };

  return <JsonLd data={data} />;
}

/**
 * WebSite JSON-LD (for search)
 */
export function WebSiteJsonLd({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stillne.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "stillne",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

/**
 * Product JSON-LD
 */
export function ProductJsonLd({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stillne.com";

  // Get price from first variant
  const price = product.variants?.[0]?.prices?.find(
    (p) => p.currency_code === "jpy"
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    sku: product.variants?.[0]?.sku,
    brand: {
      "@type": "Brand",
      name: "stillne",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/${locale}/products/${product.handle}`,
      priceCurrency: "JPY",
      price: price?.amount ? price.amount / 100 : 0,
      availability:
        (product.variants?.[0]?.inventory_quantity ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "stillne",
      },
    },
  };

  return <JsonLd data={data} />;
}

/**
 * BreadcrumbList JSON-LD
 */
export function BreadcrumbJsonLd({
  items,
  locale,
}: {
  items: { name: string; href: string }[];
  locale: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stillne.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}
