"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { useStore, type CartItem } from "@/components/store-provider";

type CartLine = CartItem;

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const amount = (price: string) => Number(price.replace(/[^0-9]/g, ""));
const discountFor = (line: CartLine) => ({
  "royal-blue-soft-silk": 399,
  "lavender-banarasi": 549,
  "peach-kanjivaram": 550,
}[line.id] ?? Math.round(amount(line.price) * 0.17)) * line.quantity;

function QuantityControl({ quantity, onChange }: { quantity: number; onChange: (quantity: number) => void }) {
  return (
    <div className="inline-flex h-8 overflow-hidden rounded-md border border-slate-200 bg-white text-xs text-blue-950">
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(1, quantity - 1))} className="grid w-8 place-items-center text-slate-500 transition hover:bg-blue-50">−</button>
      <span className="grid w-8 place-items-center border-x border-slate-200 font-semibold">{quantity}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(quantity + 1)} className="grid w-8 place-items-center text-slate-500 transition hover:bg-blue-50">+</button>
    </div>
  );
}

function ShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, 999 - subtotal);
  const progress = Math.min(100, Math.round((subtotal / 999) * 100));
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/80 px-3 py-3 sm:px-4">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-blue-600 shadow-sm"><Icon name="truck" className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 text-[10px] text-blue-950 sm:text-xs"><b>{remaining ? `You are ₹${remaining.toLocaleString("en-IN")} away from FREE SHIPPING!` : "You have FREE SHIPPING!"}</b><span className="hidden sm:inline">Free Shipping on orders above ₹999</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-blue-100"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
    </div>
  );
}

function CartLineCard({ line, onChange, onRemove }: { line: CartLine; onChange: (quantity: number) => void; onRemove: () => void }) {
  const lineTotal = amount(line.price) * line.quantity;
  return (
    <article className="relative flex min-h-[138px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_5px_18px_rgba(15,23,42,0.04)] sm:min-h-[138px]">
      <div className="relative w-[112px] shrink-0 bg-stone-100 sm:w-[120px]">
        <Image src={line.image} alt={line.name} fill sizes="120px" className="object-cover object-top" />
        <span className="absolute left-2 top-2 rounded bg-blue-950 px-1.5 py-0.5 text-[8px] font-bold text-white">NEW</span>
      </div>
      <div className="min-w-0 flex-1 p-3 pr-10 sm:p-4 sm:pr-12">
        <h2 className="truncate font-serif text-sm font-bold text-blue-950 sm:text-base">{line.name}</h2>
        <div className="mt-1.5 flex items-center gap-2"><b className="text-sm text-blue-950 sm:text-base">{line.price}</b><span className="text-[10px] text-slate-400 line-through">{line.originalPrice}</span><span className="text-[9px] font-semibold text-rose-500">{line.discount}</span></div>
        <p className="mt-1 text-[10px] text-slate-600 sm:text-xs">Color: {line.color} <span className="px-1.5">•</span> <span className="font-semibold text-emerald-600">In Stock</span></p>
        <div className="mt-3 flex items-end justify-between gap-2"><QuantityControl quantity={line.quantity} onChange={onChange} /><b className="text-sm text-blue-950 sm:text-base">{money(lineTotal)}</b></div>
      </div>
      <button type="button" aria-label={`Remove ${line.name}`} onClick={onRemove} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:text-rose-500"><Icon name="trash" className="size-4" /></button>
    </article>
  );
}

function PriceDetails({ lines, promoApplied, onCheckout }: { lines: CartLine[]; promoApplied: boolean; onCheckout: () => void }) {
  const subtotal = lines.reduce((sum, line) => sum + amount(line.price) * line.quantity, 0);
  const discount = lines.reduce((sum, line) => sum + discountFor(line), 0);
  const promoDiscount = promoApplied ? Math.round((subtotal - discount) * 0.05) : 0;
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discount - promoDiscount + shipping;
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.04)] sm:p-5 lg:sticky lg:top-28">
      <h2 className="font-serif text-xl font-bold text-blue-950 sm:text-2xl">Price Details</h2>
      <div className="mt-4 space-y-3 text-xs text-slate-700 sm:text-sm"><div className="flex justify-between"><span>Subtotal ({lines.reduce((sum, line) => sum + line.quantity, 0)} items)</span><b>{money(subtotal)}</b></div><div className="flex justify-between"><span className="text-emerald-600">Discount</span><b className="text-emerald-600">-{money(discount)}</b></div>{promoApplied ? <div className="flex justify-between"><span className="text-emerald-600">Promo discount</span><b className="text-emerald-600">-{money(promoDiscount)}</b></div> : null}<div className="flex justify-between"><span>Shipping Charges <span className="text-slate-400">ⓘ</span></span><b>{shipping === 0 ? "FREE" : money(shipping)}</b></div></div>
      <div className="my-4 border-t border-slate-200 pt-4"><div className="flex items-center justify-between text-sm font-bold text-blue-950 sm:text-base"><span>Total Amount</span><span>{money(total)}</span></div><p className="mt-1 text-[10px] text-slate-500">(Inclusive of all taxes)</p></div>
      <div className="rounded-lg bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700"><span>Total savings</span><b className="float-right">{money(discount + promoDiscount)}</b></div>
      <button type="button" disabled={!lines.length} onClick={onCheckout} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">Proceed to Checkout <Icon name="arrow" className="size-4" /></button>
      <p className="mt-2 text-center text-[10px] text-emerald-600">♙ Secure Checkout</p>
    </aside>
  );
}

export function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useStore();
  const lines = cartItems;
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [message, setMessage] = useState("");
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + amount(line.price) * line.quantity, 0);
  const checkout = () => { if (lines.length) router.push("/checkout"); else setMessage("Your cart is empty."); };
  const applyPromo = () => {
    if (["SHREERA10", "SAVE5"].includes(promoCode.trim().toUpperCase())) {
      setPromoApplied(true);
      setMessage("Promo code applied successfully.");
    } else {
      setPromoApplied(false);
      setMessage("Try SHREERA10 or SAVE5 for a valid promo code.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="mb-5">
          <h1 className="font-serif text-3xl font-bold text-blue-950 sm:text-4xl">My Cart ({itemCount})</h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">Review your items and proceed to checkout</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.8fr)] lg:items-start lg:gap-8">
          <div>
            <ShippingProgress subtotal={subtotal} />
            <div className="mt-4 space-y-3">
              {lines.length ? lines.map((line) => (
                <CartLineCard key={line.lineId} line={line} onChange={(quantity) => updateQuantity(line.lineId, quantity)} onRemove={() => removeFromCart(line.lineId)} />
              )) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <p className="font-serif text-xl font-bold text-blue-950">Your cart is empty</p>
                  <Link href="/categories" className="mt-4 inline-flex h-10 items-center rounded-lg bg-blue-600 px-5 text-xs font-bold text-white">Continue Shopping</Link>
                </div>
              )}
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-blue-200 bg-white px-4 py-3">
              <button type="button" onClick={() => setPromoOpen((open) => !open)} className="flex w-full items-center gap-3 text-left">
                <span className="grid size-9 place-items-center rounded-full bg-blue-50 text-blue-600"><Icon name="sparkle" className="size-5" /></span>
                <span className="flex-1"><b className="block text-xs text-blue-950">Have a Promo Code?</b><small className="text-[10px] text-slate-500">Apply code to get instant discount</small></span>
                <span className="text-xs font-bold text-blue-600">{promoOpen ? "Hide" : "Apply Code"} <span className="ml-1 text-base">›</span></span>
              </button>
              {promoOpen && (
                <div className="mt-3 flex gap-2">
                  <input aria-label="Promo code" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Enter promo code" className="h-9 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-xs uppercase outline-none focus:border-blue-500" />
                  <button type="button" onClick={applyPromo} className="rounded-lg bg-blue-50 px-3 text-xs font-bold text-blue-700">Apply</button>
                </div>
              )}
            </div>
          </div>
          <PriceDetails lines={lines} promoApplied={promoApplied} onCheckout={checkout} />
        </div>
        {message && <p role="status" className="mt-4 text-center text-xs font-semibold text-blue-700">{message}</p>}
      </div>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
    </div>
  );
}
