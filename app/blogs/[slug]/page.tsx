import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContentBlock } from "@/lib/generated/prisma";
import { formattedDate } from "@/app/functions";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
      contentBlocks: true,
      tags: true,
    },
  });

  if (!blog) notFound();

 const blogDate = formattedDate(blog.publishedAt);

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 key={index} className="text-3xl font-bold mt-8 mb-4">
            {block.content}
          </h2>
        );
      case "subheading":
        return (
          <h3 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {block.content}
          </h3>
        );
      case "text":
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-6">
            {block.content}
          </p>
        );
      case "image":
        return (
          <div key={index} className="my-8">
            <Image
              src={block.content}
              alt={block.alt || "Blog image"}
              width={600}
              height={400}
              className="w-full rounded-lg shadow-sm object-cover"
            />
          </div>
        );
      case "code":
        return (
          <pre
            key={index}
            className="bg-muted p-4 rounded-lg overflow-x-auto my-6"
          >
            <code className="text-sm">{block.content}</code>
          </pre>
        );
      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-6 my-6 italic text-lg text-muted-foreground"
          >
            {block.content}
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blogs
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {blog.featured && (
          <Badge
            variant="secondary"
            className="absolute top-6 left-6 bg-primary text-primary-foreground"
          >
            Featured
          </Badge>
        )}
        {blog.category && (
          <Badge
            variant="outline"
            className="absolute top-6 right-6 bg-background/80 backdrop-blur-sm"
          >
            {blog.category}
          </Badge>
        )}
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> <span>{blogDate}</span>
              </div>
              {blog.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />{" "}
                  <span>{blog.readTime} min read</span>
                </div>
              )}
            </div>

            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" /> Bookmark
              </Button>
            </div>
            <Separator />
          </header>

          <div className="prose max-w-none">
            {blog.contentBlocks.map((block, index) =>
              renderContentBlock(block, index)
            )}
          </div>

          {blog.author && (
            <footer className="mt-12 pt-8 border-t border-border">
              <div className="flex items-start gap-4">
                {blog.author.avatar ? (
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-foreground" />
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    {blog.author.name}
                  </h4>
                  {blog.author.bio && (
                    <p className="text-muted-foreground">{blog.author.bio}</p>
                  )}
                </div>
              </div>
            </footer>
          )}
        </article>
      </main>
    </div>
  );
}
