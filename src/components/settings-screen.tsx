"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { MobileNav } from "@/components/mobile-nav";

type SettingIcon = "user" | "map-pin" | "bag" | "shield" | "bell" | "moon" | "globe" | "currency" | "headset" | "file" | "info";

const accountRows: { label: string; note: string; icon: SettingIcon; href: string }[] = [
  { label: "Personal Information", note: "Update your name, email and mobile number", icon: "user", href: "/profile" },
  { label: "Addresses", note: "Manage your saved delivery addresses", icon: "map-pin", href: "/profile#addresses" },
  { label: "Payment Methods", note: "Add or manage your payment options", icon: "bag", href: "/profile#payments" },
  { label: "Change Password", note: "Update your account password", icon: "shield", href: "/settings" },
  { label: "Privacy Policy", note: "Manage your privacy preferences", icon: "shield", href: "/contact#privacy" },
];

const supportRows: { label: string; note: string; icon: SettingIcon; href: string }[] = [
  { label: "Help Center", note: "Get help and support", icon: "headset", href: "/contact" },
  { label: "Contact Us", note: "Reach out to our support team", icon: "headset", href: "/contact" },
  { label: "Terms & Conditions", note: "Read our terms and conditions", icon: "file", href: "/contact#terms" },
  { label: "About Shreera", note: "Learn more about us", icon: "info", href: "/about" },
];

function SettingsSidebar() {
  const items = [["Profile", "/profile"], ["My Orders", "/orders"], ["Notifications", "/notifications"], ["Wishlist", "/wishlist"], ["Addresses", "/profile#addresses"], ["Settings", "/settings"], ["Help & Support", "/contact"]];
  return <aside className="hidden lg:block"><div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="bg-blue-50/70 px-4 py-7 text-center"><div className="relative mx-auto size-16 overflow-hidden rounded-full border-4 border-white shadow"><Image src="/images/avatar.jpg" alt="Anjali Patel" fill sizes="64px" className="object-cover object-top" /></div><h2 className="mt-2 font-serif text-lg font-bold text-blue-950">Anjali Patel</h2><span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-[9px] font-semibold text-blue-700">Silver Member</span></div>{items.map(([label, href]) => <Link key={label} href={href} className={`flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs ${label === "Settings" ? "bg-blue-50 font-bold text-blue-700" : "text-blue-950 hover:bg-slate-50"}`}>{label}<span>›</span></Link>)}</div></aside>;
}

function SettingRow({ label, note, icon, href }: { label: string; note: string; icon: SettingIcon; href: string }) {
  return <Link href={href} className="flex items-center gap-3 border-t border-slate-200 px-3 py-3 transition hover:bg-blue-50/40 sm:px-4"><span className="grid size-7 shrink-0 place-items-center text-blue-950"><Icon name={icon} className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950">{label}</b><small className="mt-0.5 block text-[9px] text-slate-500 sm:text-[10px]">{note}</small></span><span className="text-slate-500">›</span></Link>;
}

function Toggle({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) {
  return <button type="button" aria-label={label} aria-pressed={enabled} onClick={onToggle} className={`relative h-6 w-10 rounded-full transition ${enabled ? "bg-blue-600" : "bg-slate-300"}`}><span className={`absolute top-1 size-4 rounded-full bg-white shadow transition ${enabled ? "left-5" : "left-1"}`} /></button>;
}

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR (₹)");
  const [signedOut, setSignedOut] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10"><div className="grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8"><SettingsSidebar /><section className="min-w-0"><div className="mb-5"><h1 className="font-serif text-3xl font-bold text-blue-950 sm:text-4xl">Settings</h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Manage your preferences and account settings</p></div><div className="grid gap-4 sm:grid-cols-2"><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><h2 className="px-4 py-4 font-serif text-lg font-bold text-blue-950">Account Settings</h2>{accountRows.map((row) => <SettingRow key={row.label} {...row} />)}</section><div className="space-y-4"><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><h2 className="px-4 py-4 font-serif text-lg font-bold text-blue-950">Preferences</h2><Link href="/notifications" className="flex items-center gap-3 border-t border-slate-200 px-3 py-3 sm:px-4"><span className="grid size-7 place-items-center text-blue-950"><Icon name="bell" className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950">Notification Settings</b><small className="text-[9px] text-slate-500 sm:text-[10px]">Manage push notifications and alerts</small></span><Toggle label="Notification settings" enabled={notifications} onToggle={() => setNotifications((value) => !value)} /></Link><div className="flex items-center gap-3 border-t border-slate-200 px-3 py-3 sm:px-4"><span className="grid size-7 place-items-center text-blue-950"><Icon name="moon" className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950">Dark Mode</b><small className="text-[9px] text-slate-500 sm:text-[10px]">Switch between light and dark theme</small></span><Toggle label="Dark mode" enabled={darkMode} onToggle={() => setDarkMode((value) => !value)} /></div><label className="flex items-center gap-3 border-t border-slate-200 px-3 py-3 sm:px-4"><span className="grid size-7 place-items-center text-blue-950"><Icon name="globe" className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950">Language</b><small className="text-[9px] text-slate-500 sm:text-[10px]">Select your preferred language</small></span><select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value)} className="bg-transparent text-xs font-bold text-blue-600 outline-none"><option>English</option><option>Hindi</option><option>Gujarati</option></select></label><label className="flex items-center gap-3 border-t border-slate-200 px-3 py-3 sm:px-4"><span className="grid size-7 place-items-center text-blue-950"><Icon name="currency" className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950">Currency</b><small className="text-[9px] text-slate-500 sm:text-[10px]">Select your preferred currency</small></span><select aria-label="Currency" value={currency} onChange={(event) => setCurrency(event.target.value)} className="bg-transparent text-xs font-bold text-blue-600 outline-none"><option>INR (₹)</option><option>USD ($)</option><option>GBP (£)</option></select></label></section><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><h2 className="px-4 py-4 font-serif text-lg font-bold text-blue-950">Support &amp; More</h2>{supportRows.map((row) => <SettingRow key={row.label} {...row} />)}</section></div></div><section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white"><h2 className="px-4 py-4 font-serif text-lg font-bold text-blue-950">Sign Out</h2><button type="button" onClick={() => setSignedOut(true)} className="flex w-full items-center gap-3 border-t border-slate-200 px-3 py-3 text-left text-rose-600 hover:bg-rose-50 sm:px-4"><Icon name="logout" className="size-5" /><span className="flex-1 text-xs font-semibold">{signedOut ? "You are signed out" : "Sign out from your account"}</span><span>›</span></button></section></section></div></main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
      <MobileNav activeItem="Profile" />
    </div>
  );
}
