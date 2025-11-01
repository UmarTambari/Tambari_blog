"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewAuthorHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-3xl">
        <Link href="/admin/authors">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Authors
          </Button>
        </Link>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
            <CardTitle className="text-2xl">Create New Author</CardTitle>
            <CardDescription>Add a new author to your blog</CardDescription>
          </CardHeader>
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
