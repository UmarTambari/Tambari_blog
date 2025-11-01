import { createClient } from "@/lib/supabase/server";
import { getAllPosts } from "./data/getAllPosts";
import AdminHeader from "./components/PostsHeader";
import PostsStats from "./components/PostsStats";
import PostsWrapper from "./components/PostsWrapper";
import PostsTable from "./components/PostsTable";

export default async function PostsPage() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }

  const { posts, counts } = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <AdminHeader />
        <PostsStats counts={counts} />
        <PostsWrapper>
          <PostsTable posts={posts} />
        </PostsWrapper>
      </div>
    </div>
  );
}
