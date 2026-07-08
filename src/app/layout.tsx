import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMIÈRE NOIR — Maison de Parfum | Luxury Fragrances",
  description:
    "LUMIÈRE NOIR is a luxury perfume house crafting rare, soul-stirring fragrances. Discover our signature collection of artisanal perfumes.",
  keywords: [
    "luxury perfume",
    "fragrance",
    "perfume brand",
    "artisanal perfume",
    "maison de parfum",
    "LUMIÈRE NOIR",
  ],
  authors: [{ name: "LUMIÈRE NOIR" }],
  openGraph: {
    title: "LUMIÈRE NOIR — Maison de Parfum",
    description: "Rare, soul-stirring luxury fragrances.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
