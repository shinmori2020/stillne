"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface NewsletterProps {
  locale: string;
}

const NEWSLETTER_BENEFITS_JA = [
  "新商品の先行お知らせ",
  "会員限定クーポン・セール情報",
  "スタイリングのヒント・暮らしのコラム",
  "再入荷のお知らせ",
];

const NEWSLETTER_BENEFITS_EN = [
  "Early access to new arrivals",
  "Exclusive coupons & sale info",
  "Styling tips & lifestyle columns",
  "Restock notifications",
];

export function Newsletter({ locale }: NewsletterProps) {
  const isJa = locale === "ja";
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmittedEmail(email);
      setModalOpen(true);
      setEmail("");
    }
  };

  return (
    <section className="border-y bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-xl px-4 text-center md:px-8">
        <ScrollFadeIn>
          <Mail className="mx-auto mb-4 h-6 w-6 text-muted-foreground" />
          <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
            {isJa ? "ニュースレター" : "newsletter"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {isJa
              ? "新商品のお知らせやスタイリングのヒントをお届けします。"
              : "Get notified about new arrivals and styling tips."}
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder={isJa ? "メールアドレス" : "Email address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">
              {isJa ? "登録する" : "Subscribe"}
            </Button>
          </form>
        </ScrollFadeIn>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-xl p-8 md:p-10">
          <DialogHeader className="text-center sm:text-center">
            <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-600 dark:text-green-400" />
            <DialogTitle className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {isJa ? "登録が完了しました" : "subscription confirmed"}
            </DialogTitle>
            <DialogDescription className="text-base">
              {isJa
                ? `${submittedEmail} 宛に今後ニュースレターをお届けします。`
                : `Newsletters will be sent to ${submittedEmail}.`}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 rounded-md bg-secondary/50 p-5 text-left">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {isJa ? "配信内容" : "What you'll receive"}
            </p>
            <ul className="space-y-2.5">
              {(isJa ? NEWSLETTER_BENEFITS_JA : NEWSLETTER_BENEFITS_EN).map(
                (benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-base text-muted-foreground"
                  >
                    <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {benefit}
                  </li>
                )
              )}
            </ul>
          </div>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            {isJa
              ? "※ デモサイトのため、実際のメールは送信されません。"
              : "* This is a demo site. No emails will be sent."}
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
