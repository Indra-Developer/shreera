import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile-nav";
import { SiteHeader } from "@/components/site-header";
import { WishlistScreen } from "@/components/wishlist-screen";

export const metadata: Metadata = {
  title: "My Wishlist | Shreera",
  description: "Save your favourite Shreera styles in one place.",
};

export default function WishlistPage() {
  return (
    <>
      <SiteHeader activePage="none" mobileBack />
      <WishlistScreen />
      <MobileNav activeItem="Wishlist" />
    </>
  );
}
