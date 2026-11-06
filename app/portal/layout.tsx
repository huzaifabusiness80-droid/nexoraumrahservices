"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  FaHome, FaSuitcaseRolling, FaFileInvoiceDollar, FaRoute,
  FaUser, FaHeadset, FaBars, FaTimes, FaSignOutAlt, FaEnvelopeOpenText
} from "react-icons/fa";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-white" />}><PortalLayoutContent>{children}</PortalLayoutContent></Suspense>;
}

function PortalLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const isAuthPage = pathname === "/portal/login" || pathname === "/portal/signup";

  useEffect(() => {
    if (!isAuthPage) {
      fetch("/api/portal/me").then((res) => {
        if (!res.ok) { router.replace("/portal/login"); return null; }
        return res.json();
      }).then((data) => { if (data?.user) setUser(data.user); }).catch(() => router.replace("/portal/login"));
    }
  }, [pathname, isAuthPage, router]);

  if (isAuthPage) return <>{children}</>;

  const links = [
    ["Dashboard", "/portal", FaHome],
    ["My Bookings", "/portal/bookings", FaSuitcaseRolling],
    ["My Invoices", "/portal/invoices", FaFileInvoiceDollar],
    ["Trip Details", "/portal/trip-details", FaRoute],
    ["My Inquiries", "/portal/inquiries", FaEnvelopeOpenText],
    ["My Profile", "/portal/profile", FaUser],
    ["Support", "/portal/support", FaHeadset],
  ] as const;

  const logout = async () => {
    await fetch("/api/portal/logout", { method: "POST" });
    router.replace("/portal/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-zinc-900 flex">
      <aside className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 flex-col bg-white border-r border-zinc-200">
        <div className="h-[88px] px-6 flex items-center border-b border-zinc-200">
          <Link href="/"><Image src="/images/nexora-journeys-logo-cropped.png" alt="Nexora Journeys" width={150} height={52} className="h-10 w-auto" priority /></Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(([label, href, Icon]) => {
            const active = href === "/portal" ? pathname === "/portal" : pathname.startsWith(href);
            return <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-colors ${active ? "bg-[#c5a059] text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"}`}><Icon className="text-base" /><span>{label}</span></Link>;
          })}
        </nav>
        <div className="p-4 border-t border-zinc-200">
          <p className="font-semibold text-sm truncate">{user?.name || "Client"}</p>
          <p className="text-xs text-zinc-500 truncate mb-3">{user?.email || ""}</p>
          <button onClick={logout} className="flex items-center gap-2 text-sm font-semibold text-red-600 cursor-pointer"><FaSignOutAlt /> Logout</button>
        </div>
      </aside>
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 z-40 bg-white border-b border-zinc-200 px-4 flex items-center justify-between">
        <Link href="/portal"><Image src="/images/nexora-journeys-logo-cropped.png" alt="Nexora" width={120} height={42} className="h-8 w-auto" /></Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="p-2 text-zinc-700 cursor-pointer">{mobileOpen ? <FaTimes /> : <FaBars />}</button>
      </div>
      {mobileOpen && <div className="lg:hidden fixed inset-0 z-30 bg-black/20 pt-16" onClick={() => setMobileOpen(false)}><nav className="w-72 h-full bg-white p-4 space-y-1" onClick={(e) => e.stopPropagation()}>{links.map(([label, href, Icon]) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-zinc-700 hover:bg-zinc-100"><Icon />{label}</Link>)}<button onClick={logout} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-red-600 cursor-pointer"><FaSignOutAlt />Logout</button></nav></div>}
      <main className="flex-1 min-w-0 pt-16 lg:pt-0"><div className="mx-auto w-full max-w-[1180px] p-4 md:p-8">{children}</div></main>
    </div>
  );
}
