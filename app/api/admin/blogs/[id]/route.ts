import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { createBlogSlug } from "@/lib/blog";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  if (!(await getCurrentAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Admin blog fetch error:", error);
    return NextResponse.json({ error: "Failed to load blog post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  if (!(await getCurrentAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid blog post data." }, { status: 400 });
    }
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Blog post not found" }, { status: 404 });

    const title = typeof body.title === "string" ? body.title.trim() : "";
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const slug = createBlogSlug(typeof body.slug === "string" && body.slug.trim() ? body.slug : title);
    if (!title || !excerpt || content.length < 30 || !slug) {
      return NextResponse.json(
        { error: "Title, URL slug, excerpt, and at least 30 characters of article content are required." },
        { status: 400 }
      );
    }
    if (existing.isPublished && slug !== existing.slug) {
      return NextResponse.json(
        { error: "A published article URL cannot be changed, to protect its search ranking and existing links." },
        { status: 400 }
      );
    }
    if (
      title.length > 160 ||
      excerpt.length > 320 ||
      content.length > 100_000 ||
      slug.length > 180 ||
      (typeof body.category === "string" && body.category.length > 60) ||
      (typeof body.author === "string" && body.author.length > 100) ||
      (typeof body.seoTitle === "string" && body.seoTitle.length > 70) ||
      (typeof body.seoDescription === "string" && body.seoDescription.length > 170) ||
      (typeof body.coverImage === "string" && body.coverImage.length > 2048)
    ) {
      return NextResponse.json({ error: "One or more blog fields exceed the allowed length." }, { status: 400 });
    }

    const isPublished = body.isPublished === true;
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: typeof body.coverImage === "string" && body.coverImage.trim() ? body.coverImage.trim() : null,
        category: typeof body.category === "string" && body.category.trim() ? body.category.trim() : "Travel Guide",
        author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "Nexora Journeys",
        seoTitle: typeof body.seoTitle === "string" && body.seoTitle.trim() ? body.seoTitle.trim() : null,
        seoDescription:
          typeof body.seoDescription === "string" && body.seoDescription.trim()
            ? body.seoDescription.trim()
            : null,
        seoKeywords: Array.isArray(body.seoKeywords)
          ? body.seoKeywords
              .filter((keyword: unknown): keyword is string => typeof keyword === "string")
              .map((keyword: string) => keyword.trim().slice(0, 80))
              .filter(Boolean)
              .slice(0, 20)
          : [],
        isPublished,
        publishedAt: isPublished ? existing.publishedAt ?? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "That URL slug is already in use. Please choose another." }, { status: 409 });
    }
    console.error("Admin blog update error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  if (!(await getCurrentAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    console.error("Admin blog delete error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
