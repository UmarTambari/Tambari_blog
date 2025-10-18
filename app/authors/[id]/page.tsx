import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, BookOpen, ArrowLeft } from "lucide-react";
import BlogCard from "@/components/BlogCard";

export default async function AuthorPage({
  params,
}: {
  params: { id: string };
}) {
  const author = await prisma.author.findUnique({
    where: { id: params.id },
    include: {
      blogs: {
        include: { tags: true },
        orderBy: { publishedAt: "desc" },
      },
    },
  });

  if (!author) return notFound();

  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const totalReadTime = author.blogs.reduce(
    (acc, blog) => acc + (blog.readTime || 0),
    0
  );
  const uniqueTags = new Set(
    author.blogs.flatMap((b) => b.tags?.map((t) => t.name) || [])
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blogs">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Author Profile */}
        <Card className="mb-12 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="p-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 h-32" />

              <div className="relative px-8 pt-20 pb-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Avatar */}
                  <Avatar className="h-32 w-32 border-4 border-background shadow-2xl ring-2 ring-primary/20">
                    {author.avatar ? (
                      <AvatarImage src={author.avatar} alt={author.name} />
                    ) : (
                      <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {author.name}
                      </h1>
                      {author.bio && (
                        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                          {author.bio}
                        </p>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {author.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <a
                            href={`mailto:${author.email}`}
                            className="hover:text-primary transition-colors"
                          >
                            {author.email}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          Member since{" "}
                          {author.createdAt.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>
                          {author.blogs.length}{" "}
                          {author.blogs.length === 1 ? "article" : "articles"}{" "}
                          published
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Published Articles</h2>
            <p className="text-muted-foreground">
              Explore all articles written by {author.name.split(" ")[0]}
            </p>
          </div>

          {author.blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {author.blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardHeader>
                <CardTitle className="text-2xl">No Articles Yet</CardTitle>
                <CardDescription>
                  {author.name} hasn’t published any articles yet. Check back
                  soon!
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </section>

        {/* Stats */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-primary">
                {author.blogs.length}
              </CardTitle>
              <CardDescription className="text-base">
                Articles Published
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-secondary-foreground">
                {totalReadTime}
              </CardTitle>
              <CardDescription className="text-base">
                Minutes of Content
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-accent-foreground">
                {uniqueTags.size}
              </CardTitle>
              <CardDescription className="text-base">
                Topics Covered
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
}
