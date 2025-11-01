import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Plus, Eye } from "lucide-react";

type RecentPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: Date | string;
  category: string | null;
  authorName: string | null;
}

export default function RecentPostsTable({
  recentPosts,
}: {
  recentPosts: RecentPost[];
}) {
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Recent Posts</CardTitle>
            <CardDescription>
              Your latest blog posts at a glance
            </CardDescription>
          </div>
          <Link href="/admin/posts">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {recentPosts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first blog post
            </p>
            <Link href="/admin/posts/new">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%] text-gray-700 font-semibold">
                  Title
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Author
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Category
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Date
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-right text-gray-700 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium truncate max-w-xs">
                    {post.title}
                  </TableCell>
                  <TableCell>{post.authorName || "Unknown"}</TableCell>
                  <TableCell className="text-blue-600">
                    {post.category || "--"}
                  </TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
                  <TableCell className="text-right">
                    <Link href={`/posts/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-4 h-4 p-0 mr-3 transparent" variant="outline" size="sm">
                        <Eye />
                      </Button>
                    </Link>
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
