import type { Metadata } from "next";
import { CollectionsScreen } from "@/components/collections-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Collections | Shreera", description: "Explore Shreera's curated saree collections for every occasion." };

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ focus?: string }> }) {
  const { focus } = await searchParams;
  return <><SiteHeader activePage="collections" mobileBack mobileBackHref="/" /><CollectionsScreen initialCollection={focus === "sale" ? "festive" : focus ?? "festive"} /></>;
}
