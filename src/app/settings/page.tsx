import type { Metadata } from "next";
import { SettingsScreen } from "@/components/settings-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Settings | Shreera", description: "Manage your Shreera account, preferences, and support settings." };

export default function SettingsPage() {
  return <><SiteHeader activePage="none" mobileBack mobileBackHref="/profile" /><SettingsScreen /></>;
}
