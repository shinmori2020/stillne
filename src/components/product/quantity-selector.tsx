"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  const t = useTranslations("product");

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center">
      <span className="mr-3 text-sm text-muted-foreground">{t("quantity")}</span>
      <div className="flex items-center rounded-sm border border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className="h-10 w-10 rounded-none rounded-l-sm"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="flex h-10 w-12 items-center justify-center font-mono text-sm">
          {value}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className="h-10 w-10 rounded-none rounded-r-sm"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
