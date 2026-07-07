import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patrimonio AI",
  description: "Il tuo patrimonio, radicato e in crescita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased bg-cream text-ink">{children}</body>
    </html>
  );
}
