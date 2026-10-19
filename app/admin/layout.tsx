"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import {
  FaTachometerAlt,
  FaCar,
  FaHotel,
  FaMosque,
  FaCompass,
  FaCampground,
  FaKey,
  FaCalendarCheck,
  FaEnvelope,
  FaNewspaper,
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Exclude login and signup pages from sidebar layout
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/signup";

  useEffect(() => {
    if (!isAuthPage) {
      fetch("/api/admin/me")
        .then((res) => {
          if (!res.ok) {
            router.push("/admin/login");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data?.user) setUser(data.user);
        })
        .catch(() => {
          router.push("/admin/login");
        });
    }
  }, [pathname, isAuthPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: FaTachometerAlt },
    { label: "Bookings", href: "/admin/bookings", icon: FaCalendarCheck },
    { type: "header", label: "SERVICES MANAGEMENT" },
    { label: "Umrah Transport", href: "/admin/transport", icon: FaCar },
    { label: "Umrah Hotels", href: "/admin/hotels", icon: FaHotel },
    { label: "Umrah Ziyarat", href: "/admin/ziyarat", icon: FaMosque },
    { label: "UAE City Tours", href: "/admin/city-tours", icon: FaCompass },
    { label: "Desert Safari", href: "/admin/desert-safari", icon: FaCampground },
    { label: "UAE Rental Cars", href: "/admin/car-rental", icon: FaKey },
    { type: "header", label: "CONTENT MANAGEMENT" },
    { label: "Blog Articles", href: "/admin/blogs", icon: FaNewspaper },
    { type: "header", label: "LEADS & INQUIRIES" },
    { label: "Contact Inquiries", href: "/admin/inquiries", icon: FaEnvelope },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex font-sans antialiased">
      
      {/* 1. Desktop Sidebar — Pure White, Crisp Border */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-200 bg-white shrink-0 sticky top-0 h-screen z-30">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-200 flex flex-col items-start gap-1">
          <Link href="/admin" className="block">
            <Image
              src="/images/nexora-journeys-logo-cropped.png"
              alt="Nexora Journeys"
              width={160}
              height={55}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
          <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest mt-1">
            Official Admin Portal
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((item, idx) => {
            if (item.type === "header") {
              return (
                <div
                  key={idx}
                  className="pt-4 pb-1.5 px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                >
                  {item.label}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href!);

            return (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                  isActive
                    ? "bg-[#c5a059] text-white"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <Icon className={`text-sm ${isActive ? "text-white" : "text-zinc-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout Bottom Strip */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50/50 flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <FaUserCircle className="text-2xl text-zinc-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-zinc-800 truncate">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[10px] text-zinc-400 truncate">
                {user?.email || "admin@nexorajourneys.com"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-zinc-200/60">
            <Link
              href="/"
              target="_blank"
              className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors"
            >
              <span>Live Site</span>
              <FaExternalLinkAlt className="text-[9px]" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <FaSignOutAlt className="text-xs" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between">
        <Link href="/admin">
          <Image
            src="/images/nexora-journeys-logo-cropped.png"
            alt="Nexora Journeys"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-zinc-700 hover:bg-zinc-100 rounded-lg cursor-pointer"
        >
          {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div
            className="w-64 bg-white h-full pt-16 p-4 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-1">
              {navLinks.map((item, idx) => {
                if (item.type === "header") {
                  return (
                    <div
                      key={idx}
                      className="pt-4 pb-1 px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                    >
                      {item.label}
                    </div>
                  );
                }
                const Icon = item.icon!;
                const isActive = item.href === pathname;
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${
                      isActive ? "bg-[#c5a059] text-white" : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg flex items-center justify-center gap-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Content Area — Pure White Background */}
      <div className="flex-1 flex flex-col min-w-0 bg-white pt-14 lg:pt-0">
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
