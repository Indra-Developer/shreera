import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreera | Crafted For The Woman You Are",
  description: "Discover elegant sarees, timeless collections, and styles crafted for every woman.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-50 font-sans antialiased">{children}</body>
    </html>
  );
}
