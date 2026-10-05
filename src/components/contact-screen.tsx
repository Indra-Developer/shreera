"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { MobileNav } from "@/components/mobile-nav";

const faqs = ["How can I track my order?", "What is your return policy?", "How long does delivery take?", "How can I cancel or modify my order?"];

export function ContactScreen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white pb-20 text-slate-900 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="mb-6"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">We’re here to help</p><h1 className="mt-1 font-serif text-3xl font-bold text-blue-950 sm:text-5xl">Contact Us</h1><p className="mt-2 text-xs text-slate-500 sm:text-sm">Tell us how we can make your Shreera experience better.</p></div>

        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <div>
            <section className="relative overflow-hidden rounded-2xl bg-blue-50 px-5 py-6 sm:px-7 sm:py-7"><div className="relative z-10 max-w-[65%]"><h2 className="font-serif text-2xl font-bold text-blue-950">Need Help?</h2><p className="mt-3 text-xs leading-5 text-slate-600">Our support team is available<br />Monday to Saturday, 9:00 AM – 7:00 PM</p></div><div className="absolute right-4 bottom-0 h-28 w-28 overflow-hidden rounded-t-xl bg-white/70 sm:right-7 sm:h-32 sm:w-32"><Image src="/images/avatar.jpg" alt="Shreera support specialist" fill sizes="128px" className="object-cover object-top" /></div></section>
            <section className="mt-6"><h2 className="font-serif text-lg font-bold text-blue-950">Get in Touch</h2><div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">{[{ icon: "phone" as const, label: "Call Us", value: "+91 98765 43210", note: "9:00 AM – 7:00 PM", href: "tel:+919876543210" }, { icon: "mail" as const, label: "Email Us", value: "support@shreera.com", note: "24/7 Support", href: "mailto:support@shreera.com" }, { icon: "phone" as const, label: "WhatsApp", value: "+91 98765 43210", note: "9:00 AM – 7:00 PM", href: "https://wa.me/919876543210" }, { icon: "map-pin" as const, label: "Our Address", value: "Shreera Pvt. Ltd., 123, Silk Street, Surat, Gujarat – 395001, India", note: "View map", href: "#address" }].map((item) => <a key={item.label} href={item.href} className="flex items-center gap-3 border-b border-slate-200 px-3 py-3 last:border-b-0 hover:bg-blue-50/40 sm:px-4"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600"><Icon name={item.icon} className="size-5" /></span><span className="min-w-0 flex-1"><b className="block text-xs text-blue-950">{item.label}</b><small className="mt-0.5 block truncate text-[10px] text-slate-500">{item.value}</small></span><span className="hidden text-[10px] font-bold text-emerald-600 sm:block">{item.note}</span><Icon name="arrow" className="size-4 shrink-0 text-slate-500" /></a>)}</div></section>
          </div>

          <div>
            <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"><h2 className="font-serif text-2xl font-bold text-blue-950">Send Us a Message</h2>{sent ? <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-6 text-center"><Icon name="check-circle" className="mx-auto size-9 text-emerald-600" /><h3 className="mt-2 text-sm font-bold text-emerald-800">Message sent successfully</h3><p className="mt-1 text-xs text-emerald-700">Our team will get back to you shortly.</p><button type="button" onClick={() => setSent(false)} className="mt-4 text-xs font-bold text-emerald-700 underline">Send another message</button></div> : <form onSubmit={submit} className="mt-4 space-y-2.5"><div className="grid gap-2.5 sm:grid-cols-2"><input required name="name" placeholder="Your Name" className="h-10 rounded-lg border border-slate-200 px-3 text-xs text-blue-950 outline-none placeholder:text-slate-400 focus:border-blue-500" /><input required type="email" name="email" placeholder="Your Email" className="h-10 rounded-lg border border-slate-200 px-3 text-xs text-blue-950 outline-none placeholder:text-slate-400 focus:border-blue-500" /></div><input required name="phone" placeholder="Mobile Number" className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs text-blue-950 outline-none placeholder:text-slate-400 focus:border-blue-500" /><select name="topic" defaultValue="" className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-blue-950 outline-none focus:border-blue-500"><option value="" disabled>Select Query Type</option><option>Order support</option><option>Returns &amp; exchange</option><option>Styling help</option><option>Other</option></select><textarea required name="message" placeholder="Your Message" className="min-h-28 w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-xs text-blue-950 outline-none placeholder:text-slate-400 focus:border-blue-500" /><button type="submit" className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-xs font-bold text-white transition hover:bg-blue-700"><Icon name="send" className="size-4" /> Send Message</button></form>}</section>
            <section className="mt-6"><div className="flex items-center justify-between"><h2 className="font-serif text-lg font-bold text-blue-950">Frequently Asked Questions</h2><Link href="/notifications" className="text-[10px] font-bold text-blue-600">View All</Link></div><div className="mt-3 overflow-hidden rounded-xl border border-slate-200">{faqs.map((question, index) => <button key={question} type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full border-b border-slate-200 px-3 py-3 text-left last:border-b-0 hover:bg-blue-50/40"><span className="flex items-center gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-700">Q</span><span className="min-w-0 flex-1 text-xs text-blue-950">{question}</span><span className="text-slate-500">{openFaq === index ? "−" : "›"}</span></span>{openFaq === index ? <span className="ml-9 mt-2 block text-[10px] leading-4 text-slate-500">Our support team can help with this. Send us a message and we’ll guide you through the next step.</span> : null}</button>)}</div></section>
          </div>
        </div>
        <span id="address" className="sr-only">Shreera Pvt. Ltd. address</span>
      </main>
      <footer className="hidden border-t border-slate-200 bg-white sm:block"><p className="py-5 text-center text-[10px] text-slate-500">© 2026 Shreera · Crafted for the woman you are · Secure payments &amp; easy returns</p></footer>
      <MobileNav activeItem="Profile" />
    </div>
  );
}
