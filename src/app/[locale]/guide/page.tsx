import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { Ruler, Droplets, Wind, ShieldCheck } from "lucide-react";

interface GuidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.guide" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.guide" });

  const sizeCategories = ["furniture", "tableware", "fabric"] as const;
  const careCategories = ["ceramic", "wood", "fabric", "glass"] as const;

  const careIcons = {
    ceramic: Droplets,
    wood: ShieldCheck,
    fabric: Wind,
    glass: Droplets,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12 text-center">
          <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
      </ScrollFadeIn>

      {/* Size Guide */}
      <ScrollFadeIn>
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <Ruler className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-2xl lowercase tracking-wide">
              {t("size.title")}
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground">
            {t("size.description")}
          </p>

          <div className="space-y-10">
            {sizeCategories.map((cat) => (
              <div key={cat}>
                <h3 className="mb-4 text-lg font-medium">
                  {t(`size.${cat}.title`)}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b bg-secondary/40">
                        <th className="px-4 py-3 text-left font-medium">
                          {t("size.table.item")}
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          {t(`size.${cat}.col1`)}
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          {t(`size.${cat}.col2`)}
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          {t(`size.${cat}.col3`)}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {([1, 2, 3] as const).map((row) => (
                        <tr key={row} className="border-b">
                          <td className="px-4 py-3">
                            {t(`size.${cat}.row${row}.item`)}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {t(`size.${cat}.row${row}.val1`)}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {t(`size.${cat}.row${row}.val2`)}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {t(`size.${cat}.row${row}.val3`)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollFadeIn>

      {/* Care Guide */}
      <ScrollFadeIn>
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-2xl lowercase tracking-wide">
              {t("care.title")}
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground">
            {t("care.description")}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {careCategories.map((mat) => {
              const Icon = careIcons[mat];
              return (
                <div
                  key={mat}
                  className="rounded-lg border bg-card p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{t(`care.${mat}.title`)}</h3>
                  </div>
                  <ul className="space-y-2">
                    {([1, 2, 3] as const).map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        {t(`care.${mat}.tip${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollFadeIn>

      {/* Care Symbols */}
      <ScrollFadeIn>
        <section>
          <h2 className="mb-8 font-heading text-2xl lowercase tracking-wide">
            {t("symbols.title")}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(["noWash", "wipeDry", "avoidSun", "handleCare"] as const).map(
              (sym) => (
                <div
                  key={sym}
                  className="flex flex-col items-center rounded-lg border p-4 text-center"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/60">
                    <span className="text-lg">{t(`symbols.${sym}.icon`)}</span>
                  </div>
                  <span className="text-xs font-medium">
                    {t(`symbols.${sym}.label`)}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {t(`symbols.${sym}.description`)}
                  </span>
                </div>
              )
            )}
          </div>
        </section>
      </ScrollFadeIn>
    </div>
  );
}
