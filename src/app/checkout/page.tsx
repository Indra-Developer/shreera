import type { Metadata } from "next";
import { CheckoutScreen } from "@/components/checkout-screen";
import { MobileNav } from "@/components/mobile-nav";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Checkout | Shreera",
  description: "Complete delivery and payment for your Shreera order.",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader activePage="none" mobileBack mobileBackHref="/cart" />
      <CheckoutScreen />
      <MobileNav activeItem="Cart" />
    </>
  );
}
