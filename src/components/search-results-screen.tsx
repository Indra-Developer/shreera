"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Icon } from "@/components/icon";
import { MobileNav } from "@/components/mobile-nav";
import { products } from "@/data/catalog";

const filters = ["All products", "Sarees", "Soft Silk", "Banarasi", "Festive"] as const;
const sortOptions = ["Recommended", "Price: Low to High", "Top Rated"] as const;
type Filter = (typeof filters)[number];
type Sort = (typeof sortOptions)[number];

function matchesFilter(name: string, filter: Filter) {
  const normalized = name.toLowerCase();
  if (filter === "All products" || filter === "Sarees") return true;
  if (filter === "Soft Silk") return normalized.includes("soft silk");
  if (filter === "Banarasi") return normalized.includes("banarasi");
  return normalized.includes("kanjivaram") || normalized.includes("banarasi");
}

export function SearchResultsScreen({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [input, setInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>("All products");
  const [sort, setSort] = useState<Sort>("Recommended");

  const visibleProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !search || product.name.toLowerCase().includes(search) || (search === "sale" && product.discount);
      return matchesQuery && matchesFilter(product.name, filter);
    });
    if (sort === "Price: Low to High") return [...filtered].sort((a, b) => Number(a.price.replace(/[^0-9]/g, "")) - Number(b.price.replace(/[^0-9]/g, "")));
    if (sort === "Top Rated") return [...filtered].sort((a, b) => b.reviews - a.reviews);
    return filtered;
  }, [filter, query, sort]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = input.trim();
    setQuery(nextQuery);
    router.push(nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search");
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Find your next favourite</p>
            <h1 className="mt-1 font-serif text-3xl font-bold text-blue-950 sm:text-4xl">Search Results</h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">{query ? <>Showing styles for <b className="text-blue-950">“{query}”</b></> : "Explore every Shreera style in one place."}</p>
          </div>
          <form onSubmit={submitSearch} className="flex w-full max-w-xl items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm sm:w-auto">
            <Icon name="search" className="ml-2 size-4 shrink-0 text-slate-400" />
            <input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Search products" placeholder="Search sarees, kurtis, jewellery..." className="h-9 min-w-0 flex-1 bg-transparent px-1 text-xs text-blue-950 outline-none placeholder:text-slate-400 sm:w-72" />
            <button type="submit" className="h-9 rounded-lg bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700">Search</button>
          </form>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${filter === item ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"}`}>{item}</button>)}
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between"><h2 className="font-serif text-lg font-bold text-blue-950">Refine</h2><Icon name="sort" className="size-4 text-slate-400" /></div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Browse by mood</p>
              <div className="mt-2 space-y-1">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs ${filter === item ? "bg-blue-50 font-bold text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>{item}<span className="text-[10px] text-slate-400">{item === "All products" ? products.length : products.filter((product) => matchesFilter(product.name, item)).length}</span></button>)}</div>
              <Link href="/categories" className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-xs font-bold text-blue-600">Browse categories <Icon name="arrow" className="size-3" /></Link>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3"><p className="text-xs text-slate-500"><b className="text-blue-950">{visibleProducts.length}</b> styles found</p><div className="flex items-center gap-2"><span className="hidden text-xs text-slate-500 sm:inline">Sort by</span>{sortOptions.map((option) => <button key={option} type="button" onClick={() => setSort(option)} className={`hidden rounded-full px-3 py-1.5 text-[10px] font-semibold sm:inline-flex ${sort === option ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-white"}`}>{option}</button>)}<select aria-label="Sort results" value={sort} onChange={(event) => setSort(event.target.value as Sort)} className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-blue-950 outline-none sm:hidden">{sortOptions.map((option) => <option key={option}>{option}</option>)}</select></div></div>
            {visibleProducts.length > 0 ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><h2 className="font-serif text-xl font-bold text-blue-950">No styles found yet</h2><p className="mt-2 text-xs text-slate-500">Try another search, or browse our curated categories.</p><Link href="/categories" className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-5 text-xs font-bold text-white">Browse Categories <Icon name="arrow" className="size-4" /></Link></div>}
          </section>
        </div>
      </main>
      <MobileNav activeItem="" />
    </div>
  );
}
