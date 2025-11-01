"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewPostHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-5xl">
        <Link href="/admin/posts">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </Link>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-2xl">Create New Post</CardTitle>
            <CardDescription>Write and publish a new blog post</CardDescription>
          </CardHeader>

          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
