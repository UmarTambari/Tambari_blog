"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AuthorsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Authors
        </h1>
        <p className="text-gray-600">Manage your blog authors and contributors</p>
      </div>

      <Link href="/admin/authors/new">
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Author
        </Button>
      </Link>
    </div>
  );
}
