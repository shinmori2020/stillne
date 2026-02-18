"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  locale: string;
}

const FAQ_ITEMS = [
  {
    questionJa: "送料はいくらですか？",
    questionEn: "How much is shipping?",
    answerJa: "全国一律880円（税込）でお届けします。10,000円以上のご注文で送料無料となります。",
    answerEn: "Flat rate shipping of ¥880 (tax included) nationwide. Free shipping on orders over ¥10,000.",
  },
  {
    questionJa: "届くまでどれくらいかかりますか？",
    questionEn: "How long does delivery take?",
    answerJa: "ご注文確認後、3〜5営業日以内に発送いたします。発送後1〜3日でお届けとなります。",
    answerEn: "Orders are shipped within 3-5 business days. Delivery takes 1-3 days after shipment.",
  },
  {
    questionJa: "返品・交換はできますか？",
    questionEn: "Can I return or exchange items?",
    answerJa: "商品到着後7日以内、未使用品に限り返品・交換を承ります。初期不良や配送時の破損についてはお気軽にご連絡ください。",
    answerEn: "Returns and exchanges are accepted within 7 days of delivery for unused items. Please contact us for any defects or shipping damage.",
  },
  {
    questionJa: "ギフトラッピングはできますか？",
    questionEn: "Do you offer gift wrapping?",
    answerJa: "はい、ご注文時にギフトラッピングをお選びいただけます。stillneオリジナルの包装紙でお包みいたします。",
    answerEn: "Yes, you can select gift wrapping at checkout. Items will be wrapped in stillne original wrapping paper.",
  },
  {
    questionJa: "支払い方法は何がありますか？",
    questionEn: "What payment methods do you accept?",
    answerJa: "クレジットカード（VISA, Mastercard, JCB, AMEX）、Apple Pay、Google Payに対応しています。",
    answerEn: "We accept credit cards (VISA, Mastercard, JCB, AMEX), Apple Pay, and Google Pay.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium transition-colors hover:text-primary md:py-6"
      >
        {question}
        <ChevronDown
          className={cn(
            "ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr] pb-5 md:pb-6" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection({ locale }: FaqSectionProps) {
  const isJa = locale === "ja";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <div className="text-center">
            <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">
              FAQ
            </p>
            <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {isJa ? "よくある質問" : "frequently asked questions"}
            </h2>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.15}>
          <div className="mt-10 border-t md:mt-14">
            {FAQ_ITEMS.map((item, index) => (
              <FaqItem
                key={index}
                question={isJa ? item.questionJa : item.questionEn}
                answer={isJa ? item.answerJa : item.answerEn}
              />
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
