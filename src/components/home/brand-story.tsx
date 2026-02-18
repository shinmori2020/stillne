"use client";

import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface BrandStoryProps {
  locale: string;
}

export function BrandStory({ locale }: BrandStoryProps) {
  const isJa = locale === "ja";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <div className="text-center">
            <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
              {isJa ? "ブランドについて" : "about us"}
            </p>
            <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {isJa ? "stillne のものがたり" : "our story"}
            </h2>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.15}>
          <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground md:mt-14">
            <p>
              {isJa
                ? "stillne（スティルネ）は、「静けさ」を意味する北欧の言葉から生まれました。忙しない日常の中にそっと寄り添い、暮らしに穏やかな美しさをもたらす——そんな日用品を届けたいという想いから、このブランドは始まりました。"
                : "stillne takes its name from the Nordic word for \"stillness.\" Born from a desire to bring quiet beauty into everyday life, we create objects that gently complement the rhythm of your days."}
            </p>
            <p>
              {isJa
                ? "私たちが大切にしているのは、使うたびに心が安らぐこと。素材の選定から仕上げまで、ひとつひとつの工程に想いを込めています。流行に左右されない普遍的なデザインと、手に取るたびに感じる確かな品質。それがstillneの約束です。"
                : "What matters most to us is that each product brings a sense of calm every time you use it. From selecting materials to the final finish, we pour care into every step. Timeless design that transcends trends and quality you can feel — that is the stillne promise."}
            </p>
            <p>
              {isJa
                ? "日々の暮らしの中に、小さな「静けさ」を。stillneと一緒に、心地よい毎日を見つけてみませんか。"
                : "A small moment of stillness in your everyday life. Discover a more comfortable way of living with stillne."}
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.3}>
          <div className="mt-12 flex justify-center">
            <div className="h-px w-16 bg-border" />
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
