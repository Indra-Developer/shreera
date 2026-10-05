"use client";

import Link from "next/link";
import { Icon } from "./icon";
import { useStore } from "./store-provider";

export function StoreActions() {
  const { cartCount, wishlistCount } = useStore();

  return (
    <>
      <Link href="/search" aria-label="Search" className="grid size-10 place-items-center rounded-full text-blue-950 transition hover:bg-blue-50 hover:text-blue-600"><Icon name="search" /></Link>
      <Link href="/wishlist" aria-label="Wishlist" className="relative grid size-10 place-items-center rounded-full text-blue-950 transition hover:bg-blue-50 hover:text-blue-600">
        <Icon name="heart" />
        {wishlistCount ? <span className="absolute right-0 top-0 min-w-4 rounded-full bg-blue-600 px-1 text-center text-[9px] font-bold leading-4 text-white ring-2 ring-white">{wishlistCount}</span> : null}
      </Link>
      <Link href="/cart" aria-label="Shopping bag" className="relative grid size-10 place-items-center rounded-full text-blue-950 transition hover:bg-blue-50 hover:text-blue-600">
        <Icon name="bag" />
        {cartCount ? <span className="absolute right-0 top-0 min-w-4 rounded-full bg-blue-600 px-1 text-center text-[9px] font-bold leading-4 text-white ring-2 ring-white">{cartCount}</span> : null}
      </Link>
    </>
  );
}
