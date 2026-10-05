import type { Metadata } from "next";
import { CartScreen } from "@/components/cart-screen";
import { MobileNav } from "@/components/mobile-nav";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "My Cart | Shreera",
  description: "Review your Shreera items and proceed to checkout.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader activePage="none" mobileBack />
      <CartScreen />
      <MobileNav activeItem="Cart" />
    </>
  );
}
