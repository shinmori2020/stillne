/**
 * Medusa SDK initialization (singleton)
 */

import Medusa from "@medusajs/js-sdk";

// Validate environment variable
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

if (!MEDUSA_BACKEND_URL) {
  console.warn(
    "NEXT_PUBLIC_MEDUSA_BACKEND_URL is not set. Medusa SDK will not function properly."
  );
}

/**
 * Medusa SDK client instance (singleton)
 * Configured with session-based authentication
 */
export const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL ?? "http://localhost:9000",
  auth: {
    type: "session",
  },
});
