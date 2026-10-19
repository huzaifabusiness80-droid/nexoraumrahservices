import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import BlogPostForm, { type BlogPostFormData } from "@/components/admin/BlogPostForm";
import { getCurrentAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const instant = false;

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  if (!(await getCurrentAdmin())) redirect("/admin/login");
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const formPost: BlogPostFormData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    category: post.category,
    author: post.author,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoKeywords: post.seoKeywords,
    isPublished: post.isPublished,
  };

  return <BlogPostForm post={formPost} />;
}
