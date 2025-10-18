import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";

interface HeroProps {
  recentPosts: Array<{
    id: string;
    slug: string;
    title: string;
    summary: string;
    image: string;
    publishedAt: string | Date;
    category?: string | null;
    tags?: { id: string; name: string }[];
    readTime?: number | null;
    featured?: boolean;
    author?: {
      name: string;
      avatar?: string | null;
    } | null;
  }>;
}

export default function Hero({ recentPosts }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Welcome to Tambari Blog
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
              Discover Stories,
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
              Thinking, and Expertise
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore cutting-edge insights, expert perspectives, and in-depth articles 
            on technology, innovation, and the future of digital transformation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/blogs">
              <Button size="lg" className="gap-2 group">
                Start Reading
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/authors">
              <Button size="lg" variant="outline" className="gap-2">
                Meet Our Authors
              </Button>
            </Link>
          </div>
        </div>

        {/* Latest Posts Section */}
        <section className="space-y-8">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Latest Posts</h2>
                <p className="text-sm text-muted-foreground">
                  Fresh perspectives delivered daily
                </p>
              </div>
            </div>
            <Link href="/blogs">
              <Button variant="ghost" className="gap-2 group hidden sm:flex">
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Blog Cards Grid */}
          {recentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} blog={post} />
                ))}
              </div>

              {/* Mobile View All Button */}
              <div className="flex justify-center sm:hidden">
                <Link href="/blogs">
                  <Button variant="outline" className="gap-2 group">
                    View All Posts
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg bg-muted/20">
              <p className="text-muted-foreground">
                No posts available yet. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Articles", value: "500+" },
            { label: "Expert Authors", value: "50+" },
            { label: "Topics Covered", value: "25+" },
            { label: "Monthly Readers", value: "100K+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}