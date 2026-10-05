import Image from "next/image";
import Link from "next/link";
import { Brand } from "./brand";
import { Icon } from "./icon";
import { MobileMenu } from "./mobile-menu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sarees", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function SearchAction() {
  return <Link href="/search" aria-label="Search" className="grid size-10 place-items-center rounded-full text-blue-950 transition hover:bg-blue-50 hover:text-blue-600"><Icon name="search" /></Link>;
}

function BagAction() {
  return (
    <Link href="/cart" aria-label="Shopping bag" className="relative grid size-10 place-items-center rounded-full text-blue-950 transition hover:bg-blue-50 hover:text-blue-600">
      <Icon name="bag" />
      <span className="absolute right-0 top-0 min-w-4 rounded-full bg-blue-600 px-1 text-center text-[9px] font-bold leading-4 text-white ring-2 ring-white">3</span>
    </Link>
  );
}

function WishlistAction() {
  return (
    <Link href="/wishlist" aria-label="Wishlist" className="relative grid size-10 place-items-center rounded-full text-blue-950 transition hover:bg-blue-50 hover:text-blue-600">
      <Icon name="heart" />
      <span className="absolute right-0 top-0 min-w-4 rounded-full bg-blue-600 px-1 text-center text-[9px] font-bold leading-4 text-white ring-2 ring-white">5</span>
    </Link>
  );
}

export function SiteHeader({ activePage = "home", mobileBack = false, mobileBackHref = "/", mobileMode = "menu" }: { activePage?: "home" | "categories" | "collections" | "about" | "contact" | "none"; mobileBack?: boolean; mobileBackHref?: string; mobileMode?: "menu" | "back" | "none" }) {
  return (
    <>
      <div className="flex h-7 items-center justify-center bg-blue-50 px-2 text-center text-[9px] font-medium text-slate-600 sm:px-4 sm:text-xs">
        <Icon name="truck" className="mr-1.5 size-4 text-blue-600" />
        <b className="mr-1 text-blue-950">FREE SHIPPING</b> on orders above ₹999
        <span>&nbsp; | &nbsp; Use code: <b>SHREERA10</b></span>
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-4 sm:h-[78px] sm:px-6 lg:px-8">
          {mobileMode === "none" ? (
            <span className="size-10 md:hidden" />
          ) : mobileBack ? (
            <Link href={mobileBackHref} aria-label="Go back" className="grid size-10 place-items-center rounded-full text-blue-950 md:hidden"><Icon name="arrow-left" /></Link>
          ) : (
            <MobileMenu />
          )}
          <Brand />
          <nav aria-label="Primary navigation" className="mx-auto hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = activePage === "home" ? item.label === "Home" : activePage === "categories" ? item.label === "Sarees" : activePage === "collections" ? item.label === "Collections" : activePage === "about" ? item.label === "Our Story" : activePage === "contact" && item.label === "Contact";
              return (
              <Link key={item.label} href={item.href} aria-current={isActive ? "page" : undefined} className={`relative py-7 text-sm font-semibold transition hover:text-blue-600 ${isActive ? "text-blue-600 after:absolute after:inset-x-0 after:bottom-4 after:h-0.5 after:bg-blue-600" : "text-slate-700"}`}>
                {item.label}
              </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1.5">
            <SearchAction />
            <WishlistAction />
            <BagAction />
            <div className="ml-2 hidden items-center gap-2 border-l border-slate-200 pl-4 lg:flex">
              <Link href="/profile" className="flex items-center gap-2"><Image src="/images/royal-blue-saree.png" alt="Anjali" width={36} height={36} className="size-9 rounded-full object-cover object-top" /><span className="text-xs font-bold text-blue-950">Hi, Anjali</span></Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
