import type { Metadata } from "next";
import { AboutScreen } from "@/components/about-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "About Shreera", description: "Discover the story, values, and craftsmanship behind Shreera." };

export default function AboutPage() {
  return <><SiteHeader activePage="about" mobileBack mobileBackHref="/" /><AboutScreen /></>;
}
