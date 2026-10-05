"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";

type NotificationKind = "order" | "offer" | "heart" | "new" | "welcome" | "security" | "birthday";
type Notification = { id: string; title: string; body: string; time: string; kind: NotificationKind; group: "Orders" | "Offers" | "Account" | "Updates"; unread: boolean };

const notifications: Notification[] = [
  { id: "delivered", title: "Order Delivered", body: "Your order #SHR12568 has been delivered successfully.", time: "10 min ago", kind: "order", group: "Orders", unread: true },
  { id: "shipped", title: "Order Shipped", body: "Your order #SHR12411 has been shipped and is on the way.", time: "2 hours ago", kind: "order", group: "Orders", unread: true },
  { id: "offer", title: "Special Offer Just for You!", body: "Get 30% OFF on Soft Silk Sarees. Limited time offer. Shop now!", time: "5 hours ago", kind: "offer", group: "Offers", unread: true },
  { id: "stock", title: "Item Back in Stock", body: "The item “Lavender Banarasi Saree” is now back in stock.", time: "1 day ago", kind: "heart", group: "Updates", unread: true },
  { id: "arrivals", title: "New Arrivals", body: "Check out our latest collection of stunning sarees. Shop now!", time: "2 days ago", kind: "new", group: "Updates", unread: true },
  { id: "welcome", title: "Welcome to Shreera!", body: "Thank you for joining us. Explore our exclusive collections.", time: "3 days ago", kind: "welcome", group: "Account", unread: false },
  { id: "password", title: "Password Changed", body: "Your account password was changed successfully.", time: "5 days ago", kind: "security", group: "Account", unread: false },
  { id: "birthday", title: "Happy Birthday!", body: "Here’s a special 10% OFF just for you. Celebrate with style!", time: "1 week ago", kind: "birthday", group: "Offers", unread: false },
];

const tabs = ["All", "Orders", "Offers", "Account", "Updates"] as const;
type NotificationTab = (typeof tabs)[number];

function notificationIcon(kind: NotificationKind) {
  if (kind === "order") return <Icon name="box" className="size-5" />;
  if (kind === "offer") return <Icon name="sparkle" className="size-5" />;
  if (kind === "heart") return <Icon name="heart" className="size-5" />;
  if (kind === "new") return <Icon name="sparkle" className="size-5" />;
  if (kind === "welcome") return <Icon name="sparkle" className="size-5" />;
  if (kind === "security") return <Icon name="shield" className="size-5" />;
  return <Icon name="sparkle" className="size-5" />;
}

function tone(kind: NotificationKind) {
  if (kind === "offer" || kind === "birthday") return "bg-rose-50 text-rose-600";
  if (kind === "heart") return "bg-violet-50 text-violet-700";
  if (kind === "new") return "bg-amber-50 text-amber-600";
  if (kind === "security") return "bg-blue-50 text-blue-600";
  if (kind === "welcome") return "bg-emerald-50 text-emerald-700";
  return "bg-blue-50 text-blue-700";
}

function ProfileSidebar() {
  const items = [
    ["Profile", "/profile"], ["My Orders", "/orders"], ["Notifications", "/notifications"], ["Wishlist", "/wishlist"], ["Addresses", "/profile#addresses"], ["Settings", "/settings"], ["Help & Support", "/contact"],
  ];
  return <aside className="hidden lg:block"><div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="bg-blue-50/70 px-4 py-7 text-center"><div className="relative mx-auto size-16 overflow-hidden rounded-full border-4 border-white shadow"><Image src="/images/beige-saree.png" alt="Anjali Patel" fill sizes="64px" className="object-cover object-top" /></div><h2 className="mt-2 font-serif text-lg font-bold text-blue-950">Anjali Patel</h2><span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-[9px] font-semibold text-blue-700">Silver Member</span></div>{items.map(([label, href]) => <Link key={label} href={href} className={`flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs ${label === "Notifications" ? "bg-blue-50 font-bold text-blue-700" : "text-blue-950 hover:bg-slate-50"}`}>{label}<span>›</span></Link>)}</div></aside>;
}

export function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<NotificationTab>("All");
  const [read, setRead] = useState<string[]>([]);
  const visible = useMemo(() => activeTab === "All" ? notifications : notifications.filter((item) => item.group === activeTab), [activeTab]);
  const count = (tab: NotificationTab) => tab === "All" ? 12 : tab === "Orders" ? 4 : tab === "Offers" ? 3 : tab === "Account" ? 2 : 3;
  const markAll = () => setRead(notifications.map((item) => item.id));

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
          <ProfileSidebar />
          <section className="min-w-0">
            <div className="flex items-start justify-between gap-3"><div><h1 className="font-serif text-3xl font-bold text-blue-950 sm:text-4xl">Notifications</h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Stay updated with all the latest updates</p></div><button type="button" onClick={markAll} className="mt-1 text-[10px] font-bold text-blue-600 transition hover:text-blue-800 sm:text-xs">Mark all as read</button></div>
            <div className="mt-5 flex gap-6 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] sm:mt-7 sm:gap-8">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative shrink-0 pb-3 text-xs font-semibold ${activeTab === tab ? "text-blue-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blue-600" : "text-slate-500"}`}>{tab}<span className={`ml-1.5 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] ${activeTab === tab ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{count(tab)}</span></button>)}</div>
            <div className="divide-y divide-slate-200 overflow-hidden rounded-b-xl border-x border-b border-slate-200 bg-white">{visible.map((item) => { const isRead = read.includes(item.id) || !item.unread; return <button key={item.id} type="button" onClick={() => setRead((current) => current.includes(item.id) ? current : [...current, item.id])} className={`flex w-full items-start gap-3 px-3 py-4 text-left transition hover:bg-blue-50/40 sm:items-center sm:px-0 sm:py-3.5 ${!isRead ? "bg-white" : "bg-white/70"}`}><span className={`grid size-12 shrink-0 place-items-center rounded-xl sm:ml-0 sm:size-9 sm:rounded-lg ${tone(item.kind)}`}>{notificationIcon(item.kind)}</span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950 sm:text-sm">{item.title}</b><span className="mt-1 block text-[10px] leading-4 text-slate-500 sm:text-xs">{item.body}</span></span><span className="flex shrink-0 flex-col items-end gap-2 text-[9px] text-slate-500 sm:mr-0 sm:text-[10px]"><span>{item.time}</span>{!isRead && <span className="size-2 rounded-full bg-blue-600" />}</span></button>; })}</div>
          </section>
        </div>
      </main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
    </div>
  );
}
