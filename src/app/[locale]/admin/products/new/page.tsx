"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { PlaceholderImage } from "@/components/common/placeholder-image";

export default function NewProductPage() {
  const t = useTranslations("admin");
  const tCategory = useTranslations("category");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { value: "interior", label: tCategory("interior") },
    { value: "tableware", label: tCategory("tableware") },
    { value: "fabric", label: tCategory("fabric") },
    { value: "stationery", label: tCategory("stationery") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
    alert(t("saveSuccess"));
    router.push(`/${locale}/admin/products`);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <ScrollFadeIn>
        <Button asChild variant="ghost" className="mb-4">
          <Link href={`/${locale}/admin/products`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("products")}
          </Link>
        </Button>

        <h1 className="font-heading text-2xl md:text-3xl">{t("addProduct")}</h1>
      </ScrollFadeIn>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Image */}
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <Label>{locale === "ja" ? "商品画像" : "Product Image"}</Label>
            <div className="mt-4 flex justify-center">
              <div className="h-48 w-48 overflow-hidden rounded-lg border-2 border-dashed">
                <PlaceholderImage
                  width={192}
                  height={192}
                  label={locale === "ja" ? "クリックしてアップロード" : "Click to upload"}
                  className="h-full w-full cursor-pointer hover:bg-muted"
                  showDimensions
                />
              </div>
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {locale === "ja"
                ? "推奨サイズ: 800×800px"
                : "Recommended: 800×800px"}
            </p>
          </div>
        </ScrollFadeIn>

        {/* Basic Info */}
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t("productName")}</Label>
              <Input
                id="title"
                required
                placeholder={
                  locale === "ja"
                    ? "例: セラミックフラワーベース"
                    : "e.g. Ceramic Flower Vase"
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t("productDescription")}</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder={
                  locale === "ja"
                    ? "商品の特徴や素材について説明してください"
                    : "Describe the product features and materials"
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">{t("productPrice")}</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ¥
                  </span>
                  <Input
                    id="price"
                    type="number"
                    required
                    className="pl-8"
                    placeholder="5800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">{t("productStock")}</Label>
                <Input
                  id="stock"
                  type="number"
                  required
                  placeholder="10"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">{t("productCategory")}</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{t("productStatus")}</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="published">{t("published")}</option>
                  <option value="draft">{t("draft")}</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Actions */}
        <ScrollFadeIn>
          <div className="flex gap-3">
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving
                ? locale === "ja"
                  ? "保存中..."
                  : "Saving..."
                : locale === "ja"
                ? "保存する"
                : "Save"}
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/admin/products`}>
                {locale === "ja" ? "キャンセル" : "Cancel"}
              </Link>
            </Button>
          </div>
        </ScrollFadeIn>
      </form>
    </div>
  );
}
