import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { authors, tags } from "@/lib/db/schema";
import { PostForm } from "../components/PostForm";
import NewPostHeader from "../components/NewPostHeader";

export default async function NewPostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch authors and tags for dropdowns
  const allAuthors = await db.select().from(authors);
  const allTags = await db.select().from(tags);

  return (
    <NewPostHeader>
      <PostForm authors={allAuthors} tags={allTags} />
    </NewPostHeader>
  );
}
