import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile-nav";
import { NotificationsScreen } from "@/components/notifications-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Notifications | Shreera", description: "Stay updated with Shreera order and collection notifications." };

export default function NotificationsPage() {
  return <><SiteHeader activePage="none" mobileBack mobileBackHref="/profile" /><NotificationsScreen /><MobileNav activeItem="Profile" /></>;
}
