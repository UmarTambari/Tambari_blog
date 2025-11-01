import { createClient } from "@/lib/supabase/server";
import { getAllAuthors } from "./data/getAllAuthors";
import AuthorsHeader from "./components/AuthorsHeader";
import AuthorsStats from "./components/AuthorsStats";
import AuthorsEmptyState from "./components/AuthorsEmptyState";
import AuthorsGrid from "./components/AuthorsGrid";

export default async function AuthorsPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const allAuthors = await getAllAuthors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <AuthorsHeader />

        <AuthorsStats totalAuthors={allAuthors.length} />

        {allAuthors.length === 0 ? (
          <AuthorsEmptyState />
        ) : (
          <AuthorsGrid authors={allAuthors} />
        )}
      </div>
    </div>
  );
}
