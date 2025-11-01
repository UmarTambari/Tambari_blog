import React from "react";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";

const page = async () => {
  const recentBlogsData = await db.query.blogs.findMany({
    limit: 3,
    orderBy: [desc(blogs.publishedAt)],
    with: {
      author: true,
      blogsToTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  const recentBlogs = recentBlogsData.map((blog) => ({
    ...blog,
    tags: blog.blogsToTags.map((bt) => bt.tag),
  }));

  return (
    <div>
      <Hero recentBlogs={recentBlogs} />
      <Footer />
    </div>
  );
};

export default page;