"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaLock, FaEnvelope, FaSpinner, FaArrowRight } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 flex flex-col justify-center items-center px-4 py-12 font-sans">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/images/nexora-journeys-logo-cropped.png"
              alt="Nexora Journeys"
              width={200}
              height={70}
              className="h-14 w-auto mx-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Sign in to manage services, fleet pricing, and reservations
          </p>
        </div>

        {/* Clean White Card — Zero heavy shadows, crisp border */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-10">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexorajourneys.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>
        </div>

      

      </div>
    </div>
  );
}
