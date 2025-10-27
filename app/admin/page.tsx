import { db } from "@/lib/db";
import { blogs, authors, tags } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import { FileText, Users, Tags as TagsIcon, Clock } from "lucide-react";
import StatCard from "@/app/admin/Components/StatCard";


export default async function AdminDashboard() {
  // Fetch statistics
  const [totalBlogs] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(blogs);

  const [publishedBlogs] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(blogs)
    .where(eq(blogs.status, "published"));

  const [draftBlogs] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(blogs)
    .where(eq(blogs.status, "draft"));

  const [totalAuthors] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(authors);

  const [totalTags] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(tags);

  // Fetch recent blogs
  const recentBlogs = await db
    .select({
      id: blogs.id,
      title: blogs.title,
      status: blogs.status,
      createdAt: blogs.createdAt,
      authorName: authors.name,
    })
    .from(blogs)
    .leftJoin(authors, eq(blogs.authorId, authors.id))
    .orderBy(desc(blogs.createdAt))
    .limit(5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your blog content
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Blogs"
          value={totalBlogs.count}
          icon={FileText}
          color="bg-blue-600"
        />
        <StatCard
          title="Published"
          value={publishedBlogs.count}
          icon={FileText}
          color="bg-green-600"
        />
        <StatCard
          title="Drafts"
          value={draftBlogs.count}
          icon={Clock}
          color="bg-yellow-600"
        />
        <StatCard
          title="Authors"
          value={totalAuthors.count}
          icon={Users}
          color="bg-purple-600"
        />
      </div>

      {/* Recent Blogs Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Blogs
          </h2>
          <Link
            href="/admin/blogs"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No blogs yet. Create your first blog!
                  </td>
                </tr>
              ) : (
                recentBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {blog.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {blog.authorName || "No author"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/blogs/new"
          className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <FileText className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            New Blog Post
          </h3>
          <p className="text-sm text-gray-600">
            Create and publish a new blog article
          </p>
        </Link>

        <Link
          href="/admin/authors"
          className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:border-purple-300 hover:shadow-md transition-all"
        >
          <Users className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Manage Authors
          </h3>
          <p className="text-sm text-gray-600">
            Add or edit blog authors
          </p>
        </Link>

        <Link
          href="/admin/tags"
          className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:border-green-300 hover:shadow-md transition-all"
        >
          <TagsIcon className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Manage Tags
          </h3>
          <p className="text-sm text-gray-600">
            Organize content with tags
          </p>
        </Link>
      </div>
    </div>
  );
}