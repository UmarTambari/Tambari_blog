import AuthorCard from "@/components/AuthorCard";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AuthorsPage() {
  const authors = await db.query.authors.findMany({
    with: {
      blogs: {
        with: {
          blogsToTags: {
            with: {
              tag: true,
            },
          },
        },
      },
    },
  });

  if (!authors || authors.length === 0) return notFound();

  // Transform the data to match your expected format
  const authorsWithTags = authors.map((author) => ({
    ...author,
    blogs: author.blogs.map((blog) => ({
      ...blog,
      tags: blog.blogsToTags.map((bt) => bt.tag),
    })),
  }));

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Our Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authorsWithTags.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
}
