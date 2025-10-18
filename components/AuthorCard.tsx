import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Mail, Calendar, BookOpen } from "lucide-react";
import { AuthorCardProps } from "@/app/types";

export default function AuthorCard({ author }: AuthorCardProps) {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const totalReadTime = author.blogs.reduce(
    (acc, blog) => acc + (blog.readTime || 0),
    0
  );

  const uniqueTags = new Set(
    author.blogs.flatMap((b) => b.tags?.map((t) => t.name) || [])
  );

  return (
    <Link href={`/authors/${author.id}`}>
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card via-card to-primary/5 group cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            {/* Header gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 h-24" />

            <div className="relative px-6 pt-16 pb-6">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  {author.avatar ? (
                    <AvatarImage src={author.avatar} alt={author.name} />
                  ) : (
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              {/* Author Info */}
              <div className="text-center space-y-3">
                <div>
                  <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {author.name}
                  </h3>
                  {author.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {author.bio}
                    </p>
                  )}
                </div>

                {/* Meta Info */}
                <div className="space-y-2 text-sm text-muted-foreground pt-2">
                  {author.email && (
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">{author.email}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>
                      Joined{" "}
                      {author.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    <span>
                      {author.blogs.length}{" "}
                      {author.blogs.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Stats Footer */}
        <div className="border-t bg-muted/30 px-6 py-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {totalReadTime}
              </div>
              <div className="text-xs text-muted-foreground">
                Min Read Time
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-secondary-foreground">
                {uniqueTags.size}
              </div>
              <div className="text-xs text-muted-foreground">
                Topics Covered
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}