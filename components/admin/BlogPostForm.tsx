"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";

export interface BlogPostFormData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  author: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  isPublished: boolean;
}

const emptyPost: BlogPostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "Travel Guide",
  author: "Nexora Journeys",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: [],
  isPublished: false,
};

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-[#c5a059] focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700";

export default function BlogPostForm({ post }: { post?: BlogPostFormData }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogPostFormData>(post ?? emptyPost);
  const [keywords, setKeywords] = useState((post?.seoKeywords ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof BlogPostFormData>(key: K, value: BlogPostFormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const endpoint = form.id ? `/api/admin/blogs/${form.id}` : "/api/admin/blogs";
      const response = await fetch(endpoint, {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          seoKeywords: keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to save this article.");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save this article.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="border-b border-zinc-200 pb-6">
        <Link href="/admin/blogs" className="mb-1 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900">
          <FaArrowLeft className="text-[10px]" /> Back to Blog Posts
        </Link>
        <h1 className="text-xl font-extrabold uppercase tracking-wider text-zinc-900 sm:text-2xl">
          {form.id ? "Edit Article" : "Create Article"}
        </h1>
        <p className="mt-1 text-xs text-zinc-500">Write useful travel content and optimize its search preview.</p>
      </div>

      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5 sm:p-7">
          <h2 className="border-b border-zinc-100 pb-3 text-sm font-bold uppercase tracking-wider text-zinc-900">Article</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="blog-title">Article title *</label>
              <input id="blog-title" required maxLength={160} value={form.title} onChange={(event) => update("title", event.target.value)} className={inputClass} placeholder="e.g. A first-time visitor's guide to Makkah" />
              <p className="mt-1 text-right text-[11px] text-zinc-400">{form.title.length}/160</p>
            </div>
            <div>
              <label className={labelClass} htmlFor="blog-slug">URL slug</label>
              <input id="blog-slug" value={form.slug} onChange={(event) => update("slug", event.target.value)} disabled={Boolean(post?.isPublished)} className={`${inputClass} disabled:bg-zinc-100 disabled:text-zinc-500`} placeholder="auto-generated-from-title" />
              <p className="mt-1 text-[11px] text-zinc-500">
                {post?.isPublished
                  ? "Locked after publishing to protect search rankings and existing links."
                  : "Used in /blogs/your-article-url. Leave blank to generate from title."}
              </p>
            </div>
            <div>
              <label className={labelClass} htmlFor="blog-category">Category</label>
              <input id="blog-category" maxLength={60} value={form.category} onChange={(event) => update("category", event.target.value)} className={inputClass} placeholder="Umrah Guide, UAE Travel..." />
            </div>
            <div>
              <label className={labelClass} htmlFor="blog-author">Author</label>
              <input id="blog-author" maxLength={100} value={form.author} onChange={(event) => update("author", event.target.value)} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="blog-excerpt">Short introduction *</label>
              <textarea id="blog-excerpt" required maxLength={320} rows={3} value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} className={inputClass} placeholder="Summarize what readers will learn. This appears in search and article cards." />
              <p className="mt-1 text-right text-[11px] text-zinc-400">{form.excerpt.length}/320</p>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="blog-content">Article content *</label>
              <textarea id="blog-content" required minLength={30} rows={18} value={form.content} onChange={(event) => update("content", event.target.value)} className={`${inputClass} leading-7`} placeholder={"Write the complete article here. Leave a blank line between paragraphs.\n\n## Main section heading\nAdd clear, helpful information under each heading.\n\n- Add a useful list item\n- Add another list item"} />
              <p className="mt-1 text-[11px] text-zinc-500">Use ## or ### at the start of a line for headings, - for list items, and a blank line between paragraphs.</p>
            </div>
          </div>
          <ImageUploader value={form.coverImage ?? ""} onChange={(url) => update("coverImage", url)} folder="nexora/blogs" label="Featured image (recommended)" />
        </section>

        <section className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5 sm:p-7">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Search engine preview</h2>
            <p className="mt-1 text-xs text-zinc-500">Add a specific title and description to help this article appear clearly in search results.</p>
          </div>
          <div className="grid gap-4">
            <div>
              <label className={labelClass} htmlFor="seo-title">SEO title</label>
              <input id="seo-title" maxLength={70} value={form.seoTitle ?? ""} onChange={(event) => update("seoTitle", event.target.value)} className={inputClass} placeholder={form.title || "Search result headline"} />
              <p className="mt-1 text-right text-[11px] text-zinc-400">{(form.seoTitle ?? "").length}/70 (recommended: 50–60)</p>
            </div>
            <div>
              <label className={labelClass} htmlFor="seo-description">Meta description</label>
              <textarea id="seo-description" maxLength={170} rows={3} value={form.seoDescription ?? ""} onChange={(event) => update("seoDescription", event.target.value)} className={inputClass} placeholder={form.excerpt || "Write a concise and specific search description."} />
              <p className="mt-1 text-right text-[11px] text-zinc-400">{(form.seoDescription ?? "").length}/170 (recommended: 140–160)</p>
            </div>
            <div>
              <label className={labelClass} htmlFor="seo-keywords">Related search topics</label>
              <input id="seo-keywords" value={keywords} onChange={(event) => setKeywords(event.target.value)} className={inputClass} placeholder="Umrah travel guide, Makkah tips, Saudi Arabia" />
              <p className="mt-1 text-[11px] text-zinc-500">Separate with commas. Focus on natural, relevant topics.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={form.isPublished} onChange={(event) => update("isPublished", event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#c5a059]" />
            <span>
              <span className="block text-sm font-bold text-zinc-900">Publish this article</span>
              <span className="mt-0.5 block text-xs text-zinc-500">Published posts are visible on the website and included in the sitemap.</span>
            </span>
          </label>
          <div className="flex items-center justify-end gap-3">
            <Link href="/admin/blogs" className="rounded-lg bg-zinc-100 px-4 py-2.5 text-xs font-bold uppercase text-zinc-700 hover:bg-zinc-200">Cancel</Link>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c5a059] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b08c47] disabled:opacity-50">
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {saving ? "Saving..." : "Save Article"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
