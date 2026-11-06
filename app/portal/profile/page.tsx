"use client";
import { useEffect, useState } from "react";

export default function MyProfile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "" });
  const [message, setMessage] = useState("");
  useEffect(() => { fetch("/api/portal/me").then(r => r.json()).then(d => {if(d.user)setForm({ name:d.user.name||"", email:d.user.email||"", phone:d.user.phone||"", country:d.user.country||"" });}); }, []);
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage("");
    const res = await fetch("/api/portal/profile", { method:"PATCH", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ name:form.name, phone:form.phone, country:form.country }) });
    setMessage(res.ok ? "Profile updated successfully." : "Unable to update profile.");
  }
  return <div><h1 className="text-2xl font-bold mb-6">My Profile</h1><form onSubmit={save} className="max-w-2xl border border-zinc-200 bg-white p-5 md:p-7 grid md:grid-cols-2 gap-4"><label className="text-sm font-semibold md:col-span-2">Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#b38b45]" /></label><label className="text-sm font-semibold">Email<input value={form.email} disabled className="mt-2 w-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-500" /></label><label className="text-sm font-semibold">Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#b38b45]" /></label><label className="text-sm font-semibold md:col-span-2">Country<input value={form.country} onChange={e=>setForm({...form,country:e.target.value})} className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#b38b45]" /></label>{message && <p className="md:col-span-2 text-sm font-semibold text-[#9f7d3b]">{message}</p>}<button className="md:col-span-2 justify-self-start bg-[#18181b] text-white px-6 py-3 text-sm font-bold hover:bg-[#c5a059] cursor-pointer">Save changes</button></form></div>;
}
