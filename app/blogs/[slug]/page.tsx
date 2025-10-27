import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
import { ContentBlock } from "@/app/types";
import { formattedDate } from "@/app/functions";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("🔍 Fetching blog with slug:", slug);

  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.slug, slug),
    with: {
      author: true,
      contentBlocks: {
        orderBy: (contentBlocks, { asc }) => [asc(contentBlocks.order)]
      },
      blogsToTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  console.log("✅ Blog found:", blog ? "Yes" : "No");
  if (blog) {
    console.log("📝 Blog title:", blog.title);
    console.log("📄 Content blocks:", blog.contentBlocks.length);
    console.log("👤 Author:", blog.author?.name || "None");
  }

  if (!blog) notFound();

  const blogWithTags = {
    ...blog,
    tags: blog.blogsToTags.map((bt) => bt.tag),
  };

  const blogDate = blogWithTags.publishedAt

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 key={block.id} className="text-3xl font-bold mt-8 mb-4">
            {block.content}
          </h2>
        );
      case "subheading":
        return (
          <h3 key={block.id} className="text-2xl font-semibold mt-6 mb-3">
            {block.content}
          </h3>
        );
      case "text":
        return (
          <p
            key={block.id}
            className="text-muted-foreground leading-relaxed mb-6"
          >
            {block.content}
          </p>
        );
      case "image":
        return (
          <div key={block.id} className="my-8">
            <Image
              src={block.content}
              alt={block.alt || "Blog image"}
              width={200}
              height={200}
              loading="lazy"
              className="w-full rounded-lg shadow-sm object-cover"
            />
            {block.alt && (
              <p className="text-sm text-muted-foreground text-center mt-2 italic">
                {block.alt}
              </p>
            )}
          </div>
        );
      case "code":
        return (
          <pre
            key={block.id}
            className="bg-muted p-4 rounded-lg overflow-x-auto my-6 border"
          >
            <code className="text-sm font-mono">{block.content}</code>
          </pre>
        );
      case "quote":
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-primary pl-6 my-6 italic text-lg text-muted-foreground"
          >
            &ldquo;{block.content}&rdquo;
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blogs
            </Link>
          </Button>
        </div>
      </header>

      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={blogWithTags.image}
          alt={blogWithTags.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="container mx-auto max-w-4xl">
            {blogWithTags.featured && (
              <Badge
                variant="secondary"
                className="mb-4 bg-primary text-primary-foreground"
              >
                Featured
              </Badge>
            )}
            {blogWithTags.category && (
              <Badge
                variant="outline"
                className="mb-4 ml-2 bg-background/80 backdrop-blur-sm"
              >
                {blogWithTags.category}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blogWithTags.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {blogWithTags.summary}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              {blogDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{blogDate}</span>
                </div>
              )}
              {blogWithTags.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blogWithTags.readTime} min read</span>
                </div>
              )}
            </div>

            {blogWithTags.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blogWithTags.tags.map((tag) => (
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

          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:text-muted-foreground prose-p:leading-relaxed">
            {blogWithTags.contentBlocks.length > 0 ? (
              blogWithTags.contentBlocks.map((block, index) =>
                renderContentBlock(block, index)
              )
            ) : (
              <p className="text-muted-foreground italic">
                No content available for this blog post.
              </p>
            )}
          </div>

          {blogWithTags.author && (
            <footer className="mt-12 pt-8 border-t border-border">
              <div className="flex items-start gap-4">
                {blogWithTags.author.avatar ? (
                  <Image
                    width={64}
                    height={64}
                    src={blogWithTags.author.avatar}
                    alt={blogWithTags.author.name}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">
                    {blogWithTags.author.name}
                  </h4>
                  {blogWithTags.author.bio && (
                    <p className="text-muted-foreground mb-3">
                      {blogWithTags.author.bio}
                    </p>
                  )}
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/authors/${blogWithTags.author.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </footer>
          )}
        </article>
      </main>
    </div>
  );
}
