"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckoutStep = "shipping" | "payment" | "confirmation";

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const STEPS: CheckoutStep[] = ["shipping", "payment", "confirmation"];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const t = useTranslations("checkout");

  const stepLabels: Record<CheckoutStep, string> = {
    shipping: t("shippingAddress"),
    payment: t("payment"),
    confirmation: t("confirm"),
  };

  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <nav aria-label="Checkout steps" className="mb-8">
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li key={step} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isCompleted && !isCurrent && "bg-secondary text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "hidden text-sm sm:inline",
                    isCurrent ? "font-medium" : "text-muted-foreground"
                  )}
                >
                  {stepLabels[step]}
                </span>
              </div>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "ml-2 h-px w-8 sm:ml-4 sm:w-12",
                    index < currentIndex ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
