import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { MobileNav } from "@/components/mobile-nav";

const promises = [
  { icon: "diamond" as const, title: "Premium Quality", note: "Finest fabrics with exquisite craftsmanship" },
  { icon: "heart" as const, title: "Handpicked", note: "Carefully selected designs for you" },
  { icon: "shield" as const, title: "Trusted Shopping", note: "Secure payments and easy returns" },
  { icon: "truck" as const, title: "Fast Delivery", note: "Quick and reliable delivery to your door" },
];

const values = [
  { icon: "users" as const, title: "Customer First", note: "Your happiness is our top priority. We’re here to make your shopping experience delightful." },
  { icon: "award" as const, title: "Quality You Can Trust", note: "We never compromise on quality. Every saree is a promise of elegance and durability." },
  { icon: "leaf" as const, title: "Tradition with a Touch of Modernity", note: "We blend timeless Indian traditions with contemporary styles to celebrate you." },
];

export function AboutScreen() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <section className="relative h-36 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 via-blue-50 to-white sm:h-56 sm:rounded-3xl"><div className="relative z-10 px-5 py-7 sm:px-9 sm:py-10"><h1 className="font-serif text-3xl font-bold text-blue-950 sm:text-5xl">About Us</h1><p className="mt-2 text-xs text-slate-600 sm:text-sm">Crafted for the woman you are.</p></div><div className="absolute inset-y-0 right-0 w-2/5 sm:w-1/3"><Image src="/images/royal-blue-saree.png" alt="Shreera woman wearing a blue saree" fill sizes="33vw" className="object-cover object-top" /></div><div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50/75 to-transparent" /></section>

        <section className="mt-8 sm:mt-10"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Our story</p><h2 className="mt-2 font-serif text-2xl font-bold text-blue-950 sm:text-3xl">A love for every beautiful detail</h2><div className="mt-4 max-w-5xl space-y-3 text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7"><p>Shreera was born from a passion for tradition, elegance, and the modern woman. We believe that every saree tells a story — of heritage, craftsmanship, and the beauty within you.</p><p>From handpicked fabrics to intricate designs, we bring you a collection that celebrates grace in every weave.</p></div></section>

        <section className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:mt-8 sm:grid-cols-4">{promises.map((item, index) => <div key={item.title} className={`flex min-h-28 flex-col items-center justify-center px-3 py-4 text-center ${index < promises.length - 1 ? "border-b border-slate-200 sm:border-b-0 sm:border-r" : "border-b-0"}`}><Icon name={item.icon} className="size-7 text-blue-600" /><b className="mt-2 text-[10px] text-blue-950 sm:text-xs">{item.title}</b><span className="mt-1 max-w-[140px] text-[9px] leading-4 text-slate-500 sm:text-[10px]">{item.note}</span></div>)}</section>

        <section className="mt-9 sm:mt-12"><h2 className="font-serif text-2xl font-bold text-blue-950 sm:text-3xl">Our Values</h2><div className="mt-4 space-y-2">{values.map((item) => <Link key={item.title} href="/collections" className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/40 sm:px-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600"><Icon name={item.icon} className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950 sm:text-sm">{item.title}</b><small className="mt-0.5 block max-w-4xl text-[10px] leading-4 text-slate-500 sm:text-xs">{item.note}</small></span><Icon name="arrow" className="size-4 shrink-0 text-blue-700" /></Link>)}</div></section>

        <section className="mt-8 grid grid-cols-2 rounded-2xl bg-blue-50/80 px-3 py-4 text-center sm:mt-10 sm:grid-cols-4 sm:px-5">{[["50K+", "Happy Customers"], ["10K+", "Unique Designs"], ["4.8", "Average Rating"], ["5+", "Years of Trust"]].map(([value, label]) => <div key={label} className="border-slate-200 px-2 py-2 sm:border-r last:border-r-0"><b className="block text-xl text-blue-800 sm:text-2xl">{value}</b><span className="text-[9px] text-slate-600 sm:text-xs">{label}</span></div>)}</section>

        <section className="relative mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white px-5 py-6 sm:mt-10 sm:px-9 sm:py-8"><div className="relative z-10 max-w-md"><h2 className="font-serif text-2xl font-bold text-blue-950 sm:text-3xl">Thank you for being part of our journey.</h2><p className="mt-2 text-xs text-slate-600">With love, <span className="font-serif text-lg font-bold text-blue-800">Shreera</span></p><Link href="/collections" className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-xs font-bold text-white">Explore Collections <Icon name="arrow" className="size-4" /></Link></div><div className="absolute inset-y-0 right-0 w-2/5 opacity-75 sm:w-1/3"><Image src="/images/royal-blue-saree.png" alt="Royal blue saree detail" fill sizes="33vw" className="object-cover object-bottom" /></div></section>
      </main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
      <MobileNav activeItem="Profile" />
    </div>
  );
}
