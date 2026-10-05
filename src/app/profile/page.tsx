import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile-nav";
import { ProfileScreen } from "@/components/profile-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Profile | Shreera", description: "Manage your Shreera profile, orders, addresses, and preferences." };

export default function ProfilePage() {
  return <><SiteHeader activePage="none" mobileMode="none" /><ProfileScreen /><MobileNav activeItem="Profile" /></>;
}
