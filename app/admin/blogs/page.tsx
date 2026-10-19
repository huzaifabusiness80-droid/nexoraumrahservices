import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import BlogPostsTable, { type BlogPostRow } from "@/components/admin/BlogPostsTable";
import { getCurrentAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const instant = false;

export default async function AdminBlogsPage() {
  await connection();
  if (!(await getCurrentAdmin())) redirect("/admin/login");

  const posts = await prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      coverImage: true,
      isPublished: true,
      updatedAt: true,
    },
  });

  const rows: BlogPostRow[] = posts.map((post) => ({
    ...post,
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold uppercase tracking-wider text-zinc-900 sm:text-2xl">Blog Articles</h1>
          <p className="mt-1 text-xs text-zinc-500">Create search-friendly travel guides and manage published articles.</p>
        </div>
        <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 self-start rounded-lg bg-[#c5a059] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b08c47]">
          <FaPlus className="text-[10px]" /> New Article
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <BlogPostsTable initialPosts={rows} />
      </div>
    </div>
  );
}
