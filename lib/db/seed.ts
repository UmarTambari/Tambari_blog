/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import { db } from "./index";
import { authors, blogs, tags, contentBlocks, blogsToTags } from "./schema";

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await db.delete(contentBlocks);
  await db.delete(blogsToTags);
  await db.delete(blogs);
  await db.delete(tags);
  await db.delete(authors);

  // Create Authors
  const [author1] = await db
    .insert(authors)
    .values({
      name: "John Doe",
      email: "john.doe@techblog.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      bio: "Full-stack developer passionate about web technologies, AI, and building scalable applications. 10+ years of experience in the tech industry.",
    })
    .returning();

  const [author2] = await db
    .insert(authors)
    .values({
      name: "Jane Smith",
      email: "jane.smith@techblog.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      bio: "Tech writer and software architect specializing in cloud computing and DevOps. Love sharing knowledge through writing.",
    })
    .returning();

  const [author3] = await db
    .insert(authors)
    .values({
      name: "Mike Johnson",
      email: "mike.johnson@techblog.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      bio: "Data scientist and machine learning enthusiast. Exploring the intersection of AI and real-world applications.",
    })
    .returning();

  console.log("✅ Created 3 authors");

  // Create Tags
  const [tagWebDev] = await db
    .insert(tags)
    .values({ name: "Web Development" })
    .returning();
  const [tagNextJS] = await db
    .insert(tags)
    .values({ name: "Next.js" })
    .returning();
  const [tagPrisma] = await db
    .insert(tags)
    .values({ name: "Prisma" })
    .returning();
  const [tagReact] = await db
    .insert(tags)
    .values({ name: "React" })
    .returning();
  const [tagTypeScript] = await db
    .insert(tags)
    .values({ name: "TypeScript" })
    .returning();
  const [tagAI] = await db.insert(tags).values({ name: "AI" }).returning();
  const [tagCloud] = await db
    .insert(tags)
    .values({ name: "Cloud Computing" })
    .returning();
  const [tagDevOps] = await db
    .insert(tags)
    .values({ name: "DevOps" })
    .returning();
  const [tagDocker] = await db
    .insert(tags)
    .values({ name: "Docker" })
    .returning();
  const [tagPython] = await db
    .insert(tags)
    .values({ name: "Python" })
    .returning();

  console.log("✅ Created 10 tags");

  // Create Blog 1
  const [blog1] = await db
    .insert(blogs)
    .values({
      slug: "building-a-blog-with-nextjs-and-prisma",
      title: "Building a Blog with Next.js and Prisma",
      summary:
        "Learn how to create a fully functional blog using Next.js, Prisma, and SQLite. This comprehensive guide covers everything from setup to deployment.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      category: "Web Development",
      readTime: 8,
      featured: true,
      authorId: author1.id,
    })
    .returning();

  // Add tags to blog1
  await db.insert(blogsToTags).values([
    { blogId: blog1.id, tagId: tagWebDev.id },
    { blogId: blog1.id, tagId: tagNextJS.id },
    { blogId: blog1.id, tagId: tagPrisma.id },
    { blogId: blog1.id, tagId: tagTypeScript.id },
  ]);

  // Add content blocks to blog1
  await db.insert(contentBlocks).values([
    {
      type: "heading",
      content: "Introduction",
      blogId: blog1.id,
    },
    {
      type: "text",
      content:
        "Building a modern blog requires the right tools and technologies. In this tutorial, we'll explore how to create a feature-rich blog using Next.js 14 with the App Router and Prisma ORM.",
      blogId: blog1.id,
    },
    {
      type: "subheading",
      content: "Why Next.js and Prisma?",
      blogId: blog1.id,
    },
    {
      type: "text",
      content:
        "Next.js provides excellent performance with server-side rendering and static generation, while Prisma offers type-safe database queries and migrations. Together, they create a powerful stack for modern web applications.",
      blogId: blog1.id,
    },
    {
      type: "code",
      content: `// prisma/schema.prisma
model Blog {
  id          String   @id @default(cuid())
  title       String
  content     String
  authorId    String
  author      Author   @relation(fields: [authorId], references: [id])
  createdAt   DateTime @default(now())
}`,
      language: "prisma",
      blogId: blog1.id,
    },
    {
      type: "text",
      content:
        "The schema above shows a simple blog model with relationships. Prisma makes it easy to work with relational data in a type-safe manner.",
      blogId: blog1.id,
    },
    {
      type: "quote",
      content:
        "The best way to learn is by building. Start small, iterate often, and don't be afraid to experiment.",
      blogId: blog1.id,
    },
  ]);

  // Create Blog 2
  const [blog2] = await db
    .insert(blogs)
    .values({
      slug: "mastering-react-hooks-2024",
      title: "Mastering React Hooks in 2024",
      summary:
        "Dive deep into React Hooks and learn advanced patterns for building efficient and maintainable React applications. From useState to custom hooks.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      category: "React",
      readTime: 12,
      featured: true,
      authorId: author2.id,
    })
    .returning();

  await db.insert(blogsToTags).values([
    { blogId: blog2.id, tagId: tagReact.id },
    { blogId: blog2.id, tagId: tagTypeScript.id },
    { blogId: blog2.id, tagId: tagWebDev.id },
  ]);

  await db.insert(contentBlocks).values([
    {
      type: "heading",
      content: "Understanding React Hooks",
      blogId: blog2.id,
    },
    {
      type: "text",
      content:
        "React Hooks revolutionized how we write React components. They allow us to use state and other React features without writing classes.",
      blogId: blog2.id,
    },
    {
      type: "subheading",
      content: "The useState Hook",
      blogId: blog2.id,
    },
    {
      type: "code",
      content: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
      language: "typescript",
      blogId: blog2.id,
    },
    {
      type: "text",
      content:
        "The useState hook is the foundation of state management in functional components. It returns a state value and a function to update it.",
      blogId: blog2.id,
    },
  ]);

  const [blog3] = await db
    .insert(blogs)
    .values({
      slug: "getting-started-with-docker",
      title: "Getting Started with Docker",
      summary:
        "A beginner's guide to containerization with Docker. Learn how to create, manage, and deploy containers for your applications.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      category: "DevOps",
      readTime: 10,
      featured: false,
      authorId: author3.id,
    })
    .returning();

  await db.insert(blogsToTags).values([
    { blogId: blog3.id, tagId: tagDocker.id },
    { blogId: blog3.id, tagId: tagDevOps.id },
    { blogId: blog3.id, tagId: tagCloud.id },
  ]);

  await db.insert(contentBlocks).values([
    { type: "heading", content: "What is Docker?", blogId: blog3.id },
    {
      type: "text",
      content:
        "Docker is a platform that enables developers to automate the deployment of applications inside lightweight, portable containers.",
      blogId: blog3.id,
    },
    { type: "subheading", content: "Installing Docker", blogId: blog3.id },
    {
      type: "text",
      content:
        "To get started with Docker, you'll need to install it on your local machine. Visit the official Docker website to download the installer for your operating system.",
      blogId: blog3.id,
    },
    {
      type: "code",
      content: `# For Ubuntu
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io`,
      language: "bash",
      blogId: blog3.id,
    },
    {
      type: "text",
      content:
        "Once installed, you can verify the installation by running 'docker --version' in your terminal.",
      blogId: blog3.id,
    },
  ]);

  console.log("✅ Created blog posts with content blocks");
  console.log("\n🎉 Database seeded successfully!");
  console.log("\nCreated:");
  console.log(`  - 3 authors`);
  console.log(`  - 10 tags`);
  console.log(`  - 3 blog posts (add more as needed)`);
  console.log(`  - Multiple content blocks per post`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
