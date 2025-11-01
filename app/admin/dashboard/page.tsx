import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { blogs, authors, tags } from "@/lib/db/schema";
import { count, eq, desc } from "drizzle-orm";
import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import RecentPostsTable from "./components/RecentPostsTable";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [totalPosts] = await db.select({ count: count() }).from(blogs);
  const [publishedPosts] = await db
    .select({ count: count() })
    .from(blogs)
    .where(eq(blogs.status, "published"));
  const [draftPosts] = await db
    .select({ count: count() })
    .from(blogs)
    .where(eq(blogs.status, "draft"));
  const [totalAuthors] = await db.select({ count: count() }).from(authors);
  const [totalTags] = await db.select({ count: count() }).from(tags);

  const recentPosts = await db
    .select({
      id: blogs.id,
      title: blogs.title,
      slug: blogs.slug,
      status: blogs.status,
      createdAt: blogs.createdAt,
      category: blogs.category,
      authorName: authors.name,
    })
    .from(blogs)
    .leftJoin(authors, eq(blogs.authorId, authors.id))
    .orderBy(desc(blogs.createdAt))
    .limit(6);

  const stats: {
    name: string;
    value: number;
    icon: "FileText" | "CheckCircle2" | "Clock" | "Users" | "TagsIcon";
    href: string;
    bgColor: string;
    textColor: string;
  }[] = [
    {
      name: "Total Posts",
      value: totalPosts.count,
      icon: "FileText",
      href: "/admin/posts",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Published",
      value: publishedPosts.count,
      icon: "CheckCircle2",
      href: "/admin/posts?status=published",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Drafts",
      value: draftPosts.count,
      icon: "Clock",
      href: "/admin/posts?status=draft",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      name: "Authors",
      value: totalAuthors.count,
      icon: "Users",
      href: "/admin/authors",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      name: "Tags",
      value: totalTags.count,
      icon: "TagsIcon",
      href: "/admin/tags",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <DashboardHeader />
        <StatsGrid stats={stats} />
        <RecentPostsTable recentPosts={recentPosts} />
      </div>
    </div>
  );
}
