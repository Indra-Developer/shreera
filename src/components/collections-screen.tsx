"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { MobileNav } from "@/components/mobile-nav";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/catalog";

const collections = [
  { id: "festive", name: "Festive Edit", note: "Glow through every celebration", image: "/images/beige-saree.png", ids: ["beige-banarasi", "peach-kanjivaram"] },
  { id: "soft-silk", name: "Soft Silk Stories", note: "Luminous drapes for memorable evenings", image: "/images/royal-blue-saree.png", ids: ["royal-blue-soft-silk", "sea-green-soft-silk"] },
  { id: "banarasi", name: "Banarasi Heritage", note: "Woven tradition, styled for today", image: "/images/lavender-saree.png", ids: ["lavender-banarasi", "beige-banarasi"] },
  { id: "pastels", name: "Pastel Days", note: "Light, graceful colour for every day", image: "/images/sea-green-saree.png", ids: ["sea-green-soft-silk", "lavender-banarasi"] },
  { id: "wedding", name: "Wedding Guest", note: "Elegant silhouettes for every invite", image: "/images/peach-saree.png", ids: ["peach-kanjivaram", "royal-blue-soft-silk"] },
];

export function CollectionsScreen({ initialCollection = "" }: { initialCollection?: string }) {
  const initial = collections.some((collection) => collection.id === initialCollection) ? initialCollection : "festive";
  const [activeId, setActiveId] = useState(initial);
  const active = collections.find((collection) => collection.id === activeId) ?? collections[0];
  const featuredProducts = useMemo(() => active.ids.map((id) => products.find((product) => product.id === id)).filter((product): product is (typeof products)[number] => Boolean(product)), [active]);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-800 to-sky-500 px-5 py-8 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="relative z-10 max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-200">Curated for your moments</p><h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">Collections that feel like you.</h1><p className="mt-3 max-w-md text-xs leading-5 text-blue-100 sm:text-sm sm:leading-6">From festive sparkle to quiet everyday elegance, discover edits made to make getting dressed feel effortless.</p><Link href="/categories" className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-white px-5 text-xs font-bold text-blue-800 transition hover:bg-blue-50">Browse Categories <Icon name="arrow" className="size-4" /></Link></div>
          <div className="absolute -right-8 -top-10 size-56 rounded-full bg-white/10 blur-2xl sm:size-80" /><div className="absolute -bottom-24 right-16 size-72 rounded-full bg-sky-300/20 blur-3xl" />
        </section>

        <section className="mt-8 sm:mt-12"><div className="mb-4 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Shop by edit</p><h2 className="mt-1 font-serif text-2xl font-bold text-blue-950 sm:text-3xl">Find your occasion</h2></div><span className="hidden text-xs text-slate-400 sm:inline">Tap a collection to explore</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">{collections.map((collection) => <button key={collection.id} type="button" onClick={() => setActiveId(collection.id)} aria-pressed={active.id === collection.id} className={`group overflow-hidden rounded-2xl border bg-white text-left transition hover:-translate-y-1 hover:shadow-xl ${active.id === collection.id ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}><div className="relative aspect-[0.9] overflow-hidden bg-[#f7f2ec]"><Image src={collection.image} alt={collection.name} fill loading="eager" unoptimized sizes="(max-width: 640px) 50vw, 20vw" className="object-contain p-1 transition duration-500 group-hover:scale-[1.04]" /></div><div className="p-3"><b className="block font-serif text-sm text-blue-950 sm:text-base">{collection.name}</b><span className="mt-1 block text-[10px] leading-4 text-slate-500 sm:text-xs">{collection.note}</span></div></button>)}</div></section>

        <section className="mt-9 border-t border-slate-200 pt-7 sm:mt-12 sm:pt-9"><div className="mb-4 flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">{active.name}</p><h2 className="mt-1 font-serif text-2xl font-bold text-blue-950 sm:text-3xl">{active.note}</h2></div><Link href="/search" className="shrink-0 text-xs font-bold text-blue-600 hover:text-blue-800">Search all styles</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
      </main>
      <MobileNav activeItem="" />
    </div>
  );
}
