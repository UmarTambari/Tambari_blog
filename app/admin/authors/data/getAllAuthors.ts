import { db } from "@/lib/db";
import { authors } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function getAllAuthors() {

  const allAuthors = await db
    .select({
      id: authors.id,
      name: authors.name,
      email: authors.email,
      avatar: authors.avatar,
      bio: authors.bio,
      createdAt: authors.createdAt,
      updatedAt: authors.updatedAt,
    })
    .from(authors)
    .orderBy(desc(authors.createdAt));

  return allAuthors;
}
