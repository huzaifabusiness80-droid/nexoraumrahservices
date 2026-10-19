"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string | null;
  isPublished: boolean;
  updatedAt: string;
}

export default function BlogPostsTable({ initialPosts }: { initialPosts: BlogPostRow[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (post: BlogPostRow) => {
    if (!window.confirm(`Permanently delete "${post.title}"?`)) return;
    setDeletingId(post.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/blogs/${post.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to delete article");
      setPosts((current) => current.filter((item) => item.id !== post.id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to delete article");
    } finally {
      setDeletingId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="font-bold text-zinc-900">No articles yet</h2>
        <p className="mt-1 text-sm text-zinc-500">Create your first travel guide to get started.</p>
        <Link href="/admin/blogs/new" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#c5a059] px-4 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#b08c47]">
          <FaPlus /> Create your first article
        </Link>
      </div>
    );
  }

  return (
    <>
      {error && <p role="alert" className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-[10px] uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3.5">Article</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Last updated</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-50/60">
                <td className="px-4 py-3">
                  <div className="flex min-w-64 items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100">
                      {post.coverImage && <Image src={post.coverImage} alt="" fill sizes="64px" className="object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-bold text-zinc-900">{post.title}</p>
                      <p className="mt-0.5 truncate text-[11px] text-zinc-400">/blogs/{post.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{post.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${post.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                  {new Date(post.updatedAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {post.isPublished && (
                      <Link href={`/blogs/${post.slug}`} target="_blank" className="rounded bg-zinc-100 px-3 py-1.5 font-semibold text-zinc-700 hover:bg-zinc-200">
                        View
                      </Link>
                    )}
                    <Link href={`/admin/blogs/${post.id}/edit`} aria-label={`Edit ${post.title}`} className="rounded bg-zinc-100 p-2 text-zinc-700 hover:bg-zinc-200">
                      <FaEdit />
                    </Link>
                    <button type="button" onClick={() => void handleDelete(post)} disabled={deletingId === post.id} aria-label={`Delete ${post.title}`} className="rounded bg-red-50 p-2 text-red-600 hover:bg-red-100 disabled:opacity-50">
                      {deletingId === post.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
