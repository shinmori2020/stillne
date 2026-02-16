/**
 * Format utilities for price and date display
 */

/**
 * Format price from Medusa's smallest currency unit to display format
 * Medusa stores prices in smallest currency unit (e.g., cents for USD, yen for JPY)
 *
 * @param amount - Price in smallest currency unit
 * @param currencyCode - ISO 4217 currency code (e.g., "jpy", "usd")
 * @param locale - Locale string (e.g., "ja", "en")
 * @returns Formatted price string
 */
export function formatPrice(
  amount: number,
  currencyCode: string,
  locale: string = "ja"
): string {
  const upperCurrencyCode = currencyCode.toUpperCase();

  // Currencies that don't use decimal places
  const zeroDecimalCurrencies = ["JPY", "KRW", "VND"];
  const isZeroDecimal = zeroDecimalCurrencies.includes(upperCurrencyCode);

  // Convert from smallest unit to display unit
  const displayAmount = isZeroDecimal ? amount : amount / 100;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: upperCurrencyCode,
    minimumFractionDigits: isZeroDecimal ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(displayAmount);
}

/**
 * Format date using Intl.DateTimeFormat
 *
 * @param date - Date object or ISO string
 * @param locale - Locale string (e.g., "ja", "en")
 * @param options - Optional DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: string = "ja",
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(locale, options ?? defaultOptions).format(
    dateObj
  );
}
