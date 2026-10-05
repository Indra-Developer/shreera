"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { MobileNav } from "@/components/mobile-nav";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/data/catalog";

const heroSlides = [
  {
    eyebrow: "New Collection",
    title: ["Crafted For", "The Woman", "You Are"],
    description: "Elegant. Timeless. You. Discover styles that celebrate your grace and individuality.",
    image: "/images/hero-blue.png",
    mobileImage: "/images/mobile-hero-blue.png",
    alt: "Woman wearing a cobalt blue and ivory floral saree",
    cta: "SHOP NOW",
    href: "#featured",
  },
  {
    eyebrow: "Silk Stories",
    title: ["Dress In", "Your Own", "Chapter"],
    description: "Rich Banarasi textures and soft colour stories made for celebrations big and small.",
    image: "/images/hero-rose.png",
    mobileImage: "/images/mobile-hero-rose.png",
    alt: "Woman wearing a rose pink and lavender Banarasi saree",
    cta: "EXPLORE SILKS",
    href: "/collections?focus=festive",
  },
  {
    eyebrow: "The New Classic",
    title: ["Make An", "Entrance", "In Silk"],
    description: "Meet graceful emerald drapes with a modern point of view and timeless craft.",
    image: "/images/hero-emerald.png",
    mobileImage: "/images/mobile-hero-emerald.png",
    alt: "Woman wearing an emerald green silk saree",
    cta: "SHOP NEW ARRIVALS",
    href: "/collections",
  },
] as const;

const homeCategories = [
  { name: "Sarees", image: "/images/royal-blue-saree.png" },
  { name: "Kurtis", image: "/images/kurti-category.png" },
  { name: "Lehengas", image: "/images/lehenga-category.png" },
  { name: "Jewellery", image: "/images/jewellery-category.png" },
  { name: "Bags", image: null },
];

const benefits = [
  { icon: "truck" as const, title: "Free Shipping", note: "On orders above ₹999" },
  { icon: "bag" as const, title: "Cash on Delivery", note: "Pay when you receive" },
  { icon: "returns" as const, title: "Easy Returns", note: "7-day easy returns" },
  { icon: "shield" as const, title: "Secure Payments", note: "100% protected checkout" },
  { icon: "sparkle" as const, title: "Premium Quality", note: "Finest quality assured" },
  { icon: "headset" as const, title: "24×7 Support", note: "We are here to help" },
];

function SectionHeading({ title, id, href = "/categories" }: { title: string; id?: string; href?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between sm:mb-6">
      <h2 id={id} className="font-serif text-2xl font-bold text-blue-950 sm:text-3xl">{title}</h2>
      <Link href={href} className="text-xs font-bold text-blue-600 transition hover:text-blue-800 sm:text-sm">View All</Link>
    </div>
  );
}

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlide = heroSlides[heroIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 1500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 text-slate-900 md:pb-0">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-7 lg:px-8">
          <div className="relative min-h-[258px] overflow-hidden rounded-2xl bg-blue-50 shadow-[0_20px_60px_-30px_rgba(13,70,150,0.45)] sm:min-h-[360px] lg:min-h-[400px]">
            {heroSlides.map((slide, index) => <Image key={`desktop-${slide.image}`} src={slide.image} alt={heroIndex === index ? slide.alt : ""} fill loading="eager" unoptimized sizes="(max-width: 768px) 100vw, 1200px" className={`pointer-events-none hidden object-cover brightness-[0.97] saturate-[1.15] contrast-[1.04] transition-opacity duration-500 sm:block sm:object-[50%_0%] ${heroIndex === index ? "opacity-100" : "opacity-0"}`} />)}
            {heroSlides.map((slide, index) => <Image key={`mobile-${slide.mobileImage}`} src={slide.mobileImage} alt={heroIndex === index ? slide.alt : ""} fill loading="eager" unoptimized sizes="100vw" className={`pointer-events-none object-cover object-[72%_top] brightness-[0.97] saturate-[1.15] contrast-[1.04] transition-opacity duration-500 sm:hidden ${heroIndex === index ? "opacity-100" : "opacity-0"}`} />)}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/48 to-transparent sm:from-white/95 sm:via-white/48 sm:to-transparent" />
            <div className="relative z-10 flex min-h-[258px] max-w-[83%] flex-col items-start justify-center px-4 py-6 sm:min-h-[360px] sm:max-w-[58%] sm:px-12 sm:py-10 lg:min-h-[400px] lg:px-16">
              <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.22em] text-blue-600 sm:text-xs">{heroSlide.eyebrow}</p>
              <h1 className="font-serif text-[29px] font-bold leading-[1.03] tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">{heroSlide.title.map((line) => <span key={line} className="block">{line}</span>)}</h1>
              <p className="mt-3 max-w-md text-[10px] leading-4 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">{heroSlide.description}</p>
              <Link href={heroSlide.href} className="mt-4 inline-flex h-8 items-center gap-2 rounded-md bg-blue-600 px-4 text-[10px] font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 sm:mt-7 sm:h-12 sm:px-7 sm:text-sm">{heroSlide.cta} <Icon name="arrow" className="size-3.5 sm:size-4" /></Link>
            </div>
            <div className="absolute bottom-3.5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-5" aria-label="Hero slides">
              {heroSlides.map((slide, index) => <button key={slide.image} type="button" aria-label={`Show slide ${index + 1}`} aria-pressed={heroIndex === index} onClick={() => setHeroIndex(index)} className={`h-1.5 rounded-full transition-all ${heroIndex === index ? "w-6 bg-blue-600" : "w-1.5 bg-blue-200"}`} />)}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-6 gap-1.5 pb-1 sm:mt-7 sm:gap-3">
            {homeCategories.map((category) => (
              <Link key={category.name} href="/categories" className="group flex min-w-0 flex-col items-center gap-2 text-center text-[10px] font-semibold text-slate-700 sm:text-sm">
                <span className="relative grid size-14 place-items-center overflow-hidden rounded-full border-2 border-white bg-[#f7f2ec] p-0.5 shadow-md transition group-hover:-translate-y-1 group-hover:shadow-lg sm:size-20 sm:p-1 md:size-24">
                  {category.image ? <Image src={category.image} alt={`${category.name} category`} fill sizes="96px" className="object-contain p-1" /> : <Icon name="bag" className="size-7 text-blue-700 sm:size-9" />}
                </span>
                {category.name}
              </Link>
            ))}
            <Link href="/collections?focus=sale" className="group flex min-w-0 flex-col items-center gap-2 text-center text-[10px] font-semibold text-slate-700 sm:text-sm">
              <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 font-serif text-[10px] font-bold leading-tight text-white shadow-md transition group-hover:-translate-y-1 sm:size-20 sm:text-sm md:size-24 md:text-base">SALE<br />50%</span>
              Sale
            </Link>
          </div>

          <div className="mt-3 grid grid-cols-6 overflow-hidden rounded-xl border border-slate-200 bg-white sm:mt-7">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className={`flex min-h-24 min-w-0 flex-col items-center justify-center border-slate-200 px-1 py-2 text-center sm:px-2 sm:py-3 ${index < 5 ? "border-r" : ""}`}>
                <Icon name={benefit.icon} className="size-5 text-blue-600 sm:size-6" />
                <b className="mt-1.5 text-[8px] uppercase leading-3 text-blue-950 sm:text-[11px]">{benefit.title}</b>
                <span className="mt-0.5 text-[7px] leading-3 text-slate-500 sm:text-[10px]">{benefit.note}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="featured" className="mx-auto mt-9 max-w-7xl px-4 sm:mt-14 sm:px-6 lg:px-8">
          <SectionHeading title="Featured Collections" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        <section className="mx-auto mt-9 max-w-7xl px-4 sm:mt-14 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-blue-700 to-sky-500 px-6 py-7 text-white shadow-xl shadow-blue-900/15 sm:px-10 sm:py-10">
            <div className="absolute inset-y-0 right-0 hidden w-2/5 sm:block">
              <Image src="/images/beige-saree.png" alt="Special beige Banarasi saree" fill sizes="40vw" className="object-cover object-top opacity-60 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-transparent" />
            </div>
            <div className="relative z-10 max-w-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100 sm:text-xs">Special Offer</p>
              <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Up to 50% off</h2>
              <p className="mt-2 text-xs text-blue-100 sm:text-sm">On selected festive collections. Refresh your wardrobe with timeless elegance.</p>
              <Link href="/collections?focus=sale" className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-white px-5 text-xs font-bold text-blue-700 transition hover:bg-blue-50">SHOP THE SALE <Icon name="arrow" className="size-4" /></Link>
            </div>
          </div>
        </section>

        <section id="collections" className="mx-auto mt-9 max-w-7xl px-4 sm:mt-14 sm:px-6 lg:px-8">
          <SectionHeading title="New Arrivals" href="/collections" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {[products[4], products[1], products[2], products[0]].map((product, index) => <ProductCard key={`${product.id}-${index}`} product={product} />)}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-center sm:grid-cols-4 sm:p-7">
            {["1000+ Designs\nFor Every Occasion", "Trusted by\n50K+ Customers", "7 Days\nEasy Returns", "Made For You\nWith Love"].map((item) => {
              const [top, bottom] = item.split("\n");
              return <div key={item} className="py-3"><Icon name="sparkle" className="mx-auto size-6 text-blue-600" /><b className="mt-2 block text-xs text-blue-950 sm:text-sm">{top}</b><span className="text-[10px] text-slate-500 sm:text-xs">{bottom}</span></div>;
            })}
          </div>
        </section>
      </main>

      <footer id="contact" className="mt-12 border-t border-slate-200 bg-slate-50 sm:mt-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <p>© 2026 Shreera. Crafted for the woman you are.</p>
          <p>Secure payments · Easy returns · Customer support</p>
        </div>
      </footer>
      <MobileNav />
    </div>
  );
}
