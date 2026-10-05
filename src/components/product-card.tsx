"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/catalog";
import { Icon } from "./icon";
import { useStore } from "./store-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);
  const saved = isWishlisted(product.id);
  const productHref = `/product?product=${product.id}`;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="relative aspect-[4/4.35] overflow-hidden bg-[#f7f2ec]">
        <Link href={productHref} aria-label={`View ${product.name}`} className="absolute inset-0">
          <Image src={product.image} alt={product.name} fill loading="eager" unoptimized sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain p-1 transition duration-500 group-hover:scale-[1.03] sm:p-2" />
        </Link>
        <span className="absolute left-2.5 top-2.5 rounded bg-blue-950 px-2 py-1 text-[9px] font-bold text-white">NEW</span>
        <button type="button" aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`} aria-pressed={saved} onClick={() => toggleWishlist(product.id)} className={`absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full border bg-white/95 transition hover:border-rose-200 hover:text-rose-500 ${saved ? "border-rose-200 text-rose-500" : "border-slate-200 text-slate-600"}`}>
          <Icon name="heart" className="size-4" />
        </button>
      </div>
      <div className="p-3 sm:p-4">
        <Link href={productHref} className="block truncate font-serif text-sm font-bold text-blue-950 sm:text-base">{product.name}</Link>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-bold text-blue-950">{product.price}</span>
          <span className="text-[10px] text-slate-400 line-through sm:text-xs">{product.originalPrice}</span>
          <span className="text-[10px] font-bold text-rose-500 sm:text-xs">{product.discount}</span>
        </div>
        <div className="mt-1.5 text-[11px] tracking-wide text-amber-400">★★★★★ <span className="tracking-normal text-slate-400">({product.reviews})</span></div>
        <button type="button" onClick={handleAdd} className={`mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md border text-xs font-bold transition ${added ? "border-emerald-500 bg-emerald-500 text-white" : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"}`}>
          <Icon name={added ? "check-circle" : "bag"} className="size-4" />
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
