"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Mail,
  Users,
  Send,
  Clock,
  Trash2,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { cn } from "@/lib/utils";

// Demo subscribers
const DEMO_SUBSCRIBERS = [
  { email: "tanaka@example.com", name: "田中 花子", date: "2024-02-15", status: "active" },
  { email: "sato@example.com", name: "佐藤 一郎", date: "2024-02-14", status: "active" },
  { email: "suzuki@example.com", name: "鈴木 美咲", date: "2024-02-10", status: "active" },
  { email: "yamada@example.com", name: "山田 太郎", date: "2024-02-08", status: "active" },
  { email: "demo@stillne.com", name: "デモユーザー", date: "2024-02-18", status: "active" },
];

// Demo past newsletters
const DEMO_NEWSLETTERS = [
  {
    id: 1,
    subjectJa: "【新商品】春の新作コレクションが入荷しました",
    subjectEn: "New Spring Collection Now Available",
    sentAt: "2024-02-10",
    recipients: 42,
    openRate: 68,
    status: "sent",
  },
  {
    id: 2,
    subjectJa: "【限定クーポン】バレンタイン特別10%OFF",
    subjectEn: "Valentine's Special: 10% OFF Coupon",
    sentAt: "2024-02-01",
    recipients: 38,
    openRate: 72,
    status: "sent",
  },
  {
    id: 3,
    subjectJa: "【再入荷】人気のセラミック花瓶が再入荷",
    subjectEn: "Back in Stock: Popular Ceramic Vase",
    sentAt: "2024-01-20",
    recipients: 35,
    openRate: 61,
    status: "sent",
  },
  {
    id: 4,
    subjectJa: "【コラム】暮らしを彩る、春のインテリアのヒント",
    subjectEn: "Column: Spring Interior Tips for Your Home",
    sentAt: "",
    recipients: 0,
    openRate: 0,
    status: "draft",
  },
];

// Demo templates
const DEMO_TEMPLATES = [
  { id: "new-arrival", labelJa: "新商品のお知らせ", labelEn: "New Arrival Announcement" },
  { id: "coupon", labelJa: "クーポン・セール情報", labelEn: "Coupon & Sale Info" },
  { id: "restock", labelJa: "再入荷のお知らせ", labelEn: "Restock Notification" },
  { id: "column", labelJa: "コラム・スタイリングのヒント", labelEn: "Column & Styling Tips" },
  { id: "custom", labelJa: "カスタム", labelEn: "Custom" },
];

type Tab = "overview" | "subscribers" | "compose";

export default function NewsletterAdmin() {
  const params = useParams();
  const locale = params.locale as string;
  const isJa = locale === "ja";
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [showComposed, setShowComposed] = useState(false);

  const tabs: { key: Tab; labelJa: string; labelEn: string; icon: typeof Mail }[] = [
    { key: "overview", labelJa: "配信履歴", labelEn: "History", icon: Clock },
    { key: "subscribers", labelJa: "購読者", labelEn: "Subscribers", icon: Users },
    { key: "compose", labelJa: "新規作成", labelEn: "Compose", icon: Plus },
  ];

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault();
    setShowComposed(true);
  };

  return (
    <div className="space-y-8">
      <ScrollFadeIn>
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-2xl md:text-3xl">
            {isJa ? "お知らせ配信管理" : "Notification Management"}
          </h1>
        </div>
      </ScrollFadeIn>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {isJa ? "購読者数" : "Subscribers"}
                </p>
                <p className="text-2xl font-bold">{DEMO_SUBSCRIBERS.length}</p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Send className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {isJa ? "配信済み" : "Sent"}
                </p>
                <p className="text-2xl font-bold">
                  {DEMO_NEWSLETTERS.filter((n) => n.status === "sent").length}
                </p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <Mail className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {isJa ? "平均開封率" : "Avg. Open Rate"}
                </p>
                <p className="text-2xl font-bold">67%</p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </div>

      {/* Tabs */}
      <ScrollFadeIn>
        <div className="flex gap-1 rounded-lg border bg-card p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setShowComposed(false);
              }}
              className={cn(
                "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {isJa ? tab.labelJa : tab.labelEn}
            </button>
          ))}
        </div>
      </ScrollFadeIn>

      {/* Tab Content */}
      <ScrollFadeIn>
        {activeTab === "overview" && (
          <div className="rounded-lg border bg-card">
            <div className="border-b p-4">
              <h2 className="font-heading text-lg">
                {isJa ? "配信履歴" : "Newsletter History"}
              </h2>
            </div>
            <div className="divide-y">
              {DEMO_NEWSLETTERS.map((nl) => (
                <div key={nl.id} className="flex items-center justify-between p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {isJa ? nl.subjectJa : nl.subjectEn}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      {nl.status === "sent" ? (
                        <>
                          <span>{nl.sentAt}</span>
                          <span>{nl.recipients}{isJa ? "人に配信" : " recipients"}</span>
                          <span>{isJa ? "開封率" : "Open rate"} {nl.openRate}%</span>
                        </>
                      ) : (
                        <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          {isJa ? "下書き" : "Draft"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex shrink-0 gap-2">
                    {nl.status === "draft" && (
                      <Button size="sm" variant="outline">
                        <Send className="mr-2 h-3 w-3" />
                        {isJa ? "配信" : "Send"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "subscribers" && (
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="font-heading text-lg">
                {isJa ? "購読者一覧" : "Subscriber List"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {DEMO_SUBSCRIBERS.length}{isJa ? "人" : " subscribers"}
              </p>
            </div>
            <div className="divide-y">
              {DEMO_SUBSCRIBERS.map((sub) => (
                <div key={sub.email} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-muted-foreground">{sub.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{sub.date}</span>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {isJa ? "有効" : "Active"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "compose" && (
          <div className="rounded-lg border bg-card p-6">
            {showComposed ? (
              <div className="text-center">
                <Send className="mx-auto mb-4 h-10 w-10 text-green-600 dark:text-green-400" />
                <h3 className="font-heading text-lg">
                  {isJa ? "下書きを保存しました" : "Draft Saved"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isJa
                    ? "※ デモのため実際の配信はされません。配信履歴から確認できます。"
                    : "* This is a demo. No actual emails will be sent. Check the history tab."}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setShowComposed(false);
                    setSubject("");
                    setSelectedTemplate("");
                  }}
                >
                  {isJa ? "新しいメールを作成" : "Create New Email"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCompose} className="space-y-6">
                <h2 className="font-heading text-lg">
                  {isJa ? "新規メール作成" : "Compose New Email"}
                </h2>

                {/* Template Selection */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {isJa ? "テンプレート" : "Template"}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm"
                    >
                      <option value="">
                        {isJa ? "テンプレートを選択..." : "Select template..."}
                      </option>
                      {DEMO_TEMPLATES.map((tpl) => (
                        <option key={tpl.id} value={tpl.id}>
                          {isJa ? tpl.labelJa : tpl.labelEn}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {isJa ? "件名" : "Subject"}
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={isJa ? "メールの件名を入力" : "Enter email subject"}
                    required
                  />
                </div>

                {/* Body (simplified for demo) */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {isJa ? "本文" : "Body"}
                  </label>
                  <textarea
                    className="min-h-[200px] w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    placeholder={
                      isJa
                        ? "メール本文を入力してください...\n\n※ デモのため、リッチテキストエディタの代わりにテキストエリアを使用しています。\n本番環境ではHTMLメールエディタを使用します。"
                        : "Enter email body...\n\n* Using a textarea for demo purposes.\nA rich HTML editor would be used in production."
                    }
                  />
                </div>

                {/* Recipients */}
                <div className="rounded-md bg-secondary/50 p-4">
                  <p className="text-sm">
                    <span className="font-medium">
                      {isJa ? "配信先: " : "Recipients: "}
                    </span>
                    <span className="text-muted-foreground">
                      {isJa
                        ? `全購読者 (${DEMO_SUBSCRIBERS.length}人)`
                        : `All subscribers (${DEMO_SUBSCRIBERS.length})`}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" variant="outline">
                    {isJa ? "下書き保存" : "Save Draft"}
                  </Button>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    {isJa ? "配信する" : "Send Now"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </ScrollFadeIn>

      {/* Demo Note */}
      <p className="text-center text-xs text-muted-foreground">
        {isJa
          ? "※ デモデータを表示しています。本番環境では外部メール配信サービス（Resend, Mailchimp等）と連携します。"
          : "* Showing demo data. In production, this would integrate with email services like Resend or Mailchimp."}
      </p>
    </div>
  );
}
