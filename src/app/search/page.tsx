import type { Metadata } from "next";
import { SearchResultsScreen } from "@/components/search-results-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Search Shreera Collections", description: "Search sarees and occasion-ready styles from Shreera." };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <><SiteHeader activePage="none" mobileBack mobileBackHref="/" /><SearchResultsScreen initialQuery={q ?? ""} /></>;
}
