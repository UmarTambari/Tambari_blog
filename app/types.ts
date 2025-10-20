export type Tag = {
  id: string;
  name: string;
};

export type Author = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthorCardProps = {
  author: {
    id: string;
    name: string;
    email?: string | null;
    avatar?: string | null;
    bio?: string | null;
    createdAt: Date;
    blogs: Array<{
      id: string;
      readTime?: number | null;
      tags?: Array<{ name: string }> | null;
    }>;
  };
}

export type ContentBlock = {
  id: string;
  type: "heading" | "subheading" | "text" | "image" | "code" | "quote";
  content: string;
  alt?: string | null;
  language?: string | null;
  blogId: string;
  createdAt: Date;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  publishedAt: Date;
  category?: string | null;
  tags?: Tag[];
  readTime?: number | null;
  featured: boolean;
  authorId?: string | null;
  author?: Author | null;
  contentBlocks?: ContentBlock[];
  createdAt: Date;
  updatedAt: Date;
};

export type BlogCardProps = {
  blog: Blog;
  className?: string;
  onClick?: () => void;
};