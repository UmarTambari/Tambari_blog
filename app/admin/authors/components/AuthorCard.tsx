"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteAuthorButton } from "./DeleteAuthorButton";
import {Author } from "@/app/types";

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="relative pb-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
            <AvatarImage src={author.avatar || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-2xl font-bold">
              {getInitials(author.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>

      <CardContent className="pt-12 pb-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h3>
        <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
          <Mail className="w-4 h-4 mr-1" />
          {author.email}
        </div>

        {author.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{author.bio}</p>
        )}

        <div className="flex items-center justify-center gap-2 mt-4">
          <Link href={`/admin/authors/${author.id}/edit`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          </Link>

          <DeleteAuthorButton authorId={author.id} authorName={author.name} />
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Joined{" "}
          {new Date(author.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
