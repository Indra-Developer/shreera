import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile-nav";
import { OrdersScreen } from "@/components/orders-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "My Orders | Shreera",
  description: "Track and manage your Shreera orders.",
};

export default function OrdersPage() {
  return (
    <>
      <SiteHeader activePage="none" mobileBack mobileBackHref="/profile" />
      <OrdersScreen />
      <MobileNav activeItem="Profile" />
    </>
  );
}
