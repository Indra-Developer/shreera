import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";

const accountOptions = [
  { label: "My Profile", note: "Update your personal details", icon: "user" as const, href: "/profile" },
  { label: "Addresses", note: "Manage saved delivery addresses", icon: "grid" as const, href: "/profile#addresses" },
  { label: "Payment Methods", note: "Cards, UPI and COD", icon: "bag" as const, href: "/profile#payments" },
  { label: "Change Password", note: "Keep your account secure", icon: "shield" as const, href: "/settings" },
  { label: "Notification Settings", note: "Control your order and offer alerts", icon: "bell" as const, href: "/notifications" },
];

const moreOptions = [
  { label: "Refer & Earn", note: "Earn ₹200", icon: "sparkle" as const, href: "/profile#benefits" },
  { label: "My Coupons", note: "3 available", icon: "returns" as const, href: "/profile#coupons" },
  { label: "Help Center", note: "Get help and support", icon: "headset" as const, href: "/contact" },
  { label: "Contact Us", note: "We are here to help", icon: "headset" as const, href: "/contact" },
  { label: "About Shreera", note: "Learn more about us", icon: "sparkle" as const, href: "/about" },
];

function ProfileSidebar() {
  const items = [["Profile", "/profile"], ["My Orders", "/orders"], ["Notifications", "/notifications"], ["Wishlist", "/wishlist"], ["Addresses", "/profile#addresses"], ["Settings", "/settings"], ["Help & Support", "/contact"]];
  return <aside className="hidden lg:block"><div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="bg-blue-50/70 px-4 py-7 text-center"><div className="relative mx-auto size-16 overflow-hidden rounded-full border-4 border-white shadow"><Image src="/images/beige-saree.png" alt="Anjali Patel" fill sizes="64px" className="object-cover object-top" /></div><h2 className="mt-2 font-serif text-lg font-bold text-blue-950">Anjali Patel</h2><span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-[9px] font-semibold text-blue-700">Silver Member</span></div>{items.map(([label, href]) => <Link key={label} href={href} className={`flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs ${label === "Profile" ? "bg-blue-50 font-bold text-blue-700" : "text-blue-950 hover:bg-slate-50"}`}>{label}<span>›</span></Link>)}</div></aside>;
}

function OptionRow({ label, note, icon, href }: { label: string; note: string; icon: "user" | "grid" | "bag" | "shield" | "sparkle" | "returns" | "headset" | "bell"; href: string }) {
  return <Link href={href} className="flex items-center gap-3 border-t border-slate-200 px-3 py-3 transition hover:bg-blue-50/50 sm:px-4"><span className="grid size-7 shrink-0 place-items-center text-blue-600"><Icon name={icon} className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950">{label}</b><small className="block text-[9px] text-slate-500">{note}</small></span><span className="text-slate-400">›</span></Link>;
}

export function ProfileScreen() {
  const orderCategories = [{ label: "All Orders", count: "12", icon: "grid" as const }, { label: "Processing", count: "2", icon: "box" as const }, { label: "Shipped", count: "3", icon: "truck" as const }, { label: "Delivered", count: "6", icon: "check-circle" as const }, { label: "Returns", count: "1", icon: "returns" as const }];
  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
          <ProfileSidebar />
          <section className="min-w-0">
            <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-white px-4 py-5 sm:px-7 sm:py-6"><div className="flex items-center gap-4"><div className="relative size-20 shrink-0 overflow-hidden rounded-full border-4 border-white shadow sm:size-24"><Image src="/images/beige-saree.png" alt="Anjali Patel" fill sizes="96px" className="object-cover object-top" /></div><div><h1 className="font-serif text-2xl font-bold text-blue-950 sm:text-3xl">Hello, Anjali 👋</h1><p className="mt-1 text-xs text-slate-500">anjali.patel@gmail.com <span className="px-1.5">·</span> +91 98765 43210</p><span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-[9px] font-semibold text-blue-700">✧ Silver Member</span></div></div></div>
            <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-xl border border-slate-200 bg-white text-center"><Link href="/orders" className="border-r border-slate-200 py-3"><b className="block text-base text-blue-950">12</b><span className="text-[9px] text-slate-500">Orders</span></Link><Link href="/wishlist" className="border-r border-slate-200 py-3"><b className="block text-base text-blue-950">5</b><span className="text-[9px] text-slate-500">Wishlist</span></Link><Link href="/profile#addresses" className="border-r border-slate-200 py-3"><b className="block text-base text-blue-950">3</b><span className="text-[9px] text-slate-500">Addresses</span></Link><Link href="/profile#benefits" className="py-3"><b className="block text-base text-blue-950">350</b><span className="text-[9px] text-slate-500">Rewards</span></Link></div>

            <section className="mt-4 rounded-2xl border border-slate-200 bg-white" aria-labelledby="profile-orders"><div className="flex items-center justify-between px-4 py-3"><h2 id="profile-orders" className="font-serif text-lg font-bold text-blue-950">My Orders</h2><Link href="/orders" className="text-[10px] font-bold text-blue-600">View All Orders ›</Link></div><div className="grid grid-cols-5 border-t border-slate-200 py-4 text-center">{orderCategories.map((item) => <Link key={item.label} href="/orders" className="group"><Icon name={item.icon} className="mx-auto size-6 text-blue-600 transition group-hover:scale-110" /><b className="mt-1 block text-[9px] text-blue-950">{item.label}</b><span className="text-[9px] text-slate-500">{item.count}</span></Link>)}</div></section>

            <div className="mt-4 grid gap-4 sm:grid-cols-2"><section id="settings" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white"><h2 className="px-4 py-3 font-serif text-lg font-bold text-blue-950">Account Settings</h2>{accountOptions.map((item) => <OptionRow key={item.label} {...item} />)}</section><section id="support" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white"><h2 className="px-4 py-3 font-serif text-lg font-bold text-blue-950">More</h2>{moreOptions.map((item) => <OptionRow key={item.label} {...item} />)}</section></div>

            <section id="benefits" className="mt-4 flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-5 sm:px-6"><div><h2 className="font-serif text-lg font-bold text-blue-950">Exclusive Member Benefits</h2><p className="mt-1 text-xs text-slate-600">Enjoy special offers, early access &amp; more!</p><Link href="/categories" className="mt-3 inline-flex h-9 items-center rounded-md bg-blue-600 px-4 text-[10px] font-bold text-white">Explore Benefits</Link></div><Icon name="sparkle" className="size-16 shrink-0 text-blue-400" /></section>
            <span id="addresses" className="sr-only">Saved delivery addresses</span><span id="payments" className="sr-only">Payment methods</span><span id="coupons" className="sr-only">Coupons</span>
          </section>
        </div>
      </main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
    </div>
  );
}
