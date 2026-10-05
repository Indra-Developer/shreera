"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { products, type Product } from "@/data/catalog";

type WishItem = Product & { color: string };

const initialItems: WishItem[] = [
  { ...products[0], color: "Royal Blue" },
  { ...products[1], color: "Lavender" },
  { ...products[2], color: "Peach" },
  { ...products[3], color: "Sea Green" },
  { ...products[4], color: "Beige" },
];

export function WishlistScreen() {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");

  const removeItem = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const clearAll = () => setItems([]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
          <div><h1 className="font-serif text-2xl font-bold text-blue-950 sm:text-4xl">My Wishlist ({items.length})</h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Your favourite styles, all in one place.</p></div>
          <button type="button" onClick={clearAll} disabled={!items.length} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 text-[10px] font-bold text-blue-800 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:rounded-md sm:px-4 sm:text-xs"><Icon name="trash" className="size-4" /> Clear All</button>
        </div>

        {items.length ? (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {items.map((item) => (
              <article key={item.id} className="relative flex min-h-[154px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_5px_18px_rgba(15,23,42,0.04)] transition hover:border-blue-200 hover:shadow-lg">
                <div className="relative w-[42%] shrink-0 bg-stone-100 sm:w-[128px]">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 42vw, 128px" className="object-cover object-top" />
                  <span className="absolute left-2 top-2 rounded bg-blue-950 px-1.5 py-0.5 text-[8px] font-bold text-white">NEW</span>
                </div>
                <div className="min-w-0 flex-1 p-3 pr-9 sm:p-3 sm:pr-10">
                  <h2 className="truncate font-serif text-xs font-bold text-blue-950 sm:text-sm">{item.name}</h2>
                  <div className="mt-1.5 flex items-center gap-2"><b className="text-sm text-blue-950">{item.price}</b><span className="text-[9px] text-slate-400 line-through">{item.originalPrice}</span><span className="text-[9px] font-semibold text-rose-500">{item.discount}</span></div>
                  <p className="mt-1 text-[10px] font-semibold text-emerald-600">In Stock</p>
                  <p className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-600"><span className="size-3 rounded-full border border-white bg-blue-600 shadow-sm" /> {item.color}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2"><Link href="/cart" className="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-slate-300 text-[9px] font-bold text-blue-950 transition hover:border-blue-500 hover:bg-blue-50 sm:text-[10px]"><Icon name="bag" className="size-3.5" /> Move to Cart</Link><Link href="/cart" className="inline-flex h-8 items-center justify-center rounded-md bg-blue-600 text-[9px] font-bold text-white transition hover:bg-blue-700 sm:text-[10px]">Buy Now</Link></div>
                </div>
                <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from wishlist`} className="absolute right-2 top-2 grid size-8 place-items-center rounded-full border border-slate-200 text-rose-500 transition hover:bg-rose-50"><Icon name="heart" className="size-4" /></button>
                <button type="button" onClick={() => setMessage(`${item.name} is saved in your wishlist.`)} aria-label={`More options for ${item.name}`} className="absolute bottom-11 right-2 hidden text-slate-500 sm:block"><Icon name="dots" className="size-4" /></button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center"><Icon name="heart" className="mx-auto size-9 text-blue-300" /><h2 className="mt-3 font-serif text-xl font-bold text-blue-950">Your wishlist is empty</h2><p className="mt-1 text-xs text-slate-500">Save the styles you love and find them here.</p><Link href="/categories" className="mt-5 inline-flex h-10 items-center rounded-lg bg-blue-600 px-5 text-xs font-bold text-white">Explore Categories</Link></div>
        )}

        {items.length ? <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-center text-[10px] font-medium text-blue-900 sm:text-xs"><Icon name="heart" className="size-4" /> Move items to cart and place your order before they sell out!</div> : null}
        {message ? <p role="status" className="mt-3 text-center text-xs font-semibold text-blue-700">{message}</p> : null}
      </main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
    </div>
  );
}
