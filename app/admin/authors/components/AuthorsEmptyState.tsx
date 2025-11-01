"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus, Plus } from "lucide-react";

export default function AuthorsEmptyState() {
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="py-16 text-center">
        <UserPlus className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No authors yet</h3>
        <p className="text-gray-500 mb-6">Get started by adding your first author</p>

        <Link href="/admin/authors/new">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add First Author
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
