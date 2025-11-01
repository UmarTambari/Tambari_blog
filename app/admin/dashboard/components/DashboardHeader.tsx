import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here is what is happening with your blog.
        </p>
      </div>

      <Link href="/admin/posts/new">
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </Link>
    </div>
  );
}
