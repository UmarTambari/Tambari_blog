import { 
  authors, 
  blogs, 
  tags, 
  contentBlocks,
} from "@/lib/db/schema";
import { z } from "zod";

// Base types inferred from Drizzle schema
export type Author = typeof authors.$inferSelect;
export type Blog = typeof blogs.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type UserRole = 'admin' | 'editor' | 'viewer';
// Insert types (useful for forms)
export type NewAuthor = typeof authors.$inferInsert;
export type NewBlog = typeof blogs.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewContentBlock = typeof contentBlocks.$inferInsert;

// Extended types with relations for your components

// Blog with all relations populated
export type BlogWithRelations = Blog & {
  author: Author | null;
  tags: Tag[];
  contentBlocks: ContentBlock[];
};

// Author with blogs and their tags
export type AuthorWithBlogs = Author & {
  blogs: Array<Blog & { tags: Tag[] }>;
};

// Admin-specific types
export type BlogWithAuthor = Blog & {
  author: Author | null;
};

export type BlogListItem = Pick<
  Blog,
  "id" | "title" | "slug" | "status" | "featured" | "publishedAt" | "createdAt" | "updatedAt"
> & {
  author: Pick<Author, "id" | "name"> | null;
  _count?: {
    contentBlocks: number;
    tags: number;
  };
};

// Form types for admin
export type BlogFormData = {
  title: string;
  slug: string;
  summary: string;
  image: string;
  category: string | null;
  featured: boolean;
  status: "draft" | "published";
  authorId: string | null;
  tagIds: string[];
  contentBlocks: Array<{
    id?: string;
    type: "heading" | "subheading" | "text" | "image" | "code" | "quote";
    content: string;
    alt?: string | null;
    language?: string | null;
    order: number;
  }>;
};

export type AuthorFormData = {
  name: string;
  email: string;
  avatar?: string | null;
  bio?: string | null;
};

export type TagFormData = {
  name: string;
};

// Component prop types
export type BlogCardProps = {
  blog: Blog & {
    author?: Author | null;
    tags?: Tag[];
    contentBlocks?: ContentBlock[];
  };
  className?: string;
  onClick?: () => void;
};

export type AuthorCardProps = {
  author: Author & {
    blogs: Array<{
      id: string;
      readTime: number | null;
      tags?: Tag[];
    }>;
  };
};

export type StatCardProps = {
    title: string,
    value: number,
    icon: React.ElementType,
    color: string
}


export type DashboardStats = {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalAuthors: number;
  totalTags: number;
  recentBlogs: BlogListItem[];
};

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
