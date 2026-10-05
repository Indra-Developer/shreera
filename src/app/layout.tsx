import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: "Shreera | Crafted For The Woman You Are",
  description: "Discover elegant sarees, timeless collections, and styles crafted for every woman.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Shreera | Crafted For The Woman You Are",
    description: "Discover elegant sarees, timeless collections, and styles crafted for every woman.",
    url: siteUrl,
    siteName: "Shreera",
    locale: "en_IN",
    type: "website",
    images: [
      { url: "/images/hero-blue.png", width: 1536, height: 1024, alt: "Shreera blue silk saree collection" },
      { url: "/images/shreera-logo.png", width: 1959, height: 803, alt: "Shreera — Crafted for the woman you are" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreera | Crafted For The Woman You Are",
    description: "Discover elegant sarees, timeless collections, and styles crafted for every woman.",
    images: ["/images/hero-blue.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-50 font-sans antialiased"><StoreProvider>{children}</StoreProvider></body>
    </html>
  );
}
