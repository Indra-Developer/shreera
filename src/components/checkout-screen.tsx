"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { useStore } from "@/components/store-provider";

type Delivery = "standard" | "express";
type Payment = "cod" | "upi" | "card";

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const amount = (price: string) => Number(price.replace(/[^0-9]/g, ""));

export function CheckoutScreen() {
  const { cartItems, clearCart } = useStore();
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [payment, setPayment] = useState<Payment>("cod");
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);

  const subtotal = useMemo(() => cartItems.reduce((sum, line) => sum + amount(line.price) * line.quantity, 0), [cartItems]);
  const discount = useMemo(() => cartItems.reduce((sum, line) => sum + Math.max(0, amount(line.originalPrice) - amount(line.price)) * line.quantity, 0), [cartItems]);
  const promoDiscount = promoApplied ? Math.round((subtotal - discount) * 0.05) : 0;
  const shipping = delivery === "express" ? 199 : subtotal >= 999 ? 0 : 99;
  const total = Math.max(0, subtotal - discount - promoDiscount + shipping);

  const applyPromo = () => {
    if (["SHREERA10", "SAVE5"].includes(promoInput.trim().toUpperCase())) {
      setPromoApplied(true);
      setPromoMessage("Promo code applied — you saved 5%.");
    } else {
      setPromoApplied(false);
      setPromoMessage("Enter SHREERA10 or SAVE5 to apply a promo.");
    }
  };

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrder({ id: `#SHR${Math.floor(10000 + Math.random() * 89999)}`, total });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (order) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-105px)] max-w-2xl items-center justify-center px-4 py-10 sm:px-6">
        <section className="w-full rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-xl shadow-emerald-950/5 sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Icon name="check-circle" className="size-9" /></span>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">Order confirmed</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-blue-950 sm:text-4xl">Thank you for shopping with Shreera</h1>
          <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-slate-500 sm:text-sm">Your order has been placed successfully. We’ll send delivery updates to your phone and email.</p>
          <div className="mx-auto mt-6 max-w-sm rounded-xl bg-blue-50 px-4 py-4 text-left text-xs text-blue-950"><div className="flex justify-between"><span>Order ID</span><b>{order.id}</b></div><div className="mt-2 flex justify-between"><span>Total paid</span><b>{money(order.total)}</b></div><div className="mt-2 flex justify-between"><span>Expected delivery</span><b>3–5 business days</b></div></div>
          <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row"><Link href="/orders" className="inline-flex h-11 items-center justify-center rounded-lg border border-blue-600 px-5 text-xs font-bold text-blue-700">View My Orders</Link><Link href="/categories" className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-xs font-bold text-white">Continue Shopping</Link></div>
        </section>
      </main>
    );
  }

  if (!cartItems.length) {
    return <main className="mx-auto flex min-h-[calc(100vh-105px)] max-w-2xl items-center justify-center px-4 py-10"><section className="w-full rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><Icon name="bag" className="mx-auto size-10 text-blue-300" /><h1 className="mt-3 font-serif text-2xl font-bold text-blue-950">Your cart is empty</h1><p className="mt-2 text-xs text-slate-500">Add a style to your cart before starting checkout.</p><Link href="/categories" className="mt-5 inline-flex h-10 items-center rounded-lg bg-blue-600 px-5 text-xs font-bold text-white">Explore Categories</Link></section></main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-14 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
      <div className="mb-6"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Secure checkout</p><h1 className="mt-1 font-serif text-3xl font-bold text-blue-950 sm:text-4xl">Delivery &amp; Payment</h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Complete your details and choose how you’d like to receive your order.</p></div>
      <form onSubmit={submitOrder} className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(310px,0.7fr)] lg:items-start lg:gap-8">
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><div className="flex items-center justify-between"><h2 className="font-serif text-xl font-bold text-blue-950">Delivery address</h2><span className="text-[10px] font-semibold text-emerald-600">Required</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><input required name="fullName" placeholder="Full name" autoComplete="name" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /><input required name="phone" placeholder="Mobile number" inputMode="tel" autoComplete="tel" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /><textarea required name="address" placeholder="House no., street, area" autoComplete="street-address" className="min-h-20 resize-y rounded-lg border border-slate-200 px-3 py-3 text-xs outline-none focus:border-blue-500 sm:col-span-2" /><input required name="city" placeholder="City" autoComplete="address-level2" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /><input required name="state" placeholder="State" autoComplete="address-level1" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /><input required name="pincode" placeholder="PIN code" inputMode="numeric" autoComplete="postal-code" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /></div></section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><h2 className="font-serif text-xl font-bold text-blue-950">Delivery method</h2><div className="mt-4 grid gap-3 sm:grid-cols-2"><label className={`cursor-pointer rounded-xl border p-3 transition ${delivery === "standard" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><input type="radio" name="delivery" value="standard" checked={delivery === "standard"} onChange={() => setDelivery("standard")} className="sr-only" /><span className="flex items-start justify-between gap-3"><span><b className="block text-xs text-blue-950">Standard delivery</b><small className="mt-1 block text-[10px] text-slate-500">3–5 business days</small></span><b className="text-xs text-blue-700">{subtotal >= 999 ? "FREE" : "₹99"}</b></span></label><label className={`cursor-pointer rounded-xl border p-3 transition ${delivery === "express" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><input type="radio" name="delivery" value="express" checked={delivery === "express"} onChange={() => setDelivery("express")} className="sr-only" /><span className="flex items-start justify-between gap-3"><span><b className="block text-xs text-blue-950">Express delivery</b><small className="mt-1 block text-[10px] text-slate-500">1–2 business days</small></span><b className="text-xs text-blue-700">₹199</b></span></label></div></section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><h2 className="font-serif text-xl font-bold text-blue-950">Payment method</h2><div className="mt-4 space-y-2"><label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${payment === "cod" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} /><span className="flex-1"><b className="block text-xs text-blue-950">Cash on delivery</b><small className="text-[10px] text-slate-500">Pay when your order arrives</small></span><Icon name="bag" className="size-5 text-blue-600" /></label><label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${payment === "upi" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><input type="radio" name="payment" value="upi" checked={payment === "upi"} onChange={() => setPayment("upi")} /><span className="flex-1"><b className="block text-xs text-blue-950">UPI</b><small className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm</small></span><Icon name="shield" className="size-5 text-blue-600" /></label>{payment === "upi" ? <input required name="upiId" placeholder="Enter UPI ID" className="h-11 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /> : null}<label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${payment === "card" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><input type="radio" name="payment" value="card" checked={payment === "card"} onChange={() => setPayment("card")} /><span className="flex-1"><b className="block text-xs text-blue-950">Credit or debit card</b><small className="text-[10px] text-slate-500">Secure encrypted payment</small></span><Icon name="shield" className="size-5 text-blue-600" /></label>{payment === "card" ? <div className="grid gap-2 sm:grid-cols-2"><input required name="cardNumber" inputMode="numeric" placeholder="Card number" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500 sm:col-span-2" /><input required name="expiry" placeholder="MM/YY" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /><input required name="cvv" inputMode="numeric" placeholder="CVV" className="h-11 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-500" /></div> : null}</div></section>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.04)] lg:sticky lg:top-28 sm:p-5"><h2 className="font-serif text-xl font-bold text-blue-950">Order summary</h2><div className="mt-4 space-y-3">{cartItems.map((line) => <div key={line.lineId} className="flex items-center gap-3"><div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-stone-100"><Image src={line.image} alt={line.name} fill sizes="56px" className="object-cover object-top" /><span className="absolute bottom-0 right-0 rounded-tl bg-blue-950 px-1 text-[9px] font-bold text-white">{line.quantity}</span></div><span className="min-w-0 flex-1 truncate text-xs font-semibold text-blue-950">{line.name}</span><b className="text-xs text-blue-950">{money(amount(line.price) * line.quantity)}</b></div>)}</div><div className="mt-5 flex gap-2"><input aria-label="Checkout promo code" value={promoInput} onChange={(event) => setPromoInput(event.target.value)} placeholder="Promo code" className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-xs uppercase outline-none focus:border-blue-500" /><button type="button" onClick={applyPromo} className="rounded-lg bg-blue-50 px-3 text-xs font-bold text-blue-700">Apply</button></div>{promoMessage ? <p role="status" className={`mt-2 text-[10px] ${promoApplied ? "text-emerald-600" : "text-rose-600"}`}>{promoMessage}</p> : null}<div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600"><div className="flex justify-between"><span>Subtotal</span><b>{money(subtotal)}</b></div><div className="flex justify-between"><span>Product discount</span><b className="text-emerald-600">-{money(discount)}</b></div>{promoApplied ? <div className="flex justify-between"><span>Promo discount</span><b className="text-emerald-600">-{money(promoDiscount)}</b></div> : null}<div className="flex justify-between"><span>Delivery</span><b>{shipping ? money(shipping) : "FREE"}</b></div><div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-bold text-blue-950"><span>Total</span><span>{money(total)}</span></div></div><button type="submit" className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">Place Order <Icon name="check-circle" className="size-4" /></button><p className="mt-2 text-center text-[10px] text-emerald-600">Secure checkout · Your details are protected</p></aside>
      </form>
    </main>
  );
}
