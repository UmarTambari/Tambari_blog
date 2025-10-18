import AuthorCard from "@/components/AuthorCard";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AuthorPage() {
  const authors = await prisma.author.findMany({
    include: {
      blogs: {
        include: { tags: true },
      },
    },
  });
  if (!authors) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authors.map((author) => (
        <AuthorCard key={author.id} author={author} />
      ))}
    </div>
  );
}
