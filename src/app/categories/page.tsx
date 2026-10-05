import type { Metadata } from "next";
import { CategoryBrowser } from "@/components/category-browser";
import { MobileNav } from "@/components/mobile-nav";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Categories | Shreera",
  description: "Browse sarees, kurtis, lehengas, and jewellery at Shreera.",
};

export default function CategoriesPage() {
  return (
    <>
      <SiteHeader activePage="categories" mobileBack />
      <CategoryBrowser />
      <MobileNav activeItem="Categories" />
    </>
  );
}
