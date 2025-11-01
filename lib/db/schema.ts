import {
  pgTable,
  timestamp,
  integer,
  boolean,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const contentTypeEnum = pgEnum("content_type", [
  "heading",
  "subheading",
  "text",
  "image",
  "code",
  "quote",
]);

export const statusEnum = pgEnum("status", ["draft", "published"]);

export const roleEnum = pgEnum("role", ["admin", "editor", "viewer"]);

// Tables
export const authors = pgTable("authors", {
  id: varchar()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  avatar: varchar(),
  bio: varchar(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogs = pgTable("blogs", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: varchar().notNull().unique(),
  title: varchar().notNull(),
  summary: varchar().notNull(),
  image: varchar().notNull(),
  status: statusEnum().default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  category: varchar(),
  readTime: integer("read_time"),
  featured: boolean().default(false).notNull(),
  authorId: varchar().references(() => authors.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name").notNull().unique(),
});

export const contentBlocks = pgTable("content_blocks", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: contentTypeEnum("type").notNull(),
  content: varchar("content").notNull(),
  alt: varchar("alt"),
  language: varchar("language"),
  order: integer("order").notNull().default(0),
  blogId: varchar("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRoles = pgTable("user_roles", {
  id: varchar()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id").notNull().unique(), // This references auth.users(id) in Supabase
  role: roleEnum("role").default("viewer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Junction table for many-to-many relationship
export const blogsToTags = pgTable("blogs_to_tags", {
  blogId: varchar()
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  tagId: varchar()
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
});

// Relations
export const authorsRelations = relations(authors, ({ many }) => ({
  blogs: many(blogs),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  author: one(authors, {
    fields: [blogs.authorId],
    references: [authors.id],
  }),
  contentBlocks: many(contentBlocks),
  blogsToTags: many(blogsToTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  blogsToTags: many(blogsToTags),
}));

export const contentBlocksRelations = relations(contentBlocks, ({ one }) => ({
  blog: one(blogs, {
    fields: [contentBlocks.blogId],
    references: [blogs.id],
  }),
}));

export const blogsToTagsRelations = relations(blogsToTags, ({ one }) => ({
  blog: one(blogs, {
    fields: [blogsToTags.blogId],
    references: [blogs.id],
  }),
  tag: one(tags, {
    fields: [blogsToTags.tagId],
    references: [tags.id],
  }),
}));

export const userRolesRelations = relations(userRoles, ({ many }) => ({
  userRoles: many(userRoles),
}));
