import prisma from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import { Blog, Author, Tag } from "@/app/types";

export default async function BlogsPage() {
  const blogs: (Blog & { author: Author | null; tags: Tag[] })[] =
    await prisma.blog.findMany({
      include: {
        author: true,
        tags: true,
        contentBlocks: true,
      },
      orderBy: { publishedAt: "desc" },
    });
  console.log(blogs);
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
