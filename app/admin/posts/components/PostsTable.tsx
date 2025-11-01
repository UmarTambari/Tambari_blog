"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Eye, Edit, Plus } from "lucide-react";
import { DeletePostButton } from "./DeletePostButton";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string | null;
  featured: boolean | null;
  createdAt: string | Date;
  authorName: string | null;
};

export default function PostTable({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <div className="text-center py-16 px-4">
        <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-500 mb-6">
          Get started by creating your first blog post
        </p>
        <Link href="/admin/posts/new">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Author</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium max-w-xs">
                <div className="flex items-center gap-2">
                  {post.featured && (
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      ⭐
                    </Badge>
                  )}
                  <span className="truncate">{post.title}</span>
                </div>
              </TableCell>

              <TableCell className="text-gray-600">
                {post.authorName || "Unknown"}
              </TableCell>

              <TableCell>
                {post.category ? (
                  <Badge variant="secondary">{post.category}</Badge>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    post.status === "published" ? "default" : "secondary"
                  }
                  className={
                    post.status === "published"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {post.status}
                </Badge>
              </TableCell>

              <TableCell className="text-gray-600 text-sm">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/blogs/${post.slug}`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href={`/admin/posts/${post.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>

                  <DeletePostButton postId={post.id} postTitle={post.title} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
