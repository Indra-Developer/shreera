import type { Metadata } from "next";
import { ContactScreen } from "@/components/contact-screen";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Contact Shreera", description: "Reach the Shreera support team for order, return, and styling help." };

export default function ContactPage() {
  return <><SiteHeader activePage="contact" mobileBack mobileBackHref="/" /><ContactScreen /></>;
}
