"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Brand } from "./brand";
import { Icon } from "./icon";
import { useStore } from "./store-provider";

const menuItems = [
  { label: "Home", href: "/", icon: "home" as const },
  { label: "Sarees", href: "/categories", icon: "grid" as const },
  { label: "Collections", href: "/collections", icon: "sparkle" as const },
  { label: "Our Story", href: "/about", icon: "leaf" as const },
  { label: "Contact", href: "/contact", icon: "headset" as const },
];

const accountItems = [
  { label: "Search", href: "/search", icon: "search" as const, countKey: null },
  { label: "Wishlist", href: "/wishlist", icon: "heart" as const, countKey: "wishlistCount" as const },
  { label: "Shopping bag", href: "/cart", icon: "bag" as const, countKey: "cartCount" as const },
  { label: "Profile", href: "/profile", icon: "user" as const, countKey: null },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlistCount } = useStore();

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const drawer = open ? (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={closeMenu}
        className="fixed inset-0 top-[95px] z-[60] bg-blue-950/30 backdrop-blur-[2px] md:hidden"
      />
      <aside
        id="mobile-menu-panel"
        aria-label="Mobile menu"
        className="fixed inset-x-3 bottom-[76px] top-[100px] z-[70] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-950/20 md:hidden"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <Brand />
          <button type="button" onClick={closeMenu} aria-label="Close menu" className="grid size-9 place-items-center rounded-full bg-blue-50 text-blue-700">
            <Icon name="close-circle" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile primary navigation" className="mt-3">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Explore</p>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={closeMenu} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-blue-950 transition hover:bg-blue-50 hover:text-blue-600">
                <Icon name={item.icon} className="size-5 text-blue-600" />
                {item.label}
                <Icon name="arrow" className="ml-auto size-4 text-slate-300" />
              </Link>
            ))}
          </div>
        </nav>

        <div className="my-3 border-t border-slate-100" />
        <nav aria-label="Mobile account navigation">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Your account</p>
          <div className="space-y-1">
            {accountItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={closeMenu} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-blue-950 transition hover:bg-blue-50 hover:text-blue-600">
                <span className="relative">
                  <Icon name={item.icon} className="size-5 text-blue-600" />
                  {item.countKey && (item.countKey === "cartCount" ? cartCount : wishlistCount) ? <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-blue-600 px-1 text-center text-[8px] leading-4 text-white">{item.countKey === "cartCount" ? cartCount : wishlistCount}</span> : null}
                </span>
                {item.label}
                <Icon name="arrow" className="ml-auto size-4 text-slate-300" />
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  ) : null;

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((current) => !current)}
        className="grid size-10 place-items-center rounded-full text-blue-950 transition hover:bg-blue-50 hover:text-blue-600 md:hidden"
      >
        <Icon name={open ? "close-circle" : "menu"} />
      </button>

      {typeof document !== "undefined" && drawer ? createPortal(drawer, document.body) : null}
    </>
  );
}
