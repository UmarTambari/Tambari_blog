import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
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

// Tables
export const authors = pgTable("authors", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogs = pgTable("blogs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  image: text("image").notNull(),
  status: statusEnum("status").default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  category: text("category"),
  readTime: integer("read_time"),
  featured: boolean("featured").default(false).notNull(),
  authorId: text("author_id").references(() => authors.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
});

export const contentBlocks = pgTable("content_blocks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: contentTypeEnum("type").notNull(),
  content: text("content").notNull(),
  alt: text("alt"),
  language: text("language"),
  order: integer("order").notNull().default(0),
  blogId: text("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Junction table for many-to-many relationship
export const blogsToTags = pgTable("blogs_to_tags", {
  blogId: text("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  tagId: text("tag_id")
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

export const adminUsersRelations = relations(adminUsers, ({ many }) => ({}));
