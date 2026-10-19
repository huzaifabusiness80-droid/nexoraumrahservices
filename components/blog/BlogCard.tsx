import Image from "next/image";
import Link from "next/link";
import { getBlogReadingTime } from "@/lib/blog";

export interface BlogCardPost {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  author: string;
  publishedAt: Date | null;
  content: string;
}

export default function BlogCard({ post }: { post: BlogCardPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a059]/60 hover:shadow-lg">
      <Link href={`/blogs/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-zinc-100">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-3xl font-bold text-[#c5a059]">
            Nexora
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[#faf5e9] px-3 py-1 text-[#8a651f]">{post.category}</span>
          <span className="text-zinc-400">{getBlogReadingTime(post.content)} min read</span>
        </div>
        <h3 className="text-lg font-extrabold leading-snug text-zinc-900 transition-colors group-hover:text-[#9b762c]">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-500">
          <span>{post.author}</span>
          {post.publishedAt && (
            <time dateTime={post.publishedAt.toISOString()}>
              {post.publishedAt.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}
