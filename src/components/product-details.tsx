"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import type { Product } from "@/data/catalog";
import { useStore } from "@/components/store-provider";
const colors = [
  { name: "Royal Blue", className: "bg-blue-600" },
  { name: "Purple", className: "bg-violet-700" },
  { name: "Peach", className: "bg-rose-300" },
  { name: "Green", className: "bg-emerald-600" },
  { name: "Gold", className: "bg-amber-400" },
];
const sizes = ["Free Size", "S", "M", "L", "XL", "XXL"];

export function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const defaultColor = product.name.includes("Lavender") ? "Purple" : product.name.includes("Peach") ? "Peach" : product.name.includes("Green") ? "Green" : product.name.includes("Beige") ? "Gold" : "Royal Blue";
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState("Free Size");
  const [promoOpen, setPromoOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [message, setMessage] = useState("");
  const saved = isWishlisted(product.id);
  const productNumber = Number(product.price.replace(/[^0-9]/g, ""));
  const promoPrice = `₹${Math.round(productNumber * 0.95).toLocaleString("en-IN")}`;

  const addSelectedToCart = () => {
    addToCart(product, { color: selectedColor, size: selectedSize });
    setMessage(`${product.name} added to your cart.`);
  };

  const buyNow = () => {
    addToCart(product, { color: selectedColor, size: selectedSize });
    router.push("/checkout");
  };

  const shareProduct = async () => {
    const shareData = { title: product.name, text: `Discover ${product.name} at Shreera.`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setMessage("Product link ready to share.");
    } catch {
      setMessage("Sharing was cancelled.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-3 pb-10 pt-3 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <Link href="/categories" className="mb-4 hidden items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-700 md:inline-flex">‹ Back to Categories</Link>
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-9">
          <div className="relative aspect-[0.92] overflow-hidden rounded-xl bg-stone-100 sm:aspect-[1.05] lg:aspect-[0.88]">
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="bg-[#f7f2ec] object-contain object-center" />
            <span className="absolute left-4 top-4 rounded-md bg-rose-500 px-2.5 py-1.5 text-[10px] font-bold text-white">{product.discount}</span>
            <div className="absolute right-4 top-4 flex flex-col gap-2"><button type="button" onClick={() => toggleWishlist(product.id)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved} className={`grid size-9 place-items-center rounded-full bg-white/95 shadow ${saved ? "text-rose-500" : "text-blue-950"}`}><Icon name="heart" className="size-5" /></button><button type="button" onClick={shareProduct} aria-label="Share product" className="grid size-9 place-items-center rounded-full bg-white/95 text-blue-950 shadow"><Icon name="arrow" className="size-5 rotate-[-45deg]" /></button></div>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/90 px-2 py-1"><span className="size-1.5 rounded-full bg-blue-600" /><span className="size-1.5 rounded-full bg-slate-300" /><span className="size-1.5 rounded-full bg-slate-300" /><span className="size-1.5 rounded-full bg-slate-300" /></div>
          </div>

          <section className="min-w-0">
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 lg:block">Soft Silk Collection</p>
            <h1 className="mt-1 font-serif text-2xl font-bold text-blue-950 sm:text-4xl lg:mt-2">{product.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2"><b className="text-2xl text-blue-950 sm:text-3xl">{product.price}</b><span className="text-xs text-slate-400 line-through">{product.originalPrice}</span><span className="text-xs font-bold text-rose-500">{product.discount}</span><span className="ml-auto inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">● In Stock</span></div>
            <div className="mt-2 text-xs tracking-wide text-amber-400">★★★★★ <span className="tracking-normal text-slate-500">({product.reviews})</span></div>
            <button type="button" onClick={() => setPromoOpen((value) => !value)} className="mt-4 flex w-full items-center justify-between rounded-xl border border-blue-200 bg-blue-50/60 px-3 py-3 text-left"><span><b className="block text-xs text-blue-950">Get it for {promoPrice}</b><small className="text-[10px] text-slate-500">Use SAVE5 and get extra 5% off</small></span><span className="text-xs font-bold text-blue-700">{promoOpen ? "Hide" : "Apply Code"} ›</span></button>

            <div className="mt-5"><div className="flex items-center justify-between"><b className="text-xs text-blue-950">Select Color</b><span className="text-xs text-slate-500">{selectedColor}</span></div><div className="mt-2 flex gap-3">{colors.map((color) => <button key={color.name} type="button" onClick={() => setSelectedColor(color.name)} aria-label={`Select ${color.name}`} className={`grid size-9 place-items-center rounded-full border-2 border-white ${color.className} ring-1 ${selectedColor === color.name ? "ring-blue-600 ring-2" : "ring-slate-200"}`} />)}</div></div>
            <div className="mt-5"><div className="flex items-center justify-between"><b className="text-xs text-blue-950">Select Size</b><button type="button" onClick={() => setSizeGuideOpen((open) => !open)} className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-semibold text-blue-700">▱ Size Guide</button></div><div className="mt-2 grid grid-cols-6 gap-2">{sizes.map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={`h-9 rounded-md border text-[10px] font-semibold ${selectedSize === size ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}>{size}</button>)}</div>{sizeGuideOpen ? <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-[10px] leading-4 text-slate-600">Sarees are free size. Blouse sizes can be tailored from S to XXL after purchase.</p> : null}</div>

            <div className="mt-5 grid grid-cols-4 overflow-hidden rounded-xl border border-slate-200 bg-white py-3 text-center"><div><Icon name="truck" className="mx-auto size-5 text-blue-700" /><b className="mt-1 block text-[9px] text-blue-950">Free Shipping</b><small className="text-[8px] text-slate-500">Above ₹999</small></div><div><Icon name="returns" className="mx-auto size-5 text-blue-700" /><b className="mt-1 block text-[9px] text-blue-950">Easy Returns</b><small className="text-[8px] text-slate-500">7 Days</small></div><div><Icon name="shield" className="mx-auto size-5 text-blue-700" /><b className="mt-1 block text-[9px] text-blue-950">Secure Payment</b><small className="text-[8px] text-slate-500">100% protected</small></div><div><Icon name="bag" className="mx-auto size-5 text-blue-700" /><b className="mt-1 block text-[9px] text-blue-950">COD Available</b><small className="text-[8px] text-slate-500">Pay on delivery</small></div></div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3 sm:p-4"><div className="flex gap-3"><div className="flex-1"><h2 className="font-serif text-base font-bold text-blue-950">Product Highlights</h2><ul className="mt-2 space-y-1 text-[10px] leading-4 text-slate-600 sm:text-xs"><li>• Premium soft silk fabric</li><li>• Rich zari woven border</li><li>• Lightweight &amp; comfortable</li><li>• Perfect for festive &amp; wedding wear</li><li>• Includes saree with unstitched blouse piece</li></ul></div><div className="relative hidden h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:block"><Image src={product.image} alt="Saree fabric detail" fill sizes="112px" className="object-cover" /></div></div></div>

            <div className="mt-4 grid grid-cols-3 gap-2"><button type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={saved} className={`inline-flex h-11 items-center justify-center gap-1 rounded-lg border text-xs font-bold ${saved ? "border-rose-300 text-rose-600" : "border-slate-300 text-blue-950"}`}><Icon name="heart" className="size-4" /> {saved ? "Saved" : "Wishlist"}</button><button type="button" onClick={addSelectedToCart} className="inline-flex h-11 items-center justify-center gap-1 rounded-lg border border-blue-600 text-xs font-bold text-blue-700"><Icon name="bag" className="size-4" /> Add to Cart</button><button type="button" onClick={buyNow} className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-blue-600 text-xs font-bold text-white shadow-lg shadow-blue-200">Buy Now <span>↯</span></button></div>
            {message ? <p role="status" className="mt-3 text-center text-[10px] font-semibold text-blue-700">{message}</p> : null}
          </section>
        </div>
      </main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
    </div>
  );
}
