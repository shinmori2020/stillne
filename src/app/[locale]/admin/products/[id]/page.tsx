"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

// Demo product data
const DEMO_PRODUCTS: Record<string, {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "draft";
}> = {
  "prod_01": {
    id: "prod_01",
    title: "セラミックフラワーベース A-001",
    description: "手作りの美しいセラミック花瓶。シンプルで洗練されたデザインが、どんな空間にも馴染みます。",
    price: 5800,
    stock: 15,
    category: "vase",
    status: "active",
  },
  "prod_02": {
    id: "prod_02",
    title: "ガラスプレート B-002",
    description: "職人が一つ一つ丁寧に作り上げたガラスプレート。食卓を美しく彩ります。",
    price: 4200,
    stock: 8,
    category: "plate",
    status: "active",
  },
  "prod_03": {
    id: "prod_03",
    title: "マグカップ C-003",
    description: "毎日のコーヒータイムを特別にするマグカップ。手に馴染む形状が特徴です。",
    price: 2800,
    stock: 25,
    category: "mug",
    status: "active",
  },
};

export default function AdminProductEditPage() {
  const t = useTranslations("admin");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const productId = params.id as string;

  const existingProduct = DEMO_PRODUCTS[productId];

  const [formData, setFormData] = useState({
    title: existingProduct?.title || "",
    description: existingProduct?.description || "",
    price: existingProduct?.price?.toString() || "",
    stock: existingProduct?.stock?.toString() || "",
    category: existingProduct?.category || "",
    status: existingProduct?.status || "draft",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Demo: simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(locale === "ja" ? "商品を更新しました（デモ）" : "Product updated (Demo)");
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (
      !confirm(
        locale === "ja"
          ? "この商品を削除してもよろしいですか？"
          : "Are you sure you want to delete this product?"
      )
    ) {
      return;
    }

    // Demo: simulate delete
    alert(locale === "ja" ? "商品を削除しました（デモ）" : "Product deleted (Demo)");
    router.push(`/${locale}/admin/products`);
  };

  const categoryLabels: Record<string, { ja: string; en: string }> = {
    vase: { ja: "花瓶", en: "Vase" },
    plate: { ja: "プレート", en: "Plate" },
    mug: { ja: "マグカップ", en: "Mug" },
    bowl: { ja: "ボウル", en: "Bowl" },
    other: { ja: "その他", en: "Other" },
  };

  if (!existingProduct) {
    return (
      <div className="space-y-6">
        <ScrollFadeIn>
          <Button asChild variant="ghost" className="mb-6">
            <Link href={`/${locale}/admin/products`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("products")}
            </Link>
          </Button>

          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              {locale === "ja" ? "商品が見つかりませんでした" : "Product not found"}
            </p>
          </div>
        </ScrollFadeIn>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ScrollFadeIn>
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/${locale}/admin/products`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("products")}
          </Link>
        </Button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="font-heading text-2xl md:text-3xl">
            {locale === "ja" ? "商品を編集" : "Edit Product"}
          </h1>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="w-fit"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {locale === "ja" ? "削除" : "Delete"}
          </Button>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic Info */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 font-heading text-lg">
                  {locale === "ja" ? "基本情報" : "Basic Information"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {locale === "ja" ? "商品名" : "Product Name"} *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {locale === "ja" ? "説明" : "Description"}
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={4}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 font-heading text-lg">
                  {locale === "ja" ? "画像" : "Images"}
                </h2>

                <div className="grid grid-cols-4 gap-4">
                  <div className="aspect-square rounded-lg border-2 border-dashed bg-muted/30">
                    <div className="flex h-full items-center justify-center">
                      <div className="h-full w-full bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />
                    </div>
                  </div>
                  <div className="aspect-square rounded-lg border-2 border-dashed">
                    <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-6 w-6" />
                      <span className="mt-1 text-xs">
                        {locale === "ja" ? "追加" : "Add"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 font-heading text-lg">
                  {locale === "ja" ? "価格・在庫" : "Pricing & Inventory"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {locale === "ja" ? "価格（税抜）" : "Price"} *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ¥
                      </span>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {locale === "ja" ? "在庫数" : "Stock"} *
                    </label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Category & Status */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 font-heading text-lg">
                  {locale === "ja" ? "カテゴリ・ステータス" : "Category & Status"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {locale === "ja" ? "カテゴリ" : "Category"}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">
                        {locale === "ja" ? "選択してください" : "Select"}
                      </option>
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label[locale === "ja" ? "ja" : "en"]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {locale === "ja" ? "ステータス" : "Status"}
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "active" | "draft",
                        })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="active">
                        {locale === "ja" ? "公開中" : "Active"}
                      </option>
                      <option value="draft">
                        {locale === "ja" ? "下書き" : "Draft"}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting
                  ? locale === "ja"
                    ? "保存中..."
                    : "Saving..."
                  : locale === "ja"
                  ? "変更を保存"
                  : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </ScrollFadeIn>
    </div>
  );
}
