"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission (in production, this would call an API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo purposes, always succeed
    setSubmitStatus("success");
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12">
          <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
      </ScrollFadeIn>

      {/* Contact Info */}
      <ScrollFadeIn>
        <div className="mb-10 rounded-lg border bg-card p-6 md:p-8">
          <h2 className="mb-4 font-heading text-lg">{t("info.title")}</h2>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t("info.email")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t("info.hours")}</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground/80">{t("info.note")}</p>
        </div>
      </ScrollFadeIn>

      {/* Contact Form */}
      <ScrollFadeIn>
        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-card p-6 md:p-8">
          {submitStatus === "success" ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/20">
              <CheckCircle className="mx-auto mb-3 h-10 w-10 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200">{t("form.success")}</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("form.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("form.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{t("form.subject")}</Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={8}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{t("form.error")}</span>
                </div>
              )}

              <Button type="submit" className="w-full sm:w-auto sm:min-w-[200px]" disabled={isSubmitting}>
                {isSubmitting ? t("form.sending") : t("form.submit")}
              </Button>
            </>
          )}
        </form>
      </ScrollFadeIn>
    </div>
  );
}
