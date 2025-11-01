import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import BlogCard from "@/components/BlogCard";
import { BlogWithRelations } from "@/app/types";

export default async function BlogsPage() {
  const allBlogs = await db.query.blogs.findMany({
    with: {
      author: true,
      contentBlocks: true,
      blogsToTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: [desc(blogs.publishedAt)],
  });

  const blogsWithTags: BlogWithRelations[] = allBlogs.map((blog) => ({
    ...blog,
    tags: blog.blogsToTags.map((bt) => bt.tag),
  }));

  console.log(blogsWithTags);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogsWithTags.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}