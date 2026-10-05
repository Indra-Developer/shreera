"use client";

import Link from "next/link";
import { Icon } from "./icon";
import { useStore } from "./store-provider";

const items = [
  { name: "Home", href: "/", icon: "home" as const },
  { name: "Categories", href: "/categories", icon: "grid" as const },
  { name: "Wishlist", href: "/wishlist", icon: "heart" as const },
  { name: "Cart", href: "/cart", icon: "bag" as const },
  { name: "Profile", href: "/profile", icon: "user" as const },
];

export function MobileNav({ activeItem = "Home" }: { activeItem?: string }) {
  const { cartCount, wishlistCount } = useStore();
  const counts = { Wishlist: wishlistCount, Cart: cartCount };
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-5 border-t border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl md:hidden">
      {items.map((item) => (
        <Link key={item.name} href={item.href} aria-current={item.name === activeItem ? "page" : undefined} className={`relative flex flex-col items-center justify-center gap-1 text-[9px] font-semibold ${item.name === activeItem ? "text-blue-600" : "text-slate-500"}`}>
          <Icon name={item.icon} className="size-5" />
          {item.name}
          {counts[item.name as keyof typeof counts] ? <span className="absolute left-[54%] top-1.5 min-w-4 rounded-full bg-blue-600 px-1 text-[8px] leading-4 text-white ring-2 ring-white">{counts[item.name as keyof typeof counts]}</span> : null}
        </Link>
      ))}
    </nav>
  );
}
