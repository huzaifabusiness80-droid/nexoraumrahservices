"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaLock, FaEnvelope, FaUser, FaSpinner, FaArrowRight, FaShieldAlt } from "react-icons/fa";

export default function AdminSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Signup failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create account");
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
            Create Admin Account
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Register a team member or dispatcher for the portal
          </p>
        </div>

        {/* Clean White Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-10">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Khan"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@nexorajourneys.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Portal Role
              </label>
              <div className="relative">
                <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] transition-colors cursor-pointer"
                >
                  <option value="ADMIN">Administrator (Full Access)</option>
                  <option value="DISPATCHER">Dispatcher (Bookings &amp; Transport)</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link back to login */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/admin/login"
            className="font-bold text-[#c5a059] hover:text-[#b08c47] transition-colors"
          >
            Sign In Here
          </Link>
        </p>

      </div>
    </div>
  );
}
