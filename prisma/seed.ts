import { PrismaClient, ContentType } from "../lib/generated/prisma/index.js";


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.contentBlock.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.author.deleteMany();

  // Create Authors
  const author1 = await prisma.author.create({
    data: {
      name: "John Doe",
      email: "john.doe@techblog.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      bio: "Full-stack developer passionate about web technologies, AI, and building scalable applications. 10+ years of experience in the tech industry.",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@techblog.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      bio: "Tech writer and software architect specializing in cloud computing and DevOps. Love sharing knowledge through writing.",
    },
  });

  const author3 = await prisma.author.create({
    data: {
      name: "Mike Johnson",
      email: "mike.johnson@techblog.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      bio: "Data scientist and machine learning enthusiast. Exploring the intersection of AI and real-world applications.",
    },
  });

  console.log("✅ Created 3 authors");

  // Create Tags
  const tagWebDev = await prisma.tag.create({ data: { name: "Web Development" } });
  const tagNextJS = await prisma.tag.create({ data: { name: "Next.js" } });
  const tagPrisma = await prisma.tag.create({ data: { name: "Prisma" } });
  const tagReact = await prisma.tag.create({ data: { name: "React" } });
  const tagTypeScript = await prisma.tag.create({ data: { name: "TypeScript" } });
  const tagAI = await prisma.tag.create({ data: { name: "AI" } });
  const tagCloud = await prisma.tag.create({ data: { name: "Cloud Computing" } });
  const tagDevOps = await prisma.tag.create({ data: { name: "DevOps" } });
  const tagDocker = await prisma.tag.create({ data: { name: "Docker" } });
  const tagPython = await prisma.tag.create({ data: { name: "Python" } });

  console.log("✅ Created 10 tags");

  // Create Blog 1
  const blog1 = await prisma.blog.create({
    data: {
      slug: "building-a-blog-with-nextjs-and-prisma",
      title: "Building a Blog with Next.js and Prisma",
      summary: "Learn how to create a fully functional blog using Next.js, Prisma, and SQLite. This comprehensive guide covers everything from setup to deployment.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      category: "Web Development",
      readTime: 8,
      featured: true,
      authorId: author1.id,
      tags: {
        connect: [
          { id: tagWebDev.id },
          { id: tagNextJS.id },
          { id: tagPrisma.id },
          { id: tagTypeScript.id },
        ],
      },
      contentBlocks: {
        create: [
          {
            type: "heading",
            content: "Introduction",
          },
          {
            type: "text",
            content: "Building a modern blog requires the right tools and technologies. In this tutorial, we'll explore how to create a feature-rich blog using Next.js 14 with the App Router and Prisma ORM.",
          },
          {
            type: "subheading",
            content: "Why Next.js and Prisma?",
          },
          {
            type: "text",
            content: "Next.js provides excellent performance with server-side rendering and static generation, while Prisma offers type-safe database queries and migrations. Together, they create a powerful stack for modern web applications.",
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
          },
          {
            type: "text",
            content: "The schema above shows a simple blog model with relationships. Prisma makes it easy to work with relational data in a type-safe manner.",
          },
          {
            type: "quote",
            content: "The best way to learn is by building. Start small, iterate often, and don't be afraid to experiment.",
          },
        ],
      },
    },
  });

  // Create Blog 2
  const blog2 = await prisma.blog.create({
    data: {
      slug: "mastering-react-hooks-2024",
      title: "Mastering React Hooks in 2024",
      summary: "Dive deep into React Hooks and learn advanced patterns for building efficient and maintainable React applications. From useState to custom hooks.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      category: "React",
      readTime: 12,
      featured: true,
      authorId: author2.id,
      tags: {
        connect: [
          { id: tagReact.id },
          { id: tagTypeScript.id },
          { id: tagWebDev.id },
        ],
      },
      contentBlocks: {
        create: [
          {
            type: "heading",
            content: "Understanding React Hooks",
          },
          {
            type: "text",
            content: "React Hooks revolutionized how we write React components. They allow us to use state and other React features without writing classes.",
          },
          {
            type: "subheading",
            content: "The useState Hook",
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
          },
          {
            type: "text",
            content: "The useState hook is the foundation of state management in functional components. It returns a state value and a function to update it.",
          },
          {
            type: "subheading",
            content: "Creating Custom Hooks",
          },
          {
            type: "text",
            content: "Custom hooks let you extract component logic into reusable functions. They're a powerful way to share stateful logic between components.",
          },
          {
            type: "code",
            content: `function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
            language: "typescript",
          },
        ],
      },
    },
  });

  // Create Blog 3
  const blog3 = await prisma.blog.create({
    data: {
      slug: "introduction-to-machine-learning-python",
      title: "Introduction to Machine Learning with Python",
      summary: "Start your journey into machine learning with Python. Learn the fundamentals, essential libraries, and build your first ML model.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      category: "AI & Machine Learning",
      readTime: 15,
      featured: false,
      authorId: author3.id,
      tags: {
        connect: [
          { id: tagAI.id },
          { id: tagPython.id },
        ],
      },
      contentBlocks: {
        create: [
          {
            type: "heading",
            content: "Getting Started with Machine Learning",
          },
          {
            type: "text",
            content: "Machine learning is transforming industries worldwide. Python, with its rich ecosystem of libraries, is the perfect language to start your ML journey.",
          },
          {
            type: "subheading",
            content: "Essential Python Libraries",
          },
          {
            type: "text",
            content: "Before diving into ML, you'll need to familiarize yourself with key libraries: NumPy for numerical computing, Pandas for data manipulation, and Scikit-learn for machine learning algorithms.",
          },
          {
            type: "code",
            content: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Load and prepare data
data = pd.read_csv('data.csv')
X = data[['feature1', 'feature2']]
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)`,
            language: "python",
          },
          {
            type: "quote",
            content: "Machine learning is not just about algorithms; it's about understanding your data and asking the right questions.",
          },
        ],
      },
    },
  });

  // Create Blog 4
  const blog4 = await prisma.blog.create({
    data: {
      slug: "docker-kubernetes-complete-guide",
      title: "Docker and Kubernetes: A Complete Guide",
      summary: "Master containerization with Docker and orchestration with Kubernetes. Learn how to deploy scalable applications in production.",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
      category: "DevOps",
      readTime: 10,
      featured: false,
      authorId: author2.id,
      tags: {
        connect: [
          { id: tagDevOps.id },
          { id: tagDocker.id },
          { id: tagCloud.id },
        ],
      },
      contentBlocks: {
        create: [
          {
            type: "heading",
            content: "Understanding Containerization",
          },
          {
            type: "text",
            content: "Containers have revolutionized how we deploy applications. They provide consistency across different environments and make scaling easier.",
          },
          {
            type: "subheading",
            content: "Creating Your First Dockerfile",
          },
          {
            type: "code",
            content: `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`,
            language: "dockerfile",
          },
          {
            type: "text",
            content: "This Dockerfile creates a container for a Node.js application. Each instruction creates a layer, and Docker caches these layers for faster builds.",
          },
        ],
      },
    },
  });

  // Create Blog 5
  const blog5 = await prisma.blog.create({
    data: {
      slug: "typescript-best-practices-2024",
      title: "TypeScript Best Practices for 2024",
      summary: "Write better TypeScript code with these proven best practices. Improve type safety, maintainability, and developer experience.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
      category: "TypeScript",
      readTime: 7,
      featured: false,
      authorId: author1.id,
      tags: {
        connect: [
          { id: tagTypeScript.id },
          { id: tagWebDev.id },
        ],
      },
      contentBlocks: {
        create: [
          {
            type: "heading",
            content: "Writing Better TypeScript",
          },
          {
            type: "text",
            content: "TypeScript adds powerful type checking to JavaScript, but using it effectively requires following best practices and understanding its features.",
          },
          {
            type: "subheading",
            content: "Use Strict Mode",
          },
          {
            type: "code",
            content: `// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}`,
            language: "json",
          },
          {
            type: "quote",
            content: "Strong typing is not about restrictions; it's about clarity and confidence in your code.",
          },
        ],
      },
    },
  });

  console.log("✅ Created 5 blog posts with content blocks");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\nCreated:");
  console.log(`  - ${3} authors`);
  console.log(`  - ${10} tags`);
  console.log(`  - ${5} blog posts`);
  console.log(`  - Multiple content blocks per post`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });