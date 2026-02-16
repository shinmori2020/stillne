import "./globals.css";

// Root layout - delegates to [locale]/layout.tsx for locale-specific rendering
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
