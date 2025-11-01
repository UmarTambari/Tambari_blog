import { db } from "@/lib/db";
import { tags, blogsToTags } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { TagsTableContent } from "./TagsTableContent";

export async function TagsTable() {
  const allTags = await db
    .select({
      id: tags.id,
      name: tags.name,
      count: sql<number>`COALESCE(COUNT(DISTINCT ${blogsToTags.blogId}), 0)`,
    })
    .from(tags)
    .leftJoin(
      blogsToTags,
      sql`${tags.id} = ${blogsToTags.tagId}`
    )
    .groupBy(tags.id)
    .orderBy(desc(sql`COUNT(DISTINCT ${blogsToTags.blogId})`));

  return <TagsTableContent initialTags={allTags} />;
}