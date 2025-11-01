import { createClient } from "@/lib/supabase/server";
import NewAuthorHeader from "../components/NewAuthorHeader";
import { AuthorForm } from "@/app/admin/authors/components/AuthorForm";

export default async function NewAuthorPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <NewAuthorHeader>
      <AuthorForm />
    </NewAuthorHeader>
  );
}
