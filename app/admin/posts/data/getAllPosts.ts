import { db } from "@/lib/db";
import { blogs, authors } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllPosts() {
  const allPosts = await db
    .select({
      id: blogs.id,
      title: blogs.title,
      slug: blogs.slug,
      status: blogs.status,
      category: blogs.category,
      featured: blogs.featured,
      createdAt: blogs.createdAt,
      publishedAt: blogs.publishedAt,
      authorName: authors.name,
    })
    .from(blogs)
    .leftJoin(authors, eq(blogs.authorId, authors.id))
    .orderBy(desc(blogs.createdAt));

  const counts = {
    total: allPosts.length,
    published: allPosts.filter((p) => p.status === "published").length,
    drafts: allPosts.filter((p) => p.status === "draft").length,
  };

  return { posts: allPosts, counts };
}
