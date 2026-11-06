"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";

export default function PortalSignup() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("email");
    if (value) setEmail(value);
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const data = new FormData(e.currentTarget);
    const body = { name: data.get("name"), email: data.get("email"), phone: data.get("phone"), country: data.get("country"), password: data.get("password") };
    const res = await fetch("/api/portal/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const result = await res.json();
    if (!res.ok) { setError(result.error); setLoading(false); return; }
    router.replace("/portal"); router.refresh();
  }
  return <div className="min-h-screen bg-[#f8f8f5] flex items-center justify-center p-4"><div className="w-full max-w-lg bg-white border border-zinc-200 p-7 md:p-9"><Link href="/" className="flex justify-center mb-7"><Image src="/images/nexora-journeys-logo-cropped.png" alt="Nexora Journeys" width={180} height={60} /></Link><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b38b45]">Client Portal</p><h1 className="text-2xl font-bold mt-2">Create your account</h1><p className="text-sm text-zinc-500 mt-1">Use the same email used for your Nexora bookings.</p></div>{error && <div className="mb-4 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}<form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4"><label className="text-sm font-semibold md:col-span-2">Full name<input name="name" required className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#b38b45]" /></label><label className="text-sm font-semibold md:col-span-2">Email<input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#b38b45]" /></label><label className="text-sm font-semibold">Phone<input name="phone" className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#b38b45]" /></label><label className="text-sm font-semibold">Country<input name="country" className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#b38b45]" /></label><label className="text-sm font-semibold md:col-span-2">Password<div className="relative mt-2"><input name="password" type={show ? "text" : "password"} minLength={8} required className="w-full border border-zinc-300 px-4 py-3 pr-12 outline-none focus:border-[#b38b45]" /><button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer">{show ? <FaEyeSlash /> : <FaEye />}</button></div></label><button disabled={loading} className="md:col-span-2 w-full bg-[#18181b] text-white py-3 font-bold hover:bg-[#c5a059] disabled:opacity-60 cursor-pointer">{loading ? "Creating account..." : "Create account"}</button></form><p className="text-center text-sm text-zinc-600 mt-6">Already registered? <Link href="/portal/login" className="font-bold text-[#9f7d3b]">Sign in</Link></p></div></div>;
}
