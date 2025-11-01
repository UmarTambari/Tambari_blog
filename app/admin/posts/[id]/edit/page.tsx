import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import {
  blogs,
  authors,
  tags,
  contentBlocks,
  blogsToTags,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PostForm } from "@/app/admin/posts/components/PostForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const [post] = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, params.id))
    .limit(1);

  if (!post) {
    notFound();
  }

  const blocks = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.blogId, params.id))
    .orderBy(contentBlocks.order);

  const postTags = await db
    .select({
      tagId: blogsToTags.tagId,
      tagName: tags.name,
    })
    .from(blogsToTags)
    .innerJoin(tags, eq(blogsToTags.tagId, tags.id))
    .where(eq(blogsToTags.blogId, params.id));

  // Fetch all authors and tags for dropdowns
  const allAuthors = await db.select().from(authors);
  const allTags = await db.select().from(tags);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-5xl">
        <Link href="/admin/posts">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </Link>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-2xl">Edit Post</CardTitle>
            <CardDescription>Update your blog post content</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <PostForm
              post={post}
              contentBlocks={blocks}
              postTags={postTags.map((t) => t.tagId)}
              authors={allAuthors}
              tags={allTags}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
