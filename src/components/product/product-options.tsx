"use client";

import { cn } from "@/lib/utils";
import type { ProductOption, ProductVariant, ProductOptionValue } from "@/types/product";

interface ProductOptionsProps {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant | null) => void;
}

export function ProductOptions({
  options,
  variants,
  selectedVariant,
  onVariantChange,
}: ProductOptionsProps) {
  // Get currently selected option values
  const selectedOptions: Record<string, string> = {};
  if (selectedVariant) {
    selectedVariant.options?.forEach((opt) => {
      selectedOptions[opt.option_id] = opt.value;
    });
  }

  // Handle option value selection
  const handleOptionSelect = (optionId: string, value: string) => {
    const newSelectedOptions = { ...selectedOptions, [optionId]: value };

    // Find variant that matches all selected options
    const matchingVariant = variants.find((variant) =>
      variant.options?.every(
        (opt) => newSelectedOptions[opt.option_id] === opt.value
      )
    );

    onVariantChange(matchingVariant ?? null);
  };

  // Check if an option value is available (has at least one variant in stock)
  const isOptionValueAvailable = (
    optionId: string,
    value: string
  ): boolean => {
    // Get all variants that have this option value
    const matchingVariants = variants.filter((variant) =>
      variant.options?.some(
        (opt) => opt.option_id === optionId && opt.value === value
      )
    );

    // Check if any of them are in stock (or allow backorder)
    return matchingVariants.some(
      (v) => v.inventory_quantity > 0 || v.allow_backorder
    );
  };

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="space-y-2">
          <label className="text-sm font-medium">{option.title}</label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((optionValue: ProductOptionValue) => {
              const isSelected = selectedOptions[option.id] === optionValue.value;
              const isAvailable = isOptionValueAvailable(option.id, optionValue.value);

              return (
                <button
                  key={optionValue.id}
                  onClick={() => handleOptionSelect(option.id, optionValue.value)}
                  disabled={!isAvailable}
                  className={cn(
                    "rounded-sm border px-4 py-2 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-secondary",
                    !isAvailable && "cursor-not-allowed opacity-50"
                  )}
                >
                  {optionValue.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
