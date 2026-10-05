"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/catalog";

type GroupName = "Sarees" | "Kurtis" | "Lehengas" | "Jewellery" | "View All";
type Collection = { name: string; count: number; image: string };
type Group = { name: GroupName; image?: string; collections: Collection[] };

const groups: Group[] = [
  {
    name: "Sarees",
    image: "/images/royal-blue-saree.png",
    collections: [
      { name: "Soft Silk Sarees", count: 245, image: "/images/royal-blue-saree.png" },
      { name: "Kanchipuram Sarees", count: 186, image: "/images/peach-saree.png" },
      { name: "Banarasi Sarees", count: 198, image: "/images/lavender-saree.png" },
      { name: "Georgette Sarees", count: 124, image: "/images/sea-green-saree.png" },
      { name: "Cotton Sarees", count: 96, image: "/images/beige-saree.png" },
      { name: "Tissue Sarees", count: 63, image: "/images/lavender-saree.png" },
      { name: "Crepe Sarees", count: 58, image: "/images/peach-saree.png" },
      { name: "Bhagalpur Sarees", count: 42, image: "/images/sea-green-saree.png" },
      { name: "Gadwal Sarees", count: 44, image: "/images/beige-saree.png" },
    ],
  },
  {
    name: "Kurtis",
    image: "/images/kurti-category.png",
    collections: [
      { name: "Everyday Kurtis", count: 142, image: "/images/kurti-category.png" },
      { name: "Embroidered Kurtis", count: 86, image: "/images/kurti-category.png" },
      { name: "Anarkali Kurtis", count: 64, image: "/images/kurti-category.png" },
      { name: "Kurti Sets", count: 53, image: "/images/kurti-category.png" },
    ],
  },
  {
    name: "Lehengas",
    image: "/images/lehenga-category.png",
    collections: [
      { name: "Festive Lehengas", count: 76, image: "/images/lehenga-category.png" },
      { name: "Bridal Lehengas", count: 48, image: "/images/lehenga-category.png" },
      { name: "Lightweight Lehengas", count: 42, image: "/images/lehenga-category.png" },
      { name: "Designer Lehengas", count: 31, image: "/images/lehenga-category.png" },
    ],
  },
  {
    name: "Jewellery",
    image: "/images/jewellery-category.png",
    collections: [
      { name: "Necklace Sets", count: 68, image: "/images/jewellery-category.png" },
      { name: "Earrings", count: 54, image: "/images/jewellery-category.png" },
      { name: "Bangles", count: 38, image: "/images/jewellery-category.png" },
      { name: "Bridal Jewellery", count: 26, image: "/images/jewellery-category.png" },
    ],
  },
  {
    name: "View All",
    collections: [
      { name: "Sarees", count: 1256, image: "/images/royal-blue-saree.png" },
      { name: "Kurtis", count: 345, image: "/images/kurti-category.png" },
      { name: "Lehengas", count: 197, image: "/images/lehenga-category.png" },
      { name: "Jewellery", count: 186, image: "/images/jewellery-category.png" },
    ],
  },
];

const sortOptions = ["Recommended", "A to Z", "Most styles"] as const;
type SortOption = (typeof sortOptions)[number];

export function CategoryBrowser() {
  const [activeGroup, setActiveGroup] = useState<GroupName>("Sarees");
  const [activeFilter, setActiveFilter] = useState("All Sarees");
  const [sortBy, setSortBy] = useState<SortOption>("Recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const currentGroup = groups.find((group) => group.name === activeGroup) ?? groups[0];
  const sidebarFilters = currentGroup.collections;
  const productMatches = activeGroup === "Sarees" && !activeFilter.startsWith("All ")
    ? products.filter((product) => product.name.toLowerCase().includes(activeFilter.split(" ")[0].toLowerCase()))
    : products;
  const visibleProducts = productMatches.length > 0 ? productMatches : products;

  const visibleCollections = (() => {
    const filtered = activeFilter.startsWith("All ")
      ? currentGroup.collections
      : currentGroup.collections.filter((collection) => collection.name === activeFilter);
    if (sortBy === "A to Z") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "Most styles") return [...filtered].sort((a, b) => b.count - a.count);
    return filtered;
  })();

  function chooseGroup(groupName: GroupName) {
    setActiveGroup(groupName);
    setActiveFilter(groupName === "View All" ? "All collections" : `All ${groupName}`);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white pb-20 text-slate-900 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8">
        <Link href="/" className="hidden items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-blue-700 md:inline-flex sm:text-sm">
          <span aria-hidden="true" className="text-lg leading-none">‹</span> Back to Home
        </Link>

        <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4 md:items-end">
          <div>
            <h1 className="font-serif text-2xl font-bold text-blue-950 sm:text-4xl">Categories</h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">Explore our exclusive collection</p>
          </div>
          <div className="relative shrink-0">
            <button type="button" onClick={() => setSortOpen((open) => !open)} aria-expanded={sortOpen} className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-blue-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 sm:h-10 sm:px-4 sm:text-sm">
              <Icon name="sort" className="size-4" /> <span className="hidden sm:inline">Sort:</span> <span className="sm:hidden">Sort</span><span className="hidden sm:inline">{sortBy}</span> <span aria-hidden="true" className="text-slate-400">⌄</span>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-12 z-30 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                {sortOptions.map((option) => (
                  <button key={option} type="button" onClick={() => { setSortBy(option); setSortOpen(false); }} className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${sortBy === option ? "bg-blue-50 font-bold text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-0 overflow-visible border-b border-slate-200 pb-0 [scrollbar-width:none] sm:mt-7 sm:gap-8 md:justify-start">
          {groups.map((group) => (
            <button key={group.name} type="button" onClick={() => chooseGroup(group.name)} aria-pressed={activeGroup === group.name} className={`group relative flex min-w-[58px] flex-col items-center gap-2 pb-3 text-center text-[10px] font-semibold transition sm:min-w-[78px] sm:text-xs ${activeGroup === group.name ? "text-blue-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-blue-600" : "text-slate-600 hover:text-blue-700"}`}>
              <span className={`relative grid size-14 place-items-center overflow-hidden rounded-full border bg-slate-50 transition sm:size-16 ${activeGroup === group.name ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 group-hover:border-blue-300"}`}>
                {group.image ? <Image src={group.image} alt="" fill sizes="64px" className="object-cover" /> : <Icon name="grid" className="size-6 text-blue-600" />}
              </span>
              {group.name}
            </button>
          ))}
        </div>
      </div>

      <div id="collections" className="mx-auto mt-0 grid max-w-7xl grid-cols-[136px_minmax(0,1fr)] gap-2 px-2 sm:px-6 lg:mt-7 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8 lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-blue-950">Browse {activeGroup === "View All" ? "All" : activeGroup}</h2>
              <Icon name="sort" className="size-4 text-slate-400" />
            </div>
            <button type="button" onClick={() => setActiveFilter(activeGroup === "View All" ? "All collections" : `All ${activeGroup}`)} className={`mb-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${activeFilter.startsWith("All ") ? "bg-blue-50 font-bold text-blue-800" : "text-slate-600 hover:bg-slate-50"}`}>
              <span>All {activeGroup === "View All" ? "Collections" : activeGroup}</span>
              <span className="text-xs text-slate-400">{sidebarFilters.reduce((total, item) => total + item.count, 0).toLocaleString("en-IN")}</span>
            </button>
            <div className="space-y-1">
              {sidebarFilters.map((item) => (
                <button key={item.name} type="button" onClick={() => setActiveFilter(item.name)} aria-pressed={activeFilter === item.name} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${activeFilter === item.name ? "bg-blue-50 font-bold text-blue-800" : "text-slate-600 hover:bg-slate-50"}`}>
                  <span>{item.name}</span><span className="text-xs text-slate-400">{item.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <aside className="block min-w-0 lg:hidden">
          <div className="border-r border-slate-200 pr-2">
            <button type="button" onClick={() => setActiveFilter(`All ${activeGroup}`)} className={`mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-3 text-left text-[10px] font-semibold leading-4 transition ${activeFilter.startsWith("All ") ? "bg-blue-50 text-blue-700" : "text-slate-600"}`}>
              <Icon name="sparkle" className="size-4 shrink-0" /><span>All {activeGroup}<small className="block font-normal text-slate-500">({sidebarFilters.reduce((total, item) => total + item.count, 0).toLocaleString("en-IN")})</small></span>
            </button>
            <div className="space-y-0.5">
              {sidebarFilters.map((item) => (
                <button key={item.name} type="button" onClick={() => setActiveFilter(item.name)} aria-pressed={activeFilter === item.name} className={`flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-[10px] font-semibold leading-4 transition ${activeFilter === item.name ? "bg-blue-50 text-blue-700" : "text-slate-700"}`}>
                  <Icon name="sparkle" className="mt-0.5 size-4 shrink-0 text-slate-400" /><span>{item.name}<small className="block font-normal text-slate-500">({item.count})</small></span>
                </button>
              ))}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[10px] font-semibold text-slate-700"><Icon name="grid" className="size-4 text-slate-400" /> More <span className="text-slate-400">⌄</span></button>
            </div>
          </div>
        </aside>

        <section aria-label={`${activeGroup} collections`}>
          <div className="hidden">
            <button type="button" onClick={() => setActiveFilter(activeGroup === "View All" ? "All collections" : `All ${activeGroup}`)} aria-pressed={activeFilter.startsWith("All ")} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeFilter.startsWith("All ") ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>All {activeGroup === "View All" ? "Collections" : activeGroup}</button>
            {sidebarFilters.map((item) => (
              <button key={item.name} type="button" onClick={() => setActiveFilter(item.name)} aria-pressed={activeFilter === item.name} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeFilter === item.name ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{item.name}</button>
            ))}
          </div>

          <div className="mb-2 mt-0 hidden items-end justify-between sm:mb-4 lg:mt-0 lg:flex">
            <div>
              <h2 className="font-serif text-xl font-bold text-blue-950 sm:text-2xl">{activeFilter.startsWith("All ") ? `${activeGroup === "View All" ? "Explore All" : activeGroup} Collections` : activeFilter}</h2>
              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">{visibleCollections.length} curated {visibleCollections.length === 1 ? "category" : "categories"} for you</p>
            </div>
            <span className="hidden text-xs text-slate-400 sm:inline">Thoughtfully chosen for every occasion</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-3">
            {visibleCollections.map((collection) => (
              <button key={collection.name} type="button" onClick={() => setActiveFilter(collection.name)} aria-pressed={activeFilter === collection.name} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/10">
                <div className="relative aspect-[1.05] overflow-hidden bg-stone-100 sm:aspect-[1.35]">
                  <Image src={collection.image} alt={collection.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.04]" />
                  <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-semibold text-blue-950 shadow-sm sm:text-[10px]">{collection.count.toLocaleString("en-IN")} styles</span>
                </div>
                <div className="flex items-center justify-between gap-1 p-2 sm:px-4 sm:py-3.5">
                  <span className="min-w-0">
                    <span className="block truncate font-serif text-[10px] font-bold text-blue-950 sm:text-base">{collection.name}</span>
                    <span className="mt-0.5 block text-[9px] text-slate-500 sm:mt-1 sm:text-xs">{collection.count} Items</span>
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white"><Icon name="arrow" className="size-4" /></span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="col-span-2 mt-8 min-w-0 border-t border-slate-200 pt-6 sm:mt-12 sm:pt-8" aria-label={`${activeGroup} products`}>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-blue-950 sm:text-2xl">Shop {activeGroup === "View All" ? "our collections" : activeGroup}</h2>
              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">Every product opens its full detail page.</p>
            </div>
            <Link href="/search" className="shrink-0 text-xs font-bold text-blue-600 hover:text-blue-800">View all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      </div>

      <div className="mx-auto mt-8 hidden max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-center sm:flex-row sm:text-left">
          <div><p className="text-sm font-bold text-blue-950">Need help finding your style?</p><p className="mt-0.5 text-xs text-slate-600">Our team is happy to help you choose.</p></div>
          <Link href="/contact" className="mt-1 inline-flex h-9 items-center justify-center rounded-lg bg-blue-700 px-4 text-xs font-bold text-white transition hover:bg-blue-800 sm:mt-0">Talk to our stylist</Link>
        </div>
      </div>
    </div>
  );
}
