ALTER TABLE "blogs_to_tags" RENAME COLUMN "blog_id" TO "blogId";--> statement-breakpoint
ALTER TABLE "blogs_to_tags" RENAME COLUMN "tag_id" TO "tagId";--> statement-breakpoint
ALTER TABLE "blogs_to_tags" DROP CONSTRAINT "blogs_to_tags_blog_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs_to_tags" DROP CONSTRAINT "blogs_to_tags_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "authors" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "authors" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "authors" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "authors" ALTER COLUMN "avatar" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "authors" ALTER COLUMN "bio" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "slug" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "title" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "summary" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "image" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "category" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "author_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "content_blocks" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "content_blocks" ALTER COLUMN "content" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "content_blocks" ALTER COLUMN "alt" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "content_blocks" ALTER COLUMN "language" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "content_blocks" ALTER COLUMN "blog_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "user_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "blogs_to_tags" ADD CONSTRAINT "blogs_to_tags_blogId_blogs_id_fk" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs_to_tags" ADD CONSTRAINT "blogs_to_tags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;