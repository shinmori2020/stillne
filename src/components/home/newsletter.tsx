"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface NewsletterProps {
  locale: string;
}

export function Newsletter({ locale }: NewsletterProps) {
  const isJa = locale === "ja";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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
          {submitted ? (
            <div className="mt-8 rounded-lg border bg-card p-6">
              <p className="text-sm font-medium">
                {isJa
                  ? "ご登録ありがとうございます。"
                  : "Thank you for subscribing."}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {isJa
                  ? "※ デモサイトのため、実際のメールは送信されません。"
                  : "* This is a demo site. No emails will be sent."}
              </p>
            </div>
          ) : (
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
          )}
        </ScrollFadeIn>
      </div>
    </section>
  );
}
