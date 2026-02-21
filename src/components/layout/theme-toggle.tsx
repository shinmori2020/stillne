"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("navigation");
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const body = document.body;
    // Fade out
    body.classList.add("theme-fade");
    body.classList.remove("theme-fade-in");

    setTimeout(() => {
      // Switch theme while faded out
      setTheme(theme === "dark" ? "light" : "dark");

      // Fade in
      requestAnimationFrame(() => {
        body.classList.remove("theme-fade");
        body.classList.add("theme-fade-in");

        // Clean up class after animation
        setTimeout(() => {
          body.classList.remove("theme-fade-in");
        }, 250);
      });
    }, 250);
  }, [theme, setTheme]);

  if (!mounted) {
    // Render placeholder to avoid layout shift
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={t("toggleTheme")}
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
