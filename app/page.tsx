import React from "react";
import { prisma } from "@/lib/prisma";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";

const page = async () => {
  const recentBlogs = await prisma.blog.findMany({
    take: 6,
    orderBy: { publishedAt: "desc" },
    include: {
      tags: true,
      author: true,
    },
  });

  return (
    <div>
      <Hero recentBlogs={recentBlogs} />
      <Footer />
    </div>
  );
};

export default page;
