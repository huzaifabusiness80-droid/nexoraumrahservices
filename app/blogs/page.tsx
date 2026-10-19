import type { Metadata } from "next";
import { Suspense } from "react";
import { io } from "next/cache";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Travel Guides & Umrah Advice",
  description:
    "Explore practical Umrah, Makkah, Madinah, Saudi Arabia and UAE travel guides from Nexora Journeys. Plan your journey with clear, helpful travel advice.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    type: "website",
    url: "/blogs",
    title: "Travel Guides & Umrah Advice | Nexora Journeys",
    description: "Practical travel advice and destination guides from Nexora Journeys.",
  },
};

async function BlogIndexContent() {
  await io();
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      category: true,
      author: true,
      publishedAt: true,
      content: true,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-bold text-zinc-900">New travel guides are on the way</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-zinc-600">
            Our team is preparing helpful travel and Umrah advice. Please check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      )}
    </div>
  );
}

export default function BlogsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] font-sans text-zinc-900">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-zinc-950 py-16 text-white sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c5a059]/25 via-zinc-950 to-zinc-950" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#e4be72]">Nexora Journeys Journal</p>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">Travel Guides &amp; Advice</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Thoughtful, practical guidance for Umrah, Saudi Arabia and UAE travel—written to help you plan with confidence.
            </p>
          </div>
        </section>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-zinc-500">Loading travel guides...</div>}>
          <BlogIndexContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
