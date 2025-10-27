import "dotenv/config";
import { db } from "./index";
import { authors, blogs, tags, contentBlocks, blogsToTags, adminUsers } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // 1. Create Authors
    console.log("👤 Creating authors...");
    const authorData = [
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        bio: "Full-stack developer passionate about web technologies and open source. Love building scalable applications with Next.js and PostgreSQL.",
      },
      {
        name: "Michael Chen",
        email: "michael.chen@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        bio: "DevOps engineer and cloud architecture enthusiast. Specializing in AWS, Kubernetes, and infrastructure as code.",
      },
      {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        bio: "UI/UX designer turned frontend developer. Creating beautiful, accessible interfaces with React and TypeScript.",
      },
    ];

    const insertedAuthors = await db.insert(authors).values(authorData).returning();
    console.log(`✅ Created ${insertedAuthors.length} authors`);

    // 2. Create Tags
    console.log("🏷️  Creating tags...");
    const tagData = [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "PostgreSQL" },
      { name: "DevOps" },
      { name: "AWS" },
      { name: "UI/UX" },
      { name: "Performance" },
      { name: "Tutorial" },
      { name: "Best Practices" },
    ];

    const insertedTags = await db.insert(tags).values(tagData).returning();
    console.log(`✅ Created ${insertedTags.length} tags`);

    // 3. Create Blogs
    console.log("📝 Creating blogs...");
    const blogData = [
      {
        slug: "getting-started-with-nextjs-14",
        title: "Getting Started with Next.js 14: A Complete Guide",
        summary: "Learn how to build modern web applications with Next.js 14, including server components, app router, and best practices for production-ready apps.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        status: "published" as const,
        publishedAt: new Date("2024-10-15"),
        category: "Web Development",
        readTime: 12,
        featured: true,
        authorId: insertedAuthors[0].id,
      },
      {
        slug: "mastering-postgresql-performance",
        title: "Mastering PostgreSQL Performance: Indexing Strategies",
        summary: "Deep dive into PostgreSQL indexing strategies, query optimization, and performance tuning techniques for high-traffic applications.",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        status: "published" as const,
        publishedAt: new Date("2024-10-20"),
        category: "Database",
        readTime: 15,
        featured: true,
        authorId: insertedAuthors[0].id,
      },
      {
        slug: "kubernetes-deployment-guide",
        title: "Complete Kubernetes Deployment Guide for Node.js Apps",
        summary: "Step-by-step guide to deploying Node.js applications on Kubernetes, including configuration, scaling, and monitoring best practices.",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
        status: "published" as const,
        publishedAt: new Date("2024-10-22"),
        category: "DevOps",
        readTime: 20,
        featured: false,
        authorId: insertedAuthors[1].id,
      },
      {
        slug: "react-design-patterns-2024",
        title: "Modern React Design Patterns You Should Know in 2024",
        summary: "Explore essential React design patterns including compound components, render props, custom hooks, and the latest patterns for React 18+.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        status: "published" as const,
        publishedAt: new Date("2024-10-25"),
        category: "Frontend",
        readTime: 10,
        featured: false,
        authorId: insertedAuthors[2].id,
      },
      {
        slug: "building-accessible-web-apps",
        title: "Building Accessible Web Applications: A Practical Guide",
        summary: "Learn how to create inclusive web experiences with proper semantic HTML, ARIA labels, keyboard navigation, and screen reader support.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
        status: "draft" as const,
        publishedAt: null,
        category: "Accessibility",
        readTime: 8,
        featured: false,
        authorId: insertedAuthors[2].id,
      },
    ];

    const insertedBlogs = await db.insert(blogs).values(blogData).returning();
    console.log(`✅ Created ${insertedBlogs.length} blogs`);

    // 4. Create Content Blocks for each blog
    console.log("📄 Creating content blocks...");
    
    // Content for Blog 1 - Next.js Guide
    const blog1Content = [
      {
        type: "heading" as const,
        content: "Introduction to Next.js 14",
        order: 0,
        blogId: insertedBlogs[0].id,
      },
      {
        type: "text" as const,
        content: "Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. The new App Router provides a more intuitive way to structure your application, while Server Components offer unprecedented performance improvements.",
        order: 1,
        blogId: insertedBlogs[0].id,
      },
      {
        type: "subheading" as const,
        content: "Key Features",
        order: 2,
        blogId: insertedBlogs[0].id,
      },
      {
        type: "text" as const,
        content: "The App Router brings several advantages: automatic code splitting, streaming server rendering, and simplified data fetching. These features work together to create faster, more efficient applications.",
        order: 3,
        blogId: insertedBlogs[0].id,
      },
      {
        type: "code" as const,
        content: `// app/page.tsx - Server Component by default
export default async function Home() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  
  return (
    <main>
      <h1>My Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </main>
  );
}`,
        language: "typescript",
        order: 4,
        blogId: insertedBlogs[0].id,
      },
      {
        type: "quote" as const,
        content: "Next.js 14 makes building production-ready applications easier than ever before.",
        order: 5,
        blogId: insertedBlogs[0].id,
      },
    ];

    // Content for Blog 2 - PostgreSQL
    const blog2Content = [
      {
        type: "heading" as const,
        content: "Understanding Database Indexes",
        order: 0,
        blogId: insertedBlogs[1].id,
      },
      {
        type: "text" as const,
        content: "Database indexes are crucial for query performance, but they come with tradeoffs. Understanding when and how to use them is essential for building scalable applications.",
        order: 1,
        blogId: insertedBlogs[1].id,
      },
      {
        type: "code" as const,
        content: `-- Create a B-tree index on frequently queried columns
CREATE INDEX idx_users_email ON users(email);

-- Create a composite index for multi-column queries
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at DESC);

-- Create a partial index for specific conditions
CREATE INDEX idx_active_users ON users(email) WHERE active = true;`,
        language: "sql",
        order: 2,
        blogId: insertedBlogs[1].id,
      },
    ];

    // Content for Blog 3 - Kubernetes
    const blog3Content = [
      {
        type: "heading" as const,
        content: "Deploying Node.js Apps to Kubernetes",
        order: 0,
        blogId: insertedBlogs[2].id,
      },
      {
        type: "text" as const,
        content: "Kubernetes provides powerful orchestration capabilities for containerized applications. In this guide, we'll walk through deploying a Node.js application with proper configuration for production environments.",
        order: 1,
        blogId: insertedBlogs[2].id,
      },
      {
        type: "code" as const,
        content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs-app
  template:
    metadata:
      labels:
        app: nodejs-app
    spec:
      containers:
      - name: nodejs-app
        image: myregistry/nodejs-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: production`,
        language: "yaml",
        order: 2,
        blogId: insertedBlogs[2].id,
      },
    ];

    // Content for Blog 4 - React Patterns
    const blog4Content = [
      {
        type: "heading" as const,
        content: "Compound Components Pattern",
        order: 0,
        blogId: insertedBlogs[3].id,
      },
      {
        type: "text" as const,
        content: "The compound components pattern allows you to create flexible and reusable component APIs. This pattern is used extensively in popular libraries like Reach UI and Radix UI.",
        order: 1,
        blogId: insertedBlogs[3].id,
      },
      {
        type: "code" as const,
        content: `// Compound Component Example
function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: index === openIndex,
          onToggle: () => setOpenIndex(index === openIndex ? null : index),
        })
      )}
    </div>
  );
}

Accordion.Item = function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="accordion-item">
      <button onClick={onToggle}>{title}</button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};`,
        language: "typescript",
        order: 2,
        blogId: insertedBlogs[3].id,
      },
    ];

    // Content for Blog 5 - Accessibility
    const blog5Content = [
      {
        type: "heading" as const,
        content: "Why Accessibility Matters",
        order: 0,
        blogId: insertedBlogs[4].id,
      },
      {
        type: "text" as const,
        content: "Building accessible web applications isn't just about compliance—it's about creating inclusive experiences for everyone. Approximately 15% of the world's population lives with some form of disability, and good accessibility benefits all users.",
        order: 1,
        blogId: insertedBlogs[4].id,
      },
      {
        type: "subheading" as const,
        content: "Semantic HTML First",
        order: 2,
        blogId: insertedBlogs[4].id,
      },
      {
        type: "text" as const,
        content: "The foundation of accessible web apps is proper semantic HTML. Use the right elements for the job: buttons for actions, links for navigation, and proper heading hierarchy.",
        order: 3,
        blogId: insertedBlogs[4].id,
      },
    ];

    const allContentBlocks = [
      ...blog1Content,
      ...blog2Content,
      ...blog3Content,
      ...blog4Content,
      ...blog5Content,
    ];

    await db.insert(contentBlocks).values(allContentBlocks);
    console.log(`✅ Created ${allContentBlocks.length} content blocks`);

    // 5. Create Blog-Tag Relationships
    console.log("🔗 Creating blog-tag relationships...");
    const blogTagRelations = [
      // Blog 1 - Next.js Guide
      { blogId: insertedBlogs[0].id, tagId: insertedTags[0].id }, // Next.js
      { blogId: insertedBlogs[0].id, tagId: insertedTags[1].id }, // TypeScript
      { blogId: insertedBlogs[0].id, tagId: insertedTags[2].id }, // React
      { blogId: insertedBlogs[0].id, tagId: insertedTags[8].id }, // Tutorial
      
      // Blog 2 - PostgreSQL
      { blogId: insertedBlogs[1].id, tagId: insertedTags[3].id }, // PostgreSQL
      { blogId: insertedBlogs[1].id, tagId: insertedTags[7].id }, // Performance
      { blogId: insertedBlogs[1].id, tagId: insertedTags[9].id }, // Best Practices
      
      // Blog 3 - Kubernetes
      { blogId: insertedBlogs[2].id, tagId: insertedTags[4].id }, // DevOps
      { blogId: insertedBlogs[2].id, tagId: insertedTags[5].id }, // AWS
      { blogId: insertedBlogs[2].id, tagId: insertedTags[8].id }, // Tutorial
      
      // Blog 4 - React Patterns
      { blogId: insertedBlogs[3].id, tagId: insertedTags[2].id }, // React
      { blogId: insertedBlogs[3].id, tagId: insertedTags[1].id }, // TypeScript
      { blogId: insertedBlogs[3].id, tagId: insertedTags[9].id }, // Best Practices
      
      // Blog 5 - Accessibility
      { blogId: insertedBlogs[4].id, tagId: insertedTags[6].id }, // UI/UX
      { blogId: insertedBlogs[4].id, tagId: insertedTags[9].id }, // Best Practices
    ];

    await db.insert(blogsToTags).values(blogTagRelations);
    console.log(`✅ Created ${blogTagRelations.length} blog-tag relationships`);

    // 6. Create Admin User (with hashed password in real app!)
    console.log("👨‍💼 Creating admin user...");
    const adminData = {
      email: "admin@yourblog.com",
      password: "CHANGE_THIS_PASSWORD", // In production, use bcrypt to hash this!
      name: "Blog Administrator",
    };

    await db.insert(adminUsers).values(adminData);
    console.log("✅ Created admin user");

    console.log("\n🎉 Seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${insertedAuthors.length} authors`);
    console.log(`   - ${insertedTags.length} tags`);
    console.log(`   - ${insertedBlogs.length} blogs`);
    console.log(`   - ${allContentBlocks.length} content blocks`);
    console.log(`   - ${blogTagRelations.length} blog-tag relationships`);
    console.log(`   - 1 admin user`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
seed()
  .catch((error) => {
    console.error("Fatal error during seeding:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });