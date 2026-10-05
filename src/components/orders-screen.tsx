"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";

type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled";
type Order = { id: string; date: string; status: OrderStatus; amount: string; items: string; images: string[]; note: string; action: string };

const orders: Order[] = [
  { id: "#SHR12568", date: "05 May 2024, 11:30 AM", status: "Delivered", amount: "₹7,198", items: "3 Items", images: ["/images/royal-blue-saree.png", "/images/lavender-saree.png", "/images/peach-saree.png"], note: "Delivered successfully", action: "View Details" },
  { id: "#SHR12411", date: "28 Apr 2024, 09:15 PM", status: "Shipped", amount: "₹3,199", items: "1 Item", images: ["/images/lavender-saree.png"], note: "Your order is on the way", action: "Track Order" },
  { id: "#SHR12209", date: "20 Apr 2024, 02:45 PM", status: "Processing", amount: "₹5,598", items: "2 Items", images: ["/images/royal-blue-saree.png", "/images/peach-saree.png"], note: "We will notify you once shipped", action: "View Details" },
  { id: "#SHR12102", date: "15 Apr 2024, 07:20 PM", status: "Cancelled", amount: "₹2,899", items: "1 Item", images: ["/images/peach-saree.png"], note: "Order status updated", action: "View Details" },
  { id: "#SHR12011", date: "10 Apr 2024, 10:10 AM", status: "Delivered", amount: "₹3,599", items: "1 Item", images: ["/images/sea-green-saree.png"], note: "Delivered successfully", action: "View Details" },
];

const tabs = ["All Orders", "Processing", "Shipped", "Delivered", "Returns"] as const;
type OrderTab = (typeof tabs)[number];

const statusStyle: Record<OrderStatus, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700",
  Cancelled: "bg-slate-100 text-slate-600",
};

function statusIcon(status: OrderStatus) {
  if (status === "Delivered") return <Icon name="check-circle" className="size-4" />;
  if (status === "Shipped") return <Icon name="truck" className="size-4" />;
  if (status === "Processing") return <Icon name="box" className="size-4" />;
  return <Icon name="close-circle" className="size-4" />;
}

function OrderCard({ order, onAction }: { order: Order; onAction: (label: string) => void }) {
  return (
    <article className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-[0_5px_18px_rgba(15,23,42,0.04)] sm:p-4">
      <div className="flex items-start justify-between gap-3 text-[9px] text-slate-500 sm:text-[10px]"><span><b className="text-blue-950">Order ID: {order.id}</b><span className="ml-3">{order.date}</span></span><b className="shrink-0 text-base text-blue-950 sm:text-lg">{order.amount}</b></div>
      <div className="mt-2 flex items-center justify-between gap-2"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold ${statusStyle[order.status]}`}>{order.status}</span><span className="text-[10px] text-slate-500">{order.items}</span></div>
      <div className="mt-3 flex min-w-0 items-center gap-3 sm:mt-4">
        <div className="flex shrink-0 gap-1.5">{order.images.map((image, index) => <span key={`${image}-${index}`} className="relative block size-14 overflow-hidden rounded-md bg-stone-100 sm:size-16"><Image src={image} alt="" fill sizes="64px" className="object-cover object-top" /></span>)}{order.images.length > 2 ? null : null}</div>
        <div className="flex min-w-0 flex-1 items-center gap-2 text-xs text-slate-500"><span className={`hidden sm:grid ${order.status === "Cancelled" ? "text-rose-500" : order.status === "Processing" ? "text-blue-600" : "text-emerald-600"} size-7 place-items-center rounded-full bg-slate-50`}>{statusIcon(order.status)}</span><span className="truncate sm:text-sm">{order.note}</span></div>
        <button type="button" onClick={() => onAction(order.action)} className="shrink-0 rounded-lg border border-blue-600 px-3 py-2 text-[10px] font-bold text-blue-700 transition hover:bg-blue-50 sm:px-4 sm:text-xs">{order.action}</button>
      </div>
    </article>
  );
}

export function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<OrderTab>("All Orders");
  const [filterOpen, setFilterOpen] = useState(false);
  const [message, setMessage] = useState("");
  const visibleOrders = useMemo(() => activeTab === "All Orders" ? orders : activeTab === "Returns" ? [] : orders.filter((order) => order.status === activeTab), [activeTab]);
  const tabCount = (tab: OrderTab) => tab === "All Orders" ? 12 : tab === "Processing" ? 2 : tab === "Shipped" ? 3 : tab === "Delivered" ? 6 : 1;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block"><div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="bg-blue-50/70 px-4 py-7 text-center"><div className="relative mx-auto size-16 overflow-hidden rounded-full border-4 border-white shadow"><Image src="/images/beige-saree.png" alt="Anjali Patel" fill sizes="64px" className="object-cover object-top" /></div><h2 className="mt-2 font-serif text-lg font-bold text-blue-950">Anjali Patel</h2><span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-[9px] font-semibold text-blue-700">Silver Member</span></div>{["Profile", "My Orders", "Notifications", "Wishlist", "Addresses", "Settings", "Help & Support"].map((item) => <Link key={item} href={item === "Wishlist" ? "/wishlist" : item === "My Orders" ? "/orders" : item === "Notifications" ? "/notifications" : item === "Profile" ? "/profile" : item === "Addresses" ? "/profile#addresses" : item === "Settings" ? "/settings" : "/contact"} className={`flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs ${item === "My Orders" ? "bg-blue-50 font-bold text-blue-700" : "text-blue-950 hover:bg-slate-50"}`}>{item}<span>›</span></Link>)}</div></aside>
          <section className="min-w-0">
            <div className="flex items-start justify-between gap-3"><div><h1 className="font-serif text-3xl font-bold text-blue-950 sm:text-4xl">My Orders</h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Track, manage and view all your orders</p></div><div className="relative"><button type="button" onClick={() => setFilterOpen((open) => !open)} className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-blue-950 sm:h-10 sm:rounded-md sm:px-4"><Icon name="sort" className="size-4" /> Filters</button>{filterOpen && <div className="absolute right-0 top-11 z-20 w-40 rounded-xl border border-slate-200 bg-white p-2 text-xs shadow-xl"><button type="button" onClick={() => { setActiveTab("All Orders"); setFilterOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left hover:bg-blue-50">All orders</button><button type="button" onClick={() => { setActiveTab("Delivered"); setFilterOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left hover:bg-blue-50">Delivered</button><button type="button" onClick={() => { setActiveTab("Processing"); setFilterOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left hover:bg-blue-50">Processing</button></div>}</div></div>
            <div className="mt-5 flex gap-5 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] sm:mt-7 sm:gap-8">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative shrink-0 pb-3 text-xs font-semibold ${activeTab === tab ? "text-blue-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blue-600" : "text-slate-500"}`}>{tab}<span className={`ml-1.5 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] ${activeTab === tab ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{tabCount(tab)}</span></button>)}</div>
            <div className="mt-4 space-y-3 sm:mt-5">{visibleOrders.length ? visibleOrders.map((order) => <OrderCard key={order.id} order={order} onAction={(label) => setMessage(`${label} is ready for ${order.id}.`)} />) : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center"><Icon name="box" className="mx-auto size-8 text-blue-300" /><h2 className="mt-2 font-serif text-lg font-bold text-blue-950">No orders in this tab</h2><p className="mt-1 text-xs text-slate-500">Your order history will appear here.</p></div>}</div>
            {message && <p role="status" className="mt-3 text-center text-xs font-semibold text-blue-700">{message}</p>}
          </section>
        </div>
      </main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
    </div>
  );
}
