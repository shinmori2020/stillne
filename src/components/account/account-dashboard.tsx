"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { User, Package, MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomer, useLogout } from "@/hooks/use-auth";

interface AccountDashboardProps {
  locale: string;
}

export function AccountDashboard({ locale }: AccountDashboardProps) {
  const t = useTranslations("account");
  const router = useRouter();
  const { data: customer, isLoading } = useCustomer();
  const logout = useLogout();

  // Check if Medusa is configured
  const isMedusaConfigured = !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

  // Loading state
  if (isLoading && isMedusaConfigured) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Demo mode: show dummy data when Medusa is not configured
  const demoCustomer = !isMedusaConfigured
    ? { first_name: "太郎", last_name: "山田", email: "demo@stillne.com" }
    : null;

  const displayCustomer = customer || demoCustomer;

  // Not logged in (only when Medusa is configured)
  if (!displayCustomer) {
    return (
      <div className="space-y-6 text-center">
        <p className="text-muted-foreground">
          {locale === "ja"
            ? "アカウントにログインしてください"
            : "Please log in to your account"}
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href={`/${locale}/account/login`}>{t("login")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${locale}/account/register`}>{t("register")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout.mutateAsync();
    router.push(`/${locale}`);
  };

  const menuItems = [
    {
      href: `/${locale}/account/profile`,
      icon: User,
      label: t("profile"),
      description:
        locale === "ja"
          ? "名前やメールアドレスを変更"
          : "Update your name and email",
    },
    {
      href: `/${locale}/account/orders`,
      icon: Package,
      label: t("orders"),
      description:
        locale === "ja" ? "注文履歴を確認" : "View your order history",
    },
    {
      href: `/${locale}/account/addresses`,
      icon: MapPin,
      label: t("addresses"),
      description:
        locale === "ja" ? "配送先住所を管理" : "Manage your shipping addresses",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div className="rounded-lg border border-border p-6">
        <h2 className="text-lg font-medium">
          {t("welcome")}
          {displayCustomer.first_name && `, ${displayCustomer.first_name}`}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{displayCustomer.email}</p>
      </div>

      {/* Menu items */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-lg border border-border p-6 transition-colors hover:border-primary"
          >
            <item.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
            <h3 className="mt-4 font-medium">{item.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Logout button */}
      <div className="border-t border-border pt-6">
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={logout.isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {logout.isPending ? t("loggingOut") : t("logout")}
        </Button>
      </div>
    </div>
  );
}
