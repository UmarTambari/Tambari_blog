ALTER TABLE "blogs" ALTER COLUMN "published_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "published_at" DROP NOT NULL;