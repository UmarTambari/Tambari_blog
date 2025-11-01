"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Posts
        </h1>
        <p className="text-gray-600">Manage your blog posts and content</p>
      </div>

      <Link href="/admin/posts/new">
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </Link>
    </div>
  );
}
