ALTER TABLE "blogs" RENAME COLUMN "author_id" TO "authorId";--> statement-breakpoint
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_author_id_authors_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_authorId_authors_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;