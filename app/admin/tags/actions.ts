// app/admin/tags/actions.ts
"use server";

import { db } from "@/lib/db";
import { tags, blogsToTags } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTag(name: string) {
  try {
    const existing = await db.query.tags.findFirst({
      where: eq(tags.name, name),
    });

    if (existing) {
      return {
        success: false,
        error: "Tag already exists",
      };
    }

    await db.insert(tags).values({ name });

    revalidatePath("/admin/tags");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error creating tag:", error);
    return {
      success: false,
      error: "Failed to create tag",
    };
  }
}

export async function updateTag(id: string, name: string) {
  try {
    const existing = await db.query.tags.findFirst({
      where: and(eq(tags.name, name), eq(tags.id, id)),
    });

    if (
      !existing &&
      (await db.query.tags.findFirst({
        where: eq(tags.name, name),
      }))
    ) {
      return {
        success: false,
        error: "Tag name already exists",
      };
    }

    await db.update(tags).set({ name }).where(eq(tags.id, id));

    revalidatePath("/admin/tags");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating tag:", error);
    return {
      success: false,
      error: "Failed to update tag",
    };
  }
}

export async function deleteTag(id: string) {
  try {
    await db.delete(blogsToTags).where(eq(blogsToTags.tagId, id));

    await db.delete(tags).where(eq(tags.id, id));

    revalidatePath("/admin/tags");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting tag:", error);
    return {
      success: false,
      error: "Failed to delete tag",
    };
  }
}
