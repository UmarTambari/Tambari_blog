// app/admin/tags/page.tsx
import { Suspense } from "react";
import { TagsHeader } from "./components/TagsHeader";
import { TagsTable } from "./components/TagsTable";
import { TagsTableSkeleton } from "./components/TagsTableSkeleton";

export const metadata = {
  title: "Tags Management | Admin Dashboard",
  description: "Manage blog tags",
};

export default function TagsPage() {
  return (
    <div className="space-y-6 p-6">
      <TagsHeader />
      <Suspense fallback={<TagsTableSkeleton />}>
        <TagsTable />
      </Suspense>
    </div>
  );
}
