import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile-nav";
import { ProductDetails } from "@/components/product-details";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/data/catalog";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ product?: string }> }): Promise<Metadata> {
  const { product: productId } = await searchParams;
  const product = products.find((item) => item.id === productId) ?? products[0];
  return { title: `${product.name} | Shreera`, description: `Shop the ${product.name} from Shreera.` };
}

export default async function ProductPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product: productId } = await searchParams;
  const product = products.find((item) => item.id === productId) ?? products[0];
  return <><SiteHeader activePage="none" mobileBack mobileBackHref="/categories" /><ProductDetails product={product} /><MobileNav activeItem="" /></>;
}
