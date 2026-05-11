import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morales Soluções | Bloom Gifts Landing Page + Catálogo",
  description: "Proposta comercial da Morales Soluções para a nova landing page com catálogo e WhatsApp da Bloom Gifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
