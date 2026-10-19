import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache, Suspense } from "react";
import { io } from "next/cache";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { getBlogReadingTime, parseBlogContent } from "@/lib/blog";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

const getPublishedPost = cache((slug: string) =>
  prisma.blogPost.findFirst({
    where: { slug, isPublished: true },
  })
);

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `/blogs/${post.slug}`;
  const images = post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined;

  return {
    title,
    description,
    keywords: post.seoKeywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      section: post.category,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

async function BlogArticleContent({ params }: BlogPageProps) {
  await io();
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const contentBlocks = parseBlogContent(post.content);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Nexora Journeys",
      url: "https://nexorajourneys.com",
      logo: { "@type": "ImageObject", url: "https://nexorajourneys.com/icon.svg" },
    },
    mainEntityOfPage: `https://nexorajourneys.com/blogs/${post.slug}`,
    articleSection: post.category,
    articleBody: post.content,
    timeRequired: `PT${getBlogReadingTime(post.content)}M`,
  };
  const safeJsonLd = JSON.stringify(articleJsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />
      <div className="border-b border-zinc-200 bg-white py-3">
        <nav aria-label="Breadcrumb" className="mx-auto flex max-w-5xl items-center gap-2 px-4 text-xs text-zinc-500 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-zinc-900">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blogs" className="hover:text-zinc-900">Travel Guides</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate font-semibold text-zinc-800">{post.title}</span>
        </nav>
      </div>
      <main className="flex-1 bg-white">
        <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <header className="mx-auto max-w-3xl">
            <Link href="/blogs" className="text-xs font-bold uppercase tracking-widest text-[#9b762c] hover:text-zinc-900">
              {post.category}
            </Link>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-zinc-100 py-4 text-xs text-zinc-500">
              <span className="font-semibold text-zinc-800">{post.author}</span>
              {post.publishedAt && (
                <time dateTime={post.publishedAt.toISOString()}>
                  {post.publishedAt.toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
              <span>{getBlogReadingTime(post.content)} min read</span>
              {post.updatedAt.getTime() > (post.publishedAt?.getTime() ?? 0) && (
                <span>Updated {post.updatedAt.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}</span>
              )}
            </div>
          </header>

          {post.coverImage && (
            <figure className="relative mx-auto mt-8 aspect-[16/9] max-w-5xl overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </figure>
          )}

          <div className="mx-auto mt-9 max-w-3xl">
            {contentBlocks.map((block, index) => {
              if (block.type === "heading") {
                const Heading = block.level === 2 ? "h2" : "h3";
                return (
                  <Heading key={index} className="mb-4 mt-9 text-xl font-extrabold leading-snug text-zinc-900 first:mt-0 sm:text-2xl">
                    {block.content}
                  </Heading>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={index} className="mb-6 list-disc space-y-2 pl-6 text-[15px] leading-7 text-zinc-700 marker:text-[#c5a059]">
                    {block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                  </ul>
                );
              }
              return (
                <p key={index} className="mb-5 whitespace-pre-line text-[15px] leading-8 text-zinc-700">
                  {block.content}
                </p>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-3xl border-t border-zinc-200 pt-6">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-[#8a651f] hover:text-zinc-900">
              <span aria-hidden="true">←</span> All travel guides
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export default function BlogArticlePage({ params }: BlogPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Header />
      <Suspense fallback={<div className="flex-1 py-24 text-center text-sm text-zinc-500">Loading article...</div>}>
        <BlogArticleContent params={params} />
      </Suspense>
      <Footer />
    </div>
  );
}
