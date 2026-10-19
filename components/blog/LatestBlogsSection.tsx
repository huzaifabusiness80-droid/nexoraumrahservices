import Link from "next/link";
import { io } from "next/cache";
import prisma from "@/lib/prisma";
import BlogCard from "@/components/blog/BlogCard";

export default async function LatestBlogsSection() {
  await io();
  let posts;
  try {
    posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3,
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
  } catch (error) {
    console.error("Homepage blog section error:", error);
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="latest-blogs-heading" className="w-full bg-[#f8f9fa] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9b762c]">Travel insights</p>
            <h2 id="latest-blogs-heading" className="text-2xl font-extrabold uppercase tracking-tight text-zinc-900 sm:text-3xl">
              Guides for your journey
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Helpful Umrah, Saudi Arabia and UAE travel advice from the Nexora Journeys team.
            </p>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-[#8a651f] hover:text-zinc-900">
            Explore all articles <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
